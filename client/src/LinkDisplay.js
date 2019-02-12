import React, { Component } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Button from 'react-bootstrap/Button';

class LinkDisplay extends Component {

  constructor(props){
    super(props);
    this.state={

    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(){
    //axios.get
    this.setState({
      submitted:true,
    });
  }

  render() {
    return (
      <React.Fragment>
      <div>
        <div className ="Link">
          <p>Here is a resource that fits your difficulty level!</p>
          <a href={this.props.link}>{this.props.link}</a>
        </div>
      </div>
      </React.Fragment>
    );
  }
}

export default LinkDisplay;
