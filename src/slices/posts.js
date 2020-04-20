import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
    posts: [],
    loading: false,
    hasErrors: false,
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        getPosts: state => {
            state.loading = true
        },
        getPostsSuccess: (state, { payload }) => {
            state.loading = false
            state.hasErrors = false
            state.posts = payload
        },
        getPostsFailure: state => {
            state.loading = false
            state.hasErrors = true
        },
    },
})

// Three actions generated from the slice
export const { getPosts, getPostsSuccess, getPostsFailure } = postsSlice.actions

//A selector, which we'll use to access any of the state from a React component instead of using connect.
export const postsSelector = state => state.posts

// The reducer:
export default postsSlice.reducer


// Asynchornous thunk action 

export function fetchPosts() {
    return async dispatch => {
        dispatch(getPosts())

        try {
            const response = await fetch (`https://jsonplaceholder.typicode.com/posts`)

            const data = await response.json()

            dispatch(getPostsSuccess(data))

        } catch (error) {
            dispatch(getPostsFailure())
        }
    }
}


// export function postsReducer( state = initialState, action) {
//     switch (action.type) {
//         case GET_POSTS:
//             return {...state, loading: true, hasErrors: false }
//         default: 
//             return state
//     }
// }