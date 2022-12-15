import TodoSelection from "../todo-selection";
import TodoDropSection from "./todo-drop-section";
import AddTodo from "./AddTodo";
import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";
const Container = styled.div``;

export default class KanbanBoard extends TodoSelection{
    render = () => {
        if(this.state.todos === null)
            return null;

        const allTodos = this.state.todos;
        const allColumns = this.state.columns;
        return (
        <React.Fragment>
            <AddTodo addTodo={this.addTodo} />
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Container className="row row-col-3 gap">
                    {this.state.columnOrder.map(columnId => {
                    const column = this.state.columns[columnId];
                    let todos = [];
                    if(column.todoIds !== undefined){
                        todos = column.todoIds.map(
                            todoId => this.state.todos[todoId]
                        );
                    }

                    return <TodoDropSection key={column.id} column={column} todos={todos} removeTodos={this.removeTodos} />;
                    })}
                </Container>
            </DragDropContext>
       </React.Fragment>
       )
    }
}