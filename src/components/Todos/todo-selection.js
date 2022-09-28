import React, { Component } from "react";
import styled from "styled-components";
import TodoDropSection from "./todo-drop-section";
import { DragDropContext } from "react-beautiful-dnd";
import initialData from "./initialData";

const Container = styled.div``;

export default class TodoSelection extends Component{
    constructor(props){
        super(props);
        this.state = initialData;
    }
    

    onDragEnd = result => {
        const { destination, source, draggableId } = result;

        if(!destination) {
            return;
        }

        if(destination.droppableId === source.droppableId &&
            destination.index === source.index){
                return;
            }

        const start = this.state.columns[source.droppableId];
        const finish = this.state.columns[destination.droppableId];
        if(start === finish){
            const newTodoIds = Array.from(start.todoIds);

            newTodoIds.splice(source.index, 1);
            newTodoIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...start,
                todoIds: newTodoIds
            };

            const newState = {
                ...this.state,
                columns: {
                    ...this.state.columns,
                    [newColumn.id]: newColumn
                }
            }

            this.setState(newState);       
            return;     
        }

        const startTodoIds = Array.from(start.todoIds);
        startTodoIds.splice(source.index, 1);
        const newStart = {
            ...start,
            todoIds: startTodoIds,
        }

        const finishTodoIds = Array.from(finish.todoIds);
        finishTodoIds.splice(destination.index, 0, draggableId);

        const newFinish = {
            ...finish,
            todoIds: finishTodoIds
        }
        const newState = {
            ...this.state,
            columns: {
                ...this.state.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish
            }
        }
        this.setState(newState);
        return;
    }

    render = () => {
        if(this.state.todos === null)
            return null;
        console.log(this.state);

       return (
        <DragDropContext onDragEnd={this.onDragEnd}>
            <Container>
                {this.state.columnOrder.map(columnId => {
                    console.log(columnId)
                const column = this.state.columns[columnId];
                console.log(column);
                let todos = [];
                if(column.todoIds !== undefined){
                    todos = column.todoIds.map(
                        todoId => this.state.todos[todoId]
                    );
                }

                return <TodoDropSection key={column.id} column={column} todos={todos} />;
            })}
           </Container>
       </DragDropContext>
       )
    }
}