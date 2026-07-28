import React from 'react'

function Input() {
  return (
    <footer className="border-t border-zinc-700 p-2">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Write a message..."
            className="w-full min-w-0 flex-1 rounded-lg border border-zinc-600 bg-zinc-800 px-3 py-2 text-white outline-none focus:border-blue-500"
          />

          <button className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700">
            Send
          </button>
        </div>
      </footer>
  )
}

export default Input