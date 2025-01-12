import { BaseAPIResponse } from '@/types/base'
import { Comment } from '@/types/comment-management/comment'
import { axiosBaseInstance } from '@/utils/axios'

import { CommentGetDetailParams } from './types'

export const getCommentList = async (): Promise<BaseAPIResponse<Comment[]>> => {
  return axiosBaseInstance({
    url: '/comments',
    method: 'GET'
  })
}

export const deleteComment = async ({
  id
}: CommentGetDetailParams): Promise<BaseAPIResponse<void>> => {
  return axiosBaseInstance({
    url: `/comments/${id}`,
    method: 'DELETE'
  })
}
