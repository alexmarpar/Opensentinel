import { BrowserRouter, Routes, Route } from "react-router-dom";
import Topbar from "./components/Topbar";

import Dashboard from "./pages/Dashboard";

export default function App() {
    return (
        <BrowserRouter>
            <div className="flex h-screen flex-col">
                <Topbar />

            <div className="flex-1 min-h-0">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    </Routes>
            </div>
          </div>
        </BrowserRouter>
    );
}