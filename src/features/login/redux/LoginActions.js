export const login = ({username, password}) => (dispatch) => {
    dispatch({type: 'LOGIN'});
    if((username === 'admin' && password === '123456') || (username === 'adminkt' && password === '123456')){
        let token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
        eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0.
        yRQYnWzskCZUxPwaQupWkiUzKELZ49eM7oWxAQK_ZXw
        `
        dispatch({ type: 'LOGIN_SUCCESS', payload: { token, message: 'Login successfuly!' }})
    }else{
        dispatch({ type: 'LOGIN_FALSE', payload: {  message: 'Username or password incorrect'}})
    }
}



