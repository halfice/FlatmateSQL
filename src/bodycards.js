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
import { faCog, faPhone, faAtlas, faCheck, faBriefcase, faBackward, faHome, faCoffee, faQuoteLeft, faTimes, } from '@fortawesome/free-solid-svg-icons';
import gmails from './gmail.gif';
import whatsapp from './whatsapp.gif';
import calls from './call.gif';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Message from './Message'

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
      blobtoken: "",
      myBlobs: [],
      imgstarturl: "https://userfunctionsapi.blob.core.windows.net/myfiles/",
      imgStartEnd: "?sv=2019-12-12&ss=bfqt&srt=sco&sp=rwdlacupx&se=2021-05-05T13:55:52Z&st=2020-11-29T05:55:52Z&spr=https&sig=gZDBO%2Fbxzt9m%2F8jcbH0t6UV5%2FxW87Dyk3C1XIGcCSQM%3D",
      carousalObject: [],
      carousalObjectitem: [],
      carousalItemCount: 0,

    }
    this.CloseModal = this.CloseModal.bind(this);


  }




  getCarousal(propertyid) {

    this.setState({
      carousalObjectitem: [],
      ShowCarousal: true,

    });
    var tmpitem = this.state.carousalObject.filter(properties => properties.PropertyId === propertyid);
    var TampCarousalItem = [];

    var tempItem1 = tmpitem;
    var tempItem2 = tmpitem;
    var tempItem3 = tmpitem;
    var tempItem4 = tmpitem;
    //var tmpitem1 = this.state.carousalObject.filter(properties => properties.PropertyId === propertyid)
    // .map((item, id) => {
    // console.log(item[id]);
    //});

    var tmp1stImag = tmpitem[0].picstring;
    var tmp2stImag = tmpitem[0].picsstringone;
    var tmp3stImag = tmpitem[0].picsstringtwo;
    var tmp4stImag = tmpitem[0].picsstringthree;

    if (tmp1stImag.length > 3) {
      var Imagestr = this.state.imgstarturl + tmp1stImag + this.state.imgStartEnd;//.metadata.colName,
      tempItem1[0].picstring = "";
      tempItem1[0].picstring = Imagestr;

      var objectcarousal = {
        'AgentId': tmpitem[0].AgentId,
        'Bedrooms': tmpitem[0].Bedrooms,
        'Deal': tmpitem[0].Deal,
        'FurnishedTyope': tmpitem[0].FurnishedTyope,
        'Location': tmpitem[0].Location,
        'LoginUserID': tmpitem[0].LoginUserID,
        'Price': tmpitem[0].Price,
        'PropertyId': tmpitem[0].PropertyId,
        'State': tmpitem[0].State,
        'Type': tmpitem[0].Type,
        'internet': tmpitem[0].internet,
        'parking': tmpitem[0].parking,
        'mypicstring': `https://userfunctionsapi.blob.core.windows.net/myfiles/${tmp1stImag}?sv=2019-12-12&ss=bfqt&srt=sco&sp=rwdlacupx&se=2021-05-05T13:55:52Z&st=2020-11-29T05:55:52Z&spr=https&sig=gZDBO%2Fbxzt9m%2F8jcbH0t6UV5%2FxW87Dyk3C1XIGcCSQM%3D`,
        'totalbathrooms': tmpitem[0].totalbathrooms,
      }
      Imagestr = "";

      TampCarousalItem.push(objectcarousal);
    }
    if (tmp2stImag.length > 3) {
      var Imagestr = this.state.imgstarturl + tmp2stImag + this.state.imgStartEnd;//.metadata.colName,
      tempItem2[0].picstring = "";
      tempItem2[0].picstring = Imagestr;
      TampCarousalItem.push(tempItem2);
      var objectcarousal = {
        'AgentId': tmpitem[0].AgentId,
        'Bedrooms': tmpitem[0].Bedrooms,
        'Deal': tmpitem[0].Deal,
        'FurnishedTyope': tmpitem[0].FurnishedTyope,
        'Location': tmpitem[0].Location,
        'LoginUserID': tmpitem[0].LoginUserID,
        'Price': tmpitem[0].Price,
        'PropertyId': tmpitem[0].PropertyId,
        'State': tmpitem[0].State,
        'Type': tmpitem[0].Type,
        'internet': tmpitem[0].internet,
        'parking': tmpitem[0].parking,
        'mypicstring': `https://userfunctionsapi.blob.core.windows.net/myfiles/${tmp2stImag}?sv=2019-12-12&ss=bfqt&srt=sco&sp=rwdlacupx&se=2021-05-05T13:55:52Z&st=2020-11-29T05:55:52Z&spr=https&sig=gZDBO%2Fbxzt9m%2F8jcbH0t6UV5%2FxW87Dyk3C1XIGcCSQM%3D`,
        'totalbathrooms': tmpitem[0].totalbathrooms,
      }

      TampCarousalItem.push(objectcarousal);
      Imagestr = "";
    }

    if (tmp3stImag.length > 3) {
      var Imagestr = this.state.imgstarturl + tmp3stImag + this.state.imgStartEnd;//.metadata.colName,
      tempItem3[0].picstring = "";
      tempItem3[0].picstring = Imagestr;

      TampCarousalItem.push(tempItem3);
      var objectcarousal = {
        'AgentId': tmpitem[0].AgentId,
        'Bedrooms': tmpitem[0].Bedrooms,
        'Deal': tmpitem[0].Deal,
        'FurnishedTyope': tmpitem[0].FurnishedTyope,
        'Location': tmpitem[0].Location,
        'LoginUserID': tmpitem[0].LoginUserID,
        'Price': tmpitem[0].Price,
        'PropertyId': tmpitem[0].PropertyId,
        'State': tmpitem[0].State,
        'Type': tmpitem[0].Type,
        'internet': tmpitem[0].internet,
        'parking': tmpitem[0].parking,
        'mypicstring': `https://userfunctionsapi.blob.core.windows.net/myfiles/${tmp3stImag}?sv=2019-12-12&ss=bfqt&srt=sco&sp=rwdlacupx&se=2021-05-05T13:55:52Z&st=2020-11-29T05:55:52Z&spr=https&sig=gZDBO%2Fbxzt9m%2F8jcbH0t6UV5%2FxW87Dyk3C1XIGcCSQM%3D`,
        'totalbathrooms': tmpitem[0].totalbathrooms,
      }

      TampCarousalItem.push(objectcarousal);
      Imagestr = "";
    }

    if (tmp4stImag.length > 3) {
      var Imagestr4 = this.state.imgstarturl + tmp4stImag + this.state.imgStartEnd;//.metadata.colName,
      //tmp4stImag[0].picstring = "";
      //tmp4stImag[0].picstring = Imagestr;
      TampCarousalItem.push(tmp4stImag);
      var objectcarousal = {
        'AgentId': tmpitem[0].AgentId,
        'Bedrooms': tmpitem[0].Bedrooms,
        'Deal': tmpitem[0].Deal,
        'FurnishedTyope': tmpitem[0].FurnishedTyope,
        'Location': tmpitem[0].Location,
        'LoginUserID': tmpitem[0].LoginUserID,
        'Price': tmpitem[0].Price,
        'PropertyId': tmpitem[0].PropertyId,
        'State': tmpitem[0].State,
        'Type': tmpitem[0].Type,
        'internet': tmpitem[0].internet,
        'parking': tmpitem[0].parking,
        'mypicstring': `https://userfunctionsapi.blob.core.windows.net/myfiles/${tmp4stImag}?sv=2019-12-12&ss=bfqt&srt=sco&sp=rwdlacupx&se=2021-05-05T13:55:52Z&st=2020-11-29T05:55:52Z&spr=https&sig=gZDBO%2Fbxzt9m%2F8jcbH0t6UV5%2FxW87Dyk3C1XIGcCSQM%3D`,
        'totalbathrooms': tmpitem[0].totalbathrooms,
      }

      TampCarousalItem.push(objectcarousal);
      Imagestr4 = "";
    }




    this.setState({
      carousalObjectitem: TampCarousalItem,
      ShowCarousal: true,

    });
  }


  async fetchproperties() {
    var _Response = null;
    var TempUserProfileExisits = 0;
    var TempDivCounter = 0;
    var retrueneddata = [];
    var TempCarousalData = [];
    var loginurl = "https://userfunctionsapi.azurewebsites.net/api/HttpTriggerProperty?code=ir1wJ4Nz5UQTl5jHM4K1IjP7oCCt2oJqXDhtwOv9ryoPH2ZRhpxc6w==&email=" + this.state.LoginUserID + "&functiontype=b";
    try {
      let res = await axios.post(loginurl);
      console.log(res);
      var xcount = 10;
      for (var i = 0; i < res.data.length; i++) {
        xcount = xcount + 1;
        var obs = {
          'typeofAccomodation': res.data[i].Room_in_an_existing,//.metadata.colName,
          'rent': res.data[i].Price,//metadata.colName,
          'totalbed': res.data[i].Bedrooms,//.metadata.colName,
          'propertyAddress': res.data[i].Location,//.metadata.colName,
          'Imagestr': this.state.imgstarturl + res.data[i].picstring + this.state.imgStartEnd,//.metadata.colName,
          'key': xcount,
          'Price': res.data[i].Price,
          'PropertyId': res.data[i].PropertyId,
        }
        retrueneddata.push(obs);
        var objectcarousal = {
          'AgentId': res.data[i].AgentId,
          'Bedrooms': res.data[i].Bedrooms,
          'Deal': res.data[i].Deal,
          'FurnishedTyope': res.data[i].FurnishedTyope,
          'Location': res.data[i].Location,
          'LoginUserID': res.data[i].LoginUserID,
          'Price': res.data[i].Price,
          'PropertyId': res.data[i].PropertyId,
          'State': res.data[i].State,
          'Type': res.data[i].Type,
          'internet': res.data[i].internet,
          'parking': res.data[i].parking,
          'picsstringone': res.data[i].picsstringone,
          'picsstringthree': res.data[i].picsstringthree,
          'picsstringtwo': res.data[i].picsstringtwo,
          'picstring': res.data[i].picstring,
          'totalbathrooms': res.data[i].totalbathrooms,
        }
        TempCarousalData.push(objectcarousal);


      }
      this.setState({
        ObjectArray: retrueneddata,
        carousalObject: TempCarousalData,
        loader: false,
      });

    } catch (error) {

    }
  }

  render() {
    //const imgstr = "https://userfunctionsapi.blob.core.windows.net/myfiles/Screen%20Shot%202020-08-03%20at%202.13.13%20PM_1606884488004.png?sv=2019-12-12&ss=bfqt&srt=sco&sp=rwdlacupx&se=2021-05-05T13:55:52Z&st=2020-11-29T05:55:52Z&spr=https&sig=gZDBO%2Fbxzt9m%2F8jcbH0t6UV5%2FxW87Dyk3C1XIGcCSQM%3D";
    var SubProjectArrays = this.state.ObjectArray.map((item, i) => {
      return (
        <div className="col-sm-3" key={item["key"]} onClick={this.getCarousal.bind(this, item["PropertyId"])} >
          <Card style={{ width: '100%' }} className="bordershadow" key={item["typeofAccomodation"]}>
            <Card.Img height="220px" variant="top" src={item["Imagestr"]} onClick={this.getCarousal.bind(this, item["PropertyId"])} />
            <Card.Body>
              <div className="row bottomborder" >
                <div className="col-sm-12 paragraphcss">{item["Type"]}</div>
                <div className="col-sm-12 paragraphcss">{item["propertyAddress"]}</div>
                <div className="col-sm-12 paragraphcss">{item["Price"]}</div>

              </div>

              <div className="row">
                <div className="col-sm-2 zerpadding">
                  <div className="myicondiv">
                    <img src={calls} width="40px" />
                  </div>
                </div>
                <div className="col-sm-2 zerpadding">
                  <div className="myicondiv">
                    <img src={whatsapp} width="50px" />
                  </div>   </div>
                <div className="col-sm-4 zerpadding">
                  <div className="buttnemail" >Email</div>
                </div>
                <div className="col-sm-4 zerpadding">
                  <div className="myicondiv">
                    <div className="buttn" >Message</div>
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

    var carousalitem=null;
     carousalitem = this.state.carousalObjectitem.map((item, i) => {
      return (
        <div className="CarousalDivItem">
          <div className="container-fluid">
          <Carousel.Item>
            {console.log(item)}
            <div className="row">
              <div className="col-sm-8 ">
                <img className="d-block w-100" src={item[i].mypicstring} alt="First slide" />
              </div>
              <div className="col-sm-4 ">
               <Message userEmail={this.props.LoginUserID} PropertyId={item.PropertyId} />

               <div className="row">
                
                <div className="col-sm-4 zerpadding">
                  <div className="buttnemail" >Show Location</div>
                </div>
                <div className="col-sm-4 zerpadding">
                  <div className="myicondiv">
                    <div className="buttn" >Show Number</div>
                  </div>
                </div>

                <div className="col-sm-4 zerpadding">
                  <div className="myicondiv">
                    <div className="buttnemail" >Thumbs Up</div>
                  </div>
                </div>

              </div>




              </div>

            </div>
            <Carousel.Caption>
              <div className="row">
                <div className="col-sm-4 ">Bedrooms:{item.Bedrooms}</div>
                <div className="col-sm-4 ">Location:{item.Location}</div>
                <div className="col-sm-4 ">Price:{item.Price}</div>
              </div>
              <div className="row">
                <div className="col-sm-4 ">FurnishedTyope:{item.FurnishedTyope}</div>
                <div className="col-sm-4 ">Type:{item.Type}</div>
                <div className="col-sm-4 ">parking:{item.parking}</div>
              </div>
            </Carousel.Caption>
          </Carousel.Item>

          </div>
        
        </div>

      );

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
                <FontAwesomeIcon icon={faTimes} />. </div>

              <div className="carousaldiv">
                <Carousel>
                  {carousalitem}
                </Carousel>
              </div>
            </div>
          }


        </div>
      </div>

    );
  }

  async getblobtoken() {
    var loginurl = "https://userfunctionsapi.azurewebsites.net/api/HttpTriggerStorageToken?code=TqfhfkL7Vgn0x/H7JHdqZQXTCzQZSMvAVcmKk2teC3ZOgTVSN3QYaA==";
    try {
      let res = await axios.post(loginurl);
      this.setState({
        blobtoken: res,
        loader: false,
      });
      // this.fetchblobs();
      this.fetchproperties();
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.getblobtoken();

  }

  CloseModal() {
    this.setState({
      ShowCarousal: false,
    });
  }
  componentDidMountme() {
    var retrueneddata = [];

    var xcount = 102;
    axios
      .get('http://localhost:5000/cardtenants/')
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

  async  blobToString(blob) {
    const fileReader = new FileReader();
    return new Promise((resolve, reject) => {
      fileReader.onloadend = (ev) => {
        resolve(ev.target.result);
      };
      fileReader.onerror = reject;
      fileReader.readAsText(blob);
    });
  }

  async fetchblobs(file) {
    //    //https://userfunctionsapi.azurewebsites.net/?st=2020-11-04T18%3A49%3A22Z&se=2020-11-04T19%3A49%3A22Z&sp=W&sv=2018-03-28&sr=b&sig=2tbOll2oU1JdvkxLiHui%2BpRU6nHqsA0uKNtDF%2BsfZQU%3D

    const { BlobServiceClient, StorageSharedKeyCredential } = require("@azure/storage-blob");
    const sas = this.state.blobtoken;
    var finalToken = sas.data.token;

    const STORAGE_ACCOUNT_NAME = 'userfunctionsapi'
    const CONTAINER_NAME = 'myfiles'
    // for browser, SAS_TOKEN is get from API?
    const SAS_TOKEN = finalToken;
    const sasURL = `https://${STORAGE_ACCOUNT_NAME}.blob.core.windows.net/${SAS_TOKEN}`

    const blobServiceClient = new BlobServiceClient(sasURL)
    const containerClient = blobServiceClient.getContainerClient(CONTAINER_NAME)

    let i = 1;

    var tempblog = [];
    let blobs = containerClient.listBlobsFlat();
    for await (const blob of blobs) {

      const blobClient = containerClient.getBlobClient(blob.name);
      // const downloadBlockBlobResponse = await blobClient.download();
      //const downloaded = await this.blobToString(await downloadBlockBlobResponse.blobBody);
      //console.log("Downloaded blob content", downloaded);
      var imgstr = blobClient.url;
      // [Browsers only] A helper method used to convert a browser Blob into string.
      var obs = {
        'name': blob.name,//.metadata.colName,
        str: imgstr

      }




      tempblog.push(obs);
      console.log(`Blob ${i++}: ${blob.name}`);
    }
    this.setState({
      myBlobs: tempblog,

    });
    this.fetchproperties();







  }


}

export default withTranslation()(bodycards);