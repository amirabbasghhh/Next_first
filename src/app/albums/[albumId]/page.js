import { api } from '@/configs/api';
import { pink } from '@mui/material/colors';
import React from 'react';

const AlbumPage =async ({params}) => {
    
    const albums=await api.get('albums')
    const userId=albums.data.find(users => users.id ===+params.albumId).userId
    const userDetail=await api.get(`users/${userId}`)

    const albumDetail=await api(`albums/${params.albumId}`)
    return (
        <div style={{marginInline:"40px",marginTop:'20px'}}>
            <p>AlbumPage</p>
            <p style={{marginTop:'30px'}}>  <span >Title : </span>{albumDetail.data.title}</p>
            <div style={{border:'1px solid black',padding:'10px',marginBottom:10,marginTop:10,display:'flex',alignItems:'center',justifyContent:'space-between',paddingInline:'20px'}}>
                <p><span>first Name : {userDetail.data.name}</span></p>
                <p><span>User Name : {userDetail.data.username}</span></p>
                <p><span>Email : {userDetail.data.email}</span></p>
            </div>
            <p style={{marginBottom:10}}>Company_name : {userDetail.data.company.name}</p>
            <p>website : {userDetail.data.website}</p>
        </div>
    );
};

export default AlbumPage;