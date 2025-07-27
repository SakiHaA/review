"use client";

// ReactのHook機能の一つで何かを保持する状態を作る
import { useState } from 'react';
// next.jsに搭載されているHooksの一つであり、インポートのリンクは固定 'next/navigation'
import { useRouter } from 'next/navigation';

export default function AdminLoginForm() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    
    // // React.FormEventは、フォームが送信された時に発生するイベントの型定義です
    // // TypeScriptで型安全性を確保するために使用されています
    const handleSubmit = async (e: React.FormEvent) => {
    //     // e.preventDefault()で　フォームのデフォルトの動作を防止する
    //     // フォームのデフォルトの動作を防止する
        e.preventDefault();
    //     // 新しいログイン試行の前に、古いエラー表示をリセットする処理
        setError('');
    //     // loadingの状態をtrueにする
    //     // ローディング処理中であることを示すローディング状態をOnにする
        setLoading(true);
        
        try {
            console.log('ログインリクエスト送信:', formData);
            const response = await fetch('http://localhost:8080/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message || 'ログインに失敗しました');
                return;
            }

            const data = await response.json();
            console.log('ログインレスポンス:', data);
            localStorage.setItem('token', data.token);
            router.push('/api/admin/home');


        } catch (error) {
            console.error('ログインエラー:', error);
            setError('ログインに失敗しました');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md w-full">
            {error && ( 
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">メールアドレス</label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                        disabled={loading}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">パスワード</label>
                    <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                        disabled={loading}
                    />
                </div>
                <button
                    type="submit"
                    className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                        loading 
                        ? 'bg-indigo-400 cursor-not-allowed' 
                        : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    }`}
                    disabled={loading}
                >
                    {/* {loading ? 'ログイン中...' : 'ログイン'} */}
                    ログイン
                </button>
            </form>
        </div>
    );
}