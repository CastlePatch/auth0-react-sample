import React from "react";
import NavigationButton from "./navigation-button";

export default class NavigationButtons extends React.Component{

    updatePageIndex = (number) => {
        this.props.updateIndex(number)
    }

    render(){
        const numberButtons = [];
        for( var i = 1; i <= this.props.pages; i++){
            numberButtons.push(<NavigationButton key={i} number={i} updatePageIndex={this.updatePageIndex} />);
        }

        return(
            <nav aria-label="All Todos navigation">
                    <ul className="pagination">
                        <li className="page-item">
                            <button className="page-link" onClick={() => this.updatePageIndex(this.props.pageIndex - 1)}>Previous</button>
                        </li>
                        {
                            numberButtons.map(button => (
                                button
                            ))
                        }
                        <li className="page-item">
                            <button className="page-link" onClick={() => this.updatePageIndex(this.props.pageIndex + 1)}>Next</button>
                        </li>
                    </ul>
                </nav>
        )
    }
}