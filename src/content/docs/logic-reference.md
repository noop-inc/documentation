---
title: Logic Reference
description: Reference of Noop Logic Operators
section: reference
layout: "../../layouts/Doc.astro"
order: 5
---

## add

Add a list of numbers together. Strings will be converted to numbers, null is treated as 0.

### Return Value

(`number`) 

### Parameters

#### operand  (`number`, `string`, `null`)

### Examples


*Example 1*

```yaml
add:
  - 1
  - 1

```

*Returns*

```json
2
```


*Example 2*

```yaml
add:
  - 1
  - '1'

```



*Returns*

```json
2
```


*Example 3*

```yaml
add:
  - 1
  - add:
      - 2
      - 3

```

*Returns*

```json
6
```


## and

Determines whether all arguments evaluate truthy.

### Return Value

(`boolean`) 

### Parameters

#### condition  (`number`, `string`, `null`, `array`, `object`, `boolean`)

### Examples


*Example 1*

```yaml
and:
  - and:
      - true
      - true
  - and:
      - 1
      - 1

```

*Returns*

```json
true
```


*Example 2*

```yaml
and:
  - and:
      - '1'
      - 1
  - and:
      - true
      - true

```

*Returns*

```json
true
```


## concat

Concatenate array or values into single array

### Parameters

####  (`number`, `string`, `null`, `array`, `object`, `boolean`)

### Examples


*Example 1*

```yaml
concat:
  - - 1
    - 2
  - - 3
    - 4
  - - 5
    - 6

```

*Returns*

```json
[
  1,
  2,
  3,
  4,
  5,
  6
]
```


*Example 2*

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

*Returns*

```json
[
  1,
  2,
  [
    3,
    4
  ],
  5,
  6,
  7,
  8
]
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

Determines whether a string ends with the characters of this search string.  Number arguments are converted to strings.

### Return Value

(`boolean`) 

### Parameters

#### string (`number`, `string`)

#### searchString (`number`, `string`)

### Examples


*Example 1*

```yaml
endswith:
  - Hello, friend
  - friend

```

*Returns*

```json
true
```


*Example 2*

```yaml
endswith:
  - 42
  - 2

```

*Returns*

```json
true
```


*Example 3*

```yaml
endswith:
  - Hello, friend
  - Joe

```

*Returns*

```json
false
```


## equals

Determines if all arguments are the same, returns true of false as appropriate.

### Return Value

(`boolean`) 

### Parameters

####  (`number`, `string`, `null`, `array`, `object`, `boolean`)

### Examples


*Example 1*

```yaml
equals:
  - 1
  - 1

```

*Returns*

```json
true
```


*Example 2*

```yaml
equals:
  - true
  - false

```

*Returns*

```json
false
```


*Example 3*

```yaml
equals:
  - 7
  - 7
  - 7

```

*Returns*

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


*Example 1*

```yaml
filter:
  - - 2
    - 3
    - 4
  - greater:
      - var: _item
      - 2

```

*Returns*

```json
[
  3,
  4
]
```


## find

Find an item in an array using a match condition expression. The first item in the array that matches the condition will be returned.

### Return Value

(`number`, `string`, `null`, `array`, `object`, `boolean`) 

### Parameters

#### sourceArray (`array`)

#### condition (`object`)

### Examples


*Example 1*

```yaml
find:
  - - 2
    - 3
    - 4
  - greater:
      - var: _item
      - 2

```

*Returns*

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


*Example 1*

```yaml
flat:
  - - - - 1
      - 2
    - 2

```

*Returns*

```json
[
  [
    1
  ],
  2,
  2
]
```


*Example 2*

```yaml
flat:
  - - - - 1
      - 2

```

*Returns*

```json
[
  [
    1
  ],
  2
]
```


## greater

Determines if valueA is greater than valueB.

### Return Value

(`boolean`) 

### Parameters

#### valueA (`number`, `string`, `null`)

#### valueB (`number`, `string`, `null`)

### Examples


*Example 1*

```yaml
greater:
  - 2
  - 1

```

*Returns*

```json
true
```


*Example 2*

```yaml
greater:
  - 1
  - 1

```

*Returns*

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


*Example 1*

```yaml
greaterequals:
  - 2
  - 1

```

*Returns*

```json
true
```


*Example 2*

```yaml
greaterequals:
  - 1
  - 1

```

*Returns*

```json
true
```


*Example 3*

```yaml
greaterequals:
  - 0
  - 1

```

*Returns*

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


*Example 1*

```yaml
has:
  - first_name: Joe
  - first_name

```

*Returns*

```json
true
```


*Example 2*

```yaml
has:
  - first_name: Joe
  - last_name

```

*Returns*

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


*Example 1*

```yaml
if:
  - equals:
      - 1
      - 1
  - foo
  - bar

```

*Returns*

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


*Example 1*

```yaml
includes:
  - - 1
    - 2
    - 3
  - 2

```

*Returns*

```json
true
```


*Example 2*

```yaml
includes:
  - - 1
    - 2
    - 3
  - 0

