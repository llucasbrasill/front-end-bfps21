import { HttpResponse } from '.'

export type HTtpPostParams<T> = {
  url: string
  body?: T
}

export interface HttpPostClient<T, R> {
  post: (params: HTtpPostParams<T>) => Promise<HttpResponse<R>>
}
