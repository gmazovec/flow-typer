// @flow
import assert from 'assert'
// $FlowExpectedError
import { test } from 'node:test'
import * as typer from '../src/index.js'

const {
  tupleOf,
  boolean,
  number,
  string,
  object,
  objectOf,
  arrayOf
} = typer

test('primitive types - cardinality 1', async (t) => {
  const tuple = tupleOf(boolean)

  await t.test('should validate a tuple', () => {
    const input = [true]
    const value: [boolean] = tuple(input)
    assert.deepEqual(value, input)
  })

  await t.test('should throw an error', () => {
    assert.throws(() => { tuple(null) })
    assert.throws(() => { tuple(undefined) })
    assert.throws(() => { tuple(true) })
    assert.throws(() => { tuple(12345) })
    assert.throws(() => { tuple('foo') })
    assert.throws(() => { tuple([]) })
    assert.throws(() => { tuple([true, false]) })
  })
})

test('primitive types - cardinality 2', async (t) => {
  const tuple = tupleOf(number, number)

  await t.test('should validate a tuple', () => {
    const input = [34, 65]
    const value: [number, number] = tuple(input)
    assert.deepEqual(value, input)
  })

  await t.test('should throw an error', () => {
    assert.throws(() => { tuple(null) })
    assert.throws(() => { tuple(undefined) })
    assert.throws(() => { tuple(true) })
    assert.throws(() => { tuple(12345) })
    assert.throws(() => { tuple('foo') })
    assert.throws(() => { tuple({}) })
    assert.throws(() => { tuple([]) })
    assert.throws(() => { tuple(['234', '64']) })
    assert.throws(() => { tuple([123, 54, 256]) })
  })
})

test('primitive types - cardinality 3', async (t) => {
  const tuple = tupleOf(string, number, boolean)

  await t.test('should validate a tuple', () => {
    const input = ['foo', 12345, true]
    const value: [string, number, boolean] = tuple(input)
    assert.deepEqual(value, input)
  })

  await t.test('should throw an error', () => {
    assert.throws(() => { tuple(null) })
    assert.throws(() => { tuple(undefined) })
    assert.throws(() => { tuple(true) })
    assert.throws(() => { tuple(12345) })
    assert.throws(() => { tuple('foo') })
    assert.throws(() => { tuple({}) })
    assert.throws(() => { tuple([]) })
    assert.throws(() => { tuple(['foo', '12345', 'true']) })
    assert.throws(() => { tuple(['foo', '12345', 'true', 0]) })
    assert.throws(() => { tuple(['foo', 12345]) })
  })
})

test('primitive types - cardinality 4', async (t) => {
  const tuple = tupleOf(number, number, boolean, boolean)

  await t.test('should validate a tuple', () => {
    const input = [34, 65, true, false]
    const value: [number, number, boolean, boolean] = tuple(input)
    assert.deepEqual(value, input)
  })

  await t.test('should throw an error', () => {
    assert.throws(() => { tuple(null) })
    assert.throws(() => { tuple(undefined) })
    assert.throws(() => { tuple(true) })
    assert.throws(() => { tuple(12345) })
    assert.throws(() => { tuple('foo') })
    assert.throws(() => { tuple({}) })
    assert.throws(() => { tuple([]) })
    assert.throws(() => { tuple(['234', '64', true, false]) })
    assert.throws(() => { tuple([46, 34, true, true, true]) })
  })
})

test('primitive types - cardinality 5', async (t) => {
  const tuple = tupleOf(string, string, string, string, string)

  await t.test('should validate a tuple', () => {
    const input = ['H', 'e', 'l', 'l', 'o']
    const value: [string, string, string, string, string] = tuple(input)
    assert.deepEqual(value, input)
  })

  await t.test('should throw an error', () => {
    assert.throws(() => { tuple(null) })
    assert.throws(() => { tuple(undefined) })
    assert.throws(() => { tuple(true) })
    assert.throws(() => { tuple(12345) })
    assert.throws(() => { tuple('foo') })
    assert.throws(() => { tuple({}) })
    assert.throws(() => { tuple([]) })
    assert.throws(() => { tuple(['o', 'l', 'l', 'e', 'H', '.']) })
    assert.throws(() => { tuple(['foo', 'bar', 0, 'kit', 'kat']) })
  })
})

test('compoud type', async (t) => {
  const userSchema = objectOf({
    email: string,
    age: number,
    active: boolean,
    roles: arrayOf(string)
  })
  const tuple = tupleOf(userSchema)
  const user = { email: 'foo@example.org', age: 33, active: false, roles: ['admin'] }

  await t.test('should validate a tuple', () => {
    const input = [user]
    const value: [{ email: string, age: number, active: boolean, roles: Array<string> }] = tuple(input)
    assert.deepEqual(value, input)
  })

  await t.test('should throw an error', () => {
    assert.throws(() => { tuple([{ user: { ...user }, age: '33' }]) })
    assert.throws(() => { tuple([{ user: { ...user }, email: true }]) })
    assert.throws(() => { tuple([{ user: { ...user }, active: 1 }]) })
    assert.throws(() => { tuple([{ user: { ...user }, roles: [{ admin: true }] }]) })
  })
})
