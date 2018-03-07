// @flow
import test from 'ava-spec'
import typer from '../src'

const { tupleOf, boolean, number, string, objectOf, arrayOf } = typer

test.group('primitive types', test => {
  const validator = tupleOf(
    ([name, age, active]) /*: [string, number, boolean] */ =>
      [string(name), number(age), boolean(active)]
  )

  test('should validate a tuple', t => {
    const input = ['foo', 12345, true]
    const value = validator(input)
    t.deepEqual(value, input)
  })

  test('should throw an error', t => {
    t.throws(() => { validator(null) }, TypeError)
    t.throws(() => { validator(undefined) }, TypeError)
    t.throws(() => { validator(true) }, TypeError)
    t.throws(() => { validator(12345) }, TypeError)
    t.throws(() => { validator('foo') }, TypeError)
    t.throws(() => { validator({}) }, TypeError)
    t.throws(() => { validator([]) }, TypeError)
    t.throws(() => { validator(['foo', '12345', 'true']) }, TypeError)
    t.throws(() => { validator(['foo', 12345]) }, TypeError)
  })
})

test.group('compoud type', test => {
  const userSchema = objectOf((o) => ({
    email: string(o.email),
    age: number(o.age),
    active: boolean(o.active),
    roles: arrayOf(string)(o.roles)
  }))
  const validator = tupleOf(
    ([user, key]) /*: [*] */ => [userSchema(user)]
  )
  const user = { email: 'foo@example.org', age: 33, active: false, roles: ['admin'] }

  test('should validate a tuple', t => {
    const input = [user]
    const value = validator(input)
    t.deepEqual(value, input)
  })

  test('should throw an error', t => {
    t.throws(() => { validator([{ ...user, age: '33' }]) }, TypeError)
    t.throws(() => { validator([{ ...user, email: true }]) }, TypeError)
    t.throws(() => { validator([{ ...user, active: 1 }]) }, TypeError)
    t.throws(() => { validator([{ ...user, roles: [{ admin: true }] }]) }, TypeError)
  })
})
