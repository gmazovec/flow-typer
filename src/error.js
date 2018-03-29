// @flow
const { getType } = require('./utils')
import type { TypeValidator } from './'

class TypeValidatorError extends Error {
  expectedType: string
  valueType: string
  value: string
  typeScope: string
  sourceFile: string

  constructor (
    message: ?string,
    expectedType: string,
    valueType: string,
    value: string,
    typeName: string = '',
    typeScope: ?string = '',
  ) {
    const errMessage =
      message ||
      `invalid "${valueType}" value type; ${typeName || expectedType} type expected`
    super(message)
    this.expectedType = expectedType
    this.valueType = valueType
    this.value = value
    this.typeScope = typeScope || ''
    this.sourceFile = this.getSourceFile()
  }

  getSourceFile (): string {
    const fileNames = this.stack.match(/(\/[\w_\-.]+)+(\.\w+:\d+:\d+)/g) || []
    return fileNames.find(fileName => fileName.indexOf('/dist') === -1) || ''
  }

  toString (): string {
    return `
${this.stack}

    scope    ${this.typeScope}
    expected ${this.expectedType}
    type     ${this.valueType}
    value    ${this.value}
    file     ${this.sourceFile}
`
  }
}

TypeValidatorError.prototype.name = 'TypeValidatorError'
exports.TypeValidatorError = TypeValidatorError

exports.validatorError =
  <T>(typeFn: TypeValidator<T>, value: mixed, scope: ?string, message?: string): TypeValidatorError => {
    return new TypeValidatorError(
      message,
      getType(typeFn),
      typeof value,
      JSON.stringify(value),
      typeFn.name,
      scope
    )
  }
