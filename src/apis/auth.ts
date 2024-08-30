import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postRequest } from "./services";
import { ROUTER } from "@/constant/routes";
import { toast } from "react-toastify";
import { LoginProps } from "@/types";
import { setCookie } from "@/ultils/cookies";
import { ACCESS_TOKEN, USER } from "@/constant/auth-name";
import { saveToStorage } from "@/ultils/localstorage";

export function useLogin() {
  const { mutate: login, isPending: isLogin } = useMutation({
    mutationFn: async ({ data }: { data: LoginProps }) =>
      await postRequest({
        url: ROUTER.LOGIN,
        payload: data,
      }),
    onSuccess: (data) => {
      setCookie(ACCESS_TOKEN, data.data.access_token);
      saveToStorage(USER, JSON.stringify(data.data.user));
      toast.success("Đăng nhập thành công");
    },
    onError: () => {
      toast.error("Đăng nhập thất bại");
    },
  });

  return { login, isLogin };
}
