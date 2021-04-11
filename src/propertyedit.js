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
library.add(faCog, faAtlas, faCheck, faBriefcase, faBackward, faHome)
export class Propertyedit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      img1:"",img2:"",
      img3:"",
      img4:"",
      imgstarturl: "https://userfunctionsapi.blob.core.windows.net/myfiles/",
      imgStartEnd: "?sv=2019-12-12&ss=bfqt&srt=sco&sp=rwdlacupx&se=2021-05-05T13:55:52Z&st=2020-11-29T05:55:52Z&spr=https&sig=gZDBO%2Fbxzt9m%2F8jcbH0t6UV5%2FxW87Dyk3C1XIGcCSQM%3D",



    }


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

    this.depositsclick = this.depositsclick.bind(this);


  }
  handleChangeChk = () => {
    this.setState({
      isChecked: !this.state.isChecked,
      deal: 1
    });
  }
  componentDidMount() {
    this.getblobtoken();
    this.BindItem();
  }

  async BindItem() {
    this.handlePurpose(this.state.ItemObject[0]["Purpose"], this.state.ItemObject[0]["Purpose"]);
    //this.videolinkchange(this.state.ItemObject[0]["VideoLink"]);
    var TempDetail = this.state.ItemObject[0]["Deal"];

    var TmpBoolean = false;
    if (TempDetail == "1") {
      TmpBoolean = true;
    }
    this.setState({
      isChecked: TmpBoolean,
      deal: TempDetail,
      videolink: this.state.ItemObject[0]["VideoLink"],

      imagePreviewUrl: this.state.imgstarturl + this.state.ItemObject[0]["picsstringone"]+ this.state.imgStartEnd,
      imagePreviewUrl1: this.state.imgstarturl +this.state.ItemObject[0]["picsstringthree"] + this.state.imgStartEnd,
      imagePreviewUrl2: this.state.imgstarturl + this.state.ItemObject[0]["picsstringtwo"]+ this.state.imgStartEnd,
      imagePreviewUrl3: this.state.ItemObject[0]["picstring"],
      AgentId:this.state.ItemObject[0]["AgentId"],
      typeofAccomodation:this.state.ItemObject[0]["Type"],
      OwnerName:this.state.ItemObject[0]["OwnerName"],
      OwnerEmail:this.state.ItemObject[0]["OwnerEmail"],
      OwnerPhone:this.state.ItemObject[0]["OwnerPhone"],
      BuildingNo:this.state.ItemObject[0]["BuildingNumber"],
      UnitNumber:this.state.ItemObject[0]["UnitNumber"],
      Shape:this.state.ItemObject[0]["Shape"],
      Size:this.state.ItemObject[0]["Size"],
      propertyAddress:  this.state.ItemObject[0]["Type"] ,
      location: this.state.ItemObject[0]["Location"],
      longitude: this.state.ItemObject[0]["long"],
      latitude: this.state.ItemObject[0]["lat"],
      City: this.state.ItemObject[0]["City"],
      totalbed:this.state.ItemObject[0]["Bedrooms"],
      totalbathrooms:this.state.ItemObject[0]["totalbathrooms"],
      parking:this.state.ItemObject[0]["parking"],
      internet:this.state.ItemObject[0]["internet"],
      price:this.state.ItemObject[0]["Price"],
      description:this.state.ItemObject[0]["description"],
      roomfuninishing:this.state.ItemObject[0]["FurnishedTyope"],





    });

    console.log(this.state.OwnerName);


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

    const data = {
      LoginUserID: this.state.LoginUserID,
      location: this.state.location,
      typeofAccomodation: this.state.typeofAccomodation,
      propertyAddress: this.state.propertyAddress,
      totalbed: this.state.totalbed,
      totalbathrooms: this.state.totalbathrooms,
      parking: this.state.parking,
      internet: this.state.internet,
      Price: this.state.price,
      roomfuninishing: this.state.roomfuninishing,
      picstring: this.state.picstring,
      picstringone: this.state.picstring1,
      picstringtwo: this.state.picstring2,
      picstringthree: this.state.picstring3,
      itemid: this.uuidv4(),
      AgentId: this.state.AgentId,//mean it is owner
    };
    //a/lert(this.state.deposit);
    console.log(this.state.deposit);
    var headerurl = `https://userfunctionsapi.azurewebsites.net/api/HttpTriggerProperty?code=ir1wJ4Nz5UQTl5jHM4K1IjP7oCCt2oJqXDhtwOv9ryoPH2ZRhpxc6w==&functiontype=insert`;
    var regurl = headerurl + `&UserName=${this.state.LoginUserID}&Type=${this.state.typeofAccomodation}&Location=${this.state.location}&Bedrooms=${this.state.totalbed}&totalbathrooms=${this.state.totalbathrooms}&parking=${this.state.parking}&internet=${this.state.internet}&Price=${this.state.price}&FurnishedTyope=${this.state.roomfuninishing}&State=${this.state.location}&Deal=${this.state.deal}&picstring=${this.state.picstring}&picsstringone=${this.state.picstring1}&picsstringtwo=${this.state.picstring2}&picsstringthree=${this.state.picstring3}&AgentId=${this.state.AgentId}&AgentPic=${this.state.AgentPic}&AgentNumber=${this.state.AgentMobile}&long=${this.state.longitude}&lat=${this.state.latitude}&description=${this.state.description}&agentname=${this.state.AgentName}&agentcompany=${this.state.AgentComapny}&Purpose=${this.state.Purpose}&City=${this.state.City}&OwnerName=${this.state.OwnerName}&OwnerEmail=${this.state.OwnerEmail}&OwnerPhone=${this.state.OwnerPhone}&Status=${this.state.Status}&BuildingNumber=${this.state.BuildingNo}&UnitNumber=${this.state.UnitNumber}&Shape=${this.state.Shape}&FloorPlanid=${this.state.FloorPlanid}&Size=${this.state.Size}&VideoLink=${this.state.videolink}&companylogo=${this.state.companylogo}&deposit=${this.state.deposit}`
    try {
      let res = await axios.post(regurl);
      this.setState({
        universalid: res,
        loader: false,

      });
      //useridfromdb, AgentMobile, agentPic, agentCompany, agentname,companylogo
      this.props.handleRegisnteredUserId(this.state.LoginUserID, this.state.AgentMobile, this.state.AgentPic, this.state.AgentComapny, this.state.AgentName, this.state.companylogo);
      // console.log(res.data);
    } catch (error) {
      //console.log(error);
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


  videolinkchange(event) {

    this.setState({
      videolink: event.target.value

    });
  }

  handleChangetextarea(event) {
    this.setState({
      description: event.target.value,

    });
  }

  render() {
    const varclaas = "visible";
    const varclaashidden = "hidden";

    let { imagePreviewUrl } = this.state;
    let { imagePreviewUrl1 } = this.state;
    let { imagePreviewUrl2 } = this.state;
    let { imagePreviewUrl3 } = this.state;
    let $imagePreview = null;

    if (imagePreviewUrl) {
      $imagePreview = (
        <div className="row" >
          {imagePreviewUrl != null &&
            <div className="col-sm-3 previewpadding">
              <img src={imagePreviewUrl} className="mypreviewimage" />
            </div>
          }
          {imagePreviewUrl1 != null &&
            <div className="col-sm-3 previewpadding">
              <img src={imagePreviewUrl1} className="mypreviewimage" />
            </div>
          }
          {imagePreviewUrl2 != null &&
            <div className="col-sm-3 mt-6 previewpadding">
              <img src={imagePreviewUrl2} className="mypreviewimage" />
            </div>
          }
          {imagePreviewUrl3 != null &&
            <div className="col-sm-3 mt-6 previewpadding">
              <img src={imagePreviewUrl3} className="mypreviewimage" />
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
                              <input type="text" className="form-control" onChange={this.depositsclick} placeholder="Depotis"></input>
                            </div>

                          }

                        </div>


                        <div className="col-sm-1">

                          VIDEO

                        </div>
                        <div className="col-sm-4">

                          <input type="name" className="form-control" onChange={this.videolinkchange} placeholder="Youtube | DailyMotion"></input>


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

                          <input type="text" className="form-control" value={this.state.OwnerPhone}  onChange={this.OwnerNumberch} placeholder="Owner Number"></input>

                        </div>

                      </div>




                      <div className="row textalighleft">
                        <div className="col-sm-12"> About the Building.</div>
                      </div>

                      <div className="row textalighleft">
                        <div className="col-sm-3">
                          <div className="smalheadingcss">
                            <input type="text" className="form-control" value={this.state.BuildingNumber}  onChange={this.BuildingNo} placeholder="Building #"></input>

                          </div>
                        </div>
                        <div className="col-sm-3">
                          <input type="text" className="form-control" value={this.state.UnitNumber}  onChange={this.UnitNo} placeholder="Unit #"></input>

                        </div>
                        <div className="col-sm-3">

                          <input type="text" className="form-control" value={this.state.Size}   onChange={this.handleSize} placeholder="Size"></input>

                        </div>


                        <div className="col-sm-3">

                          <input type="text" className="form-control" value={this.state.Shape}    onChange={this.ShapeNo} placeholder="Room Shape"></input>

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
                              <Lockz handlerhomek={this.handlerhomek} />
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
                        <input type="text" className="form-control" onChange={this.handleprince} placeholder="AED 0.00000"></input>

                      </div>







                      <div className="row textalighleft">
                        <div className="row">
                          <div className="col-sm-12"> Description</div>
                        </div>
                        <input type="textarea"
                          name="textValue" className="descrption"
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
                          <div className={this.state.roomfunishdiv3} onClick={this.handleroomfuninishing.bind(this, 'Un-Furnishe', '3')} >
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
      this.callingInsert();
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
    if (divval == 1) {
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

    if (divval == 2) {
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


    if (divval == 3) {
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
    if (divval == 4) {
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
    if (divval == 5) {
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
    if (divval == 6) {
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
      BuildingNo: event.target.value,
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

    if (pval == 1) {
      this.setState({
        parking: val,
        parkingdiv1: "innervbuutonhover",
        parkingdiv2: "innervbuuton",
      });
    }
    if (pval == 2) {
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


    if (ival == 1) {
      this.setState({
        internet: val,
        internetdiv1: "innervbuutonhover",
        internetdiv2: "innervbuuton",
      });
    }
    if (ival == 2) {
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
    if (fuval == 1) {
      this.setState({
        roomfunishdiv1: "innervbuutonhover",
        roomfunishdiv2: "innervbuuton",
        roomfunishdiv3: "innervbuuton",
        roomfuninishing: val,
      });
    }

    if (fuval == 2) {
      this.setState({
        roomfunishdiv1: "innervbuuton",
        roomfunishdiv2: "innervbuutonhover",
        roomfunishdiv3: "innervbuuton",
        roomfuninishing: val,
      });
    }

    if (fuval == 3) {
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

  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  async  AzureApoihandleImageUpload(event) {
    this.setState({
      loader: true,
    });

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 200,
      useWebWorker: true,
      usbd: 22,
    }

    const imageFile = event.target.files;
    for (var x = 0; x < imageFile.length; x++) {
      try {
        const compressedFile = await imageCompression(imageFile[x], options);
        let reader = new FileReader();
        let file = compressedFile;
        var newfile = file;
        reader.onloadend = () => {
          var tmp = this.state.picscounter;
          tmp = tmp + 1;
          const data = {
            picstring: reader.result,
          }
          const filestrint = reader.result;
          const params = {
            filestrint: this.props.UserID,
          };
          var loginurl = `https://userfunctionsapi.azurewebsites.net/api/HttpTriggerProperty?code=ir1wJ4Nz5UQTl5jHM4K1IjP7oCCt2oJqXDhtwOv9ryoPH2ZRhpxc6w==&email=${filestrint}`
          axios
            .post(loginurl, params)
            .then(res => {
              console.log(res.data[0].universalid);
              if (tmp == 1) {
                this.setState({
                  file: reader.result,
                  imagePreviewUrl: reader.result,
                  picstring: res.data[0].universalid,//reader.result,
                  picscounter: tmp,
                  loader: false,
                });
              }


              if (tmp == 2) {
                this.setState({
                  file: reader.result,
                  imagePreviewUrl1: reader.result,
                  picstring1: res.data[0].universalid,
                  picscounter: tmp,
                  loader: false,
                });
              }

              if (tmp == 3) {
                this.setState({
                  file: reader.result,
                  imagePreviewUrl2: reader.result,
                  picstring2: res.data[0].universalid,
                  picscounter: tmp,
                  loader: false,
                });
              }

              if (tmp == 4) {
                this.setState({
                  file: reader.result,
                  imagePreviewUrl3: reader.result,
                  picstring3: res.data[0].universalid,
                  picscounter: tmp,
                  loader: false,
                });
              }

            })
            .catch(err => {
              console.log("Error in CreateBook!");
            });


        }
        reader.readAsDataURL(file)
      } catch (error) {
        //console.log(error);
      }
    }


  }

  async  SingleAzureApoihandleImageUpload(event) {
    this.setState({
      loader: true,
    });
    const imageFile = event.target.files[0];
    //console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
    //console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 200,
      useWebWorker: true,
      usbd: 22,
    }

    try {
      const compressedFile = await imageCompression(imageFile, options);
      //console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
      //console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

      let reader = new FileReader();
      let file = compressedFile;
      var newfile = file;
      //console.log(compressedFile);
      reader.onloadend = () => {

        var tmp = this.state.picscounter;
        tmp = tmp + 1;
        // alert(tmp);
        const data = {
          picstring: reader.result,

        }

        const filestrint = reader.result;
        const params = {
          filestrint: this.props.UserID,
        };
        var loginurl = `https://userfunctionsapi.azurewebsites.net/api/HttpTriggerProperty?code=ir1wJ4Nz5UQTl5jHM4K1IjP7oCCt2oJqXDhtwOv9ryoPH2ZRhpxc6w==&email=${filestrint}`

        axios
          .post(loginurl, params)
          .then(res => {
            console.log(res.data[0].universalid);
            if (tmp == 1) {
              this.setState({
                file: reader.result,
                imagePreviewUrl: reader.result,
                picstring: res.data[0].universalid,//reader.result,
                picscounter: tmp,
                loader: false,
              });
            }


            if (tmp == 2) {
              this.setState({
                file: reader.result,
                imagePreviewUrl1: reader.result,
                picstring1: res.data[0].universalid,
                picscounter: tmp,
                loader: false,
              });
            }

            if (tmp == 3) {
              this.setState({
                file: reader.result,
                imagePreviewUrl2: reader.result,
                picstring2: res.data[0].universalid,
                picscounter: tmp,
                loader: false,
              });
            }

            if (tmp == 4) {
              this.setState({
                file: reader.result,
                imagePreviewUrl3: reader.result,
                picstring3: res.data[0].universalid,
                picscounter: tmp,
                loader: false,
              });
            }

          })
          .catch(err => {
            console.log("Error in CreateBook!");
          });


      }







      reader.readAsDataURL(file)

      //await uploadToServer(compressedFile); // write your own logic
    } catch (error) {
      console.log(error);
    }

  }

}

export default withTranslation()(Propertyedit);