```

*Returns*

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


*Example 1*

```yaml
join:
  - - Hamburger
    - Fries
    - Soda
  - ' & '

```

*Returns*

```json
"Hamburger & Fries & Soda"
```


*Example 2*

```yaml
join:
  - - This
    - Or
    - That

```

*Returns*

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


*Example 1*

```yaml
length:
  - 0
  - 1
  - 2

```

*Returns*

```json
3
```


*Example 2*

```yaml
length:
  - foo
  - bar
  - baz

```

*Returns*

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


*Example 1*

```yaml
less:
  - 1
  - 1

```

*Returns*

```json
false
```


*Example 2*

```yaml
less:
  - 0
  - 1

```

*Returns*

```json
true
```


## lessequals

Determines if valueA is less than or equal to valueB.

### Parameters

#### valueA (`number`, `string`, `null`)

#### valueB (`number`, `string`, `null`)

### Examples


*Example 1*

```yaml
lessequals:
  - 2
  - 1

```

*Returns*

```json
false
```


*Example 2*

```yaml
lessequals:
  - 1
  - 1

```

*Returns*

```json
true
```


*Example 3*

```yaml
lessequals:
  - 0
  - 1

```

*Returns*

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


*Example 1*

```yaml
map:
  - - 1
    - 2
    - 3
  - add:
      - var: _item
      - 2

```

*Returns*

```json
[
  3,
  4,
  5
]
```


## match

Determines whether a source path matches for any of the provided glob patterns. Returns boolean.

### Return Value

(`boolean`) 

### Parameters

#### sourcePath (`number`, `string`)

#### globPattern  (`string`, `number`)

### Examples


*Example 1*

```yaml
match:
  - /santa/lives/up/north
  - '**/up/north'

```

*Returns*

```json
true
```


*Example 2*

```yaml
match:
  - /santa/lives/up/north
  - /santa/**
  - '**/down/south'

```

*Returns*

```json
true
```


*Example 3*

```yaml
match:
  - /santa/lives/up/north
  - '**/down/south'

```

*Returns*

```json
false
```


## glob

Determines whether a source path matches for any of the provided glob patterns. Returns boolean.

### Return Value

(`boolean`) 

### Parameters

#### sourcePath (`number`, `string`)

#### globPattern  (`string`, `number`)

### Examples


*Example 1*

```yaml
match:
  - /santa/lives/up/north
  - '**/up/north'

```

*Returns*

```json
true
```


*Example 2*

```yaml
match:
  - /santa/lives/up/north
  - /santa/**
  - '**/down/south'

```

*Returns*

```json
true
```


*Example 3*

```yaml
match:
  - /santa/lives/up/north
  - '**/down/south'

```

*Returns*

```json
false
```


## max

Returns the largest of given values, strings are converted to numbers. Returns a number.

### Return Value

(`number`) 

### Parameters

#### value  (`number`, `string`, `null`)

### Examples


*Example 1*

```yaml
max:
  - 1
  - 2
  - 3

```

*Returns*

```json
3
```


*Example 2*

```yaml
max:
  - 1
  - 2
  - '3'

```

*Returns*

```json
3
```


*Example 3*

```yaml
max:
  - 100
  - 42
  - '3'

```

*Returns*

```json
100
```


## min

Returns the smallest of given values, strings are converted to numbers. Returns a number.

### Return Value

(`number`) 

### Parameters

#### value  (`number`, `string`, `null`)

### Examples


*Example 1*

```yaml
min:
  - 1
  - 2
  - 3

```

*Returns*

```json
1
```


*Example 2*

```yaml
min:
  - 1
  - 2
  - '3'

```

*Returns*

```json
1
```


*Example 3*

```yaml
min:
  - 100
  - 42
  - '3'

```

*Returns*

```json
3
```


## modulo

Returns the remainder after performing a division.

### Parameters

#### dividend (`number`, `string`, `null`)

#### divisor (`number`, `string`)

### Examples


*Example 1*

```yaml
modulo:
  - 13
  - 5

```

*Returns*

```json
3
```


*Example 2*

```yaml
modulo:
  - 1
  - -2

```

*Returns*

```json
1
```


*Example 3*

```yaml
modulo:
  - 1
  - 2

```

*Returns*

```json
1
```


*Example 4*

```yaml
modulo:
  - -13
  - 5

```

*Returns*

```json
-3
```


*Example 5*

```yaml
modulo:
  - -4
  - 2

```

*Returns*

```json
0
```


*Example 6*

```yaml
modulo:
  - 5.5
  - 2

```

*Returns*

```json
1.5
```


## multiply

Produces the product of the operands.

### Return Value

(`number`) 

### Parameters

#### operand  (`number`, `string`, `null`)

### Examples


*Example 1*

```yaml
multiply:
  - 1
  - 2
  - 3

```

*Returns*

```json
6
```


*Example 2*

```yaml
multiply:
  - 50
  - 50
  - 50

