'use client';

import AdminRegisterForm from '@/components/AdminRegisterForm';

export default function AdminRegisterPage() {
    return (
        <main className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4 max-w-md">
        <h1 className="text-4xl text-gray-600 text-center mb-12">管理者登録</h1>
          <AdminRegisterForm />
      </div>
    </main>
    );
} 