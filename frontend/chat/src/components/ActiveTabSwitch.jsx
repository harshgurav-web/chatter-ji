import useChatStore from "../store/ChatStore";

function ActiveTabSwitch() {
    const activeTab = useChatStore(
        (state) => state.activeTab
    );

    const setActiveTab = useChatStore(
        (state) => state.setActiveTab
    );

    return (
        <div className="tabs tabs-boxed bg-transparent p-2 m-2">
            <button
                onClick={() => setActiveTab("chats")}
                className={`tab font-black ${
                    activeTab === "chats"
                        ? "tab-active bg-primary text-primary-content"
                        : ""
                }`}
            >
                Chats
            </button>

            <button
                onClick={() => setActiveTab("contacts")}
                className={`tab font-black ${
                    activeTab === "contacts"
                        ? "tab-active bg-primary text-primary-content"
                        : ""
                }`}
            >
                Contacts
            </button>
        </div>
    );
}

export default ActiveTabSwitch;