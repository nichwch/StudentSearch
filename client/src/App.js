import React, { Component } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button';

import LinkDisplay from './LinkDisplay';

const axios = require('axios');


const quotes = [
  'Please wait while we find the perfect resource for you...',
  'Consulting Google Natural Language Processing...',
  'Scraping Web Pages...',
  'Feeding Neural Network...',
];

const EASY = "EASY";
const MEDIUM = "MEDIUM";
const HARD = "HARD";

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      subject:"",
      difficulty:EASY,
      submitted:false,
      loading:false,
      response:"",
      time:0,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(){
    this.setState({
      submitted:false,
      loading:true,
    });

    window.setInterval(()=>{
      this.setState({
        time:this.state.time+1
      })
    }, 2000);

    axios.get('http://ec2-54-183-198-145.us-west-1.compute.amazonaws.com:8080/getlink?keyword='+this.state.subject+'&difficulty='+this.state.difficulty)
    .then(
      res =>{
        window.clearTimeout();
        console.log("RES",res.data);
        this.setState({
          submitted:true,
          loading:false,
          response:res.data
        })
      }
    )
  }
  handleChange(event){
   this.setState({subject: event.target.value});
   }

  render() {
    var linkDisplay = null;
    var loading = null;
    if(this.state.submitted)
    {
      linkDisplay = (
        <React.Fragment>
          <br></br>
          <LinkDisplay link = {this.state.response}/>
        </React.Fragment>
      );
    }
    if(this.state.loading)
    {
      loading = (
        <React.Fragment>
          <div className = "loadingDiv">
          </div>
          <p className = "loadingText">{quotes[(this.state.time)%5]}</p>
        </React.Fragment>
      )
    }



    return (
      <React.Fragment>
        <div className = "masterContainer">
          <div className = "container">
            <div>(StudentSearch)</div>
            <br></br><br></br>
            <h3 className = "preface">I want to learn...</h3>
            <input className = "searchBox" content = {this.state.subject} onChange={this.handleChange}></input>
            <ButtonGroup className="mr-2" aria-label="First group">
              <DropdownButton className="super-colors" id="dropdown-basic-button" title={"Difficulty: "+this.state.difficulty}>
                <Dropdown.Item onClick = {()=>{this.setState({difficulty:EASY})}}>{EASY}</Dropdown.Item>
                <Dropdown.Item onClick = {()=>{this.setState({difficulty:MEDIUM})}}>{MEDIUM}</Dropdown.Item>
                <Dropdown.Item onClick = {()=>{this.setState({difficulty:HARD})}}>{HARD}</Dropdown.Item>
              </DropdownButton>
              <Button className="wbutton" onClick = {this.handleSubmit}>Search</Button>
            </ButtonGroup>

            {linkDisplay}
            {loading}
          </div>
         </div>

      </React.Fragment>
    );
  }
}

export default App;
