
import React,{Component} from 'react';
import { Table } from 'reactstrap';
import axios from 'axios';
import moment from 'moment';


const ToList = props=>(
                <tr>
                <td >{props.count}</td>
                <td>{props.list._id}</td>
                 <td >{props.list.workinghours}</td>  
                 </tr>  
  
)
const ToList1 = props=>(
          <tr >
                <td style={{color:"red"}}>{props.count}</td>
                <td style={{color:"red"}}>{props.list._id}</td>
                <td style={{color:"red"}}>{props.list.workinghours}</td>         
                </tr>
)

class EmployeeAvgReports extends Component
{
    constructor(props){
        super(props);

        this.state={list:[],
        };
        this.handleWeekly=this.handleWeekly.bind(this);
        this.handleMonthly=this.handleMonthly.bind(this);
    
    }

    handleWeekly(){
        var d=moment().format("YYYY-MM-DD");
        const reqdata={
            "date":d,
            "timeperiod":"weekly",
        }
        //console.log(reqdata);
        axios.post('http://3.19.59.27:4000/getAvgEmpHrs',reqdata)
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
        axios.post('http://3.19.59.27:4000/getAvgEmpHrs',reqdata)
        .then(res=>{
            this.setState({list:res.data})
        })
        .catch(function(err){
            console.log(err);
        })
    }
    
    callList(){
        let count=-1;
    return this.state.list.map(function(currentTodo,i){
        count=count+1;
        if(count===0)
        return <ToList1 list = {currentTodo} key={i} count={count}/>;
        else
        return <ToList list = {currentTodo} key={i} count={count}/>;
    });
}


render()
{
    return(
        <div>
            <button onClick={this.handleWeekly}>Weekly Average Attendance </button>
            <button onClick={this.handleMonthly}>Monthly Average Attendance</button>  
            <Table striped>
                    <thead>
                    <tr>
                        <th>Sr No</th>
                        <th>Username</th>
                        <th>Average Working Hourse</th>
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
export default EmployeeAvgReports;
