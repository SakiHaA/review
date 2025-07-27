"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UserRegisterForm() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name:'',
        email: '',
        password: ''
    });
    // // エラーを保持する
    // <string>はTypeScriptの型指定で、このステートが文字列型であることを示す
    // ''は初期値で、空文字列を設定
    // useState<型>(初期値);
    // useState<string>('');は明示的に型を指定している
    // useState('')は型推論といい、TypeScriptが型を推論してくれる
    const [error, setError] = useState<string>('');
    // // loadingの状態を保持する
    const [loading, setLoading] = useState(false);
    // // asyncを記載すると非同期関数であることを示す
    // // パラメータeは、フォームのイベントオブジェクトを受け取ります
    // // React.FormEventは、フォームが送信された時に発生するイベントの型定義です
    // // TypeScriptで型安全性を確保するために使用されています
    // awaitは非同期処理を扱うためのJavaScript/TypeScriptのキーワードで、
    // Promiseの結果が返されるまで処理を一時停止する
    const handleSubmit = async (e: React.FormEvent) => {
    //     // e.preventDefault()で　フォームのデフォルトの動作を防止する
    //     // フォームのデフォルトの動作を防止する
        e.preventDefault();
    //     // 新しいログイン試行の前に、古いエラー表示をリセットする処理
        setError('');
    //     // loadingの状態をtrueにする
    //     // ローディング処理中であることを示すローディング状態をOnにする
        setLoading(true);
        // APIリクエストを送信しているところ
        try {
            console.log('送信するデータ:', formData);
            // responseとしなくても任意でOK
            // fetch()はResponseオブジェクトを返す
            // これはfetchAPIのインターフェースの一つ
            const response = await fetch('http://localhost:8080/api/user/register', {
                method: 'POST', // メソッドをPOSTに設定
                headers: { 
                    //リクエストヘッダー
                    // application/jsonは、データをJSON形式で送信することを示す
                    'Content-Type': 'application/json',
                     // フロントエンド側が返してほしいデータの形式を指定
                    'Accept': 'application/json'

                    // Json形式とは
                    // "name": "山田太郎",
                    // "age": 25,
                    // "isActive": true,
                    // "hobbies": ["読書", "旅行", "プログラミング"],
                    // "address": {
                    //     "city": "東京",
                    //     "zipCode": "100-0001"
                    // こういうやつ
                },
                // JSON.stringify()は、JavaScriptのオブジェクトをJSON文字列に変換する関数
                // formDataオブジェクトをHTTPリクエストで送信可能な形式に変換する
                body: JSON.stringify(formData),
                // console.log(jsonString);
                // 結果: '{"name":"山田太郎","email":"yamada@example.com","password":"password123"}'
                // こんな感じで変換される
                // バックエンドのCORS設定でAccess-Control-Allow-Credentials: trueが必要です
                // クッキーの送信設定
                // 1. 'include': 常にCookieを送信
                // credentials: 'include'
                // 2. 'same-origin': 同じオリジンの場合のみCookieを送信
                // credentials: 'same-origin'
                // // 3. 'omit': Cookieを送信しない
                // // credentials: 'omit'
                //  configuration.setAllowCredentials(true);とかもいる
                // credentials: 'include'
            });
            // responseがawait fetch(url);と=になっているからstatusを使用できる
            // statusは404とかのエラーや、200の正しい挙動も表せる
            console.log('Response status:', response.status);

            // response.okはステータスが200-299の時、つまり無事通ったパターンを指す
            if (!response.ok) {
                // response.textでレスポンスをtextで取得する
                const errorText = await response.text();
                console.error('Error response:', errorText);
                // throw new Error()でエラーを投げる
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const text = await response.text();
            console.log('Response text:', text);
            if (!text) {
                throw new Error('サーバーからのレスポンスが空です');
            }
    
            try {
                const data = JSON.parse(text);
                console.log('解析されたデータ:', data);
                router.push('/');
            } catch (parseError) {
                console.error('JSON解析エラー:', parseError);
                throw new Error('サーバーからのレスポンスが不正な形式です');
            }
        } catch (error) {
            console.error('エラーの詳細:', error);
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('登録中にエラーが発生しました。');
            }
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
            {/* onSubmitはフォームが送信される時に行う処理のこと */}
            <form onSubmit = {handleSubmit} className="space-y-4">
                <div>
                    {/* htmlForは入力フィールドとの関連付けを行う */}
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        名前
                    </label>
                    <div className="mt-1">
                        <input
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            // 必須
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                </div>
                <div>
                    <label className="mt-1 block text-sm font-medium text-gray-700">
                        メールアドレス
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"

                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">パスワード</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        required
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                    {loading ? '登録中...' : '登録'}
                    新規登録
                </button>
            </form>
        </div>
    );
}