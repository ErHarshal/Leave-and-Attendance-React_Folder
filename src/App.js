import React,{Component} from 'react';
import Login from './component/login';
import './App.css';

class App extends Component{
  render(){
  return (
    <div className="App">
      <h1 className="h1-style">Attendance and Leave System</h1>
      <Login {...this.props}/>
    </div>
  );
  }
}

export default App;
