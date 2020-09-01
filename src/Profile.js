import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import imageCompression from 'browser-image-compression';
import axios from 'axios';
import "./fontsx"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './i18n';
import { withTranslation } from 'react-i18next';
import i18next from 'i18next';
import Button from 'react-bootstrap/Button';

export class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 2,
            divcountre: 0,
            currentclass: "hidden",
            parentdiv: 0,
            buttontext: "Lets Start!!!",
            
            email:"",
           
            password:"",
            universalid:"",

        }

        this.handleClick = this.handleClick.bind(this);
     
        this.handleemailchange = this.handleemailchange.bind(this);
        
        this.handlepasswordchange = this.handlepasswordchange.bind(this);


    }



    handleClick() {

        //alert(this.state.email);
         const data = {
             email: this.state.email,
             password: this.state.password,          
           };
         //  console.log(data);
         axios
         .post('http://localhost:4000/users/id', data)
         .then(res => {
            // console.log(res);
           this.setState({
             universalid:res.data._id,
         });
         this.props.handleRegisnteredUserId(this.state.universalid);
         })
         .catch(err => {
           console.log("Error in CreateBook!");
         });
     
 
 
  }
 




    render() {



        return (
            <div className="container-fluid ">
                <div className="row centeraligh">
                    <div className="container-fluid divborder">
                        <div className="row" >
                            <div className="col-sm-12">
                               
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

export default withTranslation()(Profile);
