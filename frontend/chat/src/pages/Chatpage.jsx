import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";

import useChatStore from "../store/ChatStore";

function Chatpage() {
    const activeTab = useChatStore(
        (state) => state.activeTab
    );

    const selectedUser = useChatStore(
        (state) => state.selectedUser
    );

    return (
        <div className="w-full max-w-6xl h-[800px]">

            <div className="h-full flex bg-base-100 border-4 border-base-content shadow-[10px_10px_0px_0px]">

                {/* SIDEBAR */}
                <aside className="w-80 flex flex-col border-r-4 border-base-content">

                    <ProfileHeader />

                    <ActiveTabSwitch />

                    <div className="flex-1 overflow-y-auto p-4">

                        {activeTab === "chats" ? (
                            <ChatsList />
                        ) : (
                            <ContactList />
                        )}

                    </div>

                </aside>

                {/* CHAT AREA */}
                <main className="flex-1 min-w-0 bg-base-200">

                    {selectedUser ? (
                        <ChatContainer />
                    ) : (
                        <NoConversationPlaceholder />
                    )}

                </main>

            </div>

        </div>
    );
}

export default Chatpage;