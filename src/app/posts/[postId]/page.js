"use client"; // این خط را در بالای فایل قرار دهید

import PostComment from '@/components/PostComment';
import { api } from '@/configs/api';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';

// تابعی برای بارگذاری کامنت‌ها
async function fetchComments(postId) {
    const comments = await api.get('comments');
    return comments.data.filter(comment => comment.postId === postId);
}

// تابعی برای بارگذاری جزئیات پست
async function fetchPost(postId) {
    const postResponse = await api.get(`posts/${postId}`);
    return postResponse.data;
}

function PostPage({ params }) {
    const [postDetail, setPostDetail] = useState(null);
    const [commentsPost, setCommentsPost] = useState([]);
    const [loading, setLoading] = useState(true); // حالت لودینگ

    // بارگذاری داده‌ها در useEffect
    useEffect(() => {
        const loadPostAndComments = async () => {
            setLoading(true); // شروع لودینگ
            try {
                const postData = await fetchPost(params.postId);
                setPostDetail(postData);

                const comments = await fetchComments(+params.postId);
                setCommentsPost(comments);
            } catch (error) {
                console.error("Error loading post or comments:", error);
            } finally {
                setLoading(false); // پایان لودینگ
            }
        };

        loadPostAndComments();
    }, [params.postId]);

    const updateComments = async () => {
        const updatedComments = await fetchComments(+params.postId);
        setCommentsPost(updatedComments);
    };

    return (
        <div style={{ marginInline: "40px", marginTop: '20px' }}>
            <p>PostPage</p>
            {postDetail && (
                <p style={{ marginTop: '15px', marginBottom: '15px' }}>Title : {postDetail.title}</p>
            )}
            <h1>Comments</h1>
            <hr style={{ marginInline: '20px', marginTop: '30px' }} />

            {loading ? ( // نمایش لودینگ در صورت بارگذاری
                <Box display="flex" justifyContent="center" alignItems="center" style={{ height: '100px',marginTop:50 }}>
                    <CircularProgress size="6rem"/>
                </Box>
            ) : (
                commentsPost.map(comment => (
                    <div key={comment.id} style={{ marginTop: "10px", marginBottom: "10px" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: 'space-between' }}>
                            <p>
                                <span style={{ backgroundColor: 'green' }}>Name  </span>: {comment.name}
                            </p>
                            <p>
                                <span style={{ backgroundColor: 'yellow' }}> Email  </span>: {comment.email}
                            </p>
                        </div>
                        <p><span style={{ backgroundColor: 'red' }}>Text</span> : {comment.body}</p>
                        <hr style={{ marginTop: '10px' }} />
                    </div>
                ))
            )}
            <PostComment postId={params.postId} updateComments={updateComments} />
        </div>
    );
}

export default PostPage;
