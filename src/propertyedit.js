import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import uploader from './uloaaderimage.gif'
import './sliding.css';
import axios from 'axios';
import imageCompression from 'browser-image-compression'
import './i18n';
import { withTranslation } from 'react-i18next';
import i18next from 'i18next';
import Button from 'react-bootstrap/Button';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCog, faAtlas, faCheck, faBriefcase, faBackward, faHome } from '@fortawesome/free-solid-svg-icons';
import { BlobServiceClient, StorageSharedKeyCredential } from "@azure/storage-blob";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Lockz from './Locationsuggest';
import DatePicker from "react-datepicker";

import Toggle from 'react-toggle'
import "react-toggle/style.css" // for ES6 modules
library.add(faCog, faAtlas, faCheck, faBriefcase, faBackward, faHome)
export class Propertyedit extends React.Component {


  componentDidMount() {
    this.getblobtoken();
    this.BindItem();
  }

  async BindItem() {
    this.handlePurpose(this.state.ItemObject[0]["Purpose"], this.state.ItemObject[0]["Purpose"]);
    this.videolinkchangeItemBind(this.state.ItemObject[0]["VideoLink"]);
    this.handletotalbathroom(this.state.ItemObject[0]["totalbathrooms"], this.state.ItemObject[0]["totalbathrooms"]);
    var tmpbedroom = this.state.ItemObject[0]["Bedrooms"];
    if (tmpbedroom == "Studio") {
      tmpbedroom = "100"
    }

    var tmpInternet=this.state.ItemObject[0]["internet"];
    this.handleinternetEdit(tmpInternet);

    this.handletotalbed(tmpbedroom, tmpbedroom);
    this.handleparking(this.state.ItemObject[0]["parking"], this.state.ItemObject[0]["parking"]);
    this.handletypeofAccormodation(this.state.ItemObject[0]["Type"], this.state.ItemObject[0]["Type"]);
    var tempIsAgent=this.state.ItemObject[0]["AgentId"];
    var pvalagent="0";
    if(tempIsAgent=="Yes"){pvalagent="1";}
    this.handleIsAgent(this.state.ItemObject[0]["AgentId"], pvalagent);

    var TempDetail = this.state.ItemObject[0]["Deal"];
    var TempPropertyId=this.state.ItemObject[0]["PropertyId"];
    var TmpBoolean = false;
    if (TempDetail == "1") {
      TmpBoolean = true;
    }
    this.handleroomfuninishing(this.state.ItemObject[0]["FurnishedTyope"],this.state.ItemObject[0]["FurnishedTyope"]);

var tempimagePreviewUrl=this.state.imgstarturl  +  this.state.ItemObject[0]["picsstringone"] + this.state.imgStartEnd;
var tempimagePreviewUrl1=this.state.imgstarturl + this.state.ItemObject[0]["picsstringthree"] + this.state.imgStartEnd;
var tempimagePreviewUrl2=this.state.imgstarturl + this.state.ItemObject[0]["picsstringtwo"] + this.state.imgStartEnd;
var tempimagePreviewUrl3=this.state.imgstarturl +this.state.ItemObject[0]["picstring"]+ this.state.imgStartEnd;

tempimagePreviewUrl=tempimagePreviewUrl.replace(/\s/g, "");
tempimagePreviewUrl1=tempimagePreviewUrl1.replace(/\s/g, "");
tempimagePreviewUrl2=tempimagePreviewUrl2.replace(/\s/g, "");
tempimagePreviewUrl3=tempimagePreviewUrl3.replace(/\s/g, "");
    this.setState({
      deal: TempDetail,
      isChecked: TmpBoolean,
      deal: TempDetail,
      PropertyId:TempPropertyId,
      imagePreviewUrl:tempimagePreviewUrl,
      imagePreviewUrl1: tempimagePreviewUrl1,
      imagePreviewUrl2: tempimagePreviewUrl2,
      imagePreviewUrl3: tempimagePreviewUrl3,
      AgentId: this.state.ItemObject[0]["AgentId"],
      typeofAccomodation: this.state.ItemObject[0]["Type"],
      OwnerName: this.state.ItemObject[0]["OwnerName"],
      OwnerEmail: this.state.ItemObject[0]["OwnerEmail"],
      OwnerPhone: this.state.ItemObject[0]["OwnerPhone"],
      BuildingNumber: this.state.ItemObject[0]["BuildingNumber"],
      UnitNumber: this.state.ItemObject[0]["UnitNumber"],
      Shape: this.state.ItemObject[0]["Shape"],
      Size: this.state.ItemObject[0]["Size"],
      propertyAddress: this.state.ItemObject[0]["Type"],
      location: this.state.ItemObject[0]["Location"],
      longitude: this.state.ItemObject[0]["long"],
      latitude: this.state.ItemObject[0]["lat"],
      City: this.state.ItemObject[0]["City"],
      // totalbed:this.state.ItemObject[0]["Bedrooms"],
      //totalbathrooms:this.state.ItemObject[0]["totalbathrooms"],
      //parking:this.state.ItemObject[0]["parking"],
      // internet:this.state.ItemObject[0]["internet"],
      deposit: this.state.ItemObject[0]["deposit"],
      internet:tmpInternet,
      price: this.state.ItemObject[0]["Price"],
      description: this.state.ItemObject[0]["description"],
      picstring1: this.state.ItemObject[0]["picsstringone"],
      picstring3: this.state.ItemObject[0]["picsstringthree"],
      picstring2: this.state.ItemObject[0]["picsstringtwo"],
      picstring:  this.state.ItemObject[0]["picstring"],
      commission:this.state.ItemObject[0]["commission"],
      isavilable:this.state.ItemObject[0]["isavailable"],
      availabledate:this.state.ItemObject[0]["availabledate"],




    });




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

  handleprince(event) {
    this.setState({
      price: event.target.value,
    });
  }

  async handleImageUpload(files) {
    if (files.target.files.length > 0) {

      for (var x = 0; x < files.target.files.length; x++) {
        const file = files.target.files[x];
        const filename = file.name.substring(0, file.name.lastIndexOf('.'));
        const ext = file.name.substring(file.name.lastIndexOf('.'));
        const blobName = filename + '_' + new Date().getTime() + ext;
        this.uploadFile(file, blobName);
        this.handleImageUploadold(file, blobName);
      }

    }
  }

  uniqueNumber() {
    var date = Date.now();

    return date;
  }

  async uploadFile(file, blobName) {
    //    //https://userfunctionsapi.azurewebsites.net/?st=2020-11-04T18%3A49%3A22Z&se=2020-11-04T19%3A49%3A22Z&sp=W&sv=2018-03-28&sr=b&sig=2tbOll2oU1JdvkxLiHui%2BpRU6nHqsA0uKNtDF%2BsfZQU%3D
    const { BlobServiceClient, StorageSharedKeyCredential } = require("@azure/storage-blob");
    const sas = this.state.blobtoken;
    var finalToken = sas.data.token;
    //finalToken="";
    //finalToken="?sv=2019-12-12&ss=bf&srt=s&sp=rwlac&se=2021-12-29T22:25:54Z&st=2020-11-28T14:25:54Z&spr=https&sig=F2JpyoUBdGW96gnefEsi3xZHA6J%2F7e2isHXz3p3G824%3D";

    const STORAGE_ACCOUNT_NAME = 'userfunctionsapi'
    const CONTAINER_NAME = 'myfiles'
    // for browser, SAS_TOKEN is get from API?
    const SAS_TOKEN = finalToken;
    const sasURL = `https://${STORAGE_ACCOUNT_NAME}.blob.core.windows.net/${SAS_TOKEN}`

    const blobServiceClient = new BlobServiceClient(sasURL)
    const containerClient = blobServiceClient.getContainerClient(CONTAINER_NAME)


    const blockBlobClient = containerClient.getBlockBlobClient(blobName)
    const uploadBlobResponse = await blockBlobClient.uploadBrowserData(file)
    console.log(`Upload block blob ${file.name} successfully`, uploadBlobResponse.clientRequestId);

  }

  async handleImageUploadold(file, blobName) {
    this.setState({
      loader: true,
    });
    const imageFile = file;
    let reader = new FileReader();
    var newfile = imageFile;
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 200,
      useWebWorker: true,
      usbd: 22,
    }
    try {
      const compressedFile = await imageCompression(imageFile, options);

      reader.onloadend = () => {
        var tmp = this.state.picscounter;
        tmp = tmp + 1;
        const data = {
          picstring: reader.result,
        }
        if (tmp == 1) {
          this.setState({
            file: reader.result,
            imagePreviewUrl: reader.result,
            picstring: blobName,//reader.result,
            picscounter: tmp,
            loader: false,
          });
        }


        if (tmp == 2) {
          this.setState({
            file: reader.result,
            imagePreviewUrl1: reader.result,
            picstring1: blobName,
            picscounter: tmp,
            loader: false,
          });
        }

        if (tmp == 3) {
          this.setState({
            file: reader.result,
            imagePreviewUrl2: reader.result,
            picstring2: blobName,
            picscounter: tmp,
            loader: false,
          });
        }

        if (tmp == 4) {
          this.setState({
            file: reader.result,
            imagePreviewUrl3: reader.result,
            picstring3: blobName,
            picscounter: tmp,
            loader: false,
          });
        }





        const filestrint = reader.result;
        const params = {
          filestrint: this.props.UserID,
        };

      }//onload end
      reader.readAsDataURL(newfile)
      //await uploadToServer(compressedFile); // write your own logic
    } catch (error) {
      console.log(error);
    }

  }

