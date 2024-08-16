import React, { useState } from "react";

interface ReviewProps {
  productId: number;
  reviews: { rating: number; comment: string }[];
  addReview: (productId: number, review: { rating: number; comment: string }) => void;
}

const Review: React.FC<ReviewProps> = ({ productId, reviews, addReview }) => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addReview(productId, { rating, comment });
    setRating(0);
    setComment("");
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-4">
      <h3 className="font-bold text-lg mb-2">Reviews</h3>
      <ul className="mb-4">
        {reviews.map((review, index) => (
          <li key={index} className="border-b border-gray-300 py-2">
            <div>Rating: {"⭐".repeat(review.rating)}</div>
            <p>{review.comment}</p>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Rating:</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="border rounded px-2 py-1 w-full"
          >
            <option value="0">Select Rating</option>
            {[1, 2, 3, 4, 5].map((star) => (
              <option key={star} value={star}>
                {star} Star{star > 1 && "s"}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-2">Comment:</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border rounded w-full px-2 py-1"
            rows={4}
          />
        </div>
        <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded">
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default Review;
