'use client';

// next.jsの機能
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/loginForm';

export default function UserLoginPage() {

return (
    <main className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4 max-w-md">
        <h1 className="text-4xl text-gray-600 text-center mb-12">ログインページ</h1>
        <LoginForm />
      </div>
    </main>
  );
}
    