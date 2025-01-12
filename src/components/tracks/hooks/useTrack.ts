import { useMutation, useQueryClient } from '@tanstack/react-query'
import { notification } from 'antd'

import { trackQueryService } from '@/services/track'

const useTrack = () => {
  const queryClient = useQueryClient()

  const { mutateAsync: deleteTrackMutate } = useMutation({
    ...trackQueryService.deleteTrack(),
    onSuccess: () => {
      queryClient.invalidateQueries(trackQueryService.getTrackList())
      notification.success({
        message: 'Xóa track thành công.'
      })
    },
    onError: (error) => {
      notification.error({
        message: JSON.stringify(error.message)
      })
    }
  })
  return {
    deleteTrackMutate
  }
}

export default useTrack
