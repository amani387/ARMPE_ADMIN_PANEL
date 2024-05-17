import React, { useState,createContext, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Topbar from './scenes/global/topBar'
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team/Team";
import Login from "./scenes/Authentication/Signup";
import Posts from "./scenes/Posts/Posts";
import UserDetail from "./scenes/userDetal/UserDetail"
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import ProfileViewPage from "./scenes/profile/Profile";
import AddAdmin from './scenes/AddAdmins/AddAdmins'
import ApprovedPosts from "./scenes/ApprovedPosts/ApprovedPosts";
import MapComponent from "./scenes/maps/Maps";
import AddCategoryForm from "./scenes/Category/AddCategory";
import CategoryList from "./scenes/Category/CategoryList";
import FAQ from "./scenes/FAQ/Faq";
import PostDetail from "./scenes/Posts/PostDetailSeing";
import ForgotPassword from "./scenes/Authentication/ForgetPassword";
import ContractsPage from "./scenes/Contracts/Contracts";
import Machineryowner from "./scenes/team/machineOwner";
import FarmList from "./scenes/FarmList/FarmList";
import FarmDetail from "./scenes/FarmList/FarmDetail";
import PasswordReset from "./scenes/Authentication/ResetPassword";
import UpdateCategory from "./scenes/Category/updateCategory";
import CategoryDetailPage from "./scenes/Category/CategoryDetail";
import axios from "axios";
// Create a Context

export const AdminCountContext = createContext();
function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [adminCount, setAdminCount] = useState(0);
   const [user,setUserscount] =useState(0)

  const storedUserData = window.localStorage.getItem("logedUser");
  const userData = storedUserData ? JSON.parse(storedUserData) : null;
  const jwt = userData ? userData.Token : null; // Extract the token
  
  const [forgotPasswordFlow, setForgotPasswordFlow] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  
  const isLoggedIn = !!localStorage.getItem("logedUser"); // Check if user is logged in
//for fetching the data of the admin number 
useEffect(() => {
  const fetchAdmins = async () => {
    try {
      const response = await axios.get(
        "https://armada-server.glitch.me/api/superAdmin/getAdmins"
     , {
      headers: {
        Authorization: `Bearer ${jwt}`, // Send token in the Authorization header
      },
    }
     
      );
     const data =response.data.map((admin, index) => ({
      ...admin,
      id: admin._id // Generating IDs for the DataGrid
    }))
    
      setAdminCount(data.length); 
      console.log("the number is ",data.length)
    } catch (error) {
      console.error("Error fetching admins:", error);
    }
   
  };

  fetchAdmins();
}, []);

//useEffect to fetch the user number 
useEffect(() => {
  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://armada-server.glitch.me/api/admin/getUsers",  {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      const datatwo =response.data.map((admin, index) => ({
        ...admin,
       
      }))
      setUserscount(datatwo.length)
      console.log(datatwo.length)
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  fetchUsers();
}, []);


  // Function to handle search query change
  const handleSearch = (query) => {
    setSearchQuery(query);
    console.log("the query is",searchQuery)
  };
  return (
    <AdminCountContext.Provider value={{ adminCount, setAdminCount,user,setUserscount }}>
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/form/forgotPassword" element={<ForgotPassword />} />
            <Route path="/form/resetpassword" element={<PasswordReset />} />



            {/* Protected routes */}
            {isLoggedIn ? (
              <Route path="/*" element={
                <>
                  <Sidebar isSidebar={isSidebar} />
                  <main className="content">
                  <Topbar setIsSidebar={setIsSidebar} onSearch={handleSearch} />
                    <Routes>
                      <Route path="/dashboard" element={<Dashboard  adminCount={adminCount} user={user}/>} />
                      <Route path="/team" element={<Team  searchQuery={searchQuery} setAdminCount={setAdminCount}/>} />
                      <Route path="/machineowner" element={<Machineryowner setUserscount={setUserscount} searchQuery={searchQuery}  />} />
                      <Route path="/farmlist" element={<FarmList  searchQuery={searchQuery}/>}/>
                      <Route path="/farmsdetail/:id" element={<FarmDetail/>}/>
                      <Route path="/posts" element={<Posts   searchQuery={searchQuery}/>} />
                      <Route path="/posts/:postId" Component={PostDetail} />
                      <Route path="/user-details/:userId2" element={<UserDetail />} />
                      <Route path="/profile" element={<ProfileViewPage/>}/>
                      <Route path="/form" element={<AddAdmin />} />
                      <Route path="/approvedposts" element={<ApprovedPosts searchQuery={searchQuery}/>}/>
                      <Route path="/addcategory" element={<AddCategoryForm/>}/>
                      <Route path="/categorylist" element={<CategoryList  searchQuery={searchQuery}/>}/>
                      <Route path="/category/:categoryid" element={<CategoryDetailPage/>}/>
                    
                      <Route path="/updateCategory/:categoryId" element={<UpdateCategory/>}/>
                      <Route path="/faq" element={<FAQ />} />
                      <Route path="/contracts" element={<ContractsPage searchQuery={searchQuery} />} />
                      <Route path="/geography" element={<MapComponent />} />
                    </Routes>
                  </main>
                </>
              } />
            ) : (
              <Route path="/*" element={<Navigate to="/login" />} />
            )}
          </Routes>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
    </AdminCountContext.Provider>
  );
}

export default App;
