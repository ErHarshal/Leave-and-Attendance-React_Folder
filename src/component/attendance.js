import React from 'react';
//import { Route, BrowserRouter as Router ,Link} from 'react-router-dom';
import Atten from './Atten';
import Leave from './Leave';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";

export default class Attendance extends React.Component {
  render() {
    return (
      <div>
        
         <Tabs>
                <TabList>
                  <Tab>Attendance</Tab>
                  <Tab>Leave</Tab> 
                  <button className="logout-button" onClick={()=>{
                    localStorage.removeItem("username");
                    this.props.history.push({
                      pathname:'/',
                    });
                  }}>Logout</button>
                </TabList>

                <TabPanel>
                  <Atten/>
                </TabPanel>
                <TabPanel>
                  <Leave/>
                </TabPanel>
        </Tabs>
      </div>
    );
  }
}