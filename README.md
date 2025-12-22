# flow-typer

> Declarative static and runtime type checking with Flow.

So you are using [Flow](https://flow.org) to type check your code. That's great but how do you
check types for data that is not known before running the code? Like _JSON_ input.
Sure, you can use your favorite validation library and do unsafe type casting. Or
you write verbose code and do low-level type checking with _typeof_ operator to
satisfy _Flow_'s refinement.

_flow-typer_ is giving you collection of functions for writing maintainable type schemas in
_JavaScript_ with _Flow_ interoperability.


### Features

- support for primitive and composable Flow types
- complete _Flow_ coverage
- type validation functions are pure
- define _Flow_ types with JavaScript
- no transpilation required
- works with ES6+ JavaScript


## Installation

```sh
npm install --save flow-typer-js
```


## Importing

```js
import typer from 'flow-typer-js'
```


## Usage

_flow-typer_ exposes a set of functions for type checking at runtime. These
functions are constructed in way that allows _Flow_ to infer types and keep
refinement of the code. By composing functions, we define a type schema that
can be used to create inferred _Flow_ types (static checking) and for validating
values with unknown type at runtime.

```js
import {
  typeOf,
  objectOf,
  arrayOf,
  tupleOf2,
  unionOf2,
  literal,
  string,
  number,
  boolean,
  maybe
} from 'flow-typer-js'
```

```js
// define type schema
const personSchema = objectOf({
  name: string,
  age: maybe(number),
  active: boolean,
  gender: unionOf2(literal('male'), literal('female')),
  tags: arrayOf(string),
  location: tupleOf2(number, number)
})
```

```js
// define Flow type from JS type schema
type PersonT = ReturnType<typeof personSchema>
```

```js
// check value of unknown type against type schema
const person = personSchema(unknownInput)
// => person: PersonT
```

```js
// type schema returns value of specific type
person.name.toUpperCase() // No error
person.email // Flow error (unknown attribute)
person.active = 1 // Flow error (boolean value expected)

```

## Errors

Type validation throws `TypeValidatorError` which contains useful information
about why validation failed and what kind of type is expected.

```
TypeValidatorError: invalid "string" value type; "array" type expected
    ...

    scope    PackageT.dependencies
    expected Array<{"name":"string","version":"string"}>
    type     string
    value    "flow-typer"
    file     .../flow-typer-examples/index.js:15:15

```

- _scope_ - level at which validation failed
- _expected_ - the expected type of input value
- _type_ - the actual type of input value
- _value_ - input value in JSON format
- _file_ - file with position where the validator was called

```js
type TypeValidatorError {
  expectedType: string
  valueType: string
  value: string
  typeScope: string
  sourceFile: string
}
```

## API

These functions will check for specific JavaScript type with correct _Flow_ type
refinement.

- `isNil` [deprecated]
- `isNull`
- `isUndef`
- `isBoolean`
- `isNumber`
- `isString`
- `isObject`

### Primitive types

- `nil`
- `null_t`
- `undef`
- `undefined_t`
- `boolean`
- `number`
- `string`
- `literal`

### Complex types

- `mixed`
- `object`
- `maybe(schema)`
- `objectOf(schemaObject, label)`
- `optional(schema)`

```js
const schema = objectOf({
  username: string,
  nickname: optional(string)
})
// => type T = { username: string, nickname: (string | void) }
```

- `arrayOf(schema, label)`

```js
const schema = arrayOf(number) // => type T = number[]
```

- `tupleOf(...schema[]) [deprecated]`

- `tupleOf2(...schema[]) ... tupleOf6`

```js
const schema = tupleOf2(string, number) // => type T = [string, number]
```

- `unionOf(...schema[]) [deprecated]`

- `unionOf2(...schema[]) ... unionOf6`

```js
const schema = unionOf2(string, number) // => type T = string | number
```

- `mapOf(keySchema, valueSchema)`

```js
const schema = mapOf(string, boolean) // => type T = { [_string]: boolean }
```

- `literalOf(...) [deprecated]`

- `literal(...)`

```js
const schema = literal('male')
```


### Utilities

- `isType(schema): boolean`
- `getType(schema): string`

```js
const schema = objectOf({
  dependencies: arrayOf(objectOf(
    name: string,
    version: number,
    exact: boolean
  ))
})

getType(schema)
// => { dependencies: Array<{ name: string, version: number, exact: boolean }> }
```

- `typeOf(schema): T`
- `type(validator): schema`

```js
const date = type((value) => {
  if (value instanceof Date) return value
  throw new Error
})
````
