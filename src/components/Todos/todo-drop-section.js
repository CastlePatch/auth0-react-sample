import React from "react";
import styled from "styled-components";
import TodoDraggable from "./todo-draggable";
import { Droppable } from "react-beautiful-dnd";

const Container = styled.div``;
const TodoList = styled.div``;

export default class TodoDropSection extends React.Component{
    render(){
        return (
            <Container>
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