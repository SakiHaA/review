'use client';

import UserRegisterForm from '@/components/UserRegisterForm';

export default function RegisterPage() {
    return (
        <main className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4 max-w-md">
        <h1 className="text-4xl text-gray-600 text-center mb-12">新規登録</h1>
          <UserRegisterForm />
      </div>
    </main>
    );
} 