// @flow

import { deprwarn } from './index.js'

export const isNil =
  (v: mixed) /*: implies v is null */ => {
    deprwarn('use of isNil validator is deprecated; use isNull instead', 'FT004')
    return v === null
  }

export const isNull =
  (v: mixed) /*: implies v is null */ =>
    v === null

export const isUndef =
  (v: mixed) /*: implies v is void */ =>
    typeof v === 'undefined'

export const isBoolean =
  (v: mixed) /*: implies v is boolean */ =>
    typeof v === 'boolean'

export const isNumber =
  (v: mixed) /*: implies v is number */ =>
    typeof v === 'number'

export const isString =
  (v: mixed) /*: implies v is string */ =>
    typeof v === 'string'

export const isObject =
  (v: mixed) /*: implies v is {...} */ =>
    v !== null && typeof v === 'object'
