import { BrowserRouter, Routes, Route } from "react-router-dom";
import Topbar from "./components/Topbar";
import { Command } from "@tauri-apps/plugin-shell";


import Dashboard from "./pages/Dashboard";
import SSHDevices from "./pages/SSHDevices";

const command = Command.sidecar("binaries/backend");

await command.spawn();

export default function App() {
    return (
        <BrowserRouter>
            <div className="flex h-screen flex-col">
                <Topbar />

            <div className="flex-1 min-h-0">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/sshdevices" element={<SSHDevices />} />
                    </Routes>
            </div>
          </div>
        </BrowserRouter>
    );
}