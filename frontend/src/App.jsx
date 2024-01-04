import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import RequireAuth from "./components/RequireAuth";
import DashboardPage from "./pages/Dashboard";
import AddUserPage from "./pages/AddUserPage";
import EditUserPage from "./pages/EditUserPage";
import DeleteModal from "./pages/components/DeleteModal";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={<DashboardPage />}>
            <Route path="delete/:id" element={<DeleteModal />} />
          </Route>
          <Route path="/add" element={<AddUserPage />} />
          <Route path="/edit/:id" element={<EditUserPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
