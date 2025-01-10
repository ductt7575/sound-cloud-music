const queryKey = {
  base: ['comment'],

  getCommentList: () => [...queryKey.base, 'list'] as const,

  deleteComment: () => [...queryKey.base, 'delete'] as const
} as const

export default queryKey
