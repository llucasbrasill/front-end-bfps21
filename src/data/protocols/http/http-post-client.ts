export type HTtpPostParams = {
  url: string
  body?: object
}

export interface HttpPostClient {
  post: (params: HTtpPostParams) => Promise<void>
}
