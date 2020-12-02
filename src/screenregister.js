import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './sliding.css';
import axios from 'axios';
import './i18n';
import { withTranslation } from 'react-i18next';
import i18next from 'i18next';
import Button from 'react-bootstrap/Button'
import uploader from './uloaaderimage.gif'
import imageCompression from 'browser-image-compression'
import Select from 'react-select';


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
            imagePreviewUrl: uploader,
            picstring: "",
            picscounter: 0,
            profilepicname:"",
            copmayname:"",
      selectedOption: null,
           

        }
        this.handleClick = this.handleClick.bind(this);
        this.handlenamechange = this.handlenamechange.bind(this);
        this.handleemailchange = this.handleemailchange.bind(this);
        this.handlenphonechange = this.handlenphonechange.bind(this);
        this.handlepasswordchange = this.handlepasswordchange.bind(this);

    }

    
    handleChangedrp = selectedOption => {
      this.setState(
        { selectedOption,
        copmayname:selectedOption });
      console.log(`Option selected:`, selectedOption);
    };




    
    async handleClick() {
        this.setState({
            loader:true,
        });
       //alert(this.state.name);

       //     
           var userid= this.state.name;
            var email=this.state.email;
           var  phone=this.state.phone;
           var  password=this.state.password;
                    
    

        //  var regurl=`https://userfunctionsapi.azurewebsites.net/api/HttpTriggerusers?code=zLwRL3jpIUtF0oWql4lfK38n/Ld6w5Ed6XzP1H7Kj3tBSF4dzL1crg==&userid=${this.state.email}&UserName=${this.state.name}&email=${this.state.email}&Password=${this.state.password}&functiontype=b&moibile=${this.state.phone}`;
        var regurl=`https://userfunctionsapi.azurewebsites.net/api/HttpTriggerusers?code=zLwRL3jpIUtF0oWql4lfK38n/Ld6w5Ed6XzP1H7Kj3tBSF4dzL1crg==&userid=${this.state.email}&UserName=${this.state.name}&email=${this.state.email}&Password=${this.state.password}&functiontype=b&moibile=${this.state.phone}&companyname=${this.state.copmayname}&profilepicname=${this.state.picstring}`;
 try {
                     let res=await axios.post(regurl);
                     this.setState({
                      universalid:res,
                      loader:false,
                  });
                  this.props.handleRegisnteredUserId(this.state.email);
                    // console.log(res.data);
                 } catch (error) {
                     //console.log(error);
                 }

 }
 componentDidMount() {
    this.getblobtoken();
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

  async handleImageUpload(files) {
    if (files.target.files.length > 0) {
      const file = files.target.files[0];
       this.uploadFile(file);
      this.handleImageUploadold(file);
    }
  }

  async uploadFile(file) {
    //    //https://userfunctionsapi.azurewebsites.net/?st=2020-11-04T18%3A49%3A22Z&se=2020-11-04T19%3A49%3A22Z&sp=W&sv=2018-03-28&sr=b&sig=2tbOll2oU1JdvkxLiHui%2BpRU6nHqsA0uKNtDF%2BsfZQU%3D

    const { BlobServiceClient, StorageSharedKeyCredential } = require("@azure/storage-blob");
    const sas = this.state.blobtoken;
    var finalToken = sas.data.token;
    //finalToken="";
    //finalToken="?sv=2019-12-12&ss=bf&srt=s&sp=rwlac&se=2021-12-29T22:25:54Z&st=2020-11-28T14:25:54Z&spr=https&sig=F2JpyoUBdGW96gnefEsi3xZHA6J%2F7e2isHXz3p3G824%3D";

    const STORAGE_ACCOUNT_NAME = 'userfunctionsapi'
    const CONTAINER_NAME = 'profilepics'
    // for browser, SAS_TOKEN is get from API?
    const SAS_TOKEN = finalToken;
    const sasURL = `https://${STORAGE_ACCOUNT_NAME}.blob.core.windows.net/${SAS_TOKEN}`

    const blobServiceClient = new BlobServiceClient(sasURL)
    const containerClient = blobServiceClient.getContainerClient(CONTAINER_NAME)

    const filename = file.name.substring(0, file.name.lastIndexOf('.'))
    const ext = file.name.substring(file.name.lastIndexOf('.'))
    const blobName = filename + '_' + new Date().getTime() + ext
    const blockBlobClient = containerClient.getBlockBlobClient(blobName)
    const uploadBlobResponse = await blockBlobClient.uploadBrowserData(file)
    console.log(`Upload block blob ${file.name} successfully`, uploadBlobResponse.clientRequestId);

  }
  async handleImageUploadold(file) {
    this.setState({
      loader: true,
    });
    const imageFile = file;
    let reader = new FileReader();
    var newfile = imageFile;
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 100,
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
            picstring: imageFile.name,//reader.result,
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


    render() {

        let $imagePreview = null;
        let { imagePreviewUrl } = this.state;
        if (imagePreviewUrl) {
          $imagePreview = (
            <div className="" >
              {imagePreviewUrl != null &&
                <div className="previewpadding">
                  <img src={imagePreviewUrl} className="mypreviewimagepro" />
                </div>
              }
              
              
              
    
    
            </div>
          );
            }


            const options = [
              { value: 'Purple Property', label: 'Purple Property' },
              { value: 'Al Dar', label: 'Al Dar' },
              { value: 'Free Property', label: 'Free Property' },
            ];

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
                                
                            <div className="form-group">
   
   <input type="email" className="form-control"  placeholder="Enter name" onChange={this.handlenamechange}></input>
  

 </div>     
 <div className="form-group">
   
   <input type="email" className="form-control" onChange={this.handlenphonechange} placeholder="Enter phone"></input>
  
 </div>     
  <div className="form-group">
   
    <input type="email" className="form-control" onChange={this.handleemailchange} placeholder="Enter email"></input>
   
  </div>
  <div className="form-group">
   
   <input type="password" className="form-control" onChange={this.handlepasswordchange} placeholder="Password"></input>

</div>
<div className="form-group">
<Select
        value={this.state.selectedOption}
        onChange={this.handleChangedrp}
        options={options}
      />

</div>
<div className="form-group">
                        <div className="">
                          <input type="file" accept="image/*" onChange={this.handleImageUpload.bind(this)} className="profilepics"></input>

                          <div className="imgPreviewpro">
                            {$imagePreview}

                          </div>

                        </div>

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
