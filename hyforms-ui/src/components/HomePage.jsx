import React, { Component } from 'react';
import Typed from 'react-typed';
import './assets/vendor/bootstrap/css/bootstrap.min.css';
import './assets/vendor/hover/hover.min.css';
import './assets/vendor/ionicons/css/ionicons.min.css';
import './assets/vendor/venobox/venobox.css';
import './assets/vendor/owl.carousel/assets/owl.carousel.min.css';
import './assets/css/style.css';
import create from './assets/img/create.jpg'
import template from './assets/img/template.jpg'
import secure from './assets/img/secure.jpg'
import open from './assets/img/open.jpg'
import { Link } from 'react-router-dom'


const homeStyle = {

   'min-height': '500px', 

  /* Create the parallax scrolling effect */
  'background-attachment': 'fixed',
  'background-position': 'center',
  'background-repeat': 'no-repeat',
  'background-size': 'cover',

}
class HomePage extends Component{
	
	constructor(props) {
    super(props);
    this.scene = React.createRef();
  	}
	state = {
		
	}
	

	render(){
		return(
			<React.Fragment>
				<nav id="main-nav">
				    <div className="row">
				      <div className="container">

				        <div className="responsive"><i data-icon="m" className="ion-navicon-round"></i></div>

				        <ul className="nav-menu list-unstyled">
				          <li><a href="#header" className="smoothScroll">Home</a></li>
				          <li><a href="#about" className="smoothScroll">About</a></li>
				          <li><a href="#portfolio" className="smoothScroll">Portfolio</a></li>
				          <li><a href="#journal" className="smoothScroll">Blog</a></li>
				          <li><a href="#contact" className="smoothScroll">Contact</a></li>
				        </ul>

				      </div>
				    </div>
				</nav>
				<div id="hero" className="home" style = {homeStyle}>
				    <div className="container">
				      <div className="hero-content">
					        <h1>
						        <div id = "typing" >
							        <span>
								        <Typed
						                	strings={[
							                    'Create amazing Surveys',
							                    'Create amazing Invitations',
							                    'Create amazing Polls',
							                    'Do more with HYForms'
						                    ]}
						                    typeSpeed={40}
						                    backSpeed={50}
						                    loop >
						                </Typed>
			                		</span>
		                		</div>
	                		</h1>
	                		<tr className="mt-4">
	                			<td className="p-3 "><Link to="/create"><button className = "btn btn-default btn-block btn-primary">Get Started</button></Link></td>
	                			<td className="p-3 "><a href="#about"><button className = "btn btn-default btn-block btn-primary">Why HYForms</button></a></td>
	                		</tr>
				      </div>
				    </div>
				  </div>
				  <div id="about" class="paddsection">
			      <div class="container">
			        <div class="row justify-content-between">
			          <div class="col-lg-4 ">
			            <div class="div-img-bg">
			              <div class="about-img">
			                <img src={ create } class="img-responsive" alt="me"/>
			              </div>
			            </div>
			          </div>
			          <div class="col-lg-7">
			            <div class="about-descr">
			              <p class="p-heading">Create amazing forms with, HYForms!</p>
			              <p class="separator">Create forms for anything: Polls, Invitations, Surveys, you name it. Create interactive and beautiful forms with an amazing look and design
			              					   and share it to the world to get fast reponses.</p>
			            </div>
			          </div>
			        </div>
			        <div class="row justify-content-between mt-5">    
			          <div class="col-lg-7">
			            <div class="about-descr">
			              <p class="p-heading">Copy Templates and save time!</p>
			              <p class="separator">Anyone can create templates and share it to the world to see, and use if they like! This feature can save a lot of time and create questions quick!
			              					   add, remove or modify the questions as you like!</p>
			            </div>
			          </div>
			          <div class="col-lg-4 ">
			            <div class="div-img-bg">
			              <div class="about-img">
			                <img src={ template } class="img-responsive" alt="me"/>
			              </div>
			            </div>
			          </div>
			        </div>
			        <div class="row justify-content-between mt-5">
			          <div class="col-lg-4 ">
			            <div class="div-img-bg">
			              <div class="about-img">
			                <img src={ secure } class="img-responsive" alt="me"/>
			              </div>
			            </div>
			          </div>
			          <div class="col-lg-7">
			            <div class="about-descr">
			              <p class="p-heading">Your data, secure</p>
			              <p class="separator">This form is exclusively built on a private server and deployed specifically for you on your private cloud. Result? Your data is much more 
			              					   secure and safe!</p>
			            </div>
			          </div>
			        </div>
			        <div class="row justify-content-between mt-5">    
			          <div class="col-lg-7">
			            <div class="about-descr">
			              <p class="p-heading">We are open source!</p>
			              <p class="separator">You can copy the souce code which is available on github for free for anyone to use! Download the code, make modifications and deploy it on your own
			              					   personal cloud! You can also ask us you deploy it for you but ofcourse, it comes with a price.</p>
			            </div>
			          </div>
			          <div class="col-lg-4 ">
			            <div class="div-img-bg">
			              <div class="about-img">
			                <img src={ open } class="img-responsive" alt="me"/>
			              </div>
			            </div>
			          </div>
			        </div>
			      </div>
			    </div>
			</React.Fragment>
		)
	}
}

export default HomePage;