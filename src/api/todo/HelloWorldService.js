import Axios from "axios"

class HelloWorldService{

    executehelloWorldService(){
        //Note:this is where the promise is being returned. 
        //click on get to find the promise and the Axios documentation.
        return Axios.get("http://localhost:8080/hello-world");
        //console.log("executehelloWorldService called")
    }

    executehelloWorldBeanService(){
        
        return Axios.get("http://localhost:8080/hello-world-bean");
        
    }

    executehelloWorldPathVariableService(name){
        
       // let username = "in28minutes"
       // let password = "dummy"

        //Below is basic encoding
        //Below is standard basic authentication header
       // let basicAuthHeader = 'Basic ' + window.btoa(username + ":" + password)

        return Axios.get(`http://localhost:8080/hello-world/path-variable/${name}`
        // ,
        //   {
        //       headers : {
        //           authorization : basicAuthHeader
        //       }
        //   }

        );
        
    }

}

export default new HelloWorldService()