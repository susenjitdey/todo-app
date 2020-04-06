import Axios from "axios"

class TododataService{

    retrieveAllTodos(name){
        //Note:this is where the promise is being returned. 
        //click on get to find the promise and the Axios documentation.
        return Axios.get(`http://localhost:8080/users/${name}/todos`);
        //console.log("executehelloWorldService called")
    }

    retrieveTodo(name,id){
        
        return Axios.get(`http://localhost:8080/users/${name}/todos/${id}`);
        //console.log("executehelloWorldService called")
    }

    deleteTodosById(name,id){
        
        return Axios.delete(`http://localhost:8080/users/${name}/todos/${id}`);
        
    }

    updateTodo(name, id, todo){
        
        return Axios.put(`http://localhost:8080/users/${name}/todos/${id}`, todo);
        
    }

    createTodo(name, todo){
        
        return Axios.post(`http://localhost:8080/users/${name}/todos/`, todo);
        
    }

    

}

export default new TododataService()