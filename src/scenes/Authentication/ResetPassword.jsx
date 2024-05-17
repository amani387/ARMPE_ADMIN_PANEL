import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, TextField, Typography, Box, useTheme } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

const PasswordReset = () => {
  const theme = useTheme();
  const [confirmationCode, setConfirmationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleConfirmationCodeChange = (e) => {
    setConfirmationCode(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Send request to reset password with the confirmation code and new password
      const response = await axios.post(
        "https://your-api-url/reset-password",
        { confirmationCode, newPassword }
      );
      // Handle response accordingly
      if (response.status === 200) {
        toast.success("Password reset successfully", {
          position: "top-right",
          autoClose: true,
        });
        // Redirect the user to login page after success
        navigate("/login");
      } else {
        toast.error("Failed to reset password. Please try again.", {
          position: "top-right",
          autoClose: true,
        });
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error("An error occurred. Please try again later.", {
        position: "top-right",
        autoClose: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h2" component="h2" gutterBottom>
          Password Reset
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="confirmationCode"
            label="Confirmation Code"
            name="confirmationCode"
            autoComplete="off"
            autoFocus
            value={confirmationCode}
            onChange={handleConfirmationCodeChange}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'rgba(39,113,73,0.23)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(0, 0, 0, 0.23)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'rgba(39,113,73,0.23)',
                },
              },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="newPassword"
            label="New Password"
            name="newPassword"
            type="password"
            autoComplete="new-password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'rgba(39,113,73,0.23)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(0, 0, 0, 0.23)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'rgba(39,113,73,0.23)',
                },
              },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default PasswordReset;
