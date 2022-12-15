import React from "react";
import './edit-todo-modal.css';

export default class EditTodoModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title: this.props.title,
            status: this.props.status
        }
    }

    handleTitleChange = (event) => {
        this.setState({
            ...this.state,
            title: event.target.value
        })
    }

    handleStatusChange = (event) => {
        this.setState({
            ...this.state,
            status: event.target.value
        })
    }

    updateTodo = () => {
        const updatedTodo = {id: this.props.id, 
            title: this.state.title, 
            status: this.state.status}
        this.props.updateTodo(updatedTodo);
    }


    render(){
        const status = this.props.status;
        return(
            <div className="modal" tabIndex="-1" id={this.props.id}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title h3">Edit todo</h1>
                            <button type="button" 
                                className="btn-close" 
                                data-bs-dismiss="modal"
                                aria-label="close"></button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <label htmlFor={"todoTitle-" + this.props.id} 
                                    className="for-label">Title</label>
                                <input type="text" 
                                    className="form-control" 
                                    id={"todoTitle-" + this.props.id} 
                                    value={this.state.title}
                                    onChange={this.handleTitleChange} />
                            </div>
                            <div>
                                <label htmlFor={"todoStatus-" + this.props.id}
                                className="for-label">Status</label>
                                <select className="form-select"
                                    id={"todoStatus-"+ this.props.id}
                                    value={status}
                                    onChange={this.handleStatusChange}>
                                        <option value="pending">Pending</option>
                                        <option value="inProgress">In Progress</option>
                                        <option value="done">Done</option>
                                        <option value="trash">Deleted</option>
                                    </select>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={this.updateTodo} data-bs-dismiss="modal">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}