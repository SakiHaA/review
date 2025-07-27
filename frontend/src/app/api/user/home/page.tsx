"use client";

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function HomePage() {
    
    const router = useRouter();

    // セキュリティ面の強化版のログアウト処理
    // 1, バックエンド側にリクエストを送信して無効化(ブラックリストに入れる形で)
    const handleLogout = async() => { 
        const token = localStorage.getItem('token');
        try {
            console.log('ログアウトリクエスト開始');  // デバッグ用
            const response = await fetch('http://localhost:8080/api/user/logout', {
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
            router.push('/');
        } catch (error) {
            console.error('ログアウトエラー:', error);
        }
    };

    // フロントエンド側でtokenを削除してログアウトするのみの場合の処理
    // const handleLogout = async() => { 
    //     try {
    //         localStorage.removeItem('token');
    //         router.push('/');
    //     } catch (error) { 
    //         console.error('ログアウトエラー:', error);
    //     }
    // };
    
    return (
        <div className="min-h-screen bg-gray-100">
            {/* ヘッダー */}
            <header className="bg-white shadow">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-gray-800">レビューサイト</h1>
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-600">
                                {/* {user?.name}さん */}
                                ユーザーさん
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
                        <Link href="/api/user/matches" className="block">
                            <h2 className="text-xl text-black font-semibold mb-4">試合一覧を見る</h2>
                            <p className="text-gray-600">
                               過去の試合について、皆さんの意見を見てみましょう。
                            </p>
                        </Link>
                    </div>

                    

                    {/* マイページカード */}
                    {/* <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                        <Link href="/profile" className="block">
                            <h2 className="text-xl font-semibold mb-4">マイページ</h2>
                            <p className="text-gray-600">
                                プロフィールの編集や投稿したレビューの管理ができます。
                            </p>
                        </Link>
                    </div> */}
                </div>

                {/* 最近のレビュー */}
                {/* <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-6">最近のレビュー</h2>
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <p className="text-gray-600">
                            まだレビューがありません。最初のレビューを投稿してみましょう！
                        </p>
                    </div> */}
                {/* </div> */}
            </main>

            {/* フッター */}
            {/* <footer className="bg-gray-800 text-white mt-12">
                <div className="container mx-auto px-4 py-6">
                    <p className="text-center">
                        © 2024 レビューサイト All rights reserved.
                    </p>
                </div>
            </footer> */}
        </div>
    );
}