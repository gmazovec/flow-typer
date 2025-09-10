// @flow
import assert from 'assert'
// $FlowExpectedError[cannot-resolve-module]
import { test } from 'node:test'
import * as typer from '../src/index.js'
import { EMPTY_VALUE } from '../src/const.js'

const {
  mapOf,
  boolean,
  string
} = typer

test('map type', async (t) => {
  const schema = mapOf(
    string,
    boolean
  )

  await t.test('should validate a map', () => {
    const input = {
      featureA: true,
      featureB: false
    }
    const value: { [string]: boolean } = schema(input, 'FlagMap')
    assert.deepEqual(value, input)
  })

  await t.test('should return empty map', () => {
    const value = schema(EMPTY_VALUE)
    assert.deepEqual(value, {});
  })

  await t.test('should throw an error', () => {
    assert.throws(() => { schema(null) })
    assert.throws(() => { schema(undefined) })
    assert.throws(() => { schema(true) })
    assert.throws(() => { schema(12345) })
    assert.throws(() => { schema('foo') })
    assert.throws(() => { schema([]) })
    assert.throws(() => { schema({ featureA: 'true' }) })
  })
})
