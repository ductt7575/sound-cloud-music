import { BaseAPIResponse } from '@/types/base'
import { Track } from '@/types/track-management/track'
import { axiosBaseInstance } from '@/utils/axios'

import { TrackGetDetailParams, TrackUpsertParams } from './types'

export const getTrackList = async (): Promise<BaseAPIResponse<Track[]>> => {
  return axiosBaseInstance({
    url: '/tracks',
    method: 'GET'
  })
}

export const getTrackDetail = async ({
  id
}: TrackGetDetailParams): Promise<BaseAPIResponse<Track>> => {
  return axiosBaseInstance({
    url: `/tracks/${id}`,
    method: 'GET'
  })
}

export const updateTrack = async (
  params: TrackUpsertParams
): Promise<BaseAPIResponse<Track>> => {
  return axiosBaseInstance({
    url: `/tracks`,
    method: 'POST',
    data: params
  })
}

export const createTrack = async (
  params: TrackUpsertParams
): Promise<BaseAPIResponse<Track>> => {
  return axiosBaseInstance({
    url: '/tracks',
    method: 'POST',
    data: params
  })
}

export const deleteTrack = async ({
  id
}: TrackGetDetailParams): Promise<BaseAPIResponse<void>> => {
  return axiosBaseInstance({
    url: `/tracks/${id}`,
    method: 'DELETE'
  })
}
