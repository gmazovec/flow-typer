// @flow
import assert from 'assert'
// $FlowExpectedError[cannot-resolve-module]
import { test } from 'node:test'
import * as typer from '../src/index.js'

const { mixed } = typer

test('should validate null value', () => {
  assert.equal(mixed(null), null)
})

test('should validate undefined value', () => {
  assert.equal(mixed(undefined), undefined)
})

test('should validate boolean value', () => {
  assert.equal(mixed(true), true)
})

test('should validate number value', () => {
  assert.equal(mixed(12345), 12345)
})

test('should validate string value', () => {
  assert.equal(mixed('foo'), 'foo')
})

test('should validate object value', () => {
  const input = { name: 'foo' }
  assert.deepEqual(mixed(input), input)
})

test('should validate array value', () => {
  const input = [12345]
  assert.deepEqual(mixed(input), input)
})
