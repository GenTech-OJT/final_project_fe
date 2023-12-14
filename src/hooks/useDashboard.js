import { useQuery } from '@tanstack/react-query'
import { QUERY_KEY } from '@constants/reactQuery'
import { getDashboardApi } from '../apis/dashboardAPI'

export const useGetDashboard = params => {
  return useQuery({
    // queryKey: [QUERY_KEY.MANAGERS, params],
    queryFn: () => getDashboardApi(params),
  })
}
