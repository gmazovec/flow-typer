// @flow
import type { TypeValidator } from '..'

exports.mixed = (
  function mixed (value) {
    return value
  }
  : TypeValidator<mixed>
)
