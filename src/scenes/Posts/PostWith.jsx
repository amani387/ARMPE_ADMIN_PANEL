import React, { useEffect, useMemo, useState } from "react";
import { Box, Button, Typography, useTheme, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import Dialog from "../../ConfirmationDialog/Dialog";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Posts = ({ searchQuery }) => {
  const navigate = useNavigate(); // Define useNavigate hook here
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [machinery, setMachinery] = useState([]);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [actionType, setActionType] = useState("");
  const [selectedRowId, setSelectedRowId] = useState(null);

  const storedUserData = window.localStorage.getItem("logedUser");
  const userDatatwo = storedUserData ? JSON.parse(storedUserData) : null;
  const jwt = userDatatwo ? userDatatwo.Token : null;

  useEffect(() => {
    const fetchMachinery = async () => {
      try {
        const response = await axios.get(
          "https://armada-server.glitch.me/api/machinery",
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );

/*

const formattedRows = response.data.map((row, index) => ({ ...row, id: row._id }));
        setMachinery(response.data);

*/
const formattedRows = response.data.map((row, index) => ({ ...row, id: row._id }));
        setMachinery(response.data);
        
      } catch (error) {
        console.error("Error fetching machinery:", error);
      }
    };

    fetchMachinery();
  }, [jwt]);
console.log(machinery);
  const handleConfirmationDialogOpen = (type, rowId) => {
    setActionType(type);
    setSelectedRowId(rowId);
    setConfirmationDialogOpen(true);
  };

  const handleConfirmationDialogClose = () => {
    setConfirmationDialogOpen(false);
    setActionType("");
    setSelectedRowId(null);
  };

  const handleConfirmation = () => {
    // Implement logic for handling approval or rejection
    console.log("Action Type:", actionType);
    console.log("Selected Row ID:", selectedRowId);
    // Close the confirmation dialog
    handleConfirmationDialogClose();
  };

  const handleSeeDetails = (postId) => {
    // Navigate to the detail view page when "See Detail" button is clicked
    navigate(`/posts/${postId}`);
  };

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "owner_name", headerName: "Owner Name", flex: 1 },
    { field: "category", headerName: "Category", flex: 1 },
    { field: "post_image", headerName: "Post Image", flex: 1 },
    { field: "start_date", headerName: "Start Date", flex: 1 },
    { field: "end_date", headerName: "End Date", flex: 1 },
    {
      field: "detail",
      headerName: "Detail",
      flex: 1,
      renderCell: (params) => (
        <Box display="flex" alignItems="center">
          <Button
            variant="contained"
            color="success"
            onClick={() => handleSeeDetails(params.row.id)}
          >
            See Detail
          </Button>
        </Box>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <Box display="flex" justifyContent="space-around">
          <Button
            variant="contained"
            color="success"
            onClick={() =>
              handleConfirmationDialogOpen("approve", params.row.id)
            }
          >
            Approve
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() =>
              handleConfirmationDialogOpen("reject", params.row.id)
            }
          >
            Reject
          </Button>
        </Box>
      ),
    },
  ];

  // Memoized data for better performance
  const filteredData = useMemo(() => {
    if (!searchQuery) return machinery; // If no search query, return all data
    return machinery.filter((item) => {
      // Filter based on searchQuery
      return Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [machinery, searchQuery]);

  return (
    <Box m="20px">
      <Header title="POSTS" subtitle="List of Machinery Posts" />
   
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
          "& .name-column--cell": {
            color: "white",
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
        <DataGrid
          rows={filteredData}
          columns={columns}
          getRowId={(row) => row._id}
          disableColumnFilter={false}
        />
      </Box>
      <Dialog
        open={confirmationDialogOpen}
        onClose={handleConfirmationDialogClose}
        onConfirm={handleConfirmation}
        actionType={actionType}
      />
    </Box>
  );
};

export default Posts;
