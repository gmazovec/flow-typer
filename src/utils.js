// @flow
import { EMPTY_VALUE } from './const.js'

import type { LiteralValue, TypeValidator, TypeChecker } from './'

export const isType =
  <T, F: TypeValidator<T>>(typeFn: F): TypeChecker<boolean> =>
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

export const typeOf =
  <T>(schema: TypeValidator<T>): T =>
    schema(EMPTY_VALUE, '')

export const getType = (
  function getType (typeFn, _options) {
    return typeFn.type(_options)
  }
  : <T>(TypeValidator<T>, ?{ noVoid: boolean }) => string
)
