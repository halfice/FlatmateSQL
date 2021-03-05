import React, { Suspense, Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./footer.css";
import '../i18n';
import fs from 'fs';
import { withTranslation } from 'react-i18next';
import i18next from 'i18next';
class Footer extends Component {
	handleClick(lang) {
		i18next.changeLanguage(lang)
	}

	render() {
		return (
			<div className="mainDivFooter">
				<div className="container">
					<div className="row text-center text-xs-center text-sm-left text-md-left">
						<div className="col-xs-12 col-sm-4 col-md-4">
							<div className="mainquicklinks">Explore covid-19</div>
							<ul className="list-unstyled quick-links">
								<li><a className="whitecolorcss" href="https://www.fiverr.com/share/qb8D02"><i ></i>Home</a></li>
								<li><a className="whitecolorcss" href="https://www.fiverr.com/share/qb8D02"><i className=""></i>About</a></li>
								<li><a className="whitecolorcss" href="https://www.fiverr.com/share/qb8D02"><i className=""></i>FAQ</a></li>
								<li><a className="whitecolorcss" href="https://www.fiverr.com/share/qb8D02"><i className=""></i>Get Started</a></li>
								<li><a className="whitecolorcss" href="https://www.fiverr.com/share/qb8D02"><i className=""></i>Videos</a></li>
							</ul>
						</div>
						<div className="col-xs-12 col-sm-4 col-md-4">
							<div className="mainquicklinks">Social Media</div>
							<ul className="list-unstyled quick-links">
								<li><a href="https://www.fiverr.com/share/qb8D02"><i className=""></i>Home</a></li>
								<li><a href="https://www.fiverr.com/share/qb8D02"><i className=""></i>About</a></li>
								<li><a href="https://www.fiverr.com/share/qb8D02"><i className=""></i>FAQ</a></li>
								<li><a href="https://www.fiverr.com/share/qb8D02"><i className=""></i>Get Started</a></li>
								<li><a href="https://www.fiverr.com/share/qb8D02"><i className=""></i>Videos</a></li>
							</ul>
						</div>
						<div className="col-xs-12 col-sm-4 col-md-4">
							<div className="mainquicklinks">About Us</div>
							<ul className="list-unstyled quick-links">
								<li>
									<a onClick={() => this.handleClick('en')} ><i className=""></i>English</a>
								</li>
								<li>
									<a onClick={() => this.handleClick('ko')} ><i className=""></i>Korean</a>
								</li>
								<li>
									<a onClick={() => this.handleClick('chi')} ><i className=""></i>Chinese</a>
								</li>
								<li>
									<a onClick={() => this.handleClick('ar')} ><i className=""></i>Arabic</a>
								</li>


							</ul>


						</div>
					</div>
					<div className="row">
						<div className="col-xs-12 col-sm-12 col-md-12 mt-1 mt-sm-3">
							<ul className="list-unstyled list-inline social text-center">
								<li className="list-inline-item"><a href="https://www.fiverr.com/share/qb8D02"><i className="fa fa-facebook mig"></i></a></li>
								<li className="list-inline-item"><a href="https://www.fiverr.com/share/qb8D02"><i className="fa fa-twitter mig"></i></a></li>
								<li className="list-inline-item"><a href="https://www.fiverr.com/share/qb8D02"><i className="fa fa-instagram mig "></i></a></li>
								<li className="list-inline-item"><a href="https://www.fiverr.com/share/qb8D02"><i className="fa fa-google-plus mig"></i></a></li>
								<li className="list-inline-item"><a href="https://www.fiverr.com/share/qb8D02"><i className="fa fa-linkedin mig"></i></a></li>

								<li className="list-inline-item"><a href="https://www.fiverr.com/share/qb8D02" target="_blank"><i className="fa fa-envelope mig"></i></a></li>
							</ul>
						</div>
					</div>

				</div>
				<hr></hr>
				<div className="row">
					<div className="col-xs-12 col-sm-12 col-md-12 mt-1 mt-sm-2 text-center text-white">
						<div className="list-unstyled"><u><a href="#">HalfIce Incs</a></u> is a Registered, Inc. Pakistan
						[Idea - Code | Transformation is using Data Intellegent- Each Stake is based on Big data analytics]</div>
						<div className="h6">© All right Reversed.<a className="text-green ml-2" href="https://www.sunlimetech.com" target="_blank">
							HalfICE</a></div>



<div className="divwhatsapp">
			<a target="_blank">
			<img src="https://bruceclaymena.com/wp-content/uploads/2020/09/whatsapp.svg"  className="whatsappimage" />

				</a>
		</div>






					</div>

				</div>




			</div>
		);
	}

}

export default withTranslation()(Footer);
