# flow-typer

Composable static and runtime type checking with Flow.

_flow-typer_ is a set of type validators that combines static and runtime type
checking. By composing validators in JavaScript, we define a type schema that
can be used to create inferred Flow type (static checking) and for validating
values at runtime.

Features:

- complete Flow type coverage
- type validators are immutable
- define Flow types with JavaScript
- no transpilation required
- works with Node 6.x +


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

_flow-typer_ is most useful in validating input values with unknown type like
JSON data from HTTP messages and database. There's no need to validate function
arguments or return values because we can use static type checking with Flow for
that.

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
  gender: unionOf(
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

### Type check

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

### Mixed and maybe types

- `typer.mixed`
- `typer.maybe(type|schema)`


### Compound types

- `typer.object`
- `typer.objectOf(schema)`
- `typer.arrayOf(type|schema)`
- `typer.tupleOf([...types])` (requires Flow annotations \*)
- `typer.unionOf(schema)`

### unionOf Validators

In `unionOf` schema function, different kind of validators have to be used.
These validators never throw an error but returns either `null` or wrapped
value as `[T]`. This way we can use `||` operator to defined union types.

```javascript
const schema = unionOf(u => string_(u) || number_(u))
```

- `typer.nil_`
- `typer.undef_`
- `typer.boolean_`
- `typer.number_`
- `typer.string_`
- `typer.literalOf_(type)`


\* Flow does not support to infer tuple type. It needs to be annotated. In future
this could be solved with `$Tuple` utility type.

## TODO

- Improve error messages for runtime validation.

- Add _unionOf_ validators for compound types (`objectOf_`, `arrayOf_`, `tupleOf_`)

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

- Use `literalOf` and `tupleOf` without explicit Flow type annotations. Literal
and tuple types can not be inferred by Flow type. This could be solved with new
Flow utility types `$Literal` and `$Tuple`.

## Limitations

- no type errors for maybe types (flow type: `?string`, schema: `string`)
