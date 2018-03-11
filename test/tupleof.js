// @flow
import test from 'ava-spec'
import typer from '../src'

const {
  tupleOf1,
  tupleOf2,
  tupleOf3,
  tupleOf4,
  tupleOf5,
  boolean,
  number,
  string,
  object,
  objectOf,
  arrayOf
} = typer

test.group('primitive types - cardinality 1', test => {
  const validator = tupleOf1(boolean)

  test('should validate a tuple', t => {
    const input = [true]
    const value = validator(input)
    t.deepEqual(value, input)
  })

  test('should throw an error', t => {
    t.throws(() => { validator(null) }, TypeError)
    t.throws(() => { validator(undefined) }, TypeError)
    t.throws(() => { validator(true) }, TypeError)
    t.throws(() => { validator(12345) }, TypeError)
    t.throws(() => { validator('foo') }, TypeError)
    t.throws(() => { validator([]) }, TypeError)
    t.throws(() => { validator([true, false]) }, TypeError)
  })
})

test.group('primitive types - cardinality 2', test => {
  const validator = tupleOf2(number, number)

  test('should validate a tuple', t => {
    const input = [34, 65]
    const value = validator(input)
    t.deepEqual(value, input)
  })

  test('should throw an error', t => {
    t.throws(() => { validator(null) }, TypeError)
    t.throws(() => { validator(undefined) }, TypeError)
    t.throws(() => { validator(true) }, TypeError)
    t.throws(() => { validator(12345) }, TypeError)
    t.throws(() => { validator('foo') }, TypeError)
    t.throws(() => { validator({}) }, TypeError)
    t.throws(() => { validator([]) }, TypeError)
    t.throws(() => { validator(['234', '64']) }, TypeError)
    t.throws(() => { validator([123, 54, 256]) }, TypeError)
  })
})

test.group('primitive types - cardinality 3', test => {
  const validator = tupleOf3(string, number, boolean)

  test('should validate a tuple', t => {
    const input = ['foo', 12345, true]
    const value = validator(input)
    t.deepEqual(value, input)
  })

  test('should throw an error', t => {
    t.throws(() => { validator(null) }, TypeError)
    t.throws(() => { validator(undefined) }, TypeError)
    t.throws(() => { validator(true) }, TypeError)
    t.throws(() => { validator(12345) }, TypeError)
    t.throws(() => { validator('foo') }, TypeError)
    t.throws(() => { validator({}) }, TypeError)
    t.throws(() => { validator([]) }, TypeError)
    t.throws(() => { validator(['foo', '12345', 'true']) }, TypeError)
    t.throws(() => { validator(['foo', '12345', 'true', 0]) }, TypeError)
    t.throws(() => { validator(['foo', 12345]) }, TypeError)
  })
})

test.group('primitive types - cardinality 4', test => {
  const validator = tupleOf4(number, number, boolean, boolean)

  test('should validate a tuple', t => {
    const input = [34, 65, true, false]
    const value = validator(input)
    t.deepEqual(value, input)
  })

  test('should throw an error', t => {
    t.throws(() => { validator(null) }, TypeError)
    t.throws(() => { validator(undefined) }, TypeError)
    t.throws(() => { validator(true) }, TypeError)
    t.throws(() => { validator(12345) }, TypeError)
    t.throws(() => { validator('foo') }, TypeError)
    t.throws(() => { validator({}) }, TypeError)
    t.throws(() => { validator([]) }, TypeError)
    t.throws(() => { validator(['234', '64', true, false]) }, TypeError)
    t.throws(() => { validator([46, 34, true, true, true]) }, TypeError)
  })
})

test.group('primitive types - cardinality 5', test => {
  const validator = tupleOf5(string, string, string, string, string)

  test('should validate a tuple', t => {
    const input = ['H', 'e', 'l', 'l', 'o']
    const value = validator(input)
    t.deepEqual(value, input)
  })

  test('should throw an error', t => {
    t.throws(() => { validator(null) }, TypeError)
    t.throws(() => { validator(undefined) }, TypeError)
    t.throws(() => { validator(true) }, TypeError)
    t.throws(() => { validator(12345) }, TypeError)
    t.throws(() => { validator('foo') }, TypeError)
    t.throws(() => { validator({}) }, TypeError)
    t.throws(() => { validator([]) }, TypeError)
    t.throws(() => { validator(['o', 'l', 'l', 'e', 'H', '.']) }, TypeError)
    t.throws(() => { validator(['foo', 'bar', 0, 'kit', 'kat']) }, TypeError)
  })
})

test.group('compoud type', test => {
  const userSchema = objectOf({
    email: string,
    age: number,
    active: boolean,
    roles: arrayOf(string)
  })
  const validator = tupleOf1(userSchema)
  const user = { email: 'foo@example.org', age: 33, active: false, roles: ['admin'] }

  test('should validate a tuple', t => {
    const input = [user]
    const value = validator(input)
    t.deepEqual(value, input)
  })

  test('should throw an error', t => {
    t.throws(() => { validator([{ user: Object.assign({}, user), age: '33' }]) }, TypeError)
    t.throws(() => { validator([{ user: Object.assign({}, user), email: true }]) }, TypeError)
    t.throws(() => { validator([{ user: Object.assign({}, user), active: 1 }]) }, TypeError)
    t.throws(() => { validator([{ user: Object.assign({}, user), roles: [{ admin: true }] }]) }, TypeError)
  })
})
