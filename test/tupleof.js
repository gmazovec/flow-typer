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
  const tuple = tupleOf1(boolean)

  test('should validate a tuple', t => {
    const input = [true]
    const value = tuple(input)
    t.deepEqual(value, input)
  })

  test('should throw an error', t => {
    t.throws(() => { tuple(null) }, TypeError)
    t.throws(() => { tuple(undefined) }, TypeError)
    t.throws(() => { tuple(true) }, TypeError)
    t.throws(() => { tuple(12345) }, TypeError)
    t.throws(() => { tuple('foo') }, TypeError)
    t.throws(() => { tuple([]) }, TypeError)
    t.throws(() => { tuple([true, false]) }, TypeError)
  })
})

test.group('primitive types - cardinality 2', test => {
  const tuple = tupleOf2(number, number)

  test('should validate a tuple', t => {
    const input = [34, 65]
    const value = tuple(input)
    t.deepEqual(value, input)
  })

  test('should throw an error', t => {
    t.throws(() => { tuple(null) }, TypeError)
    t.throws(() => { tuple(undefined) }, TypeError)
    t.throws(() => { tuple(true) }, TypeError)
    t.throws(() => { tuple(12345) }, TypeError)
    t.throws(() => { tuple('foo') }, TypeError)
    t.throws(() => { tuple({}) }, TypeError)
    t.throws(() => { tuple([]) }, TypeError)
    t.throws(() => { tuple(['234', '64']) }, TypeError)
    t.throws(() => { tuple([123, 54, 256]) }, TypeError)
  })
})

test.group('primitive types - cardinality 3', test => {
  const tuple = tupleOf3(string, number, boolean)

  test('should validate a tuple', t => {
    const input = ['foo', 12345, true]
    const value = tuple(input)
    t.deepEqual(value, input)
  })

  test('should throw an error', t => {
    t.throws(() => { tuple(null) }, TypeError)
    t.throws(() => { tuple(undefined) }, TypeError)
    t.throws(() => { tuple(true) }, TypeError)
    t.throws(() => { tuple(12345) }, TypeError)
    t.throws(() => { tuple('foo') }, TypeError)
    t.throws(() => { tuple({}) }, TypeError)
    t.throws(() => { tuple([]) }, TypeError)
    t.throws(() => { tuple(['foo', '12345', 'true']) }, TypeError)
    t.throws(() => { tuple(['foo', '12345', 'true', 0]) }, TypeError)
    t.throws(() => { tuple(['foo', 12345]) }, TypeError)
  })
})

test.group('primitive types - cardinality 4', test => {
  const tuple = tupleOf4(number, number, boolean, boolean)

  test('should validate a tuple', t => {
    const input = [34, 65, true, false]
    const value = tuple(input)
    t.deepEqual(value, input)
  })

  test('should throw an error', t => {
    t.throws(() => { tuple(null) }, TypeError)
    t.throws(() => { tuple(undefined) }, TypeError)
    t.throws(() => { tuple(true) }, TypeError)
    t.throws(() => { tuple(12345) }, TypeError)
    t.throws(() => { tuple('foo') }, TypeError)
    t.throws(() => { tuple({}) }, TypeError)
    t.throws(() => { tuple([]) }, TypeError)
    t.throws(() => { tuple(['234', '64', true, false]) }, TypeError)
    t.throws(() => { tuple([46, 34, true, true, true]) }, TypeError)
  })
})

test.group('primitive types - cardinality 5', test => {
  const tuple = tupleOf5(string, string, string, string, string)

  test('should validate a tuple', t => {
    const input = ['H', 'e', 'l', 'l', 'o']
    const value = tuple(input)
    t.deepEqual(value, input)
  })

  test('should throw an error', t => {
    t.throws(() => { tuple(null) }, TypeError)
    t.throws(() => { tuple(undefined) }, TypeError)
    t.throws(() => { tuple(true) }, TypeError)
    t.throws(() => { tuple(12345) }, TypeError)
    t.throws(() => { tuple('foo') }, TypeError)
    t.throws(() => { tuple({}) }, TypeError)
    t.throws(() => { tuple([]) }, TypeError)
    t.throws(() => { tuple(['o', 'l', 'l', 'e', 'H', '.']) }, TypeError)
    t.throws(() => { tuple(['foo', 'bar', 0, 'kit', 'kat']) }, TypeError)
  })
})

test.group('compoud type', test => {
  const userSchema = objectOf({
    email: string,
    age: number,
    active: boolean,
    roles: arrayOf(string)
  })
  const tuple = tupleOf1(userSchema)
  const user = { email: 'foo@example.org', age: 33, active: false, roles: ['admin'] }

  test('should validate a tuple', t => {
    const input = [user]
    const value = tuple(input)
    t.deepEqual(value, input)
  })

  test('should throw an error', t => {
    t.throws(() => { tuple([{ user: Object.assign({}, user), age: '33' }]) }, TypeError)
    t.throws(() => { tuple([{ user: Object.assign({}, user), email: true }]) }, TypeError)
    t.throws(() => { tuple([{ user: Object.assign({}, user), active: 1 }]) }, TypeError)
    t.throws(() => { tuple([{ user: Object.assign({}, user), roles: [{ admin: true }] }]) }, TypeError)
  })
})
