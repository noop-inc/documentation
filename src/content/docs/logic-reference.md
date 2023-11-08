---
title: Logic Reference
description: Reference of Noop Logic Operators
section: reference
layout: '../../layouts/Doc.astro'
order: 5
---

## add

Add a list of numbers together. Strings will be converted to numbers, null is treated as 0.

### Return Value

(`number`)

### Parameters

#### operand (`number`, `string`, `null`)

### Examples

_Example 1_

```yaml
add:
  - 1
  - 1
```

_Returns_

```json
2
```

_Example 2_

```yaml
add:
  - 1
  - '1'
```

_Returns_

```json
2
```

_Example 3_

```yaml
add:
  - 1
  - add:
      - 2
      - 3
```

_Returns_

```json
6
```

## and

Determines whether all arguments evaluate truthy.

### Return Value

(`boolean`)

### Parameters

#### condition (`number`, `string`, `null`, `array`, `object`, `boolean`)

### Examples

_Example 1_

```yaml
and:
  - and:
      - true
      - true
  - and:
      - 1
      - 1
```

_Returns_

```json
true
```

_Example 2_

```yaml
and:
  - and:
      - '1'
      - 1
  - and:
      - true
      - true
```

_Returns_

```json
true
```

## concat

Concatenate array or values into single array

### Parameters

#### (`number`, `string`, `null`, `array`, `object`, `boolean`)

### Examples

_Example 1_

```yaml
concat:
  - - 1
    - 2
  - - 3
    - 4
  - - 5
    - 6
```

_Returns_

```json
[1, 2, 3, 4, 5, 6]
```

_Example 2_

```yaml
concat:
  - - 1
    - 2
  - - - 3
      - 4
    - 5
    - 6
  - - 7
    - 8
```

_Returns_

```json
[1, 2, [3, 4], 5, 6, 7, 8]
```

## divide

Divide two numbers, Logic will attempt to convert strings to numbers, null is treated as 0

### Return Value

(`number`)

### Parameters

#### dividend (`number`, `string`, `null`)

#### divisor (`number`, `string`)

### Examples

## endswith

Determines whether a string ends with the characters of this search string. Number arguments are converted to strings.

### Return Value

(`boolean`)

### Parameters

#### string (`number`, `string`)

#### searchString (`number`, `string`)

### Examples

_Example 1_

```yaml
endswith:
  - Hello, friend
  - friend
```

_Returns_

```json
true
```

_Example 2_

```yaml
endswith:
  - 42
  - 2
```

_Returns_

```json
true
```

_Example 3_

```yaml
endswith:
  - Hello, friend
  - Joe
```

_Returns_

```json
false
```

## equals

Determines if all arguments are the same, returns true of false as appropriate.

### Return Value

(`boolean`)

### Parameters

#### (`number`, `string`, `null`, `array`, `object`, `boolean`)

### Examples

_Example 1_

```yaml
equals:
  - 1
  - 1
```

_Returns_

```json
true
```

_Example 2_

```yaml
equals:
  - true
  - false
```

_Returns_

```json
false
```

_Example 3_

```yaml
equals:
  - 7
  - 7
  - 7
```

_Returns_

```json
true
```

## filter

Filter an array of items by a condition. When the condition evaluates true for the given item, the item is added to the returned array.

### Return Value

(`array`)

### Parameters

#### sourceArray (`array`)

#### condition (`object`)

### Examples

_Example 1_

```yaml
filter:
  - - 2
    - 3
    - 4
  - greater:
      - var: _item
      - 2
```

_Returns_

```json
[3, 4]
```

## find

Find an item in an array using a match condition expression. The first item in the array that matches the condition will be returned.

### Return Value

(`number`, `string`, `null`, `array`, `object`, `boolean`)

### Parameters

#### sourceArray (`array`)

#### condition (`object`)

### Examples

_Example 1_

```yaml
find:
  - - 2
    - 3
    - 4
  - greater:
      - var: _item
      - 2
```

_Returns_

```json
3
```

## flat

Flattens nested arrays to the specied depth.

### Return Value

(`array`)

### Parameters

#### sourceArrays (`array`)

#### depth (`number`, `string`)

### Examples

_Example 1_

```yaml
flat:
  - - - - 1
      - 2
    - 2
```

_Returns_

