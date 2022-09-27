import React, { Component } from "react";
import styled from "styled-components";
import TodoDropSection from "./todo-drop-section";
import { DragDropContext } from "react-beautiful-dnd";

const Container = styled.div``;

export default class TodoSelection extends Component{
    state = {
        todos: {
            'todo-1': {id: 'todo-1', title: 'first'},
            'todo-2': {id: 'todo-2', title: 'second'},
            'todo-3': {id: 'todo-3', title: 'third'},
            'todo-4': {id: 'todo-4', title: 'fourth'},
        },
        columns: {
            'pending':  {
                id: 'pending',
                title: 'Pending',
                todoIds: ['todo-4', 'todo-3']
            }
            // 'inProgress': {
            //     id: 'inProgress',
            //     title: 'In Progress',
            //     todosIds: ['todo-2']
            // },
            // 'done': {
            //     id: 'done',
            //     title: 'Done',
            //     todosIds: ['todo-1']
            // }
        },
        columnOrder: ['pending']
    };

    onDragEnd = result => {
        //DO somehting
    }

    render(){
       return (
        <DragDropContext onDragEnd={this.onDragEnd}>{
            this.state.columnOrder.map(columnId => {
            const column = this.state.columns[columnId];
            const todos = column.todoIds.map(todoId => this.state.todos[todoId]);
            return <TodoDropSection key={column.id} column={column} todos={todos} />;
           })}
       </DragDropContext>
       )
    }
}