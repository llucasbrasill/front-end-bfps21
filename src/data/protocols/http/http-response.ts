export enum HttpStatusCode {
  ok = 200,
  noContent = 204,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  badRequest = 400,
  serverError = 400
}

export type HttpResponse<T> = {
  statusCode: HttpStatusCode
  body?: T
}
