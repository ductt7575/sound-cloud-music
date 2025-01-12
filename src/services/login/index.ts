import * as loginApi from './api'

const loginQueryService = {
  getDataCurrentUser: () => {
    return {
      mutationKey: ['login'],
      mutationFn: loginApi.getDataCurrentUser
    }
  }
}

export { loginApi, loginQueryService }
