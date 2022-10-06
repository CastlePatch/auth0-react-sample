import React, { Component } from "react";
import styled from "styled-components";
import TodoDropSection from "./todo-drop-section";
import { DragDropContext } from "react-beautiful-dnd";
import initialData from "./initialData";
import AddTodo from "./AddTodo";
import AllTodos from "./allTodos";

const Container = styled.div``;

export default class TodoSelection extends Component{
    constructor(props){
        super(props);
        this.state = this.loadData();
        this.updateTodo = this.updateTodo.bind(this);
    }
    
    loadData = () => {
        let todos = localStorage.getItem('todos');
        if(todos === null)
            todos = initialData;
        else
            todos = JSON.parse(todos);
        return todos;
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
            this.saveData();
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

        // Update the status of the Todo dragged
        const newTodoIds = {...this.state.todos};
        newTodoIds[draggableId].status = destination.droppableId;

        // Update the state and save them
        const newState = {
            ...this.state,
            columns: {
                ...this.state.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish
            }
        }

        this.setState(newState);
        this.saveData(newState);
        return;
    }

    addTodo = title => {
        const id = "todo-" + Object.getOwnPropertyNames(this.state.todos).length;
        const todo = {id: id, title: title, status: 'pending'};

        //Add to Todo List
        const allTodos = JSON.parse(JSON.stringify({...this.state.todos, [id]: todo}));
        
        //Add to Pending column todo Ids
        const newTodoIds = Array.from(this.state.columns.pending.todoIds);
        newTodoIds.push(id);

        const newPendingColumn = {
            ...this.state.columns.pending,
            todoIds: newTodoIds
        };

        const newState = {
            ...this.state,
            todos: allTodos,
            columns: {
                ...this.state.columns,
                pending: newPendingColumn
            }
        }

        this.setState(newState);
        this.saveData(newState);
        return;
    }

    // Save the data
    saveData = (state) => {
        // Data to string
        const data = JSON.stringify(state);
        localStorage.setItem('todos', data);
    }

    removeTodos = () => {
        //Create new array of the trash Ids
        const newColumnIds = [];

        //Update the status of the todos to permaDeleted
        const permaDeleteIds = Array.from(this.state.columns.trash.todoIds);
        const allTodos = JSON.parse(JSON.stringify(this.state.todos));

        for(var index = 0; index < permaDeleteIds.length; index++){
            allTodos[permaDeleteIds[index]].status = "permaDeleted"
        }

        // Set new state to remove the todo Ids from the trash
        const newState = {
            ...this.state,
            todos: allTodos,
            columns: {
                ...this.state.columns,
                trash: {
                    ...this.state.columns.trash,
                    todoIds: newColumnIds
                }
            }
        }

        this.setState(newState);
        this.saveData(newState);
    }

    async updateTodo(oldTodo, updatedTodo){
        // Copy the todos
        const newTodos = JSON.parse(JSON.stringify(this.state.todos));
        
        // Check if the todo Id exists
        if(newTodos[updatedTodo.id] === undefined){
            return;
        }

        // Check the column that it was originally in
        const oldColumn = JSON.parse(JSON.stringify(this.state.columns));
        const oldColumnTodoIds = oldColumn[oldTodo.status].todoIds;
        for(var i = 0; i < oldColumnTodoIds.length; i++){
            if(oldColumnTodoIds[i] === oldTodo.id)
                oldColumnTodoIds.splice(i, 1);
        }

        // Update the column that it moved to
        let newColumn = JSON.parse(JSON.stringify(this.state.columns));
        if(oldTodo.status === updatedTodo.status){
            newColumn = oldColumn;
        }
        
        const newColumnTodoIds = newColumn[updatedTodo.status].todoIds;
        newColumnTodoIds.push(updatedTodo.id);

        // Update the todo information
        newTodos[updatedTodo.id].title = updatedTodo.title;
        newTodos[updatedTodo.id].status = updatedTodo.status;
        
        // Save the todo
        let newState = {};
        if(oldTodo.status === updatedTodo.status){
            newState = {
                ...this.state,
                todos: newTodos,
                columns: {
                    ...this.state.columns,
                    [updatedTodo.status]: {
                        ...this.state.columns[updatedTodo.status],
                        todoIds: newColumnTodoIds
                    }
                }
                
            };
        } else {
            newState = {
                ...this.state,
                todos: newTodos,
                columns: {
                    ...this.state.columns,
                    [oldTodo.status]: {
                        ...this.state.columns[oldTodo.status],
                        todoIds: oldColumnTodoIds
                    },
                    [updatedTodo.status]: {
                        ...this.state.columns[updatedTodo.status],
                        todoIds: newColumnTodoIds
                    }
                }
                
            };
        }
        await this.setState(newState);
        this.saveData(newState);
    }

    permaDeleteTodo = (todoId) => {
            // Get all the todos
            const allTodos = JSON.parse(JSON.stringify(this.state.todos))
    
            // Update the todo
            allTodos[todoId].status = "permaDeleted";
            
            // Update state and save
            const newState = {
                ...this.state,
                todos: allTodos
            }
            
            this.setState(newState);
            this.saveData(newState);
    }
    render = () => {
        if(this.state.todos === null)
            return null;

        const allTodos = this.state.todos;
        const allColumns = this.state.columns;
        return (
        <React.Fragment>
            <AddTodo addTodo={this.addTodo} />
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Container className="row row-cols-3">
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
            <AllTodos todos={allTodos} columns={allColumns} updateTodo={this.updateTodo} permaDeleteTodo={this.permaDeleteTodo} />
       </React.Fragment>
       )
    }
}