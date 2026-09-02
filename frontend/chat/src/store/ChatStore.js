import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL;

const useChatStore = create((set, get) => ({
    // =========================
    // STATE
    // =========================

    allContacts: [],
    chats: [],
    messages: [],

    activeTab: "chats",
    selectedUser: null,

    isUsersLoading: false,
    isMessagesLoading: false,
    isSendingMessage: false,


    // =========================
    // TAB / USER
    // =========================

    setActiveTab: (tab) => {
        set({ activeTab: tab });
    },

    setSelectedUser: (user) => {
        set({
            selectedUser: user,
            messages: [],
        });
    },


    // =========================
    // GET ALL CONTACTS
    // =========================

    getAllContacts: async () => {
        set({ isUsersLoading: true });

        try {
            const response = await axios.get(
                `${API_URL}/api/messages/contacts`,
                {
                    withCredentials: true,
                }
            );

            set({
                allContacts: response.data,
            });

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to load contacts"
            );

        } finally {
            set({ isUsersLoading: false });
        }
    },


    // =========================
    // GET CHAT PARTNERS
    // =========================

    getMyChatPartners: async () => {
        set({ isUsersLoading: true });

        try {
            const response = await axios.get(
                `${API_URL}/api/messages/partners`,
                {
                    withCredentials: true,
                }
            );

            set({
                chats: response.data,
            });

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to load chats"
            );

        } finally {
            set({ isUsersLoading: false });
        }
    },


    // =========================
    // GET MESSAGES
    // =========================

    getMessagesByUserId: async (userId) => {
        set({ isMessagesLoading: true });

        try {
            const response = await axios.get(
                `${API_URL}/api/messages/chat/${userId}`,
                {
                    withCredentials: true,
                }
            );

            set({
                messages: response.data,
            });

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to load messages"
            );

        } finally {
            set({ isMessagesLoading: false });
        }
    },


    // =========================
    // SEND MESSAGE
    // TEXT + IMAGE
    // =========================

    sendMessage: async ({ text, image }) => {
        const { selectedUser } = get();

        if (!selectedUser) {
            toast.error("Select a contact first");
            return false;
        }

        if (!text?.trim() && !image) {
            return false;
        }

        const formData = new FormData();

        // Add text
        if (text?.trim()) {
            formData.append("text", text.trim());
        }

        // Add actual image File
        if (image instanceof File) {
            formData.append("image", image);
        }

        set({
            isSendingMessage: true,
        });

        try {
            const response = await axios.post(
               `${API_URL}/api/messages/send/${selectedUser._id}`,
                formData,
                {
                    withCredentials: true,
                }
            );

            set((state) => ({
                messages: [
                    ...state.messages,
                    response.data,
                ],
            }));

            return true;

        } catch (error) {
            console.error(
                "Send message error:",
                error
            );

            toast.error(
                error.response?.data?.message ||
                "Failed to send message"
            );

            return false;

        } finally {
            set({
                isSendingMessage: false,
            });
        }
    },
}));

export default useChatStore;