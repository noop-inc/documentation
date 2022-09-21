import child from 'child_process'
import { promisify } from 'util'
import packageJson from '../../package.json' assert { type: 'json' }

const exec = promisify(function (command, done) {
  console.log(`Executing: '${command}'`)
  child.exec(command, (error, stdout, stderr) => {
    if (error) return done(error)
    console.error(stderr)
    console.log(stdout)
    done(null, { stdout, stderr })
  })
})

const getDistTags = async () => {
  return Object.fromEntries(
    (await exec(`npm dist-tag ${packageName}`))
      .stdout
      .split(/\r\n|\r|\n/)
      .filter(Boolean)
      .map(version => version.split(': '))
  )
}

const packageName = packageJson.name
const githubRef = process.env.GITHUB_REF
if (!githubRef) throw new Error('Missing githubRef')

// matches format '1.2.3'
const latestMatch = /^refs\/tags\/v([0-9]+)\.([0-9]+)\.([0-9]+)$/
// matches format '1.2.3-4'
const nextMatch = /^refs\/tags\/v([0-9]+)\.([0-9]+)\.([0-9]+)\-([0-9]+)$/
// matches format '1.2.3-alpha.4'
const preMatch = /^refs\/tags\/v([0-9]+)\.([0-9]+)\.([0-9]+)\-[a-zA-Z0-9_]+\.([0-9]+)$/

let distTag = ''
if (latestMatch.test(githubRef)) {
  distTag = 'latest'
} else if (nextMatch.test(githubRef)) {
  distTag = 'next'
} else if (preMatch.test(githubRef)) {
  // if version is '1.0.0-alpha.0', will assign distTag to 'alpha'
  distTag = githubRef.replace(/(^refs\/tags\/v([0-9]+)\.([0-9]+)\.([0-9]+)\-|\.([0-9]+)$)/g, '')
}
// throw error if we cannot determine dist-tag 
if (!distTag) throw new Error('Unable to determine dist-tag')

const versionNumber = githubRef?.replace(/^refs\/tags\/v/, '')
if (!versionNumber) throw new Error('Missing versionNumber')

console.log(`Releasing version 'v${versionNumber}' to '${distTag}' channel`)

// array of before dist-tags
const targetTags = await getDistTags()

// bump version, but do not create associated tag/commit
await exec(`npm --no-git-tag-version version ${versionNumber}`)

// build static documentation json file
await exec(`node .github/workflows/build.js`)

// publish version with parsed dist-tag
await exec(`npm publish --tag ${distTag}`)

// insert published version into target dist-tags object
targetTags[distTag] = versionNumber

const afterTags = await getDistTags()

// reassign distTags
for (const [tag, version] of Object.entries(targetTags)) {
  if (afterTags[tag] !== version) {
    await exec(`npm dist-tag add ${packageName}@${version} ${tag}`)
  }
}

// remove erroneously assigned dist-tags
for (const tag in afterTags) {
  if (!(tag in targetTags)) await exec(`npm dist-tag rm ${packageName} ${tag}`)
}
