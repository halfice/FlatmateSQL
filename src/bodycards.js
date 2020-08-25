//https://fontawesome.com/icons?d=gallery&m=free
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { Suspense, Component } from 'react'
import logo from './logo.svg';
import './App.css';
import { Header } from "./header/header";
import Footer from "./footer/footer";
import Bodycards from "./bodycards";
import Loginsecion from './loginsecion'
import { Rating } from "./rating";
import Looking from './lookingforroom';
import RoomOwner from './roomowner';
import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.min.css';
import './i18n';
import { withTranslation } from 'react-i18next';
import i18next from 'i18next';
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import imageCompression from 'browser-image-compression';
import {
  faCoffee,
  faCog,
  faSpinner,
  faQuoteLeft,
  faSquare,
  faCheckSquare,
  faUser,
  faThumbsoUp,
  faAtlas,
  faCheck,
  faBriefcase,
  
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



library.add(
  fab,
  faCoffee,
  faCog,
  faSpinner,
  faQuoteLeft,
  faSquare,
  faCheckSquare
)

class bodycards extends Component {


  constructor(props) {
    super(props);
    this.state = {
      ObjectArray: [],
      ObjectArrayTenant: [],
      ObjectArrayBids: [],
      loader:true,

    }
  }

  componentDidMountbids() {
    axios
      .get('http://localhost:4000/cardbids/')
      .then(res => {
      
        this.setState({
          ObjectArrayBids: res.data,
          loader:false,
        });

      })
      .catch(err => {
        console.log("Error in Getting Card!" + err);
      });      
  }

  componentDidMountme() {
    axios
      .get('http://localhost:4000/cardtenants/')
      .then(res => {
      
        this.setState({
          ObjectArrayTenant: res.data,
          loader:true,
        });
       

      })
      .catch(err => {
        console.log("Error in Getting Card!" + err);
      });      
  }

  componentDidMount() {
    axios
      .get('http://localhost:4000/card/')
      .then(res => {
        // console.log(res);
        this.setState({
          ObjectArray: res.data,
        });

      })
      .catch(err => {
        console.log("Error in Getting Card!" + err);
      });
      this.componentDidMountme();
      this.componentDidMountbids();




  }

  render() {


    


    var SubProjectArrays = this.state.ObjectArray.map((item, i) => {
      return (<div className="mansearch">
        
       
 <div className="col-sm-3 ">
        <Card style={{ width: '11rem' }} className="bordershadow">
          <Card.Img height="120px" variant="top" src={item["picstring"]} />
          <Card.Body>
           <div className="row bottomborder" >
<div className="col-sm-12 paragraphcss">Dubai Marina</div>
<div className="col-sm-12 paragraphcss">Dubai Marina</div>
           </div>
        
           <div className="row">
<div className="col-sm-3 paragraphcss"> 
<div className="myicondiv">
<FontAwesomeIcon icon={faAtlas} /> 
</div>
   </div>
   <div className="col-sm-3 paragraphcss"> 
   <div className="myicondiv">
   <FontAwesomeIcon icon={faCheck} /> 
</div>   </div>
   <div className="col-sm-3 paragraphcss"> 
   <div className="myicondiv">
   <FontAwesomeIcon icon={faCog} /> 
   </div>
   </div>
   <div className="col-sm-3 paragraphcss"> 
   <div className="myicondiv">
   <FontAwesomeIcon icon={faBriefcase} /> 
   </div>
   </div>


   </div>
   
           
           
          </Card.Body>
        </Card>
        </div>
      </div>);
    });

    

    var SubProjectArrays2 = this.state.ObjectArrayTenant.map((item, i) => {
      return (<div className="mansearch"  >
 <div className="col-sm-3 ">
   
        <Card style={{ width: '11rem' }}  className="bordershadow" >
          <Card.Img  height="120px" variant="top" src={item["picstring"]} />
          <Card.Body>
           
          <div className="row bottomborder" >
<div className="col-sm-12 paragraphcss">Dubai Marina</div>
<div className="col-sm-12 paragraphcss">Dubai Marina</div>
           </div>
           <div className="row">
<div className="col-sm-3 paragraphcss"> 
<div className="myicondiv">
<FontAwesomeIcon icon={faAtlas} /> 
</div>
   </div>
   <div className="col-sm-3 paragraphcss"> 
   <div className="myicondiv">
   <FontAwesomeIcon icon={faCheck} /> 
</div>   </div>
   <div className="col-sm-3 paragraphcss"> 
   <div className="myicondiv">
   <FontAwesomeIcon icon={faCog} /> 
   </div>
   </div>
   <div className="col-sm-3 paragraphcss"> 
   <div className="myicondiv">
   <FontAwesomeIcon icon={faBriefcase} /> 
   </div>
   </div>


   </div>
           
          </Card.Body>
        </Card>
        </div>
      </div>);
    });


  
if (this.state.ObjectArrayBids!=null){
    var SubProjectArrays3 = this.state.ObjectArrayBids.map((item, i) => {
      return (<div className="mansearch"  >
 <div className="col-sm-3 ">
   
        <Card style={{ width: '11rem' }} className="bordershadow">
          <Card.Img height="120px" variant="top" src={item["productpic"]} />
          <Card.Body>
          
          <div className="row bottomborder" >
<div className="col-sm-12 paragraphcss">Dubai Marina</div>
<div className="col-sm-12 paragraphcss">Dubai Marina</div>
           </div>
        
           <div className="row">
<div className="col-sm-3 paragraphcss"> 
<div className="myicondiv">
<FontAwesomeIcon icon={faAtlas} /> 
</div>
   </div>
   <div className="col-sm-3 paragraphcss"> 
   <div className="myicondiv">
   <FontAwesomeIcon icon={faCheck} /> 
</div>   </div>
   <div className="col-sm-3 paragraphcss"> 
   <div className="myicondiv">
   <FontAwesomeIcon icon={faCog} /> 
   </div>
   </div>
   <div className="col-sm-3 paragraphcss"> 
   <div className="myicondiv">
   <FontAwesomeIcon icon={faBriefcase} /> 
   </div>
   </div>


   </div>
            
          </Card.Body>
        </Card>
        </div>
      </div>);
    });
  }
  
    




    return (

      
          <div className="container-fluid">
            <div className="row" >
            {
     this.state.loader==true &&
     <div className="loader"></div>
   }

                {SubProjectArrays}
                {SubProjectArrays2}
                {SubProjectArrays3}
            </div>
          </div>
        

          );
        }
      
      }
      
      export default withTranslation()(bodycards);
      
      /*
function bodycards() {
    return (
<div className="divwithuppermargin" >
            <Card >
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
    </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>

            <Card>
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
    </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>


            <Card >
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
    </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </div>

          );
      }
      export default bodycards;
      
*/