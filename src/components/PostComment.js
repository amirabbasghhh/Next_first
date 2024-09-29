"use client"; // این خط را در بالای فایل قرار دهید

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { api } from "@/configs/api";
import Swal from "sweetalert2";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const PostComment = ({ postId, updateComments }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [send, setSend] = useState({});

  const changeHandler = (e) => {
    setSend({ ...send, [e.target.name]: e.target.value, postId });
  };

  const addHandler = async () => {
    setOpen(false);
    if (
      send.body &&
      send.name &&
      send.email
    ) {
      try {
        await api.post("comments", send);
        await updateComments(); // بروزرسانی کامنت‌ها
        Swal.fire({
          icon: "success",
          title: "Comment added successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Comment could not be added",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } else {
      Swal.fire({
        title: "Complete the form correctly",
        icon: "error",
      });
    }
  };

  return (
    <div>
      <Button style={{ border: "1px solid black" }} onClick={handleOpen}>
        Add Comment
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, display: "flex", flexDirection: "column" }}
          >
            <input
              onChange={changeHandler}
              value={send.name || ""}
              style={{ marginTop: 5, marginBottom: 5, padding: 8 }}
              name="name"
              type="text"
              placeholder="name ..."
            />
            <input
              onChange={changeHandler}
              value={send.email || ""}
              style={{ marginTop: 5, marginBottom: 5, padding: 8 }}
              name="email"
              type="email"
              placeholder="email..."
            />
            <input
              onChange={changeHandler}
              value={send.body || ""}
              style={{ marginTop: 5, marginBottom: 5, padding: 8 }}
              name="body"
              type="text"
              placeholder="body..."
            />
            <button
              onClick={addHandler}
              style={{
                marginTop: 5,
                marginBottom: 5,
                padding: 8,
                backgroundColor: "#2fe527",
              }}
            >
              Add
            </button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default PostComment;
