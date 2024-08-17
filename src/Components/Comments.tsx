import { useAuth0 } from '@auth0/auth0-react';
import React, { useState, useEffect } from 'react';

type Comment = {
    id: string;
    name: string;
    text: string;
    date: string;
};

export const Comments = () => {
    const [comments, setComments] = useState<Comment[]>(() => {
        // Initialize state directly from local storage
        try {
            const savedComments = localStorage.getItem('comments');
            return savedComments ? JSON.parse(savedComments) : [];
        } catch (error) {
            console.error('Error reading local storage:', error);
            return [];
        }
    });

    const [name, setName] = useState('');
    const [commentText, setCommentText] = useState('');
    const [email, setEmail] = useState(false)
    const { user } = useAuth0();

    useEffect(() => {
        if(user?.email === "sanilm4637@gmail.com")
          setEmail(true);
      })

    // Save comments to local storage whenever they change
    useEffect(() => {
        try {
            localStorage.setItem('comments', JSON.stringify(comments));
        } catch (error) {
            console.error('Error saving to local storage:', error);
        }
    }, [comments]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim() && commentText.trim()) {
            const newComment: Comment = {
                id: Date.now().toString(),
                name,
                text: commentText,
                date: new Date().toLocaleDateString(),
            };
            setComments([...comments, newComment]);
            setName('');
            setCommentText('');
        }
    };

    const handleDelete = (id: string) => {
        const updatedComments = comments.filter(comment => comment.id !== id);
        setComments(updatedComments);
    };

    return (
        <div className="p-14 flex-1 flex-col pb-[14%]">
            <h2 className="text-4xl font-extrabold mb-4 from-black via-yellow-500 to-black">Comments</h2>
            <div className="flex flex-col space-y-4">
                {comments.length === 0 ? (
                    <p>No comments yet.</p>
                ) : (
                    comments.map(comment => (
                        <div key={comment.id} className="bg-white p-4 rounded-lg shadow-lg">
                            <h3 className="text-xl font-bold">{comment.name}</h3>
                            <p className="text-gray-700 text-sm mb-2">Posted on <span className='text-black'>{comment.date}</span></p>
                            <p className="text-black text-2xl font-extrabold">{comment.text}</p>
                            {email && <button
                                onClick={() => handleDelete(comment.id)}
                                className="mt-6 text-xl font-semibold text-red-500  flex items-center gap-1 shrink-0 hover:text-red-900"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-4 fill-current inline min-w-6"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                                        data-original="#000000"
                                    ></path>
                                    <path
                                        d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                                        data-original="#000000"
                                    ></path>
                                </svg>
                                Delete
                            </button>}
                        </div>
                    ))
                )}
                <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-4xl font-extrabold mb-2">Add a comment</h3>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            type="text"
                            placeholder="Enter your name"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="comment">
                            Comment
                        </label>
                        <textarea
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="comment"
                            rows={3}
                            placeholder="Enter your comment"
                        ></textarea>
                    </div>
                    <button
                        className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};
