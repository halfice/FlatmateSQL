//https://blog.logrocket.com/securing-a-react-app/
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './sliding.css';
import FacebookLogin from 'react-facebook-login';

import axios from 'axios';


import "./fontsx"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



import './i18n';
import { withTranslation } from 'react-i18next';
import i18next from 'i18next';
import Button from 'react-bootstrap/Button'
export class screenlogin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 2,
            divcountre: 0,
            currentclass: "hidden",
            parentdiv: 0,
            buttontext: "Lets Start!!!",
            email:"",
            name:"",
            password:"",
            universalid:"",
            loader:false,
            AgentName:"",
            AgentPic:"",

        }

        this.handleClick = this.handleClick.bind(this);
     
        this.handleemailchange = this.handleemailchange.bind(this);
        
        this.handlepasswordchange = this.handlepasswordchange.bind(this);


    }



    async handleClick() {
        var _Response=null;
        this.setState({
            loader:true,
        });
         const params = {
            functiontype:"c",
            email: this.state.email,
            password: this.state.password,          
           };

           var loginurl="https://userfunctionsapi.azurewebsites.net/api/HttpTriggerusers?code=zLwRL3jpIUtF0oWql4lfK38n/Ld6w5Ed6XzP1H7Kj3tBSF4dzL1crg==&email="+this.state.email+"&functiontype=c";
    try {
               let res=await axios.post(loginurl);
               
               this.setState({
                universalid:res,
                loader:false,
            });

            var tiem=``;
            if (this.state.universalid.data!=undefined
                && this.state.universalid.data=="notfound" &&
                this.state.universalid.data!=``
                ){
                    this.setState({
                        loader:false,
                    });
                }
            else{
                this.props.handleRegisnteredUserId(this.state.universalid.data.UserEmail,this.state.universalid.data.Mobile,this.state.universalid.data.profilepicname,this.state.universalid.data.companyname,this.state.universalid.data.UserName);   
                
            }
             //  console.log(res.data);
           } catch (error) {
              // console.log(error);
           }
         
 
  }

  async registeruser(){

    
    const data = "";
        const  functiontype="b";
        const email= this.state.email;
        const  userid= "facebook user";
        const  phone="9999";
        const  password= "facebookpassword";
             
     // };
      var regurl=`https://userfunctionsapi.azurewebsites.net/api/HttpTriggerusers?code=zLwRL3jpIUtF0oWql4lfK38n/Ld6w5Ed6XzP1H7Kj3tBSF4dzL1crg==&userid=${this.state.email}&UserName=${userid}&email=${email}&Password=${password}&functiontype=b&moibile=${phone}`;
    try {
               let res=await axios.post(regurl);
               this.setState({
                universalid:res,
                loader:false,
            });
            this.props.handleRegisnteredUserId(this.state.email);
               //console.log(res.data);
           } catch (error) {
               //console.log(error);
           }
  }
 
   responseFacebook = (response) => {
    this.setState({
        email:response.email,
    });
    this.registeruser();
  }
  componentClicked = (response) => {
    this.setState({
        loader:true,
    });
  }



    render() {



        return (
            <div className="container-fluid ">
                <div className="row centeraligh">
                {
     this.state.loader==true &&
     <div className="loader"></div>
   }
                    <div className="container-fluid divborder">
                        <div className="row" >
                            <div className="col-sm-12">
                            <FacebookLogin
    appId="575382819627822"
    autoLoad={false}
    fields="name,email,picture"
    onClick={this.componentClicked}
    callback={this.responseFacebook} />
                               
                               <div className="facbookbutton">
                             
                               <span className="iconsclass" >f</span>   Continue with Facebook
                       
                               
                               </div>
                            </div>

                        </div>
                        <div className="row" >
                            <div className="col-sm-12 graytext">
                                
                              --OR--
                            </div>

                        </div>

                        <div className="row" >
                            <div className="col-sm-12 graytext">
                                
                           
  <div className="form-group">
   
  <input type="email" className="form-control" onChange={this.handleemailchange} placeholder="Enter email"></input>
   
  </div>

  

                            </div>

                        </div>

                        <div className="row" >
                            <div className="col-sm-12 graytext">
                                
                            <div className="form-group">
   
                            <input type="password" className="form-control" onChange={this.handlepasswordchange} placeholder="Password"></input>
  
 </div>
                            </div>

                        </div>



                        <div className="row" >
                            <div className="col-sm-12">
                                
                                <Button className="mybuttons" onClick={this.handleClick.bind(this)} >Log In</Button>
                            </div>

                        </div>
                        <div className="row" >
                            <div className="col-sm-12">
                                
                            by signing up you accept our terms and conditions
                            </div>

                        </div>

                        <div className="row" >
                            <div className="col-sm-12">
                                
                            
                            <div className="signupdiv" >
                            Create new account  <span onClick = {() => this.props.handlerRegister('1000')} className="signuplink">Sign up</span>
                            </div>
                            </div>

                        </div>
                       

                    </div>
                </div>
            </div>
        );
    }

    handlenamechange(event)
    {
        this.setState({
            name: event.target.value,
            AgentName: event.target.value,
          });
    }
    handleemailchange(event)
    {
        this.setState({
            email: event.target.value
          });
    }
    handlenphonechange(event)
    {
        this.setState({
            phone: event.target.value
          });
    }
    handlepasswordchange(event)
    {
        this.setState({
            password: event.target.value
          });
    }

}

export default withTranslation()(screenlogin);
