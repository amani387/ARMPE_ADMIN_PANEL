import React, { useMemo } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useNavigate } from 'react-router-dom';

const ContractList = ({searchQuery}) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
   console.log(searchQuery)
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "startDate", headerName: "Starting Date", flex: 1 },
    { field: "endDate", headerName: "Ending Date", flex: 1 },
    { field: "renterId", headerName: "Renter ID", flex: 1 },
    { field: "ownerId", headerName: "Owner ID", flex: 1 },
    { field: "machineryDetail", headerName: "Machinery Detail", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          onClick={() => handleCategoryDetail(params.row.id)}
        >
          Detail
        </Button>
      ),
    },
  ];

  const mockDataTeam = [
    { 
      id: 1, 
      startDate: "2024-04-15", 
      endDate: "2024-04-20", 
      renterId: "R001", 
      ownerId: "O001", 
      machineryDetail: "Machine 1" 
    },
    { 
      id: 2, 
      startDate: "2024-04-16", 
      endDate: "2024-04-22", 
      renterId: "R002", 
      ownerId: "O002", 
      machineryDetail: "Machine 2" 
    },
    { 
      id: 3, 
      startDate: "2024-04-18", 
      endDate: "2024-04-24", 
      renterId: "R003", 
      ownerId: "O003", 
      machineryDetail: "Machine 3" 
    },
    // Add more data as needed
  ];

  const handleCategoryDetail = (categoryId) => {
    // Navigate to category detail page
    navigate(`/categories/${categoryId}`);
  };
  // Memoized data for better performance
  const filteredData = useMemo(() => {
    if (!searchQuery) return mockDataTeam; // If no search query, return all data
    return mockDataTeam.filter((item) => {
      // Filter based on searchQuery
      return Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [searchQuery]);

  return (
    <Box m="20px">
      <Header title="Contracts" subtitle="Managing the Contract List" />
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

export default ContractList;
