import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './sliding.css';
import axios from 'axios';
import './i18n';
import { withTranslation } from 'react-i18next';
import i18next from 'i18next';
import Button from 'react-bootstrap/Button'
export class screenregister extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name:"",
            email:"",
            phone:"",
            password:"",
            universalid:"",
            loader:false,

        }
        this.handleClick = this.handleClick.bind(this);
        this.handlenamechange = this.handlenamechange.bind(this);
        this.handleemailchange = this.handleemailchange.bind(this);
        this.handlenphonechange = this.handlenphonechange.bind(this);
        this.handlepasswordchange = this.handlepasswordchange.bind(this);

    }




    
    handleClick() {
        this.setState({
            loader:true,
        });
       //alert(this.state.name);

        const params = {
            
            userid: this.state.name,
            email: this.state.email,
            phone:this.state.phone, 
            password: this.state.password,
                    
            
          };

        
          var regurl=`https://userfunctionsapi.azurewebsites.net/api/HttpTriggerusers?code=zLwRL3jpIUtF0oWql4lfK38n/Ld6w5Ed6XzP1H7Kj3tBSF4dzL1crg==&userid=${this.state.email}&UserName=${this.state.name}&email=${this.state.email}&Password=${this.state.password}&functiontype=b&moibile=${this.state.phone}`;

        axios
        .post(regurl, {params})
        .then(res => {
          this.setState({
            universalid:res.data.recordsets[0].recordset[0].UserId,
            loader:false,
        });
        console.log(this.state.universalid);
        this.props.handleRegisnteredUserId(this.state.universalid);
        })
        .catch(err => {
          console.log("Error in Registring user!");
        });
    


 }





    render() {



        return (
            <div className="container-fluid ">
                <div className="row centeraligh">
                    <div className="container-fluid divborder">
                    {
     this.state.loader==true &&
     <div className="loader"></div>
   }
                        <div className="row" >
                            <div className="col-sm-12">
                               
                               <div className="facbookbutton">
                             
                              Register
                       
                               
                               </div>
                            </div>

                        </div>
                     

                        <div className="row" >
                            <div className="col-sm-12 graytext">
                                
                            <div class="form-group">
   
   <input type="email" className="form-control"  placeholder="Enter name" onChange={this.handlenamechange}></input>
  

 </div>     
 <div class="form-group">
   
   <input type="email" className="form-control" onChange={this.handlenphonechange} placeholder="Enter phone"></input>
  
 </div>     
  <div class="form-group">
   
    <input type="email" className="form-control" onChange={this.handleemailchange} placeholder="Enter email"></input>
   
  </div>
  <div class="form-group">
   
   <input type="password" className="form-control" onChange={this.handlepasswordchange} placeholder="Password"></input>

</div>

  

                            </div>

                        </div>

                        <div className="row" >
                            <div className="col-sm-12 graytext">
                                
                         
                            </div>

                        </div>



                        <div className="row" >
                            <div className="col-sm-12">
                                
                                <Button className="mybuttons" onClick={this.handleClick} >Register</Button>
                            </div>

                        </div>
                        <div className="row" >
                            <div className="col-sm-12">
                                
                            by signing up you accept our terms and conditions
                            </div>

                        </div>

                        <div className="row" >
                            <div className="col-sm-12">
                                
                            Create new account Sign up?
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

export default withTranslation()(screenregister);
