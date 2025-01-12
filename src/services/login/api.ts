import { BaseAPIResponse } from '@/types/base'
import { axiosLoginInstance } from '@/utils/axios'

interface CurrentUser {
  access_token: string
  refresh_token: string
  user: {
    _id: string
    username: string
    email: string
    address: string
    isVerify: boolean
    type: string
    name: string
    role: string
    gender: string
    age: number
  }
}

export const getDataCurrentUser = async ({
  username,
  password
}: {
  username: string
  password: string
}): Promise<BaseAPIResponse<CurrentUser>> => {
  return axiosLoginInstance({
    url: '/auth/login',
    method: 'POST',
    data: {
      username,
      password
    }
  })
}
