'use client';

// next.jsの機能
import AdminLoginForm from '@/components/AdminLoginForm';

export default function AdminLoginPage() {

return (
    <main className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4 max-w-md">
        <h1 className="text-4xl text-gray-600 text-center mb-12">管理者ログインページ</h1>
          <AdminLoginForm />
      </div>
    </main>
  );
}
    