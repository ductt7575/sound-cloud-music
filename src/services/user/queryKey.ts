import type { userApi } from '.'

const queryKey = {
  base: ['user'],

  getUserList: () => [...queryKey.base, 'list'] as const,

  getUserDetail: ({ id }: Parameters<typeof userApi.getUserDetail>[0]) =>
    [...queryKey.base, 'detail', id] as const,

  updateUser: () => [...queryKey.base, 'update'] as const,

  createUser: () => [...queryKey.base, 'create'] as const,

  deleteUser: () => [...queryKey.base, 'delete'] as const
} as const

export default queryKey