```json
[[1], 2, 2]
```

_Example 2_

```yaml
flat:
  - - - - 1
      - 2
```

_Returns_

```json
[[1], 2]
```

## greater

Determines if valueA is greater than valueB.

### Return Value

(`boolean`)

### Parameters

#### valueA (`number`, `string`, `null`)

#### valueB (`number`, `string`, `null`)

### Examples

_Example 1_

```yaml
greater:
  - 2
  - 1
```

_Returns_

```json
true
```

_Example 2_

```yaml
greater:
  - 1
  - 1
```

_Returns_

```json
false
```

## greaterequals

Determines if valueA is greater than or equal to valueB.

### Return Value

(`boolean`)

### Parameters

#### valueA (`number`, `string`, `null`)

#### valueB (`number`, `string`, `null`)

### Examples

_Example 1_

```yaml
greaterequals:
  - 2
  - 1
```

_Returns_

```json
true
```

_Example 2_

```yaml
greaterequals:
  - 1
  - 1
```

_Returns_

```json
true
```

_Example 3_

```yaml
greaterequals:
  - 0
  - 1
```

_Returns_

```json
false
```

## has

Determines if an object includes a specific key. Returns a boolean.

### Return Value

(`boolean`)

### Parameters

#### object (`array`, `object`)

#### key (`number`, `string`)

### Examples

_Example 1_

```yaml
has:
  - first_name: Joe
  - first_name
```

_Returns_

```json
true
```

_Example 2_

```yaml
has:
  - first_name: Joe
  - last_name
```

_Returns_

```json
false
```

## if

Creates branching logic. When the first argument evaluates truthy the second argument, `ifResult` is returned, otherwise, the third, `elseResult` is returned.

### Return Value

(`number`, `string`, `object`, `array`, `boolean`, `null`) When no if or else results are defined then default return is a boolean, otherwise it is the return value of the ifResult or elseResult expressions.

### Parameters

#### condition (`number`, `string`, `object`, `array`, `boolean`, `null`)

#### ifResult (`number`, `string`, `object`, `array`, `boolean`, `null`)

#### elseResult (`number`, `string`, `object`, `array`, `boolean`, `null`)

### Examples

_Example 1_

```yaml
if:
  - equals:
      - 1
      - 1
  - foo
  - bar
```

_Returns_

```json
"foo"
```

## ifnot

Creates branching logic. When the first argument evaluates falsy the second argument, `ifResult` is returned, otherwise, the third, `elseResult` is returned.

### Return Value

(`number`, `string`, `object`, `array`, `boolean`, `null`) When no if or else results are defined then default return is a boolean, otherwise it is the return value of the ifResult or elseResult expressions.

### Parameters

#### condition (`number`, `string`, `object`, `array`, `boolean`, `null`)

#### ifResult (`number`, `string`, `object`, `array`, `boolean`, `null`)

#### elseResult (`number`, `string`, `object`, `array`, `boolean`, `null`)

### Examples

## includes

determines whether an array or string contains a specified search element, returns a boolean.

### Return Value

(`boolean`)

### Parameters

#### source (`array`, `string`)

#### searchElement (`number`, `string`, `null`, `array`, `object`, `boolean`)

### Examples

_Example 1_

```yaml
includes:
  - - 1
    - 2
    - 3
  - 2
```

_Returns_

```json
true
```

_Example 2_

```yaml
includes:
  - - 1
    - 2
    - 3
  - 0
```

_Returns_

```json
false
```

## join

Creates and returns a string by concatenating all of the elements in the items array, separated by specified separator string or empty string. If the array has only one item, then that item will be returned without using the separator.

### Return Value

(`string`)

### Parameters

#### items (`array`)

#### separator (`number`, `string`, `object`)

### Examples

_Example 1_

```yaml
join:
  - - Hamburger
    - Fries
    - Soda
  - ' & '
```

_Returns_

```json
"Hamburger & Fries & Soda"
```

_Example 2_

```yaml
join:
  - - This
    - Or
    - That
```

_Returns_

```json
"ThisOrThat"
```

## length

Returns the number of items or character in the specified array or string respectively.

### Return Value

(`number`)

### Parameters

#### array (`array`, `string`)

### Examples

_Example 1_

```yaml
length:
  - 0
  - 1
  - 2
```

_Returns_

```json
3
```

