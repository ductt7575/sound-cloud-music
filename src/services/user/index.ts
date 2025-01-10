import { queryOptions } from '@tanstack/react-query'

import * as userApi from './api'
import userQueryKey from './queryKey'

const userQueryService = {
  getUserList: () =>
    queryOptions({
      queryKey: userQueryKey.getUserList(),
      queryFn: userApi.getUserList
    }),

  getUserDetail: (params: Parameters<typeof userApi.getUserDetail>[0]) =>
    queryOptions({
      queryKey: userQueryKey.getUserDetail(params),
      queryFn: () => userApi.getUserDetail(params)
    }),

  createUser: () => {
    return {
      mutationKey: userQueryKey.createUser(),
      mutationFn: (params: Parameters<typeof userApi.createUser>[0]) =>
        userApi.createUser(params)
    }
  },

  updateUser: () => {
    return {
      mutationKey: userQueryKey.updateUser(),
      mutationFn: (params: Parameters<typeof userApi.updateUser>[0]) =>
        userApi.updateUser(params)
    }
  },

  deleteUser: () => {
    return {
      mutationKey: userQueryKey.deleteUser(),
      mutationFn: (params: Parameters<typeof userApi.deleteUser>[0]) =>
        userApi.deleteUser(params)
    }
  }
}

export { userApi, userQueryKey, userQueryService }
