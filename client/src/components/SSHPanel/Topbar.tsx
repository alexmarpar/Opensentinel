
function Topbar({ setOpenedAddDevice, setSearch }: { setOpenedAddDevice: React.Dispatch<React.SetStateAction<boolean>>; setSearch: React.Dispatch<React.SetStateAction<string>> }) {
  return (
    <header className="h-16 bg-gray-950 border-b border-gray-800 flex items-center text-white">
       <div className="flex items-center gap-3 justify-between px-6">
        <h1 className=" text-xl font-semibold">
          Saved devices
        </h1>
      </div>
      <nav className="flex items-center gap-6 ml-10">
        <button type="submit" className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded" 
      onClick={() => {
        setOpenedAddDevice(true);
      }}>
        Add Device
      </button>
      <input
       type="text"
       placeholder="Search devices..."
       autoComplete="off"
       className="w-full min-w-0 flex-1 rounded-lg border border-zinc-600 bg-zinc-800 px-3 py-2 text-white outline-none focus:border-blue-500"
       onChange={(e) => setSearch(e.target.value)}
      />
  </nav>  
</header>
  )
}

export default Topbar
