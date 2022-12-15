import React from "react";

export default class DeleteTodoModal extends React.Component{

    deleteTodo = () => {
        this.props.deleteTodo(this.props.id);
    }

    render(){
        return(
            <div className="modal" tabIndex="-1" id={"delete-"+this.props.id}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title h3">Delete todo</h1>
                            <button type="button" 
                                className="btn-close" 
                                data-bs-dismiss="modal"
                                aria-label="close"></button>
                        </div>
                        <div className="modal-body">
                            <p>This will delete the Todo permanently.</p>
                            <p>Are you sure you want to delete it?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary" onClick={this.deleteTodo} data-bs-dismiss="modal">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}