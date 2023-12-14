import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getLoginApi } from '@api/authApi'
import { QUERY_KEY } from '@constants/reactQuery'
import { useNavigate } from 'react-router-dom'
import { showToast } from '@components/toast/ToastCustom'
import { useTranslation } from 'react-i18next'
import { login } from '@redux/Slice/authSlice'
import store from '@redux/store'

export const useLogin = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { t } = useTranslation('translation')

  return useMutation({
    mutationFn: ({ email, password }) => getLoginApi({ email, password }),
    onSuccess: (data, variables, context) => {
      store.dispatch(
        login({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        })
      )
      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('refreshToken', data.refreshToken)

      navigate('/admin')
      showToast(t('message.success_login'), 'success')
    },
    onError: (error, variables, context) => {
      showToast(t('message.error_login'), 'error')
    },
    onSettled: (data, error, variables, context) => {},
  })
}
