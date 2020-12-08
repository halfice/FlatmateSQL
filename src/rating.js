import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import 'bootstrap/dist/css/bootstrap.min.css';
import Ratinkg from 'react-rating'



import BeautyStars from "beauty-stars";

export class Rating extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 2,
        }
    }
    shoonChangewsp() {
        this.setState({
            value: 4
        });
    }

    render() {
        return (



            <div className="container-fluid ">
                <div className="row">
                    <div className="col-sm-4">

                    </div>
                    <div className="col-sm-4">
                        <Ratinkg
                            emptySymbol="fa fa-star-o fa-2x"
                            fullSymbol="fa fa-star fa-2x"
                            fractions={2}
                        />




                    </div>
                    <div className="col-sm-4"></div>
                </div>
            </div>



        );
    }

}

