import * as APIUtil from '../../util/api_util'
import { receiveUsers } from './session_actions'
import { receiveComments } from './comment_actions'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RECEIVE_POST = 'RECEIVE_POST'
export const DELETE_POST = 'DELETE_POST'
export const RECEIVE_POST_ERRORS = 'RECEIVE_POST_ERRORS'

export const receivePosts = (posts) => ({
    type: RECEIVE_POSTS,
    posts,
})
export const receivePost = (post) => ({
    type: RECEIVE_POST,
    post,
})

export const receivePostErrors = (errors) => ({
    type: RECEIVE_POST_ERRORS,
    errors,
})

export const createPost = (post) => (dispatch) =>
    APIUtil.createPost(post)
        .then(({ data: { post } }) => dispatch(receivePost(post)))
        .catch((errors) => dispatch(receivePostErrors(errors)))

export const fetchPosts = () => (dispatch) =>
    APIUtil.fetchPosts()
        .then(({ data: { posts } }) => dispatch(receivePosts(posts)))
        .catch((errors) => dispatch(receivePostErrors(errors)))

export const getFeed = () => (dispatch) =>
    APIUtil.getFeed()
        .then(({ data: { posts, users, comments } }) => {
            dispatch(receiveUsers(users))
            dispatch(receivePosts(posts))
            dispatch(receiveComments(comments))
        })
        .catch((errors) => console.log(errors))

export const likePost = (postId) => (dispatch) =>
    APIUtil.likePost(postId)
        .then(({ data: { post } }) => dispatch(receivePost(post)))
        .catch((errors) => console.log(errors))

export const unlikePost = (postId) => (dispatch) =>
    APIUtil.unlikePost(postId)
        .then(({ data: { post } }) => dispatch(receivePost(post)))
        .catch((errors) => console.log(errors))

export const savePost = (postId) =>
    APIUtil.savePost(postId).then((res) => console.log(res))

export const unsavePost = (postId) =>
    APIUtil.unsavePost(postId).then((res) => console.log(res))
