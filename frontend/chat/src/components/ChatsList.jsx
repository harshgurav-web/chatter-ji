import { useEffect } from "react";
import useChatStore from "../store/ChatStore";
import useAuthStore from "../store/Zustand";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";

function ChatsList() {
    const getMyChatPartners = useChatStore(
        (state) => state.getMyChatPartners
    );

    const chats = useChatStore(
        (state) => state.chats
    );

    const setSelectedUser = useChatStore(
        (state) => state.setSelectedUser
    );

    const isUsersLoading = useChatStore(
        (state) => state.isUsersLoading
    );

    const onlineUsers = useAuthStore(
        (state) => state.onlineUsers
    );

    useEffect(() => {
        getMyChatPartners();
    }, [getMyChatPartners]);

    if (isUsersLoading) {
        return <UsersLoadingSkeleton />;
    }

    if (chats.length === 0) {
        return <NoChatsFound />;
    }

    return (
        <div className="space-y-3">
            {chats.map((chat) => {
                const isOnline = onlineUsers.includes(
                    chat._id.toString()
                );

                return (
                    <button
                        key={chat._id}
                        onClick={() =>
                            setSelectedUser(chat)
                        }
                        className="w-full flex items-center gap-3 p-3 bg-base-200 border-2 border-base-content text-left hover:bg-primary hover:text-primary-content transition-all"
                    >
                        <div
                            className={`avatar ${
                                isOnline
                                    ? "online"
                                    : "offline"
                            }`}
                        >
                            <div className="w-12 rounded-full border-2 border-base-content">
                                <img
                                    src={
                                        chat.profilePicture ||
                                        "/avatar.png"
                                    }
                                    alt={chat.fullname}
                                />
                            </div>
                        </div>

                        <div className="min-w-0">
                            <h4 className="font-black truncate">
                                {chat.fullname}
                            </h4>

                            <p className="text-xs font-bold opacity-60">
                                {isOnline
                                    ? "Online"
                                    : "Offline"}
                            </p>
                        </div>
                    </button>
                );
            })}
        </div>
    );
}

export default ChatsList;