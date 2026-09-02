import { useRef } from "react";
import {
    LogOut,
    Volume2,
    VolumeX,
    Camera
} from "lucide-react";
import toast from "react-hot-toast";

import useAuthStore from "../store/Zustand";
import useChatStore from "../store/ChatStore";

function ProfileHeader() {
    const { user, logout, updateProfile } = useAuthStore();

    const {
        isSoundEnabled,
        toggleSound
    } = useChatStore();

    const fileInputRef = useRef(null);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image");
            return;
        }

        await updateProfile(file);

        e.target.value = "";
    };

    const handleLogout = async () => {
        const success = await logout();

        if (success) {
            toast.success("Logged out successfully");
        }
    };

    return (
        <div className="p-5 border-b-4 border-base-content">

            <div className="flex items-center justify-between">

                {/* PROFILE */}
                <div className="flex items-center gap-3">

                    <div className="relative">

                        <button
                            type="button"
                            onClick={() =>
                                fileInputRef.current.click()
                            }
                            className="avatar"
                        >
                            <div className="w-14 rounded-full border-4 border-base-content">
                                <img
                                    src={
                                        user?.profilePicture ||
                                        "/avatar.png"
                                    }
                                    alt="Profile"
                                />
                            </div>
                        </button>

                        <div className="absolute -bottom-1 -right-1 bg-primary border-2 border-base-content rounded-full p-1">
                            <Camera size={13} />
                        </div>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                        />

                    </div>

                    <div>
                        <h3 className="font-black text-base-content truncate max-w-36">
                            {user?.fullname}
                        </h3>

                        <p className="text-xs opacity-60">
                            Online
                        </p>
                    </div>

                </div>

                {/* ACTIONS */}
                <div className="flex items-center gap-2">

                    <button
                        type="button"
                        onClick={toggleSound}
                        className="btn btn-ghost btn-sm btn-square"
                    >
                        {isSoundEnabled ? (
                            <Volume2 size={20} />
                        ) : (
                            <VolumeX size={20} />
                        )}
                    </button>

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="btn btn-ghost btn-sm btn-square text-error"
                    >
                        <LogOut size={20} />
                    </button>

                </div>

            </div>
        </div>
    );
}

export default ProfileHeader;                   