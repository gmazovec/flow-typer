// @flow
import assert from 'assert'
// $FlowExpectedError
import { test } from 'node:test'
import * as typer from '../src/index.js'

import type { $Literal } from '../src'

const {
  unionOf,
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

test('primitive types - cardinality 2', async (t) => {
  const schema = unionOf(
    (literalOf('foo'): $Literal<'foo'>),
    (literalOf(12345): $Literal<12345>)
  )

  await t.test('should validate an union', () => {
    assert.equal(schema('foo'), 'foo')
    assert.equal(schema(12345), 12345)
  })

  await t.test('should throw an error', () => {
    assert.throws(() => { schema(null) }),
    assert.throws(() => { schema(undefined) }),
    assert.throws(() => { schema(true) }),
    assert.throws(() => { schema(1234) }),
    assert.throws(() => { schema('bar') }),
    assert.throws(() => { schema({}) }),
    assert.throws(() => { schema([]) })
  })
})

test('primitive types - cardinality 4', async (t) => {
  const schema = unionOf(
    (literalOf(false): $Literal<false>),
    (literalOf(0): $Literal<0>),
    (literalOf(12345): $Literal<12345>),
    (literalOf(''): $Literal<''>),
  )

  await t.test('should validate an union', () => {
    assert.equal(schema(false), false)
    assert.equal(schema(0), 0)
    assert.equal(schema(12345), 12345)
    assert.equal(schema(''), '')
  })

  await t.test('should throw an error', () => {
    assert.throws(() => { schema(undefined) }),
    assert.throws(() => { schema(true) }),
    assert.throws(() => { schema(1234) }),
    assert.throws(() => { schema('bar') }),
    assert.throws(() => { schema({}) }),
    assert.throws(() => { schema([]) })
  })
})

test('primitive types - cardinality 5', async (t) => {
  const schema = unionOf(
    nil,
    undef,
    boolean,
    number,
    string
  )

  await t.test('should validate an union', () => {
    assert.equal((schema(false): null | void | boolean | number | string), false)
    assert.equal(schema(true), true)
    assert.equal(schema(0), 0)
    assert.equal(schema(9), 9)
    assert.equal(schema(null), null)
    assert.equal(schema(undefined), undefined)
    assert.equal(schema(''), '')
    assert.equal(schema('foo'), 'foo')
  })

  await t.test('should throw an error', () => {
    assert.throws(() => { schema({}) }),
    assert.throws(() => { schema([]) })
  })
})

test('composable types', async (t) => {
  const schema = unionOf(
    objectOf({
      type: unionOf(
        (literalOf('text'): $Literal<'text'>),
        (literalOf('image'): $Literal<'image'>)
      ),
      content: string,
      enabled: boolean
    }),
    arrayOf(string),
    tupleOf(string, string, number)
  )

  await t.test('should validate an union #1', () => {
    const input = { type: 'text', content: 'Hello', enabled: true }
    const value: { type: "text" | "image", content: string, enabled: boolean } | Array<string> | [string, string, number] =
      schema(input)
    assert.deepEqual(value, input)
  })

  await t.test('should validate an union #2', () => {
    const input = ['this', 'is', 'an', 'array', 'of', 'strings']
    const value = schema(input)
    assert.deepEqual(value, input)
  })

  await t.test('should validate an union #3', () => {
    const input = ['Bob', 'bob@example.net', 43]
    const value = schema(input)
    assert.deepEqual(value, input)
  })

  await t.test('shold throw an error', () => {
    assert.throws(() => { schema(null) })
    assert.throws(() => { schema(undefined) })
    assert.throws(() => { schema(true) })
    assert.throws(() => { schema(12345) })
    assert.throws(() => { schema('foo') })
    assert.throws(() => { schema({ type: 'widge', content: 'Hello', enabled: true }) })
    assert.throws(() => { schema({ type: 'widge', content: 'Hello', enabled: 1 }) })
    assert.throws(() => { schema(['this', 'is', 1, 'array', 'of', 'strings']) })
    assert.throws(() => { schema(['bob', 'bob@example.net', 36, true]) })
  })
})
