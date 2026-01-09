import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User, Mail, Shield, Calendar, ArrowLeft, LogOut } from 'lucide-react';

export default function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/');
                return;
            }

            try {
                const res = await axios.get('https://backend-enes.onrender.com/auth/profile', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUser(res.data);
            } catch (error) {
                console.error("Profil yüklenemedi", error);
                localStorage.clear();
                navigate('/');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    if (loading) return <div className="text-white text-center mt-20">Yükleniyor...</div>;
    if (!user) return <div className="text-white text-center mt-20">Kullanıcı bulunamadı.</div>;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">

            {/* Geri Dön */}
            <div className="w-full max-w-md mb-6">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center text-gray-400 hover:text-white transition-colors"
                >
                    <ArrowLeft size={20} className="mr-2" /> Dashboard'a Dön
                </button>
            </div>

            <div className="glass-card w-full max-w-md p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl -mr-10 -mt-10"></div>

                <div className="flex flex-col items-center mb-8">
                    <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg mb-4">
                        <User size={48} className="text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Profilim</h2>
                    <span className="text-gray-400 text-sm">Hesap Detayları</span>
                </div>

                <div className="space-y-4">
                    {/* E-Posta Bilgisi */}
                    <div className="bg-slate-800/50 p-4 rounded-xl flex items-center gap-4 border border-slate-700">
                        <div className="bg-blue-500/20 p-2 rounded-lg text-blue-400">
                            <Mail size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400">E-Posta Adresi</p>
                            <p className="text-white font-medium">{user.email}</p>
                        </div>
                    </div>

                    {/* Rol Bilgisi */}
                    <div className="bg-slate-800/50 p-4 rounded-xl flex items-center gap-4 border border-slate-700">
                        <div className="bg-purple-500/20 p-2 rounded-lg text-purple-400">
                            <Shield size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400">Hesap Türü</p>
                            <p className="text-white font-medium">
                                {user.role === 'INSTRUCTOR' ? 'Eğitmen' : 'Öğrenci'}
                            </p>
                        </div>
                    </div>

                    {/* Kayıt Tarihi */}
                    <div className="bg-slate-800/50 p-4 rounded-xl flex items-center gap-4 border border-slate-700">
                        <div className="bg-green-500/20 p-2 rounded-lg text-green-400">
                            <Calendar size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400">Kayıt Tarihi</p>
                            <p className="text-white font-medium">
                                {new Date(user.createdAt).toLocaleDateString('tr-TR')}
                            </p>
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleLogout}
                    className="w-full mt-8 flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 py-3 rounded-lg transition-all"
                >
                    <LogOut size={18} /> Hesaptan Çıkış Yap
                </button>
            </div>
        </div>
    );
}