import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, BookOpen, Clock, Star, PlayCircle, AlertCircle } from 'lucide-react';

export default function CourseDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Hata durumu eklendi

    useEffect(() => {
        // ID kontrolü
        if (!id || id === 'undefined') {
            setError("Geçersiz Kurs ID'si!");
            setLoading(false);
            return;
        }

        const fetchCourseDetail = async () => {
            try {
                console.log("İstek atılıyor: ", `https://backend-enes.onrender.com/courses/${id}`);
                const res = await axios.get(`https://backend-enes.onrender.com/${id}`);

                if (!res.data) {
                    setError("Kurs verisi boş döndü!");
                } else {
                    setCourse(res.data);
                }
            } catch (err) {
                console.error("Hata Detayı:", err);
                setError("Sunucuya bağlanılamadı veya kurs bulunamadı.");
            } finally {
                setLoading(false);
            }
        };
        fetchCourseDetail();
    }, [id]);

    // YÜKLENİYORSA
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    // HATA VARSA
    if (error || !course) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-white p-4">
                <AlertCircle size={64} className="text-red-500 mb-4" />
                <h2 className="text-2xl font-bold mb-2">Bir Hata Oluştu</h2>
                <p className="text-gray-400 mb-6">{error || "Kurs bulunamadı."}</p>
                <button onClick={() => navigate('/dashboard')} className="btn-primary">
                    Dashboard'a Dön
                </button>
            </div>
        );
    }

    // VERİ GELDİYSE SAYFAYI GÖSTER
    const categoryName = course.categories && course.categories.length > 0
        ? course.categories[0].name
        : 'Genel';

    return (
        <div className="w-full min-h-screen p-6 flex justify-center">
            <div className="w-full max-w-5xl">

                <button
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center text-gray-400 hover:text-white mb-6 transition-colors cursor-pointer"
                >
                    <ArrowLeft size={20} className="mr-2" /> Kurslara Dön
                </button>

                {/* Banner */}
                <div className="glass-card p-8 md:p-12 mb-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                    <span className="inline-block bg-purple-500/20 text-purple-300 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider mb-4 border border-purple-500/30">
                        {categoryName}
                    </span>

                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                        {course.title}
                    </h1>

                    <div className="flex flex-wrap gap-6 text-gray-300 text-sm md:text-base mb-8">
                        <div className="flex items-center gap-2">
                            <BookOpen size={18} className="text-blue-400"/>
                            <span>12 Ders</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock size={18} className="text-green-400"/>
                            <span>14 Saat</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Star size={18} className="text-yellow-400"/>
                            <span>4.8</span>
                        </div>
                    </div>

                    <button className="bg-white text-purple-900 hover:bg-gray-100 font-bold py-3 px-8 rounded-full transition-all flex items-center gap-2 shadow-lg hover:scale-105 cursor-pointer">
                        <PlayCircle size={24} /> Derse Şimdi Başla
                    </button>
                </div>

                {/* İçerik */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 glass-card p-8">
                        <h3 className="text-2xl font-bold text-white mb-4">Kurs Hakkında</h3>
                        <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                            {course.description || "Açıklama girilmemiş."}
                        </p>
                    </div>

                    <div className="glass-card p-6 h-fit">
                        <h3 className="text-xl font-bold text-white mb-4">Ders İçeriği</h3>
                        <div className="space-y-3">
                            <div className="p-3 bg-white/5 rounded text-gray-400 text-sm">
                                Ders içerikleri yakında eklenecek...
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}