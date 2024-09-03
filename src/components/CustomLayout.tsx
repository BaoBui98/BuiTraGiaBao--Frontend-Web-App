"use client";
import React from "react";
import Header from "./Header";
import { usePathname } from "next/navigation";
import { ROUTER_PAGE } from "@/constant/router-page";

export default function CustomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  return (
    <>
      {pathName !== ROUTER_PAGE.LOGIN && pathName !== ROUTER_PAGE.REGISTER && (
        <Header />
      )}
      {children}
    </>
  );
}
