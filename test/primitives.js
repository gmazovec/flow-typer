// @flow
import { assert, test } from './index.js'
import * as typer from '../src/index.js'

const { nil, undef, boolean, number, string, literal } = typer

test('nil type', async (t) => {
  await t.test('should return an nil value', () => {
    assert.equal((nil(null): null), null)
  })

  await t.test('should throw an error', () => {
    assert.throws(() => { nil(undefined) })
    assert.throws(() => { nil(true) })
    assert.throws(() => { nil(12345) })
    assert.throws(() => { nil('foo') })
    assert.throws(() => { nil({}) })
    assert.throws(() => { nil([]) })
  })
})

test('void type', async (t) => {
  await t.test('should return an undefined value', () => {
    assert.equal((undef(undefined): void), undefined)
  })

  await t.test('should throw an error', () => {
    assert.throws(() => { undef(null) })
    assert.throws(() => { undef(true) })
    assert.throws(() => { undef(12345) })
    assert.throws(() => { undef('foo') })
    assert.throws(() => { undef({}) })
    assert.throws(() => { undef([]) })
  })
})

test('boolean type', async (t) => {
  await t.test('should return a boolean value', () => {
    assert.equal((boolean(true): boolean), true)
    assert.equal(boolean(false), false)
  })

  await t.test('should throw an error', () => {
    assert.throws(() => { boolean(null) })
    assert.throws(() => { boolean(undefined) })
    assert.throws(() => { boolean(12345) })
    assert.throws(() => { boolean('foo') })
    assert.throws(() => { boolean({}) })
    assert.throws(() => { boolean([]) })
  })
})

test('number type', async (t) => {
  await t.test('should return a number value', () => {
    assert.equal((number(12345): number), 12345)
    assert.equal(number(123.45), 123.45)
  })

  await t.test('should throw an error', () => {
    assert.throws(() => { number(null) })
    assert.throws(() => { number(undefined) })
    assert.throws(() => { number(true) })
    assert.throws(() => { number('foo') })
    assert.throws(() => { number({}) })
    assert.throws(() => { number([]) })
  })
})

test('string type', async (t) => {
  await t.test('should returna a string value', () => {
    assert.equal((string('foo'): string), 'foo')
  })

  await t.test('should throw an error', () => {
    assert.throws(() => { string(null) })
    assert.throws(() => { string(undefined) })
    assert.throws(() => { string(false) })
    assert.throws(() => { string({}) })
    assert.throws(() => { string([]) })
  })
})

test('literal boolean type', async (t) => {
  const bool$Literal = literal(true)

  await t.test(`should return a 'true' literal`, () => {
    assert.equal((bool$Literal(true): true), true)
  })

  await t.test('should throw an error', () => {
    assert.throws(() => { bool$Literal(null) })
    assert.throws(() => { bool$Literal(undefined) })
    assert.throws(() => { bool$Literal(false) })
    assert.throws(() => { bool$Literal(12345) })
    assert.throws(() => { bool$Literal('foo') })
    assert.throws(() => { bool$Literal({}) })
    assert.throws(() => { bool$Literal([]) })
  })
})

test('literal number type', async (t) => {
  const number$Literal = literal(12345)

  await t.test('should return a number literal', () => {
    assert.equal((number$Literal(12345): 12345), 12345)
  })

  await t.test('should throw an error', () => {
    assert.throws(() => { number$Literal(null) })
    assert.throws(() => { number$Literal(undefined) })
    assert.throws(() => { number$Literal(false) })
    assert.throws(() => { number$Literal(123.45) })
    assert.throws(() => { number$Literal('foo') })
    assert.throws(() => { number$Literal({}) })
    assert.throws(() => { number$Literal([]) })
  })
})

test('literal string type', async (t) => {
  const string$Literal = literal('foo')

  await t.test('should return a string literal', () => {
    assert.equal((string$Literal('foo'): "foo"), 'foo')
  })

  await t.test('should throw an error', () => {
    assert.throws(() => { string$Literal(null) })
    assert.throws(() => { string$Literal(undefined) })
    assert.throws(() => { string$Literal(false) })
    assert.throws(() => { string$Literal(12345) })
    assert.throws(() => { string$Literal('fooo') })
    assert.throws(() => { string$Literal({}) })
    assert.throws(() => { string$Literal([]) })
  })
})
