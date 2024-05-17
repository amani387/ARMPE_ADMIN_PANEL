import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Divider, Card, CardMedia } from "@mui/material";
import Header from "../../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const FarmDetail = () => {
  const { id } = useParams(); // Get the farm ID from the URL params
  const navigate = useNavigate();
  const [farmData, setFarmData] = useState(null);

  useEffect(() => {
    const storedUserData = window.localStorage.getItem("logedUser");
    const userDatatwo = storedUserData ? JSON.parse(storedUserData) : null;
    const jwt = userDatatwo ? userDatatwo.Token : null;

    const fetchFarmData = async () => {
      try {
        const response = await axios.get(`https://armada-server.glitch.me/api/farm/${id}`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        setFarmData(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching farm data:", error);
      }
    };

    fetchFarmData();
  }, [id]);

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  if (!farmData) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box m="20px">
      <Header title="Farm Detail" />
      <Box m="20px">
        <Typography variant="h5" gutterBottom>
          Farm Name  : {farmData.farm_name}
        </Typography>
      
        <Typography variant="body1" gutterBottom>
          Farm Size  : {farmData.farm_size}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Latitude  : {farmData.latitude}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Longitude  : {farmData.longitude}
        </Typography>
        <Typography variant="body1" gutterBottom>
        Soiltype  : {farmData.soil_type}
        </Typography>
        <Typography variant="body1" gutterBottom>
        crops_grown  : {farmData.crops_grown}
        </Typography>
        <Box my={2}>
          <Card>
            <CardMedia component="img" height="200" image={farmData.image} alt={`Farm ${id}`} />
          </Card>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Button variant="contained" color="success" onClick={handleBack}>
          Back
        </Button>
      </Box>
    </Box>
  );
};

export default FarmDetail;
