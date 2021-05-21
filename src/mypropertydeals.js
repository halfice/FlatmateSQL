
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
class mypropertydeals extends Component {

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
            loader: false,
            partyone: "",
            partytwo: "",
            dealamount: "",
            dealdate: "",





        }

        this.getmydeals = this.getmydeals.bind(this);


    }


    componentDidMount() {
        this.getmydeals();
    }


   async  getmydeals() {

    var _Response = null;
    var TempUserProfileExisits = 0;
    var TempDivCounter = 0;
    var retrueneddata = [];
    var TempCarousalData = [];


        var regurl = `https://userfunctionsapi.azurewebsites.net/api/HttpTriggerFinishdeal?code=ndZMLkOqIA3xyjAAMfWKjQUwlJ0O58FJgBrq1t7GcZBKaqWjvifZSQ==&partyone=${this.state.partyone}&partytwo=${this.state.partytwo}&amount=${this.state.dealamount}&dealdate=${this.state.dealdate}
        &userid=${this.props.UserID}&companyid=${this.props.AgentComapny}&companypic=${this.props.AgentPic}&agentname=${this.props.AgentName}&functiontype=get`;
        try {


            let res = await axios.post(regurl);
            var xcount = 10;
            for (var i = 0; i < res.data.length; i++) {
                xcount = xcount + 1;
                var obs = {
                    'dealid': res.data[i].dealid,//.metadata.colName,
                    'partyone': res.data[i].partyone,//metadata.colName,
                    'partytwo': res.data[i].partytwo,//.metadata.colName,
                    'amount': res.data[i].amount,//.metadata.colName,
                    'key': xcount,
                    'dealdate': res.data[i].dealdate,
                    'propertyid': res.data[i].propertyid,//.metadata.colName,

                }
                retrueneddata.push(obs);


            }
            this.setState({
                ObjectArray: retrueneddata,
                loader: false,
            });

        } catch (error) {

        }
    }



    render() {

        var SubProjectArrays = this.state.ObjectArray.map((item, i) => {
            return (
                <div key={item["key"]}>
                    {
                        i == 0 &&
                        <div className="row classforgrid">
                            <div className="col-sm-2 gridheadher ">
                                <div className="gridheadher">
                                    <h3>partyone</h3>
                                </div>
                            </div>
                            <div className="col-sm-2 gridheadher">
                                <div className="">
                                    <h3>Location</h3>
                                </div>
                            </div>
                            <div className="col-sm-2 gridheadher">
                                <div className="">
                                    <h3>Message</h3>
                                </div>
                            </div>
                            <div className="col-sm-2 gridheadher">

                            </div>


                        </div>
                    }
                    <div className="row classforgrid">
                        <div className="col-sm-2 gridcss">
                            <div className="">
                                {item["partyone"] + "-" + item["partyone"] + "-" + item["partyone"]}
                            </div>
                        </div>
                        <div className="col-sm-2 gridcss">
                            <div className="">
                                {item["partyone"]}
                            </div>
                        </div>
                        <div className="col-sm-2 gridcss">
                            <div className="">
                                {item["partyone"]}
                            </div>
                        </div>



                    </div>


                </div>
            );
        });


        return (
            <div className="container-fluid myfidvs">

                <div className=" myrow">
                    <div className=" myrow"><h3>hurray!! Deal finish - You can earn up to 10% of each Sale / Transaction</h3></div>

                    <div className="row myrow">

{SubProjectArrays}


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







export default mypropertydeals;

