import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import axios from "axios";
import { useParams } from "react-router-dom";

const MachineryDetail = () => {
  const { postId } = useParams();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [machinery, setMachinery] = useState(null);
  const storedUserData = window.localStorage.getItem("logedUser");
  const userDatatwo = storedUserData ? JSON.parse(storedUserData) : null;
  const jwt = userDatatwo ? userDatatwo.Token : null;

  useEffect(() => {
    const fetchMachineryDetail = async () => {
      ///api/machinery/{id}
      try {
        const paam =`https://armada-server.glitch.me/api/machinery/${postId}`
        console.log("the url ",paam)
        const response = await axios.get(
          `https://armada-server.glitch.me/api/admin/getMachine/${postId}`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        setMachinery(response.data);
      } catch (error) {
        console.error("Error fetching machinery detail:", error);
      }
    };

    fetchMachineryDetail();
  }, [postId, jwt]);

  if (!machinery) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box m="20px">
      <Typography variant="h4" color={colors.primary[400]}>
        Machinery Detail
      </Typography>
      <Box mt="20px">
        <Typography>ID: {machinery._id}</Typography>
        <Typography>Owner ID: {machinery.owner_id}</Typography>
        <Typography>Type: {machinery.type}</Typography>
        <Typography>Manufacturer: {machinery.manufacturer}</Typography>
        <Typography>Model: {machinery.model}</Typography>
        <Typography>Status: {machinery.status}</Typography>
        <Typography>Year: {machinery.year}</Typography>
        <Typography>Horsepower: {machinery.horsepower}</Typography>
        <Typography>Hour Meter: {machinery.hour_meter}</Typography>
        <Typography>Region: {machinery.region}</Typography>
        <Typography>Image: {machinery.image}</Typography>
        <Typography>Rating: {machinery.rating}</Typography>
        <Typography>Created At: {new Date(machinery.createdAt).toLocaleString()}</Typography>
        <Typography>Updated At: {new Date(machinery.updatedAt).toLocaleString()}</Typography>
      </Box>
    </Box>
  );
};

export default MachineryDetail;
