import React, { useEffect, useMemo, useState } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import Dialog from "../../ConfirmationDialog/Dialog";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Posts = ({ searchQuery }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [machinery, setMachinery] = useState([]);
  const [searchInput, setSearchInput] = useState("");
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
          "https://armada-server.glitch.me/api/admin/getMachinery",
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        const transformedData = response.data.map((item) => ({
          id: item._id,
          owner_id: item.owner_id,
          type: item.type,
          manufacturer: item.manufacturer,
          model: item.model,
          status: item.status,
          year: item.year,
          horsepower: item.horsepower,
          hour_meter: item.hour_meter,
          region: item.region,
          image: item.image,
          rating: item.rating,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          machineValidated: item.machinery_validation,
        }));
        setMachinery(transformedData);
      } catch (error) {
        console.error("Error fetching machinery:", error);
      }
    };

    fetchMachinery();
  }, [jwt]);

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

  const handleConfirmation = async () => {
    if (!selectedRowId || !actionType) return;

    const endpoint =
      actionType === "approve"
        ? `https://armada-server.glitch.me/api/admin/validateMachine/${selectedRowId}`
        : `https://armada-server.glitch.me/api/admin/invalidateMachine/${selectedRowId}`;

    try {
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log(response.data);

      // Update the validation status in the local state
      setMachinery((prevMachinery) =>
        prevMachinery.map((item) =>
          item.id === selectedRowId
            ? { ...item, machineValidated: actionType === "approve" }
            : item
        )
      );
    } catch (error) {
      console.error(`Error ${actionType === "approve" ? "approving" : "rejecting"} machinery:`, error);
    }

    handleConfirmationDialogClose();
  };

  const handleSeeDetails = (postId) => {
    navigate(`/posts/${postId}`);
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "type", headerName: "Type", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    { field: "horsepower", headerName: "Horsepower", flex: 1 },
    { field: "region", headerName: "Region", flex: 1 },
    { field: "rating", headerName: "Rating", flex: 1 },
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
          {params.row.machineValidated ? (
            <Button
              variant="contained"
              color="error"
              onClick={() =>
                handleConfirmationDialogOpen("reject", params.row.id)
              }
            >
              Disapprove
            </Button>
          ) : (
            <Button
              variant="contained"
              color="success"
              onClick={() =>
                handleConfirmationDialogOpen("approve", params.row.id)
              }
            >
              Approve
            </Button>
          )}
        </Box>
      ),
    },
  ];

  const filteredData = useMemo(() => {
    if (!searchInput) return machinery;
    return machinery.filter((item) => {
      return Object.values(item).some((value) =>
        value != null && value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [machinery, searchInput]);

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
          getRowId={(row) => row.id}
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
