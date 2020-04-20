import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    comments: [],
    loading: false,
    hasErrors: false,
}

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        getComments: state => {
            state.loading = true
        },
        getCommentsSuccess: (state, action) => {
            state.loading = false
            state.hasErrors = false
            state.comments = action.payload
        },
        getCommentsFailure: state => {
            state.loading = false
            state.hasErrors = true
        },
    },
})

export const { getComments, getCommentsSuccess, getCommentsFailure } = commentsSlice.actions

export const commentsSelector = state => state.comments

export default commentsSlice.reducer


export const fetchComments = (id) => {
    return async dispatch => {
        dispatch(getComments())

        try {
            const response = await fetch (`https://jsonplaceholder.typicode.com/comments?postId=${id}`)

            const data = await response.json()

            dispatch(getCommentsSuccess(data))
        } catch(error) {
            dispatch(getCommentsFailure())
        }
    }
}



