// @flow
import assert from 'assert'
// $FlowExpectedError[cannot-resolve-module]
import { test } from 'node:test'
import * as typer from '../src/index.js'

const {
  maybe,
  nil,
  undef,
  boolean,
  number,
  string,
  arrayOf,
  objectOf
} = typer

test('null type', async (t) => {
  const maybeNull = maybe(nil)

  await t.test('should validate values', () => {
    const valueA = maybeNull(undefined)
    const valueB = maybeNull(null)
    assert.equal(valueA, undefined)
    assert.equal(valueB, null)
  })

  await t.test('should throw an error', () => {
    assert.throws(() => { maybeNull(true) })
    assert.throws(() => { maybeNull(12345) })
    assert.throws(() => { maybeNull('foo') })
    assert.throws(() => { maybeNull({}) })
    assert.throws(() => { maybeNull([]) })
  })
})

test('undefined type', async (t) => {
  const maybeVoid = maybe(undef)

  await t.test('should validate values', () => {
    const valueA = maybeVoid(undefined)
    const valueB = maybeVoid(null)
    assert.equal(valueA, undefined)
    assert.equal(valueB, null)
  })

  await t.test('should throw an error', () => {
    assert.throws(() => { maybeVoid(true) })
    assert.throws(() => { maybeVoid(12345) })
    assert.throws(() => { maybeVoid('foo') })
    assert.throws(() => { maybeVoid({}) })
    assert.throws(() => { maybeVoid([]) })
  })
})

test('boolean type', async (t) => {
  const maybeBool = maybe(boolean)

  await t.test('should validate values', t => {
    const valueA: ?boolean = maybeBool(undefined)
    const valueB = maybeBool(null)
    const valueC = maybeBool(true)
    assert.equal(valueA, undefined)
    assert.equal(valueB, null)
    assert.equal(valueC, true)
  })

  await t.test('should throw an error', () => {
    assert.throws(() => { maybeBool(12345) })
    assert.throws(() => { maybeBool('foo') })
    assert.throws(() => { maybeBool({}) })
    assert.throws(() => { maybeBool([]) })
  })
})

test('number type', async (t) => {
  const maybeNumber = maybe(number)

  await t.test('should validate values', () => {
    const valueA: ?number = maybeNumber(undefined)
    const valueB = maybeNumber(null)
    const valueC = maybeNumber(12345)
    assert.equal(valueA, undefined)
    assert.equal(valueB, null)
    assert.equal(valueC, 12345)
  })

  await t.test('should throw an error', () => {
    assert.throws(() => { maybeNumber(true) })
    assert.throws(() => { maybeNumber('foo') })
    assert.throws(() => { maybeNumber({}) })
    assert.throws(() => { maybeNumber([]) })
  })
})

test('string type', async (t) => {
  const maybeString = maybe(string)

  await t.test('should validate values', () => {
    const valueA: ?string = maybeString(undefined)
    const valueB = maybeString(null)
    const valueC = maybeString('foo')
    assert.equal(valueA, undefined)
    assert.equal(valueB, null)
    assert.equal(valueC, 'foo')
  })

  await t.test('should throw an error', () => {
    assert.throws(() => { maybeString(true) })
    assert.throws(() => { maybeString(12345) })
    assert.throws(() => { maybeString({}) })
    assert.throws(() => { maybeString([]) })
  })
})

test('array type', async (t) => {
  const maybeArrayOfString = maybe(arrayOf(string))

  await t.test('should validate values', () => {
    const valueA: ?Array<string> = maybeArrayOfString(undefined)
    const valueB = maybeArrayOfString(null)
    const valueC = maybeArrayOfString(['foo', 'bar'])
    assert.equal(valueA, undefined)
    assert.equal(valueB, null)
    assert.deepEqual(valueC, ['foo', 'bar'])
  })

  await t.test('should throw an error', () => {
    assert.throws(() => { maybeArrayOfString(true) })
    assert.throws(() => { maybeArrayOfString(12345) })
    assert.throws(() => { maybeArrayOfString('foo') })
    assert.throws(() => { maybeArrayOfString({}) })
    assert.throws(() => { maybeArrayOfString([12345]) })
  })
})

test('object type', async (t) => {
  const maybeObjectOf = maybe(objectOf({ name: string }))

  await t.test('should validate values', () => {
    const valueA: ?{ name: string, ... } = maybeObjectOf(undefined)
    const valueB = maybeObjectOf(null)
    const valueC = maybeObjectOf({ name: 'foo' })
    assert.equal(valueA, undefined)
    assert.equal(valueB, null)
    assert.deepEqual(valueC, { name: 'foo' })
  })

  await t.test('should throw an error', () => {
    assert.throws(() => { maybeObjectOf(true) })
    assert.throws(() => { maybeObjectOf(12345) })
    assert.throws(() => { maybeObjectOf('foo') })
    assert.throws(() => { maybeObjectOf(['bar']) })
  })
})
