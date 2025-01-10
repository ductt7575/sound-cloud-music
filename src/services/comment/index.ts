import { queryOptions } from '@tanstack/react-query'

import * as commentApi from './api'
import commentQueryKey from './queryKey'

const commentQueryService = {
  getCommentList: () =>
    queryOptions({
      queryKey: commentQueryKey.getCommentList(),
      queryFn: commentApi.getCommentList
    }),

  deleteComment: () => {
    return {
      mutationKey: commentQueryKey.deleteComment(),
      mutationFn: (params: Parameters<typeof commentApi.deleteComment>[0]) =>
        commentApi.deleteComment(params)
    }
  }
}

export { commentApi, commentQueryKey, commentQueryService }
