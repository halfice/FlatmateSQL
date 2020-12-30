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
            userEmail: "",//this.props.Userid,
            Message: "",
            PropertyId: this.props.PropertyId,
            Phone:"",
            UserName:"",
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleChangePhone = this.handleChangePhone.bind(this);
        this.handlChangeName = this.handlChangeName.bind(this);
        this.handlchangeMessage = this.handlchangeMessage.bind(this);

    }
    componentDidMount() {
}
    
async getblobtoken() {
        var loginurl = "https://userfunctionsapi.azurewebsites.net/api/HttpTriggerStorageToken?code=TqfhfkL7Vgn0x/H7JHdqZQXTCzQZSMvAVcmKk2teC3ZOgTVSN3QYaA==";
        try {
          let res = await axios.post(loginurl);
          this.setState({
            blobtoken: res,
            loader: false,
          });
        } catch (error) {
          console.log(error);
        }
      }
    async handleClick() {
        this.setState({
            loader: true,
        });
       // http://localhost:7071/api/HttpTriggerMessages?code=zLwRL3jpIUtF0oWql4lfK38n/Ld6w5Ed6XzP1H7Kj3tBSF4dzL1crg==&email=777&propertyid=92&msg=0000
        var regurl = `https://userfunctionsapi.azurewebsites.net/api/HttpTriggerMessages?code=Jfa1Z7DWGy4a30z4gz16iWIzn5nTgCt3UFrOPFrQOYgCPeSIFR69pQ==&email=${this.state.Phone}&propertyid=${this.state.PropertyId}&msg=${this.state.Message}&functiontype=i`;
        try {
            let res = await axios.post(regurl);
            this.setState({
                universalid: res,
                loader: false,
            });
            this.props.handleRegisnteredUserId(this.state.email);
        } catch (error) {
        }
    }

    render() {
        return (
            <div className="container-fluid ">
                <div className="row">
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
                                    <input type="text" className="form-control mytextbox" onChange={this.handlChangeName} placeholder="Enter Name" ></input>
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control mytextbox" placeholder="Enter Phone" onChange={this.handleChangePhone} ></input>
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control mytextbox" onChange={this.handlchangeMessage} placeholder="Enter Message" ></input>

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

    handleChangePhone(event) {

        if (event.target.value.length>10)
        {
            return;
        }
        this.setState({
            Phone: event.target.value
        });
    }
    handlChangeName(event) {
        this.setState({
            UserName: event.target.value
        });
        if (event.target.value.indexOf('@') > 0) {
            this.fetchprofile(event.target.value)
        }
    }
    handlchangeMessage(event) {
        this.setState({
            Message: event.target.value
        });
    }

}

export default withTranslation()(Message);
