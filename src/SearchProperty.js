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
import { transform } from 'async';


library.add(faCog, faAtlas, faCheck, faBriefcase, faBackward, faHome)

class SearchComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
          ObjectArray: [],
         
          loader: true,
          ImagesArray: [],
          ShowCarousal: false,
          blobtoken: "",
          myBlobs: [],
          imgstarturl: "https://userfunctionsapi.blob.core.windows.net/myfiles/",
          imgStartEnd: "?sv=2019-12-12&ss=bfqt&srt=sco&sp=rwdlacupx&se=2021-05-05T13:55:52Z&st=2020-11-29T05:55:52Z&spr=https&sig=gZDBO%2Fbxzt9m%2F8jcbH0t6UV5%2FxW87Dyk3C1XIGcCSQM%3D",
          PropertyType:"",
          Location:"",
          NoOfBedRooms:"",
          Furnished:"",
          PriceMin:"",
          PriceMax:"",
          State:"",
          Deal:"",

    
    
        }
        this.CloseModal = this.CloseModal.bind(this);
    
    
      }

      render() {
       



        return (
            <div>

            </div>
        );

       





      }
}
export default withTranslation()(SearchComponent);