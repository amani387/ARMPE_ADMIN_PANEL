import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { IconButton, TextField, Button, useTheme, Typography, Link, Container, Box } from "@mui/material";
import LoginValidator from '../../validator/LoginValidator';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import { tokens } from "../../theme";

const initialFormData = {
  email: "",
  password: ""
};
const initialFormError = {
  email: "", password: ""
};

const Login = () => {

  const [FormData, setFormData] = useState(initialFormData);
  const [FormError, setFormError] = useState(initialFormError);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onchangeHandler = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = LoginValidator(FormData);
    if (errors.email || errors.password) {
      setFormError(errors);
    } else {
      try {
        setLoading(true);

        const response = await axios.post(
          "https://armada-server.glitch.me/api/admin/login",
          FormData
        );


        const data = response.data;



        if (response && response.data) {
         
          window.localStorage.setItem("logedUser", JSON.stringify(data));
          alert("succesfull")
          // Display success alert
          navigate("/dashboard");
          /* toast.success("Category updated successfully.");
                  // Add a delay of 2 seconds (2000 milliseconds) before navigating to the next page
                  setTimeout(() => {
                      navigate("/dashboard");
                  }, 2000); */


          // Add a delay of 2 seconds (2000 milliseconds) before navigating to the next page



          setFormData(initialFormData);
          setFormError(initialFormData);
          setLoading(false);
          console.log("up to here ")


        } else {
          console.error("Response does not contain data:", response);
          toast.error("Failed to add category.");
        }
      } catch (error) {
        setLoading(false);
        const response = error.response;
        const data = response.data;
        console.error("Error response data:", error.response.data);
        toast.error(data.message, { position: "top-right", autoClose: true });
      }
      setFormError(initialFormData);
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
      ><Box display="flex" justifyContent="center" alignItems="center" backgroundColor='white' borderRadius="50%">
          <img
            alt="profile-user"
            width="250px"
            height="200px"
            src={`../../assets/trakter.png`}
            style={{ cursor: "pointer", borderRadius: "50%" }}
          /></Box>
        <Typography variant="h2" component="h2" gutterBottom>
          Login Form
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={FormData.email}
            onChange={onchangeHandler}
            error={Boolean(FormError.email)}
            helperText={FormError.email}
            sx={{ '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: 'green' }, } }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={FormData.password}
            onChange={onchangeHandler}
            error={Boolean(FormError.password)}
            helperText={FormError.password}
            sx={{ '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: 'green' }, } }}
          />
          <Link href="/form/forgotPassword" variant="body2" sx={{ mt: 1, color: 'green' }}>
            Forgot Password
          </Link>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color='success'
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
          <ToastContainer />
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
