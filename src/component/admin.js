import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import AdminLeave from './adminLeave';
import AdminAttandance from './adminAttendance';
import EmployeeAvgReports from './employeeAvgReports';
import UpdateLeaves from './updateLeaves';
import LeaveBalance from './leaveBalance';

export default class Admin extends React.Component {
  render() {
    return (
      <div>
        
         <Tabs>
                <TabList>
                  <Tab>Attendance</Tab>
                  <Tab>Leave</Tab>
                  <Tab>Employee Reports</Tab> 
                  <Tab>Update Leave</Tab>
                  <Tab>Leave Balance</Tab>
                  <button className="logout-button1" onClick={()=>{
                    this.props.history.push({
                      pathname:'/',
                    });
                  }}>Logout</button>
                </TabList>

                <TabPanel>
                    <AdminAttandance/>
                </TabPanel>
                <TabPanel>
                <AdminLeave/>
                </TabPanel>
                <TabPanel>
                <EmployeeAvgReports/>
                </TabPanel>
                <TabPanel>
                <UpdateLeaves/>
                </TabPanel>
                <TabPanel>
                <LeaveBalance/>
                </TabPanel>
        </Tabs>
      </div>
    );
  }
}