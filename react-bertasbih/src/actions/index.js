import axios from 'axios';
import {
    USER_LOGIN_SUCCESS, 
    AUTH_SYSTEM_ERROR, 
    AUTH_LOADING,
    COOKIE_CHECKED,
    LOGOUT,
    SELECT_PRODUK
    
} from './types';

export const onUserRegister = ({ username,email,phone,password}) => {
    return (dispatch) => {
        dispatch({type : AUTH_LOADING})
        if(username === '' || email === '' || phone === '' || password === '') {
            dispatch({ type: AUTH_SYSTEM_ERROR, payload: 'Semua form diatas wajib diisi'})
        }
        else {
            axios.get('http://localhost:1993/users', {
                params : {
                    username
                }
            }).then((res) => {
                if(res.data.length === 0) {
                    axios.post('http://localhost:1993/users', { username,email,phone,password
                    }).then((res) => {
                        dispatch({ type: USER_LOGIN_SUCCESS, payload: res.data.username})
                        //kalau pake res.data.username ambilnya dari API
                        //kalau dengan username doank ambil datanya dari parameter const onUserRegister
                    }).catch((err) => {
                        dispatch({ type: AUTH_SYSTEM_ERROR ,payload: 'System Error'})
                    })
                }
                else {
                    dispatch({ type : AUTH_SYSTEM_ERROR, payload: 'Username has been taken'})
                }
                
            }).catch((err) => {
                dispatch({ type : AUTH_SYSTEM_ERROR, payload: 'System Error'})
            })
            
        }
        
    }
}

export const onUserLogout = () => {
    return { type : LOGOUT} 
}

export const keeplogin = (username) => {
    return { type: USER_LOGIN_SUCCESS, payload: username}
}

export const cookieChecked = () => {
    return {type : COOKIE_CHECKED}
}


//LOGIN ACTION START
export const onUserLogin = ({ username , password }) => {
    return (dispatch) => {
        dispatch({ type: AUTH_LOADING})
        loginYok(dispatch,username,password);
    }
}

var loginYok=(dispatch,username,password) => {
    axios.get('http://localhost:1993/users', 
        {params: {
            username,
            password
        }}).then((res) => {
            console.log(res)
            if(res.data.length > 0) {
                dispatch({ type: USER_LOGIN_SUCCESS, payload: username})
            }
            else {
                dispatch({ type: AUTH_SYSTEM_ERROR, payload: 'username or password invalid'})
            }
            
        }).catch((err) => {
            console.log(err)
            dispatch({ type: AUTH_SYSTEM_ERROR, payload: 'System Error' });
        })
    }
//LOGIN ACTION END


export const SelectProduk = (selectedproduk) => {
    return {
        type : SELECT_PRODUK,
        payload : selectedproduk
    }
}