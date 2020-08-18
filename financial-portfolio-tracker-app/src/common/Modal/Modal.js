import React, { Component } from 'react';
import './Modal.css'
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (

            (this.props.showModal) ?
                <div>
                    <Backdrop />
                    <div className="AddStockForm">
                        <button className="closeBtn" onClick={this.props.close}>X</button>
                        <h2> Add {this.props.companyName} to My Stocks</h2>
                        <div className="stockItem">
                            <p>Company Name</p>
                            <div className="cpName">{this.props.companyName}</div>
                        </div>

                        <div className="stockItem">
                            <p>No. of Shares</p>
                            <input type="number" onChange={this.checkNumber} name="shares" id="noShares" placeholder="No.of Shares" />
                        </div>

                        <div className="stockItem">
                            <p>Buy Price</p>
                            <input type="number" onInput={this.checkPrice} name="price" id="buyPrice" placeholder="Buy Price" />
                        </div>

                        <div className="stockItem">
                            <p>Buy Date</p>
                            <input type="date" onInput={this.checkDate} name="date" id="buyDate" />
                        </div>
                        <button onClick={(a, b, c) => this.props.addDatatoFirebase(this.props.companyName, this.props.companySymbol, this.props.id)} className="AddButton" id="AddBtn">Add</button>
                    </div>
                </div> :
                null
        )
    }
}

export default Modal;