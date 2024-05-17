import React, { useState, useEffect, useMemo } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Machineryowner = ({searchQuery}) => {
  console.log("this is from the team",searchQuery)
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [users, setUsers] = useState([]);
  const storedUserData = window.localStorage.getItem("logedUser");
  const userDatatwo = storedUserData ? JSON.parse(storedUserData) : null;
  const jwt = userDatatwo ? userDatatwo.Token : null;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://armada-server.glitch.me/api/admin/getUsers",  {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "first_name", headerName: "First Name", flex: 1 },
    { field: "last_name", headerName: "Last Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phone", headerName: "Phone Number", flex: 1 },
  
  ];

  const handleEdit = (userId) => {
    navigate(`/user-details/${userId}`);
  };
 // Memoized data for better performance
 const filteredData = useMemo(() => {
  if (!searchQuery) return users; // If no search query, return all data
  return users.filter((item) => {
    // Filter based on searchQuery
    return Object.values(item).some((value) =>
    value != null && value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
}, [searchQuery, users]);
  return (
    <Box m="20px">
      <Header title="User List" subtitle="Managing the User List" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
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
          "& .MuiCheckbox-root": { color: "white" },
        }}
      >
        <DataGrid rows={filteredData} columns={columns}  getRowId={(row) => row._id}/>
      </Box>
    </Box>
  );
};

export default Machineryowner;
