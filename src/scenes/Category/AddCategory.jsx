import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../components/Header";
import ConfirmationDialog from "../../ConfirmationDialog/Dialog"; // Import your confirmation dialog component
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCategoryForm = () => {
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [formValues, setFormValues] = useState(initialValues); // State to hold form values for submission
  const storedUserData = window.localStorage.getItem("logedUser");
  const userDatatwo = storedUserData ? JSON.parse(storedUserData) : null;
  const jwt = userDatatwo ? userDatatwo.Token : null;

  const handleFormSubmit = (values) => {
    // Store the form values in the state and show the confirmation dialog
    setFormValues(values);
    setOpenConfirmationDialog(true);
  };

  const handleConfirmSubmit = async (values) => {
    try {
      const response = await axios.post(
        "https://armada-server.glitch.me/api/category/addCategory",
        formValues, // Use the stored form values for the API call

        // adminCount={adminCount} user={user}  https://armada-server.glitch.me//api/machinery
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log(response.data); // Log the response from the server
     // Reset the form fields using Formik's resetForm method
      setOpenConfirmationDialog(false); // Close the confirmation dialog
      setFormValues(initialValues); // Clear the stored form values
      toast.success("Category added successfully!"); // Show success toast message
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error("Failed to add category."); // Show error toast message
    }
  };

  const handleCloseConfirmationDialog = () => {
    setOpenConfirmationDialog(false);
  };

  return (
    <Box m="20px">
      <Header title="ADD CATEGORY" subtitle="Add a New Category" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={formValues}
        validationSchema={categorySchema}
      >
        {({
             values,
             errors,
             touched,
             handleBlur,
             handleChange,
             handleSubmit,
           
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(1, minmax(0, 1fr))"
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Category Title"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
                name="title"
                error={!!touched.title && !!errors.title}
                helperText={touched.title && errors.title}
              />
              <TextField
                fullWidth
                multiline
                variant="filled"
                label="Category Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Submit
              </Button>
              <ToastContainer />
            </Box>
          </form>
        )}
      </Formik>
      {/* Confirmation Dialog */}
      <ConfirmationDialog
        open={openConfirmationDialog}
        onClose={handleCloseConfirmationDialog}
        onConfirm={ handleConfirmSubmit} // Pass resetForm to handleConfirmSubmit
        actionType="ADD CATEGORY"
      />
    </Box>
  );
};

const categorySchema = yup.object().shape({
  title: yup.string().required("Category title is required"),
  description: yup.string().required("Category description is required"),
});

const initialValues = {
  title: "",
  description: "",
};

const secondValues = {
  title: "",
  description: "",
};

export default AddCategoryForm;
