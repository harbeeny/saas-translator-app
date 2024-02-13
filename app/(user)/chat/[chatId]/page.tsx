import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import ChatInput from "@/components/ChatInput";
import ChatMessages from "@/components/ChatMessages";
import { getDocs } from "firebase/firestore";
import { chatMembersRef } from "@/lib/converter/ChatMembers";
import { sortedMessagesRef } from "@/lib/converter/Message";
import { redirect } from "next/navigation";
import ChatMembersBadge from "@/components/ChatMembersBadge";
import AdminControls from "@/components/AdminControls";

type Props = {
  params: {
    chatId: string;
  };
};

async function ChatPage({ params: { chatId } }: Props) {
  const session = await getServerSession(authOptions);

  const initialMessages = (await getDocs(sortedMessagesRef(chatId))).docs.map(
    (doc) => doc.data()
  );

  const hasAccess = (await getDocs(chatMembersRef(chatId))).docs
    .map((doc) => doc.id)
    .includes(session?.user.id!);

  if (!hasAccess) redirect("/chat?error=permission");


  return (
    <>
        <AdminControls  chatId={chatId}/>
        <ChatMembersBadge chatId={chatId}/>

        <div className="flex-1">
          <ChatMessages
            chatId={chatId}
            session={session}
            initialMessages={initialMessages}
          />
        </div>
        
        <ChatInput chatId={chatId}/>
    </>
  );
}

export default ChatPage