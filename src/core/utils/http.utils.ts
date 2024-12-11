import { FetchQueryOptions } from '@tanstack/react-query'

import { AxiosRequestConfig } from 'axios'
import { filterParams, setFormData } from './helper.utils'
import httpBase from './axios.utils'

class Http {
  /**
   * GET REQUEST
   * @param url
   * @param params
   * @param responseHeader
   * @param additionalParams
   * @param additionalHeaders
   * @param additionalAxiosOptions
   */
  async get(
    url: string,
    params: FetchQueryOptions | null = null,
    additionalParams: Record<string, unknown> = {},
    responseHeader = false,
    additionalHeaders: Record<string, string> | undefined = undefined,
    additionalAxiosOptions: AxiosRequestConfig = {}
  ) {
    params = filterParams(
      params && params?.queryKey
        ? { ...(params.queryKey[0] as Record<string, any>) }
        : {}
    )

    return await httpBase(
      responseHeader,
      additionalAxiosOptions,
      additionalHeaders
    ).get(url, {
      params: {
        ...params,
        ...additionalParams,
      },
    })
  }

  /**
   * POST REQUEST
   * @param url
   * @param data
   * @param responseHeader
   * @param additionalHeaders
   * @param additionalAxiosOptions
   */
  async post<T extends Record<string, any>>(
    url: string,
    data: T,
    responseHeader = false,
    additionalHeaders: Record<string, string> | undefined = undefined,
    additionalAxiosOptions: AxiosRequestConfig = {}
  ) {
    const formData = setFormData(filterParams(data))

    return await httpBase(
      responseHeader,
      additionalAxiosOptions,
      additionalHeaders
    ).post(url, formData)
  }

  /**
   * PUT REQUEST
   * @param url
   * @param data
   * @param responseHeader
   * @param additionalHeaders
   * @param additionalAxiosOptions
   */
  async put<T extends Record<string, any>>(
    url: string,
    data: T,
    responseHeader = false,
    additionalHeaders: Record<string, string> | undefined = undefined,
    additionalAxiosOptions: AxiosRequestConfig = {}
  ) {
    /** Method override */
    data = {
      ...data,
      _method: 'put',
    }
    const formData = setFormData(filterParams(data))
    return await httpBase(
      responseHeader,
      additionalAxiosOptions,
      additionalHeaders
    ).post(`${url}`, formData)
  }

  /**
   * PATCH REQUEST
   * @param url
   * @param data
   * @param responseHeader
   * @param additionalHeaders
   * @param additionalAxiosOptions
   */
  async patch<T extends Record<string, any>>(
    url: string,
    data: T,
    responseHeader = false,
    additionalHeaders: Record<string, string> | undefined = undefined,
    additionalAxiosOptions: AxiosRequestConfig = {}
  ) {
    /** Method override */
    data = {
      ...data,
      _method: 'patch',
    }
    const formData = setFormData(filterParams(data))
    return await httpBase(
      responseHeader,
      additionalAxiosOptions,
      additionalHeaders
    ).post(`${url}`, formData)
  }

  /**
   * DELETE REQUEST
   * @param url
   * @param responseHeader
   * @param additionalHeaders
   * @param additionalAxiosOptions
   */
  async delete(
    url: string,
    responseHeader = false,
    additionalHeaders: Record<string, string> | undefined = undefined,
    additionalAxiosOptions: AxiosRequestConfig = {}
  ) {
    return await httpBase(
      responseHeader,
      additionalAxiosOptions,
      additionalHeaders
    ).delete(`${url}`)
  }
}

export default new Http()
