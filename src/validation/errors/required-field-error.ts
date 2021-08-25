export class RequiredFiedlError extends Error {
  constructor () {
    super('Required Field')
    this.name = 'RequiredFieldError'
  }
}
