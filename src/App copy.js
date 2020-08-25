import React, {Suspense, Component } from 'react'
import logo from './logo.svg';
import './App.css';
import { Header } from "./header/header";
import Footer from "./footer/footer";
import Bodycards from "./bodycards";
import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.min.css';
import './i18n';
import { withTranslation } from 'react-i18next';
import i18next from 'i18next';
class App extends Component {
  handleClick(lang) {
    i18next.changeLanguage(lang)
  }

  render() {
    const { t } = this.props;

    let somthingNeedsTobe = "";
    let tagetedValue = 1;
    //when you want it to be rtl 
    if (tagetedValue === 1) {
      somthingNeedsTobe = "rtl"
    } else {
      somthingNeedsTobe = "ltr"
    }

    return (
      <div className="App">
        <nav style={{ width: '100%', padding: '2rem 0', backgroundColor: 'gray' }}>
         
         
          
        </nav>
        <header className="App-header">\
        </header>
          <div>
            <p>{t('Thanks.1')}</p>  <p>{t('Why.1')}</p>
            {somthingNeedsTobe === "rtl" ?
              t('Position1') :
              t('Position2')
            }
            {somthingNeedsTobe === "rtl" ?
              //Load External Css A
              <></>
              : 
              <></>
              //Load External Css B
            }

          </div>
        
      </div>
    )
  }
}

export default withTranslation()(App);
/*
function App() {
  return (
    <div className="App">
      <div className="row"><Header /></div>
      <h1>{useTranslation('Welcome to React')}</h1>
      <br></br>
      <div className="row">
        <div className="col-sm-4"><Bodycards /></div>
        <div className="col-sm-4"><Bodycards /></div>
        <div className="col-sm-4"><Bodycards /></div>
      </div>
      <div className="row">
        <div className="col-sm-4"><Bodycards /></div>
        <div className="col-sm-4"><Bodycards /></div>
        <div className="col-sm-4"><Bodycards /></div>
      </div>

      <div className="row"><Footer /></div>
    </div>
  );
}

export default App;
*/