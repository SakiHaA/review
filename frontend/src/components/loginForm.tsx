"use client";

// ReactのHook機能の一つで何かを保持する状態を作る
// ログインしたユーザーの情報を保持する
import { useState, useEffect } from 'react';
// Userの型を定義しているインターフェースがあり、そこをインポートして持ってきている
// import { LoginRequest } from '../../types/auth';
// next.jsに搭載されているHooksの一つであり、インポートのリンクは固定 'next/navigation'
import { useRouter } from 'next/navigation';
// propの経由を楽にしてくれる userContext機能を記載したAuthContextから取り出している

export default function LoginForm() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState<String | null>(null);

    const [formData, setFormData] = useState({
        // フォームの内容にリンクしているのでnameを追加する場合は
        // フォームに名前(name)の項目を追加すればいい
        email: '',
        password: ''
    });

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // ここは状態管理に必要
    // 管理者側では遷移のみ実装することにする
    // useEffect(() => {
    // if (isAuthenticated) {
    //   router.push('/api/user/home');
    // }
    // 依存配列: [isAuthenticated, router]の値が変更された時に再実行
    // useAuthの中のやつをTrueにしたりFalseにしたりしている
    // }, [isAuthenticated, router]);
    // 　push して遷移するときに使う(next.jsのページ遷移につかう)

    
    // ユーザーの方を指定しているLoginRequest型を<>(ジェネリック型)で指定している
    // formDataが現在の状態, setFormDataが状態を更新する時の値
    // });
    // // エラーを保持する
    
    // // asyncを記載すると非同期関数であることを示す
    // // パラメータeは、フォームのイベントオブジェクトを受け取ります
    // // React.FormEventは、フォームが送信された時に発生するイベントの型定義です
    // // TypeScriptで型安全性を確保するために使用されています
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        // フォームのデフォルトの動作を防止する
        // 新しいログイン試行の前に、古いエラー表示をリセットする処理
        setError(null);
        setLoading(true);
       
        try {
            console.log('ログインリクエスト送信:', formData);
            // HTTPリクエストを送信するためのfetch関数を使用している
            const response = await fetch('http://localhost:8080/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Json形式でレスポンスを返すことを期待していることを表す
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData),
                // セッションやクッキーを使用する際に必要な記載
                // credentials: 'include'
            });

            console.log('Response status:', response.status);

        

            // ここからがHTTPレスポンスされたJsonの処理
            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message || 'ログインに失敗しました');
                return;
            }

            const data = await response.json();
            console.log('ログインレスポンス:', data); 
            // data = { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }
            console.log('ログインレスポンス:', data.token); 
            localStorage.setItem('token', data.token);
            // ログアウト時には
            // localStorage.setItem('token', data.token);
            // でトークンを取り出して削除ないしはブラックリストに送り、ログアウトの状態を作る
            router.push('/api/user/home');

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