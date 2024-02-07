"use client";

import { MessageSquarePlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const CreateChatButton = () => {
    const router = useRouter();

    const createNewChat= async() => {
            //all logic here

        router.push('/chat/abc');
    };

  return (
    <Button variant={"ghost"} onClick={createNewChat}>
        <MessageSquarePlusIcon />
    </Button>
  );
}

export default CreateChatButton