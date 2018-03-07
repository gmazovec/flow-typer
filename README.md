# flow-typer [ALPHA]

Define Flow types with JavaScript

_flow-typer_ is special type of validator that  combines static and runtime type checking. It can be used to define custom Flow types in JS and to construct type validators based on those types.


- complete Flow type coverage
- type validators are immutable
- no transpilation required
- works with Node 6.x +

#### Index

- [Installation](#nstallation)
- [Importing](#importing)
- [Usage](#usage)
- [Use Case](#use-case)
- [How It Works](#how-it-works)
- [API](#api)
- [Limitations](#limitations)


## Installation

```shell
npm install --save gmazovec/flow-typer#alpha
```


## Importing

```javascript
import typer from 'flow-typer' // ES6
var typer = require('flow-typer') // ES5 with npm
```


## Usage

Define type schema in JS

```javascript
const { arrayOf, string } = typer
const listOfStrings = arrayOf(string)
```

Create Flow type

```javascript
const listOfStringsT = typer.typeOf(listOfStrings)
type ListOfStringsT = typeof listOfStringsT
```

Validate value

```javascript
const input = JSON.parse('An input string')
const value = schema(input)
```

In previous example we construct a type by inferring.


## Use Case

```javascript
// model/user.js

type UserT = {
  name: string,
  email: string
}

function create (attrs: UserT) {
  ...
}

// routes/index.js

app.post('/api/user', (req, res) => {
  model.User.create(req.body.data)
})
```

```javascript
// model/user.js

const { objectOf, string } = typer

const userSchema = objectOf((o) => ({
  name: string(v.name)(o.name),
  email: string(v.email)(o.email)
})

const userSchemaT = typer.typeOf(userSchema)
type UserT = typeof userSchemaT

function create (attrs: UserT) {
  ...
}

// routes/index.js

app.post('/api/user', (req, res) => {
  const user = model.User.userSchema(req.body.data)
  model.User.create(user)
})
```


## How It Works

type construction is based on Flow's inference.

validation is based on Flow's refinement.


## API

> **NOTICE! Basic implementation is still under development and the API might change.**

### Type check

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

### Complex types

- `typer.mixed`
- `typer.maybe(type)`
- `typer.literalOf(type)` (requires Flow annotations \*)
- `typer.objectOf(type)`
- `typer.arrayOf(type)`
- `typer.tupleOf(type)` (requires Flow annotations \*)
- `typer.unionOf(type)`

* Flow does not support to infer tuple type. It needs to be annotated. In future
this could be solved with `$Tuple` utility type.


## Limitations

- no type errors for maybe types (flow type: `?string`, schema: `string`)
