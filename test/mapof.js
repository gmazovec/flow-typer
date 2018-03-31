// @flow
import test from 'ava-spec'
import typer from '../src'

const {
  mapOf,
  boolean,
  string,
  TypeValidatorError
} = typer

test.group('map type', test => {
  const schema = mapOf(
    string,
    boolean
  )

  test('should validate a map', t => {
    const input = {
      featureA: true,
      featureB: false
    }
    const value = schema(input)
    t.deepEqual(value, input)
  })

  test('should throw an error', t => {
    t.throws(() => { schema(null) }, TypeValidatorError)
    t.throws(() => { schema(undefined) }, TypeValidatorError)
    t.throws(() => { schema(true) }, TypeValidatorError)
    t.throws(() => { schema(12345) }, TypeValidatorError)
    t.throws(() => { schema('foo') }, TypeValidatorError)
    t.throws(() => { schema([]) }, TypeValidatorError)
    t.throws(() => { schema({ featureA: 'true' }) }, TypeValidatorError)
  })
})
