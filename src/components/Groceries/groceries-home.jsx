import React from "react";
import AddGroceries from "./add-groceries";
import Grocerie from "./grocerie";

export default class GroceriesHome extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            groceries: []
        }
    }

    addGrocerie = (grocerie) => {
        const newGrocerieList = Array.from(this.state.groceries);
     
        for (let item in newGrocerieList){
            if(newGrocerieList[item].name === grocerie.name && 
                newGrocerieList[item].type === grocerie.type){
                    grocerie.quantity = newGrocerieList[item].quantity + grocerie.quantity;
                    const index = newGrocerieList.map(object => object.name).indexOf(grocerie.name);
                    newGrocerieList.splice(index, 1)
                }
        }

        newGrocerieList.push(grocerie);
        newGrocerieList.sort((a, b) => a.name > b.name ? 1 : -1);

        this.setState({
            ...this.state,
            groceries: newGrocerieList
        })
    }

    render(){
        return (
            <React.Fragment>      
                <AddGroceries addGrocerie={this.addGrocerie} />
                {this.state.groceries.map((grocerie, index) => {
                    return <Grocerie key={index + "-" + grocerie.name} 
                        name={grocerie.name}
                        quantity={grocerie.quantity}
                        type={grocerie.type} />
                    }
                )}
            </React.Fragment>
        )
    }
}