import { api } from '@/configs/api'
import React from 'react'

async function PostPage({params}) {
    const PostDetail=await api.get(`posts/${params.postId}`)
    const Comments=await api.get('comments')
    const CommentsPost=Comments.data.filter(comment => comment.postId === +params.postId)
    console.log(CommentsPost);
  return (
    <div style={{marginInline:"40px",marginTop:'20px'}}>
        <p>PostPage</p>
         <p style={{marginTop:'15px',marginBottom:'15px'}}>Title : {PostDetail.data.title}</p>
        <h1>Comments</h1>
        <hr style={{marginInline:'20px',marginTop:'30px'}} />
        {CommentsPost.map(comment =>(
            <div style={{marginTop:"10px",marginBottom:"10px"}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:'space-between'}}>
                     <p>
                       <span style={{backgroundColor:'green'}}>Name  </span>: {comment.name}
                    </p>
                    <p>
                       <span style={{backgroundColor :'yellow'}}> Email  </span>: {comment.email}
                    </p>
                </div>
                <p><span style={{backgroundColor:'red'}}>Text</span> : {comment.body}</p>
                <hr style={{marginTop:'10px'}}/>
            </div>
        ))}
        
        
    </div>
  )
}

export default PostPage