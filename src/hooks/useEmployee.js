import {
  createEmployeeApi,
  deleteEmployeeApi,
  getEmployeeByIdApi,
  getEmployeesApi,
  getProjectsByEmployeeIdApi,
  updateEmployeeApi,
} from '@api/employeeApi'
import { showToast } from '@components/toast/ToastCustom'
import { QUERY_KEY } from '@constants/reactQuery'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export const useGetEmployees = params => {
  return useQuery({
    queryKey: [QUERY_KEY.EMPLOYEES, params],
    queryFn: () => getEmployeesApi(params),
  })
}

export const useCreateEmployee = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: data => createEmployeeApi(data),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.EMPLOYEES] })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.DASHBOARD] })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.EMPLOYEE_PROJECTS] })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.MANAGERS] })
    },
    onError: (error, variables, context) => {},
    onSettled: (data, error, variables, context) => {},
  })
}

export const useGetEmployeeById = id => {
  const navigate = useNavigate()

  return useQuery({
    queryKey: [QUERY_KEY.EMPLOYEES, id],
    queryFn: () => getEmployeeByIdApi(id),
    onSuccess: (data, variables, context) => {},
    onError: (error, variables, context) => {},
    onSettled: (data, error, variables, context) => {},
  })
}

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }) => updateEmployeeApi(id, data),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.EMPLOYEES] })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.EMPLOYEES, variables.id],
      })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.EMPLOYEE_PROJECTS] })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.MANAGERS] })
    },
    onError: (error, variables, context) => {},
    onSettled: (data, error, variables, context) => {},
  })
}

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation('translation')

  return useMutation({
    mutationFn: id => deleteEmployeeApi(id),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.EMPLOYEES] })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.DASHBOARD] })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.EMPLOYEE_PROJECTS] })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.MANAGERS] })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PROJECTS] })
    },
    onError: (error, variables, context) => {
      if (error.response) {
        console.log(error.response.data)
        if (error.response.data.status === 'required_manager') {
          showToast(
            t('message.Delete_employee_fail_manager', {
              projectName: error.response.data.project_name,
            }),
            'error'
          )
        } else {
          showToast(
            t('message.Delete_employee_fail_employees', {
              projectName: error.response.data.project_name,
            }),
            'error'
          )
        }
      }
    },
    onSettled: (data, error, variables, context) => {},
  })
}

export const useGetProjectsByEmployeeId = (id, searchText) => {
  return useQuery({
    queryKey: [QUERY_KEY.EMPLOYEE_PROJECTS, id, searchText],
    queryFn: () => getProjectsByEmployeeIdApi(id, searchText),
    onError: (error, variables, context) => {},
  })
}
