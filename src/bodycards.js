//https://fontawesome.com/icons?d=gallery&m=free
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Suspense, Component } from 'react'
import logo from './logo.svg';
import uploader from './uloaaderimage.gif'
import './App.css';
import { Header } from "./header/header";
import Footer from "./footer/footer";
import Bodycards from "./bodycards";
import { Rating } from "./rating";
import Looking from './lookingforroom';
import RoomOwner from './roomowner';
import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.min.css';
import './i18n';
import { withTranslation } from 'react-i18next';
import i18next from 'i18next';
import axios from 'axios';
import imageCompression from 'browser-image-compression';
import { library } from '@fortawesome/fontawesome-svg-core';
import Carousel from 'react-bootstrap/Carousel'
import {
  faCog,
  faAtlas,
  faCheck,
  faBriefcase,
  faBackward,
  faHome,
  faCoffee,
  faQuoteLeft,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(faCog, faAtlas, faCheck, faBriefcase, faBackward, faHome)

class bodycards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ObjectArray: [],
      ObjectArrayTenant: [],
      ObjectArrayBids: [],
      loader: true,
      ImagesArray: [],
      ShowCarousal: false,

    }
    this.CloseModal = this.CloseModal.bind(this);


  }

  CloseModal() {
    this.setState({
      ShowCarousal: false,
    });
  }


  getCarousal(ownerid) {
    this.setState({
      ShowCarousal: true
    });
  }



  componentDidMountbids() {
    axios
      .get('/cardbids/')
      .then(res => {

        this.setState({
          ObjectArrayBids: res.data,
          loader: false,
        });

      })
      .catch(err => {
        console.log("Error in Getting Card!" + err);
      });
  }

  componentDidMountme() {
    var retrueneddata = [];

    var xcount = 102;
    axios
      .get('/cardtenants/')
      .then(res => {
        for (var i = 0; i < res.data.length; i++) {
          xcount = xcount + 1;

          var obs = {
            'Area': res.data[i][0].value,//.metadata.colName,
            'rent': res.data[i][1].value,//metadata.colName,
            'DatetoCome': res.data[i][2].value,//.metadata.colName,
            'age': res.data[i][3].value,//.metadata.colName,
            'Imagestr': res.data[i][4].value,//.metadata.colName,
            'key': xcount,
            'tenantid': res.data[i][5].value,//.metadata.colName,
          }
          retrueneddata.push(obs);
        }
        console.log(retrueneddata);
        this.setState({
          ObjectArrayTenant: retrueneddata,
          loader: false,
        });
      })
      .catch(err => {
        console.log("Error in Getting Card!" + err);
      });
  }

  componentDidMount() {
    var retrueneddata = [];
    axios
      .get('/card/')
      .then(res => {
        // console.log(res);
        //res.data[0][0].value
        var xcount = 10;
        for (var i = 0; i < res.data.length; i++) {
          xcount = xcount + 1;
          var obs = {
            'typeofAccomodation': res.data[i][0].value,//.metadata.colName,
            'rent': res.data[i][1].value,//metadata.colName,
            'totalbed': res.data[i][2].value,//.metadata.colName,
            'propertyAddress': res.data[i][3].value,//.metadata.colName,
            'Imagestr': res.data[i][6].value,//.metadata.colName,
            'key': xcount,
            'ownerid': res.data[i][7].value
          }
          retrueneddata.push(obs);

        }

        this.setState({
          ObjectArray: retrueneddata,
          loader: false,
        });
      })
      .catch(err => {
        console.log("Error in Getting Card!" + err);
      });
    this.componentDidMountme();
    // this.componentDidMountbids();


  }

  getImageStr(ownerid) {
    const data = {
      ownerid: ownerid,
      imagecount: 1,
    }

    axios
      .get('http://localhost:4000/MyFiles/getfiles', data)
      .then(res => {
        console.log(res.data[0].Imagestr);

      }
      );
  }


  render() {
    var SubProjectArrays = this.state.ObjectArray.map((item, i) => {
      return (
        <div className="col-sm-3" key={item["key"]} >
          <Card style={{ width: '11rem' }} className="bordershadow" key={item["typeofAccomodation"]}>
            <Card.Img height="120px" variant="top" src={item["Imagestr"]} onClick={this.getCarousal.bind(this, item["key"])} />
            <Card.Body>
              <div className="row bottomborder" >
                <div className="col-sm-12 paragraphcss">{item["typeofAccomodation"]}</div>
                <div className="col-sm-12 paragraphcss">{item["propertyAddress"]}</div>
              </div>

              <div className="row">
                <div className="col-sm-3 paragraphcss">
                  <div className="myicondiv">
                    <FontAwesomeIcon icon={faAtlas} />             </div>
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
      );
    });



    var SubProjectArrays2 = this.state.ObjectArrayTenant.map((item, i) => {
      return (<div className="mansearch" key={item["key"]}>
        <div className="col-sm-3 " >

          <Card style={{ width: '11rem' }} className="bordershadow" key={i} >
            <Card.Img height="120px" variant="top" src={item["Imagestr"]} />
            <Card.Body>

              <div className="row bottomborder" >
                <div className="col-sm-12 paragraphcss">{item["Area"]}</div>
                <div className="col-sm-12 paragraphcss">{item["age"]}Years</div>
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



    if (this.state.ObjectArrayBids != null) {
      var SubProjectArrays3 = this.state.ObjectArrayBids.map((item, i) => {
        return (<div className="mansearch"  >
          <div className="col-sm-3 ">

            <Card style={{ width: '11rem' }} className="bordershadow" key={i} >
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
            this.state.loader == true &&
            <div className="loader"></div>
          }
          {SubProjectArrays}
          {SubProjectArrays2}
          {SubProjectArrays3}


        </div>
        <div>
          {
            this.state.ShowCarousal == true &&

            <div className="parentdiv">
              <div className="closebuttondi" onClick={this.CloseModal}>
                <FontAwesomeIcon icon={faTimes} />     Close        </div>

              <div className="carousaldiv">
                <Carousel>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src="https://business.nab.com.au/wp-content/uploads/2017/07/house-740x530.png"
                      alt="First slide"
                    />
                    <Carousel.Caption>
                      <h3>First slide label</h3>
                      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src="https://lifestyle.prod.content.iproperty.com/news/wp-content/uploads/sites/3/2020/04/28185320/property-market-malaysia-Covid-19-300x200.jpg"
                      alt="Third slide"
                    />

                    <Carousel.Caption>
                      <h3>Second slide label</h3>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src="https://lifestyle.prod.content.iproperty.com/news/wp-content/uploads/sites/3/2020/04/28185320/property-market-malaysia-Covid-19-300x200.jpg"
                      alt="Third slide"
                    />

                    <Carousel.Caption>
                      <h3>Third slide label</h3>
                      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                </Carousel>
              </div>
            </div>
          }


        </div>
      </div>

    );
  }

}

export default withTranslation()(bodycards);