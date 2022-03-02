import React, { Component } from 'react';
import 'whatwg-fetch';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';
import './styleSheets/MyForms.css';


const sessionCookie = cookie.load('csrftoken');

const titleStyle = {
    fontSize: 'xxx-large',
    position: 'relative',
    top: '5vh',
}


const divStyle = {
  position: 'relative',
  top: '20vh',
}

const navStyle = {
  position: 'fixed',
  top: '1vh'
}


class PublicForms extends Component {

  state = {
    myForms: [

    ],
    currentUser: ""
  }

  loadForms = () => {
    const endpoint = '/listaddpublic/';
    let thisComp = this;
    let lookupOptions = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    }
    fetch ( endpoint, lookupOptions )
    .then(function(response){
      return response.json()
    }).then(function(responseData){
      thisComp.setState({
        myForms: responseData
      })
    }).catch(function(error){
      console.log("error", error)
    })
  }

  componentDidMount(){
    const script = document.createElement("script");
    script.src = "https://kit.fontawesome.com/0467bd4fc9.js";
    script.async = true;
    document.body.appendChild(script);
    this.loadForms();
    const endpoint = '/current_user/';
    let thisComp = this;
    let lookupOptions = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    }
    fetch ( endpoint, lookupOptions )
    .then(function(response){
      return response.json()
    }).then(function(responseData){
      thisComp.setState({
        currentUser: responseData
      })
    }).catch(function(error){
      console.log("error", error)
    })
  }

  render() {
    return (
      <React.Fragment>
      <nav id="main-nav">
            <div className="row">
              <div className="container">

                <div className="responsive"><i data-icon="m" className="ion-navicon-round"></i></div>
                <ul className="nav-menu list-unstyled">
                  <Link to={"/hyforms"}>
                    <li><a className="smoothScroll">Home</a></li>
                  </Link>
                  <Link to={"/hyforms/create"}>
                    <li><a className="smoothScroll">Create</a></li>
                  </Link>
                  <Link to={"/hyforms/myforms"}>
                    <li><a className="smoothScroll">Your Forms</a></li>
                  </Link>
                  <Link to={"/hyforms/publicforms"}>
                    <li><a className="smoothScroll">Browse Templates</a></li>
                  </Link>
                  <Link to={"/logoutUser"}>
                    <li><a className="smoothScroll">{this.state.currentUser.username}</a></li>
                  </Link>
                </ul>
              </div>
            </div>
        </nav>
         <div className = "banner">
           <font color="white">
             <center>
             <h1>Public Forms</h1>
             <h5>Here, you can choose a template and copy it to use.</h5>
             </center>
           </font>
         </div>
      <div id="myForms">
        {
                this.state.myForms.map(
                  eachForm =>
                  <div className="eachForm">
          <h5>{eachForm.title}</h5>
            <Link to={{ pathname: `/hyforms/publicforms/${eachForm.slug}`}}>
              <i className="fas fa-edit fa-3x edit"></i>
            </Link>
        </div>
                  )
        }
      </div>
      </React.Fragment>
    );
  }
}

export default PublicForms;
