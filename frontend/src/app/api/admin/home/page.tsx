"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminHomePage() {
    const router = useRouter();
    const [matches, setMatches] = useState([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [dateFrom, setDateFrom] = useState<string>('');

    const handleLogout = async() => { 
        const token = localStorage.getItem('token');
        try {
            console.log('ログアウトリクエスト開始');  // デバッグ用
            const response = await fetch('http://localhost:8080/api/admin/logout', {
                method: 'POST',
                headers: {
                    
                    'Content-Type': 'application/json', 
                    'Authorization': `Bearer ${token}`
                    // あってもなくても変換時にJsonを指定している場合は不要となるらしい
                    // 'Accept': 'application/json',
                   
                }
            }
        );

        // レスポンスの処理を追加
        if (!response.ok) {
            throw new Error('ログアウトに失敗しました');
        }
    // 2, フロントエンド側でtokenを削除
        localStorage.removeItem('token');
            router.push('/api/admin/login');
        } catch (error) {
            console.error('ログアウトエラー:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* ヘッダー */}
            <header className="bg-white shadow">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-gray-800">レビューサイト</h1>
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-600">
                                管理者
                            </span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                            >
                                ログアウト
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* メインコンテンツ */}
            <main className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* 試合一覧に遷移する*/}
                    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                        <Link href="/api/admin/matches" className="block">
                            <h2 className="text-xl text-black font-semibold mb-4">試合一覧を見る</h2>
                            <p className="text-gray-600">
                               過去の試合について、皆さんの意見を見てみましょう。
                            </p>
                        </Link>
                    </div>

                    {/* レビュー一覧カード  */}
                    {/* <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                        <Link href="/api/admin/matchregister" className="block">
                            <h2 className="text-xl text-black font-semibold mb-4">レビュー登録</h2>
                            <p className="text-gray-600">
                                試合を登録することができます。
                            </p>
                        </Link>
                    </div> */}
                    

                    {/* レビュー一覧カード  */}
                    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                        <Link href="/api/admin/autoregister" className="block">
                            <h2 className="text-xl text-black font-semibold mb-4">レビュー登録</h2>
                            <p className="text-gray-600">
                                (外部APIから)過去の試合を自動取得できます。
                            </p>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}