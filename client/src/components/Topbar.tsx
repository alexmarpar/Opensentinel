import { Link } from "react-router-dom";
import logo from "/src/assets/icon.svg";

export default function Topbar() {
  return (
    <header className="h-16 bg-gray-950 border-b border-gray-800 flex items-center text-white">
       <div className="flex items-center gap-3 justify-between px-6">
        <img
          src={logo}
          alt="Logo"
          className="w-9 h-9 bg-white rounded-full p-1"
        />

        <h1 className="text-lg font-semibold">
          OpenSentinel
        </h1>
      </div>
      <nav className="flex items-center gap-6 ml-10">
    <Link to="/">Dashboard</Link>
    <Link to="/sshdevices">SSH Devices</Link>
    <a href="https://github.com/alexmarpar/Opensentinel" target="_blank" rel="noopener noreferrer">
      Project Repository
    </a>
  </nav>  
    </header>
  );
}