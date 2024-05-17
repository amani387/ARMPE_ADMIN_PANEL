import { Box, Typography, Avatar, Button, IconButton, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfileViewPage = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const storedUserData = JSON.parse(window.localStorage.getItem("logedUser"));
  const jwt = storedUserData ? storedUserData.Token : null;
  const [editableFields, setEditableFields] = useState({});

  // Function to fetch user data based on userId
  const fetchUserData = async () => {
    try {
      if (storedUserData && storedUserData.admin) {
        setUserData(storedUserData.admin);
        setEditableFields(storedUserData.admin); // Initialize editable fields with user data
      } else {
        console.error("Admin data not found in stored user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Fetch user data when component mounts
  useEffect(() => {
    fetchUserData();
  }, []);

  const handleEditClick = () => {
    setIsEditable(!isEditable);
  };

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const handleProfileUpdate = async () => {
    try {
      console.log(editableFields)
      const response = await axios.put(
        `https://armada-server.glitch.me/api/admin/updateProfile`,
        editableFields, // Send updated fields
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      if (response.status === 201) {
        toast.success("Profile updated successfully!");
        setIsEditable(false); // Disable editing mode after updating
      } else {
        console.error("Profile update failed");
        toast.error("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleFieldChange = (field, value) => {
    setEditableFields(prevFields => ({ ...prevFields, [field]: value }));
  };

  // Display user profile information if data is available
  return (
    <Box m="20px" textAlign="center" boxShadow={3} borderRadius={4} p={4}>
      <Typography variant="h4" p={4}>
        User Profile
      </Typography>
      {userData && (
        <>
          <Box
            position="relative"
            display="inline-block"
            mb={2}
            border={isEditable ? "1px solid #ccc" : "none"}
          >
            <Avatar
              src={userData.profilePicture}
              alt="Profile Picture"
              sx={{ width: 200, height: 200, margin: "auto" }}
            />
            <IconButton
              onClick={handleEditClick}
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
              }}
            >
              <EditIcon />
            </IconButton>
          </Box>
          <TextField
            fullWidth
            label="First Name"
            value={editableFields.first_name || ""}
            disabled={!isEditable}
            onChange={(e) => handleFieldChange('first_name', e.target.value)}
            sx={{ py: 1 }}
          />
          <TextField
            fullWidth
            label="Last Name"
            value={editableFields.last_name || ""}
            disabled={!isEditable}
            onChange={(e) => handleFieldChange('last_name', e.target.value)}
            sx={{ py: 1 }}
          />
          <TextField
            fullWidth
            label="Email"
            value={editableFields.email || ""}
            disabled={!isEditable}
            onChange={(e) => handleFieldChange('email', e.target.value)}
            sx={{ py: 1 }}
          />
          <TextField
            fullWidth
            label="Phone"
            value={editableFields.phone || ""}
            disabled={!isEditable}
            onChange={(e) => handleFieldChange('phone', e.target.value)}
            sx={{ py: 1 }}
          />
          {isEditable && (
            <Button
              variant="contained"
              color="success"
              onClick={handleProfileUpdate}
              mt={4}
              mr={2}
            >
              Save Changes
            </Button>
          )}
        </>
      )}

      <Button variant="contained" color="error" onClick={handleBack} mt={4} ml={2}>
        Back
      </Button>
      <ToastContainer />
    </Box>
  );
};

export default ProfileViewPage;
