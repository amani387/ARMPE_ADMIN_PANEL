import React, { useState, useEffect, useMemo } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import axios from "axios"; // Import axios for making HTTP requests
import { useNavigate } from "react-router-dom";

const CategoryList = ({searchQuery}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate(); // Hook to navigate to different pages
  const [rows, setRows] = useState([]); // State to store category data
  const storedUserData = window.localStorage.getItem("logedUser");
  const userDatatwo = storedUserData ? JSON.parse(storedUserData) : null;
  const jwt = userDatatwo ? userDatatwo.Token : null;

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "createdAt", headerName: "Created At", flex: 1 },
    { field: "updatedAt", headerName: "Updated At", flex: 1 },
    { field: "title", headerName: "Category Title", flex: 1 },
    { field: "description", headerName: "Category Description", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: ({ row }) => (
        <Button
          variant="contained"
          color="error"
          onClick={() => handleEdit(row.id)} // Pass the row id to the handleEdit function
        >
          Edit
        </Button>
      ),
    },
  ];

  useEffect(() => {
    // Fetch category data from the API endpoint
    const fetchData = async () => {
      try {
        const response = await axios.get("https://armada-server.glitch.me/api/category/getCategories",{
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        const formattedRows = response.data.map((row, index) => ({ ...row, id: row._id }));
        setRows(formattedRows); // Update the rows state with the fetched data
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []);

  // Function to handle navigation to the category updating page
  const handleEdit = (categoryid) => {
    navigate(`/category/${categoryid}`);
  };

  const handledelete = (categoryid) => {
    navigate(`/category/${categoryid}`);
  };
 // Memoized data for better performance
 const filteredData = useMemo(() => {
  if (!searchQuery) return rows; // If no search query, return all data
  return rows.filter((item) => {
    // Filter based on searchQuery
    return Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
}, [searchQuery, rows]);
//category/:categoryid
  return (
    <Box m="20px">
      <Header title="Category" subtitle="Managing the Category List" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: "white",
          },
        }}
      >
        <DataGrid rows={filteredData} columns={columns} disableColumnFilter={false} />
      </Box>
    </Box>
  );
};

export default CategoryList;
