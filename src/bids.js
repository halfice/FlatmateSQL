import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTumblr, faTwitter } from '@fortawesome/free-solid-svg-icons'
import './sliding.css';
import {
  faCoffee, faCog, faSpinner, faQuoteLeft, faSquare, faCheckSquare, faBackward,
} from '@fortawesome/free-solid-svg-icons'
import './i18n';
import { withTranslation } from 'react-i18next';
import i18next from 'i18next';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import imageCompression from 'browser-image-compression';


export class bids extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      LoginUserID: this.props.UserID,
      value: 2,
      divcountre: 0,
      currentclass: "hidden",
      parentdiv: 0,
      productName: "",
      productvideo: "",
      productpic: "",
      productprice: "",
      productnumber: "",
      producthour: "",

      buttontext: "Lets Go!",
      isWarranty: "",

      imagePreviewUrl: '',
      picstring:"",
      warrantydiv1:"innervbuuton",
      warrantydiv2:"innervbuuton",
      

    }

    this.callinsert = this.callinsert.bind(this);
    
    this.handlproductName = this.handlproductName.bind(this);
  }








  async  handleImageUpload(event) {

    const imageFile = event.target.files[0];
    console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
    console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 300,
      useWebWorker: true
    }
    try {
      const compressedFile = await imageCompression(imageFile, options);
      console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
      console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

      let reader = new FileReader();
      let file = compressedFile;
      var newfile = compressedFile;
      console.log(compressedFile);


      reader.onloadend = () => {

        this.setState({

          file: reader.result,
          imagePreviewUrl: reader.result,
          picstring: reader.result,
        });
      }
      reader.readAsDataURL(file)

      //await uploadToServer(compressedFile); // write your own logic
    } catch (error) {
      console.log(error);
    }

  }



  callinsert(){

    const data ={
      LoginUserID: this.state.LoginUserID,
      productName: this.state.productName,
      productvideo: "",
      productpic: this.state.picstring,
      productprice: "",
      productnumber: "223",
      producthour: this.state.producthour,
      isWarranty: this.state.isWarranty,
      itemid:this.uuidv4(),
      };
  
      axios
      .post('http://localhost:4000/bids/register', data)
      .then(res => {
        this.setState({
          universalid: res.data,
          loader:false,
        });
  
      })
      .catch(err => {
        console.log("Error in CreateBook!");
      });

  }








 


  render() {
    const varclaas = "visible";
    const varclaashidden = "hidden";

    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} className="mypreviewimage" />);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }


    return (
      <div className="row centeraligh">
        <div className="row ">
          <div className="container-fluid">
            <div className="row" >
              <div className="col-sm-12">


                <div className="row">
                  <div className="col-sm-12 ">
                    <div>HI,let's Sell auction your product!</div>
                    <div className="col-sm-12">
                      <div className="iconsclassgray" > <FontAwesomeIcon icon={faHome} /></div>
                    </div>
                  </div>
                </div>



                <div className="row">
                  <div className="col-sm-12">Descript Item with Description and Video :) viola.</div>
                </div>
                <div className="row">
                  <div className="col-sm-4">
                    <div className="" >
                      <input type="text" className="form-control" onChange={this.handlproductName} placeholder="Prodcut Name"></input>
                    </div>
                  </div>
                  <div className="col-sm-4 mt-2">
                    
                      <input type="file" accept="image/*" onChange={this.handleImageUpload.bind(this)}></input>

                      <div className="imgPreview">
                        {$imagePreview}
                      </div>

                    
                  </div>
                  <div className="col-sm-4">
                    <div className="iconsclassgray" >
                      <input type="text" className="form-control" onChange={this.productprice} placeholder="Price"></input>
                    </div>
                  </div>
                </div>

                <div className="row textalighleft">
                        <div className="col-sm-12">
                          <div className="smalheadingcss">
                            Warranty
                        </div>
                        </div>
                        <div className="col-sm-6">
                         <div className={this.state.warrantydiv1} onClick={this.handleproducwarrantey.bind(this, 'Yes','1')} >
                            Yes
                         </div>
                        </div>
                        <div className="col-sm-6">
                         <div className={this.state.warrantydiv2} onClick={this.handleproducwarrantey.bind(this, 'Not Avilable','2')} >
                            Not available
                         </div>
                        </div>

                      </div>


                



















                <div className="row centeraligh">
                  <Button className="mybuttons" onClick={this.callinsert} >{this.state.buttontext}</Button>
                </div>


              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }

  async  handleImageUpload(event) {

    const imageFile = event.target.files[0];
    console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
    console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 100,
      useWebWorker: true
    }
    try {
      const compressedFile = await imageCompression(imageFile, options);
      console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
      console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

      let reader = new FileReader();
      let file = compressedFile;
      var newfile = file;
      //console.log(compressedFile);
      reader.onloadend = () => {

        this.setState({

          file: reader.result,
          imagePreviewUrl: reader.result,
          picstring: reader.result,
        });
      }
      reader.readAsDataURL(file)

      //await uploadToServer(compressedFile); // write your own logic
    } catch (error) {
      console.log(error);
    }

  }

  handlproductName(event) {
    this.setState({
      productName: event.target.value,
    });
  }


  handleproductvideo(event) {
    this.setState({
      productvideo: event.target.value,
    });
  }


  handleproductpic(event) {
    this.setState({
      productpic: event.target.value,
    });
  }



  handleproductprice(event) {
    this.setState({
      productprice: event.target.value,
    });
  }


  handleproducthour(event) {
    this.setState({
      producthour: event.target.value,
    });
  }

  handleproducwarrantey(event,pval) {

    if (pval==1){
      this.setState({
        isWarranty: event,
        warrantydiv1:"innervbuutonhover",
        warrantydiv2:"innervbuuton",
      });
    }
    if (pval==2){
      this.setState({
        isWarranty: event,
        warrantydiv2:"innervbuuton",
        warrantydiv1:"innervbuutonhover",
      });
    }



    
  }


  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }











}



export default withTranslation()(bids);
