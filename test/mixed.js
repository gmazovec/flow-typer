// @flow
import test from 'ava-spec'
import typer from '../src'

const { mixed } = typer

test('should validate null value', t => {
  t.is(mixed(null), null)
})

test('should validate undefined value', t => {
  t.is(mixed(undefined), undefined)
})

test('should validate boolean value', t => {
  t.is(mixed(true), true)
})

test('should validate number value', t => {
  t.is(mixed(12345), 12345)
})

test('should validate string value', t => {
  t.is(mixed('foo'), 'foo')
})

test('should validate object value', t => {
  const input = { name: 'foo' }
  t.deepEqual(mixed(input), input)
})

test('should validate array value', t => {
  const input = [12345]
  t.deepEqual(mixed(input), input)
})
