import React,{Component} from 'react';
import { Table } from 'reactstrap';
import axios from 'axios';
import moment from 'moment';



const ToList = props=>(
    
    <tr>
       <td >{props.count}</td>
       <td>{props.list.username}</td>
        <td >{props.list.attendate.substring(0,10)}</td>
        <td >{props.list.inTime.substring(0,10)}</td>
        <td >{props.list.outTime}</td>
        <td >{props.list.workingHours}</td>    
    </tr>
)

class AdminAttendance extends Component
{
    constructor(props){
        super(props);

        this.state={list:[],
        };
        this.handleDaily=this.handleDaily.bind(this);
        this.handleWeekly=this.handleWeekly.bind(this);
        this.handleMonthly=this.handleMonthly.bind(this);
    
    }

    handleDaily(){
        var d=moment().format("YYYY-MM-DD");
        const reqdata={
            "date":d,
            "timeperiod":"daily",
        }
        axios.post('http://localhost:4000/getAdminattendence',reqdata)
        .then(res=>{
            this.setState({list:res.data})
        })
        .catch(function(err){
            console.log(err);
        })
    }

    handleWeekly(){
        var d=moment().format("YYYY-MM-DD");
        const reqdata={
            "date":d,
            "timeperiod":"weekly",
        }
        //console.log(reqdata);
        axios.post('http://localhost:4000/getAdminattendence',reqdata)
        .then(res=>{
           // console.log(res.data);
            this.setState({list:res.data})
        })
        .catch(function(err){
            console.log(err);
        })
    }

       handleMonthly(){
        var d=moment().format("YYYY-MM-DD");
        const reqdata={
            "date":d,
            "timeperiod":"monthly",
        }
        axios.post('http://localhost:4000/getAdminattendence',reqdata)
        .then(res=>{
            this.setState({list:res.data})
        })
        .catch(function(err){
            console.log(err);
        })
    }
    
    callList(){
        let count=0;
    return this.state.list.map(function(currentTodo,i){
        count=count+1;
        return <ToList list = {currentTodo} key={i} count={count}/>;
    });
}


render()
{
    return(
        <div>
            <button onClick={this.handleDaily}>Daily Report</button>
            <button onClick={this.handleWeekly}>Weekly Report</button>
            <button onClick={this.handleMonthly}>Monthly Report</button>  
            <Table striped>
                    <thead>
                    <tr>
                        <th>Sr No</th>
                        <th>Username</th>
                        <th>Date</th>
                        <th>In Time</th>
                        <th>Out Time</th>
                        <th>Working Hourse</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.callList()}
                    </tbody> 
                </Table>
        </div>
    );
}
}
export default AdminAttendance;