import React, { Suspense, Component } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css';
import innedflatmate from './ineedflatmate.jpg';
import innedflavtmate from './images.jpg';
import axios from 'axios';

import { Switch, Router, Route, IndexRoute, useRouterHistory } from 'react-router';
import {
    faCog, faAtlas, faCheck, faBriefcase, faBackward, faHome, faCoffee, faQuoteLeft, faUser
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
class Finishdeals extends Component {


    constructor(props) {
        super(props);
        this.state = {
            LoginUserID: this.props.UserID,
            OfferScreen: 0, //zero is message
            ObjectArray: [],
            PropertyArray: [],
            ShowCarousal: true,
            LoginUserID: this.props.UserID,
            AgentMobile: this.props.AgentMobile,
            AgentPic: this.props.AgentPic,
            AgentName: this.props.AgentName,
            AgentCompany: this.props.AgentComapny,
            companylogo: this.props.companylogo,
            selectedPropertyId:this.props.selectedPropertyId,
            loader: false,
            partyone: "",
            partytwo: "",
            dealamount: "",
            dealdate: "",





        }
        this.partyonechange = this.partyonechange.bind(this);
        this.partytwochange = this.partytwochange.bind(this);
        this.changedealamount = this.changedealamount.bind(this);
        this.changedealdate = this.changedealdate.bind(this);
        this.finishdealclick = this.finishdealclick.bind(this);


    }





    partyonechange(event) {
        this.setState({
            partyone: event.target.value,

        });
    }
    partytwochange(event) {
        this.setState({
            partytwo: event.target.value,

        });
    }
    changedealamount(event) {
        this.setState({
            dealamount: event.target.value,

        });
    }
    changedealdate(event) {
        this.setState({
            dealdate: event.target.value,

        });
    }


     finishdealclick() {


        var regurl = `https://userfunctionsapi.azurewebsites.net/api/HttpTriggerFinishdeal?code=ndZMLkOqIA3xyjAAMfWKjQUwlJ0O58FJgBrq1t7GcZBKaqWjvifZSQ==
        &partyone=${this.state.partyone}&partytwo=${this.state.partytwo}&amount=${this.state.dealamount}&dealdate=${this.state.dealdate}
        &userid=${this.props.UserID}&companyid=${this.props.AgentComapny}&companypic=${this.props.AgentPic}&agentname=${this.props.AgentName}&propertyid=${this.props.selectedPropertyId}&functiontype=add`;
        try {
            let res =  axios.post(regurl);
            this.setState({
                loader: false,
            });
            this.props.finishdealcomeback();

        } catch (error) {
        }
    }



    render() {
        return (
            <div className="container-fluid myfidvs">

                <div className=" myrow">
                    <div className=" myrow"><h3>hurray!! Deal finish - You can earn up to 10% of each Sale / Transaction</h3></div>

                    <div className="row myrow">
                        <div className="col-sm-6 ">
                            <h1>Party -1 </h1>

                                <input type="name" className="form-control" onChange={this.partyonechange} placeholder="Emirates Id">
                                </input>


                        </div>

                        <div className="col-sm-6">
                            <h1>Party 2</h1>
                                <input type="name" className="form-control"
                                onChange={this.partytwochange} placeholder="Emirates Id">
                                </input>


                        </div>


                    </div>

                    <div className="row myrow">
                    <div className="col-sm-6">
                            <input type="name" className="form-control" onChange={this.changedealamount} placeholder="Deal Amount">
                            </input>


                        </div>

                        <div className="col-sm-6">
                            <input type="name" className="form-control" onChange={this.changedealdate} placeholder="Deal Date">
                            </input>


                        </div>
                    </div>
                    <hr></hr>
                    <div className="row myrow">
                    <div className="col-sm-6"></div>
                    <div className="col-sm-6">
                        <Button className="mybuttons" onClick={this.finishdealclick} >Finih deal</Button>
                    </div>
                    </div>


                </div>

                {
                    this.state.loader == true &&
                    <div className="loader"></div>
                }
            </div>


        );
    }

}







export default Finishdeals;

