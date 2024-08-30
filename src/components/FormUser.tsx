"use client";
import React, { useEffect } from "react";
import Modal from "@mui/material/Modal";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Button, Box, MenuItem } from "@mui/material";
import { FormUserData, schemaUser } from "@/common/validate";
import { Gender, UserProps } from "@/types";
import { useAddUser, useEditUser } from "@/apis/user";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default function FormUser({
  open,
  handleClose,
  user,
}: {
  open: boolean;
  handleClose: () => void;
  user?: UserProps;
}) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormUserData>({
    resolver: yupResolver(schemaUser),
  });
  const { addUser, isAddUser } = useAddUser();
  const { editUser, isUpdatingUser } = useEditUser();

  const onSubmit = async (data: FormUserData) => {
    const { name, email, gender, phone } = data;
    if (!!user) {
      editUser(
        {
          data: {
            name,
            email,
            gender,
            phone,
            id: user.id,
          },
        },
        {
          onSuccess: () => {
            handleClose();
            reset();
          },
        }
      );
    } else {
      addUser(
        {
          data: { name, email, gender, phone },
        },
        {
          onSuccess: () => {
            handleClose();
            reset();
          },
        }
      );
    }
  };
  useEffect(() => {
    if (user) {
      setValue("name", user.name);
      setValue("email", user.email);
      setValue("phone", user.phone);
      setValue("gender", user.gender as NonNullable<Gender | undefined>);
    }
  }, [setValue, user]);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Name"
                  variant="outlined"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  fullWidth
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  disabled={!!user}
                  {...field}
                  label="Email"
                  variant="outlined"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  fullWidth
                />
              )}
            />

            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Phone"
                  variant="outlined"
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                  fullWidth
                />
              )}
            />

            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Gender"
                  variant="outlined"
                  error={!!errors.gender}
                  helperText={errors.gender?.message}
                  fullWidth
                >
                  <MenuItem value={Gender.male}>Nam</MenuItem>
                  <MenuItem value={Gender.female}>Nữ</MenuItem>
                  <MenuItem value={Gender.other}>Khác</MenuItem>
                </TextField>
              )}
            />

            <Button
              disabled={isAddUser || isUpdatingUser}
              type="submit"
              variant="contained"
              color="primary"
            >
              Lưu
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
