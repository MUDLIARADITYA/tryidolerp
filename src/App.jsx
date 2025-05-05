import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Component/Login";
import Dashboard from "./Pages/Admin/Dashboard";
import Layout from "./Component/Layout"; // <-- import layout
import Viewall from "./Pages/Admin/Viewall";
import Usersidebar from "./Component/Usersidebar";
import Sidebar from "./Component/Sidebar";
import User from "./Pages/User/User";

function App() {
  return (
    // <Route path="/" element={<Layout/>}>
    //   <Route path="/view-all" element={<Viewall/>}/>
    //   <Route path="//dashboard" element={<Dashboard />}/>
    //   <Route path="/view-all" element={<Dashboard />}/>
    //   <Route path="/view-all" element={<Viewall/>}/>
    //   <Route path="/user" element={<User/>}/>



    // </Route>
    <Router>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/view-all"
          element={
            <Layout>

              <Viewall />
            </Layout>

          }
        />
        
        <Route path="/user"
        element={<User/>} 
        />


        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
      </Routes>
    </Router>

  
  );
}

export default App;
