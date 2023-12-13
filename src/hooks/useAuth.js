import { useMutation } from '@tanstack/react-query'
import { getLoginApi } from '@api/authApi'

export const useLogin = () => {
  return useMutation({
    mutationFn: ({ email, password }) => getLoginApi({ email, password }),
    onSuccess: (data, variables, context) => {},
    onError: (error, variables, context) => {},
    onSettled: (data, error, variables, context) => {},
  })
}
