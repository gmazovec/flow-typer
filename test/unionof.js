// @flow
import test from 'ava-spec'
import typer from '../src'

import type { $Literal } from '../src'

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
  tupleOf,
  literalOf
} = typer

test.group('primitive types - cardinality 2', test => {
  const schema = unionOf2(
    (literalOf('foo'): $Literal<'foo'>),
    (literalOf(12345): $Literal<12345>)
  )

  test('should validate an union', t => {
    t.is(schema('foo'), 'foo')
    t.is(schema(12345), 12345)
  })

  test('should throw an error', t => {
    t.throws(() => { schema(null) }, TypeError),
    t.throws(() => { schema(undefined) }, TypeError),
    t.throws(() => { schema(true) }, TypeError),
    t.throws(() => { schema(1234) }, TypeError),
    t.throws(() => { schema('bar') }, TypeError),
    t.throws(() => { schema({}) }, TypeError),
    t.throws(() => { schema([]) }, TypeError)
  })
})

test.group('primitive types - cardinality 4', test => {
  const schema = unionOf4(
    (literalOf(false): $Literal<false>),
    (literalOf(0): $Literal<0>),
    (literalOf(12345): $Literal<12345>),
    (literalOf(''): $Literal<''>),
  )

  test('should validate an union', t => {
    t.is(schema(false), false)
    t.is(schema(0), 0)
    t.is(schema(12345), 12345)
    t.is(schema(''), '')
  })

  test('should throw an error', t => {
    t.throws(() => { schema(undefined) }, TypeError),
    t.throws(() => { schema(true) }, TypeError),
    t.throws(() => { schema(1234) }, TypeError),
    t.throws(() => { schema('bar') }, TypeError),
    t.throws(() => { schema({}) }, TypeError),
    t.throws(() => { schema([]) }, TypeError)
  })
})

test.group('primitive types - cardinality 5', test => {
  const schema = unionOf5(
    nil,
    undef,
    boolean,
    number,
    string
  )

  test('should validate an union', t => {
    t.is(schema(false), false)
    t.is(schema(true), true)
    t.is(schema(0), 0)
    t.is(schema(9), 9)
    t.is(schema(null), null)
    t.is(schema(undefined), undefined)
    t.is(schema(''), '')
    t.is(schema('foo'), 'foo')
  })

  test('should throw an error', t => {
    t.throws(() => { schema({}) }, TypeError),
    t.throws(() => { schema([]) }, TypeError)
  })
})

test.group('composable types', test => {
  const schema = unionOf3(
    objectOf({
      type: unionOf2(
        (literalOf('text'): $Literal<'text'>),
        (literalOf('image'): $Literal<'image'>)
      ),
      content: string,
      enabled: boolean
    }),
    arrayOf(string),
    tupleOf(string, string, number)
  )

  test('should validate an union #1', t => {
    const input = { type: 'text', content: 'Hello', enabled: true }
    const value = schema(input)
    t.deepEqual(value, input)
  })

  test('should validate an union #2', t => {
    const input = ['this', 'is', 'an', 'array', 'of', 'strings']
    const value = schema(input)
    t.deepEqual(value, input)
  })

  test('should validate an union #3', t => {
    const input = ['Bob', 'bob@example.net', 43]
    const value = schema(input)
    t.deepEqual(value, input)
  })

  test('shold throw an error', t => {
    t.throws(() => { schema(null) }, TypeError)
    t.throws(() => { schema(undefined) }, TypeError)
    t.throws(() => { schema(true) }, TypeError)
    t.throws(() => { schema(12345) }, TypeError)
    t.throws(() => { schema('foo') }, TypeError)
    t.throws(() => { schema({ type: 'widge', content: 'Hello', enabled: true }) }, TypeError)
    t.throws(() => { schema({ type: 'widge', content: 'Hello', enabled: 1 }) }, TypeError)
    t.throws(() => { schema(['this', 'is', 1, 'array', 'of', 'strings']) }, TypeError)
    t.throws(() => { schema(['bob', 'bob@example.net', 36, true]) }, TypeError)
  })
})
