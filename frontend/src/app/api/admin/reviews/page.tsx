'use client';

import { useState } from 'react';
// import { StarIcon } from '@heroicons/react/24/solid';
// import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';

// interface Review {
//   id: number;
//   userId: string;
//   username: string;
//   rating: number;
//   comment: string;
//   createdAt: string;
//   likes: number;
//   userImage?: string;
// }

export default function AdminMatchReviewsPage() {
//   const [reviews, setReviews] = useState<Review[]>([
//     {
//       id: 1,
//       userId: "1",
//       username: "サッカーファン",
//       rating: 4,
//       comment: "素晴らしい試合でした。特にインテルの守備が印象的でした。",
//       createdAt: "2024-03-15T10:00:00",
//       likes: 12,
//       userImage: "/images/avatar1.jpg"
//     },
//     // ダミーデータ
//   ]);

//   const [newReview, setNewReview] = useState({
//     rating: 0,
//     comment: ''
//   });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 試合情報ヘッダー */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center">
            <div className="text-center flex-1">
              <p className="text-xl text-blue-500 font-bold">FC Internazionale Milano</p>
              <p className="text-3xl text-black">1</p>
            </div>
            <div className="mx-4">
              <span className="text-black">VS</span>
            </div>
            <div className="text-center flex-1">
              <p className="text-xl text-purple-500 font-bold">FCBarcelona</p>
              <p className="text-3xl text-black">0</p>
            </div>
          </div>
        </div>

        {/* レビュー投稿フォーム */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl text-black font-bold mb-4">レビューを投稿</h2>
          <div className="mb-4">
            <div className="flex items-center mb-2">
              {/* <p className="mr-2">評価</p> */}
              {/* <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setNewReview({ ...newReview, rating: star })}
                    className="text-yellow-400 focus:outline-none"
                  >
                
                  </button>
                ))}
              </div> */}
            </div>
            <textarea
              className="w-full p-2 border text-gray-500 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
              placeholder="試合の感想を書いてください..."
            //   value={newReview.comment}
            //   onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            />
            <button
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              投稿する
            </button>
          </div>
        </div>

        






        

        {/* ページネーション */}
        <div className="mt-8 flex justify-center">
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
            <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              前へ
            </button>
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              1
            </button>
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              2
            </button>
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              3
            </button>
            <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              次へ
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}