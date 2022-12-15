import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import './todo-draggable.css';


const Container = styled.div`
    background-color: white;
`;

export default class TodoDraggable extends React.Component{
    render(){
        return (
            <Draggable draggableId={this.props.todo.id} index={this.props.index} className="draggable-todo">
                {(provided) => (
                <Container
                    className="draggable-todo"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    {this.props.todo.title}
                    
                </Container>)}
            </Draggable>
        )
    }
}