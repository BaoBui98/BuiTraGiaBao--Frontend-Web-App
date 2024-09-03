"use client";
import React from "react";
import Header from "./Header";
import { usePathname } from "next/navigation";

export default function CustomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  return (
    <>
      {pathName !== "/login" && pathName !== "/register" && <Header />}
      {children}
    </>
  );
}
