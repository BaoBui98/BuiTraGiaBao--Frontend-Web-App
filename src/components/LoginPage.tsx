"use client";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ic_phone from "../assets/icons/ic-phone.svg";
import ic_password from "../assets/icons/ic_password.svg";
import { LoginFormUserData, loginSchema } from "@/common/validate";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useLogin } from "@/apis/auth";
import { useRouter } from "next/navigation";

export default function LoginForm({}) {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { login, isLogin } = useLogin();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormUserData) => {
    login(
      {
        data,
      },
      {
        onSuccess: () => {
          router.push("/");
        },
      }
    );
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 600,
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: "white",
        p: 4,
      }}
    >
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <FormControl fullWidth margin="normal" error={!!errors.email}>
            <InputLabel htmlFor="email" sx={{ color: "#374151" }}>
              Email
            </InputLabel>
            <OutlinedInput
              label="Email"
              {...field}
              id="email"
              startAdornment={
                <InputAdornment position="start">
                  <Image src={ic_phone} alt="ic_phone" width={20} height={20} />
                </InputAdornment>
              }
              placeholder="Email"
              error={!!errors.email}
            />
            {errors.email && (
              <Typography color="error" variant="caption">
                {errors.email.message}
              </Typography>
            )}
          </FormControl>
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth margin="normal" error={!!errors.password}>
            <InputLabel htmlFor="password" sx={{ color: "#374151" }}>
              Mật khẩu
            </InputLabel>
            <OutlinedInput
              label="Mật khẩu"
              {...field}
              id="password"
              type={showPassword ? "text" : "password"}
              startAdornment={
                <InputAdornment position="start">
                  <Image
                    src={ic_password}
                    alt="ic_password"
                    width={20}
                    height={20}
                  />
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              placeholder="Nhập mật khẩu"
              error={!!errors.password}
            />
            {errors.password && (
              <Typography color="error" variant="caption">
                {errors.password.message}
              </Typography>
            )}
          </FormControl>
        )}
      />

      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Link href="/" sx={{ color: "#2563EB", mt: 2 }} variant="body2">
          Quên mật khẩu?
        </Link>
      </Box>

      <Button
        disabled={isLogin}
        type="submit"
        fullWidth
        variant="contained"
        sx={{
          bgcolor: "#2563EB",
          mt: 4,
          mb: 4,
          "&:hover": { bgcolor: "#1d4ed8" },
        }}
      >
        Đăng nhập
      </Button>

      <Typography textAlign="center" variant="body2">
        Bạn chưa có tài khoản?{" "}
        <Link href="/register" sx={{ color: "#2563EB" }}>
          Đăng ký
        </Link>
      </Typography>
    </Box>
  );
}
