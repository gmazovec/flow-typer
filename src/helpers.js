// @flow

export function getProperty (o: {...}, name: string): ?mixed {
  const d = Object.getOwnPropertyDescriptor(o, name);
  return d !== undefined ? d.value : d;
}

