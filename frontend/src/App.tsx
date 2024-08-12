import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "@/pages/LoginPage";
import HomePage from "@/pages/HomePage";
import UserExperimentPage from "@/pages/UserExperimentPage";
import ThankYouPage from "@/pages/ThankYouPage";
import { AuthProvider } from "@/context/AuthContext";
import { ExperimentProvider } from "@/context/ExperimentContext";
import DashboardPage from "@/pages/DashboardPage";
import UsersPage from "@/pages/UsersPage";
import ExperimentsPage from "@/pages/ExperimentsPage";
import ExperimentPage from "@/pages/ExperimentPage";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/experiment"
            element={<ExperimentProvider children={<UserExperimentPage />} />}
          />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/experiments" element={<ExperimentsPage />} />
          <Route
            path="/experiments/:experimentId"
            element={<ExperimentPage />}
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
