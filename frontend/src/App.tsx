import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from '@/pages/HomePage'
import LoginPage from '@/pages/LoginPage'
import { AuthProvider } from '@/context/AuthContext'
import InstructionsPage from '@/pages/InstructionPage'
import DashboardPage from '@/pages/DashboardPage'
import UsersPage from '@/pages/UsersPage'
import ExperimentPage from '@/pages/ExperimentPage'
import ThankyouPage from './pages/ThankyouPage'

export default function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route
                        path="/instructions"
                        element={<InstructionsPage />}
                    />
                    <Route path="/thank-you" element={<ThankyouPage />} />
                    <Route path="/experiment" element={<ExperimentPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/users" element={<UsersPage />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}
