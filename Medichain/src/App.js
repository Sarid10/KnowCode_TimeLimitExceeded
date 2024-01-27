import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import SideBar from "./pages/SideBar";
import Diagnose from "./pages/Diagnose";
import { useEffect } from "react";

import { ChakraProvider } from "@chakra-ui/react";
import Dashboard from "./pages/Dashboard";
import Patient from "./pages/Patient";
import Articles from "./pages/Articles";
import Medical_History from "./pages/Medical_History";
import Profile from "./pages/Profile";

import News from "./pages/News";
import Assistant from "./pages/Assistant";
import Disease from "./pages/Disease";
import Consult from "./pages/Consult";

function App() {
  return (
    <ChakraProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/news" element={<News />} />

        <Route path="/assistant" element={<Assistant />} />

        <Route
          path="/Dashboard"
          element={
            <>
              <SideBar>
                <Dashboard />
              </SideBar>
            </>
          }
        />

        <Route
          path="/Diagnose"
          element={
            <>
              <SideBar>
                <Diagnose />
              </SideBar>
            </>
          }
        />

        <Route
          path="/Patient"
          element={
            <>
              <SideBar>
                <Patient />
              </SideBar>
            </>
          }
        />

        <Route
          path="/Articles"
          element={
            <>
              <SideBar>
                <Articles />
              </SideBar>
            </>
          }
        />

        <Route
          path="/Medical_History"
          element={
            <>
              <SideBar>
                <Medical_History />
              </SideBar>
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <SideBar>
              <Profile />
            </SideBar>
          }
        />
        <Route
          path="/Consult"
          element={
            <SideBar>
              <Consult />
            </SideBar>
          }
        />
        <Route
          path="/Disease"
          element={
            <SideBar>
              <Disease />
            </SideBar>
          }
        />
      </Routes>
    </ChakraProvider>
  );
}
export default App;
