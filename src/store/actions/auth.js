import * as actionTypes from './actionType'
import axios from 'axios'
export const authStart=()=>{
    return{
        type:actionTypes.AUTH_START
    };
};

export const authSuccess=(token,userId)=>{
    return{
        type:actionTypes.AUTH_SUCCESS,
        idToken:token,
        userId:userId
    };
};

export const authFail=(error)=>{
    return{
        type:actionTypes.AUTH_FAIL,
        error:error
    };
};

//export const checkAuthTimeout

export const auth=(email,password,isSignup)=>{
    return dispatch =>{
        dispatch(authStart());
        const authData={
            email:email,
            password:password,
            returnSecureToken: true
        }
        let url='https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyA3LgLMQpW8COtHVd2vg4gN4CPO97_1oLk';
        if(!isSignup){
            url='https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyA3LgLMQpW8COtHVd2vg4gN4CPO97_1oLk'
        }
        axios.post(url,authData)
             .then(response=>{
                 dispatch(authSuccess(response.data.idToken,response.data.localId));
             })
             .catch(err=>{
                 dispatch(authFail(err.response.data.error));
             })
    };
}