import Axios from "axios"
import {API_URL, JPA_API_URL} from "../../Constants"


class TododataService{

    retrieveAllTodos(name){
        //Note:this is where the promise is being returned. 
        //click on get to find the promise and the Axios documentation.
        return Axios.get(`${JPA_API_URL}/users/${name}/todos`);
        //console.log("executehelloWorldService called")
    }

    retrieveTodo(name,id){
        
        return Axios.get(`${JPA_API_URL}/users/${name}/todos/${id}`);
        //console.log("executehelloWorldService called")
    }

    deleteTodosById(name,id){
        
        return Axios.delete(`${JPA_API_URL}/users/${name}/todos/${id}`);
        
    }

    updateTodo(name, id, todo){
        
        return Axios.put(`${JPA_API_URL}/users/${name}/todos/${id}`, todo);
        
    }

    createTodo(name, todo){
        
        return Axios.post(`${JPA_API_URL}/users/${name}/todos/`, todo);
        
    }

    

}

export default new TododataService()