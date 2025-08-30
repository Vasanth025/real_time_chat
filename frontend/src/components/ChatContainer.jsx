import React from 'react'
import { usechatStore } from '../store/useChatStore'
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import MessageSkeleton from '../skeletons/MessageSkeleton';
import { useAuthStore } from '../store/useAuthStore';

const ChatContainer = () => {

    const {messaages, getMessages,selectedUser, isMessagesLoading, subscribeToNewMessages, unsubscribeFromNewMessages} = usechatStore();
    const {authUser} = useAuthStore();
    const messageEndRef = React.useRef(null);

    React.useEffect(()=>{
        getMessages(selectedUser._id);
        subscribeToNewMessages();
        return ()=>{
            unsubscribeFromNewMessages();
        }
    },[selectedUser._id, getMessages, subscribeToNewMessages, unsubscribeFromNewMessages]);

    React.useEffect(()=>{
        if(messageEndRef.current && messaages.length){
            messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    },[messaages])

    if(isMessagesLoading) return (
        <div className='flex-1 flex flex-col overflow-auto' >
            <ChatHeader />
            <MessageSkeleton />
            <MessageInput />
        </div>
    )

    function formatMessageTime(date) {
        return new Date(date).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });
    }


  return (
    <div className='flex-1 flex flex-col overflow-auto'>
        <ChatHeader />
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messaages?.map((message) => (
            <div
                key={message._id}
                className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
                ref={messageEndRef}
            >
                <div className=" chat-image avatar">
                <div className="size-10 rounded-full border">
                    <img
                    src={
                        message.senderId === authUser._id
                        ? authUser.profilePic || "/avatar.png"
                        : selectedUser.profilePic || "/avatar.png"
                    }
                    alt="profile pic"
                    />
                </div>
                </div>
                <div className="chat-header mb-1">
                <time className="text-xs opacity-50 ml-1">
                    {formatMessageTime(message.createdAt)}
                </time>
                </div>
                <div className="chat-bubble flex flex-col">
                {message.image && (
                    <img
                    src={message.image}
                    alt="Attachment"
                    className="sm:max-w-[200px] rounded-md mb-2"
                    />
                )}
                {message.text && <p>{message.text}</p>}
                </div>
            </div>
            ))}
            </div>
        <MessageInput />
    </div>
  )
}

export default ChatContainer