// @flow
import test from 'ava-spec'
import typer from '../src'

import type { $Literal } from '../src'

const { nil, undef, boolean, number, string, literalOf, TypeValidatorError } = typer

test.group('nil type', test => {
  test('should return an nil value', t => {
    t.is(nil(null), null)
  })

  test('should throw an error', t => {
    t.throws(() => { nil(undefined) }, TypeValidatorError)
    t.throws(() => { nil(true) }, TypeValidatorError)
    t.throws(() => { nil(12345) }, TypeValidatorError)
    t.throws(() => { nil('foo') }, TypeValidatorError)
    t.throws(() => { nil({}) }, TypeValidatorError)
    t.throws(() => { nil([]) }, TypeValidatorError)
  })
})

test.group('void type', test => {
  test('should return an undefined value', t => {
    t.is(undef(undefined), undefined)
  })

  test('should throw an error', t => {
    t.throws(() => { undef(null) }, TypeValidatorError)
    t.throws(() => { undef(true) }, TypeValidatorError)
    t.throws(() => { undef(12345) }, TypeValidatorError)
    t.throws(() => { undef('foo') }, TypeValidatorError)
    t.throws(() => { undef({}) }, TypeValidatorError)
    t.throws(() => { undef([]) }, TypeValidatorError)
  })
})

test.group('boolean type', test => {
  test('should return a boolean value', t => {
    t.is(boolean(true), true)
    t.is(boolean(false), false)
  })

  test('should throw an error', t => {
    t.throws(() => { boolean(null) }, TypeValidatorError)
    t.throws(() => { boolean(undefined) }, TypeValidatorError)
    t.throws(() => { boolean(12345) }, TypeValidatorError)
    t.throws(() => { boolean('foo') }, TypeValidatorError)
    t.throws(() => { boolean({}) }, TypeValidatorError)
    t.throws(() => { boolean([]) }, TypeValidatorError)
  })
})

test.group('number type', test => {
  test('should return a number value', t => {
    t.is(number(12345), 12345)
    t.is(number(123.45), 123.45)
  })

  test('should throw an error', t => {
    t.throws(() => { number(null) }, TypeValidatorError)
    t.throws(() => { number(undefined) }, TypeValidatorError)
    t.throws(() => { number(true) }, TypeValidatorError)
    t.throws(() => { number('foo') }, TypeValidatorError)
    t.throws(() => { number({}) }, TypeValidatorError)
    t.throws(() => { number([]) }, TypeValidatorError)
  })
})

test.group('string type', test => {
  test('should returna a string value', t => {
    t.is(string('foo'), 'foo')
  })

  test('should throw an error', t => {
    t.throws(() => { string(null) }, TypeValidatorError)
    t.throws(() => { string(undefined) }, TypeValidatorError)
    t.throws(() => { string(false) }, TypeValidatorError)
    t.throws(() => { string(12345) }, TypeValidatorError)
    t.throws(() => { string({}) }, TypeValidatorError)
    t.throws(() => { string([]) }, TypeValidatorError)
  })
})

test.group('literal boolean type', test => {
  const bool$Literal = (literalOf(true): $Literal<true>)

  test(`should return a 'true' literal`, t => {
    t.is(bool$Literal(true), true)
  })

  test('should throw an error', t => {
    t.throws(() => { bool$Literal(null) }, TypeValidatorError)
    t.throws(() => { bool$Literal(undefined) }, TypeValidatorError)
    t.throws(() => { bool$Literal(false) }, TypeValidatorError)
    t.throws(() => { bool$Literal(12345) }, TypeValidatorError)
    t.throws(() => { bool$Literal('foo') }, TypeValidatorError)
    t.throws(() => { bool$Literal({}) }, TypeValidatorError)
    t.throws(() => { bool$Literal([]) }, TypeValidatorError)
  })
})

test.group('literal number type', test => {
  const number$Literal = (literalOf(12345): $Literal<12345>)

  test('should return a number literal', t => {
    t.is(number$Literal(12345), 12345)
  })

  test('should throw an error', t => {
    t.throws(() => { number$Literal(null) }, TypeValidatorError)
    t.throws(() => { number$Literal(undefined) }, TypeValidatorError)
    t.throws(() => { number$Literal(false) }, TypeValidatorError)
    t.throws(() => { number$Literal(123.45) }, TypeValidatorError)
    t.throws(() => { number$Literal('foo') }, TypeValidatorError)
    t.throws(() => { number$Literal({}) }, TypeValidatorError)
    t.throws(() => { number$Literal([]) }, TypeValidatorError)
  })
})

test.group('literal string type', test => {
  const string$Literal = (literalOf('foo'): $Literal<'foo'>)

  test('should return a string literal', t => {
    t.is(string$Literal('foo'), 'foo')
  })

  test('should throw an error', t => {
    t.throws(() => { string$Literal(null) }, TypeValidatorError)
    t.throws(() => { string$Literal(undefined) }, TypeValidatorError)
    t.throws(() => { string$Literal(false) }, TypeValidatorError)
    t.throws(() => { string$Literal(12345) }, TypeValidatorError)
    t.throws(() => { string$Literal('fooo') }, TypeValidatorError)
    t.throws(() => { string$Literal({}) }, TypeValidatorError)
    t.throws(() => { string$Literal([]) }, TypeValidatorError)
  })
})
