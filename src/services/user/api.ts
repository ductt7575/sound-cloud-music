import { BaseAPIResponse } from '@/types/base'
import { User } from '@/types/user-management/user'
import { axiosBaseInstance } from '@/utils/axios'

import { UserGetDetailParams, UserUpsertParams } from './types'

export const getUserList = async (): Promise<BaseAPIResponse<User[]>> => {
  return axiosBaseInstance({
    url: '/users',
    method: 'GET'
  })
}

export const getUserDetail = async ({
  id
}: UserGetDetailParams): Promise<BaseAPIResponse<User>> => {
  return axiosBaseInstance({
    url: `/users/${id}`,
    method: 'GET'
  })
}

export const updateUser = async (
  params: UserUpsertParams
): Promise<BaseAPIResponse<User>> => {
  return axiosBaseInstance({
    url: `/users`,
    method: 'POST',
    data: params
  })
}

export const createUser = async (
  params: UserUpsertParams
): Promise<BaseAPIResponse<User>> => {
  return axiosBaseInstance({
    url: '/users',
    method: 'POST',
    data: params
  })
}

export const deleteUser = async ({
  id
}: UserGetDetailParams): Promise<BaseAPIResponse<void>> => {
  return axiosBaseInstance({
    url: `/users/${id}`,
    method: 'DELETE'
  })
}
