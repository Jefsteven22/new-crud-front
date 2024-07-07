import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import UserProfile from "./components/UserProfile";
import { useState } from "react";
import RouteProtect from "./components/RouteProtect";
import RecoverPassword from "./components/RecoverPassword";

function App() {
  const [handleLogin, setHandleLogin] = useState(null);
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={<Login setHandleLogin={setHandleLogin} />}
        />
        <Route
          path="/"
          element={
            <RouteProtect handleLogin={handleLogin}>
              <UserProfile handleLogin={handleLogin} />
            </RouteProtect>
          }
        />
        <Route path="/recover" element={<RecoverPassword />} />
      </Routes>
    </>
  );
}

export default App;
