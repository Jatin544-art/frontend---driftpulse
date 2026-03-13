import { Routes, Route } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import Navbar from "./components/Navbar"
import Dashboard from "./pages/Dashboard"
import Alerts from "./pages/Alerts"
import Devices from "./pages/Devices"
import DeviceDetail from "./pages/DeviceDetail"
import Settings from "./pages/Settings"
import Profile from "./pages/Profile"
import Help from "./pages/Help"

export default function App(){

  return (
    <div className="flex app-container h-screen overflow-hidden">
      <Sidebar/>
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar/>
        <div className="flex-1 overflow-y-auto w-full">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/devices" element={<Devices />} />
            <Route path="/devices/:id" element={<DeviceDetail />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/help" element={<Help />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}
