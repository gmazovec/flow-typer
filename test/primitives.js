// @flow
import test from 'ava-spec'
import typer from '../src'

/*:: import type { $Literal } from '../src' */

const { nil, undef, boolean, number, string, literalOf } = typer

test.group('nil type', test => {
  test('should return an nil value', t => {
    t.is(nil(null), null)
  })

  test('should throw an error', t => {
    t.throws(() => { nil(undefined) }, TypeError)
    t.throws(() => { nil(true) }, TypeError)
    t.throws(() => { nil(12345) }, TypeError)
    t.throws(() => { nil('foo') }, TypeError)
    t.throws(() => { nil({}) }, TypeError)
    t.throws(() => { nil([]) }, TypeError)
  })
})

test.group('void type', test => {
  test('should return an undefined value', t => {
    t.is(undef(undefined), undefined)
  })

  test('should throw an error', t => {
    t.throws(() => { undef(null) }, TypeError)
    t.throws(() => { undef(true) }, TypeError)
    t.throws(() => { undef(12345) }, TypeError)
    t.throws(() => { undef('foo') }, TypeError)
    t.throws(() => { undef({}) }, TypeError)
    t.throws(() => { undef([]) }, TypeError)
  })
})

test.group('boolean type', test => {
  test('should return a boolean value', t => {
    t.is(boolean(true), true)
    t.is(boolean(false), false)
  })

  test('should throw an error', t => {
    t.throws(() => { boolean(null) }, TypeError)
    t.throws(() => { boolean(undefined) }, TypeError)
    t.throws(() => { boolean(12345) }, TypeError)
    t.throws(() => { boolean('foo') }, TypeError)
    t.throws(() => { boolean({}) }, TypeError)
    t.throws(() => { boolean([]) }, TypeError)
  })
})

test.group('number type', test => {
  test('should return a number value', t => {
    t.is(number(12345), 12345)
    t.is(number(123.45), 123.45)
  })

  test('should throw an error', t => {
    t.throws(() => { number(null) }, TypeError)
    t.throws(() => { number(undefined) }, TypeError)
    t.throws(() => { number(true) }, TypeError)
    t.throws(() => { number('foo') }, TypeError)
    t.throws(() => { number({}) }, TypeError)
    t.throws(() => { number([]) }, TypeError)
  })
})

test.group('string type', test => {
  test('should returna a string value', t => {
    t.is(string('foo'), 'foo')
  })

  test('should throw an error', t => {
    t.throws(() => { string(null) }, TypeError)
    t.throws(() => { string(undefined) }, TypeError)
    t.throws(() => { string(false) }, TypeError)
    t.throws(() => { string(12345) }, TypeError)
    t.throws(() => { string({}) }, TypeError)
    t.throws(() => { string([]) }, TypeError)
  })
})

test.group('literal boolean type', test => {
  const bool$Literal = (literalOf(true) /*: $Literal<true> */)

  test(`should return a 'true' literal`, t => {
    t.is(bool$Literal(true), true)
  })

  test('should throw an error', t => {
    t.throws(() => { bool$Literal(null) }, TypeError)
    t.throws(() => { bool$Literal(undefined) }, TypeError)
    t.throws(() => { bool$Literal(false) }, TypeError)
    t.throws(() => { bool$Literal(12345) }, TypeError)
    t.throws(() => { bool$Literal('foo') }, TypeError)
    t.throws(() => { bool$Literal({}) }, TypeError)
    t.throws(() => { bool$Literal([]) }, TypeError)
  })
})

test.group('literal number type', test => {
  const number$Literal = (literalOf(12345) /*: $Literal<12345> */)

  test('should return a number literal', t => {
    t.is(number$Literal(12345), 12345)
  })

  test('should throw an error', t => {
    t.throws(() => { number$Literal(null) }, TypeError)
    t.throws(() => { number$Literal(undefined) }, TypeError)
    t.throws(() => { number$Literal(false) }, TypeError)
    t.throws(() => { number$Literal(123.45) }, TypeError)
    t.throws(() => { number$Literal('foo') }, TypeError)
    t.throws(() => { number$Literal({}) }, TypeError)
    t.throws(() => { number$Literal([]) }, TypeError)
  })
})

test.group('literal string type', test => {
  const string$Literal = (literalOf('foo') /*: $Literal<'foo'> */)

  test('should return a string literal', t => {
    t.is(string$Literal('foo'), 'foo')
  })

  test('should throw an error', t => {
    t.throws(() => { string$Literal(null) }, TypeError)
    t.throws(() => { string$Literal(undefined) }, TypeError)
    t.throws(() => { string$Literal(false) }, TypeError)
    t.throws(() => { string$Literal(12345) }, TypeError)
    t.throws(() => { string$Literal('fooo') }, TypeError)
    t.throws(() => { string$Literal({}) }, TypeError)
    t.throws(() => { string$Literal([]) }, TypeError)
  })
})
