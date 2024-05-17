import { Box, Typography, useTheme, Button, Avatar, IconButton, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserDetailsPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { userId2 } = useParams();
  const [userData, setUserData] = useState(null);
  const [editableData, setEditableData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const toggleEditMode = () => {
    setEditableData({ ...userData });
    setEditMode(!editMode);
  };

  const handleDeleteDialogOpen = () => setDeleteDialogOpen(true);
  const handleDeleteDialogClose = () => setDeleteDialogOpen(false);

  const fetchUserData = async () => {
    try {
      const storedUserData = window.localStorage.getItem("logedUser");
      const userDatatwo = storedUserData ? JSON.parse(storedUserData) : null;
      const jwt = userDatatwo ? userDatatwo.Token : null;

      const response = await axios.get(`https://armada-server.glitch.me/api/superAdmin/getAdmin/${userId2}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      const userData = response.data;
      const transformedUserData = {
        id: userData._id,
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        password: userData.password,
        phone: userData.phone,
        role: userData.role,
        address1: userData.address1,
        status: userData.status === "active" ? "Active" : "Deactivated",
        profilePicture: "/path/to/profile-picture.jpg",
        rentalHistory: userData.rentalHistory || [],
      };

      setUserData(transformedUserData);
      setEditableData(transformedUserData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userId2]);

  const handleInputChange = (field, value) => {
    setEditableData({ ...editableData, [field]: value });
  };

  const handleSave = async () => {
    try {
      const storedUserData = window.localStorage.getItem("logedUser");
      const userDatatwo = storedUserData ? JSON.parse(storedUserData) : null;
      const jwt = userDatatwo ? userDatatwo.Token : null;

      const response = await axios.put(
        `https://armada-server.glitch.me/api/superAdmin/updateAdmin/${userId2}`,
        editableData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      if (response.status === 201) {
        toast.success("Updated successfully!");
        setUserData(editableData);
        setEditMode(false);
      } else {
        toast.error("Updating failed");
      }
    } catch (error) {
      alert("User data update failed!");
      console.error("Error updating user data:", error);
    }
  };

  const handleToggleActiveStatus = async () => {
    try {
      const storedUserData = window.localStorage.getItem("logedUser");
      const userDatatwo = storedUserData ? JSON.parse(storedUserData) : null;
      const jwt = userDatatwo ? userDatatwo.Token : null;

      const apiEndpoint = userData.status === "Active"
        ? `https://armada-server.glitch.me/api/superAdmin/deactivateAdmin/${userId2}`
        : `https://armada-server.glitch.me/api/superAdmin/activateAdmin/${userId2}`;

      const response = await axios.put(apiEndpoint, null, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
console.log(response)
      if (response.status === 200) {
        toast.success(`${userData.status === "active" ? "Deactivated" : "deactivated"} successfully!`);
        await fetchUserData(); // Re-fetch user data to update the state
        setDeleteDialogOpen(false); // Close the dialog
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error toggling admin status:", error);
      toast.error("Failed to update status");
    }
  };

  const renderStatusDialog = () => (
    <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
      <DialogTitle>{userData.status === "Active" ? "Deactivate" : "Activate"} Admin</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Are you sure you want to {userData.status === "Active" ? "deactivate" : "activate"} this admin?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDeleteDialogClose} color="success">Cancel</Button>
        <Button onClick={handleToggleActiveStatus} color={userData.status === "Active" ? "error" : "primary"}>
          {userData.status === "active" ? "Deactivate" : "Activate"}
        </Button>
      </DialogActions>
    </Dialog>
  );

  const handleBack = () => {
    navigate(-1);
  };

  if (!userData) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box m="20px" textAlign="center">
      <Box m="40px 0 0 0" display="flex" flexDirection="column" alignItems="center">
        <Avatar src={userData.profilePicture} sx={{ width: 120, height: 120, marginBottom: 2 }} />

        <Box sx={{ display: 'flex', gap: 1, marginBottom: 2 }}>
          {editMode ? (
            <IconButton onClick={handleSave}>
              <SaveOutlinedIcon />
              <Typography variant="caption">Save</Typography>
            </IconButton>
          ) : (
            <IconButton onClick={toggleEditMode}>
              <EditOutlinedIcon />
              <Typography variant="caption">Edit Admin info</Typography>
            </IconButton>
          )}
          <IconButton onClick={handleDeleteDialogOpen}>
            <DeleteOutlineOutlinedIcon />
            <Typography variant="caption">{userData.status === "Active" ? "Deactivate" : "Activate"} Admin</Typography>
          </IconButton>
        </Box>

        {editMode ? (
          <Box>
            <Typography sx={{ marginBottom: 2 }}>Please insert the whole field</Typography>
            <TextField
              label="First Name"
              value={editableData.first_name}
              onChange={(e) => handleInputChange('first_name', e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Last Name"
              value={editableData.last_name}
              onChange={(e) => handleInputChange('last_name', e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Phone Number"
              value={editableData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Address"
              value={editableData.address1}
              onChange={(e) => handleInputChange('address1', e.target.value)}
              sx={{ marginBottom: 2 }}
            />
          </Box>
        ) : (
          <Box sx={{ 
            border: '1px solid',
            borderColor: 'grey.300',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '20px',
          }}>
        {console.log("the last ",userData)}
            <Typography variant="h5" gutterBottom>NAME: {userData.first_name} {userData.last_name}</Typography>
            <Typography variant="body1" gutterBottom>EMAIL: {userData.email}</Typography>
            <Typography variant="body1" gutterBottom>PHONE NUMBER: {userData.phone}</Typography>
            <Typography variant="body1" gutterBottom>ADDRESS: {userData.address1}</Typography>
            <Typography variant="body1" gutterBottom>ROLE: {userData.role}</Typography>
            <Typography color="error" variant="body1" gutterBottom>STATUS: {userData.status}</Typography>
          </Box>
        )}

        {renderStatusDialog()}

        <Button variant="contained" color="success" onClick={handleBack}>Back</Button>
        <ToastContainer />
      </Box>
    </Box>
  );
};

export default UserDetailsPage;
