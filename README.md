# flow-typer

> Declarative static and runtime type checking with Flow.

[![Build Status](https://travis-ci.org/gmazovec/flow-typer.svg?branch=master)](https://travis-ci.org/gmazovec/flow-typer)
[![Test Coverage](https://api.codeclimate.com/v1/badges/0a7f801f54a49ffd63c7/test_coverage)](https://codeclimate.com/github/gmazovec/flow-typer/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/0a7f801f54a49ffd63c7/maintainability)](https://codeclimate.com/github/gmazovec/flow-typer/maintainability)

So you are using _Flow_ to type check your code. That's great but how do you
check types for data that is not known before running the code? Like _JSON_ input.
Sure, you can use your favorite validation library and do unsafe type casting. Or
you write verbose code and do low-level type checking with _typeof_ operator to
satisfy _Flow_'s refinement.

_flow-typer_ is solving these problems by writing maintainable type schemas in
_JavaScript_ with _Flow_ interoperability.

Features:

- support for primitive and complex Flow types
- complete [Flow](https://flow.org) coverage
- type functions are immutable
- define _Flow_ types with JavaScript
- no transpilation required
- works with ES6 JavaScript (modern browsers and Node 6+)

![Flow Typer](./flow-typer.png)


## Installation

```shell
npm install --save @gmazovec/flow-typer
```


## Importing

```javascript
import typer from '@gmazovec/flow-typer' // ES6
var typer = require('@gmazovec/flow-typer') // ES5 with npm
```


## Usage

_flow-typer_ exposes a set of functions for type checking at runtime. These
functions are constructed in way that allows _Flow_ to infer types and keep
refinement of the code. By composing functions, we define a type schema that
can be used to create inferred _Flow_ types (static checking) and for validating
values with unknown type at runtime.

```javascript
import {
  typeOf,
  objectOf,
  arrayOf,
  tupleOf2,
  unionOf2,
  string,
  number,
  boolean,
  maybe
} from '@gmazovec/flow-typer'
```

```javascript
// literal types require annotation
const male$Literal = (literalOf('male'): $Literal<'male'>)
const female$Literal = (literalOf('female'): $Literal<'female'>)
```

```javascript
// define type schema
const personSchema = objectOf({
  name: string,
  age: maybe(number),
  active: boolean,
  gender: unionOf2(male$Literal, female$Literal),
  tags: arrayOf(string),
  location: tupleOf2(number, number)
})
```

```javascript
// infer Flow type to JS variable from schema
const personType = typeOf(personSchema)
```

```javascript
// define Flow type from JS variable
type PersonType = typeof personType
```

```javascript
// check value of unknown type against type schema
const person = personSchema(unknownInput)
```

```javascript
// type schema returns value of specific type
person.name.toUpperCase() // No error
person.email // Flow error (unknown attribute)
person.active = 1 // Flow error (boolean value expected)

```


## API

These functions will check for specific JavaScript type with correct _Flow_ type
refinement.

- `typer.isNil`
- `typer.isUndef`
- `typer.isBoolean`
- `typer.isNumber`
- `typer.isString`
- `typer.isObject`

### Primitive types

- `typer.nil`
- `typer.undef`
- `typer.boolean`
- `typer.number`
- `typer.string`
- `typer.literalOf(value)` (requires _Flow_ annotations \*)

```javascript
const flow$Literal = (literalOf('flow'): $Literal<'flow'>) // => type T = 'flow'
```

### Complex types

- `typer.mixed`
- `typer.object`
- `typer.maybe(schema)`
- `typer.objectOf(schemaObject)`
- `typer.arrayOf(schema)`

```javascript
const schema = arrayOf(number) // => type T = number[]
```

- `typer.tupleOf1(...schema[])`
- `typer.tupleOf2(...schema[])`
- `typer.tupleOf3(...schema[])`
- `typer.tupleOf4(...schema[])`
- `typer.tupleOf5(...schema[])`

```javascript
const schema = tupleOf2(string, number) // => type T = [string, number]
```

- `typer.unionOf2(...schema[])`
- `typer.unionOf3(...schema[])`
- `typer.unionOf4(...schema[])`
- `typer.unionOf5(...schema[])`

```javascript
const schema = unionOf2('week', 'month') // => type T = 'week' | 'month'
```


### Utilities

- `typer.isType(schema)`
- `typer.typeOf(schema)`

```javascript
const schema = arrayOf(userSchema)
const userListT = typeOf(schema)

// flow
type UserListT = typeof userListT
```

## TODO

- Improve error messages for runtime validation.

- Find ways to create generic `tupleOf` and `unionOf` validators with variable
cardinality.

- Use `literalOf` and `tupleOf` without explicit _Flow_ type annotations. Literal
and tuple types can not be inferred by _Flow_. This could be solved with new
Flow utility types `$Literal` and `$Tuple`.
