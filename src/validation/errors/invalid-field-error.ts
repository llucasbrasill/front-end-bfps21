export class InvalidFieldError extends Error {
  constructor () {
    super('Por favor, informe um valor correto.')
  }
}
