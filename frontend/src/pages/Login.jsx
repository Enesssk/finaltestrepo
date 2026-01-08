import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
    // Kullanıcının kayıt ekranında mı giriş ekranında mı olduğunu tutar
    const [isRegister, setIsRegister] = useState(false);

    // Kullanıcının kendi gireceği bilgiler
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('STUDENT'); // Varsayılan rol

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Kayıt ise 'register', giriş ise 'login' endpoint'ine git
        const endpoint = isRegister ? 'register' : 'login';
        const apiBase = 'http://localhost:3000/auth'; // Backend adresi

        try {
            // Backend'e gidecek veriyi hazırla
            const payload = isRegister
                ? { email, password, role } // Kayıtta rol bilgisi de gider
                : { email, password };      // Girişte sadece email ve şifre

            const res = await axios.post(`${apiBase}/${endpoint}`, payload);

            if (isRegister) {
                // Kayıt başarılıysa kullanıcıya bilgi ver ve giriş ekranına döndür
                alert("Kayıt işleminiz başarıyla tamamlandı! Şimdi belirlediğiniz bilgilerle giriş yapabilirsiniz.");
                setIsRegister(false);
            } else {
                // Giriş başarılıysa token'ı kaydet ve panele yönlendir
                localStorage.setItem('token', res.data.access_token);
                localStorage.setItem('role', res.data.role);
                navigate('/dashboard');
            }
        } catch (error) {
            console.error(error);
            alert('İşlem başarısız! Lütfen bilgileri kontrol edin veya Backend sunucusunun çalıştığından emin olun.');
        }
    };

    return (
        <div className="glass-card p-8 w-full max-w-md">
            <h2 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                {isRegister ? 'Yeni Hesap Oluştur' : 'Giriş Yap'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm text-gray-300 mb-1">E-Posta Adresi</label>
                    <input
                        type="email"
                        placeholder="örnek@mail.com"
                        className="w-full p-3 bg-slate-800/50 rounded-lg border border-slate-700 focus:border-purple-500 focus:outline-none transition-colors text-white"
                        value={email} onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm text-gray-300 mb-1">Şifre Belirle</label>
                    <input
                        type="password"
                        placeholder="******"
                        className="w-full p-3 bg-slate-800/50 rounded-lg border border-slate-700 focus:border-purple-500 focus:outline-none transition-colors text-white"
                        value={password} onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {/* Sadece Kayıt Modundaysak ROL sorsun */}
                {isRegister && (
                    <div>
                        <label className="block text-sm text-gray-300 mb-1">Hesap Türü Seçin</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full p-3 bg-slate-800/50 rounded-lg border border-slate-700 focus:border-purple-500 text-white"
                        >
                            <option value="STUDENT">Öğrenci (Ders Almak İstiyorum)</option>
                            <option value="INSTRUCTOR">Eğitmen (Ders Vermek İstiyorum)</option>
                        </select>
                    </div>
                )}

                <button type="submit" className="btn-primary w-full mt-4">
                    {isRegister ? 'Kayıt Ol' : 'Giriş Yap'}
                </button>
            </form>

            {/* Kayıt ve Giriş arasında geçiş yapan kısım */}
            <div className="text-center mt-6 p-4 border-t border-white/10">
                <p className="text-gray-400 text-sm mb-2">
                    {isRegister ? 'Zaten hesabınız var mı?' : 'Henüz hesabınız yok mu?'}
                </p>
                <button
                    onClick={() => setIsRegister(!isRegister)}
                    className="text-purple-400 hover:text-purple-300 font-bold transition-colors border border-purple-500/30 px-4 py-1 rounded-full hover:bg-purple-500/10"
                >
                    {isRegister ? 'Giriş Yapın' : 'Ücretsiz Kayıt Olun'}
                </button>
            </div>
        </div>
    );
}