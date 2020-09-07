import React, { Component } from 'react';
import "./MyStocks.css"
import ApiCall from './ApiCall';

class MyStocks extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        let renderArray = [];
        let showMessage = "";
        if (this.props.myStocks.length !== 0) {
            renderArray = this.props.myStocks.map((item, index) => {
                const { Buy_Price, Company_Symbol, Company_name, No_of_Shares } = item;
                return (
                    <tr key={index}>
                        <td>{Company_Symbol}</td>
                        <td>{Company_name}</td>
                        <td>{No_of_Shares}</td>
                        <td>{Buy_Price}</td>
                        <ApiCall
                            symbol={item.Company_Symbol}
                            buyprice={item.Buy_Price}
                            share={item.No_of_Shares} />
                        <td><button className="StopTrackingBtn" onClick={() => this.props.stopTrackingHandler(index)}>Stop tracking</button></td>
                    </tr>
                )
            });
        }
        else {
            showMessage = <h2>No stocks have been selected... Please Add one by clicking the button below.</h2>;
        }


        return (
            <div className='MyStocks'>
                <h2 className="secondaryHead">My Stocks</h2>
                {(this.props.myStocks.length !== 0) ?
                    <div className="tableContainer">
                        <table className="MyStocksTable">
                            <thead>
                                <tr className='headRow'>
                                    <th>Stock symbol</th>
                                    <th>Stock name</th>
                                    <th>No.of shares</th>
                                    <th>Buy price</th>
                                    <th>Current price</th>
                                    <th>Profit/Loss</th>
                                    <th>Tracking Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderArray}
                            </tbody>

                        </table>
                    </div> :
                    <div>{showMessage}</div>
                }
            </div>
        );
    }
}

export default MyStocks;