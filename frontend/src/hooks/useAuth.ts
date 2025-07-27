// ここは...なくてもとりま登録できた



// import { useState, useEffect } from 'react';
// import { authAPI, UserResponse, LoginRequest, RegisterRequest } from '../lib/api/auth';
// // import { authAPI, UserResponse, LoginRequest, RegisterRequest } from '../lib/axios/auth';
// import { useRouter } from 'next/navigation';

// // 型定義
// export interface User {
//     id: number;
//     email: string;
//     name: string;
//     role: string;
// }


// export const useAuth = () => {
//     const [user, setUser] = useState<User| null>(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const router = useRouter();

// //     useEffect(() => {
// //         checkAuth();
// //     }, []);

//     const checkAuth = async () => {
//         try {
//             const { data } = await authAPI.getCurrentUser();
//             setUser(data);
//         } catch (error) {
//             setUser(null);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // const login = async (credentials: LoginRequest) => {
//     //     try {
//     //         setLoading(true);
//     //         setError(null);
//     //         const { data } = await authAPI.login(credentials);
//     //         localStorage.setItem('token', data.token);
//     //         await checkAuth();
//     //         router.push('/dashboard');
//     //     } catch (err) {
//     //         setError('ログインに失敗しました');
//     //         throw err;
//     //     } finally {
//     //         setLoading(false);
//     //     }
//     // };

//     const register = async (userData: RegisterRequest) => {
//         try {
//             setLoading(true);
//             setError(null);
//             const { data } = await authAPI.register(userData);
//             localStorage.setItem('token', data.token);
//             await checkAuth();
//             router.push('/dashboard');
//         } catch (err) {
//             setError('登録に失敗しました');
//             throw err;
//         } finally {
//             setLoading(false);
//         }
//     };

// //     const logout = () => {
// //         authAPI.logout();
// //         setUser(null);
// //         router.push('/login');
// //     };

// //     return {
// //         user,
// //         loading,
// //         error,
// //         login,
// //         register,
// //         logout,
// //         isAuthenticated: !!user
// //     };
// // }; 