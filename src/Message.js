import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './sliding.css';
import axios from 'axios';
import './i18n';
import { withTranslation } from 'react-i18next';
import i18next from 'i18next';
import Button from 'react-bootstrap/Button'
import uploader from './uloaaderimage.gif'
import imageCompression from 'browser-image-compression'
import Select from 'react-select';


export class Message extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userEmail: this.props.Userid,
            Message: "",
            PropertyId: this.props.PropertyId,




        }
        this.handleClick = this.handleClick.bind(this);
        this.handlenamechange = this.handlenamechange.bind(this);
        this.handleemailchange = this.handleemailchange.bind(this);
        this.handlenphonechange = this.handlenphonechange.bind(this);
        this.handlepasswordchange = this.handlepasswordchange.bind(this);

    }


    async handleClick() {
        this.setState({
            loader: true,
        });
        //alert(this.state.name);

        //     
        var userid = this.state.name;
        var email = this.state.email;
        var phone = this.state.phone;
        var password = this.state.password;



        var regurl = `https://userfunctionsapi.azurewebsites.net/api/HttpTriggerMessages?code=zLwRL3jpIUtF0oWql4lfK38n/Ld6w5Ed6XzP1H7Kj3tBSF4dzL1crg==&userid=${this.state.email}&UserName=${this.state.name}&email=${this.state.email}&Password=${this.state.password}&functiontype=b&moibile=${this.state.phone}&companyname=${this.state.copmayname}&profilepicname=${this.state.picstring}`;
        try {
            let res = await axios.post(regurl);
            this.setState({
                universalid: res,
                loader: false,
            });
            this.props.handleRegisnteredUserId(this.state.email);
            // console.log(res.data);
        } catch (error) {
            //console.log(error);
        }

    }

    render() {
        return (
            <div className="container-fluid ">
                <div className="row centeraligh">
                    <div className="container-fluid divborder">
                        {
                            this.state.loader == true &&
                            <div className="loader"></div>
                        }
                        <div className="row" >
                            <div className="col-sm-12">
                                <div className="facbookbutton">
                                    Contact
                               </div>
                            </div>
                        </div>
                        <div className="row" >
                            <div className="col-sm-12 graytext">
                                <div className="form-group">
                                    <input type="UserName" className="form-control" onChange={this.handleemailchange} placeholder="Enter email"></input>
                                </div>
                                <div className="form-group">
                                    <input type="Phone" className="form-control" placeholder="Enter name" onChange={this.handlenamechange}></input>
                                </div>
                                <div className="form-group">
                                    <input type="Mesage" className="form-control" onChange={this.handlenphonechange} placeholder="Enter phone"></input>

                                </div>
                            </div>
                        </div>
                        <div className="row" >
                            <div className="col-sm-12 graytext">
                            </div>
                        </div>
                        <div className="row" >
                            <div className="col-sm-12">
                                <Button className="mybuttons" onClick={this.handleClick} >Submit</Button>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
            
        );
    }



    handlenamechange(event) {
        this.setState({
            name: event.target.value
        });
    }
    handleemailchange(event) {
        this.setState({
            email: event.target.value
        });
        if (event.target.value.indexOf('@') > 0) {
            this.fetchprofile(event.target.value)
        }
    }
    handlenphonechange(event) {
        this.setState({
            phone: event.target.value
        });
    }
    handlepasswordchange(event) {
        this.setState({
            password: event.target.value
        });
    }

    uniqueNumber() {
        var date = Date.now();



        return date;
    }



}



export default withTranslation()(Message);
