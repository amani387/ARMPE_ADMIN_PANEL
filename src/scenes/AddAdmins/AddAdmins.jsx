import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

/*
document.cookie = your_cookie_name=${jwt}; path=/; HttpOnly; Secure;

*/


const handleFormSubmit = async (values, { resetForm }) => {
  try {
    const storedUserData = window.localStorage.getItem("logedUser");
    const userData = storedUserData ? JSON.parse(storedUserData) : null;
    const jwt = userData ? userData.Token : null; // Extract the token
    
    // Send form data along with the token to the backend
    const response = await axios.post(
      'https://armada-server.glitch.me/api/superAdmin/createAdmin', // Replace with your backend endpoint
      values, // Form data
      {
        headers: {
          Authorization: `Bearer ${jwt}`, // Send token in the Authorization header
        },
      }
    );
console.log(response)
    // Optionally, show a success message
    console.log("Form submitted successfully");
    toast.success("Admin created succssfully!"); // Show success toast message
    // Reset the form after successful submission
    resetForm();

  } catch (error) {


    
    console.error("Error adding category:", error);
      toast.error("Failed to add category.");
  }
};

  

  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.first_name} // Change here
                name="first_name" // Change here
                error={!!touched.first_name && !!errors.first_name} // Change here
                helperText={touched.first_name && errors.first_name} // Change here
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.last_name} // Change here
                name="last_name" // Change here
                error={!!touched.last_name && !!errors.last_name} // Change here
                helperText={touched.last_name && errors.last_name} // Change here
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phone} // Change here
                name="phone" // Change here
                error={!!touched.phone && !!errors.phone} // Change here
                helperText={touched.phone && errors.phone} // Change here
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address 1"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address1}
                name="address1"
                error={!!touched.address1 && !!errors.address1}
                helperText={touched.address1 && errors.address1}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address 2"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address2}
                name="address2"
                error={!!touched.address2 && !!errors.address2}
                helperText={touched.address2 && errors.address2}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New Admin
              </Button>
               <ToastContainer />
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  first_name: yup.string().required("required"), // Change here
  last_name: yup.string().required("required"), // Change here
  email: yup.string().email("invalid email").required("required"),
  phone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"), // Change here
  address1: yup.string().required("required"),
  address2: yup.string().required("required"),
});
const initialValues = {
  first_name: "", // Change here
  last_name: "", // Change here
  email: "",
  phone: "", // Change here
  address1: "",
  address2: "",
};

export default Form;
