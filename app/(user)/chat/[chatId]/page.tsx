import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import ChatInput from "@/components/ChatInput";


async function ChatPage() {
  const session = await getServerSession(authOptions);
  return (
    <>
        {/* Admin controls */}
        {/* ChatMembers badge */}

        {/* Chat messages  */}
        
        {/* Chat Input  */}
        <ChatInput />
    </>
  )
}

export default ChatPage