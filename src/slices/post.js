import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    post: {},
    loading: false,
    hasErrors: false,
}

const postSlice = createSlice ({
    name: 'post',
    initialState,
    reducers: {
        getPost: state => {
            state.loading = true
        },
        getPostSuccess: (state, { payload }) => {
            state.loading = false
            state.hasErrors = false
            state.post = payload
        },
        getPostFailure: state => {
            state.loading = false
            state.hasErrors = true
        },
    },
})

export const { getPost, getPostSuccess, getPostFailure } = postSlice.actions

export const postSelector = state => state.post

export default postSlice.reducer


export const fetchPost = (id) => {
    return async dispatch => {
        dispatch(getPost())

        try {
            const response = await fetch (`https://jsonplaceholder.typicode.com/posts/${id}`)

            const data = await response.json()

            dispatch(getPostSuccess(data))

        } catch(error) {
            dispatch(getPostFailure())
        }
    }
}

