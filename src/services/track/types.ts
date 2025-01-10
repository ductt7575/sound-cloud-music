import { Track } from '@/types/track-management/track'

export type TrackGetDetailParams = {
  id: Track['_id']
}

export type TrackUpsertParams = Omit<Track, 'id'> & {
  id?: Track['_id']
}
