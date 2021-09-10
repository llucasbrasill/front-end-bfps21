import { AxiosHttpClient } from './axios-http-client'
import axios from 'axios'
import { mockAxios, mockHttpResponse } from '../test'
import { mockPostRequest } from '@/data/test'

jest.mock('axios')

type SutTypes = {
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient()
  const mockedAxios = mockAxios()
  return {
    sut,
    mockedAxios
  }
}

describe('AxiosHttpClient', () => {
  test('Should call axios with correct value', async () => {
    const request = mockPostRequest()
    const { sut, mockedAxios } = makeSut()
    await sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })

  test('Should call axios with correct statusCode and body', async () => {
    const { sut, mockedAxios } = makeSut()
    const promisse = sut.post(mockPostRequest())
    expect(promisse).toEqual(mockedAxios.post.mock.results[0].value)
  })

  test('Should call axios with correct statusCode and body on failure', async () => {
    const { sut, mockedAxios } = makeSut()
    mockedAxios.post.mockRejectedValueOnce({
      response: mockHttpResponse()
    })
    const httpResponse = sut.post(mockPostRequest())
    expect(httpResponse).toEqual(mockedAxios.post.mock.results[0].value)
  })
})
