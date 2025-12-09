// @flow
import type { MixedValidator } from '..'

function _mixed (value: mixed) {
  return value;
}
_mixed.type = () => 'mixed';
_mixed.value = (): mixed => '';

export const mixed = (_mixed: MixedValidator);