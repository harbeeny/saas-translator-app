"use client";

import { MessageSquarePlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useSubscriptionStore } from "@/store/store";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useToast } from "./ui/use-toast";
import LoadingSpinner from "./LoadingSpinner";
import { v4 as uuidv4 } from "uuid";
import { serverTimestamp, setDoc } from "firebase/firestore";
import { addChatRef } from "@/lib/converter/ChatMembers";

const CreateChatButton = ({isLarge}: { isLarge?: boolean}) => {
    const router = useRouter();
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const subscription = useSubscriptionStore((state) => state.subscription);

    const createNewChat= async() => {
      if (!session?.user.id) return;

      setLoading(true);
      toast({
        title:"Creating new chat...",
        description: "Hold tight while we create your new chat!",
        duration: 3000,
      });

      // TODO: Check if user is pro and limit them creating a new chat 

      // ---

      const chatId = uuidv4();

      await setDoc(addChatRef(chatId, session.user.id), {
        userId: session.user.id!,
        email: session.user.email!,
        timestamp: serverTimestamp(),
        isAdmin: true,
        chatId: chatId,
        image: session.user.image || "",
      })

        router.push('/chat/abc');
    };

    if (isLarge)
    return (
        <div>
          <Button variant={"default"} onClick={createNewChat}>
            {loading ? <LoadingSpinner /> : "Create a New Chat"}
          </Button>
        </div>
      )

  return (
    <Button variant={"ghost"} onClick={createNewChat}>
        <MessageSquarePlusIcon />
    </Button>
  );
};

export default CreateChatButton