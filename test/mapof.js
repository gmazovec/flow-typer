// @flow
import test from 'ava-spec'
import typer from '../src'

const {
  mapOf,
  boolean,
  string
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
    const value: { [string]: boolean } = schema(input)
    t.deepEqual(value, input)
  })

  test('should throw an error', t => {
    t.throws(() => { schema(null) })
    t.throws(() => { schema(undefined) })
    t.throws(() => { schema(true) })
    t.throws(() => { schema(12345) })
    t.throws(() => { schema('foo') })
    t.throws(() => { schema([]) })
    t.throws(() => { schema({ featureA: 'true' }) })
  })
})
