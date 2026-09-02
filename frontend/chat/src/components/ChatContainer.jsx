import { useEffect, useRef } from "react";

import useAuthStore from "../store/Zustand";
import useChatStore from "../store/ChatStore";

import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";

function ChatContainer() {
    const selectedUser = useChatStore(
        (state) => state.selectedUser
    );

    const getMessagesByUserId = useChatStore(
        (state) => state.getMessagesByUserId
    );

    const messages = useChatStore(
        (state) => state.messages
    );

    const isMessagesLoading = useChatStore(
        (state) => state.isMessagesLoading
    );

    const user = useAuthStore(
        (state) => state.user
    );

    const messageEndRef = useRef(null);

    useEffect(() => {
        if (!selectedUser) {
            return;
        }

        getMessagesByUserId(selectedUser._id);
    }, [selectedUser, getMessagesByUserId]);

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages]);

    if (!selectedUser) {
        return null;
    }

    return (
        <>
            <ChatHeader />

            <div className="flex-1 px-6 overflow-y-auto py-8">
                {isMessagesLoading ? (
                    <MessagesLoadingSkeleton />
                ) : messages.length > 0 ? (
                    <div className="max-w-3xl mx-auto space-y-6">
                        {messages.map((message) => {
                            const isMine =
                                message.senderId.toString() ===
                                user?._id.toString();

                            return (
                                <div
                                    key={message._id}
                                    className={`chat ${
                                        isMine
                                            ? "chat-end"
                                            : "chat-start"
                                    }`}
                                >
                                    <div
                                        className={`chat-bubble ${
                                            isMine
                                                ? "bg-primary text-primary-content"
                                                : "bg-base-300 text-base-content"
                                        }`}
                                    >
                                        {message.image && (
                                            <img
                                                src={message.image}
                                                alt="Shared"
                                                className="rounded-lg max-h-64 object-cover"
                                            />
                                        )}

                                        {message.text && (
                                            <p className="mt-2">
                                                {message.text}
                                            </p>
                                        )}

                                        <p className="text-xs mt-1 opacity-60">
                                            {new Date(
                                                message.createdAt
                                            ).toLocaleTimeString(
                                                [],
                                                {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                }
                                            )}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}

                        <div ref={messageEndRef} />
                    </div>
                ) : (
                    <NoChatHistoryPlaceholder
                        name={selectedUser.fullname}
                    />
                )}
            </div>

            <MessageInput />
        </>
    );
}

export default ChatContainer;