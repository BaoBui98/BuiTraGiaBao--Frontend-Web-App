"use client";
import { useState, useEffect } from "react";
import ListUsers from "./ListUser";
import { Button } from "@mui/material";
import FormUser from "./FormUser";
import { useGetUser } from "@/apis/user";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Header from "./Header";

export default function UserManagement() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { dataUser, isLoading } = useGetUser();

  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">User Management</h1>
        <div className="flex justify-end my-6">
          <Button onClick={handleOpen} variant="contained">
            Add user
          </Button>
        </div>
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {!!dataUser && !!dataUser.data && dataUser.data.length > 0 ? (
              <ListUsers users={dataUser.data} />
            ) : (
              <p>No data</p>
            )}
          </>
        )}
        <FormUser open={open} handleClose={handleClose} />
      </div>
    </>
  );
}
