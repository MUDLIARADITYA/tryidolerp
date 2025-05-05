  import React from "react";
  import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
  import Login from "./Component/Login";
  import Dashboard from "./Pages/Admin/Dashboard";
  import Layout from "./Component/Layout"; // <-- import layout
  import Viewall from "./Pages/Admin/Viewall";

  function App() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/view-all" 
          element={
            <Layout>

          <Viewall/>
          </Layout>

        }
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
