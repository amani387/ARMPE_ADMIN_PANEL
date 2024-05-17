import { Box, Typography, useTheme, Button, Dialog, DialogTitle, DialogContent, DialogActions, Checkbox, FormControlLabel } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useMemo, useState, useEffect } from "react";
import axios from "axios";

const ApprovedPosts = ({ searchQuery }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [validatedMachinery, setValidatedMachinery] = useState([]);
  const [disprovedMachinery, setDisprovedMachinery] = useState([]);
  const [showDisproved, setShowDisproved] = useState(false);
  const storedUserData = window.localStorage.getItem("logedUser");
  const userDatatwo = storedUserData ? JSON.parse(storedUserData) : null;
  const jwt = userDatatwo ? userDatatwo.Token : null;

  useEffect(() => {
    const fetchValidatedMachinery = async () => {
      try {
        const response = await axios.get("https://armada-server.glitch.me/api/admin/getValidatedMachinery", {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        const transformedData = response.data.map((item) => ({
          id: item._id,
          ownerId: item.owner_id,
          type: item.type,
          manufacturer: item.manufacturer,
          model: item.model,
          status: item.status,
          image: item.image,
          rating: item.rating,
          postStatus: item.post_status,
          rentPrice: item.rent_price,
          machineryValidation: item.machinery_validation,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        }));
        setValidatedMachinery(transformedData);
      } catch (error) {
        console.error("Error fetching validated machinery:", error);
      }
    };

    const fetchDisprovedMachinery = async () => {
      try {
        const response = await axios.get("https://armada-server.glitch.me/api/admin/getInvalidatedMachinery", {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        const transformedData = response.data.map((item) => ({
          id: item._id,
          ownerId: item.owner_id,
          type: item.type,
          manufacturer: item.manufacturer,
          model: item.model,
          status: item.status,
          image: item.image,
          rating: item.rating,
          postStatus: item.post_status,
          rentPrice: item.rent_price,
          machineryValidation: item.machinery_validation,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        }));
        setDisprovedMachinery(transformedData);
      } catch (error) {
        console.error("Error fetching disproved machinery:", error);
      }
    };

    fetchValidatedMachinery();
    fetchDisprovedMachinery();
  }, [jwt]);

  const handleCellClick = (params) => {
    setSelectedRowData(params.row);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedRowData(null);
  };

  const handleToggle = () => {
    setShowDisproved((prev) => !prev);
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "ownerId", headerName: "Owner ID", flex: 1 },
    { field: "type", headerName: "Type", flex: 1 },
    { field: "manufacturer", headerName: "Manufacturer", flex: 1 },
    { field: "model", headerName: "Model", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    { field: "image", headerName: "Image", flex: 1 },
    { field: "rating", headerName: "Rating", flex: 1 },
    { field: "postStatus", headerName: "Post Status", flex: 1 },
    { field: "rentPrice", headerName: "Rent Price", flex: 1 },
    { field: "createdAt", headerName: "Created At", flex: 1 },
    { field: "updatedAt", headerName: "Updated At", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <Box display="flex" justifyContent="space-around">
          {params.row.machineryValidation ? (
            <Button
              variant="contained"
              color="error"
              onClick={() => console.log("Disapprove", params.row.id)}
            >
              Disapprove
            </Button>
          ) : (
            <Button
              variant="contained"
              color="success"
              onClick={() => console.log("Approve", params.row.id)}
            >
              Approve
            </Button>
          )}
        </Box>
      ),
    },
  ];

  const filteredData = useMemo(() => {
    const data = showDisproved ? disprovedMachinery : validatedMachinery;
    if (!searchQuery) return data;
    return data.filter((item) => {
      return Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [searchQuery, showDisproved, validatedMachinery, disprovedMachinery]);

  return (
    <Box m="20px">
      <Header title="POSTS" subtitle="List of Machinery Posts" />
      <FormControlLabel
        control={<Checkbox checked={showDisproved} onChange={handleToggle} />}
        label="Show Disproved Posts"
      />
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
          checkboxSelection
          rows={filteredData}
          columns={columns}
          onCellClick={handleCellClick}
          disableColumnFilter={false}
        />
      </Box>
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Cell Content Detail</DialogTitle>
        <DialogContent>
          {selectedRowData && (
            <Box>
              <Typography>Owner ID: {selectedRowData.ownerId}</Typography>
              <Typography>Type: {selectedRowData.type}</Typography>
              <Typography>Manufacturer: {selectedRowData.manufacturer}</Typography>
              <Typography>Model: {selectedRowData.model}</Typography>
              <Typography>Status: {selectedRowData.status}</Typography>
              <Typography>Image: {selectedRowData.image}</Typography>
              <Typography>Rating: {selectedRowData.rating}</Typography>
              <Typography>Post Status: {selectedRowData.postStatus}</Typography>
              <Typography>Rent Price: {selectedRowData.rentPrice}</Typography>
              <Typography>Created At: {selectedRowData.createdAt}</Typography>
              <Typography>Updated At: {selectedRowData.updatedAt}</Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ApprovedPosts;
