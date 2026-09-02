import { MessageCircle } from "lucide-react";

function NoChatHistoryPlaceholder({ name }) {
    return (
        <div className="h-full flex items-center justify-center text-center p-6">

            <div className="max-w-md">

                <div className="mx-auto mb-5 flex items-center justify-center w-20 h-20 rounded-full bg-primary border-4 border-base-content">
                    <MessageCircle size={38} />
                </div>

                <h2 className="text-2xl font-black uppercase">
                    Start Conversation
                </h2>

                <p className="mt-3 opacity-70">
                    This is the beginning of your conversation
                    with{" "}
                    <span className="font-black">
                        {name}
                    </span>.
                </p>

                <div className="flex flex-wrap justify-center gap-2 mt-5">
                    <span className="badge badge-primary">
                        👋 Say Hello
                    </span>

                    <span className="badge badge-secondary">
                        🤝 How are you?
                    </span>

                    <span className="badge">
                        📅 Meet soon?
                    </span>
                </div>

            </div>

        </div>
    );
}

export default NoChatHistoryPlaceholder;