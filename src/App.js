import './App.css';
import React, { Component } from 'react'
import Navbar from './componenets/Navbar';
import News from './componenets/News';
import{ 
  BrowserRouter as Router, 
  Route,
  Routes
} from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  pageSize = 15;
  apiKey = "6bf62594eac240f29cbccca64110bd4f"
  state ={
    progress : 0
  }
  setProgress = (progress)=>{
    this.setState({progress:progress});
  }
  render() {
    return (
      <div>
      <Router>
      <Navbar/>
      <LoadingBar
        height= {3}
        color='#f11946'
        progress={this.state.progress}
      />
      <Routes>
        <Route  exact path="/" element = {<News setProgress =  {this.setProgress}  key ="general" pageSize={this.pageSize} country="in" category = "general"/>}/>
        <Route exact path="/Business" element = {<News setProgress =  {this.setProgress}  key ="Business" pageSize={this.pageSize} country="in" category = "business"/>}/>
        <Route exact path="/Entertainment" element = {<News setProgress =  {this.setProgress}  key ="Entertainment" pageSize={this.pageSize} country="in" category = "entertainment"/>}/>
        <Route exact path="/Generalhealth" element = {<News setProgress =  {this.setProgress}   key ="Generalhealth" pageSize={this.pageSize} country="in" category = "health"/>}/>
        <Route exact path="/Science" element = {<News setProgress =  {this.setProgress}  key ="Science" pageSize={this.pageSize} country="in" category = "science"/>}/>
        <Route exact path="/Sports" element = {<News setProgress =  {this.setProgress}  key ="Sports" pageSize={this.pageSize} country="in" category = "sports"/>}/>
        <Route exact path="/Technology" element = {<News setProgress =  {this.setProgress}  key ="Technolog" pageSize={this.pageSize} country="in" category = "technology"/>}/>
      </Routes>
      </Router>
      </div>
    )
  }
}

