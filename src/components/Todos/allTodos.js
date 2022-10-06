import React from "react";
import NavigationButtons from "../Utilities/navigation-buttons";
import TableTodo from "./table-todo";
import './allTodos.css';

export default class AllTodos extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            pageIndex: 1,
            displayTodos: [],
            todos: this.props.todos,
            orderByTitleStatus: "none",
            orderByTitleIcon: "bi bi-dash",
            orderByStatusStatus: "none",
            orderByStatusIcon: "bi bi-dash"
        }
        this.updatePageIndex = this.updatePageIndex.bind(this);
        this.updateTodo = this.updateTodo.bind(this);
    }

    displayTodos = () => {
        // Order the list
        let allTodos = [];
        for(const todo in this.props.todos){
            const todoData = this.props.todos[todo];
            for(const column in this.props.columns){
                const todoIds = this.props.columns[column].todoIds;
                todoIds.map(id => {
                    if(id === todoData.id){
                        todoData.status = this.props.columns[column].id;
                        return true;                  
                    }
                    return false;
                })
            }
            if(todoData.status === undefined)
                todoData.status = 'trash';

            //Don't add to the list if it was Perma Deleted
            if(todoData.status !== "permaDeleted")
                allTodos.push(todoData);
        }
        
        let orderedTodos = allTodos.reverse();

        // order the todos by Title
        if(this.state.orderByTitleStatus === "asc"){
            orderedTodos.sort((a, b) => a.title > b.title ? 1 : -1)
        } else if(this.state.orderByTitleStatus === "des"){
            orderedTodos.sort((a, b) => a.title < b.title ? 1 : -1)
        }

        // order the todos by Statu
        if(this.state.orderByStatusStatus === "asc"){
            orderedTodos.sort((a, b) => a.status > b.status ? 1 : -1)
        } else if(this.state.orderByStatusStatus === "des"){
            orderedTodos.sort((a, b) => a.status < b.status ? 1 : -1)
        }

        // Get the 10 items to display
        const startIndex = (this.state.pageIndex - 1) * 10;
        orderedTodos = orderedTodos.splice(startIndex, startIndex + 10)

        return orderedTodos;
    }

    async updatePageIndex(newIndex){
        //Max pages
        const numOfTodos = Object.keys(this.props.todos).length;
        let maxPages = Math.floor(numOfTodos / 10);
        if(numOfTodos % 10 !== 0){
            maxPages += 1
        }

        if(newIndex <= 1)
            newIndex = 1;
        else if(newIndex >= maxPages){
            newIndex = maxPages;
        }

        await this.setState({
            pageIndex: newIndex
        });
    }
    
    orderByTitle = () => {
        let newOrder = "none";
        let newIcon = "bi bi-dash";

        if(this.state.orderByTitleStatus === "none"){
            newOrder = "asc";
            newIcon= "bi bi-arrow-up-short";
        } else if (this.state.orderByTitleStatus === "asc"){
            newOrder = "des";
            newIcon= "bi bi-arrow-down-short";
        }

        this.setState({
            ...this.state,
            orderByTitleStatus: newOrder,
            orderByTitleIcon: newIcon
        });
    }

    orderByStatus = () => {
        let newOrder = "none";
        let newIcon = "bi bi-dash";

        if(this.state.orderByStatusStatus === "none"){
            newOrder = "asc";
            newIcon= "bi bi-arrow-up-short";
        } else if (this.state.orderByStatusStatus === "asc"){
            newOrder = "des";
            newIcon= "bi bi-arrow-down-short";
        }

        this.setState({
            ...this.state,
            orderByStatusStatus: newOrder,
            orderByStatusIcon: newIcon
        });
    }

    async updateTodo(oldTodo, updatedTodo){
        await this.props.updateTodo(oldTodo, updatedTodo);
    }

    deleteTodo = (todoId) => {
        this.props.permaDeleteTodo(todoId);
    }

    render(){
        const numOfTodos = Object.keys(this.state.todos).length;
        let pages = Math.floor(numOfTodos / 10);
        if(numOfTodos % 10 !== 0){
            pages += 1
        }

        const displayTodos = this.displayTodos();

        return(
            <React.Fragment>
                <h1 className="h2 all-todos-title">All Todos</h1>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Title
                                <button className={this.state.orderByTitleIcon + " order-buttons"}
                                    aria-label="Order Todo's by title"
                                    onClick={this.orderByTitle}></button>
                            </th>
                            <th scope="col">Status
                                <button className={this.state.orderByStatusIcon + " order-buttons"}
                                    aria-label="Order Todo's by status"
                                    onClick={this.orderByStatus}></button>
                            </th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            displayTodos.map((todo) => {
                                return <TableTodo key={todo.id} id={todo.id} title={todo.title} status={todo.status} updateTodo={this.updateTodo} deleteTodo={this.deleteTodo} />
                            })
                        }
                    </tbody>
                </table>
                <NavigationButtons pages={pages} updateIndex={this.updatePageIndex} pageIndex={this.state.pageIndex} />
            </React.Fragment>
        )
    }
}