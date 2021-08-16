import { HttpPostClient, HTtpPostParams } from '@/data/protocols/http/http-post-client'

export class HttpPostClientSpy implements HttpPostClient {
  url?: string
  body?: object

  async post (params: HTtpPostParams): Promise<void> {
    this.url = params.url
    this.body = params.body
    return await Promise.resolve()
  }
}
