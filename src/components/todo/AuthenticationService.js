import axios from "axios"
import {API_URL} from "../../Constants"

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticate'

class AuthenticationService{

    //Basic Authentication implementations
    executebasicAuthenticationService(username, password){

        return axios.get(`${API_URL}/basicauth`,
        {headers: {authorization: this.createBasicAuthToken(username, password)}})

    }

    //JWT Authentication Implementation: Here we need to send a post request as seen on talend rest call
    //Use this on the login component now.
    executeJwtAuthenticationService(username, password){
        console.log("executeJwtAuthenticationService entered")
        return axios.post(`${API_URL}/authenticate`,
        {
            username,
            password
        })

    }

    

    createBasicAuthToken(username, password){

        return 'Basic ' + window.btoa(username + ":" + password)

    }

    // registerSuccessfulLogin(username,password){
    //     //let username = "in28minutes"
    //     //let password = "dummy"

    //     //let basicAuthHeader = 'Basic ' + window.btoa(username + ":" + password)
    //     console.log("registerSuccessfulLogin called");
    //     sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
    //     this.setupAxiosIntercentors(this.createBasicAuthToken(username, password))
    // }

    registerSuccessfulLoginForJwt(username,token){

        console.log("registerSuccessfulLogin called from jwt");
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
        this.setupAxiosIntercentors(this.createJWTToken(token))
    }

    createJWTToken(token){

        return 'Bearer ' + token
    }

    logout(){

        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        
    }

    isUserLoggedIn(){

        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if(user === null) return false
        return true
           
    }

    retrieveLoggedInUser(){

        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if(user === null) return " "
        return user
           
    }

    //VVIP method for authorization
    setupAxiosIntercentors(token){

        

        axios.interceptors.request.use(
            (config) => {
                if(this.isUserLoggedIn()){
                    
                    config.headers.authorization = token
                }
                return config
            }
        )

    }
}

export default new AuthenticationService()