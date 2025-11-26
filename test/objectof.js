// @flow
import { assert, test } from './index.js'
import * as typer from '../src/index.js'

const {
  object,
  objectOf,
  arrayOf,
  optional,
  boolean,
  number,
  string,
  maybe,
  TypeValidatorError,
  getType,
} = typer

test('plain object', async (t) => {
  await t.test('should validate an object', () => {
    assert.deepEqual(object({}), {});
    assert.deepEqual(object({ name: 'foo' }), { name: 'foo' });
  });

  await t.test('should throw an error', () => {
    assert.throws(() => { object("") });
  });
});

test('primitive types', async (t) => {
  const schema = objectOf({
    name: string,
    age: number,
    active: boolean
  })

  await t.test('should validate an object', () => {
    const input = { name: 'foo', age: 33, active: true }
    const value: { name: string, age: number, active: boolean, ...} = schema(input)
    assert.deepEqual(value, input)
  })

  await t.test('should throw an error', () => {
    assert.throws(() => { schema(null) })
    assert.throws(() => { schema(undefined) })
    assert.throws(() => { schema(true) })
    assert.throws(() => { schema(12345) })
    assert.throws(() => { schema('foo') })
    assert.throws(() => { schema({}) })
    assert.throws(() => { schema([]) })
    assert.throws(() => { schema({ name: 'foo', age: 22 }) })
    assert.throws(() => { schema({ name: 'foo', age: '22', active: false }) })
    assert.throws(() => { schema({ name: null, age: 22, active: true }) })
    assert.throws(() => { schema({ name: 'foo', age: 22, aktiv: true }) })
    assert.throws(() => { schema({ name: 'foo', age: 33, active: true, rating: 832 }) })
  })
})

test('object types', async (t) => {
  const schema = objectOf({
    roles: objectOf({
      admin: boolean,
      owner: boolean,
      user: boolean
    })
  })

  await t.test('should validate an object', () => {
    const input = { roles: { admin: true, owner: false, user: false } }
    const value: { roles: { admin: boolean, owner: boolean, user: boolean }, ... } = schema(input)
    assert.deepEqual(value, input)
  })

  await t.test('should throw an error', () => {
    assert.throws(() => { schema(null) })
    assert.throws(() => { schema(undefined) })
    assert.throws(() => { schema(true) })
    assert.throws(() => { schema(12345) })
    assert.throws(() => { schema('foo') })
    assert.throws(() => { schema({}) })
    assert.throws(() => { schema([]) })
    assert.throws(() => { schema({ roles: null }) })
    assert.throws(() => { schema({ roles: undefined }) })
    assert.throws(() => { schema({ roles: false }) })
    assert.throws(() => { schema({ roles: 12345 }) })
    assert.throws(() => { schema({ roles: 'foo' }) })
    assert.throws(() => { schema({ roles: {} }) })
    assert.throws(() => { schema({ roles: [] }) })
    assert.throws(() => { schema({ roles: { admin: false, owner: true } }) })
    assert.throws(() => { schema({ roles: { admin: false, owner: true, user: 'true' } }) })
    assert.throws(() => { schema({ roles: { admin: false, owner: true, } }) })
    assert.throws(() => { schema({ roles: { admin: false, ovner: true, user: false } }) })
  })
})

test('optional properties', async (t) => {
  const schema = objectOf({
    content: arrayOf(string),
    context: optional(arrayOf(string))
  })

  await t.test('should exclude optional object property', () => {
    const input = { content: ['image'] }
    const value: { content: Array<string>, ... } = schema(input)
    assert.deepEqual(value, input)
  })

  await t.test('should return void', () => {
    assert.deepEqual(getType(optional(string), { noVoid: false }), "(string | void)")
  });

  await t.test('should throw an error', () => {
    assert.throws(() => { schema({ context: ['data'] }) })
    assert.throws(() => { schema({ content: ['image'], context: null }) })
  })
})

test('maybe properties', async (t) => {
  const schema = objectOf({
    content: arrayOf(string),
    context: maybe(arrayOf(string))
  })

  await t.test('should include maybe object property', () => {
    const input = { content: ['image'], context: [''] }
    const value: { content: Array<string>, context: ?Array<string> } = schema(input)
    assert.deepEqual(value, input)
  })

  await t.test('should throw an error for unknown attribute', () => {
    assert.throws(() => { schema({ context: ['data'] }) })
  })

  await t.test('should throw an error for undefined aatribute', () => {
    assert.throws(() => { schema({ content: ['data'] }) })
  })
})
