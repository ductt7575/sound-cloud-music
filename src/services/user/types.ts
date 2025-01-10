import { User } from '@/types/user-management/user'

export type UserUpsertParams = Omit<User, 'id'> & {
  id?: User['_id']
}

export type UserGetDetailParams = {
  id: User['_id']
}
