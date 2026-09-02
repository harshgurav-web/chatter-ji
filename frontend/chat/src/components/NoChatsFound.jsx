import { MessageCircle } from "lucide-react";

import useChatStore from "../store/ChatStore";

function NoChatsFound() {
    const setActiveTab = useChatStore(
        (state) => state.setActiveTab
    );

    return (
        <div className="text-center py-10 px-4">

            <MessageCircle
                className="mx-auto mb-4"
                size={42}
            />

            <h3 className="font-black">
                NO CONVERSATIONS
            </h3>

            <p className="text-sm opacity-60 mt-2">
                Select someone from your contacts.
            </p>

            <button
                onClick={() => setActiveTab("contacts")}
                className="btn btn-primary btn-sm mt-4 border-2 border-base-content"
            >
                FIND CONTACTS
            </button>

        </div>
    );
}

export default NoChatsFound;