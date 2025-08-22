// @flow
import test from 'ava-spec'
import * as typer from '../src/index.js'

import type { $Literal } from '../src'

const { nil, undef, boolean, number, string, literalOf } = typer

test.group('nil type', test => {
  test('should return an nil value', t => {
    t.is((nil(null): null), null)
  })

  test('should throw an error', t => {
    t.throws(() => { nil(undefined) })
    t.throws(() => { nil(true) })
    t.throws(() => { nil(12345) })
    t.throws(() => { nil('foo') })
    t.throws(() => { nil({}) })
    t.throws(() => { nil([]) })
  })
})

test.group('void type', test => {
  test('should return an undefined value', t => {
    t.is((undef(undefined): void), undefined)
  })

  test('should throw an error', t => {
    t.throws(() => { undef(null) })
    t.throws(() => { undef(true) })
    t.throws(() => { undef(12345) })
    t.throws(() => { undef('foo') })
    t.throws(() => { undef({}) })
    t.throws(() => { undef([]) })
  })
})

test.group('boolean type', test => {
  test('should return a boolean value', t => {
    t.is((boolean(true): boolean), true)
    t.is(boolean(false), false)
  })

  test('should throw an error', t => {
    t.throws(() => { boolean(null) })
    t.throws(() => { boolean(undefined) })
    t.throws(() => { boolean(12345) })
    t.throws(() => { boolean('foo') })
    t.throws(() => { boolean({}) })
    t.throws(() => { boolean([]) })
  })
})

test.group('number type', test => {
  test('should return a number value', t => {
    t.is((number(12345): number), 12345)
    t.is(number(123.45), 123.45)
  })

  test('should throw an error', t => {
    t.throws(() => { number(null) })
    t.throws(() => { number(undefined) })
    t.throws(() => { number(true) })
    t.throws(() => { number('foo') })
    t.throws(() => { number({}) })
    t.throws(() => { number([]) })
  })
})

test.group('string type', test => {
  test('should returna a string value', t => {
    t.is((string('foo'): string), 'foo')
  })

  test('should throw an error', t => {
    t.throws(() => { string(null) })
    t.throws(() => { string(undefined) })
    t.throws(() => { string(false) })
    t.throws(() => { string(12345) })
    t.throws(() => { string({}) })
    t.throws(() => { string([]) })
  })
})

test.group('literal boolean type', test => {
  const bool$Literal = (literalOf(true): $Literal<true>)

  test(`should return a 'true' literal`, t => {
    t.is((bool$Literal(true): true), true)
  })

  test('should throw an error', t => {
    t.throws(() => { bool$Literal(null) })
    t.throws(() => { bool$Literal(undefined) })
    t.throws(() => { bool$Literal(false) })
    t.throws(() => { bool$Literal(12345) })
    t.throws(() => { bool$Literal('foo') })
    t.throws(() => { bool$Literal({}) })
    t.throws(() => { bool$Literal([]) })
  })
})

test.group('literal number type', test => {
  const number$Literal = (literalOf(12345): $Literal<12345>)

  test('should return a number literal', t => {
    t.is((number$Literal(12345): 12345), 12345)
  })

  test('should throw an error', t => {
    t.throws(() => { number$Literal(null) })
    t.throws(() => { number$Literal(undefined) })
    t.throws(() => { number$Literal(false) })
    t.throws(() => { number$Literal(123.45) })
    t.throws(() => { number$Literal('foo') })
    t.throws(() => { number$Literal({}) })
    t.throws(() => { number$Literal([]) })
  })
})

test.group('literal string type', test => {
  const string$Literal = (literalOf('foo'): $Literal<'foo'>)

  test('should return a string literal', t => {
    t.is((string$Literal('foo'): "foo"), 'foo')
  })

  test('should throw an error', t => {
    t.throws(() => { string$Literal(null) })
    t.throws(() => { string$Literal(undefined) })
    t.throws(() => { string$Literal(false) })
    t.throws(() => { string$Literal(12345) })
    t.throws(() => { string$Literal('fooo') })
    t.throws(() => { string$Literal({}) })
    t.throws(() => { string$Literal([]) })
  })
})
