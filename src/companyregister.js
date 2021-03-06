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


export class companyregister extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            companyname: "",
            email: "",
            phone: "",
            universalid: "",
            loader: false,
            imagePreviewUrl: uploader,
            logoimage: "",
            tradelicenseno: "",
            picstring: "",

        }
        this.handleClick = this.handleClick.bind(this);
        this.handlenamechange = this.handlenamechange.bind(this);
        this.handleemailchange = this.handleemailchange.bind(this);
        this.handlenphonechange = this.handlenphonechange.bind(this);
        this.handltrade = this.handltrade.bind(this);
        this.goBackToRegister = this.goBackToRegister.bind(this);

    }

    goBackToRegister() {
        this.props.handleRegisterUserScreen();
    }

    handltrade(event) {
        this.setState({
            tradelicenseno: event.target.value
        });
    }

    async fetchprofile(emailaddress) {
        var _Response = null;
        var userexitstemp = "1";

        var loginurl = `https://userfunctionsapi.azurewebsites.net/api/HttpTriggerusers?code=qt5cUhmczQ4x87U9ZClXPwdqysZo3KdUKkLyVxlrk6fkFpVk2mnXBg==&username=${emailaddress}&functiontype=y`;
        try {
            let res = await axios.post(loginurl);
            console.log(res);
            if (res != "found") {
                userexitstemp = "0";
            }
            this.setState({
                isUserExits: "0",

            });
        } catch (error) {
            // console.log(error);
        }


    }

    async handleClick() {
        this.setState({
            loader: true,
        });



        var regurl = `https://userfunctionsapi.azurewebsites.net/api/HttpTriggerusers?code=qt5cUhmczQ4x87U9ZClXPwdqysZo3KdUKkLyVxlrk6fkFpVk2mnXBg==&companyname=${this.state.companyname}&email=${this.state.email}&phone=${this.state.phone}&tradelicenseno=${this.state.tradelicenseno}&functiontype=addcompnay&logoimage=${this.state.logoimage}`;
        try {
            let res = await axios.post(regurl);
            this.setState({
                universalid: res,
                loader: false,
            });
            this.props.handleRegisnteredUserIdCompany(this.state.email, this.state.logoimage, this.state.companyname);
            // console.log(res.data);
        } catch (error) {
            //console.log(error);
        }

    }
    componentDidMount() {
        this.getblobtoken();
        //this.fetchprofile();
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

            const filename = file.name.substring(0, file.name.lastIndexOf('.'));
            const ext = file.name.substring(file.name.lastIndexOf('.'));
            const blobName = filename + '_' + new Date().getTime() + ext;




            this.uploadFile(file, blobName);
            this.handleImageUploadold(file, blobName);
        }
    }

    async uploadFile(file, tempblobname) {
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


        const blockBlobClient = containerClient.getBlockBlobClient(tempblobname)
        const uploadBlobResponse = await blockBlobClient.uploadBrowserData(file)
        // console.log(`Upload block blob ${file.name} successfully`, uploadBlobResponse.clientRequestId);

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
            maxWidthOrHeight: 100,
            useWebWorker: true,
            usbd: 22,
        }
        try {
            const compressedFile = await imageCompression(imageFile, options);

            reader.onloadend = () => {

                const data = {
                    logoimage: reader.result,
                }

                    this.setState({
                        file: reader.result,
                        imagePreviewUrl: reader.result,
                        logoimage: blobName,//reader.result,
                        loader: false,
                    });










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
                            this.state.loader == true &&
                            <div className="loader"></div>
                        }
                        <div className="row" >
                            <div className="col-sm-8">
                                <div className="paragraphcsstwo">
                                    Register Your Company
                               </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="" onClick={this.goBackToRegister.bind(this)}>
                                    <Button className="mybuttons" onClick={this.goBackToRegister} >Back</Button>



                                </div>
                            </div>

                        </div>


                        <div className="row" >
                            <div className="col-sm-12 graytext">
                                <div className="form-group">

                                    <input type="name" className="form-control" onChange={this.handleemailchange} placeholder="Enter email"></input>

                                </div>


                                <div className="form-group">

                                    <input type="email" className="form-control" placeholder="Enter name" onChange={this.handlenamechange}></input>


                                </div>
                                <div className="form-group">

                                    <input type="email" className="form-control" onChange={this.handlenphonechange} placeholder="Enter phone"></input>

                                </div>



                                <div className="form-group">

                                    <input type="email" className="form-control" onChange={this.handltrade} placeholder="Trade License #"></input>

                                </div>





                                <div>
                                    <div className="form-group">


                                    </div>
                                    <hr></hr>
                                    <div className="paragraphcsstwo">Company Logo</div>
                                    <div className="form-group">
                                        <div className="">
                                            <input type="file" accept="image/*" onChange={this.handleImageUpload.bind(this)} className="profilepics"></input>
                                            <hr></hr>
                                            <div className="imgPreviewpro">
                                                {$imagePreview}

                                            </div>

                                        </div>

                                    </div>
                                </div>




                            </div>

                        </div>

                        <div className="row" >
                            <div className="col-sm-12 graytext">


                            </div>

                        </div>

                        {this.state.isUserExits == "0" &&

                            <div className="row" >
                                <div className="col-sm-12">

                                    <Button className="mybuttons" onClick={this.handleClick} >Sign Up!</Button>
                                </div>

                            </div>

                        }



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

    handlenamechange(event) {
        this.setState({
            companyname: event.target.value
        });
    }

    handleemailchange(event) {
        this.setState({
            email: event.target.value
        });
        if (event.target.value.indexOf('@') > 0) {
            this.fetchprofile(event.target.value)
        }
    }

    handlenphonechange(event) {
        this.setState({
            phone: event.target.value
        });
    }


    uniqueNumber() {
        var date = Date.now();

        return date;
    }



}

export default withTranslation()(companyregister);
