import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Plus, Trash2, Edit, LogOut, BookOpen } from 'lucide-react';

export default function Dashboard() {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [role, setRole] = useState('STUDENT');

    useEffect(() => {
        const savedRole = localStorage.getItem('role');
        if (savedRole) {
            setRole(savedRole);
        } else {
            navigate('/');
            return;
        }

        const fetchCourses = async () => {
            try {
                const res = await axios.get('https://backend-enes.onrender.com/courses');
                const formattedCourses = res.data.map(course => ({
                    id: course.id,
                    title: course.title,
                    category: course.categories && course.categories.length > 0 ? course.categories[0].name : 'Genel',
                    description: course.description,
                    lessons: 0
                }));
                setCourses(formattedCourses);
            } catch (error) {
                console.error("Kurslar yüklenirken hata oluştu:", error);
            }
        };
        fetchCourses();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/');
    };

    const handleDelete = async (courseId) => {
        if (!window.confirm('Bu kursu kalıcı olarak silmek istediğinize emin misiniz?')) {
            return;
        }

        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://localhost:3000/courses/${courseId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setCourses(courses.filter(course => course.id !== courseId));

            alert('Kurs başarıyla silindi.');
        } catch (error) {
            console.error("Silme hatası:", error);
            alert('Kurs silinirken bir hata oluştu.');
        }
    };

    return (
        <div className="w-full max-w-6xl mx-auto p-4">
            <header className="flex flex-col md:flex-row justify-between items-center mb-10 p-6 glass-card rounded-xl">
                <div
                    onClick={() => navigate('/profile')}
                    className="cursor-pointer group mb-4 md:mb-0"
                    title="Profili Görüntüle"
                >
                    <h1 className="text-2xl md:text-4xl font-bold text-white group-hover:text-purple-200 transition-colors">
                        Hoşgeldin, <span className="text-purple-400 underline decoration-transparent group-hover:decoration-purple-400 transition-all">
                {role === 'INSTRUCTOR' ? 'Eğitmen' : 'Öğrenci'}
            </span>

                    </h1>
                    <p className="text-xs text-gray-400 mt-1 group-hover:text-white transition-colors">Profili Düzenle &gt;</p>
                </div>

                <div className="flex gap-4">
                    {role === 'INSTRUCTOR' && (
                        <button
                            onClick={() => navigate('/create-course')}
                            className="btn-primary flex items-center gap-2 text-sm md:text-base"
                        >
                            <Plus size={20} /> <span className="hidden md:inline">Yeni Kurs</span>
                        </button>
                    )}

                    <button onClick={handleLogout} className="bg-red-500/20 hover:bg-red-500/40 text-red-200 border border-red-500/30 px-4 py-2 rounded-lg flex items-center gap-2 transition-all">
                        <LogOut size={20} /> <span className="hidden md:inline">Çıkış</span>
                    </button>
                </div>
            </header>

            {courses.length === 0 ? (
                <div className="text-center text-gray-400 mt-20">
                    <p className="text-xl">Henüz hiç kurs eklenmemiş.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course) => (
                        <div key={course.id} className="glass-card p-6 hover:scale-105 transition-transform duration-300 group flex flex-col justify-between h-full">
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <span className="bg-purple-500/20 text-purple-300 text-xs px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
                                        {course.category}
                                    </span>
                                    {role === 'INSTRUCTOR' && (
                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">

                                            {/* Düzenleme Butonu */}
                                            <button
                                                onClick={() => navigate(`/edit-course/${course.id}`)}
                                                className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/40 transition-colors cursor-pointer"
                                            >
                                                <Edit size={16}/>
                                            </button>

                                            {/* SİLME BUTONU */}
                                            <button
                                                onClick={() => handleDelete(course.id)}
                                                className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/40 transition-colors cursor-pointer"
                                            >
                                                <Trash2 size={16}/>
                                            </button>

                                        </div>
                                    )}
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-white">{course.title}</h3>
                                <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                                    {course.description || "Açıklama bulunmuyor."}
                                </p>
                            </div>

                            <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-gray-400 text-sm">
                                <span className="flex items-center gap-1">
                                    <BookOpen size={16}/> {course.lessons} Ders
                                </span>
                                <button
                                    onClick={() => role === 'INSTRUCTOR' ? navigate(`/edit-course/${course.id}`) : navigate(`/course/${course.id}`)}
                                    className="text-purple-400 hover:text-purple-300 font-semibold transition-colors cursor-pointer"
                                >
                                    {role === 'INSTRUCTOR' ? 'Yönet' : 'İncele ->'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}