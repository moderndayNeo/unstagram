import { RECEIVE_CURRENT_USER } from '../actions/session_actions'

export default (state = {}, action) => {
    Object.freeze(state)

    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return Object.assign({}, state, {
                [action.user.data.id]: action.user.data,
            })

        default:
            return state
    }
}
