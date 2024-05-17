import axios from "axios";
import { useEffect, useState } from "react";


export const GetAdminsData = async () => {
    try {

        const [admins, setAdmins] = useState([]);
  
const storedUserData = window.localStorage.getItem("logedUser");
const userData = storedUserData ? JSON.parse(storedUserData) : null;
const jwt = userData ? userData.Token : null; // Extract the token

      // Fetch data from the API
      const response = await axios.get("https://armada-server.glitch.me/api/superAdmin/getAdmins");
      const adminsData = response.data;
  
      // Transform the fetched data into the desired format
      const transformedAdmins = adminsData.map((admin, index) => ({
        id: admin._id,
        firstName: admin.first_name,
        lastName: admin.last_name,
        email: admin.email,
        password: "******", // You may set the password accordingly
        phone: admin.phone,
        role: admin.role.toLowerCase(),
        address1: admin.address1,
        address2: admin.address2,
        status: admin.status === "active" ? "Active" : "Inactive",
      }));
  console.log(transformedAdmins)
      return transformedAdmins;
    } catch (error) {
      console.error("Error fetching admins:", error);
      return []; // Return an empty array in case of an error
    }
  };