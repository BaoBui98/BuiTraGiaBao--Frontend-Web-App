"use client";
import React, { useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { UserProps } from "@/types";
import ModalDelete from "./ModalDeleteUser";
import FormUser from "./FormUser";

export default function ListUsers({ users }: { users: UserProps[] }) {
  const [openDelete, setOpenDelete] = React.useState(false);
  const [user, setUsers] = useState<null | UserProps>(null);
  const [idDelete, setIdDelete] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenDelete = (id: string) => {
    setOpenDelete(true);
    setIdDelete(id);
  };

  const handleEdit = (user: UserProps) => {
    setUsers(user);
    handleOpen();
  };

  const handleCloseDelete = () => setOpenDelete(false);
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Phone</TableCell>
              <TableCell align="center">Gender</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{row.phone}</TableCell>
                <TableCell align="center">{row.gender}</TableCell>

                <TableCell
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "1rem",
                  }}
                  align="center"
                >
                  <button
                    className="text-red-500"
                    onClick={() => handleOpenDelete(row.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="text-blue-500"
                    onClick={() => handleEdit(row)}
                  >
                    Edit
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ModalDelete
        open={openDelete}
        handleClose={handleCloseDelete}
        idDelete={idDelete}
        setIdDelete={setIdDelete}
      />
      {!!user && open && (
        <FormUser open={open} handleClose={handleClose} user={user} />
      )}
    </>
  );
}