_Example 2_

```yaml
length:
  - foo
  - bar
  - baz
```

_Returns_

```json
3
```

## less

Determines if valueA is less than valueB.

### Return Value

(`boolean`)

### Parameters

#### valueA (`number`, `string`, `null`)

#### valueB (`number`, `string`, `null`)

### Examples

_Example 1_

```yaml
less:
  - 1
  - 1
```

_Returns_

```json
false
```

_Example 2_

```yaml
less:
  - 0
  - 1
```

_Returns_

```json
true
```

## lessequals

Determines if valueA is less than or equal to valueB.

### Parameters

#### valueA (`number`, `string`, `null`)

#### valueB (`number`, `string`, `null`)

### Examples

_Example 1_

```yaml
lessequals:
  - 2
  - 1
```

_Returns_

```json
false
```

_Example 2_

```yaml
lessequals:
  - 1
  - 1
```

_Returns_

```json
true
```

_Example 3_

```yaml
lessequals:
  - 0
  - 1
```

_Returns_

```json
true
```

## map

Creates a new array populated with the results of calling a provided Logic expression on every element in the provided array.

### Return Value

(`array`)

### Parameters

#### sourceArray (`array`)

#### logicExpression (`object`)

### Examples

_Example 1_

```yaml
map:
  - - 1
    - 2
    - 3
  - add:
      - var: _item
      - 2
```

_Returns_

```json
[3, 4, 5]
```

## match

Determines whether a source path matches for any of the provided glob patterns. Returns boolean.

### Return Value

(`boolean`)

### Parameters

#### sourcePath (`number`, `string`)

#### globPattern (`string`, `number`)

### Examples

_Example 1_

```yaml
match:
  - /santa/lives/up/north
  - '**/up/north'
```

_Returns_

```json
true
```

_Example 2_

```yaml
match:
  - /santa/lives/up/north
  - /santa/**
  - '**/down/south'
```

_Returns_

```json
true
```

_Example 3_

```yaml
match:
  - /santa/lives/up/north
  - '**/down/south'
```

_Returns_

```json
false
```

## glob

Determines whether a source path matches for any of the provided glob patterns. Returns boolean.

### Return Value

(`boolean`)

### Parameters

#### sourcePath (`number`, `string`)

#### globPattern (`string`, `number`)

### Examples

_Example 1_

```yaml
match:
  - /santa/lives/up/north
  - '**/up/north'
```

_Returns_

```json
true
```

_Example 2_

```yaml
match:
  - /santa/lives/up/north
  - /santa/**
  - '**/down/south'
```

_Returns_

```json
true
```

_Example 3_

```yaml
match:
  - /santa/lives/up/north
  - '**/down/south'
```

_Returns_

```json
false
```

## max

Returns the largest of given values, strings are converted to numbers. Returns a number.

### Return Value

(`number`)

### Parameters

#### value (`number`, `string`, `null`)

### Examples

_Example 1_

```yaml
max:
  - 1
  - 2
  - 3
```

_Returns_

```json
3
```

_Example 2_

```yaml
max:
  - 1
  - 2
  - '3'
```

_Returns_

```json
3
```

_Example 3_

```yaml
max:
  - 100
  - 42
  - '3'
```

_Returns_

```json
100
```

## min

Returns the smallest of given values, strings are converted to numbers. Returns a number.

### Return Value

(`number`)

### Parameters

#### value (`number`, `string`, `null`)

### Examples

_Example 1_

```yaml
min:
  - 1
  - 2
  - 3
```

_Returns_

```json
1
```

_Example 2_

```yaml
min:
  - 1
  - 2
  - '3'
```

_Returns_

```json
1
```

_Example 3_

```yaml
min:
  - 100
  - 42
  - '3'
```

_Returns_

```json
3
```

## modulo

Returns the remainder after performing a division.

### Parameters

#### dividend (`number`, `string`, `null`)

#### divisor (`number`, `string`)

### Examples

_Example 1_

```yaml
modulo:
  - 13
  - 5
```

_Returns_

```json
3
```

_Example 2_

```yaml
modulo:
  - 1
  - -2
```

_Returns_

```json
1
```

_Example 3_

```yaml
modulo:
  - 1
  - 2
```

_Returns_

```json
1
```

_Example 4_

```yaml
modulo:
  - -13
  - 5
```

