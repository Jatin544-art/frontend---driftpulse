import { LayoutDashboard, Server, Bell, Settings as SettingsIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar glass-panel">
      <div className="sidebar-logo">
        <div className="logo-icon-wrapper">
          <Server className="icon-main text-brand" />
        </div>
        <h2>
          Drift<span className="text-muted">Pulse</span>
        </h2>
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
          <LayoutDashboard className="nav-icon" />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/devices" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
          <Server className="nav-icon" />
          <span>Devices</span>
        </NavLink>
        <NavLink to="/alerts" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
          <Bell className="nav-icon" />
          <span>Alerts</span>
        </NavLink>
        <NavLink to="/settings" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
          <SettingsIcon className="nav-icon" />
          <span>Settings</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <div className="system-status">
          <div className="status-dot pulsing"></div>
          <span>System Healthy</span>
        </div>
      </div>
    </aside>
  );
}
