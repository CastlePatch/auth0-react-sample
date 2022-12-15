import React from "react";
import './AddTodo.css';

export default class AddTodo extends React.Component{
    constructor(props){
        super(props);
        this.state = {todo: ""};
    }

    handleTodo = (event) => {
        this.setState({todo: event.target.value});
    }

    addTodo = (event) => {
        event.preventDefault();
        const title = this.state.todo;
        if(title === "")
            return;

        this.props.addTodo(title);
        this.setState({todo: ""});
    }

    render(){
        return (
            <form className="add-todo-section" onSubmit={this.addTodo}>
                <div className="row">
                    <label htmlFor="todo" className="col-12 form-label h3">Add Todo</label>
                    <input className="col form-control"
                        id="todo"
                        type="text" 
                        onChange={event => this.handleTodo(event)} 
                        value={this.state.todo} />
                    <button type="submit" className="col-2 btn btn-primary">Add</button>
                </div>
            </form>
        )
    }
}