import React, { Component } from 'react';
import axios from 'axios';
import './Home.css';
import MyStocks from '../../components/MyStocks/MyStocks';
import AddStocks from '../../components/AddStocks/AddStocks';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            companies: [],
            myStocks: [],

            id: null,
            companyName: null,
            companySymbol: null
        }
    }

    componentDidMount() {
        this.getCompanies();
        this.getMystocks();
    }

    getCompanies = () => {
        console.log("Final Companies update function called");
        axios
            .get("https://financial-portfolio-trac-80bb4.firebaseio.com/companies.json")
            .then((response) => {
                const newCompanies = [];
                for (let i in response.data) {
                    newCompanies.push({ ...response.data[i], id: i });
                }
                this.setState({ companies: newCompanies })
            })
            .catch(error => console.log(error));

    }

    getMystocks = () => {
        console.log("Final myStocks update function called");
        axios
            .get("https://financial-portfolio-trac-80bb4.firebaseio.com/mystocks.json")
            .then((response) => {
                const newMystocks = [];
                for (let i in response.data) {
                    newMystocks.push({ ...response.data[i], id: i })
                }
                this.setState({ myStocks: newMystocks })
            })
            .catch(error => console.log(error));
    }

    addStockHandler = (index) => {
        let id = this.state.companies[index].id;
        let currentCompany = this.state.companies[index].name;
        let currentCompanySymbol = this.state.companies[index].symbol;

        this.setState({
            showModal: true,
            id: id,
            companyName: currentCompany,
            companySymbol: currentCompanySymbol
        });
    }

    addDatatoFirebase = (company_name, company_symbol, id) => {
        let noofshares = document.getElementById("noShares").value;
        let buyPrice = document.getElementById("buyPrice").value;
        let buyDate = document.getElementById("buyDate").value;

        if (noofshares > 0 && buyPrice.length > 0 && buyDate.length > 0) {
            this.setState({ showModal: false });
            //adding data to mystocks
            axios
                .post("https://financial-portfolio-trac-80bb4.firebaseio.com/mystocks.json", {
                    Company_Symbol: company_symbol,
                    Company_name: company_name,
                    No_of_Shares: noofshares,
                    Buy_Price: buyPrice
                })
                .then((response) => {
                    if (response.statusText === "OK") {
                        console.log(company_symbol, "Stock Added to mystocks");
                        this.getMystocks();
                    }
                })
                .catch(error => console.log(error));


            //removing same data from companies
            axios.delete(`https://financial-portfolio-trac-80bb4.firebaseio.com/companies/${id}.json`)
                .then((response) => {
                    console.log(company_symbol, "Stock Deleted from companies");
                    if (response.statusText === "OK") {
                        this.getCompanies();
                    }
                    this.setState({ showModal: false })
                })
                .catch(error => console.log(error));
        }
        else {
            alert('please fill correct data before submitting')
        }
    }

    removeStock = (index) => {
        // console.log(index);
        let id = this.state.myStocks[index]["id"];
        console.log(index, id)
        let companyName = this.state.myStocks[index]["Company_name"];
        let companySymbol = this.state.myStocks[index]["Company_Symbol"];

        //adding to companies
        axios.post('https://financial-portfolio-trac-80bb4.firebaseio.com/companies.json', {
            name: companyName,
            symbol: companySymbol
        })
            .then((response) => {
                if (response.statusText === "OK") {
                    console.log(companySymbol, "Stock Added to companies");
                    this.getCompanies();
                }
            })
            .catch(error => console.log(error));


        //removing from my stocks
        axios.delete(`https://financial-portfolio-trac-80bb4.firebaseio.com/mystocks/${id}.json`)
            .then((response) => {
                console.log(companySymbol, "Stock Deleted from myStock");
                if (response.statusText === "OK") {
                    this.getMystocks();
                }
                // this.setState({ showModal: false })
            })
            .catch(error => console.log(error));


    }

    closeAddModel = () => {
        this.setState({ showModal: !this.state.showModal })
    }

    render() {
        return (
            <div className="container">

                <div className="header" >Finance Portfolio Tracker</div>

                <MyStocks myStocks={this.state.myStocks}
                    stopTrackingHandler={(index) => this.removeStock(index)} />

                <AddStocks
                    companies={this.state.companies}
                    showModal={this.state.showModal}
                    addStockHandler={this.addStockHandler}
                    addDatatoFirebase={this.addDatatoFirebase}
                    close={this.closeAddModel}
                    id={this.state.id}
                    companyName={this.state.companyName}
                    companySymbol={this.state.companySymbol} />

            </div>
        );
    }
}

export default Home;