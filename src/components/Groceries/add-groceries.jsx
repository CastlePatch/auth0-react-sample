import React from "react";

export default class AddGroceries extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: "",
            quantity: 0,
            type: "pz"
        }
    }

    handleNameChange = (event) => {
        this.setState(
            {...this.state,
             name: event.target.value }
        )
    }

    handleQuantityChange = (event) => {
        this.setState(
            {...this.state,
            quantity: event.target.value}
        )
    }

    handleTypeChange = (event) => {
        this.setState(
            {...this.state,
             type: event.target.value }
        )
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const grocerie = {name: this.state.name.trim(), quantity: +this.state.quantity, type: this.state.type};
        this.props.addGrocerie(grocerie);

        this.setState({
            name: "",
            quantity: 0,
            type: "pz"
        })
    }

    render(){
        return(
            <form className="row">
                <div className="col-4">
                    <label htmlFor="name" className="form-label h5">Name</label>
                    <input className="form-control"
                        type="text"
                        id="name"
                        value={this.state.name} 
                        onChange={this.handleNameChange} />
                </div>
                <div className="col-2">
                    <label htmlFor="quantity" className="form-label h5">Quantity</label>
                    <input className="form-control"
                        type="number"
                        id="quantity"
                        value={this.state.quantity} 
                        onChange={this.handleQuantityChange} />
                </div>
                <div className="col-2">
                    <label htmlFor="type" className="form-label h5">Type</label>
                    <select className="form-select"
                        id="type"
                        value={this.state.type}
                        onChange={this.handleTypeChange}>
                            <option value="pz">Pieces</option>
                            <option value="ml">Milliliters</option>
                            <option value="l">Liters</option>
                            <option value="oz">Ounces</option>
                            <option value="cup">Cups</option>
                    </select>
                </div>
                <button className="col btn btn-primary" type="submit" onClick={this.handleSubmit}>Add</button>
            </form>
        )
    }
}