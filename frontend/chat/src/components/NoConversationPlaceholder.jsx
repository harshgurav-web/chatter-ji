import { MessageCircle } from "lucide-react";

function NoConversationPlaceholder() {
    return (
        <div className="h-full flex items-center justify-center text-center p-6">

            <div className="max-w-md">

                <div className="mx-auto mb-6 flex items-center justify-center w-24 h-24 rounded-full bg-primary border-4 border-base-content">
                    <MessageCircle size={45} />
                </div>

                <h2 className="text-3xl font-black uppercase">
                    Select a Conversation
                </h2>

                <p className="mt-3 opacity-60">
                    Choose a contact from the sidebar to
                    start chatting.
                </p>

            </div>

        </div>
    );
}

export default NoConversationPlaceholder;