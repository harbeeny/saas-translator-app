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
import { serverTimestamp, setDoc, getDocs } from "firebase/firestore";
import { 
  addChatRef, 
  chatMembersCollectionGroupRef, 
} from "@/lib/converter/ChatMembers";
import { ToastAction } from "./ui/toast";
import { subscriptionRef } from "@/lib/converter/Subscription";
import { Subscription } from "@/types/Subscription";

const CreateChatButton = ({isLarge}: { isLarge?: boolean}) => {
    const router = useRouter();
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    // const subscription = useSubscriptionStore((state) => state.subscription);
    
    const createNewChat= async() => {
      if (!session?.user.id) return;

      setLoading(true);
      toast({
        title:"Creating new chat...",
        description: "Hold tight while we create your new chat!",
        duration: 3000,
      });
    
    // Need to get the users current chats to check if they're about to exceed the PRO plan
    const chats = (
      await getDocs(chatMembersCollectionGroupRef(session.user.id))
    ).docs.map((doc) => doc.data());

    const subscriptions = (
      await getDocs(subscriptionRef(session.user.id))
    ).docs.map((doc) => doc.data());
    let subscription : Subscription;
      if(subscriptions.length>0) {
        subscription = subscriptions[0]
      }
      
      console.log("subscription");
      console.log(subscription);
    // check if the user is about to exceed the PRO plan which is 3 chats
    const isPro =
      subscription?.role === "pro" && subscription.status === "active";
    if (!isPro && chats.length >= 3) {
      toast({
        title: "Free plan limit exceeded",
        description:
          "You've'exceeded the limit of chats for the FREE plan. Please upgrade to PRO to continue adding users to chats!",
        variant: "destructive",
        action: (
          <ToastAction
            altText="Upgrade"
            onClick={() => router.push("/register")}
          >
            Upgrade to PRO
          </ToastAction>
        ),
      });

      setLoading(false);

      return;
    }

      const chatId = uuidv4();

      await setDoc(addChatRef(chatId, session.user.id), {
        userId: session.user.id!,
        email: session.user.email!,
        timestamp: serverTimestamp(),
        isAdmin: true,
        chatId: chatId,
        image: session.user.image || "",
      }).then(() => {
          toast({
            title:"Success",
            description:"Your chat has been created!",
            className: "bg-green-600 text-white",
            duration: 2000,
          });
          router.push(`/chat/${chatId}`);
      }).catch(() => {
        toast({
          title:"Error",
          description:"There was an error creating your chat!",
          variant:"destructive",
        });
      }).finally(() => setLoading(false));
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
    <Button size={"icon"} variant={"ghost"} onClick={createNewChat}>
        {loading ? <LoadingSpinner /> : <MessageSquarePlusIcon />}
    </Button>
  );
};

export default CreateChatButton