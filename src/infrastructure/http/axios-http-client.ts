import { HTtpPostParams } from '@/data/protocols/http'
import axios from 'axios'

export class AxiosHttpClient {
  async post (params: HTtpPostParams<any>): Promise<void> {
    await axios(params.url)
  }
}
