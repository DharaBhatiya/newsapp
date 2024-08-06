// import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';


// import React, { Component } from 'react'
// import NavBar from './Component/NavBar';
// import News from './Component/News';
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
// } from "react-router-dom";

// export default class App extends Component {
//   render() {
//     return (
//       <div>
//         <Router>
//         <NavBar/>
//         <Routes>
//           <Route exact path="/"><News pageSize={5} country="in" category="general"/></Route>
//           <Route exact path="/business"><News pageSize={5} country="in" category="business"/></Route>
//           <Route exact path="/entertainment"><News pageSize={5} country="in" category="entertainment"/></Route>
//           <Route exact path="/general"><News pageSize={5} country="in" category="general"/></Route>
//           <Route exact path="/health"><News pageSize={5} country="in" category="health"/></Route>
//           <Route exact path="/science"><News pageSize={5} country="in" category="science"/></Route>
//           <Route exact path="/sports"><News pageSize={5} country="in" category="sports"/></Route>
//           <Route exact path="/technology"><News pageSize={5} country="in" category="technology"/></Route>
//         </Routes>
//         </Router>
//       </div>
//     )
//   }
// }


import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import React, { Component } from 'react';
import NavBar from './Component/NavBar';
import News from './Component/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  pageSize= 15

  state= {
    progress: 0
  }
  setProgress = (progress) => {
    this.setState({progress: progress})
  }
  render() {
    return (
      <div>
        <Router>
          <NavBar />
          <LoadingBar
             color='#f11946'
             progress={this.state.progress}
        // onLoaderFinished={() => setProgress(0)}
      />
          <Routes>
            <Route path="/" element={<News setProgress={this.setProgress} key="general" pageSize={this.pageSize} country="in" category="general" />} />
            <Route path="/business" element={<News setProgress={this.setProgress} key="business" pageSize={this.pageSize} country="in" category="business" />} />
            <Route path="/entertainment" element={<News setProgress={this.setProgress} key="entertainment" pageSize={this.pageSize} country="in" category="entertainment" />} />
            <Route path="/general" element={<News setProgress={this.setProgress} key="general" pageSize={this.pageSize} country="in" category="general" />} />
            <Route path="/health" element={<News setProgress={this.setProgress} key="health" pageSize={this.pageSize} country="in" category="health" />} />
            <Route path="/science" element={<News setProgress={this.setProgress} key="science" pageSize={this.pageSize} country="in" category="science" />} />
            <Route path="/sports" element={<News setProgress={this.setProgress} key="sports" pageSize={this.pageSize} country="in" category="sports" />} />
            <Route path="/technology" element={<News setProgress={this.setProgress} key="technology" pageSize={this.pageSize} country="in" category="technology" />} />
          </Routes>
        </Router>
      </div>
    );
  }
}
