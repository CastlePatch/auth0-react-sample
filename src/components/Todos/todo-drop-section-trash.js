import React from "react";
import styled from "styled-components";
import TodoDraggable from "./todo-draggable";
import { Droppable } from "react-beautiful-dnd";
import './todo-drop-section.css';

const Container = styled.div``;
const TodoList = styled.div`
    height: 100%;
`;
const Heading = styled.div`
    max-width: 100%;
    margin-bottom: 10px;
    padding-top: 10px;
`;

export default class TodoDropSectionTrash extends React.Component{
    
    removeTodos = () => {
        this.props.removeTodos();
    }

    render(){
        return (
            <Container className="col droppable">
                <Heading className="row">
                    <h1 className="col h3">{this.props.column.title}</h1>
                    <button className="col btn btn-primary" onClick={this.props.removeTodos}>Delete</button>
                </Heading>

                <Droppable droppableId={this.props.column.id}>
                    {(provided) => (
                    
                    <TodoList
                        ref={provided.innerRef}
                        {...provided.droppableProps}>
                            {this.props.todos.map((todo, index) => <TodoDraggable key={todo.id} todo={todo} index={index} /> )}
                            {provided.placeholder}
                    </TodoList>
                    )}
                </Droppable>
            </Container>
        )
    }
}