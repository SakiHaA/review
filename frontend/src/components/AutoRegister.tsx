// frontend/src/components/AutoRegisterComponent.tsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface AutoRegisterResponse {
    message: string;
    totalMatches: number;
    registeredMatches: number;
}

export default function AutoRegisterComponent() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const router = useRouter();

    const handleAutoRegister = async () => {
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await fetch('http://localhost:8080/api/admin/autoregister', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: AutoRegisterResponse = await response.json();
            setSuccess(`${data.registeredMatches}件の試合を登録しました（全${data.totalMatches}件中）`);
            
            // 3秒後に試合一覧ページにリダイレクト
            setTimeout(() => {
                router.push('/api/admin/matches');
            }, 3000);

        } catch (error) {
            setError('チャンピオンズリーグの試合登録に失敗しました');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">チャンピオンズリーグ自動登録</h2>
            
            <p className="text-gray-600 mb-4">
                外部APIからチャンピオンズリーグの過去の試合データを取得し、データベースに保存します。
            </p>
            
            <button
                onClick={handleAutoRegister}
                disabled={loading}
                className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                {loading ? '登録中...' : 'チャンピオンズリーグの試合を自動登録'}
            </button>
            
            {error && (
                <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            )}
            
            {success && (
                <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                    {success}
                    <br />
                    <span className="text-sm">3秒後に試合一覧ページに移動します...</span>
                </div>
            )}
        </div>
    );
}