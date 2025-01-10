import { queryOptions } from '@tanstack/react-query'

import * as trackApi from './api'
import trackQueryKey from './queryKey'

const trackQueryService = {
  getTrackList: () =>
    queryOptions({
      queryKey: trackQueryKey.getTrackList(),
      queryFn: trackApi.getTrackList
    }),

  getTrackDetail: (params: Parameters<typeof trackApi.getTrackDetail>[0]) =>
    queryOptions({
      queryKey: trackQueryKey.getTrackDetail(params),
      queryFn: () => trackApi.getTrackDetail(params)
    }),

  createTrack: () => {
    return {
      mutationKey: trackQueryKey.createTrack(),
      mutationFn: (params: Parameters<typeof trackApi.createTrack>[0]) =>
        trackApi.createTrack(params)
    }
  },

  updateTrack: () => {
    return {
      mutationKey: trackQueryKey.updateTrack(),
      mutationFn: (params: Parameters<typeof trackApi.updateTrack>[0]) =>
        trackApi.updateTrack(params)
    }
  },

  deleteTrack: () => {
    return {
      mutationKey: trackQueryKey.deleteTrack(),
      mutationFn: (params: Parameters<typeof trackApi.deleteTrack>[0]) =>
        trackApi.deleteTrack(params)
    }
  }
}

export { trackApi, trackQueryKey, trackQueryService }
