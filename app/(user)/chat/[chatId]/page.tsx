import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import ChatInput from "@/components/ChatInput";

type Props = {
  params: {
    chatId: string;
  };
};

async function ChatPage({ params: { chatId } }: Props) {
  const session = await getServerSession(authOptions);
  return (
    <>
        {/* Admin controls */}
        {/* ChatMembers badge */}

        {/* Chat messages  */}
        
        {/* Chat Input  */}
        <ChatInput chatId={chatId}/>
    </>
  )
}

export default ChatPage