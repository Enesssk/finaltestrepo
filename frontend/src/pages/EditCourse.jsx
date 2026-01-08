import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // useParams: URL'deki ID'yi alır
import axios from 'axios';
import { ArrowLeft, Save } from 'lucide-react';

export default function EditCourse() {
    const navigate = useNavigate();
    const { id } = useParams(); // URL'den id'yi yakala (örn: /edit-course/5)

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '' // Kategori gösterimlik kalacak
    });

    // Sayfa açılınca mevcut verileri çek
    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/courses/${id}`);
                const course = res.data;

                setFormData({
                    title: course.title,
                    description: course.description,
                    category: course.categories?.[0]?.name || ''
                });
            } catch (error) {
                console.error("Kurs bilgileri alınamadı", error);
            }
        };
        fetchCourse();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            // PUT isteği ile güncelle
            await axios.put(`http://localhost:3000/courses/${id}`, {
                title: formData.title,
                description: formData.description
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert('Kurs başarıyla güncellendi!');
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            alert('Güncelleme sırasında hata oluştu.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen p-4">
            <div className="glass-card p-8 w-full max-w-2xl">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
                >
                    <ArrowLeft size={20} className="mr-2" /> Dashboard'a Dön
                </button>

                <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                    Kursu Düzenle
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm text-gray-300 mb-2">Kurs Başlığı</label>
                        <input
                            type="text"
                            name="title"
                            className="w-full p-3 bg-slate-800/50 rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none text-white transition-colors"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-300 mb-2">Açıklama</label>
                        <textarea
                            name="description"
                            rows="4"
                            className="w-full p-3 bg-slate-800/50 rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none text-white transition-colors"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Kategori salt okunur (Disable) yaptık çünkü backend güncellemesinde hariç tuttuk */}
                    <div>
                        <label className="block text-sm text-gray-500 mb-2">Kategori (Değiştirilemez)</label>
                        <input
                            type="text"
                            name="category"
                            disabled
                            className="w-full p-3 bg-slate-900/50 rounded-lg border border-slate-800 text-gray-500 cursor-not-allowed"
                            value={formData.category}
                        />
                    </div>

                    <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-lg flex justify-center items-center gap-2 cursor-pointer">
                        <Save size={20} /> Değişiklikleri Kaydet
                    </button>
                </form>
            </div>
        </div>
    );
}