import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Save } from 'lucide-react';

export default function CreateCourse() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        if (!token) {
            alert('Oturum süreniz dolmuş, lütfen tekrar giriş yapın.');
            navigate('/');
            return;
        }

        try {
            // Backend'deki create metoduna istek atıyoruz
            await axios.post('http://localhost:3000/courses', formData, {
                headers: {
                    Authorization: `Bearer ${token}` // Backend @UseGuards(AuthGuard('jwt')) kullandığı için bu zorunlu
                }
            });

            alert('Kurs başarıyla oluşturuldu!');
            navigate('/dashboard'); // İşlem bitince dashboard'a dön
        } catch (error) {
            console.error(error);
            alert('Kurs eklenirken bir hata oluştu.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen p-4">
            <div className="glass-card p-8 w-full max-w-2xl">

                {/* Geri Dön Butonu */}
                <button
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
                >
                    <ArrowLeft size={20} className="mr-2" /> Dashboard'a Dön
                </button>

                <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                    Yeni Kurs Oluştur
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm text-gray-300 mb-2">Kurs Başlığı</label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Örn: React ile Sıfırdan İleri Seviyeye"
                            className="w-full p-3 bg-slate-800/50 rounded-lg border border-slate-700 focus:border-purple-500 focus:outline-none text-white transition-colors"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-300 mb-2">Açıklama</label>
                        <textarea
                            name="description"
                            placeholder="Kurs içeriğinden kısaca bahsedin..."
                            rows="4"
                            className="w-full p-3 bg-slate-800/50 rounded-lg border border-slate-700 focus:border-purple-500 focus:outline-none text-white transition-colors"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-300 mb-2">Kategori</label>
                        <input
                            type="text"
                            name="category"
                            placeholder="Örn: Yazılım, Tasarım, Pazarlama"
                            className="w-full p-3 bg-slate-800/50 rounded-lg border border-slate-700 focus:border-purple-500 focus:outline-none text-white transition-colors"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="btn-primary w-full flex justify-center items-center gap-2">
                        <Save size={20} /> Kaydet ve Yayınla
                    </button>
                </form>
            </div>
        </div>
    );
}