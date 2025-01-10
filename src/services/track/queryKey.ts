import type { trackApi } from '.'

const queryKey = {
  base: ['track'],

  getTrackList: () => [...queryKey.base, 'list'] as const,

  getTrackDetail: ({ id }: Parameters<typeof trackApi.getTrackDetail>[0]) =>
    [...queryKey.base, 'detail', id] as const,

  updateTrack: () => [...queryKey.base, 'update'] as const,

  createTrack: () => [...queryKey.base, 'create'] as const,

  deleteTrack: () => [...queryKey.base, 'delete'] as const
} as const

export default queryKey
