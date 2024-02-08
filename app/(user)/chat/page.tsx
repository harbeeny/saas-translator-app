import ChatList from "@/components/ChatList";

type Props = {
    params: {};
    searchParams: {
        error: string;
    };
};

function ChatsPage({ searchParams: { error } }: Props) {
  return (
    <div>
        {/* Chat Permission chat */}

        {/* Chat list */}
        <ChatList />
    </div>
  )
}

export default ChatsPage;