// @flow
import test from 'ava-spec'
import typer from '../src'

const {
  tupleOf,
  boolean,
  number,
  string,
  object,
  objectOf,
  arrayOf,
  TypeValidatorError
} = typer

test.group('primitive types - cardinality 1', test => {
  const tuple = tupleOf(boolean)

  test('should validate a tuple', t => {
    const input = [true]
    const value = tuple(input)
    t.deepEqual(value, input)
  })

  test('should throw an error', t => {
    t.throws(() => { tuple(null) }, TypeValidatorError)
    t.throws(() => { tuple(undefined) }, TypeValidatorError)
    t.throws(() => { tuple(true) }, TypeValidatorError)
    t.throws(() => { tuple(12345) }, TypeValidatorError)
    t.throws(() => { tuple('foo') }, TypeValidatorError)
    t.throws(() => { tuple([]) }, TypeValidatorError)
    t.throws(() => { tuple([true, false]) }, TypeValidatorError)
  })
})

test.group('primitive types - cardinality 2', test => {
  const tuple = tupleOf(number, number)

  test('should validate a tuple', t => {
    const input = [34, 65]
    const value = tuple(input)
    t.deepEqual(value, input)
  })

  test('should throw an error', t => {
    t.throws(() => { tuple(null) }, TypeValidatorError)
    t.throws(() => { tuple(undefined) }, TypeValidatorError)
    t.throws(() => { tuple(true) }, TypeValidatorError)
    t.throws(() => { tuple(12345) }, TypeValidatorError)
    t.throws(() => { tuple('foo') }, TypeValidatorError)
    t.throws(() => { tuple({}) }, TypeValidatorError)
    t.throws(() => { tuple([]) }, TypeValidatorError)
    t.throws(() => { tuple(['234', '64']) }, TypeValidatorError)
    t.throws(() => { tuple([123, 54, 256]) }, TypeValidatorError)
  })
})

test.group('primitive types - cardinality 3', test => {
  const tuple = tupleOf(string, number, boolean)

  test('should validate a tuple', t => {
    const input = ['foo', 12345, true]
    const value = tuple(input)
    t.deepEqual(value, input)
  })

  test('should throw an error', t => {
    t.throws(() => { tuple(null) }, TypeValidatorError)
    t.throws(() => { tuple(undefined) }, TypeValidatorError)
    t.throws(() => { tuple(true) }, TypeValidatorError)
    t.throws(() => { tuple(12345) }, TypeValidatorError)
    t.throws(() => { tuple('foo') }, TypeValidatorError)
    t.throws(() => { tuple({}) }, TypeValidatorError)
    t.throws(() => { tuple([]) }, TypeValidatorError)
    t.throws(() => { tuple(['foo', '12345', 'true']) }, TypeValidatorError)
    t.throws(() => { tuple(['foo', '12345', 'true', 0]) }, TypeValidatorError)
    t.throws(() => { tuple(['foo', 12345]) }, TypeValidatorError)
  })
})

test.group('primitive types - cardinality 4', test => {
  const tuple = tupleOf(number, number, boolean, boolean)

  test('should validate a tuple', t => {
    const input = [34, 65, true, false]
    const value = tuple(input)
    t.deepEqual(value, input)
  })

  test('should throw an error', t => {
    t.throws(() => { tuple(null) }, TypeValidatorError)
    t.throws(() => { tuple(undefined) }, TypeValidatorError)
    t.throws(() => { tuple(true) }, TypeValidatorError)
    t.throws(() => { tuple(12345) }, TypeValidatorError)
    t.throws(() => { tuple('foo') }, TypeValidatorError)
    t.throws(() => { tuple({}) }, TypeValidatorError)
    t.throws(() => { tuple([]) }, TypeValidatorError)
    t.throws(() => { tuple(['234', '64', true, false]) }, TypeValidatorError)
    t.throws(() => { tuple([46, 34, true, true, true]) }, TypeValidatorError)
  })
})

test.group('primitive types - cardinality 5', test => {
  const tuple = tupleOf(string, string, string, string, string)

  test('should validate a tuple', t => {
    const input = ['H', 'e', 'l', 'l', 'o']
    const value = tuple(input)
    t.deepEqual(value, input)
  })

  test('should throw an error', t => {
    t.throws(() => { tuple(null) }, TypeValidatorError)
    t.throws(() => { tuple(undefined) }, TypeValidatorError)
    t.throws(() => { tuple(true) }, TypeValidatorError)
    t.throws(() => { tuple(12345) }, TypeValidatorError)
    t.throws(() => { tuple('foo') }, TypeValidatorError)
    t.throws(() => { tuple({}) }, TypeValidatorError)
    t.throws(() => { tuple([]) }, TypeValidatorError)
    t.throws(() => { tuple(['o', 'l', 'l', 'e', 'H', '.']) }, TypeValidatorError)
    t.throws(() => { tuple(['foo', 'bar', 0, 'kit', 'kat']) }, TypeValidatorError)
  })
})

test.group('compoud type', test => {
  const userSchema = objectOf({
    email: string,
    age: number,
    active: boolean,
    roles: arrayOf(string)
  })
  const tuple = tupleOf(userSchema)
  const user = { email: 'foo@example.org', age: 33, active: false, roles: ['admin'] }

  test('should validate a tuple', t => {
    const input = [user]
    const value = tuple(input)
    t.deepEqual(value, input)
  })

  test('should throw an error', t => {
    t.throws(() => { tuple([{ user: Object.assign({}, user), age: '33' }]) }, TypeValidatorError)
    t.throws(() => { tuple([{ user: Object.assign({}, user), email: true }]) }, TypeValidatorError)
    t.throws(() => { tuple([{ user: Object.assign({}, user), active: 1 }]) }, TypeValidatorError)
    t.throws(() => { tuple([{ user: Object.assign({}, user), roles: [{ admin: true }] }]) }, TypeValidatorError)
  })
})
