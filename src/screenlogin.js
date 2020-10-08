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

        }

        this.handleClick = this.handleClick.bind(this);
     
        this.handleemailchange = this.handleemailchange.bind(this);
        
        this.handlepasswordchange = this.handlepasswordchange.bind(this);


    }



    handleClick() {
        this.setState({
            loader:true,
        });
       
         const params = {
            functiontype:"c",
            email: this.state.email,
            password: this.state.password,          
           };
         // console.log(params);
//http://localhost:4000/users/login
         var loginurl="https://userfunctionsapi.azurewebsites.net/api/HttpTriggerusers?code=zLwRL3jpIUtF0oWql4lfK38n/Ld6w5Ed6XzP1H7Kj3tBSF4dzL1crg==&email="+this.state.email+"&functiontype=c";

         axios
         .post(loginurl)
         .then(res => {
           //  console.log(res);
             if (res.data==null){
                this.registeruser();
             }else{
                // console.log(res);
                this.setState({
                    universalid:res.data[0][6].val,
                    loader:false,
                });
                this.props.handleRegisnteredUserId(this.state.universalid);
             }
          
         })
         .catch(err => {
           console.log("Error in CreateBook!");
         });
     
 
 
  }

  registeruser(){

    
    const data = {
        functiontype:"b",
        email: this.state.email,
        userid: "facebook user",
        phone:"9999",
        password: "facebookpassword",
             
      };
     // var regurl=`https://userfunctionsapi.azurewebsites.net/api/HttpTriggerusers?code=zLwRL3jpIUtF0oWql4lfK38n/Ld6w5Ed6XzP1H7Kj3tBSF4dzL1crg==&userid=${this.state.email}&UserName=${this.state.name}&email=${this.state.email}&Password=${this.state.password}&functiontype=b`;
      var regurl=`https://userfunctionsapi.azurewebsites.net/api/HttpTriggerusers?code=zLwRL3jpIUtF0oWql4lfK38n/Ld6w5Ed6XzP1H7Kj3tBSF4dzL1crg==&userid=${this.state.email}&UserName=${this.state.name}&email=${this.state.email}&Password=${this.state.password}&functiontype=b&moibile=${this.state.phone}`;

    axios
    .post(regurl, data)
    .then(res => {
      this.setState({
        universalid:res.data,
        loader:false,
    });
    this.props.handleRegisnteredUserId(this.state.universalid);
    })
    .catch(err => {
      console.log("Error in CreateBook!k");
    });
  }
 
   responseFacebook = (response) => {
    //console.log(response);
    this.setState({
        email:response.email,
    });


    this.handleClick();
  }
  componentClicked = (response) => {
    this.setState({
        loader:true,
    });
   // console.log(response);
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
                                
                                <Button className="mybuttons" onClick={this.handleClick} >Log In</Button>
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
            name: event.target.value
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
