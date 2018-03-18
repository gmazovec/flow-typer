// @flow
import test from 'ava-spec'
import typer from '../src'

const { objectOf, boolean, number, string } = typer

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
    t.throws(() => { schema(null) }, TypeError)
    t.throws(() => { schema(undefined) }, TypeError)
    t.throws(() => { schema(true) }, TypeError)
    t.throws(() => { schema(12345) }, TypeError)
    t.throws(() => { schema('foo') }, TypeError)
    t.throws(() => { schema({}) }, TypeError)
    t.throws(() => { schema([]) }, TypeError)
    t.throws(() => { schema({ name: 'foo', age: 22 }) }, TypeError)
    t.throws(() => { schema({ name: 'foo', age: '22', active: false }) }, TypeError)
    t.throws(() => { schema({ name: null, age: 22, active: true }) }, TypeError)
    t.throws(() => { schema({ name: 'foo', age: 22, aktiv: true }) }, TypeError)
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
    t.throws(() => { schema(null) }, TypeError)
    t.throws(() => { schema(undefined) }, TypeError)
    t.throws(() => { schema(true) }, TypeError)
    t.throws(() => { schema(12345) }, TypeError)
    t.throws(() => { schema('foo') }, TypeError)
    t.throws(() => { schema({}) }, TypeError)
    t.throws(() => { schema([]) }, TypeError)
    t.throws(() => { schema({ roles: null }) }, TypeError)
    t.throws(() => { schema({ roles: undefined }) }, TypeError)
    t.throws(() => { schema({ roles: false }) }, TypeError)
    t.throws(() => { schema({ roles: 12345 }) }, TypeError)
    t.throws(() => { schema({ roles: 'foo' }) }, TypeError)
    t.throws(() => { schema({ roles: {} }) }, TypeError)
    t.throws(() => { schema({ roles: [] }) }, TypeError)
    t.throws(() => { schema({ roles: { admin: false, owner: true } }) }, TypeError)
    t.throws(() => { schema({ roles: { admin: false, owner: true, user: 'true' } }) }, TypeError)
    t.throws(() => { schema({ roles: { admin: false, owner: true, } }) }, TypeError)
    t.throws(() => { schema({ roles: { admin: false, ovner: true, user: false } }) }, TypeError)
  })
})
