import React ,{Component} from "react";
import { Table } from 'reactstrap';
import axios from 'axios';

const ToList = props=>(
    
props.list.totalleaves===0 ?(
        <tr>
            <td style={{color:"red"}} >{props.count}</td>
            <td style={{color:"red"}}>{props.list.userName}</td>
            <td style={{color:"red"}}>{props.list.firstName}</td>
            <td style={{color:"red"}}>{props.list.CasualLeave}</td>
            <td style={{color:"red"}}>{props.list.MarrigeLeave}</td>
            <td style={{color:"red"}}>{props.list.EarnedLeave}</td>
            <td style={{color:"red"}}>{props.list.totalleaves}</td>
        </tr>
    ):
    (
            <tr>
            <td >{props.count}</td>
            <td >{props.list.userName}</td>
            <td >{props.list.firstName}</td>
            <td >{props.list.CasualLeave}</td>
            <td >{props.list.MarrigeLeave}</td>
            <td >{props.list.EarnedLeave}</td>
            <td >{props.list.totalleaves}</td>
        </tr>
    )

)

class LeaveBalance extends Component
{
     constructor(props){
        super(props);

        this.state={list:[],
        };
    }

    componentDidMount(){
        axios.get('http://3.19.59.27:4000/fetchzeroleaves') 
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
                        <th>First Name</th>
                        <th>Casual Leave</th>
                        <th>Marrige Leave</th>
                        <th>Earned Leave</th>
                        <th>Total Leaves</th>
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
export default LeaveBalance;