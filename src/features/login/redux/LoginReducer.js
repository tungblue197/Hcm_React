const initialState = {
    isLogin: false,
    token: null,
    permission: [],
    loging: false, 
    message: ''
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case 'LOGIN':
        return { ...state, loging: true }
    case 'LOGIN_SUCCESS':
        return { ...state, loging: false, isLogin: true, message: payload.message, token: payload.token}
    case 'LOGIN_FALSE':
        return {...state, loging: false, isLogin: false, message: payload.message, token: ''}
    default:
        return state
    }
}
