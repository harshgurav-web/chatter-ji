import { useEffect } from "react";
import useChatStore from "../store/ChatStore";
import useAuthStore from "../store/Zustand";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";

function ContactList() {
    const getAllContacts = useChatStore(
        (state) => state.getAllContacts
    );

    const allContacts = useChatStore(
        (state) => state.allContacts
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
        getAllContacts();
    }, [getAllContacts]);

    if (isUsersLoading) {
        return <UsersLoadingSkeleton />;
    }

    if (allContacts.length === 0) {
        return (
            <div className="text-center p-6">
                <p className="font-bold opacity-60">
                    No contacts found
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {allContacts.map((contact) => {
                const isOnline = onlineUsers.includes(
                    contact._id.toString()
                );

                return (
                    <button
                        key={contact._id}
                        onClick={() =>
                            setSelectedUser(contact)
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
                                        contact.profilePicture ||
                                        "/avatar.png"
                                    }
                                    alt={contact.fullname}
                                />
                            </div>
                        </div>

                        <div className="min-w-0">
                            <h4 className="font-black truncate">
                                {contact.fullname}
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

export default ContactList;