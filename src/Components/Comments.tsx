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
            <h2 className="text-lg font-bold mb-4">Comments</h2>
            <div className="flex flex-col space-y-4">
                {comments.length === 0 ? (
                    <p>No comments yet.</p>
                ) : (
                    comments.map(comment => (
                        <div key={comment.id} className="bg-white p-4 rounded-lg shadow-md">
                            <h3 className="text-lg font-bold">{comment.name}</h3>
                            <p className="text-gray-700 text-sm mb-2">Posted on {comment.date}</p>
                            <p className="text-gray-700">{comment.text}</p>
                            <button
                                onClick={() => handleDelete(comment.id)}
                                className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                            >
                                Delete
                            </button>
                        </div>
                    ))
                )}
                <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-bold mb-2">Add a comment</h3>
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
