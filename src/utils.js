// @flow
const { EMPTY_VALUE } = require('./const')
const { isEmpty } = require('./is')

import type { LiteralValue, TypeValidator } from './'

exports.isType =
  <T, F: TypeValidator<T>>(typeFn: F): TypeValidator<boolean> =>
    (v: mixed, _scope? = ''): boolean => {
      try {
        typeFn(v, _scope)
        return true
      } catch (_) {
        return false
      }
    }

// This function will return value based on schema with inferred types. This
// value can be used to define type in Flow with 'typeof' utility.

exports.typeOf =
  <T>(schema: TypeValidator<T>): T =>
    schema(EMPTY_VALUE, '')

exports.getType = (
  function getType (typeFn) {
    if (typeof typeFn.type === 'function') return typeFn.type()
    return typeFn.name || '?'
  }
  : <T>(TypeValidator<T>) => string
)

class TypeValidatorError extends Error {
  expectedType: string
  valueType: string
  value: string
  typeScope: string
  sourceFile: string

  constructor (
    expectedType: string,
    valueType: string,
    value: string,
    typeName: string = '',
    typeScope: ?string = '',
  ) {
    const message =
      `invalid "${valueType}" value type; ${typeName || expectedType} type expected`
    super(message)
    this.expectedType = expectedType
    this.valueType = valueType
    this.value = value
    this.typeScope = typeScope || ''
    this.sourceFile = this.getSourceFile()
  }

  getSourceFile (): string {
    const fileNames = this.stack.match(/(\/[\w_\-.]+)+(\.\w+:\d+:\d+)/g) || []
    return fileNames.find(fileName => fileName.indexOf('/dist') === -1) || ''
  }

  toString (): string {
    return `
${this.stack}

    scope    ${this.typeScope}
    expected ${this.expectedType}
    type     ${this.valueType}
    value    ${this.value}
    file     ${this.sourceFile}
`
  }
}

TypeValidatorError.prototype.name = 'TypeValidatorError'
exports.TypeValidatorError = TypeValidatorError

exports.validatorError =
  <T>(typeFn: TypeValidator<T>, value: mixed, scope: ?string): TypeValidatorError => {
    return new TypeValidatorError(
      exports.getType(typeFn),
      typeof value,
      JSON.stringify(value),
      typeFn.name,
      scope
    )
  }














//
