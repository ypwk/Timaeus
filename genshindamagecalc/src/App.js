import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CharacterScreen, InventoryScreen, EnvironmentScreen, SideBar, Home } from './components';
import React, { Component } from 'react';
import Loader from "react-loader-spinner";

import 'bootstrap/dist/css/bootstrap.css';
import './css/App.css';
import storageUtils from "./utils/storageUtils";

class App extends Component {
  constructor(props){
    super(props);
    this.storageHelper = new storageUtils();
    this.state={loading:true};
  }

  async loadData(){
    await this.storageHelper.fetchData();
    this.setState({loading: false});
  }

  componentDidMount(){
    this.loadData();
  }

  render(){
    if(this.state.loading){
      return ( <div className="text-center">
        <Loader type="Rings" color="Grey" height={400} width={400}
        style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)'
      }}/>
        </div> );
    }
    else {
      return ( <div className="App" class="scrollbar h-100">
        <Router>
          <SideBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/character/" element={<CharacterScreen storageUtil={this.storageHelper}/>} />
            <Route path="/artifact/" element={<InventoryScreen storageUtil={this.storageHelper}/>} />
            <Route path="/environment/" element={<EnvironmentScreen storageUtil={this.storageHelper}/>} />
          </Routes>
        </Router>
      </div> );
    }
  }
  
}

export default App;
