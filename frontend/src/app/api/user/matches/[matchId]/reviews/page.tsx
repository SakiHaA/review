'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

interface Match {
  id: number;
  homeTeam: string;
  awayTeam: string;
  matchDate: string;
  competition: string;
  status: string;
  homeScore: number | null;
  awayScore: number | null;
}

interface Review { 
    id: number;
    userId: string;
    username: string;
    rating: number;
    comment: string;
    createdAt: string;
}

export default function MatchReviewsPage() { 
    const params = useParams();
    const router = useRouter();
    const matchId = params.matchId as string;
    const [match, setMatch] = useState<Match | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [newReview, setNewReview] = useState({
    rating: 0,
    comment: ''
  });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        fetchMatchDetails();
        fetchReviews();
    }, [matchId]);

    const fetchMatchDetails = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/matches/${matchId}`);
            if (response.ok) {
                const matchData = await response.json();
                setMatch(matchData);
            }
        } catch (error) {
            setError('試合情報の取得に失敗しました');
        }
    };

    const fetchReviews = async () => { 
        try {
            const response = await fetch(`http://localhost:8080/api/user/matches/${matchId}/reviews`);
            if (response.ok) {
                const reviewsData = await response.json();
                setReviews(reviewsData);
            }
        } catch (error) {
            setError('レビューの取得に失敗しました');
        } finally {
            setLoading(false);
        }
    };
    
    const handleSubmitReview = async (e: React.FormEvent) => { 
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/api/user/login');
            return;
        }
        try {
            const response = await fetch(`http://localhost:8080/api/user/matches/${matchId}/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newReview)
            });
        if (response.ok) {
            setNewReview({ rating: 0, comment: '' });
            fetchReviews(); // レビュー一覧を再取得
        } else {
            setError('レビューの投稿に失敗しました');
        }
        } catch (error) {
            setError('レビューの投稿に失敗しました');
        }};
    
            const formatDate = (dateString: string) => {
                return new Date(dateString).toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                });
            };

            if (loading) {
            return (
                <div className="min-h-screen bg-gray-100 py-12">
                    <div className="container mx-auto px-4">
                        <div className="text-center">
                            <div className="text-xl">データを読み込み中...</div>
                        </div>
                    </div>
                </div>
            );
            }

return (
    <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="flex justify-between items-center">
                    <div className="text-center flex-1">
                        <p className="text-xl text-blue-500 font-bold">{match?.homeTeam}</p>
                        <p className="text-3xl text-black">{match?.homeScore}</p>
                    </div>
                    <div className="mx-4">
                        <span className="text-black">VS</span>
                    </div>
            <div className="text-center flex-1">
              <p className="text-xl text-purple-500 font-bold">{match?.awayTeam}</p>
              <p className="text-3xl text-black">{match?.awayScore}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl text-black font-bold mb-4">レビューを投稿</h2>
            <form onSubmit={handleSubmitReview}>
                <textarea
                    className="w-full p-2 border text-gray-500 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={4}
                    placeholder="試合の感想を書いてください..."
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                />
                <button
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    投稿する
                </button>
            </form>
        </div>

        {/* レビュー一覧 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl text-black font-bold mb-4">レビュー一覧</h2>
                {reviews.length === 0 ? (
            <p className="text-gray-500 text-center py-8">まだレビューがありません</p>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-gray-900">{review.username}</p>
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={`text-lg ${
                              review.rating >= star ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{formatDate(review.createdAt)}</span>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
              </div>
          )}
        </div>

      </div>
    </div>
  );
}