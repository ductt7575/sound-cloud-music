import { User } from '@/types/user-management/user'

export type UserUpsertParams = Omit<User, 'id' | 'password'> & {
  id?: User['_id']
  password?: User['password']
}

export type UserGetDetailParams = {
  id: User['_id']
}