  async callingUpdate() {
    this.setState({
      loader: true,
    });
    var headerurl = `https://userfunctionsapi.azurewebsites.net/api/HttpTriggerProperty?code=ir1wJ4Nz5UQTl5jHM4K1IjP7oCCt2oJqXDhtwOv9ryoPH2ZRhpxc6w==&functiontype=update`;
    var regurl = headerurl + `&UserName=${this.state.LoginUserID}&Type=${this.state.typeofAccomodation}&Location=${this.state.location}
    &Bedrooms=${this.state.totalbed}&totalbathrooms=${this.state.totalbathrooms}&parking=${this.state.parking}
    &internet=${this.state.internet}&Price=${this.state.price}&FurnishedTyope=${this.state.roomfuninishing}&State=${this.state.location}&Deal=${this.state.deal}
    &picstring=${this.state.picstring}&picsstringone=${this.state.picstring1}&picsstringtwo=${this.state.picstring2}
    &picsstringthree=${this.state.picstring3}&AgentId=${this.state.AgentId}&AgentPic=${this.state.AgentPic}
    &AgentNumber=${this.state.AgentMobile}&long=${this.state.longitude}&lat=${this.state.latitude}
    &description=${this.state.description}&agentname=${this.state.AgentName}&agentcompany=${this.state.AgentComapny}
    &Purpose=${this.state.Purpose}&City=${this.state.City}&OwnerName=${this.state.OwnerName}&OwnerEmail=${this.state.OwnerEmail}
    &OwnerPhone=${this.state.OwnerPhone}&Status=${this.state.Status}&BuildingNumber=${this.state.BuildingNumber}
    &UnitNumber=${this.state.UnitNumber}&Shape=${this.state.Shape}&FloorPlanid=${this.state.FloorPlanid}
    &Size=${this.state.Size}&VideoLink=${this.state.videolink}&companylogo=${this.state.companylogo}&deposit=${this.state.deposit}&PropertyId=${this.state.PropertyId}&commission=${this.state.commission}&isavilable=${this.state.isavailable}&availabledate=${this.state.availabledate}`
  console.log(regurl);
    try {
      let res = await axios.post(regurl);
      this.setState({
        universalid: res,
        loader: false,

      });
      this.props.delegateEditProperty();
    } catch (error) {
      console.log(error);
    }



  }


  handlerhomek = (vcity, val, long, lat) => {
    this.setState({
      propertyAddress: val,
      location: val,
      longitude: long,
      latitude: lat,
      City: vcity,

    })
  }


  depositsclick(event) {
    this.setState({
      deposit: event.target.value,

    });
  }

  videolinkchangeItemBind(videourl){
    this.setState({
      videolink: videourl,
    });
  }
  videolinkchange(event) {

    this.setState({
      videolink: event.target.value,
    });
  }

  handleChangetextarea(event) {
    this.setState({
      description: event.target.value,

    });
  }

  handledeleeImge(number) {
    switch (number) {
      case 1:
        this.setState({imagePreviewUrl:null});
        break;

      case 2:
        this.setState({imagePreviewUrl1:null});

        break;

      case 3:
        this.setState({imagePreviewUrl2:null});

        break;

      case 4:
        this.setState({imagePreviewUrl3:null});

        break;


    }
  }

