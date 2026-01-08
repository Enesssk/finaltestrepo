import { useEffect, useState } from 'react';
import { Plus, Trash2, Edit } from 'lucide-react'; // İkonlar için

export default function Dashboard() {
    // Demo veri (Backend'den çekilecek)
    const [courses, setCourses] = useState([
        { id: 1, title: 'React Masterclass', category: 'Yazılım', lessons: 12 },
        { id: 2, title: 'NestJS Advanced', category: 'Backend', lessons: 8 },
    ]);
    const role = "INSTRUCTOR"; // Normalde localStorage'dan gelecek: localStorage.getItem('role')

    return (
        <div className="w-full max-w-6xl">
            <header className="flex justify-between items-center mb-10">
                <h1 className="text-4xl font-bold text-white">
                    Hoşgeldin, <span className="text-purple-400">{role === 'INSTRUCTOR' ? 'Eğitmen' : 'Öğrenci'}</span>
                </h1>
                {role === 'INSTRUCTOR' && (
                    <button className="btn-primary flex items-center gap-2">
                        <Plus size={20} /> Yeni Kurs Ekle
                    </button>
                )}
            </header>

            {/* Kurs Listesi - Grid Tasarım */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                    <div key={course.id} className="glass-card p-6 hover:scale-105 transition-transform duration-300 group">
                        <div className="flex justify-between items-start mb-4">
                <span className="bg-purple-500/20 text-purple-300 text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                    {course.category}
                </span>
                            {role === 'INSTRUCTOR' && (
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/40"><Edit size={16}/></button>
                                    <button className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/40"><Trash2 size={16}/></button>
                                </div>
                            )}
                        </div>
                        <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                        <p className="text-gray-400 text-sm mb-4">{course.lessons} Ders İçeriği</p>

                        <button className="w-full py-2 border border-slate-600 rounded-lg hover:bg-slate-700 transition-colors">
                            {role === 'INSTRUCTOR' ? 'Yönet' : 'Derse Başla'}
                        </button>
                    </div>
                ))}
            </div>

            {/* Buraya N:N ve 1:N ilişkileri yönetmek için (Frontend'den ekleme/silme)
         bir Modal veya Form eklenmelidir[cite: 10, 11].
      */}
        </div>
    );
}