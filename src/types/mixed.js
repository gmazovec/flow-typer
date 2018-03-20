// @flow
import type { TypeValidator } from '..'

exports.mixed = (
  function mixed (v) {
    return v
  }
  : TypeValidator<*>
)
