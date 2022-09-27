import React, { Component } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const Container = styled.div``;

export default class TodoSelection extends Component{

    onDragEnd = result => {
        //DO somehting
    }

    render(){
       return(
        <DragDropContext
            onDragEnd={this.onDragEnd}>
        <div className="row">
            <div className="col-4">
                <Droppable droppableId="pending">
                    {(provided) => (
                        <Container {...provided.droppableProps} ref={provided.innerRef} >
                        <Draggable draggableId="1" index={1}>
                            {(provided) => {
                                return <Container {...provided.draggableProps} 
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}>
                                        Draggable
                                    </Container>
                            }}
                        </Draggable>
                        {provided.placeholder}
                        </Container>
                    )}
                </Droppable>
            </div>
            <div className="col-4">
                <Droppable droppableId="in-progress">
                    {(provided) => (
                        <Container {...provided.droppableProps} ref={provided.innerRef}>
                            Second droppable
                            {provided.placeholder}
                        </Container>
                    )}
                </Droppable>
            </div>
            <div className="col-4">

            </div>
        </div>
        </DragDropContext>
       ) 
    }
}