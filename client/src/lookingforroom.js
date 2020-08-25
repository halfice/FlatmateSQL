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


export class lookingoforroom extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      LoginUserID: this.props.UserID,
      value: 2,
      divcountre: 0,
      currentclass: "hidden",
      parentdiv: 0,
      buttontext: "Lets Start!!!",

      country: "",
      city: "",
      area: "",
      SelectedAreas: "",
      location: "",
      rent: "",
      timelength: "",
      datetocome: "",
      propertypreferences: "",
      abouturself: "",
      aboutyou: "",
      employeestatus: "",
      lifestyle: "",
      type: "",
      RoomFurnishing: "",
      Internet: "",
      BathRoomType: "",
      Parking: "",
      MaxNumberoflatemate: "",
      picstring: "",
      file: '',
      imagePreviewUrl: '',
      thisplaceisfor: "",
      myname: "",
      age: "",
      gender: "",
      employeestatus: "",
      abouturselfparagraph: "",

      selectedFile: null,

      typediv1: "normaldivbutton",
      typediv2: "normaldivbutton",
      typediv3: "normaldivbutton",
      typediv4: "normaldivbutton",
      typediv5: "normaldivbutton",
      typediv6: "normaldivbutton",
      typediv7: "normaldivbutton",
      typediv8: "normaldivbutton",

      roomfurdiv1: "innervbuuton",
      roomfurdiv2: "innervbuuton",
      roomfurdiv3: "innervbuuton",

      inernetdiv1: "innervbuuton",
      inernetdiv2: "innervbuuton",
      inernetdiv3: "innervbuuton",

      bathroomdiv1: "innervbuuton",
      bathroomdiv2: "innervbuuton",
      bathroomdiv3: "innervbuuton",

      parkingdiv1: "innervbuuton",
      parkingdiv2: "innervbuuton",
      parkingdiv3: "innervbuuton",

      noflatematediv1: "innervbuuton",
      noflatematediv2: "innervbuuton",
      noflatematediv3: "innervbuuton",


      placefordiv1: "innervbuuton",
      placefordiv2: "innervbuuton",
      placefordiv3: "innervbuuton",

      genderdiv1: "innervbuuton",
      genderdiv2: "innervbuuton",


      employstatusdiv1: "innervbuuton",
      employstatusdiv2: "innervbuuton",
      employstatusdiv3: "innervbuuton",
      employstatusdiv4: "innervbuuton",
      employstatusdiv5: "innervbuuton",
      employstatusdiv6: "innervbuuton",
      employstatusdiv7: "innervbuuton",
      employstatusdiv8: "innervbuuton",

      lifestylediv1: "innervbuuton",
      lifestylediv2: "innervbuuton",
      lifestylediv3: "innervbuuton",
      lifestylediv4: "innervbuuton",
      UserProfileExits: 0,
      ExistingData:[],

      lifestyleid:"",
      emploeestatusid:"",
      genderid:"",
      placeforid:"",
      noflatmateid:"",
      parkingid:"",
      oomfurnishedid:"",
      internetid:"",
      bathroomid:"",


      loader:true,


    }

    this.handleClick = this.handleClick.bind(this);
    this.handleGoBackClick = this.handleGoBackClick.bind(this);


    this.handleinternet = this.handleinternet.bind(this);
    this.handlebathroomtype = this.handlebathroomtype.bind(this);
    this.handleparking = this.handleparking.bind(this);
    this.handlemaxnumber = this.handlemaxnumber.bind(this);
    this.handlroomfurnishing = this.handlroomfurnishing.bind(this);

    this.handlearent = this.handlearent.bind(this);
    this.handledate = this.handledate.bind(this);
    this.handlestaylength = this.handlestaylength.bind(this);



    this.handlename = this.handlename.bind(this);

    this.handleage = this.handleage.bind(this);

    this.handlabouturselfparagraph = this.handlabouturselfparagraph.bind(this);


    this.Lisintingfunc = this.Lisintingfunc.bind(this);




    this.handlearea = this.handlearea.bind(this);



  }

  Lisintingfunc()
  {
    this.setState({
      divcountre: 100,
      parentdiv: 2,

    });
  }
  shoonChangewsp() {
    this.setState({
      value: 4
    });
  }
  handleClick() {
    var tmp = this.state.divcountre;
    if (tmp>11){
      tmp=0;
    }
    if (tmp < 10) {
      tmp = tmp + 1;
    }
    var btntext = "Lets Start!!!";
    if (tmp > 1 && tmp < 9) {
      btntext = "Next"
    }

    if (tmp == 9) {
      btntext = "Finish"
      tmp = 9;
    }
    if (tmp == 10  && this.state.UserProfileExits==0) {
      this.callingInsert();
    }
    
    if (tmp==10 && this.state.UserProfileExits==1){
      alert("updaing");
    }

    this.setState({
      parentdiv: 2,
      visibleclass: "visible",
      hiddenclass: "hidden",
      divcountre: tmp,
      buttontext: btntext
    })
  }

  handleGoBackClick() {
var tempparentdiv=2;
    var tmp = this.state.divcountre;
    if (tmp>11){
      tmp=0;
      tempparentdiv=0;
    }


    var tmp = this.state.divcountre;
    tmp = tmp - 1;

    var btntext = "Lets Start!!!";
    if (tmp < 9) {
      btntext = "Next"

    }
    if (tmp == 1) {
      btntext = "Lets Start!!!"
    }

    this.setState({
      parentdiv: tempparentdiv,
      visibleclass: "visible",
      hiddenclass: "hidden",
      divcountre: tmp,
      buttontext: btntext

    })
  }

  componentDidMount() {
    this.setState({
      loader:true,
    });
    //alert(this.state.email);
    const params = {
      id:this.props.UserID,
    };
    //  console.log(data);
    axios
      .get('http://localhost:4000/tenant/', {params})
      .then(res => {
         console.log(res);
        this.setState({
          UserProfileExits: 1,
          ExistingData:res.data,
          type:res.data["type"],
          loader:false,
          
        });
        
      })
      .catch(err => {
        console.log("Error in CreateBook!");
      });
  }




  async  handleImageUpload(event) {
    this.setState({
      loader:true,
    });
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
          loader:false,
        });
      }
      reader.readAsDataURL(file)

      //await uploadToServer(compressedFile); // write your own logic
    } catch (error) {
      console.log(error);
    }

  }








  callingInsert() {

    this.setState({
      loader:true,
    });
    //alert(this.state.name);
    const data = {

      userid: this.state.LoginUserID,
      type: this.state.type,
      Area: this.state.SelectedAreas,
      Rent: this.state.rent,
      DatetoCome: this.state.datetocome,
      HowDays: this.state.timelength,
      RoomFurnishing: this.state.RoomFurnishing,
      Internet: this.state.Internet,
      BathRoomType: this.state.BathRoomType,
      Parking: this.state.Parking,
      MaxNumberoflatemate: this.state.MaxNumberoflatemate,
      picstring: this.state.picstring,
      thisplaceisfor: this.state.thisplaceisfor,
      myname: this.state.myname,
      age: this.state.age,
      gender: this.state.gender,
      employeestatus: this.state.employeestatus,
      lifestyle: this.state.lifestyle,
      abouturselfparagraph: this.state.abouturselfparagraph,
      itemid: this.uuidv4(),
      lifestyleid: this.state.lifestyleid,
      emploeestatusid: this.state.emploeestatusid,
      genderid: this.state.genderid,
      placeforid: this.state.placeforid,
      noflatmateid: this.state.noflatmateid,
      parkingid: this.state.parkingid,
      oomfurnishedid: this.state.oomfurnishedid,
      internetid: this.state.internetid,
      bathroomid: this.state.bathroomid,



    };
    axios
      .post('http://localhost:4000/tenant/register', data)
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
              {
     this.state.loader==true &&
     <div className="loader"></div>
   }
                <div className="row rowbottom">

                  <div className="col-sm-2">
                    <div className="iconsclassgray" onClick={this.handleGoBackClick} >

                      <FontAwesomeIcon icon={faBackward} /> </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="subheadings"> welcome</div>
                   
                  </div>

                  <div className="col-sm-4">
                 
                    {this.state.UserProfileExits==1 &&
                    
                    <div className="subheadingsListDiv" onClick={this.Lisintingfunc}> <FontAwesomeIcon icon={faCog} />  Listing/Offers</div>
  }
                  </div>

                </div>
                <div className="row">
                  {
                    this.state.parentdiv == 0 &&
                    <div className="row">
                      <div className="col-sm-12 ">
                        <div>Thanks Abdul Aziz Farooqi,let's list your place</div>
                        <div className="col-sm-12">
                          <div className="iconsclassgray" > <FontAwesomeIcon icon={faHome} /></div>
                        </div>
                      </div>
                    </div>
                  }

                  {
                    this.state.divcountre == 1 &&


                    <div className={this.state.divcountre == 1 ? this.state.visibleclass : this.state.hiddenclass}>

                      <div>
                        <div className="col-sm-12"> What type of Place you are looking for.</div>
                      </div>
                      <div className="row">

                        <div className="col-sm-3">
                          <div className="iconsclassgray" >
                            <div className={this.state.typediv1} onClick={this.handletype.bind(this, 'Room(s) in an existing sharehouse', '1')} >
                              Rooms in Eixisting sharehouse
                          </div>
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <div className="iconsclassgray" >
                            <div className={this.state.typediv2} onClick={this.handletype.bind(this, 'Whole Property for rent', '2')} >
                              Whole Property for rent
                          </div>
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <div className="iconsclassgray" >

                            <div className={this.state.typediv3} onClick={this.handletype.bind(this, 'Studio', '3')} >
                              Studio
                          </div>
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <div className="iconsclassgray" >
                            <div className={this.state.typediv4} onClick={this.handletype.bind(this, 'Granny flats', '4')} >
                              Granny flats
                          </div>


                          </div>
                        </div>
                      </div>

                      <div className="row">

                        <div className="col-sm-3">
                          <div className="iconsclassgray" >
                            <div className={this.state.typediv5} onClick={this.handletype.bind(this, 'student accomodation', '5')} >
                              student accomodation
                          </div>


                          </div>
                        </div>
                        <div className="col-sm-3">
                          <div className="iconsclassgray" >
                            <div className={this.state.typediv6} onClick={this.handletype.bind(this, 'One bed flat', '6')} >
                              One bed flat
                          </div>
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <div className="iconsclassgray" >
                            <div className={this.state.typediv7} onClick={this.handletype.bind(this, 'Home Stay', '7')} >
                              Home Stay
                          </div>
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <div className="iconsclassgray" >
                            <div className={this.state.typediv8} onClick={this.handletype.bind(this, 'Shared room', '8')} >
                              Shared room
                          </div>

                          </div>
                        </div>
                      </div>


                    </div>
                  }

                  {
                    this.state.divcountre == 2 &&
                    <div className={this.state.divcountre == 2 ? this.state.visibleclass : this.state.hiddenclass}>
                      <div className="row">
                        <div className="col-sm-12"> Where would you like to live.</div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="iconsclassgray" >
                            <input type="email" className="form-control" onChange={this.handlearea.bind(this)} placeholder="Search for area"></input>

                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12"> {this.state.SelectedAreas} selected.</div>
                      </div>


                    </div>
                  }

                  {
                    this.state.divcountre == 3 &&
                    <div className={this.state.divcountre == 3 ? this.state.visibleclass : this.state.hiddenclass}>
                      <div className="row">
                        <div className="col-sm-12"> Rent  and time.</div>
                      </div>
                      <div className="row">
                        <div className="col-sm-4">
                          <div className="iconsclassgray" >
                            <input type="text" className="form-control" onChange={this.handlearent} placeholder="Weekly Budget"></input>
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="iconsclassgray" >
                            <input type="text" className="form-control" onChange={this.handledate} placeholder="mode date"></input>
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="iconsclassgray" >
                            <input type="text" className="form-control" onChange={this.handlestaylength} placeholder="Prefereed length of stay"></input>
                          </div>
                        </div>
                      </div>
                    </div>
                  }

                  {
                    this.state.divcountre == 4 &&
                    <div className={this.state.divcountre == 4 ? this.state.visibleclass : this.state.hiddenclass}>
                      <div className="row">
                        <div className="col-sm-12"> Peroperty preferences.</div>
                      </div>

                      <div className="row">
                        <div className="col-sm-12 textalighleft"> Room Furnishing</div>
                        <div className="col-sm-4">
                          <div className={this.state.roomfurdiv1} onClick={this.handlroomfurnishing.bind(this, 'Flexible', '1')} >
                            Flexible
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className={this.state.roomfurdiv2} onClick={this.handlroomfurnishing.bind(this, 'Required', '2')} >
                            Required
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className={this.state.roomfurdiv3} onClick={this.handlroomfurnishing.bind(this, 'Not required', '3')} >
                            Not Required
                          </div>
                        </div>

                      </div>


                      <div className="row ">
                        <div className="col-sm-12 textalighleft"> Internet</div>
                      </div>

                      <div className="row">
                        <div className="col-sm-4">
                          <div className={this.state.inernetdiv1} onClick={this.handleinternet.bind(this, 'Flexible', '1')} >
                            Flexible
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className={this.state.inernetdiv2} onClick={this.handleinternet.bind(this, 'Required', '2')} >
                            Required
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className={this.state.inernetdiv3} onClick={this.handleinternet.bind(this, 'Not required', '3')} >
                            Not Required
                          </div>
                        </div>
                      </div>



                      <div className="row">
                        <div className="col-sm-12 textalighleft"> BathRoom type</div>
                      </div>

                      <div className="row">
                        <div className="col-sm-4">
                          <div className={this.state.bathroomdiv1} onClick={this.handlebathroomtype.bind(this, 'Sharing', '1')} >
                            Sharing
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className={this.state.bathroomdiv2} onClick={this.handlebathroomtype.bind(this, 'Flexible', '2')} >
                            Flexible
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className={this.state.bathroomdiv3} onClick={this.handlebathroomtype.bind(this, 'Ensuit or Own required', '3')} >
                            Ensuit or Own required
                          </div>
                        </div>


                      </div>

                      <div className="row">
                        <div className="col-sm-12 textalighleft"> Parking </div>
                      </div>


                      <div className="row">
                        <div className="col-sm-4">
                          <div className={this.state.parkingdiv1} onClick={this.handleparking.bind(this, 'Flexible', '1')} >
                            Flexible
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className={this.state.parkingdiv2} onClick={this.handleparking.bind(this, 'Required', '2')} >
                            Required
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className={this.state.parkingdiv3} onClick={this.handleparking.bind(this, 'Off-street required', '3')} >
                            Off-street required
                          </div>
                        </div>


                      </div>



                      <div className="row">
                        <div className="col-sm-12 textalighleft"> Max number of flatmate </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-4">
                          <div className={this.state.noflatematediv1} onClick={this.handlemaxnumber.bind(this, 'Flexible', '1')} >
                            Flexible
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className={this.state.noflatematediv2} onClick={this.handlemaxnumber.bind(this, '1 Other', '2')} >
                            1 Other
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className={this.state.noflatematediv3} onClick={this.handlemaxnumber.bind(this, '2 Other', '3')} >
                            2 Other
                          </div>
                        </div>
                      </div>



                    </div>
                  }


                  {
                    this.state.divcountre == 5 &&
                    <div className={this.state.divcountre == 5 ? this.state.visibleclass : this.state.hiddenclass}>
                      <div className="row">
                        <div className="col-sm-12 textalighleft"> Introduce abour yourself.</div>

                      </div>
                      <div className="row">
                        <div className="col-sm-12">
                          pic



                    <input type="file" accept="image/*" onChange={this.handleImageUpload.bind(this)}></input>


                          <div className="imgPreview">
                            {$imagePreview}
                          </div>





                        </div>

                      </div>
                    </div>
                  }

                  {
                    this.state.divcountre == 6 &&
                    <div className={this.state.divcountre == 6 ? this.state.visibleclass : this.state.hiddenclass}>
                      <div className="row">
                        <div className="col-sm-12 "> About you.</div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12 textalighleft"> This place is for</div>
                      </div>
                      <div className="row">
                        <div className="col-sm-4">
                          <div className={this.state.placefordiv1} onClick={this.handlethisplaceisfor.bind(this, 'Me', '1')} >
                            Me
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className={this.state.placefordiv2} onClick={this.handlethisplaceisfor.bind(this, 'Couple', '2')} >
                            Couple
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className={this.state.placefordiv3} onClick={this.handlethisplaceisfor.bind(this, 'Group', '3')} >
                            Group
                          </div>
                        </div>


                      </div>

                      <div className="row">
                        <div className="col-sm-12 textalighleft"> Your name</div>
                        <div className="col-sm-12">
                          <input type="email" className="form-control" onChange={this.handlename} placeholder="your name"></input>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-sm-12 textalighleft"> Your age</div>
                        <div className="col-sm-12">
                          <input type="email" className="form-control" onChange={this.handleage} placeholder="your name"></input>
                        </div>
                      </div>


                      <div className="row">
                        <div className="col-sm-12 textalighleft"> Gender</div>
                      </div>
                      <div className="row">

                        <div className="col-sm-6">

                          <div className={this.state.genderdiv1} onClick={this.handlgender.bind(this, 'Female', '1')} >
                            Female
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className={this.state.genderdiv2} onClick={this.handlgender.bind(this, 'Male', '2')} >
                            Male
                          </div>

                        </div>

                      </div>



                    </div>
                  }


                  {
                    this.state.divcountre == 7 &&
                    <div className={this.state.divcountre == 7 ? this.state.visibleclass : this.state.hiddenclass}>
                      <div className="row">
                        <div className="col-sm-12"> Employement Status.</div>
                      </div>


                      <div className="row">
                        <div className="col-sm-3">
                          <div className={this.state.employstatusdiv1} onClick={this.handleEmployeeStatus.bind(this, 'Working full-time', '1')} >
                            Working full-time
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <div className={this.state.employstatusdiv2} onClick={this.handleEmployeeStatus.bind(this, 'Working part-time', '2')} >
                            Working part-time
                          </div>
                        </div>

                        <div className="col-sm-3">
                          <div className={this.state.employstatusdiv3} onClick={this.handleEmployeeStatus.bind(this, 'Working holiday', '3')} >
                            Working holiday
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <div className={this.state.employstatusdiv4} onClick={this.handleEmployeeStatus.bind(this, 'Retired', '4')} >
                            Retired
                          </div>

                        </div>
                      </div>


                      <div className="row">
                        <div className="col-sm-3">
                          <div className={this.state.employstatusdiv5} onClick={this.handleEmployeeStatus.bind(this, 'Unemployeed', '5')} >
                            Unemployeed
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <div className={this.state.employstatusdiv6} onClick={this.handleEmployeeStatus.bind(this, 'Backpacker', '6')} >
                            Backpacker
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <div className={this.state.employstatusdiv7} onClick={this.handleEmployeeStatus.bind(this, 'Student', '7')} >
                            Student
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <div className={this.state.employstatusdiv8} onClick={this.handleEmployeeStatus.bind(this, ' Job Offer', '8')} >
                            Job Offer
                          </div>
                        </div>
                      </div>





                    </div>
                  }



                  {
                    this.state.divcountre == 8 &&
                    <div className={this.state.divcountre == 8 ? this.state.visibleclass : this.state.hiddenclass}>
                      <div className="row">
                        <div className="col-sm-12"> Life Style.</div>
                      </div>


                      <div className="row">
                        <div className="col-sm-3">
                          <div className={this.state.lifestylediv1} onClick={this.handlelifestyle.bind(this, 'Smoker', '1')} >
                            Smoker
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <div className={this.state.lifestylediv2} onClick={this.handlelifestyle.bind(this, 'LBTB1+', '2')} >
                            LBTB1
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <div className={this.state.lifestylediv3} onClick={this.handlelifestyle.bind(this, 'Pets', '3')} >
                            Pets
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <div className={this.state.lifestylediv4} onClick={this.handlelifestyle.bind(this, 'Children', '4')} >
                            Children
                          </div>
                        </div>
                      </div>


                    </div>
                  }

                  {
                    this.state.divcountre == 9 &&
                    <div className={this.state.divcountre == 9 ? this.state.visibleclass : this.state.hiddenclass}>
                      <div className="row">
                        <div className="col-sm-12"> What makes you to greate to live with.</div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12">


                          <input type="textarea" className="form-control" onChange={this.handlabouturselfparagraph} placeholder="fews line for all others"></input>

                        </div>

                      </div>
                    </div>
                  }


                  {
                    this.state.divcountre == 10 &&
                    <div className={this.state.divcountre == 10 ? this.state.visibleclass : this.state.hiddenclass}>
                      <div className="row">
                        <div className="col-sm-12"> listing Preview.</div>
                        <div className="col-sm-4">
                          <div className="iconsclassgray" > <FontAwesomeIcon icon={faHome} /></div>
                        </div>

                      </div>
                    </div>
                  }

{
                    this.state.divcountre == 100 &&
                    <div className={this.state.divcountre == 10 ? this.state.visibleclass : this.state.hiddenclass}>
                      <div className="row">
                        <div className="col-sm-12"> listing Preview/ Offers.</div>
                        <div className="col-sm-4">
                          <div className="iconsclassgray" > <FontAwesomeIcon icon={faHome} /></div>
                        </div>

                      </div>
                    </div>
                  }



                </div>
                { this.state.divcountre!=100 && 
                <div className="row centeraligh">
                  <Button className="mybuttons" onClick={this.handleClick} >{this.state.buttontext}</Button>
                </div>
  }

              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }

  handletype(val, tval) {
    switch (tval) {
      case "1":
        this.setState({
          type: val,
          typediv1: "fdvihover",
          typediv2: "normaldivbutton",
          typediv3: "normaldivbutton",
          typediv4: "normaldivbutton",
          typediv5: "normaldivbutton",
          typediv6: "normaldivbutton",
          typediv7: "normaldivbutton",
          typediv8: "normaldivbutton",
        });
        break;

      case "2":
        this.setState({
          type: val,
          typediv2: "fdvihover",
          typediv1: "normaldivbutton",
          typediv3: "normaldivbutton",
          typediv4: "normaldivbutton",
          typediv5: "normaldivbutton",
          typediv6: "normaldivbutton",
          typediv7: "normaldivbutton",
          typediv8: "normaldivbutton",
        });
        break;

      case "3":
        this.setState({
          type: val,
          typediv3: "fdvihover",
          typediv2: "normaldivbutton",
          typediv1: "normaldivbutton",
          typediv4: "normaldivbutton",
          typediv5: "normaldivbutton",
          typediv6: "normaldivbutton",
          typediv7: "normaldivbutton",
          typediv8: "normaldivbutton",
        });
        break;

      case "4":
        this.setState({
          type: val,
          typediv4: "fdvihover",
          typediv2: "normaldivbutton",
          typediv3: "normaldivbutton",
          typediv1: "normaldivbutton",
          typediv5: "normaldivbutton",
          typediv6: "normaldivbutton",
          typediv7: "normaldivbutton",
          typediv8: "normaldivbutton",
        });
        break;


      case "5":
        this.setState({
          type: val,
          typediv5: "fdvihover",
          typediv2: "normaldivbutton",
          typediv3: "normaldivbutton",
          typediv1: "normaldivbutton",
          typediv4: "normaldivbutton",
          typediv6: "normaldivbutton",
          typediv7: "normaldivbutton",
          typediv8: "normaldivbutton",
        });
        break;


      case "6":
        this.setState({
          type: val,
          typediv6: "fdvihover",
          typediv2: "normaldivbutton",
          typediv3: "normaldivbutton",
          typediv1: "normaldivbutton",
          typediv4: "normaldivbutton",
          typediv5: "normaldivbutton",
          typediv7: "normaldivbutton",
          typediv8: "normaldivbutton",
        });
        break;

      case "7":
        this.setState({
          type: val,
          typediv7: "fdvihover",
          typediv2: "normaldivbutton",
          typediv3: "normaldivbutton",
          typediv1: "normaldivbutton",
          typediv4: "normaldivbutton",
          typediv5: "normaldivbutton",
          typediv6: "normaldivbutton",
          typediv8: "normaldivbutton",
        });
        break;

      case "8":
        this.setState({
          type: val,
          typediv8: "fdvihover",
          typediv2: "normaldivbutton",
          typediv3: "normaldivbutton",
          typediv1: "normaldivbutton",
          typediv4: "normaldivbutton",
          typediv5: "normaldivbutton",
          typediv6: "normaldivbutton",
          typediv7: "normaldivbutton",
        });
        break;
    }



  }

  handlearea = (event) => {
    //alert(event.target.value);
    this.setState({
      area: event.target.value,
      location: event.target.value,
      SelectedAreas: event.target.value,
    });
  }

  handlearent(event) {
    //alert(event.target.value);
    this.setState({
      rent: event.target.value,
    });
  }

  handledate(event) {
    this.setState({
      datetocome: event.target.value,
    });
  }



  handlestaylength(event) {
    this.setState({
      timelength: event.target.value,
    });
  }


  handlroomfurnishing(val, roomfurval) {
    switch (roomfurval) {
      case "1":
        this.setState({
          roomfurnishedid:roomfurval,
          roomfurdiv1: "innervbuutonhover",
          roomfurdiv2: "innervbuuton",
          roomfurdiv3: "innervbuuton",
          RoomFurnishing: val,
        });
        break;

      case "2":
        this.setState({
          oomfurnishedid:roomfurval,
          roomfurdiv1: "innervbuuton",
          roomfurdiv2: "innervbuutonhover",
          roomfurdiv3: "innervbuuton",
          RoomFurnishing: val,
        });
        break;

      case "3":
        this.setState({
          oomfurnishedid:roomfurval,
          roomfurdiv1: "innervbuuton",
          roomfurdiv2: "innervbuuton",
          roomfurdiv3: "innervbuutonhover",
          RoomFurnishing: val,
        });
        break;
    }


  }


  handleinternet(val, ival) {
    switch (ival) {
      case "1":
        this.setState({
          internetid:ival,
          Internet: val,
          inernetdiv1: "innervbuutonhover",
          inernetdiv2: "innervbuuton",
          inernetdiv3: "innervbuuton",
        });
        break;

      case "2":
        this.setState({
          internetid:ival,
          Internet: val,
          inernetdiv1: "innervbuuton",
          inernetdiv2: "innervbuutonhover",
          inernetdiv3: "innervbuuton",
        });
        break;


      case "3":
        this.setState({
          internetid:ival,
          Internet: val,
          inernetdiv1: "innervbuuton",
          inernetdiv2: "innervbuuton",
          inernetdiv3: "innervbuutonhover",
        });
        break;

    }




  }
  handlebathroomtype(val, bval) {
    switch (bval) {
      case "1":
        this.setState({
          bathroomid:bval,
          BathRoomType: val,
          bathroomdiv1: "innervbuutonhover",
          bathroomdiv2: "innervbuuton",
          bathroomdiv3: "innervbuuton",
        });
        break;

      case "2":
        this.setState({
          bathroomid:bval,
          BathRoomType: val,
          bathroomdiv1: "innervbuuton",
          bathroomdiv2: "innervbuutonhover",
          bathroomdiv3: "innervbuuton",
        });
        break;


      case "3":
        this.setState({
          bathroomid:bval,
          BathRoomType: val,
          bathroomdiv1: "innervbuuton",
          bathroomdiv2: "innervbuuton",
          bathroomdiv3: "innervbuutonhover",
        });
        break;
    }



  }

  handleparking(val, parval) {
    switch (parval) {
      case "1":
        this.setState({
          parkingid:parval,
          Parking: val,
          parkingdiv1: "innervbuutonhover",
          parkingdiv2: "innervbuuton",
          parkingdiv3: "innervbuuton",
        });
        break;

      case "2":
        this.setState({
          parkingid:parval,
          Parking: val,
          parkingdiv1: "innervbuuton",
          parkingdiv2: "innervbuutonhover",
          parkingdiv3: "innervbuuton",
        });
        break;


      case "3":
        this.setState({
          parkingid:parval,
          Parking: val,
          parkingdiv1: "innervbuuton",
          parkingdiv2: "innervbuuton",
          parkingdiv3: "innervbuutonhover",
        });
        break;
    }

  }


  handlemaxnumber(val, maxval) {
    switch (maxval) {

      case "1":
        this.setState({
          noflatmateid:maxval,
          noflatematediv1: "innervbuutonhover",
          noflatematediv2: "innervbuuton",
          noflatematediv3: "innervbuuton",
          MaxNumberoflatemate: val,
        });
        break;

      case "2":
        this.setState({
          noflatmateid:maxval,
          noflatematediv1: "innervbuuton",
          noflatematediv2: "innervbuutonhover",
          noflatematediv3: "innervbuuton",
          MaxNumberoflatemate: val,
        });
        break;


      case "3":
        this.setState({
          noflatmateid:maxval,
          noflatematediv1: "innervbuuton",
          noflatematediv2: "innervbuuton",
          noflatematediv3: "innervbuutonhover",
          MaxNumberoflatemate: val,
        });
        break;
    }



  }


  handlethisplaceisfor(val, pval) {
    switch (pval) {
      case "1":
        this.setState({
          placeforid:pval,
          thisplaceisfor: val,
          placefordiv1: "innervbuutonhover",
          placefordiv2: "innervbuuton",
          placefordiv3: "innervbuuton",

        });
        break;

      case "2":
        this.setState({
          placeforid:pval,
          thisplaceisfor: val,
          placefordiv1: "innervbuuton",
          placefordiv2: "innervbuutonhover",
          placefordiv3: "innervbuuton",
        });
        break;


      case "3":
        this.setState({
          placeforid:pval,
          thisplaceisfor: val,
          placefordiv1: "innervbuuton",
          placefordiv2: "innervbuuton",
          placefordiv3: "innervbuutonhover",
        });
        break;

    }


  }

  handlename(event) {
    this.setState({
      myname: event.target.value,
    });

  }

  handleage(event) {
    this.setState({
      age: event.target.value,
    });
  }

  handlgender(val, gval) {
    if (gval == 1) {
      this.setState({
        genderid:gval,
        gender: val,
        genderdiv1: "innervbuutonhover",
        genderdiv2: "innervbuuton"
      });
    } else {
      this.setState({
        genderid:gval,
        gender: val,
        genderdiv1: "innervbuuton",
        genderdiv2: "innervbuutonhover"
      });
    }


  }

  handleEmployeeStatus(val, estatusl) {
    switch (estatusl) {
      case "1":
        this.setState({
          emploeestatusid:estatusl,
          employeestatus: val,
          employstatusdiv1: "innervbuutonhover",
          employstatusdiv2: "innervbuuton",
          employstatusdiv3: "innervbuuton",
          employstatusdiv4: "innervbuuton",
          employstatusdiv5: "innervbuuton",
          employstatusdiv6: "innervbuuton",
          employstatusdiv7: "innervbuuton",
          employstatusdiv8: "innervbuuton",
        });
        break;

      case "2":
        this.setState({
          emploeestatusid:estatusl,
          employeestatus: val,
          employstatusdiv2: "innervbuutonhover",
          employstatusdiv1: "innervbuuton",
          employstatusdiv3: "innervbuuton",
          employstatusdiv4: "innervbuuton",
          employstatusdiv5: "innervbuuton",
          employstatusdiv6: "innervbuuton",
          employstatusdiv7: "innervbuuton",
          employstatusdiv8: "innervbuuton",
        });
        break;


      case "3":
        this.setState({
          emploeestatusid:estatusl,
          employeestatus: val,
          employstatusdiv3: "innervbuutonhover",
          employstatusdiv2: "innervbuuton",
          employstatusdiv1: "innervbuuton",
          employstatusdiv4: "innervbuuton",
          employstatusdiv5: "innervbuuton",
          employstatusdiv6: "innervbuuton",
          employstatusdiv7: "innervbuuton",
          employstatusdiv8: "innervbuuton",
        });
        break;


      case "4":
        this.setState({
          emploeestatusid:estatusl,
          employeestatus: val,
          employstatusdiv4: "innervbuutonhover",
          employstatusdiv2: "innervbuuton",
          employstatusdiv3: "innervbuuton",
          employstatusdiv1: "innervbuuton",
          employstatusdiv5: "innervbuuton",
          employstatusdiv6: "innervbuuton",
          employstatusdiv7: "innervbuuton",
          employstatusdiv8: "innervbuuton",
        });
        break;


      case "5":
        this.setState({
          emploeestatusid:estatusl,
          employeestatus: val,
          employstatusdiv5: "innervbuutonhover",
          employstatusdiv2: "innervbuuton",
          employstatusdiv3: "innervbuuton",
          employstatusdiv4: "innervbuuton",
          employstatusdiv1: "innervbuuton",
          employstatusdiv6: "innervbuuton",
          employstatusdiv7: "innervbuuton",
          employstatusdiv8: "innervbuuton",
        });
        break;

      case "6":
        this.setState({
          emploeestatusid:estatusl,
          employeestatus: val,
          employstatusdiv6: "innervbuutonhover",
          employstatusdiv2: "innervbuuton",
          employstatusdiv3: "innervbuuton",
          employstatusdiv4: "innervbuuton",
          employstatusdiv5: "innervbuuton",
          employstatusdiv1: "innervbuuton",
          employstatusdiv7: "innervbuuton",
          employstatusdiv8: "innervbuuton",
        });
        break;


      case "7":
        this.setState({
          emploeestatusid:estatusl,
          employeestatus: val,
          employstatusdiv7: "innervbuutonhover",
          employstatusdiv2: "innervbuuton",
          employstatusdiv3: "innervbuuton",
          employstatusdiv4: "innervbuuton",
          employstatusdiv5: "innervbuuton",
          employstatusdiv6: "innervbuuton",
          employstatusdiv1: "innervbuuton",
          employstatusdiv8: "innervbuuton",
        });
        break;

      case "8":
        this.setState({
          emploeestatusid:estatusl,
          employeestatus: val,
          employstatusdiv8: "innervbuutonhover",
          employstatusdiv2: "innervbuuton",
          employstatusdiv3: "innervbuuton",
          employstatusdiv4: "innervbuuton",
          employstatusdiv5: "innervbuuton",
          employstatusdiv6: "innervbuuton",
          employstatusdiv7: "innervbuuton",
          employstatusdiv1: "innervbuuton",
        });
        break;






    }



  }

  handlelifestyle(val, stylediv) {
    switch (stylediv) {
      case "1":
        this.setState({
          lifestyleid:stylediv,
          lifestyle: val,
          lifestylediv1: "innervbuutonhover",
          lifestylediv2: "innervbuuton",
          lifestylediv3: "innervbuuton",
          lifestylediv4: "innervbuuton",
        });
        break;

      case "2":
        this.setState({
          lifestyleid:stylediv,
          lifestyle: val,
          lifestylediv1: "innervbuuton",
          lifestylediv2: "innervbuutonhover",
          lifestylediv3: "innervbuuton",
          lifestylediv4: "innervbuuton",
        });
        break;

      case "3":
        this.setState({
          lifestyleid:stylediv,
          lifestyle: val,
          lifestylediv1: "innervbuuton",
          lifestylediv2: "innervbuuton",
          lifestylediv3: "innervbuutonhover",
          lifestylediv4: "innervbuuton",
        });
        break;

      case "4":
        this.setState({
          lifestyleid:stylediv,
          lifestyle: val,
          lifestylediv1: "innervbuuton",
          lifestylediv2: "innervbuuton",
          lifestylediv3: "innervbuuton",
          lifestylediv4: "innervbuutonhover",
        });
        break;

    }


  }
  handlabouturselfparagraph(event) {
    this.setState({
      abouturselfparagraph: event.target.value,
    });
  }
  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

}



export default withTranslation()(lookingoforroom);

/*old
 _handleImageChangew(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];
    var newfile = file;


    //reader.readAsDataURL(file);

    reader.onloadend = () => {

      const formData = new FormData();
      // Update the formData object
      formData.append(
        "myFile",
        file,
        file.name
      );






      //let filed = e.target.files[0];
      this.setState({

        file: reader.result,
        imagePreviewUrl: reader.result,
        picstring: file.name,
      });
    }

    reader.readAsDataURL(file)
  }

   <input className="fileInput"
                            type="file"
                            onChange={(e) => this._handleImageChange(e)} />

*/
