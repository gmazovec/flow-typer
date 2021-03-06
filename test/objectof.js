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
    const value = schema(input)
    t.deepEqual(value, input)
  })

  test('should throw an error', t => {
    t.throws(() => { schema(null) }, TypeValidatorError)
    t.throws(() => { schema(undefined) }, TypeValidatorError)
    t.throws(() => { schema(true) }, TypeValidatorError)
    t.throws(() => { schema(12345) }, TypeValidatorError)
    t.throws(() => { schema('foo') }, TypeValidatorError)
    t.throws(() => { schema({}) }, TypeValidatorError)
    t.throws(() => { schema([]) }, TypeValidatorError)
    t.throws(() => { schema({ name: 'foo', age: 22 }) }, TypeValidatorError)
    t.throws(() => { schema({ name: 'foo', age: '22', active: false }) }, TypeValidatorError)
    t.throws(() => { schema({ name: null, age: 22, active: true }) }, TypeValidatorError)
    t.throws(() => { schema({ name: 'foo', age: 22, aktiv: true }) }, TypeValidatorError)
    t.throws(() => { schema({ name: 'foo', age: 33, active: true, rating: 832 }) }, TypeValidatorError)
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
    const value = schema(input)
    t.deepEqual(value, input)
  })

  test('should throw an error', t => {
    t.throws(() => { schema(null) }, TypeValidatorError)
    t.throws(() => { schema(undefined) }, TypeValidatorError)
    t.throws(() => { schema(true) }, TypeValidatorError)
    t.throws(() => { schema(12345) }, TypeValidatorError)
    t.throws(() => { schema('foo') }, TypeValidatorError)
    t.throws(() => { schema({}) }, TypeValidatorError)
    t.throws(() => { schema([]) }, TypeValidatorError)
    t.throws(() => { schema({ roles: null }) }, TypeValidatorError)
    t.throws(() => { schema({ roles: undefined }) }, TypeValidatorError)
    t.throws(() => { schema({ roles: false }) }, TypeValidatorError)
    t.throws(() => { schema({ roles: 12345 }) }, TypeValidatorError)
    t.throws(() => { schema({ roles: 'foo' }) }, TypeValidatorError)
    t.throws(() => { schema({ roles: {} }) }, TypeValidatorError)
    t.throws(() => { schema({ roles: [] }) }, TypeValidatorError)
    t.throws(() => { schema({ roles: { admin: false, owner: true } }) }, TypeValidatorError)
    t.throws(() => { schema({ roles: { admin: false, owner: true, user: 'true' } }) }, TypeValidatorError)
    t.throws(() => { schema({ roles: { admin: false, owner: true, } }) }, TypeValidatorError)
    t.throws(() => { schema({ roles: { admin: false, ovner: true, user: false } }) }, TypeValidatorError)
  })
})

test.group('optional properties', test => {
  const schema = objectOf({
    content: arrayOf(string),
    context: optional(arrayOf(string))
  })

  test('should exclude optional object property', t => {
    const input = { content: ['image'] }
    const value = schema(input)
    t.deepEqual(value, input)
  })

  test('should throw an error', t => {
    t.throws(() => { schema({ context: ['data'] }) }, TypeValidatorError)
    t.throws(() => { schema({ content: ['image'], context: null }) }, TypeValidatorError)
  })
})

test.group('maybe properties', test => {
  const schema = objectOf({
    content: arrayOf(string),
    context: maybe(arrayOf(string))
  })

  test('should include maybe object property', t => {
    const input = { content: ['image'], context: [''] }
    const value = schema(input)
    t.deepEqual(value, input)
  })

  test('should throw an error', t => {
    t.throws(() => { schema({ context: ['data'] }) }, TypeValidatorError)
  })
})
