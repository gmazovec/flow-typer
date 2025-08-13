// @flow
import test from 'ava-spec'
import typer from '../src'

const { TypeValidatorError } = typer

test.group('TypeValidatorError', test => {
  const error = new TypeValidatorError('', 'personT', 'boolean', 'true')

  test('should return custom message', t => {
    t.is(error.message.split('\n')[0], 'invalid "boolean" value type; personT type expected')
  })

  test('should return source file', t => {
    try {
      throw error
    } catch (err) {
      err.stack = '';
      const sourceFile = err.getSourceFile()
      t.is(sourceFile.split('/').slice(-1)[0], '')
    }
  })
})
