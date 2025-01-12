import { useMutation, useQueryClient } from '@tanstack/react-query'
import { notification } from 'antd'

import { userQueryService } from '@/services/user'

const useUser = () => {
  const queryClient = useQueryClient()

  const { mutateAsync: deleteUserMutate } = useMutation({
    ...userQueryService.deleteUser(),
    onSuccess: () => {
      queryClient.invalidateQueries(userQueryService.getUserList())
      notification.success({
        message: 'Xóa user thành công.'
      })
    },
    onError: (error) => {
      notification.error({
        message: JSON.stringify(error.message)
      })
    }
  })

  const { mutateAsync: updateUserMutate } = useMutation({
    ...userQueryService.updateUser(),
    onSuccess: () => {
      queryClient.invalidateQueries(userQueryService.getUserList())
      notification.success({
        message: 'Cập nhật user thành công.'
      })
    },
    onError: (error) => {
      notification.error({
        message: JSON.stringify(error.message)
      })
    }
  })

  const { mutateAsync: createUserMutate } = useMutation({
    ...userQueryService.createUser(),
    onSuccess: () => {
      queryClient.invalidateQueries(userQueryService.getUserList())
      notification.success({
        message: 'Create user successfully!'
      })
    },
    onError: (error) => {
      notification.error({
        message: JSON.stringify(error.message)
      })
    }
  })

  return {
    deleteUserMutate,
    updateUserMutate,
    createUserMutate
  }
}

export default useUser
