import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CreateCourse from './pages/CreateCourse';
import EditCourse from './pages/EditCourse';
import CourseDetails from './pages/CourseDetails'; // <--- EKLENDİ

function App() {
    return (
        <Router>
            <div className="w-full min-h-screen">
                <Routes>
                    <Route path="/" element={<div className="min-h-screen flex items-center justify-center"><Login /></div>} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/create-course" element={<CreateCourse />} />
                    <Route path="/edit-course/:id" element={<EditCourse />} />

                    {/* YENİ ROTA: Öğrenci inceleme sayfası */}
                    <Route path="/course/:id" element={<CourseDetails />} />
                </Routes>
            </div>
        </Router>
    );
}
export default App;