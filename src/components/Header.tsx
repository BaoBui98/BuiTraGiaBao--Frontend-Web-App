"use client";
import { ACCESS_TOKEN, USER } from "@/constant/auth-name";
import { UserProps } from "@/types";
import { getFromStorage, removeFromStorage } from "@/ultils/localstorage";
import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import Image from "next/image";
import { Avatar, Button, Popover, Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { removeCookie } from "@/ultils/cookies";
import { useRouter } from "next/navigation";

export default function Header() {
  const [currentUser, setCurrentUser] = useState<UserProps | null>(null);
  const [popover, setShowPopover] = React.useState<HTMLButtonElement | null>(
    null
  );
  const router = useRouter();
  useEffect(() => {
    const userData = getFromStorage(USER);
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    } else {
      setCurrentUser(null);
    }
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setShowPopover(event.currentTarget);
  };

  const handleClose = () => {
    setShowPopover(null);
  };

  const handleLogout = () => {
    removeFromStorage(USER);
    removeCookie(ACCESS_TOKEN);
    router.push("/login");
    setCurrentUser(null);
  };

  const open = Boolean(popover);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      {!!currentUser && (
        <div className="bg-[#34495E] px-4 py-6 flex justify-between items-center">
          <div className="relative w-[60px] h-[60px]">
            <Image src={logo} fill alt="logo" />
          </div>
          <div>
            <button onClick={handleClick}>
              <Avatar
                sx={{
                  bgcolor: deepPurple[500],
                  width: 60,
                  height: 60,
                  cursor: "pointer",
                }}
              >
                {currentUser?.name?.charAt(0).toUpperCase()}
              </Avatar>
            </button>

            <Popover
              id={id}
              open={open}
              anchorEl={popover}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Typography
                sx={{ px: 2, py: 1 }}
              >{`Hi ${currentUser.email}`}</Typography>
              <Button sx={{ px: 2, py: 1 }} onClick={handleLogout}>
                Logout
              </Button>
            </Popover>
          </div>
        </div>
      )}
    </>
  );
}
