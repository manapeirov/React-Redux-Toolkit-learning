import React from 'react'

export const Comment = ({ comment }) => (
    <article className='comment'>
        <h2>{comment.title}</h2>
        <h3>{comment.email}</h3>
        <p>{comment.body}</p>
    </article>
)
