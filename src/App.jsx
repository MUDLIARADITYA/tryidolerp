import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Component/Login";
import Dashboard from "./Pages/Admin/Dashboard";
import Layout from "./Component/Layout"; // <-- import layout
import Viewall from "./Pages/Admin/Viewall";
import Usersidebar from "./Component/Usersidebar";
import Sidebar from "./Component/Sidebar";
import User from "./Pages/User/User";
import Allnotification from "./Pages/User/Allnotification";
import MarkAttendance from "./Pages/User/MarkAttendance";
import MyAttendance from "./Pages/User/MyAttendance";
import LeaveStatus from "./Pages/User/LeaveStatus";
import Leaves from "./Pages/Admin/Leaves";
import Download from "./Pages/Admin/Download";
import Alerts from "./Pages/Admin/Alerts";
import Adduser from "./Pages/Admin/Adduser";

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
        <Route path="/allattendance"
          element={
            <Layout>

              <Viewall />
            </Layout>

          }
        />

        
        
        <Route path="/user"
        element={<User/>} 
        />

<Route path="/userattendance"
        element={<MarkAttendance/>} 
        />

<Route path="/myattendance"
        element={<MyAttendance/>} 
        />


<Route path="/leave"
        element={<LeaveStatus/>} 
        />

<Route path="/employeeleaves"
        element={
         <Layout>
          <Leaves/>
         </Layout>
        } 
        />

<Route path="/download"
        element={<Layout> 
          <Download/>
        </Layout>} 
        />

<Route path="/reg"

    
      element={
      <Layout>
 <Adduser/>
      </Layout>
       } 
      
        
        />
<Route path="/download"
        element={<Download/>} 
        />

<Route path="/notifications"
        element={
          <Layout>
            <Alerts/>
          </Layout>
        } 
        />

        
<Route path="/notifications"
        element={<Allnotification/>} 
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
