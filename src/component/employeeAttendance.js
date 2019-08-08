import React,{Component} from 'react';
import { Table } from 'reactstrap';
import axios from 'axios';
import { userName } from './login';

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

class EmployeeAttendance extends Component
{
    constructor(props){
        super(props);

        this.state={list:[],
            user:userName,
        };   
    }

  
    componentDidMount(){

        axios({
            method: 'post',
            url: 'http://localhost:4000/getEmployeeAttendence',
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer "+localStorage.getItem("username")  
            },
            data: {
              "username":this.state.user
            }
          })
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
export default EmployeeAttendance;