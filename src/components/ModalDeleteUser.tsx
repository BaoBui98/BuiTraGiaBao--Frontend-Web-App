"use client";
import React from "react";
import Modal from "@mui/material/Modal";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Button, Box, MenuItem } from "@mui/material";
import { FormUserData, schemaUser } from "@/common/validate";
import { Gender } from "@/types";
import { toast } from "react-toastify";
import { useAddUser, useDeleteUsers } from "@/apis/user";
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

export default function ModalDelete({
  open,
  handleClose,
  idDelete,
  setIdDelete,
}: {
  open: boolean;
  handleClose: () => void;
  idDelete: string | null;
  setIdDelete: (id: string | null) => void;
}) {
  const { deleteUsers, isDeletingUsers } = useDeleteUsers();
  const handleDelete = () => {
    if (idDelete) {
      deleteUsers(
        {
          id: idDelete,
        },
        {
          onSuccess: () => {
            handleClose();
            setIdDelete(null);
          },
        }
      );
    }
  };
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <p id="modal-modal-description">
            Are you sure you want to delete this user?
          </p>
          <Box
            component="form"
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              mt: 2,
            }}
            noValidate
            autoComplete="off"
          >
            <Button variant="contained" color="primary" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              disabled={isDeletingUsers}
              variant="contained"
              color="error"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
