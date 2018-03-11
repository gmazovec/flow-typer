// @flow
import test from 'ava-spec'
import typer from '../src'

const { objectOf, boolean, number, string } = typer

test.group('primitive types', test => {
  const validator = objectOf({
    name: string,
    age: number,
    active: boolean
  })

  test('should validate an object', t => {
    const input = { name: 'foo', age: 33, active: true }
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
    t.throws(() => { validator({ name: 'foo', age: 22 }) }, TypeError)
    t.throws(() => { validator({ name: 'foo', age: '22', active: false }) }, TypeError)
    t.throws(() => { validator({ name: null, age: 22, active: true }) }, TypeError)
    t.throws(() => { validator({ name: 'foo', age: 22, aktiv: true }) }, TypeError)
  })
})

test.group('object types', test => {
  const validator = objectOf({
    roles: objectOf({
      admin: boolean,
      owner: boolean,
      user: boolean
    })
  })

  test('should validate an object', t => {
    const input = { roles: { admin: true, owner: false, user: false } }
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
    t.throws(() => { validator({ roles: null }) }, TypeError)
    t.throws(() => { validator({ roles: undefined }) }, TypeError)
    t.throws(() => { validator({ roles: false }) }, TypeError)
    t.throws(() => { validator({ roles: 12345 }) }, TypeError)
    t.throws(() => { validator({ roles: 'foo' }) }, TypeError)
    t.throws(() => { validator({ roles: {} }) }, TypeError)
    t.throws(() => { validator({ roles: [] }) }, TypeError)
    t.throws(() => { validator({ roles: { admin: false, owner: true } }) }, TypeError)
    t.throws(() => { validator({ roles: { admin: false, owner: true, user: 'true' } }) }, TypeError)
    t.throws(() => { validator({ roles: { admin: false, owner: true, } }) }, TypeError)
    t.throws(() => { validator({ roles: { admin: false, ovner: true, user: false } }) }, TypeError)
  })
})
