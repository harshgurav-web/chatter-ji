import { Routes, Route, Navigate } from "react-router";

import Chatpage from "./pages/Chatpage";
import Login from "./pages/Loginpage";
import Signup from "./pages/Signuppage";

import useAuthStore from "./store/Zustand";

function App() {
    const user = useAuthStore((state) => state.user);

    return (
        <main className="min-h-screen bg-base-200 flex items-center justify-center p-4">

            <Routes>

                <Route
                    path="/"
                    element={
                        user ? (
                            <Chatpage />
                        ) : (
                            <Navigate to="/signup" replace />
                        )
                    }
                />

                <Route
                    path="/signup"
                    element={<Signup />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

            </Routes>

        </main>
    );
}

export default App;