import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // API isteği (Burayı kendi backend portuna göre ayarla)
            // const res = await axios.post('http://localhost:3000/auth/login', { email, password });
            // localStorage.setItem('token', res.data.access_token);
            // localStorage.setItem('role', res.data.role);

            // Demo amaçlı yönlendirme:
            navigate('/dashboard');
        } catch (error) {
            alert('Giriş başarısız!');
        }
    };

    return (
        <div className="glass-card p-8 w-full max-w-md">
            <h2 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                SkillShare Giriş
            </h2>
            <form onSubmit={handleLogin} className="space-y-4">
                <div>
                    <label className="block text-sm text-gray-300 mb-1">Email</label>
                    <input
                        type="email"
                        className="w-full p-3 bg-slate-800/50 rounded-lg border border-slate-700 focus:border-purple-500 focus:outline-none transition-colors"
                        value={email} onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm text-gray-300 mb-1">Şifre</label>
                    <input
                        type="password"
                        className="w-full p-3 bg-slate-800/50 rounded-lg border border-slate-700 focus:border-purple-500 focus:outline-none transition-colors"
                        value={password} onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn-primary w-full mt-4">
                    Giriş Yap
                </button>
            </form>
        </div>
    );
}