  render() {
    const varclaas = "visible";
    const varclaashidden = "hidden";

    const startDate = new Date();
    const setStartDate = new Date();

    let { imagePreviewUrl } = this.state.imagePreviewUrl;
    let { imagePreviewUrl1 } = this.state.imagePreviewUrl1;
    let { imagePreviewUrl2 } = this.state.imagePreviewUrl2;
    let { imagePreviewUrl3 } = this.state.imagePreviewUrl3;
    let $imagePreview = null;

    if (imagePreviewUrl || imagePreviewUrl1 || imagePreviewUrl2 || imagePreviewUrl3) {
      $imagePreview = (
        <div className="row" >
          {imagePreviewUrl != null &&
            <div className="col-sm-3 previewpadding">
              <div className="DeleeImgDiv" onClick={this.handledeleeImge.bind(this, 1)}>X</div>
              <img src={imagePreviewUrl} className="mypreviewimage" height="150px" />
            </div>
          }
          {imagePreviewUrl1 != null &&
            <div className="col-sm-3 previewpadding">
              <div className="DeleeImgDiv" onClick={this.handledeleeImge.bind(this, 2)}>X</div>
              <img src={imagePreviewUrl1} className="mypreviewimage" height="150px" />
            </div>
          }
          {imagePreviewUrl2 != null &&
            <div className="col-sm-3 mt-6 previewpadding">
              <div className="DeleeImgDiv" onClick={this.handledeleeImge.bind(this, 3)}>X</div>
              <img src={imagePreviewUrl2} className="mypreviewimage" height="150px" />
            </div>
          }
          {imagePreviewUrl3 != null &&
            <div className="col-sm-3 mt-6 previewpadding">
              <div className="DeleeImgDiv" onClick={this.handledeleeImge.bind(this, 4)}>X</div>
              <img src={imagePreviewUrl3} className="mypreviewimage" height="150px" />
            </div>
          }


        </div>
      );


    } else {
      $imagePreview = (<div className="previewText">Preview</div>);
    }

    return (
      <div className="row centeraligh">
        <div className="row ">
          <div className="container-fluid">
            <div className="row" >
              <div className="col-sm-12">
                {
                  this.state.loader == true &&
                  <div className="loader"></div>
                }
                <div className="row">

                  <div className="col-sm-12">
                    <div className="subheadings textalighleft"> Welcome: Advertise your property</div>
                  </div>

                </div>
                <div className="row">
                  {

                    this.state.parentdiv == 0 &&
                    <div className="row">
                      <div className="col-sm-12 ">
                        <div>Thanks and Welcome,let's list your Property</div>
                        <div className="col-sm-12">
                          <div className="iconsclassgray" > <FontAwesomeIcon icon={faHome} /></div>
                        </div>
                        <div className="col-sm-12">
                          <div className="iconsclassgray" >
                            <h3>Describe your place</h3></div>
                        </div>
                        <div className="col-sm-12">
                          <div className="iconsclassgray" >
                            <h5>bed, bathrooms, internet etc.</h5></div>
                        </div>
                      </div>

                    </div>
                  }

                  {
                    this.state.divcountre == 1 &&


                    <div className={this.state.divcountre == 1 ? this.state.visibleclass : this.state.hiddenclass}>

                      <div className="row textalighleft">
                        <div className="col-sm-12 textalighleft">Purpose </div>
                      </div>
                      <div className="row">

                        <div className="col-sm-2">
                          <div className={this.state.proposediv1}
                            onClick={this.handlePurpose.bind(this, 'Sale', '1')}>
                            Sale
                          </div>
                        </div>

                        <div className="col-sm-2">
                          <div className={this.state.proposediv2}
                            onClick={this.handlePurpose.bind(this, 'Rent', '2')}>
                            For Rent
                          </div>


                          {
                            this.state.Purpose == "Rent" &&
                            <div>
                              <input type="text" value={this.state.deposit} className="form-control" onChange={this.depositsclick} placeholder="Depotis"></input>
                            </div>

                          }

                        </div>


                        <div className="col-sm-1">

                          VIDEO

                        </div>
                        <div className="col-sm-4">

                          <input type="name" value={this.state.videolink}  className="form-control" onChange={this.videolinkchange} placeholder="Youtube | DailyMotion"></input>


                        </div>
                        <div className="col-sm-1">

                          DEAL

                        </div>
                        <div className="col-sm-1">


                          <input type="checkbox"
                            defaultChecked={this.state.chkbox}
                            onChange={this.handleChangeChk} value="DEAL" />


                        </div>



                      </div>



                      <div className="row textalighleft">

                        <div className="col-sm-12 textalighleft"> What type of Accomodation you are offering.</div>
                      </div>

                      <div className="row">
                        <div className="col-sm-2">
                          <div className={this.state.fdiv1Active}
                            onClick={this.handletypeofAccormodation.bind(this, 'Villa', '1')} >
                            Villa
                          </div>
                        </div>

                        <div className="col-sm-2">
                          <div className={this.state.fdiv2Active} onClick={this.handletypeofAccormodation.bind(this, 'Appartment', '2')}>
                            Appartment
                          </div>
                        </div>
                        <div className="col-sm-2">
                          <div className={this.state.fdiv3Active} onClick={this.handletypeofAccormodation.bind(this, 'Penthouse', '3')}>
                            Penthouse
                          </div>
                        </div>
                        <div className="col-sm-2">
                          <div className={this.state.fdiv4Active} onClick={this.handletypeofAccormodation.bind(this, 'Hotel Apartment', '4')}>
                            Hotel Apartment
                          </div>
                        </div>
                        <div className="col-sm-2">
                          <div className={this.state.fdiv5Active} onClick={this.handletypeofAccormodation.bind(this, 'Office', '5')}>
                            Office
                          </div>
                        </div>
                        <div className="col-sm-2">
                          <div className={this.state.fdiv6Active} onClick={this.handletypeofAccormodation.bind(this, 'Shop', '6')}>
                            Shop
                          </div>
                        </div>


                      </div>
                      <hr></hr>

                      <div className="row">
                        <div className="col-sm-12 textalighleft"> Introduce about property.</div>

                      </div>
                      <div className="row">
                        <div className="col-sm-12">


                          <input type="file" accept="image/*" multiple onChange={this.handleImageUpload.bind(this)} className="inputfilecss"></input>

                          <div className="imgPreview">
                            {$imagePreview}

                          </div>

                        </div>

                      </div>


                      <div className="row">
                        <div className="col-sm-4 textalighleft"> Share / Left Commmission</div>
                        <div className="col-sm-1 textalighleft ">
                        <input type="checkbox"
                           defaultChecked={this.state.chkboxcommisison}
                            onChange={this.handleChangecommisison} value="Zero Commission"  name="commissionchk"/>


                        </div>
                        <div className="col-sm-4 textalighleft commisioncss">
                           {this.state.CommissionLayout}

                        </div>

                      </div>

                      <hr></hr>
                      <div className="row">
                        <div className="col-sm-3 textalighleft"> Available  </div>
                        <div className="col-sm-3 textalighleft ">
                          <Toggle
                            defaultChecked={this.state.isavailable}
                            aria-label='No label tag'
                            onChange={this.handleChangetoggle.bind(this)} />


                        </div>
                        <div className="col-sm-3 textalighleft ">

                          Available Date
                        </div>
                        <div className="col-sm-3 textalighleft ">

                          <DatePicker selected={startDate}
                            onChange={this.handlechangeDateEvent} />
                        </div>
                      </div>



                      <hr></hr>

                    </div>
                  }

                  {
                    this.state.divcountre == 2 &&
                    <div className={this.state.divcountre == 2 ? this.state.visibleclass : this.state.hiddenclass}>


                      <div className="row textalighleft">
                        <div className="col-sm-12">
                          <div className="smalheadingcss">
                            Agent / Owner
                        </div>
                        </div>
                        <div className="col-sm-6">
                          <div className={this.state.agentdiv1} onClick={this.handleIsAgent.bind(this, 'Yes', '1')} >
                            Yes
                         </div>
                        </div>
                        <div className="col-sm-6">
                          <div className={this.state.agentdiv2} onClick={this.handleIsAgent.bind(this, 'No-Owner', '2')} >
                            Direct Owner
                         </div>
                        </div>

                      </div>

                      <div className="row textalighleft">
                        <div className="col-sm-12"> About the OwnerShip.</div>
                      </div>

                      <div className="row textalighleft">
                        <div className="col-sm-4">
                          <div className="smalheadingcss">
                            <input type="text" className="form-control" value={this.state.OwnerName} onChange={this.OwnerNamech} placeholder="Owner Name"></input>

                          </div>
                        </div>
                        <div className="col-sm-4">
                          <input type="text" className="form-control" value={this.state.OwnerEmail} onChange={this.OwnerEmailch} placeholder="Owner Email"></input>

                        </div>
                        <div className="col-sm-4">

                          <input type="text" className="form-control" value={this.state.OwnerPhone} onChange={this.OwnerNumberch} placeholder="Owner Number"></input>

                        </div>

                      </div>




                      <div className="row textalighleft">
                        <div className="col-sm-12"> About the Building.</div>
                      </div>

                      <div className="row textalighleft">
                        <div className="col-sm-3">
                          <div className="smalheadingcss">
                            <input type="text" className="form-control" value={this.state.BuildingNumber} onChange={this.BuildingNo} placeholder="Building #"></input>

                          </div>
                        </div>
                        <div className="col-sm-3">
                          <input type="text" className="form-control" value={this.state.UnitNumber} onChange={this.UnitNo} placeholder="Unit #"></input>

                        </div>
                        <div className="col-sm-3">

                          <input type="text" className="form-control" value={this.state.Size} onChange={this.handleSize} placeholder="Size"></input>

                        </div>


                        <div className="col-sm-3">

                          <input type="text" className="form-control" value={this.state.Shape} onChange={this.ShapeNo} placeholder="Room Shape"></input>

                        </div>



                      </div>


                      <div className="row textalighleft">
                        <div className="col-sm-12">
                          <div className="smalheadingcss">
                            Property Address
                        </div>
                          <div className="smalheadingcss">
                            {
                              //                            <input  type="text" className="form-control" onChange={this.handlepropertyAddress} placeholder="Search for area"></input>

                            }
                            <div>
                              <Lockz handlerhomek={this.handlerhomek} location={this.state.location} valueCity={this.state.City} />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row textalighleft">
                        <div className="col-sm-12">
                          <div className="smalheadingcss">
                            Total Bedrooms
                        </div>
                        </div>
                        <div className="col-sm-2">
                          <div className={this.state.totalbeddiv1} onClick={this.handletotalbed.bind(this, 'Studio', '100')} >
                            Studio
                          </div>
                        </div>
                        <div className="col-sm-2">
                          <div className={this.state.totalbeddiv2} onClick={this.handletotalbed.bind(this, '1', '1')} >
                            1
                         </div>
                        </div>
                        <div className="col-sm-2">
                          <div className={this.state.totalbeddiv3} onClick={this.handletotalbed.bind(this, '2', '2')} >
                            2
                         </div>
                        </div>
                        <div className="col-sm-2">
                          <div className={this.state.totalbeddiv4} onClick={this.handletotalbed.bind(this, '3', '3')} >
                            3
                         </div>
                        </div>
                        <div className="col-sm-2">
                          <div className={this.state.totalbeddiv5} onClick={this.handletotalbed.bind(this, '4', '4')} >
                            4
                         </div>
                        </div>
                        <div className="col-sm-2">
                          <div className={this.state.totalbeddiv6} onClick={this.handletotalbed.bind(this, '5plus', '5')} >
                            5+
                         </div>
                        </div>
                      </div>


                      <div className="row textalighleft">
                        <div className="col-sm-12">
                          <div className="smalheadingcss">
                            Total Bathrooms
                        </div>
                        </div>
                        <div className="col-sm-2">
                          <div className={this.state.totalbathdiv1} onClick={this.handletotalbathroom.bind(this, '1', '1')} >
                            1
                         </div>
                        </div>
                        <div className="col-sm-2">
                          <div className={this.state.totalbathdiv2} onClick={this.handletotalbathroom.bind(this, '2', '2')} >
                            2
                         </div>
                        </div>
                        <div className="col-sm-2">
                          <div className={this.state.totalbathdiv3} onClick={this.handletotalbathroom.bind(this, '3', '3')} >
                            3
                         </div>
                        </div>
                        <div className="col-sm-2">
                          <div className={this.state.totalbathdiv4} onClick={this.handletotalbathroom.bind(this, '4', '4')} >
                            4
                         </div>
                        </div>
                        <div className="col-sm-2">
                          <div className={this.state.totalbathdiv5} onClick={this.handletotalbathroom.bind(this, '5', '5')} >
                            5
                         </div>
                        </div>
                        <div className="col-sm-2">
                          <div className={this.state.totalbathdiv6} onClick={this.handletotalbathroom.bind(this, '6 plus', '6')} >
                            6+
                         </div>
                        </div>
                      </div>


                      <div className="row textalighleft">
                        <div className="col-sm-12">
                          <div className="smalheadingcss">
                            Parking
                        </div>
                        </div>
                        <div className="col-sm-6">
                          <div className={this.state.parkingdiv1} onClick={this.handleparking.bind(this, 'Yes', '1')} >
                            Yes
                         </div>
                        </div>
                        <div className="col-sm-6">
                          <div className={this.state.parkingdiv2} onClick={this.handleparking.bind(this, 'Not Avilable', '2')} >
                            Not available
                         </div>
                        </div>

                      </div>



                      <div className="row textalighleft">
                        <div className="col-sm-12">
                          <div className="smalheadingcss">
                            Internet
                        </div>
                        </div>
                        <div className="col-sm-6">
                          <div className={this.state.internetdiv1} onClick={this.handleinternet.bind(this, 'Yes', '1')} >
                            Yes
                         </div>
                        </div>
                        <div className="col-sm-6">
                          <div className={this.state.internetdiv2} onClick={this.handleinternet.bind(this, 'Not Avilable', '2')} >
                            Not available
                         </div>
                        </div>

                      </div>



                    </div>
                  }


                  {
                    this.state.divcountre == 3 &&
                    <div className={this.state.divcountre == 3 ? this.state.visibleclass : this.state.hiddenclass}>


                      <div className="row textalighleft">
                        <div className="row">

                          {
                            this.state.Purpose == "Rent" &&
                            <div className="col-sm-12"> Rent / Year</div>
                          }
                          {
                            this.state.Purpose != "Rent" &&
                            <div className="col-sm-12"> Price</div>
                          }

                        </div>
                        <input type="text" className="form-control" value={this.state.price} onChange={this.handleprince} placeholder="AED 0.00000"></input>

                      </div>







                      <div className="row textalighleft">
                        <div className="row">
                          <div className="col-sm-12"> Description</div>
                        </div>
                        <input type="textarea"
                          name="textValue" className="descrption" value={this.state.description}
                          onChange={this.handleChangetextarea.bind(this)}
                        />
                      </div>


                      <div className="row textalighleft">
                        <div className="col-sm-12">
                          <div className="" >
                            Room furnishing
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className={this.state.roomfunishdiv1} onClick={this.handleroomfuninishing.bind(this, 'Flexible', '1')} >
                            Flexible
                         </div>
                        </div>
                        <div className="col-sm-4">
                          <div className={this.state.roomfunishdiv2} onClick={this.handleroomfuninishing.bind(this, 'Furnished', '2')} >
                            Furnished
                         </div>
                        </div>

                        <div className="col-sm-4">
                          <div className={this.state.roomfunishdiv3} onClick={this.handleroomfuninishing.bind(this, 'Un-Furnished', '3')} >
                            Un-Furnished
                         </div>
                        </div>
                      </div>

                    </div>
                  }


                  {
                    this.state.divcountre == 5 &&
                    <div className={this.state.divcountre == 5 ? this.state.visibleclass : this.state.hiddenclass}>
                      <div className="row">
                        <div className="col-sm-12"> Room Features.</div>
                      </div>


                      <div className="row">


                        <div className="col-sm-3">
                          <div className={this.state.feturediv6} onClick={this.handleroomfeatures.bind(this, 'Wardrobe', '6')} >
                            Wardrobe
                         </div>
                        </div>

                        <div className="col-sm-3">
                          <div className={this.state.feturediv7} onClick={this.handleroomfeatures.bind(this, 'Drawers', '7')} >
                            Drawers
                         </div>
                        </div>

                        <div className="col-sm-3">
                          <div className={this.state.feturediv8} onClick={this.handleroomfeatures.bind(this, 'Air conditioner', '8')} >
                            AC
                         </div>
                        </div>


                        <div className="col-sm-3">
                          <div className={this.state.feturediv15} onClick={this.handleroomfeatures.bind(this, 'Balcony', '15')} >
                            Balcony
                      </div>
                        </div>


                        <div className="row textalighleft">
                          <div className="col-sm-12"> Rent  and time.</div>
                        </div>
                        <div className="row">
                          <div className="col-sm-4">
                            <div className="" >
                              <input type="text" className="form-control" onChange={this.handlearent} placeholder="$ rent"></input>
                            </div>
                          </div>
                          <div className="col-sm-4">
                            <div className="iconsclassgray" >
                              <input type="text" className="form-control" onChange={this.handlebond} placeholder="$ bonds"></input>
                            </div>
                          </div>
                          <div className="col-sm-4">
                            <div className="iconsclassgray" >
                              <input type="text" className="form-control" onChange={this.handlebills} placeholder="$ bills"></input>
                            </div>
                          </div>
                        </div>


                      </div>






                    </div>
                  }





                </div>
                <div className="row">
                  <div className="col-sm-3"></div>
                  <div className="col-sm-3">
                    {
                      this.state.divcountre > 0 &&
                      <Button className="mybuttons" onClick={this.handleClickBack} >Back</Button>

                    }

                  </div>
                  <div className="col-sm-3">
                    {
                      this.state.divcountre > 0 &&
                      <Button className="mybuttons" onClick={this.handleClick} >{this.state.buttontext}</Button>
                    }
                  </div>


                  <div className="col-sm-3"></div>
                </div>

                <div className="row">
                  <div className="col-sm-12">
                    {
                      this.state.divcountre == 0 &&
                      <Button className="mybuttons" onClick={this.handleClick} >{this.state.buttontext}</Button>

                    }

                  </div>

                </div>


              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }


  shoonChangewsp() {
    this.setState({
      value: 4
    });
  }

  handleClickBack() {
    var tmp = this.state.divcountre;
    var tmp1 = tmp - 1;

    var btntext = "Lets Start";
    if (tmp > 1 && tmp < 3) {
      btntext = "Next"
    }

    if (tmp1 == 3) {
      btntext = "Finish"
      tmp1 = 3;
    }

    if (tmp1 > 0) {
      this.setState({

        divcountre: tmp1,
        buttontext: btntext,
      });
    }

  }




  handleClick() {
    var tmp = this.state.divcountre;
    if (tmp < 4) {
      tmp = tmp + 1;
    }
    var btntext = "Next";
    if (tmp > 1 && tmp < 3) {
      btntext = "Next"
    }

    if (tmp == 3) {
      btntext = "Finish"
      tmp = 3;
    }

    if (tmp < 4) {
      this.setState({
        parentdiv: 2,
        visibleclass: "visible",
        hiddenclass: "hidden",
        divcountre: tmp,
        buttontext: btntext
      });
    }
    if (tmp == 4) {
      this.callingUpdate();
    }
  }


  handleGoBackClick() {
    var tmp = this.state.divcountre;
    tmp = tmp - 1;

    var btntext = "Next";
    if (tmp < 6) {
      btntext = "Next"

    }
    if (tmp == 1) {
      btntext = "Next"
    }

    this.setState({
      parentdiv: 2,
      visibleclass: "visible",
      hiddenclass: "hidden",
      divcountre: tmp,
      buttontext: btntext

    })
  }



  handlePurpose(val, divval) {

    if (divval == 1 || divval == "Sale") {
      this.setState({
        Purpose: 'Sale',
        proposediv1: "purposedivnormal",
        proposediv2: "normaldivbutton",

      });
    }

    if (divval == 2 || divval == "Rent") {
      this.setState({
        Purpose: 'Rent',
        proposediv1: "normaldivbutton",
        proposediv2: "purposedivnormal",

      });
    }
  }

  handletypeofAccormodation(val, divval) {
    if (divval == 1 || divval == "Villa") {
      this.setState({
        typeofAccomodation: val,
        fdiv1Active: "fdvihover",
        fdiv2Active: "normaldivbutton",
        fdiv3Active: "normaldivbutton",
        fdiv4Active: "normaldivbutton",
        fdiv5Active: "normaldivbutton",
        fdiv6Active: "normaldivbutton",


      });
    }

    if (divval == 2 || divval == "Appartment") {
      this.setState({
        typeofAccomodation: val,
        fdiv2Active: "fdvihover",
        fdiv1Active: "normaldivbutton",
        fdiv3Active: "normaldivbutton",
        fdiv4Active: "normaldivbutton",
        fdiv5Active: "normaldivbutton",
        fdiv6Active: "normaldivbutton",
      });
    }


    if (divval == 3 || divval == "Penthouse") {
      this.setState({
        typeofAccomodation: val,
        fdiv1Active: "normaldivbutton",
        fdiv2Active: "normaldivbutton",
        fdiv3Active: "fdvihover",
        fdiv4Active: "normaldivbutton",
        fdiv5Active: "normaldivbutton",
        fdiv6Active: "normaldivbutton",
      });
    }
    if (divval == 4 || divval == "Hotel Apartment") {
      this.setState({
        typeofAccomodation: val,
        fdiv1Active: "normaldivbutton",
        fdiv2Active: "normaldivbutton",
        fdiv3Active: "normaldivbutton",
        fdiv4Active: "fdvihover",
        fdiv5Active: "normaldivbutton",
        fdiv6Active: "normaldivbutton",
      });
    }
    if (divval == 5 || divval == "Office") {
      this.setState({
        typeofAccomodation: val,
        fdiv1Active: "normaldivbutton",
        fdiv2Active: "normaldivbutton",
        fdiv3Active: "normaldivbutton",
        fdiv4Active: "normaldivbutton",
        fdiv5Active: "fdvihover",
        fdiv6Active: "normaldivbutton",
      });
    }
    if (divval == 6 || divval == "Shop") {
      this.setState({
        typeofAccomodation: val,
        fdiv1Active: "normaldivbutton",
        fdiv2Active: "normaldivbutton",
        fdiv3Active: "normaldivbutton",
        fdiv4Active: "normaldivbutton",
        fdiv5Active: "normaldivbutton",
        fdiv6Active: "fdvihover",
      });
    }


  }

  handlepropertyAddress(event) {
    this.setState({
      propertyAddress: event.target.value,
      location: event.target.value,
    });
  }

  BuildingNo(event) {
    this.setState({
      BuildingNumber: event.target.value,
    });
  }

  UnitNo(event) {
    this.setState({
      UnitNumber: event.target.value,
    });
  }

  ShapeNo(event) {
    this.setState({
      Shape: event.target.value,
    });
  }


  OwnerEmailch(event) {
    this.setState({
      OwnerEmail: event.target.value,
    });
  }

  OwnerNumberch(event) {
    this.setState({
      OwnerPhone: event.target.value,
    });
  }

  OwnerNamech(event) {
    this.setState({
      OwnerName: event.target.value,
    });
  }

  handleSize(event) {
    this.setState({
      Size: event.target.value,
    });
  }


  handletotalbed(val, tbval) {
    switch (tbval) {

      case "100":
        this.setState({
          totalbed: val,
          totalbeddiv1: "innervbuutonhover",
          totalbeddiv2: "innervbuuton",
          totalbeddiv3: "innervbuuton",
          totalbeddiv4: "innervbuuton",
          totalbeddiv5: "innervbuuton",
          totalbeddiv6: "innervbuuton",

        });
        break;

      case "1":
        this.setState({
          totalbed: val,
          totalbeddiv1: "innervbuuton",
          totalbeddiv2: "innervbuutonhover",
          totalbeddiv3: "innervbuuton",
          totalbeddiv4: "innervbuuton",
          totalbeddiv5: "innervbuuton",
          totalbeddiv6: "innervbuuton",

        });
        break;

      case "2":
        this.setState({
          totalbed: val,
          totalbeddiv1: "innervbuuton",
          totalbeddiv2: "innervbuuton",
          totalbeddiv3: "innervbuutonhover",
          totalbeddiv4: "innervbuuton",
          totalbeddiv5: "innervbuuton",
          totalbeddiv6: "innervbuuton",

        });
        break;


      case "3":
        this.setState({
          totalbed: val,
          totalbeddiv1: "innervbuuton",
          totalbeddiv2: "innervbuuton",
          totalbeddiv3: "innervbuuton",
          totalbeddiv4: "innervbuutonhover",
          totalbeddiv5: "innervbuuton",
          totalbeddiv6: "innervbuuton",

        });
        break;


      case "4":
        this.setState({
          totalbed: val,
          totalbeddiv1: "innervbuuton",
          totalbeddiv2: "innervbuuton",
          totalbeddiv3: "innervbuuton",
          totalbeddiv4: "innervbuuton",
          totalbeddiv5: "innervbuutonhover",
          totalbeddiv6: "innervbuuton",

        });
        break;


      case "5":
        this.setState({
          totalbed: val,
          totalbeddiv1: "innervbuuton",
          totalbeddiv2: "innervbuuton",
          totalbeddiv3: "innervbuuton",
          totalbeddiv4: "innervbuuton",
          totalbeddiv5: "innervbuuton",
          totalbeddiv6: "innervbuutonhover",

        });
        break;


      case "6":
        this.setState({
          totalbed: val,
          totalbeddiv1: "innervbuuton",
          totalbeddiv2: "innervbuuton",
          totalbeddiv3: "innervbuuton",
          totalbeddiv4: "innervbuuton",
          totalbeddiv5: "innervbuuton",
          totalbeddiv6: "innervbuutonhover",

        });
        break;


    }


  }

  handletotalbathroom(val, btval) {
    switch (btval) {

      case "1":
        this.setState({
          totalbathrooms: val,
          totalbathdiv1: "innervbuutonhover",
          totalbathdiv2: "innervbuuton",
          totalbathdiv3: "innervbuuton",
          totalbathdiv4: "innervbuuton",
          totalbathdiv5: "innervbuuton",
          totalbathdiv6: "innervbuuton",

        });
        break;

      case "2":
        this.setState({
          totalbathrooms: val,
          totalbathdiv1: "innervbuuton",
          totalbathdiv2: "innervbuutonhover",
          totalbathdiv3: "innervbuuton",
          totalbathdiv4: "innervbuuton",
          totalbathdiv5: "innervbuuton",
          totalbathdiv6: "innervbuuton",

        });
        break;


      case "3":
        this.setState({
          totalbathrooms: val,
          totalbathdiv1: "innervbuuton",
          totalbathdiv2: "innervbuuton",
          totalbathdiv3: "innervbuutonhover",
          totalbathdiv4: "innervbuuton",
          totalbathdiv5: "innervbuuton",
          totalbathdiv6: "innervbuuton",

        });
        break;


      case "4":
        this.setState({
          totalbathrooms: val,
          totalbathdiv1: "innervbuuton",
          totalbathdiv2: "innervbuuton",
          totalbathdiv3: "innervbuuton",
          totalbathdiv4: "innervbuutonhover",
          totalbathdiv5: "innervbuuton",
          totalbathdiv6: "innervbuuton",

        });
        break;


      case "5":
        this.setState({
          totalbathrooms: val,
          totalbathdiv1: "innervbuuton",
          totalbathdiv2: "innervbuuton",
          totalbathdiv3: "innervbuuton",
          totalbathdiv4: "innervbuuton",
          totalbathdiv5: "innervbuutonhover",
          totalbathdiv6: "innervbuuton",

        });
        break;


      case "6":
        this.setState({
          totalbathrooms: val,
          totalbathdiv1: "innervbuuton",
          totalbathdiv2: "innervbuuton",
          totalbathdiv3: "innervbuuton",
          totalbathdiv4: "innervbuuton",
          totalbathdiv5: "innervbuuton",
          totalbathdiv6: "innervbuutonhover",

        });
        break;


    }
  }

  handleparking(val, pval) {

    if (pval == 1 || pval == "Yes") {
      this.setState({
        parking: val,
        parkingdiv1: "innervbuutonhover",
        parkingdiv2: "innervbuuton",
      });
    }
    if (pval == 2 || pval == "No") {
      this.setState({
        parking: val,
        parkingdiv1: "innervbuuton",
        parkingdiv2: "innervbuutonhover",
      });
    }

  }

  handleIsAgent(val, pval) {

    if (pval == 1) {
      this.setState({
        AgentId: val,
        agentdiv1: "innervbuutonhover",
        agentdiv2: "innervbuuton",
      });
    }
    if (pval == 2) {
      this.setState({
        AgentId: val,
        agentdiv1: "innervbuuton",
        agentdiv2: "innervbuutonhover",
      });
    }

  }

  handleinternet(val, ival) {


    if (ival == 1 || ival == "Yes") {
      this.setState({
        internet: val,
        internetdiv1: "innervbuutonhover",
        internetdiv2: "innervbuuton",
      });
    }
    if (ival == 2 | ival == "No") {
      this.setState({
        internet: val,
        internetdiv1: "innervbuuton",
        internetdiv2: "innervbuutonhover",
      });
    }



  }


  handleinternetEdit(val) {


    if (val == "Yes") {
      this.setState({
        internet: val,
        internetdiv1: "innervbuutonhover",
        internetdiv2: "innervbuuton",
      });
    }
    if (val =="Not available") {
      this.setState({
        internet: val,
        internetdiv1: "innervbuuton",
        internetdiv2: "innervbuutonhover",
      });
    }



  }

  handleflatemates(val, fval) {


    switch (fval) {
      case "1":
        this.setState({
          totalflatmates: val,
          flatmatediv1: "innervbuutonhover",
          flatmatediv2: "innervbuuton",
          flatmatediv3: "innervbuuton",
          flatmatediv4: "innervbuuton",
          flatmatediv5: "innervbuuton",
          flatmatediv6: "innervbuuton",
        });
        break;

      case "2":
        this.setState({
          totalflatmates: val,
          flatmatediv2: "innervbuutonhover",
          flatmatediv1: "innervbuuton",
          flatmatediv3: "innervbuuton",
          flatmatediv4: "innervbuuton",
          flatmatediv5: "innervbuuton",
          flatmatediv6: "innervbuuton",
        });
        break;

      case "3":
        this.setState({
          totalflatmates: val,
          flatmatediv3: "innervbuutonhover",
          flatmatediv2: "innervbuuton",
          flatmatediv1: "innervbuuton",
          flatmatediv4: "innervbuuton",
          flatmatediv5: "innervbuuton",
          flatmatediv6: "innervbuuton",
        });
        break;

      case "4":
        this.setState({
          totalflatmates: val,
          flatmatediv4: "innervbuutonhover",
          flatmatediv2: "innervbuuton",
          flatmatediv3: "innervbuuton",
          flatmatediv1: "innervbuuton",
          flatmatediv5: "innervbuuton",
          flatmatediv6: "innervbuuton",
        });
        break;

      case "5":
        this.setState({
          totalflatmates: val,
          flatmatediv5: "innervbuutonhover",
          flatmatediv2: "innervbuuton",
          flatmatediv3: "innervbuuton",
          flatmatediv4: "innervbuuton",
          flatmatediv1: "innervbuuton",
          flatmatediv6: "innervbuuton",
        });
        break;


      case "6":
        this.setState({
          totalflatmates: val,
          flatmatediv6: "innervbuutonhover",
          flatmatediv2: "innervbuuton",
          flatmatediv3: "innervbuuton",
          flatmatediv4: "innervbuuton",
          flatmatediv5: "innervbuuton",
          flatmatediv1: "innervbuuton",
        });
        break;
    }

  }

  handlebathroom(val, bval) {
    if (bval == 1) {
      this.setState({
        bathroompdiv1: "innervbuutonhover",
        bathroompdiv2: "innervbuuton",
        bathroompdiv3: "innervbuuton",
        bathroom: val,
      });
    }

    if (bval == 2) {
      this.setState({
        bathroompdiv1: "innervbuuton",
        bathroompdiv2: "innervbuutonhover",
        bathroompdiv3: "innervbuuton",
        bathroom: val,
      });
    }

    if (bval == 3) {
      this.setState({
        bathroompdiv1: "innervbuuton",
        bathroompdiv2: "innervbuuton",
        bathroompdiv3: "innervbuutonhover",
        bathroom: val,
      });
    }

  }

  handleroomfuninishing(val, fuval) {
    if (fuval == 1 || val=="Flexible")  {
      this.setState({
        roomfunishdiv1: "innervbuutonhover",
        roomfunishdiv2: "innervbuuton",
        roomfunishdiv3: "innervbuuton",
        roomfuninishing: val,
      });
    }

    if (fuval == 2 || val=="Furnished") {
      this.setState({
        roomfunishdiv1: "innervbuuton",
        roomfunishdiv2: "innervbuutonhover",
        roomfunishdiv3: "innervbuuton",
        roomfuninishing: val,
      });
    }

    if (fuval == 3 || val=="Un-Furnished") {
      this.setState({
        roomfunishdiv1: "innervbuuton",
        roomfunishdiv2: "innervbuuton",
        roomfunishdiv3: "innervbuutonhover",
        roomfuninishing: val,
      });
    }



  }

  handlebedsize(val, bdval) {
    switch (bdval) {
      case "1": this.setState({
        bedsizediv1: "innervbuutonhover",
        bedsizediv2: "innervbuuton",
        bedsizediv3: "innervbuuton",
        bedsizediv4: "innervbuuton",
        bedsize: val,
      });
        break;


      case "2": this.setState({
        bedsizediv1: "innervbuuton",
        bedsizediv2: "innervbuutonhover",
        bedsizediv3: "innervbuuton",
        bedsizediv4: "innervbuuton",
        bedsize: val,
      });
        break;


      case "3": this.setState({
        bedsizediv1: "innervbuuton",
        bedsizediv2: "innervbuuton",
        bedsizediv3: "innervbuutonhover",
        bedsizediv4: "innervbuuton",
        bedsize: val,
      });
        break;


      case "4": this.setState({
        bedsizediv1: "innervbuuton",
        bedsizediv2: "innervbuuton",
        bedsizediv3: "innervbuuton",
        bedsizediv4: "innervbuutonhover",
        bedsize: val,
      });
        break;
    }

  }

  handleroomfeatures(val, fval) {
    var tmpfeature = this.state.roomfeatures;
    var newfinalfeature = tmpfeature + "," + val;
    switch (fval) {
      case "1":
        this.setState({
          roomfeatures: newfinalfeature,
          feturediv1: "innervbuutonhover",
        });
        break;

      case "2":
        this.setState({
          roomfeatures: newfinalfeature,
          feturediv2: "innervbuutonhover",
        });
        break;

      case "3":
        this.setState({
          roomfeatures: newfinalfeature,
          feturediv3: "innervbuutonhover",
        });
        break;

      case "4":
        this.setState({
          roomfeatures: newfinalfeature,
          feturediv4: "innervbuutonhover",
        });
        break;


      case "5":
        this.setState({
          roomfeatures: newfinalfeature,
          feturediv5: "innervbuutonhover",
        });
        break;


      case "6":
        this.setState({
          roomfeatures: newfinalfeature,
          feturediv6: "innervbuutonhover",
        });
        break;

      case "7":
        this.setState({
          roomfeatures: newfinalfeature,
          feturediv7: "innervbuutonhover",
        });
        break;

      case "8":
        this.setState({
          roomfeatures: newfinalfeature,
          feturediv8: "innervbuutonhover",
        });
        break;

      case "9":
        this.setState({
          roomfeatures: newfinalfeature,
          feturediv9: "innervbuutonhover",
        });
        break;

      case "10":
        this.setState({
          roomfeatures: newfinalfeature,
          feturediv10: "innervbuutonhover",
        });
        break;

      case "11":
        this.setState({
          roomfeatures: newfinalfeature,
          feturediv11: "innervbuutonhover",
        });
        break;

      case "12":
        this.setState({
          roomfeatures: newfinalfeature,
          feturediv12: "innervbuutonhover",
        });
        break;

      case "13":
        this.setState({
          roomfeatures: newfinalfeature,
          feturediv13: "innervbuutonhover",
        });
        break;

      case "14":
        this.setState({
          roomfeatures: newfinalfeature,
          feturediv14: "innervbuutonhover",
        });
        break;

      case "15":
        this.setState({
          roomfeatures: newfinalfeature,
          feturediv15: "innervbuutonhover",
        });
        break;

      case "16":
        this.setState({
          roomfeatures: newfinalfeature,
          feturediv16: "innervbuutonhover",
        });
        break;

    }

  }

  handlearent(event) {
    this.setState({
      rent: event.target.value,
    });
  }

  handlebond(event) {
    this.setState({
      bonds: event.target.value,
    });
  }

  handlebills(event) {
    this.setState({
      bills: event.target.value,
    });
  }

  hovermefdiv1() {
    this.setState({ fdiv1Active: "fdvihover" });
  }

  removehovermefdiv1(e) {

    this.setState({ fdiv1Active: "normaldivbutton" });
  }

  hovermefdiv2() { this.setState({ fdiv2Active: "fdvihover" }); }

  removehovermefdiv2(e) { this.setState({ fdiv2Active: "normaldivbutton" }); }

  hovermefdiv3() { this.setState({ fdiv3Active: "fdvihover" }); }

  removehovermefdiv3(e) { this.setState({ fdiv3Active: "normaldivbutton" }); }

  hovermefdiv4() { this.setState({ fdiv4Active: "fdvihover" }); }

  removehovermefdiv4(e) { this.setState({ fdiv4Active: "normaldivbutton" }); }

  handleChangeChk = () => {
    var tmpcheckbox=0;
    var tmpischeck=false;
    if (this.state.isChecked==true){
      tmpcheckbox=0;
      tmpischeck=false;
    }else{
      tmpcheckbox=1;
      tmpischeck=true;
    }
    this.setState({
      isChecked: tmpischeck,
      deal:tmpcheckbox,
      chkbox:tmpischeck

    });
  }

  handleChangecommisison = () => {
var tmpcheckbox=0;
var tmpischeck=false;
var TmpCommissionLayout="";
if (this.state.isChecked==true){
  tmpcheckbox=0;
  tmpischeck=false;
  TmpCommissionLayout="Commission is in place";


}else{
  tmpcheckbox=1;
  tmpischeck=true;
  TmpCommissionLayout="No Commission - Earn with us!!! 0.1% on each";
}

    this.setState({
      isChecked: tmpischeck,//!this.state.isChecked,
      commission:tmpcheckbox,
      chkboxcommisison:tmpischeck,
      CommissionLayout:TmpCommissionLayout,
    });
  }



  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  handleChangetoggle(event) {
    // do something with event.target.checked
    var tmpIsavailable=true;
    if (event.target.isChecked==undefined){
      tmpIsavailable=false;
    }
    this.setState({
     isavailable:tmpIsavailable,

    });

  }

  handlechangeDateEvent(event) {

    var tempavailable = event.getDate() + "-" + event.getMonth() + "-" + event.getFullYear();

    alert(tempavailable);

    this.setState({
      availabledate: tempavailable,

    });


  }




  constructor(props) {
    super(props);
    this.state = {
      PropertyId:0,
      LoginUserID: this.props.UserID,
      AgentMobile: this.props.AgentMobile,
      AgentPic: this.props.AgentPic,
      AgentName: this.props.AgentName,
      AgentComapny: this.props.AgentComapny,
      value: 2,
      divcountre: 0,
      currentclass: "hidden",
      parentdiv: 0,
      buttontext: "Lets Start",
      location: "",
      typeofAccomodation: "",
      propertyAddress: "",
      totalbed: "",
      totalbathrooms: "",
      parking: "",
      internet: "",
      blobtoken: "",
      deal: "1",
      Purpose: "",
      City: "",
      Country: "",

      roomfuninishing: "",
      bathroom: "",
      rent: "",

      imagePreviewUrl: uploader,
      imagePreviewUrl1: uploader,
      imagePreviewUrl2: uploader,
      imagePreviewUrl3: uploader,

      picscounter: 0,
      AgentId: 0,//mean hei owner

      picstring: "",
      picstring1: "",
      picstring2: "",
      picstring3: "",

      divActiveClass: "normaldivbutton",
      innerdivActiveClass: "innervbuuton",

      divhoverClass: "normaldivbuttonhover",
      fdiv1Active: "normaldivbutton",

      fdiv2Active: "normaldivbutton",
      fdiv3Active: "normaldivbutton",
      fdiv4Active: "normaldivbutton",

      fdiv5Active: "normaldivbutton",
      fdiv6Active: "normaldivbutton",


      agentdiv1: "innervbuuton",
      agentdiv2: "innervbuuton",



      totalbeddiv1: "innervbuuton",
      totalbeddiv2: "innervbuuton",
      totalbeddiv3: "innervbuuton",
      totalbeddiv4: "innervbuuton",
      totalbeddiv5: "innervbuuton",
      totalbeddiv6: "innervbuuton",

      totalbathdiv1: "innervbuuton",
      totalbathdiv2: "innervbuuton",
      totalbathdiv3: "innervbuuton",
      totalbathdiv4: "innervbuuton",
      totalbathdiv5: "innervbuuton",
      totalbathdiv6: "innervbuuton",

      parkingdiv1: "innervbuuton",
      parkingdiv2: "innervbuuton",

      proposediv1: "innervbuuton",
      proposediv2: "innervbuuton",





      internetdiv1: "innervbuuton",
      internetdiv2: "innervbuuton",

      flatmatediv1: "innervbuuton",
      flatmatediv2: "innervbuuton",
      flatmatediv3: "innervbuuton",
      flatmatediv4: "innervbuuton",
      flatmatediv5: "innervbuuton",
      flatmatediv6: "innervbuuton",

      roomtypediv1: "innervbuuton",
      roomtypediv2: "innervbuuton",

      roomfunishdiv1: "innervbuuton",
      roomfunishdiv2: "innervbuuton",
      roomfunishdiv3: "innervbuuton",

      bathroompdiv1: "innervbuuton",
      bathroompdiv2: "innervbuuton",
      bathroompdiv3: "innervbuuton",


      feturediv1: "innervbuuton",
      feturediv2: "innervbuuton",
      feturediv3: "innervbuuton",
      feturediv4: "innervbuuton",
      feturediv5: "innervbuuton",
      feturediv6: "innervbuuton",
      feturediv7: "innervbuuton",
      feturediv8: "innervbuuton",
      feturediv9: "innervbuuton",
      feturediv10: "innervbuuton",
      feturediv11: "innervbuuton",
      feturediv12: "innervbuuton",
      feturediv13: "innervbuuton",
      feturediv14: "innervbuuton",
      feturediv15: "innervbuuton",
      feturediv16: "innervbuuton",

      bedsizediv1: "innervbuuton",
      bedsizediv2: "innervbuuton",
      bedsizediv3: "innervbuuton",
      bedsizediv4: "innervbuuton",
      loader: false,
      price: "0.000",
      longitude: "",
      latitude: "",
      description: "",

      OwnerName: "",
      OwnerEmail: "",
      wnerPhone: "",
      Status: "Pending",
      BuildingNumber: "",
      UnitNumber: "",
      Shape: "",
      FloorPlanid: "",
      Size: "",

      companylogo: this.props.companylogo,
      videolink: "",
      chkbox: true,
      deposit: 0,

      ItemObject: this.props.ItemObject,
      img1: "", img2: "",
      img3: "",
      img4: "",
      imgstarturl: "https://userfunctionsapi.blob.core.windows.net/myfiles/",
      imgStartEnd:"?sp=racwl&st=2021-05-01T11:28:44Z&se=2022-06-02T19:28:44Z&spr=https&sv=2020-02-10&sr=c&sig=CMHe7DnT6YTT%2BjGOHPNZchA6%2BxMkI%2FsGrL3u5fe7dEU%3D",
      imgStartEndProfiel:"?sp=racwl&st=2021-05-01T02:35:50Z&se=2022-04-01T10:35:50Z&spr=https&sv=2020-02-10&sr=c&sig=mrZf3kuJCGKnS%2F6QlhMMBSNtSo04oxr%2BMq8uOIO%2BOcg%3D",
      commission:0,
      chkboxcommisison:false,
      CommissionLayout:"Commission is in place as per %",

      isavailable: true,
      availabledate: "",

    }

    this.handlechangeDateEvent = this.handlechangeDateEvent.bind(this);
    this.handleChangetoggle = this.handleChangetoggle.bind(this);


    this.handleClickBack = this.handleClickBack.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleGoBackClick = this.handleGoBackClick.bind(this);

    this.hovermefdiv1 = this.hovermefdiv1.bind(this);
    this.removehovermefdiv1 = this.removehovermefdiv1.bind(this);

    this.hovermefdiv2 = this.hovermefdiv2.bind(this);
    this.removehovermefdiv2 = this.removehovermefdiv2.bind(this);

    this.hovermefdiv3 = this.hovermefdiv3.bind(this);
    this.removehovermefdiv3 = this.removehovermefdiv3.bind(this);
    this.hovermefdiv4 = this.hovermefdiv4.bind(this);
    this.removehovermefdiv4 = this.removehovermefdiv4.bind(this);
    this.handlearent = this.handlearent.bind(this);
    this.handlebond = this.handlebond.bind(this);
    this.handlebills = this.handlebills.bind(this);
    this.handlepropertyAddress = this.handlepropertyAddress.bind(this);
    this.handleprince = this.handleprince.bind(this);
    this.handleChangetextarea = this.handleChangetextarea.bind(this);


    this.OwnerNamech = this.OwnerNamech.bind(this);
    this.handleSize = this.handleSize.bind(this);
    this.OwnerNumberch = this.OwnerNumberch.bind(this);
    this.OwnerEmailch = this.OwnerEmailch.bind(this);
    this.ShapeNo = this.ShapeNo.bind(this);
    this.UnitNo = this.UnitNo.bind(this);
    this.BuildingNo = this.BuildingNo.bind(this);

    this.videolinkchange = this.videolinkchange.bind(this);
    this.handleChangeChk = this.handleChangeChk.bind(this);
    this.handleinternetEdit = this.handleinternetEdit.bind(this);
    this.handleChangecommisison = this.handleChangecommisison.bind(this);


    this.videolinkchangeItemBind = this.videolinkchangeItemBind.bind(this);

    this.depositsclick = this.depositsclick.bind(this);
this.handledeleeImge =this.handledeleeImge.bind(this);

  }

}

export default withTranslation()(Propertyedit);
