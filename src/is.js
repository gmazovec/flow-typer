// @flow

import { deprwarn } from './index.js'

export const isNil =
  (v: mixed) /*: v is null */ => {
    deprwarn('use of isNil validator is deprecated; use isNull instead', 'FT004')
    return v === null
  }

export const isNull =
  (v: mixed) /*: v is null */ =>
    v === null

export const isUndef =
  (v: mixed) /*: v is void */ =>
    typeof v === 'undefined'

export const isBoolean =
  (v: mixed) /*: v is boolean */ =>
    typeof v === 'boolean'

export const isNumber =
  (v: mixed) /*: v is number */ =>
    typeof v === 'number'

export const isString =
  (v: mixed) /*: v is string */ =>
    typeof v === 'string'

export const isObject =
  (v: mixed) /*: v is {...} */ =>
    v !== null && typeof v === 'object'
