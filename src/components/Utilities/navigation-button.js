import React from "react";

export default class NavigationButton extends React.Component{

    updatePageIndex = () => {
        this.props.updatePageIndex(this.props.number);
    }

    render(){
        return(<li className="page-item"><button className="page-link" onClick={this.updatePageIndex}>{this.props.number}</button></li>)
    }
}