import TodoSelection from "../todo-selection";
import AddTodo from "../Kanban/AddTodo";
import React from "react";
import AllTodos from "./allTodos";
import styled from "styled-components";
const Container = styled.div``;

export default class TodosTable extends TodoSelection{
    render = () => {
        if(this.state.todos === null)
            return null;

        const allTodos = this.state.todos;
        const allColumns = this.state.columns;
        return (
            <React.Fragment>
                <AddTodo addTodo={this.addTodo} />
                <AllTodos todos={allTodos} columns={allColumns} updateTodo={this.updateTodo} permaDeleteTodo={this.permaDeleteTodo} />
            </React.Fragment>

       )
    }
}