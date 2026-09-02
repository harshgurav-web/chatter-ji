import { useRef, useState } from "react";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

import useChatStore from "../store/ChatStore";

function MessageInput() {
    const [text, setText] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const fileInputRef = useRef(null);

    const sendMessage = useChatStore(
        (state) => state.sendMessage
    );

    const isSendingMessage = useChatStore(
        (state) => state.isSendingMessage
    );

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image file");
            return;
        }

        // Store ACTUAL FILE for backend
        setImage(file);

        // Store preview separately for UI
        const reader = new FileReader();

        reader.onload = () => {
            setImagePreview(reader.result);
        };

        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        setImage(null);
        setImagePreview(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!text.trim() && !image) {
            return;
        }

        const success = await sendMessage({
            text,
            image,
        });

        if (success) {
            // Clear EVERYTHING after successful send
            setText("");
            removeImage();
        }
    };

    return (
        <div className="p-4 border-t-4 border-base-content bg-base-100">

            {/* IMAGE PREVIEW */}
            {imagePreview && (
                <div className="max-w-3xl mx-auto mb-3">
                    <div className="relative inline-block">

                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-24 h-24 object-cover border-4 border-base-content"
                        />

                        <button
                            type="button"
                            onClick={removeImage}
                            className="absolute -top-3 -right-3 btn btn-error btn-xs btn-circle border-2 border-base-content"
                        >
                            <X size={14} />
                        </button>

                    </div>
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="max-w-3xl mx-auto flex gap-2"
            >

                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type your message..."
                    className="input input-bordered flex-1 border-2 border-base-content"
                />

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                />

                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className={`btn border-2 border-base-content ${image ? "btn-secondary" : "btn-ghost"
                        }`}
                >
                    <Image size={20} />
                </button>

                <button
                    type="submit"
                    disabled={
                        isSendingMessage ||
                        (!text.trim() && !image)
                    }
                    className="btn btn-primary border-2 border-base-content"
                >
                    {isSendingMessage ? (
                        <span className="loading loading-spinner loading-sm" />
                    ) : (
                        <Send size={20} />
                    )}
                </button>

            </form>
        </div>
    );
}

export default MessageInput;