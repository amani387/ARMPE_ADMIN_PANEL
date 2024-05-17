import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, TextField, Typography, Box ,useTheme , Link} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";


const ForgotPassword = () => {
     const theme = useTheme();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Send request to reset password with the provided phone number
      const response = await axios.post(
        "https://your-api-url/reset-password",
        { phoneNumber }
      );
      // Handle response accordingly
      if (response.status === 200) {
        toast.success("Password reset instructions sent to your phone number", {
          position: "top-right",
          autoClose: true,
        });
        // Redirect the user to login page after success
        navigate("/resetpassword");
      } else {
        toast.error("Failed to send reset instructions. Please try again.", {
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
          Forgot Password
        </Typography>
        <Typography variant="h5" component="h5" gutterBottom>
          PLEASE INSERT YOUR PHONE NUMBER
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
  margin="normal"
  required
  fullWidth
  id="phoneNumber"
  label="Phone Number"
  name="phoneNumber"
  autoComplete="tel"
  autoFocus
  value={phoneNumber}
  onChange={handleChange}
  sx={{
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'rgba(39,113 ,73.33, 0.23)',
      },
      '&:hover fieldset': {
        borderColor: 'rgba(0, 0, 0, 0.23)',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'rgba(39,113 ,73.33, 0.23)',
      },
    },
  }}
/>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="inherit"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Instructions"}
          </Button>
          <Link href="/login" variant="body5"  sx={{ mt: 2,color:'green' }}>
            LOGIN
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
