// @flow
import type { TypeValidator } from '..'

function _mixed (value: mixed) {
  return value;
}
_mixed.type = () => 'mixed';

export const mixed = (_mixed: TypeValidator<mixed>);