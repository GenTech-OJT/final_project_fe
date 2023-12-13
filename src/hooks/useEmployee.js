import { useQuery, useMutation } from '@tanstack/react-query'
import { QUERY_KEY } from '@constants/reactQuery'
import { getEmployeesApi, createEmployeeApi } from '@api/employeeApi'

// export const useGetEmployees = params => {
//   return useQuery(['toan', params], async () => {
//     const { data } = await getEmployeesApi(params)
//     return data
//   })
// }

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

// export const useCreateCard = () => {
//   const navigate = useNavigate();

//   return useMutation(
//     async (params: CardCreateParams) => {
//       const response = await createCardApi(params);
//       return response.data;
//     },
//     {
//       onSuccess({ message }) {
//         notificationSuccess(message);
//         navigate('/cards');
//       },
//       onError({ response }) {
//         notificationError(response.data.message);
//       },
//     },
//   );
// };

// export const useDeleteCard = () =>
//   useMutation(
//     async (id: number) => {
//       const response = await deleteCardApi(id);
//       return response.data;
//     },
//     {
//       onSuccess({ message }) {
//         notificationSuccess(message);
//       },
//       onError({ response }) {
//         notificationError(response.data.message);
//       },
//     },
//   );

// export const useRevertCard = () =>
//   useMutation(
//     async (id: number) => {
//       const response = await revertCardApi(id);
//       return response.data;
//     },
//     {
//       onSuccess({ message }) {
//         notificationSuccess(message);
//       },
//       onError({ response }) {
//         notificationError(response.data.message);
//       },
//     },
//   );

// export const useGetCardById = (id: number) => {
//   const navigate = useNavigate();

//   return useQuery(
//     [QUERY_KEY.CARDS, id],
//     async () => {
//       const { data } = await getCardByIdApi(id);
//       return data.data;
//     },
//     {
//       onError() {
//         navigate('/404');
//       },
//       retry: false,
//     },
//   );
// };

// export const useUpdateCard = () => {
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();

//   return useMutation(
//     async (params: CardInterface) => {
//       const response = await updateCardApi(params);
//       return response.data;
//     },
//     {
//       onSuccess({ message }) {
//         notificationSuccess(message);
//         queryClient.refetchQueries([QUERY_KEY.CARDS]);
//         navigate('/cards');
//       },
//       onError({ response }) {
//         notificationError(response.data.message);
//       },
//     },
//   );
// };

// export const useGetAllCardsOpenTeacher = () =>
//   useQuery([QUERY_KEY.CARDS_OPEN], async () => {
//     const { data } = await getAllCardsOpenTeacherApi();
//     return data.data;
//   });

// export const useGetAllStudentCards = () =>
//   useQuery([QUERY_KEY.STUDENT_CARDS], async () => {
//     const { data } = await getAllStudentCards();
//     return data.data;
//   });
