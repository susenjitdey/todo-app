import axios from "axios"

class AuthenticationService{

    executebasicAuthenticationService(username, password){

        return axios.get('http://localhost:8080/basicauth',
        {headers: {authorization: this.createBasicAuthToken(username, password)}})

    }

    createBasicAuthToken(username, password){

        return 'Basic ' + window.btoa(username + ":" + password)

    }

    registerSuccessfulLogin(username,password){
        //let username = "in28minutes"
        //let password = "dummy"

        //let basicAuthHeader = 'Basic ' + window.btoa(username + ":" + password)
        console.log("registerSuccessfulLogin called");
        sessionStorage.setItem("authenticateduser", username)
        this.setupAxiosIntercentors(this.createBasicAuthToken(username, password))
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
    setupAxiosIntercentors(basicAuthHeader){

        

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