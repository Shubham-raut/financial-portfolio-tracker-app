import React, { Component } from 'react';
import Modal from '../../common/Modal/Modal';
import "./AddStocks.css";

class AddStocks extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        let companyArray = [];
        let showMessage = "";
        if (this.props.companies.length > 2) {
            companyArray = this.props.companies.map((item, index) => {
                const { symbol, name } = item;//Destructuring
                return (
                    <li key={symbol}>
                        <button className="StockButton" onClick={() => this.props.addStockHandler(index)}>{symbol}</button>
                        <span className="companyName">{name}</span>
                    </li>
                )
            })
        }

        else {
            showMessage =
                <div className="msg">
                    <h3>
                        You cannot add more than 5 Stocks at a time,Remove
                        a stock if you want to add a new stock.
                      </h3>
                </div>
        }

        return (
            <div className="AddStocks">
                <h2 className="secondaryHead">Add stocks to My stocks</h2>
                {
                    (this.props.companies.length > 0) ?
                        (this.props.companies.length > 2) ?
                            <ul id="companyList">
                                {companyArray}
                            </ul> :
                            <div>{showMessage}</div> :
                        <h2>Loading...</h2>
                }

                {
                    this.props.showModal ?
                        <Modal
                            id={this.props.id}
                            companyName={this.props.companyName}
                            companySymbol={this.props.companySymbol}
                            addDatatoFirebase={this.props.addDatatoFirebase}
                            showModal={this.props.showModal}
                            close={this.props.close} /> :
                        null
                }
            </div>
        );
    }
}

export default AddStocks;