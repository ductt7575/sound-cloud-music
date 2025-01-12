import { useMutation, useQueryClient } from '@tanstack/react-query'
import { notification } from 'antd'

import { commentQueryService } from '@/services/comment'

const useComment = () => {
  const queryClient = useQueryClient()

  const { mutateAsync: deleteCommentMutate } = useMutation({
    ...commentQueryService.deleteComment(),
    onSuccess: () => {
      queryClient.invalidateQueries(commentQueryService.getCommentList())
      notification.success({
        message: 'Xóa comment thành công.'
      })
    },
    onError: (error) => {
      notification.error({
        message: JSON.stringify(error.message)
      })
    }
  })
  return {
    deleteCommentMutate
  }
}

export default useComment
