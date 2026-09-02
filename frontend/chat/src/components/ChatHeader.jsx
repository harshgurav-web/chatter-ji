import useChatStore from "../store/ChatStore";
import useAuthStore from "../store/Zustand";

function ChatHeader() {
    const selectedUser = useChatStore(
        (state) => state.selectedUser
    );

    const onlineUsers = useAuthStore(
        (state) => state.onlineUsers
    );

    if (!selectedUser) {
        return null;
    }

    const isOnline = onlineUsers.includes(
        selectedUser._id.toString()
    );

    return (
        <div className="h-20 px-5 flex items-center gap-3 bg-base-100 border-b-4 border-base-content">
            <div
                className={`avatar ${
                    isOnline ? "online" : "offline"
                }`}
            >
                <div className="w-12 rounded-full border-2 border-base-content">
                    <img
                        src={
                            selectedUser.profilePicture ||
                            "/avatar.png"
                        }
                        alt={selectedUser.fullname}
                    />
                </div>
            </div>

            <div>
                <h3 className="font-black text-lg">
                    {selectedUser.fullname}
                </h3>

                <p className="text-xs font-bold opacity-60">
                    {isOnline ? "Online" : "Offline"}
                </p>
            </div>
        </div>
    );
}

export default ChatHeader;