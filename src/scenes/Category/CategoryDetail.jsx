import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Typography, Box, Paper, Divider, Button, useTheme, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

const CategoryDetailPage = () => {
const navigate =useNavigate()

    const theme = useTheme();
    const { categoryid } = useParams();
    const [categoryDetail, setCategoryDetail] = useState(null);
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false); // State for delete confirmation dialog
    const storedUserData = window.localStorage.getItem("logedUser");
    const userDatatwo = storedUserData ? JSON.parse(storedUserData) : null;
    const jwt = userDatatwo ? userDatatwo.Token : null;

    useEffect(() => {
        const fetchCategoryDetail = async () => {
            try {
                const response = await axios.get(`https://armada-server.glitch.me/api/category/getCategoryById/${categoryid}`, {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });

                console.log(response.data)
                setCategoryDetail(response.data);
            } catch (error) {
                console.error("Error fetching category detail:", error);
            }
        };

        fetchCategoryDetail();
    }, [categoryid]);


    const handleDelete = async () => {
   
        try {
            const response = await axios.delete(
                `https://armada-server.glitch.me/api/category/deleteCategory/${categoryid}`,
              
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );


            if (response.status === 204) {
                alert("Category deleted successfully!");
                navigate(-1);
                // Redirect or update state as needed after deletion
            } else {
                alert("Category deletion failed!");
            }
        } catch (error) {
            alert("Category deletion failed!");
         
        }



    };

    const handleUpdate = () => {
        navigate(`/updateCategory/${categoryid}`);
    };
///updateCategory/:categoryId

    const handleDeleteConfirmationOpen = () => {
        setDeleteConfirmationOpen(true);
    };

    const handleDeleteConfirmationClose = () => {
        setDeleteConfirmationOpen(false);
    };

    if (!categoryDetail) {
        return <Typography>Loading...</Typography>;
    }

    return (
     
        <Paper
      elevation={3}
      sx={{
        padding: '20px',
        maxWidth: '600px',
        width: '100%',
        borderRadius: '16px',
        backgroundColor: '#e1e2fe',
        boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
        margin: 'auto', // Center the Paper component
        display: 'flex', // Use flexbox to center content
        flexDirection: 'column', // Stack children vertically
        alignItems: 'center', // Center children horizontally
        '& .MuiTypography-h4': {
          fontSize: '1.5rem',
          color: '#333',
          fontWeight: 'bold',
          textAlign: 'center' // Center the title text
        },
        '& .MuiTypography-h6': {
          fontSize: '1.25rem',
          color: '#555',
          marginBottom: '0.5rem',
          textAlign: 'center' // Center the subtitle text
        },
        '& .MuiTypography-body1': {
          fontSize: '1rem',
          color: '#777',
          textAlign: 'center' // Center the body text
        }
      }}
    >
      <Typography variant="h4" gutterBottom>
        Category Detail
      </Typography>
      <Divider />
      <Box marginTop="16px">
        <Typography variant="h6">Title: {categoryDetail.category.title}</Typography>
        <Typography variant="body1">Description: {categoryDetail.category.description}</Typography>
        <Typography variant="h6">CreatedBy: {categoryDetail.admin.first_name}</Typography>
        <Typography variant="body1">Creator Role: {categoryDetail.admin.role}</Typography>
      </Box>
      {/* Add more details as needed */}
      <Box marginTop="16px">
        <Button variant="contained" color="error" onClick={handleDelete}>
          Delete Category
        </Button>
        <Button variant="contained" color="primary" onClick={handleUpdate}>
          Update Category
        </Button>
      </Box>
       {/* Delete Confirmation Dialog */}
       <Dialog open={deleteConfirmationOpen} onClose={handleDeleteConfirmationClose}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this category?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteConfirmationClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
        
      );
};
  

export default CategoryDetailPage;