```

*Returns*

```json
125000
```


*Example 3*

```yaml
multiply:
  - 21
  - 2

```

*Returns*

```json
42
```


## netmask

Determines if an IP address is within one of the provided CIDR ranges.

### Return Value

(`boolean`) 

### Parameters

#### ipAddress (`string`)

#### cidr  (`string`)

### Examples


*Example 1*

```yaml
netmask:
  - 17.17.17.17
  - 17.17.0.0/16

```

*Returns*

```json
true
```


*Example 2*

```yaml
netmask:
  - 17.17.17.17
  - 17.17.17.0/24

```

*Returns*

```json
true
```


*Example 3*

```yaml
netmask:
  - 17.17.17.17
  - 17.17.17.0/32

```

*Returns*

```json
false
```


*Example 4*

```yaml
netmask:
  - 17.17.17.17
  - 17.17.17.0/24
  - 2.0.0.0/16

```

*Returns*

```json
true
```


## notequals

Determines if all arguments are not the same, returns true of false as appropriate.

### Return Value

(`boolean`) 

### Parameters

####  (`number`, `string`, `null`, `array`, `object`, `boolean`)

### Examples


*Example 1*

```yaml
notequals:
  - 1
  - 1

```

*Returns*

```json
false
```


*Example 2*

```yaml
notequals:
  - true
  - false

```

*Returns*

```json
true
```


*Example 3*

```yaml
notequals:
  - 7
  - 7
  - 42

```

*Returns*

```json
false
```


## or

Determines whether any of the conditions evaluate truthy.

### Return Value

(`boolean`) 

### Parameters

#### condition  (`number`, `string`, `null`, `array`, `object`, `boolean`)

### Examples


*Example 1*

```yaml
or:
  - or:
      - false
  - or:
      - 1
      - 0

```

*Returns*

```json
true
```


*Example 2*

```yaml
or:
  - or:
      - 0
  - or:
      - false
      - null

```

*Returns*

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


*Example 1*

```yaml
querystring:
  - '?santa=claus&bat=man'

```

*Returns*

```json
[
  [
    "santa",
    "claus"
  ],
  [
    "bat",
    "man"
  ]
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


*Example 1*

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

*Returns*

```json
16
```


*Example 2*

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

*Returns*

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


*Example 1*

```yaml
slice:
  - - 1
    - 2
    - 3
  - 0
  - 1

```

*Returns*

```json
[
  1
]
```


*Example 2*

```yaml
slice:
  - - 1
    - 2
    - 3
  - 0

```

*Returns*

```json
[
  1,
  2,
  3
]
```


## startswith

Determines whether a string starts with the characters of this search string. Number arguments are converted to strings.

### Return Value

(`boolean`) 

### Parameters

#### string (`number`, `string`)

#### searchString (`number`, `string`)

### Examples


*Example 1*

```yaml
endswith:
  - Hello, friend
  - Hello

```

*Returns*

```json
false
```


*Example 2*

```yaml
endswith:
  - 42
  - 4

```

*Returns*

```json
false
```


*Example 3*

```yaml
endswith:
  - Hello, friend
  - friend

```

*Returns*

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

####  (`number`, `string`)

### Examples


## subtract

Subtracts a list of numbers in sequence from first to last. Strings will be converted to numbers, null is treated as 0.

### Return Value

(`number`) 

### Parameters

####  (`number`, `string`, `null`)

### Examples


*Example 1*

```yaml
subtract:
  - 5
  - 3
  - 2

```

*Returns*

```json
0
```


*Example 2*

```yaml
subtract:
  - subtract:
      - 10
      - 12
  - 3
  - 2

```

*Returns*

```json
-7
```


## unique

Produces a list of items with all duplicate values reduced to a single instance.

### Return Value

(`array`) 

### Parameters

#### item  (`number`, `string`, `object`, `array`, `boolean`, `null`)

### Examples


*Example 1*

```yaml
unique:
  - banana
  - banana
  - pear

```

*Returns*

```json
[
  "banana",
  "pear"
]
```


*Example 2*

```yaml
unique:
  - banana
  - pear

```

*Returns*

```json
[
  "banana",
  "pear"
]
```


*Example 3*

```yaml
unique:
  - banana
  - banana
  - banana
  - mango
  - mango

```

*Returns*

```json
[
  "banana",
  "mango"
]
```


## useragent

Parses a user agent string constructing an object with user agent data separated into individual object properties

### Return Value

*useragent*: (`object`) Object with user agent data organized by individual property

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


*Example 1*

```yaml
useragent:
  - >-
    Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/535.2 (KHTML, like Gecko)
    Ubuntu/11.10 Chromium/15.0.874.106 Chrome/15.0.874.106 Safari/535.2

```

*Returns*

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


*Example 1*

```yaml
var: _item

```

*Returns*

```json
"doorknob"
```


*Example 2*

```yaml
var: $request.content-type

```

*Returns*

```json
"application/html"
```


*Example 3*

```yaml
var: fancy.thing

```

*Returns*

```json
"snow globe"
```

