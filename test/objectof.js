// @flow
import test from 'ava-spec'
import typer from '../src'

const {
  objectOf,
  arrayOf,
  optional,
  boolean,
  number,
  string,
  maybe,
  TypeValidatorError
} = typer

test.group('primitive types', test => {
  const schema = objectOf({
    name: string,
    age: number,
    active: boolean
  })

  test('should validate an object', t => {
    const input = { name: 'foo', age: 33, active: true }
    const value: { name: string, age: number, active: boolean, ...} = schema(input)
    t.deepEqual(value, input)
  })

  test('should throw an error', t => {
    t.throws(() => { schema(null) })
    t.throws(() => { schema(undefined) })
    t.throws(() => { schema(true) })
    t.throws(() => { schema(12345) })
    t.throws(() => { schema('foo') })
    t.throws(() => { schema({}) })
    t.throws(() => { schema([]) })
    t.throws(() => { schema({ name: 'foo', age: 22 }) })
    t.throws(() => { schema({ name: 'foo', age: '22', active: false }) })
    t.throws(() => { schema({ name: null, age: 22, active: true }) })
    t.throws(() => { schema({ name: 'foo', age: 22, aktiv: true }) })
    t.throws(() => { schema({ name: 'foo', age: 33, active: true, rating: 832 }) })
  })
})

test.group('object types', test => {
  const schema = objectOf({
    roles: objectOf({
      admin: boolean,
      owner: boolean,
      user: boolean
    })
  })

  test('should validate an object', t => {
    const input = { roles: { admin: true, owner: false, user: false } }
    const value: { roles: { admin: boolean, owner: boolean, user: boolean }, ... } = schema(input)
    t.deepEqual(value, input)
  })

  test('should throw an error', t => {
    t.throws(() => { schema(null) })
    t.throws(() => { schema(undefined) })
    t.throws(() => { schema(true) })
    t.throws(() => { schema(12345) })
    t.throws(() => { schema('foo') })
    t.throws(() => { schema({}) })
    t.throws(() => { schema([]) })
    t.throws(() => { schema({ roles: null }) })
    t.throws(() => { schema({ roles: undefined }) })
    t.throws(() => { schema({ roles: false }) })
    t.throws(() => { schema({ roles: 12345 }) })
    t.throws(() => { schema({ roles: 'foo' }) })
    t.throws(() => { schema({ roles: {} }) })
    t.throws(() => { schema({ roles: [] }) })
    t.throws(() => { schema({ roles: { admin: false, owner: true } }) })
    t.throws(() => { schema({ roles: { admin: false, owner: true, user: 'true' } }) })
    t.throws(() => { schema({ roles: { admin: false, owner: true, } }) })
    t.throws(() => { schema({ roles: { admin: false, ovner: true, user: false } }) })
  })
})

test.group('optional properties', test => {
  const schema = objectOf({
    content: arrayOf(string),
    context: optional(arrayOf(string))
  })

  test('should exclude optional object property', t => {
    const input = { content: ['image'] }
    const value: { content: Array<string>, ... } = schema(input)
    t.deepEqual(value, input)
  })

  test('should throw an error', t => {
    t.throws(() => { schema({ context: ['data'] }) })
    t.throws(() => { schema({ content: ['image'], context: null }) })
  })
})

test.group('maybe properties', test => {
  const schema = objectOf({
    content: arrayOf(string),
    context: maybe(arrayOf(string))
  })

  test('should include maybe object property', t => {
    const input = { content: ['image'], context: [''] }
    const value: { content: Array<string>, context: ?Array<string> } = schema(input)
    t.deepEqual(value, input)
  })

  test('should throw an error', t => {
    t.throws(() => { schema({ context: ['data'] }) })
  })
})
