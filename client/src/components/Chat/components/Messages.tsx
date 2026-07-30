type Message = {
  role: "user" | "assistant";
  content: string;
};

function Messages({
  messages,
  inputMessage,
}: {
  messages: Message[];
  inputMessage: string;
}) {
  return (
    <main className="flex-1 min-h-0 overflow-y-auto p-2 space-y-2">
      {messages.length === 0 && inputMessage === "" ? (
        <p className="text-sm text-zinc-500">
          There are no messages yet.
        </p>
      ) : (
        <>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-3 py-2 ${
                  message.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-zinc-800 text-white"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}

          {inputMessage.trim() !== "" && (
            <div className="flex justify-end opacity-70">
              <div className="max-w-[80%] rounded-lg bg-blue-600 px-3 py-2 text-white italic">
                {inputMessage}
              </div>
            </div>
          )}
        </>
      )}
    </main>
  );
}

export default Messages;