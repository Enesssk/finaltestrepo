import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CreateCourse from './pages/CreateCourse'; // <--- YENİ EKLENDİ

function App() {
    return (
        <Router>
            <div className="w-full min-h-screen">
                <Routes>
                    <Route path="/" element={<div className="min-h-screen flex items-center justify-center"><Login /></div>} />
                    <Route path="/dashboard" element={<Dashboard />} />

                    {/* YENİ ROTA BURAYA EKLENDİ */}
                    <Route path="/create-course" element={<CreateCourse />} />
                </Routes>
            </div>
        </Router>
    );
}
export default App;