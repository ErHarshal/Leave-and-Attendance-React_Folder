import React,{Component} from 'react';
import { Table } from 'reactstrap';
import axios from 'axios';
import { userName } from './login';



const ToList = props=>(
    
    <tr>
       <td >{props.count}</td>
        <td >{props.list.toDate.substring(0,10)}</td>
        <td >{props.list.fromDate.substring(0,10)}</td>
        <td >{props.list.typeOfLeave}</td>
        <td >{props.list.reason}</td>
        <td >{props.list.leavestatus}</td>
    </tr>
)



class LeaveApplications extends Component
{
    constructor(props){
        super(props);

        this.state={list:[],
            user:userName,
        };
    }

    componentDidMount(){
       /* axios.post('http://localhost:4000/leaveList',reqdata)*/
       axios({
        method: 'post',
        url: 'http://localhost:4000/leaveList',
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


    render(){
        return(
            <div>
                <Table striped>
                    <thead>
                    <tr>
                        <th>Application No</th>
                        <th>To date</th>
                        <th>from date</th>
                        <th>Type of Leave</th>
                        <th>Reason</th>
                        <th>Application Status</th>
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
export default LeaveApplications;