import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  
const UpdateCategory = () => {
  const storedUserData = window.localStorage.getItem("logedUser");
  const userDatatwo = storedUserData ? JSON.parse(storedUserData) : null;
  const jwt = userDatatwo ? userDatatwo.Token : null;


  const { categoryId } = useParams(); // Get the category ID from URL params
  const [updatedCategory, setUpdatedCategory] = useState({
    title: "",
    description: "",
  });
  const navigate = useNavigate();

  // Fetch category details upon component mount
  useEffect(() => {
    const fetchCategoryDetail = async () => {
      try {
        const response = await axios.get(`https://armada-server.glitch.me/api/category/getCategoryById/${categoryId}`, {
          headers: {
              Authorization: `Bearer ${jwt}`,
          },
      });
        setUpdatedCategory(response.data.category);
      } catch (error) {
        console.error("Error fetching category detail:", error);
   
        toast.error("Error fetching category detail:"); 
      }
    };

    fetchCategoryDetail();
  }, [categoryId]);

  const handleChange = (e) => {
    setUpdatedCategory({ ...updatedCategory, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://armada-server.glitch.me/api/category/updateCategory/${categoryId}`,
        updatedCategory, {
          headers: {
              Authorization: `Bearer ${jwt}`,
          },
      }
      );
      if (response.status === 200) {
        toast.success("Category updated successfully.");
        // Add a delay of 2 seconds (2000 milliseconds) before navigating to the next page
        setTimeout(() => {
          navigate("/categorylist");
        }, 2000);
      } else {
        toast.error("Category update failed.");
      }
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Category update failed.");
    }
  };

  return (
    <Box m="20px">
      <Typography variant="h4" gutterBottom>
        Update Category
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Category Title"
          name="title"
          value={(updatedCategory.title ) ? updatedCategory.title : "aman "}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          required
        />
        <TextField
          label="Category Description"
          name="description"
          value={updatedCategory.description || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          required
          multiline
          rows={4}
        />
        <Button type="submit" variant="contained" color="success">
          Update Category
        </Button>
        <ToastContainer />
      </form>
    </Box>
  );
};

export default UpdateCategory;
