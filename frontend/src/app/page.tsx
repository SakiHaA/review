'use client';

import Link from 'next/link';
// import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
//   const { user, isAuthenticated } = useAuth();
//   //   push (遷移するため)
//   const router = useRouter();
// // isAuthenticatedでUserAuthの認証を満たしたらhomeに遷移
//   useEffect(() => {
//     if (isAuthenticated) {
//       router.push('/home');
//     }
//     // 依存配列: [isAuthenticated, router]の値が変更された時に再実行
//     // useAuthの中のやつをTrueにしたりFalseにしたりしている
//   }, [isAuthenticated, router]);


return (
    <main className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4 max-w-md">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <p className="text-gray-600 text-center mb-6">
            レビューサイトへようこそ !!
          </p>
          <div className="flex flex-col space-y-4">
            <Link 
              href="/api/user/login"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg text-center hover:bg-blue-600 transition-colors"
            >
              ログイン
            </Link>
            <Link 
              href="/api/user/register"
              className="bg-green-500 text-white py-2 px-4 rounded-lg text-center hover:bg-green-600 transition-colors"
            >
              新規登録
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
} 