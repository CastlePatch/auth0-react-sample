import React from "react";

export default class Grocerie extends React.Component{
    render(){
        return(
            <div className="row">
                <div className="col form-check">
                    <input type="checkbox" className="col form-check-input" />
                    <label htmlFor={this.props.name + "-check"} className="form-check-label">{this.props.name }</label>
                </div>
                <div className="col">{this.props.quantity} {this.props.type}</div>
            </div>
        )
    }
}