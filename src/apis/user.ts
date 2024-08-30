import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getRequest, patchRequest, postRequest } from "./services";
import { AxiosResponse } from "axios";
import { AddUserProps, UserProps } from "@/types";
import { QUERY_KEY } from "@/constant/query-key";
import { ROUTER } from "@/constant/routes";
import { toast } from "react-toastify";

export function useGetUser() {
  const { isLoading, data: dataUser } = useQuery<AxiosResponse<UserProps[]>>({
    queryKey: QUERY_KEY.USER,
    queryFn: async () =>
      getRequest({
        url: ROUTER.GET_USER,
      }),
  });
  return { isLoading, dataUser };
}

export function useAddUser() {
  const queryClient = useQueryClient();

  const { mutate: addUser, isPending: isAddUser } = useMutation({
    mutationFn: async ({ data }: { data: AddUserProps }) =>
      await postRequest({
        url: ROUTER.USER,
        payload: data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.USER,
      });
      toast.success(`đã được thêm vào hệ thống`);
    },
    onError: () => {
      toast.error(`đã thêm vào hệ thống thất bại`);
    },
  });

  return { addUser, isAddUser };
}

export function useDeleteUsers() {
  const queryClient = useQueryClient();

  const { mutate: deleteUsers, isPending: isDeletingUsers } = useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      let requestOptions: RequestInit = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      };
      await fetch(ROUTER.USER, requestOptions);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.USER,
      });
      toast.success(`đã xoa thành công`);
    },
    onError: () => {
      toast.error(`đã xoa thất bại`);
    },
  });

  return { deleteUsers, isDeletingUsers };
}

export function useEditUser() {
  const queryClient = useQueryClient();

  const { mutate: editUser, isPending: isUpdatingUser } = useMutation({
    mutationFn: async ({ data }: { data: UserProps }) =>
      await patchRequest({
        url: `${ROUTER.USER}`,
        payload: data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...QUERY_KEY.USER],
      });
      toast.success("Cập nhật thành công");
    },
    onError: () => {
      toast.error("Cập nhật thất bại");
    },
  });

  return { editUser, isUpdatingUser };
}
