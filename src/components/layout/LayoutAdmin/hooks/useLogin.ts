import { useMutation } from '@tanstack/react-query'

import { loginQueryService } from '@/services/login'

const useLogin = () => {
  const { mutateAsync: loginMutate } = useMutation({
    ...loginQueryService.getDataCurrentUser()
  })
  return { loginMutate }
}

export default useLogin
