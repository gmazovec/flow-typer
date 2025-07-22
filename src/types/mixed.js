// @flow
import type { TypeValidator } from '..'

function mixed (value: mixed) {
  return value;
}
mixed.type = () => 'mixed';

exports.mixed = (mixed: TypeValidator<mixed>);