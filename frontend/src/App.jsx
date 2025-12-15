import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import HomePage from "./pages/HomePage";
import PortfolioPage from "./pages/PortfolioPage";
import UserAuth from "./pages/UserAuth";
import PublicPortfolio from "./pages/PublicPortfolio";


function App() {
  const [user, setUser] = useState(() => {
    // Initialize user from sessionStorage on app load
    const savedUser = sessionStorage.getItem("loggedUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  // Update sessionStorage whenever user changes
  useEffect(() => {
    if (user) {
      sessionStorage.setItem("loggedUser", JSON.stringify(user));
    } else {
      sessionStorage.removeItem("loggedUser");
    }
  }, [user]);

  // Only wrap with GoogleOAuthProvider if Client ID is configured
  const handleLogout = () => {
    setUser(null);
    sessionStorage.removeItem("loggedUser");
  };

  const AppContent = () => (
    <Router>
      <Routes>
        
        <Route path="/" element={<HomePage user={user} onLogin={setUser} onLogout={handleLogout} />} />

        {/* Login */}
        <Route
          path="/login"
          element={
            <UserAuth
              onLogin={(loggedUser) => {
                console.log("Logged In:", loggedUser);
                setUser(loggedUser);
              }}
            />
          }
        />  

        {/* Portfolio Generator */}
        <Route path="/portfolio" element={<PortfolioPage user={user} onLogout={handleLogout} />} />

     
      
      </Routes>
    </Router>
  );

  if (googleClientId) {
    return (
      <GoogleOAuthProvider clientId={googleClientId}>
        <AppContent />
      </GoogleOAuthProvider>
    );
  } else {
    return <AppContent />;
  }
}

export default App;