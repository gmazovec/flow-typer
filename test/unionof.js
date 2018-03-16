// @flow
import test from 'ava-spec'
import typer from '../src'

/*:: import type { $Literal } from '../src' */

const {
  unionOf2,
  unionOf3,
  unionOf4,
  unionOf5,
  arrayOf,
  objectOf,
  string,
  number,
  boolean,
  nil,
  undef,
  tupleOf3,
  literalOf
} = typer

test.group('primitive types - cardinality 2', test => {
  const validator = unionOf2(
    (literalOf('foo') /*: $Literal<'foo'> */),
    (literalOf(12345) /*: $Literal<12345> */)
  )

  test('should validate an union', t => {
    t.is(validator('foo'), 'foo')
    t.is(validator(12345), 12345)
  })

  test('should throw an error', t => {
    t.throws(() => { validator(null) }, TypeError),
    t.throws(() => { validator(undefined) }, TypeError),
    t.throws(() => { validator(true) }, TypeError),
    t.throws(() => { validator(1234) }, TypeError),
    t.throws(() => { validator('bar') }, TypeError),
    t.throws(() => { validator({}) }, TypeError),
    t.throws(() => { validator([]) }, TypeError)
  })
})

test.group('primitive types - cardinality 4', test => {
  const validator = unionOf4(
    (literalOf(false) /*: $Literal<false> */),
    (literalOf(0) /*: $Literal<0> */),
    (literalOf(12345) /*: $Literal<12345> */),
    (literalOf('') /*: $Literal<''> */),
  )

  test('should validate an union', t => {
    t.is(validator(false), false)
    t.is(validator(0), 0)
    t.is(validator(12345), 12345)
    t.is(validator(''), '')
  })

  test('should throw an error', t => {
    t.throws(() => { validator(undefined) }, TypeError),
    t.throws(() => { validator(true) }, TypeError),
    t.throws(() => { validator(1234) }, TypeError),
    t.throws(() => { validator('bar') }, TypeError),
    t.throws(() => { validator({}) }, TypeError),
    t.throws(() => { validator([]) }, TypeError)
  })
})

test.group('primitive types - cardinality 5', test => {
  const validator = unionOf5(
    nil,
    undef,
    boolean,
    number,
    string
  )

  test('should validate an union', t => {
    t.is(validator(false), false)
    t.is(validator(true), true)
    t.is(validator(0), 0)
    t.is(validator(9), 9)
    t.is(validator(null), null)
    t.is(validator(undefined), undefined)
    t.is(validator(''), '')
    t.is(validator('foo'), 'foo')
  })

  test('should throw an error', t => {
    t.throws(() => { validator({}) }, TypeError),
    t.throws(() => { validator([]) }, TypeError)
  })
})

test.group('composable types', test => {
  const validator = unionOf3(
    objectOf({
      type: unionOf2(
        (literalOf('text') /*: $Literal<'text'> */),
        (literalOf('image') /*: $Literal<'image'> */)
      ),
      content: string,
      enabled: boolean
    }),
    arrayOf(string),
    tupleOf3(string, string, number)
  )

  test('should validate an union #1', t => {
    const input = { type: 'text', content: 'Hello', enabled: true }
    const value = validator(input)
    t.deepEqual(value, input)
  })

  test('should validate an union #2', t => {
    const input = ['this', 'is', 'an', 'array', 'of', 'strings']
    const value = validator(input)
    t.deepEqual(value, input)
  })

  test('should validate an union #3', t => {
    const input = ['Bob', 'bob@example.net', 43]
    const value = validator(input)
    t.deepEqual(value, input)
  })

  test('shold throw an error', t => {
    t.throws(() => { validator(null) }, TypeError)
    t.throws(() => { validator(undefined) }, TypeError)
    t.throws(() => { validator(true) }, TypeError)
    t.throws(() => { validator(12345) }, TypeError)
    t.throws(() => { validator('foo') }, TypeError)
    t.throws(() => { validator({ type: 'widge', content: 'Hello', enabled: true }) }, TypeError)
    t.throws(() => { validator({ type: 'widge', content: 'Hello', enabled: 1 }) }, TypeError)
    t.throws(() => { validator(['this', 'is', 1, 'array', 'of', 'strings']) }, TypeError)
    t.throws(() => { validator(['bob', 'bob@example.net', 36, true]) }, TypeError)
  })
})