_Returns_

```json
-3
```

_Example 5_

```yaml
modulo:
  - -4
  - 2
```

_Returns_

```json
0
```

_Example 6_

```yaml
modulo:
  - 5.5
  - 2
```

_Returns_

```json
1.5
```

## multiply

Produces the product of the operands.

### Return Value

(`number`)

### Parameters

#### operand (`number`, `string`, `null`)

### Examples

_Example 1_

```yaml
multiply:
  - 1
  - 2
  - 3
```

_Returns_

```json
6
```

_Example 2_

```yaml
multiply:
  - 50
  - 50
  - 50
```

_Returns_

```json
125000
```

_Example 3_

```yaml
multiply:
  - 21
  - 2
```

_Returns_

```json
42
```

## netmask

Determines if an IP address is within one of the provided CIDR ranges.

### Return Value

(`boolean`)

### Parameters

#### ipAddress (`string`)

#### cidr (`string`)

### Examples

_Example 1_

```yaml
netmask:
  - 17.17.17.17
  - 17.17.0.0/16
```

_Returns_

```json
true
```

_Example 2_

```yaml
netmask:
  - 17.17.17.17
  - 17.17.17.0/24
```

_Returns_

```json
true
```

_Example 3_

```yaml
netmask:
  - 17.17.17.17
  - 17.17.17.0/32
```

_Returns_

```json
false
```

_Example 4_

```yaml
netmask:
  - 17.17.17.17
  - 17.17.17.0/24
  - 2.0.0.0/16
```

_Returns_

```json
true
```

## notequals

Determines if all arguments are not the same, returns true of false as appropriate.

### Return Value

(`boolean`)

### Parameters

#### (`number`, `string`, `null`, `array`, `object`, `boolean`)

### Examples

_Example 1_

```yaml
notequals:
  - 1
  - 1
```

_Returns_

```json
false
```

_Example 2_

```yaml
notequals:
  - true
  - false
```

_Returns_

```json
true
```

_Example 3_

```yaml
notequals:
  - 7
  - 7
  - 42
```

_Returns_

```json
false
```

## or

Determines whether any of the conditions evaluate truthy.

### Return Value

(`boolean`)

### Parameters

#### condition (`number`, `string`, `null`, `array`, `object`, `boolean`)

### Examples

_Example 1_

```yaml
or:
  - or:
      - false
  - or:
      - 1
      - 0
```

_Returns_

```json
true
```

_Example 2_

```yaml
or:
  - or:
      - 0
  - or:
      - false
      - null
```

_Returns_

```json
false
```

## querystring

Produces a list of list pairs for each entry in the provided query string.

### Return Value

(`array`)

### Parameters

#### querystring (`string`)

### Examples

_Example 1_

```yaml
querystring:
  - '?santa=claus&bat=man'
```

_Returns_

```json
[
  ["santa", "claus"],
  ["bat", "man"]
]
```

## reduce

Executes a "reducer" Logic expression on each element of the array, in order, passing in the return value from the calculation on the preceding element. The final result of running the reducer across all elements of the array is a single value. An optional start value is passed as the initial execution of the reducer.

### Return Value

(`number`, `string`, `object`, `array`, `boolean`, `null`)

### Parameters

#### sourceArray (`array`)

#### reducerExpression (`object`)

#### startValue (`number`, `string`, `object`, `array`, `boolean`, `null`)

### Examples

_Example 1_

```yaml
reduce:
  - - 1
    - 2
    - 3
  - add:
      - var: _previous
      - var: _current
  - 10
```

_Returns_

```json
16
```

_Example 2_

```yaml
reduce:
  - - 1
    - 2
    - 3
    - 4
  - subtract:
      - var: _previous
      - var: _current
  - 10
```

_Returns_

```json
0
```

## slice

Returns a portion of an array selected from start to end (end not included) where start and end represent the index of items in that array.

### Return Value

(`array`)

### Parameters

#### sourceArray (`number`, `string`, `array`)

#### rangeStart (`number`, `string`)

#### rangeEnd (`number`, `string`)

### Examples

_Example 1_

```yaml
slice:
  - - 1
    - 2
    - 3
  - 0
  - 1
```

_Returns_

```json
[1]
```

_Example 2_

```yaml
slice:
  - - 1
    - 2
    - 3
  - 0
```

