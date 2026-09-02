import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const API_URL = import.meta.env.VITE_API_URL;

const useAuthStore = create((set, get) => ({
    user: null,
    isLoading: false,
    error: null,

    // Socket.IO
    socket: null,
    onlineUsers: [],

    setUser: (user) => set({ user }),

    signup: async (fullname, email, password) => {
        set({ isLoading: true, error: null });

        try {
            const response = await axios.post(
                `${API_URL}/api/auth/register`,
                {
                    fullname,
                    email,
                    password,
                },
                {
                    withCredentials: true,
                }
            );

            set({
                user: response.data.user,
                isLoading: false,
            });

            return true;
        } catch (error) {
            set({
                isLoading: false,
                error:
                    error.response?.data?.message ||
                    "Signup failed",
            });

            return false;
        }
    },

    login: async (email, password) => {
        set({ isLoading: true, error: null });

        try {
            const response = await axios.post(
                `${API_URL}/api/auth/login`,
                {
                    email,
                    password,
                },
                {
                    withCredentials: true,
                }
            );

            set({
                user: response.data.isUserExist,
                isLoading: false,
            });

            return true;
        } catch (error) {
            set({
                isLoading: false,
                error:
                    error.response?.data?.message ||
                    "Login failed",
            });

            return false;
        }
    },

    logout: async () => {
        set({ isLoading: true });

        try {
            await axios.post(
                `${API_URL}/api/auth/logout`,
                {},
                {
                    withCredentials: true,
                }
            );

            // Disconnect Socket.IO
            const socket = get().socket;

            if (socket) {
                socket.disconnect();
            }

            set({
                user: null,
                isLoading: false,
                error: null,
                socket: null,
                onlineUsers: [],
            });

            return true;
        } catch (error) {
            set({
                isLoading: false,
                error:
                    error.response?.data?.message ||
                    "Logout failed",
            });

            return false;
        }
    },

    updateProfile: async (image) => {
        set({ isLoading: true, error: null });

        try {
            const formData = new FormData();

            formData.append("image", image);

            const response = await axios.put(
                `${API_URL}/api/auth/profile`,
                formData,
                {
                    withCredentials: true,
                }
            );

            set({
                user: response.data.user,
                isLoading: false,
            });

            toast.success("Profile picture updated!");

            return true;
        } catch (error) {
            set({
                isLoading: false,
                error:
                    error.response?.data?.message ||
                    "Profile update failed",
            });

            toast.error(
                error.response?.data?.message ||
                    "Profile update failed"
            );

            return false;
        }
    },

    // =========================
    // SOCKET.IO
    // =========================

    connectSocket: () => {
        const { user, socket } = get();

        // Don't create another socket if already connected
        if (!user || socket?.connected) {
            return;
        }

        const newSocket = io(API_URL, {
            withCredentials: true,
        });

        newSocket.on("connect", () => {
            console.log("Socket connected:", newSocket.id);
        });

        newSocket.on("connect_error", (error) => {
            console.error(
                "Socket connection error:",
                error.message
            );
        });

        newSocket.on("getOnlineUsers", (userIds) => {
            set({
                onlineUsers: userIds.map((id) =>
                    id.toString()
                ),
            });
        });

        newSocket.on("disconnect", () => {
            console.log("Socket disconnected");
        });

        set({
            socket: newSocket,
        });
    },

    disconnectSocket: () => {
        const socket = get().socket;

        if (socket) {
            socket.disconnect();
        }

        set({
            socket: null,
            onlineUsers: [],
        });
    },
}));

export default useAuthStore;