import { Gender } from "@/types";
import * as yup from "yup";
export const schemaUser = yup
  .object({
    name: yup.string().required("Vui lòng nhập tên"),
    email: yup
      .string()
      .email("Email không hợp lệ")
      .required("Vui lòng nhập email"),
    phone: yup
      .string()
      .matches(/^[0-9]+$/, "Số điện thoại chỉ chứa chữ số")
      .required("Vui lòng nhập số điện thoại"),
    gender: yup
      .string()
      .oneOf(
        [Gender.female, Gender.male, Gender.other],
        "Vui lòng chọn giới tính"
      )
      .required("Vui lòng chọn giới tính"),
  })
  .required();

export type FormUserData = yup.InferType<typeof schemaUser>;

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required("Vui lòng nhập email")
    .email("Email không hợp lệ"),
  password: yup.string().required("Vui lòng nhập mật khẩu"),
});

export type LoginFormUserData = yup.InferType<typeof loginSchema>;
