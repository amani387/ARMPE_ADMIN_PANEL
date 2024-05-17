import React, { useState } from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { useLocation, useNavigate } from "react-router-dom";

const Topbar = ({ onSearch }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  // Function to handle navigation to profile page
  const handleProfileClick = () => {
    navigate("/profile"); // Navigate to the profile page
  };
  // Function to handle search query change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query); // Call onSearch prop with updated search query
  };

const handleLogout =()=>{
    // Clear user data from local storage
    window.localStorage.removeItem("logedUser");
    // Navigate to the login page
    navigate("/login");
}
  // Determine if the search bar should be displayed based on the current route
  const isSearchBarVisible = location.pathname !== "/dashboard";

  // List of routes where the search bar should be hidden
  const routesWithoutSearchBar = ["/addcategory", "/form", "/profile","/geography","/faq","/posts/:id"];

  // Check if the current route is in the list of routes without the search bar
  const hideSearchBar = routesWithoutSearchBar.includes(location.pathname);

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR (conditionally rendered) */}
      {isSearchBarVisible && !hideSearchBar && (
        <Box
          display="flex"
          backgroundColor={colors.primary[400]}
          borderRadius="3px"
        >
          <InputBase sx={{ ml: 2, flex: 1, color: "white" }} placeholder="Search"  onChange={handleSearchChange}  />
          <IconButton type="button" sx={{ p: 1 }}>
            <SearchIcon />
          </IconButton>
        </Box>
      )}

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
        <LogoutOutlinedIcon  onClick={handleLogout}/>
        </IconButton>
        <IconButton onClick={handleProfileClick}>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
