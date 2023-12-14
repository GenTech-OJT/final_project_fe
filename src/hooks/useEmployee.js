import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEY } from '@constants/reactQuery'
import {
  getEmployeesApi,
  createEmployeeApi,
  getEmployeeByIdApi,
  updateEmployeeApi,
} from '@api/employeeApi'
import { useNavigate } from 'react-router-dom'

export const useGetEmployees = params => {
  return useQuery({
    queryKey: [QUERY_KEY.EMPLOYEES, params],
    queryFn: () => getEmployeesApi(params),
  })
}

export const useCreateEmployee = () => {
  return useMutation({
    mutationFn: data => createEmployeeApi(data),
    onSuccess: (data, variables, context) => {},
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
    onError: (error, variables, context) => {
      navigate('/404')
    },
    onSettled: (data, error, variables, context) => {},
  })
}

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }) => updateEmployeeApi(id, data),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.EMPLOYEES] })
    },
    onError: (error, variables, context) => {},
    onSettled: (data, error, variables, context) => {},
  })
}
