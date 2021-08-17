export class UnexpectedError extends Error {
  constructor () {
    super('Something\'s wrong. try again soon.')
    this.name = 'UnexpectedError'
  }
}
