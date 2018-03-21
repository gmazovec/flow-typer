// @flow
const { EMPTY_VALUE } = require('./const')
const { isEmpty } = require('./is')

import type { LiteralValue, TypeValidator } from './'

exports.isType =
  <T, F: TypeValidator<T>>(typeFn: F): TypeValidator<boolean> =>
    (v: mixed): boolean => {
      try {
        typeFn(v)
        return true
      } catch (_) {
        return false
      }
    }

// This function will return value based on schema with inferred types. This
// value can be used to define type in Flow with 'typeof' utility.

exports.typeOf =
  <T>(schema: TypeValidator<T>): T =>
    schema(EMPTY_VALUE)

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
  typeScope: string

  constructor (
    expectedType: string,
    valueType: string,
    typeScope: string,
    typeName: string
  ) {
    const message =
      `invalid "${valueType}" value type; ${typeName || expectedType} type expected`
    super(message)
    this.expectedType = expectedType
    this.valueType = valueType
    this.typeScope = typeScope
  }
}

TypeValidatorError.prototype.name = 'TypeValidatorError'
exports.TypeValidatorError = TypeValidatorError

exports.validatorError =
  <T>(typeFn: TypeValidator<T>, value: mixed): TypeValidatorError => {
    return new TypeValidatorError(
      exports.getType(typeFn), typeof value, '', typeFn.name || ''
    )
  }














//
