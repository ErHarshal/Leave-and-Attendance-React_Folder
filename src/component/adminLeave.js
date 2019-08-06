import React,{Component} from 'react';
import { Table } from 'reactstrap';
import axios from 'axios';



const ToList = props=>(
    
    <tr>
       <td >{props.count}</td>
       <td >{props.list.username}</td>
        <td >{props.list.toDate.substring(0,10)}</td>
        <td >{props.list.fromDate.substring(0,10)}</td>
        <td >{props.list.typeOfLeave}</td>
        <td >{props.list.reason}</td>
        <td >{props.list.leavestatus}</td>
        <td><button onClick={async ()=>
        {
            const reqdata={
                "buttonStatus": "approved",
                "fromDate": props.list.fromDate.substring(0,10),
                "toDate": props.list.toDate.substring(0,10),
                "typeOfLeave": props.list.typeOfLeave,
                "username": props.list.username
                }
            //console.log(reqdata);
          await  axios.post('http://3.19.59.27:4000/updateleavestatus',reqdata)
            .then(res=>{
                if(res.data.result==='success')
                {
                    alert("Approved");
                }
                
            })
            .catch(function(err){
                console.log(err);
            })
        }
        }>Approve</button><button onClick={async ()=>
            {
                const reqdata={
                    "buttonStatus": "Rejected",
                    "fromDate": props.list.fromDate.substring(0,10),
                    "toDate": props.list.toDate.substring(0,10),
                    "typeOfLeave": props.list.typeOfLeave,
                    "username": props.list.username
                    }
               // console.log(reqdata);
              await  axios.post('http://3.19.59.27:4000/updateleavestatus',reqdata)
                .then(res=>{
                    if(res.data.result==='success')
                    {
                        alert("Rejected");
                    }
                    
                })
                .catch(function(err){
                    console.log(err);
                })
            }
        }>Reject</button></td>
        
    </tr>
)
/*
handleApprove = props =>
{
    const reqdata={
        "username":props.list.username,
        "toDate":props.list.toDate,
        "fromDate":props.list.fromDate,
        "typeOfLeave":props.list.typeOfLeave,
    }
    console.log(reqdata);
    axios.post('http://3.19.59.27:4000/approve',reqdata)
    .then(res=>{
        if(res.data.result==='success')
        {
            alert("Approved");
        }
        
    })
    .catch(function(err){
        console.log(err);
    })
}*/



class AdminLeave extends Component
{
    constructor(props){
        super(props);

        this.state={list:[],
        };
      //  this.handleApprove=this.handleApprove.bind(this);
    }

    componentDidMount(){
        axios.get('http://3.19.59.27:4000/leaveList')
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
                        <th>username</th>
                        <th>To date</th>
                        <th>from date</th>
                        <th>Type of Leave</th>
                        <th>Reason</th>
                        <th>Application Status</th>
                        <th>Action</th>
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
export default AdminLeave;