import Header from './components/Header'
import Messages from './components/Messages';
import Input from './components/Input';

function Chat({isSettingsOpen, setIsSettingsOpen}: {isSettingsOpen: boolean, setIsSettingsOpen: (open: boolean) => void}) {

  return (
    <section className="flex h-full min-h-0 flex-col rounded-xl border border-zinc-700 bg-zinc-900 shadow-lg">
        <Header open={isSettingsOpen} setOpen={setIsSettingsOpen}/>
         
        <Messages />
        <Input />
    </section>
  )};
   

export default Chat