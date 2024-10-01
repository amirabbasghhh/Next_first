"use client"; // این خط را در بالای فایل قرار دهید

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { api } from "@/configs/api";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as Yup from "yup";

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
  const [submitted, setSubmitted] = useState(false); // حالت ارسال

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSubmitted(false); // reset submitted state
    formik.resetForm(); // reset formik form
  };

  const addHandler = async () => {
    try {
      await api.post("comments", formik.values);
      await updateComments();
      Swal.fire({
        icon: "success",
        title: "Comment added successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      handleClose(); // فرم را پس از ارسال ببندید
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Comment could not be added",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/;

  const formik = useFormik({
    initialValues: {
      name: "",
      body: "",
      email: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().min(5, "Must be 5 characters or more").required("Required"),
      body: Yup.string().min(6, "Must be 6 characters or more").required("Required"),
      email: Yup.string().matches(emailRegex, "Invalid email address").required("Required") 
    }),
    onSubmit: (values) => {
      setSubmitted(true); 
      addHandler();
    },
  });

  return (
    <div>
      <Button style={{ border: "1px solid black" }} onClick={handleOpen}>
        Add Comment
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Box
            id="modal-modal-description"
            sx={{ mt: 2, display: "flex", flexDirection: "column" }}
          >
            <input
              id="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              style={{ marginTop: 5, marginBottom: 5, padding: 8 }}
              name="name"
              type="text"
              placeholder="name ..."
              onBlur={formik.handleBlur} // ثبت رویداد blur
            />
            {(formik.touched.name || submitted) && (
              <div style={{ color: formik.errors.name ? 'red' : 'green', fontSize: '10px' }}>
                {formik.errors.name ? formik.errors.name : 'valid *'}
              </div>
            )}
            <input
              id="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              style={{ marginTop: 5, marginBottom: 5, padding: 8 }}
              name="email"
              type="email"
              placeholder="email..."
              onBlur={formik.handleBlur} // ثبت رویداد blur
            />
            {(formik.touched.email || submitted) && (
              <div style={{ color: formik.errors.email ? 'red' : 'green', fontSize: '10px' }}>
                {formik.errors.email ? formik.errors.email : 'valid *'}
              </div>
            )}
            <input
              id="body"
              onChange={formik.handleChange}
              value={formik.values.body}
              style={{ marginTop: 5, marginBottom: 5, padding: 8 }}
              name="body"
              type="text"
              placeholder="body..."
              onBlur={formik.handleBlur} // ثبت رویداد blur
            />
            {(formik.touched.body || submitted) && (
              <div style={{ color: formik.errors.body ? 'red' : 'green', fontSize: '10px' }}>
                {formik.errors.body ? formik.errors.body : 'valid *'}
              </div>
            )}
            <button
              type="button" // نوع دکمه را به button تغییر دهید
              onClick={formik.handleSubmit} // استفاده از handleSubmit
              style={{
                marginTop: 5,
                marginBottom: 5,
                padding: 8,
                backgroundColor: "#2fe527",
              }}
            >
              Add
            </button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default PostComment;
