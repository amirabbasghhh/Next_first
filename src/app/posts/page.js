"use client";

import { api } from '@/configs/api';
import React, { useEffect, useState } from 'react';
import { Grid, Pagination, Card, CardContent, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Link from 'next/link';

export default function PostsPage({ searchParams }) {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(searchParams.page ? parseInt(searchParams.page) : 1);
  const limit = 15;

  const fetchPosts = async (currentPage) => {
    const response = await api.get(`posts?_page=${currentPage}&_limit=${limit}`);
    setPosts(response.data);
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  const totalPosts = 100;
  const totalPages = Math.ceil(totalPosts / limit);

  if (posts.length === 0) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: "100vh" }}>
      <Box size="100" sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    </div>
  );

  return (
    <div style={{ margin: "40px", marginInline: '20px' }}>
      <p>Posts Page - Page {page}</p>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ marginInline: 'auto' }}
      >
        {posts?.map((post) => (
          <Grid item xs={3} key={post.id} style={{ margin: '10px' }}>
          
            <Link href={`/posts/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Card variant="outlined" style={{ height: '70px', cursor: 'pointer' }}>
                <CardContent>
                  <Typography>{post.title}</Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
        <Pagination 
          count={totalPages} 
          page={page} 
          onChange={(event, value) => {
            setPage(value); 
            router.push(`/posts?page=${value}`);
          }}
          variant="outlined" 
          shape="rounded"
        />
      </div>
    </div>
  );
}
