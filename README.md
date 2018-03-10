# flow-typer

> Declarative static and runtime type checking with Flow.

[![Build Status](https://travis-ci.org/gmazovec/flow-typer.svg?branch=master)](https://travis-ci.org/gmazovec/flow-typer)
[![Test Coverage](https://api.codeclimate.com/v1/badges/0a7f801f54a49ffd63c7/test_coverage)](https://codeclimate.com/github/gmazovec/flow-typer/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/0a7f801f54a49ffd63c7/maintainability)](https://codeclimate.com/github/gmazovec/flow-typer/maintainability)

So you are using _Flow_ to type check your code. That's great but how do you check
types for data that is not known before running the code? Like _JSON_ input. Sure, you can use your favorite validation library and do unsafe type casting. Or
you write verbose code and do low-level type checking with _typeof_ operator to satisfy
_Flow_'s refinement.

_flow-typer_ is solving these problems by writing maintainable type schemas in
_JavaScript_ with full _Flow_ interoperability.

Features:

- complete [Flow](https://flow.org) coverage
- type functions are immutable
- define _Flow_ types with JavaScript
- no transpilation required
- works with Node 6.x +

![Flow Typer](./flow-typer.gif)


## Installation

```shell
npm install --save gmazovec/flow-typer
```


## Importing

```javascript
import typer from 'flow-typer' // ES6
var typer = require('flow-typer') // ES5 with npm
```


## Usage

_flow-typer_ exposes a set of functions for type checking at runtime. These functions
are constructed in way that allows _Flow_ to infer types and keep refinement of the code. By composing functions, we define a type schema that
can be used to create inferred Flow types (static checking) and for validating
values with unknown type at runtime.

The most useful cases where _flow-typer_ can be used is to validate values
received from IO with unknown type. For example JSON data from HTTP message
and database queries.

This example shows how to use validation of JSON data in Express application.

```javascript
// @flow
const typer = require('flow-typer')

// type validators
const {
  objectOf, arrayOf, unionOf, literalOf,
  maybe, string, number, boolean
} = typer

/*::
type User = {
  username: ?string,
  email: string,
  gender: 'male' | 'female',
  active: boolean,
  age: ?number
}
*/

// Composing type schema with validators

const userSchema = objectOf(o => ({
  username: maybe(string)(o.name),
  email: string(o.email),
  gender: unionOf2(
    literaOf(('male': 'male')),
    literaOf(('female': 'female')),
  )(o.gender),
  active: boolean(o.active),
  age: maybe(number)(o.age)
}))

// Define Flow type from Javascript value using `typer.typeOf` and
// Flow `typeof` operator.
const userSchemaT = typer.typeOf(userSchema)

// This type that is inferred from Javascript value is the same the one
// defined with Flow (type User).
type UserT = typeof userSchemaT

function persist(user: UserT): Promise<UserT> {
  return db.users.insert(user)
}

function createUser (req, res) {
  let user = null
  try {
// Here we validate the JSON data and cast it to Flow type inferred from
// `userSchema`. This validator has 100% Flow coverage.
    user: UserT = userSchema(req.body)
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
  user = await persist(user)

// Calling unknown user attribute will show Flow error.
  debug(`new user created with name ${user.name}`)
  res.status(201).json({ user })
}

app.post('/api/users', createUser)
```

## API

> **NOTICE! Basic implementation is still under development and the API might change.**


These functions will check for specific JavaScript type with correct Flow type
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
- `typer.literalOf(type)` (requires Flow annotations \*)

### Complex types

- `typer.mixed`
- `typer.object`
- `typer.maybe(schema)`
- `typer.objectOf(schema)`
- `typer.arrayOf(schema)`

```javascript
const schema = arrayOf(number) // => type T = number[]
```

- `typer.tupleOf1(...schema[])`
- `typer.tupleOf2(...schema[])`
- `typer.tupleOf3(...schema[])`
- `typer.tupleOf4(...schema[])`

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

- Use less verbose API for `objectOf` argument. Currently this is not possible
because of the  [bug](https://github.com/facebook/flow/issues/935) in Flow.

Example:

```javascript
const schema = objectOf({
  name: string,
  email: string,
  age: number
})
```

- Find ways to create generic `tupleOf` and `unionOf` validators with variable
cardinality.

- Use `literalOf` and `tupleOf` without explicit Flow type annotations. Literal
and tuple types can not be inferred by Flow. This could be solved with new
Flow utility types `$Literal` and `$Tuple`.


## Limitations

- no type errors for maybe types (flow type: `?string`, schema: `string`)
