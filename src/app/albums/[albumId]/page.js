
import { api } from '@/configs/api';
import React from 'react';

const AlbumPage =async ({params}) => {
    console.log(params.albumId);
    const albumDetail=await api(`albums/${params.albumId}`)
    return (
        <div style={{marginInline:"40px",marginTop:'20px'}}>
            <p>AlbumPage</p>
            <p style={{marginTop:'30px'}}>  <span style={{backgroundColor:'red'}}>Title : </span>{albumDetail.data.title}</p>
        </div>
    );
};

export default AlbumPage;