import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchPost, postSelector } from '../slices/post'
import { fetchComments, commentsSelector } from '../slices/comments'

import { Post } from '../components/Post'
import { Comment } from '../components/Comment'

const SinglePostPage = ({ match }) => {

    const dispatch = useDispatch()


    const { loading: postLoading, hasErrors: postHasErrors, post } = useSelector(postSelector)
    //postSelector was initialised as state.post so this is a destructuring short hand for 
    //loading: state.post.loading
    //since there are more than one variables called loading, in mapStateToProps would have to do 
    //loading: { post: state.post.loading, comments: state.comments.loading } 
    //then refer to them as loading.post and loading.comments
    //instead here in restructuring we are re-naming the variable keys
    // hence { loading: postLoading ...} 

    const { loading: commentsLoading, hasErrors: commentsHasErrors, comments } = useSelector(commentsSelector)

    useEffect(() => {
        const { id } = match.params

        dispatch(fetchComments(id))
        dispatch(fetchPost(id))
    }, [dispatch, match])

    const renderPost = () => {
        if (postLoading) return <p>Loading post...</p>
        if (postHasErrors) return <p>Unable to display post.</p>

        return <Post post={post} />
    }

    const renderComments = () => {
        if (commentsLoading) return <p>Loading comments...</p>
        if (commentsHasErrors) return <p>Unable to display comments.</p>

        console.log(comments)
        return comments.map(comment => (<Comment key={comment.id} comment={comment} />))
    }

    return (
        <section>
            {renderPost()}
            <h2>Comments</h2>
            {renderComments()}
        </section>
    )

}

export default SinglePostPage