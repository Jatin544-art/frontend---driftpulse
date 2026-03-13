import { useState } from 'react';
import {
  AlertTriangle,
  ShieldAlert,
  Radio,
  Timer,
  ChevronDown,
  Eye,
  Search,
} from "lucide-react";

import AlertTrendChart from "../components/AlertTrendChart";
import VulnerabilityMap from "../components/VulnerabilityMap";

/* ---------- STAT CARD ---------- */

const StatCard = ({ title, value, trend, isPositive, icon: Icon, iconColor }) => (
  <div className="glass-panel metric-card flex flex-col justify-between min-h-[200px] hover:shadow-lg transition-all">

    <div className="flex justify-between items-start mb-6">
      <p className="text-muted text-lg font-medium">{title}</p>
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-white/5 ${iconColor}`}>
        <Icon size={26} />
      </div>
    </div>

    <div className="flex items-end justify-between">
      <h2 className="text-6xl font-bold tracking-tight">{value}</h2>
      <p className={`text-lg font-semibold ${isPositive ? "text-[#22C55E]" : "text-[#EF4444]"}`}>
        {trend}
      </p>
    </div>

  </div>
);

/* ---------- ALERT DATA ---------- */

const alertsData = [
  {
    id: 1,
    deviceId: "DP-99283-AX",
    type: "Potential Brute Force Attack",
    severity: "High",
    severityColor: "status-badge warning",
    status: "Live",
    statusColor: "status-badge critical",
    timestamp: "2024-03-13 14:23:01",
  },
  {
    id: 2,
    deviceId: "DP-44521-BX",
    type: "Unauthorized Data Exfiltration",
    severity: "High",
    severityColor: "status-badge warning",
    status: "Investigating",
    statusColor: "status-badge warning",
    timestamp: "2024-03-13 13:45:22",
  },
  {
    id: 3,
    deviceId: "DP-77892-CX",
    type: "Abnormal Database Access",
    severity: "Medium",
    severityColor: "status-badge warning",
    status: "Open",
    statusColor: "status-badge online",
    timestamp: "2024-03-13 12:11:45",
  },
  {
    id: 4,
    deviceId: "DP-11234-DX",
    type: "SSL Certificate Expiration",
    severity: "Safe",
    severityColor: "status-badge online",
    status: "Resolved",
    statusColor: "status-badge online",
    timestamp: "2024-03-13 10:30:00",
  },
];

/* ---------- PAGE ---------- */

const SEVERITIES = ['All',  'High', 'Medium', 'Safe'];

export default function Alerts() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [timeRange, setTimeRange] = useState('24h');

  const filteredAlerts = alertsData.filter((alert) => {
    const matchesSeverity = activeFilter === 'All' || alert.severity === activeFilter;
    const matchesSearch =
      alert.deviceId.toLowerCase().includes(search.toLowerCase()) ||
      alert.type.toLowerCase().includes(search.toLowerCase());
    return matchesSeverity && matchesSearch;
  });

  return (
    <div className="p-6 fade-in flex flex-col gap-6">

      {/* HEADER */}
      <div className="page-header items-center">
        <div>
          <h1 className="page-title">Alerts Management</h1>
          <p className="page-subtitle">Monitor and respond to security threats in real-time</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="search-bar w-72">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              placeholder="Search device or alert"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="select-dark min-w-[150px] appearance-none cursor-pointer pr-10"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
            <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted" />
          </div>

          <button className="btn-primary">
            Export Report
          </button>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          title="Total Alerts"
          value="48"
          trend="+12.5%"
          isPositive={false}
          icon={AlertTriangle}
          iconColor="text-[#22D3EE]"
        />
        <StatCard
          title="Critical Threats"
          value="8"
          trend="+3.2%"
          isPositive={false}
          icon={ShieldAlert}
          iconColor="text-[#EF4444]"
        />
        <StatCard
          title="Active Sessions"
          value="156"
          trend="+1.8%"
          isPositive={true}
          icon={Radio}
          iconColor="text-[#8B5CF6]"
        />
        <StatCard
          title="Mean Time to Resolve"
          value="4.2h"
          trend="-15.3%"
          isPositive={true}
          icon={Timer}
          iconColor="text-[#22C55E]"
        />
      </div>

      {/* ALERT TABLE */}
      <div className="glass-panel device-table-card overflow-hidden">
        <div className="card-header border-b border-white/5">
          <h2 className="text-xl font-semibold">Alerts</h2>
          <div className="flex items-center gap-2">
            {SEVERITIES.map((s) => (
              <button
                key={s}
                onClick={() => setActiveFilter(s)}
                className={`text-sm py-1.5 px-4 rounded-lg font-medium transition-all ${
                  activeFilter === s
                    ? 'bg-[var(--brand-primary)] text-white shadow-md'
                    : 'btn-outline'
                }`}
              >
                {s === 'All' ? 'All Severities' : s}
              </button>
            ))}
          </div>
        </div>

        <div className="table-wrapper overflow-x-auto">
          <table className="device-table w-full table-auto">
            <thead className="sticky top-0 bg-[#0a0a0f] z-10">
              <tr>
                <th>Device ID</th>
                <th>Alert Type</th>
                <th>Severity</th>
                <th>Status</th>
                <th>Timestamp</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAlerts.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-muted">
                    No alerts match your filter.
                  </td>
                </tr>
              )}
              {filteredAlerts.map((alert) => (
                <tr key={alert.id} className="cursor-pointer hover:bg-white/5 transition-colors">

                  <td className="font-mono text-brand font-semibold text-sm">
                    {alert.deviceId}
                  </td>

                  <td className="font-medium text-base">
                    {alert.type}
                  </td>

                  <td>
                    <span className={alert.severityColor}>
                      <span className="status-dot"></span>
                      {alert.severity}
                    </span>
                  </td>

                  <td>
                    <span className={alert.statusColor}>
                      <span className="status-dot"></span>
                      {alert.status}
                    </span>
                  </td>

                  <td className="font-mono text-sm text-muted">
                    {alert.timestamp}
                  </td>

                  <td className="text-right">
                    <button className="icon-btn-small" title="View details">
                      <Eye size={17} />
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AlertTrendChart />
        <VulnerabilityMap />
      </div>

    </div>
  );
}