import React from "react";
import styled from "styled-components";
import TodoDraggable from "./todo-draggable";
import { Droppable } from "react-beautiful-dnd";
import './todo-drop-section.css';
import TodoDropSectionTrash from "./todo-drop-section-trash";

const Container = styled.div``;
const TodoList = styled.div`
    height: 100%;
`;

export default class TodoDropSection extends React.Component{
    
    render(){
        if(this.props.column.id === 'trash'){
            return <TodoDropSectionTrash {...this.props} removeTodos={this.props.removeTodos} />
        }
        let className = "col droppable";
        return (
            <Container className={className}>
                <h1 className="h3">{this.props.column.title}</h1>
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