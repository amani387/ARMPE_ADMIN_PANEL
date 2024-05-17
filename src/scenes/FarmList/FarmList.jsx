import React, { useState, useEffect, useMemo } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FarmList = ({ searchQuery }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [farms, setFarms] = useState([]);
  const storedUserData = window.localStorage.getItem("logedUser");
  const userData = storedUserData ? JSON.parse(storedUserData) : null;
  const jwt = userData ? userData.Token : null;

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "farm_name", headerName: "Farm Name", flex: 1 },
    { field: "region", headerName: "Region", flex: 1 },
    { field: "owner_id", headerName: "Owner", flex: 1 },
    { field: "farm_size", headerName: "Farm Size", flex: 1 },
    { field: "crops_grown", headerName: "Crops Grown", flex: 1 },
    { field: "soil_type", headerName: "Soil Type", flex: 1 },
    { field: "image", headerName: "Image", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          onClick={() => handleFarmDetail(params.row.id)}
        >
          Detail
        </Button>
      ),
    },
  ];

  useEffect(() => {
    const fetchFarms = async () => {
      try {
        const response = await axios.get("https://armada-server.glitch.me/api/farm/", {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        console.log(response)
        const formattedFarms = response.data.map((farm, index) => ({ ...farm, id: farm._id }));
        setFarms(formattedFarms);
      } catch (error) {
        console.error("Error fetching farm data:", error);
      }
    };

    fetchFarms();
  }, [jwt]);

  const handleFarmDetail = (id) => {
    navigate(`/farmsdetail/${id}`);
  };

  // Memoized data for better performance
  const filteredData = useMemo(() => {
    if (!searchQuery) return farms; // If no search query, return all data
    return farms.filter((item) => {
      // Filter based on searchQuery
      return Object.values(item).some((value) =>
        value != null && value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [searchQuery, farms]);

  return (
    <Box m="20px">
      <Header title="Farm List" subtitle="Managing the Farm List" />
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

export default FarmList;
