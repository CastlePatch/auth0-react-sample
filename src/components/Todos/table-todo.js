import React from "react";
import DeleteTodoModal from "./delete-todo-modal";
import EditTodoModal from "./edit-todo-modal";
import './table-todo.css';

export default class TableTodo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title: this.props.title,
            status: this.props.status
        }
    }

    handleChangeStatus = (event) => {
        const newValue = event.target.value;
        this.setState({
            status: newValue
        });

        const updatedTodo = {id: this.props.id, title: this.props.title, status: newValue};
        this.updateTodo(updatedTodo);
    }

    updateTodo = (updatedTodo) => {
        const oldTodo = {id: this.props.id, title: this.props.title, status: this.props.status};        
        this.props.updateTodo(oldTodo, updatedTodo);
    }

    deleteTodo = (deletedTodoId) => {
        this.props.deleteTodo(deletedTodoId);
    }

    render(){
        return(
            <React.Fragment>
            <tr>
                <th scrope="row">{this.state.title}</th>
                <td>
                    <select className="form-select" 
                        aria-label="status" 
                        value={this.props.status} 
                        onChange={(event) => this.handleChangeStatus(event)}>
                        <option value="pending">Pending</option>
                        <option value="inProgress">In Progress</option>
                        <option value="done">Done</option>
                        <option value="trash">Deleted</option>
                    </select>
                </td>
                <td>
                    <button type="button" 
                    className="btn btn-warning edit-button"
                    data-bs-toggle="modal" data-bs-target={"#" + this.props.id}>Edit</button>
                    <button type="button"
                    className="btn btn-danger edit-button"
                    data-bs-toggle="modal" data-bs-target={"#delete-" + this.props.id}>Delete</button>
                    <EditTodoModal id={this.props.id} title={this.props.title} status={this.props.status} updateTodo={this.updateTodo} />
                    <DeleteTodoModal id={this.props.id} deleteTodo={this.deleteTodo}  />
                </td>
            </tr>
            </React.Fragment>
        )
    }
}