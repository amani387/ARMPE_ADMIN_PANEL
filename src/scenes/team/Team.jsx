import { useState, useEffect, useMemo, useContext } from "react";
import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import Header from "../../components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AdminCountContext } from "../../App";

const Team = ({searchQuery}) => {
  const { setAdminCount } = useContext(AdminCountContext);
  console.log("jjjj",searchQuery)
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [admins, setAdmins] = useState([]);
  


  const storedUserData = window.localStorage.getItem("logedUser");
  const userData = storedUserData ? JSON.parse(storedUserData) : null;
  const jwt = userData ? userData.Token : null; // Extract the token
  
  const columns = [
    { field: "id", headerName: "ID" },
    { field: "first_name", headerName: "First Name", flex: 1 },
    { field: "last_name", headerName: "Last Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "password", headerName: "Password", flex: 1 },
    { field: "phone", headerName: "Phone Number", flex: 1 },
    { field: "role", headerName: "Role", flex: 1 },
    { field: "address1", headerName: "Address 1", flex: 1 },
    { field: "address2", headerName: "Address 2", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: ({ row }) => (
        <Button
          variant="contained"
          color="error"
          onClick={() => handleEdit(row._id)} // Pass the _id to handleEdit
        >
          Detail
        </Button>
      ),
    },
  ];

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get(
          "https://armada-server.glitch.me/api/superAdmin/getAdmins"
       , {
        headers: {
          Authorization: `Bearer ${jwt}`, // Send token in the Authorization header
        },
      }
       
        );
       const data =response.data.map((admin, index) => ({
        ...admin,
        id: admin._id // Generating IDs for the DataGrid
      }))
        setAdmins(data);
        setAdminCount(data.length); 
        console.log("the number is ",data.length)
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
     
    };

    fetchAdmins();
  }, []);

  // Function to handle the "Edit" button click
  const handleEdit = (userId2) => {
    navigate(`/user-details/${userId2}`); // Navigate to the UserDetailsPage with the user ID
  };

 // Memoized data for better performance
 const filteredData = useMemo(() => {
  if (!searchQuery) return admins; // If no search query, return all data
  return admins.filter((item) => {
    // Filter based on searchQuery
    console.log("to this point")
    return Object.values(item).some((value) =>

    value != null && value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
}, [searchQuery, admins]);
  return (
    <Box m="20px">
      <Header title="ADMIN" subtitle="Managing the Admins" />
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
          "& .phone-column--cell": {
            color: "white",
          },
          "& .email-column--cell": {
            color: "white",
          },
          "& .age-column--cell": {
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
            color: `white,!important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={filteredData} columns={columns} disableColumnFilter={false} />
      </Box>
    </Box>
  );
};

export default Team;
