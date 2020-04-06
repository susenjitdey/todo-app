import axios from "axios"

class AuthenticationService{

    
    registerSuccessfulLogin(username,password){
        console.log("registerSuccessfulLogin called");
        sessionStorage.setItem("authenticateduser", username)
        this.setupAxiosIntercentors()
    }

    logout(){

        sessionStorage.removeItem("authenticateduser")
        
    }

    isUserLoggedIn(){

        let user = sessionStorage.getItem("authenticateduser")
        if(user === null) return false
        return true
           
    }

    retrieveLoggedInUser(){

        let user = sessionStorage.getItem("authenticateduser")
        if(user === null) return " "
        return user
           
    }

    //VVIP method for authorization
    setupAxiosIntercentors(){

        let username = "in28minutes"
        let password = "dummy"

        let basicAuthHeader = 'Basic ' + window.btoa(username + ":" + password)

        axios.interceptors.request.use(
            (config) => {
                if(this.isUserLoggedIn()){

                    config.headers.authorization = basicAuthHeader
                }
                return config
            }
        )

    }
}

export default new AuthenticationService()