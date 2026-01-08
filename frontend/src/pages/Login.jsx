import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AlertCircle, CheckCircle } from 'lucide-react'; // İkonlar eklendi

export default function Login() {
    // Kullanıcının kayıt ekranında mı giriş ekranında mı olduğunu tutar
    const [isRegister, setIsRegister] = useState(false);

    // Kullanıcının kendi gireceği bilgiler
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('STUDENT');

    // Şifre hatasını tutacak state
    const [passwordError, setPasswordError] = useState('');

    const navigate = useNavigate();

    // --- ŞİFRE KONTROL FONKSİYONU ---
    const validatePassword = (pass) => {
        // 1. Uzunluk en az 8 mi?
        if (pass.length < 8) {
            return "Şifre en az 8 karakter olmalı.";
        }
        // 2. Büyük harf var mı?
        if (!/[A-Z]/.test(pass)) {
            return "Şifre en az bir BÜYÜK harf içermeli.";
        }
        // 3. Küçük harf var mı?
        if (!/[a-z]/.test(pass)) {
            return "Şifre en az bir küçük harf içermeli.";
        }
        // 4. Sayı var mı?
        if (!/[0-9]/.test(pass)) {
            return "Şifre en az bir rakam (0-9) içermeli.";
        }
        return ""; // Hata yok
    };

    // Şifre inputu değiştikçe çalışır
    const handlePasswordChange = (e) => {
        const val = e.target.value;
        setPassword(val);

        // Sadece kayıt modundaysak kontrol et
        if (isRegister) {
            setPasswordError(validatePassword(val));
        } else {
            setPasswordError("");
        }
    };

    // Mod değişince (Giriş <-> Kayıt) formu ve hataları temizle
    const toggleMode = () => {
        setIsRegister(!isRegister);
        setPasswordError("");
        setEmail("");
        setPassword("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Eğer Kayıt modundaysak ve şifrede hata varsa dur!
        if (isRegister) {
            const error = validatePassword(password);
            if (error) {
                setPasswordError(error);
                return; // Backend'e gitme
            }
        }

        const endpoint = isRegister ? 'register' : 'login';
        const apiBase = 'http://localhost:3000/auth';

        try {
            const payload = isRegister
                ? { email, password, role }
                : { email, password };

            const res = await axios.post(`${apiBase}/${endpoint}`, payload);

            if (isRegister) {
                alert("Kayıt işleminiz başarıyla tamamlandı! Şimdi giriş yapabilirsiniz.");
                toggleMode(); // Giriş ekranına at
            } else {
                localStorage.setItem('token', res.data.access_token);
                localStorage.setItem('role', res.data.role);
                navigate('/dashboard');
            }
        } catch (error) {
            console.error(error);
            alert('İşlem başarısız! Bilgilerinizi kontrol edin.');
        }
    };

    return (
        <div className="glass-card p-8 w-full max-w-md">
            <h2 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                {isRegister ? 'Güvenli Hesap Oluştur' : 'Giriş Yap'}
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
                    <label className="block text-sm text-gray-300 mb-1">Şifre</label>
                    <input
                        type="password"
                        placeholder="******"
                        className={`w-full p-3 bg-slate-800/50 rounded-lg border ${passwordError ? 'border-red-500' : 'border-slate-700'} focus:outline-none transition-colors text-white`}
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />

                    {/* Hata Mesajı veya Onay Mesajı (Sadece Kayıt Modunda) */}
                    {isRegister && password && (
                        <div className={`text-xs mt-2 flex items-center gap-1 ${passwordError ? 'text-red-400' : 'text-green-400'}`}>
                            {passwordError ? (
                                <>
                                    <AlertCircle size={14} /> {passwordError}
                                </>
                            ) : (
                                <>
                                    <CheckCircle size={14} /> Şifre güvenli
                                </>
                            )}
                        </div>
                    )}
                </div>

                {/* Sadece Kayıt Modundaysak ROL sorsun */}
                {isRegister && (
                    <div>
                        <label className="block text-sm text-gray-300 mb-1">Hesap Türü Seçin</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full p-3 bg-slate-800/50 rounded-lg border border-slate-700 focus:border-purple-500 text-white outline-none"
                        >
                            <option value="STUDENT">Öğrenci (Ders Almak İstiyorum)</option>
                            <option value="INSTRUCTOR">Eğitmen (Ders Vermek İstiyorum)</option>
                        </select>
                    </div>
                )}

                <button
                    type="submit"
                    // Hata varsa butonu pasif yap
                    disabled={isRegister && passwordError !== ""}
                    className={`w-full mt-4 font-bold py-2 px-6 rounded-lg transition-all shadow-lg 
                        ${(isRegister && passwordError)
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white cursor-pointer hover:shadow-indigo-500/30'}`}
                >
                    {isRegister ? 'Kayıt Ol' : 'Giriş Yap'}
                </button>
            </form>

            <div className="text-center mt-6 p-4 border-t border-white/10">
                <p className="text-gray-400 text-sm mb-2">
                    {isRegister ? 'Zaten hesabınız var mı?' : 'Henüz hesabınız yok mu?'}
                </p>
                <button
                    onClick={toggleMode}
                    className="text-purple-400 hover:text-purple-300 font-bold transition-colors border border-purple-500/30 px-4 py-1 rounded-full hover:bg-purple-500/10 cursor-pointer"
                >
                    {isRegister ? 'Giriş Yapın' : 'Ücretsiz Kayıt Olun'}
                </button>
            </div>
        </div>
    );
}