_Returns_

```json
[1, 2, 3]
```

## startswith

Determines whether a string starts with the characters of this search string. Number arguments are converted to strings.

### Return Value

(`boolean`)

### Parameters

#### string (`number`, `string`)

#### searchString (`number`, `string`)

### Examples

_Example 1_

```yaml
endswith:
  - Hello, friend
  - Hello
```

_Returns_

```json
false
```

_Example 2_

```yaml
endswith:
  - 42
  - 4
```

_Returns_

```json
false
```

_Example 3_

```yaml
endswith:
  - Hello, friend
  - friend
```

_Returns_

```json
true
```

## substring

Returns a portion of a string selected from start to end (end not included) where start and end represent the index of character in that string, starting from 0.

### Return Value

(`string`)

### Parameters

#### sourceString (`number`, `string`)

#### rangeStart (`number`, `string`)

#### rangeEnd (`number`, `string`)

#### (`number`, `string`)

### Examples

## subtract

Subtracts a list of numbers in sequence from first to last. Strings will be converted to numbers, null is treated as 0.

### Return Value

(`number`)

### Parameters

#### (`number`, `string`, `null`)

### Examples

_Example 1_

```yaml
subtract:
  - 5
  - 3
  - 2
```

_Returns_

```json
0
```

_Example 2_

```yaml
subtract:
  - subtract:
      - 10
      - 12
  - 3
  - 2
```

_Returns_

```json
-7
```

## unique

Produces a list of items with all duplicate values reduced to a single instance.

### Return Value

(`array`)

### Parameters

#### item (`number`, `string`, `object`, `array`, `boolean`, `null`)

### Examples

_Example 1_

```yaml
unique:
  - banana
  - banana
  - pear
```

_Returns_

```json
["banana", "pear"]
```

_Example 2_

```yaml
unique:
  - banana
  - pear
```

_Returns_

```json
["banana", "pear"]
```

_Example 3_

```yaml
unique:
  - banana
  - banana
  - banana
  - mango
  - mango
```

_Returns_

```json
["banana", "mango"]
```

## useragent

Parses a user agent string constructing an object with user agent data separated into individual object properties

### Return Value

_useragent_: (`object`) Object with user agent data organized by individual property

```json
{
  "ua": {
    "type": "string"
  },
  "browser": {
    "name": {
      "type": "string"
    },
    "version": {
      "type": "string"
    }
  },
  "engine": {
    "name": {
      "type": "string"
    },
    "version": {
      "type": "string"
    }
  },
  "os": {
    "name": {
      "type": "string"
    },
    "version": {
      "type": "string"
    }
  },
  "device": {
    "model": {
      "type": "string"
    },
    "type": {
      "type": "string"
    },
    "vendor": {
      "type": "string"
    }
  },
  "cpu": {
    "architecture": {
      "type": "string"
    }
  }
}
```

### Parameters

#### userAgentString (`string`)

### Examples

_Example 1_

```yaml
useragent:
  - >-
    Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/535.2 (KHTML, like Gecko)
    Ubuntu/11.10 Chromium/15.0.874.106 Chrome/15.0.874.106 Safari/535.2
```

_Returns_

```json
{
  "ua": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/535.2 (KHTML, like Gecko) Ubuntu/11.10 Chromium/15.0.874.106 Chrome/15.0.874.106 Safari/535.2",
  "browser": {
    "name": "Chromium",
    "version": "15.0.874.106",
    "major": "15"
  },
  "engine": {
    "name": "WebKit",
    "version": "535.2"
  },
  "os": {
    "name": "Ubuntu",
    "version": "11.10"
  },
  "device": {},
  "cpu": {
    "architecture": "amd64"
  }
}
```

## var

Retrieves the value of a given variable path, sub-indexes separated with ".". Optionally provide a data object for which to access the variable path from.

### Parameters

#### path (`number`, `string`, `boolean`, `null`)

#### data (`number`, `string`, `object`, `array`, `boolean`, `null`)

### Examples

_Example 1_

```yaml
var: _item
```

_Returns_

```json
"doorknob"
```

_Example 2_

```yaml
var: $request.content-type
```

_Returns_

```json
"application/html"
```

_Example 3_

```yaml
var: fancy.thing
```

_Returns_

```json
"snow globe"
```
