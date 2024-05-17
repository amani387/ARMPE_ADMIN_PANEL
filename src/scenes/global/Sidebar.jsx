import { useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import CategoryIcon from '@mui/icons-material/Category';
import ClassIcon from '@mui/icons-material/Class';
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';
import ApprovalIcon from '@mui/icons-material/Approval';
import MarkunreadMailboxIcon from '@mui/icons-material/MarkunreadMailbox';


const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};


const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [tokenName, setTokenName] = useState("");
  const [tokenValue, setTokenValue] = useState(null);
  const [role, setRole] = useState("");
  useEffect(() => {
    const tokenValue = window.localStorage.getItem("logedUser");
    if (tokenValue) {
      const token = JSON.parse(tokenValue).admin;
      setTokenName(token.first_name);
      setRole(token.role)
    }

  }, [tokenValue])
  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  ADMINS
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../assets/user.jpg`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {tokenName}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  {
                    role
                  }
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              POSTS
            </Typography>
            {/* <Item
              title="Add Category"
              to="/addcategory"
              icon={<CategoryIcon />}
              selected={selected}
              setSelected={setSelected}
            />
        
            <Item
              title="Category List"
              to="/categorylist"
              icon={<ClassIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
            <Item
              title="Machines"
              to="/posts"
              icon={<MarkunreadMailboxIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Approved Machine Posts"
              to="/approvedposts"
              icon={<ApprovalIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              FARMS
            </Typography>
            <Item
              title="Farm List"
              to="/farmlist"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
           
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              TEAM
            </Typography>
            {role === "Super Admin" && (
              <>
                <Item
                  title="Add New admins"
                  to="/form"
                  icon={<PersonOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Manage Admin"
                  to="/team"
                  icon={<PeopleOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
              </>
            )}
              <Item
              title="Users List"
              to="/machineowner"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          
            {/* <Item
              title="FAQ Page"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
             <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              CONTRACT MANAGMENT
            </Typography>
            <Item
              title="Contract List"
              to="/contracts"
              icon={<ScheduleSendIcon />}
              selected={selected}
              setSelected={setSelected}
            />
         <Item
              title="GeoLocation Machinery List"
              to="/geography"
              icon={<ScheduleSendIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
