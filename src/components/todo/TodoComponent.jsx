import React, {Component} from 'react'
import moment from 'moment'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import TododataService from "../../api/todo/TododataService.js"
import AuthenticationService from "./AuthenticationService.js";

class TodoComponent extends Component{

    constructor(props){

        super(props)
        this.state = {

            id : this.props.match.params.id,
            description : '',
            targetDate : moment(new Date()).format('YYYY-MM-DD')
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
        
    }
    componentDidMount(){

        if(this.state.id == -1){
            return
        }
        let username = AuthenticationService.retrieveLoggedInUser()
        //let username = AuthenticationService.retrieveLoggedInUser;
        TododataService.retrieveTodo(username,this.state.id)
        .then(response => this.setState({

            description : response.data.description,
            targetDate : moment(response.data.targetDate).format('YYYY-MM-DD')
        }))
    }
    validate(values){
        let errors = {} 
        if(!values.description){
            
            errors.description = 'Enter a description'

        }else if(values.description.length<5){

            errors.description = 'Enter atleast 5 characters in description'
        }

        if(!moment(values.targetDate).isValid()) {
            errors.targetDate = 'Enter a valid Target date'
        }
        return errors
    }
    onSubmit(values){
        let username = AuthenticationService.retrieveLoggedInUser()
       // let username = AuthenticationService.retrieveLoggedInUser;
        let todo = {
            id : this.state.id,
            description : values.description,
            targetDate : values.targetDate

            }
        if(this.state.id == -1){
            TododataService.createTodo(username, todo)
            .then( () => this.props.history.push('/todos'))
        } else {
            TododataService.updateTodo(username, this.state.id, todo)
            .then( () => this.props.history.push(`/todos/${this.state.id}`))

    } }
    render() {
        let {description, targetDate} = this.state
        //let targetDate = this.state.targetDate
        return (
           <div> 
             <h1>Todo</h1>
             <div className="container">
                 <Formik
                    
                    initialValues = {{description, targetDate}}
                    onSubmit={this.onSubmit}
                    validateOnBlur = {false}
                    validateOnChange = {false}
                    validate={this.validate}
                    enableReinitialize={true}
                    >
                    {
                        (props) => (
                            <Form>
                                <ErrorMessage name = "description" component="div" className="alert alert-warning"/>
                                <ErrorMessage name = "targetDate" component="div" className="alert alert-warning"/>
                                <fieldset className="form-group">
                                    <label>Description</label>
                                    <Field className="form-control" type="text" name="description"></Field>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Target Date</label>
                                    <Field className="form-control" type="date" name="targetDate"></Field>
                                </fieldset>
                                <button className="btn btn-success">Save</button>
                            </Form>
                            
                        )
                    }

                 </Formik>

             </div>
             </div>
        );
    }

}
export default TodoComponent