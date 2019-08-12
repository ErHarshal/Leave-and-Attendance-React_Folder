import React,{Component} from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input} from 'reactstrap';
import axios from 'axios';
import LeaveApplications from './LeaveApplications';


class Leave extends Component
{
  constructor(props) {
    super(props);
    this.state = {
                toDate:new Date(),
                fromDate:new Date(),
                typeOfLeave:'Earn Leave',
                reason:'',
                user:window.atob(localStorage.getItem('user')),
                earnLeave:0,
                marrigeLeave:0,
                casualLeave:0,
                 };
          this.handleChange=this.handleChange.bind(this);
          this.handleLeave=this.handleLeave.bind(this);
        //  this.handleLeaveDecrement=this.handleLeaveDecrement.bind(this);
  }

componentDidMount(){
axios({
  method: 'post',
  url: 'http://localhost:4000/getUserLeave',
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer "+localStorage.getItem("token")  
  },
  data: {
    "username":window.atob(localStorage.getItem('user'))
  }
})
.then(response=> {
  //console.log(response.data.EarnedLeave)
  this.setState({earnLeave:response.data.EarnedLeave})
  this.setState({marrigeLeave:response.data.MarrigeLeave})
  this.setState({casualLeave:response.data.CasualLeave})
})
.catch(function(err){
    console.log(err);
})

}
  
handleChange= (event) =>
{
  this.setState({[event.target.name]:event.target.value});
}
/*
handleLeaveDecrement=()=>
{
  let flag=0;
  switch(this.state.typeOfLeave) {
    case 'Earn Leave':if(this.state.earnLeave===0)
                        flag=0;
                        break;
    case 'Casual Leave':if(this.state.casualLeave===0)
                        flag=0;
                        break;
    case 'Wedding Leave':if(this.state.marrigeLeave===0)
                          flag=0;
                          break;
    default:
        flag=1;
        break;
  }
  return flag;
}*/


handleLeave=(event)=>
{
 // event.preventDefault();
let flag=1;
console.log(this.state.typeOfLeave)
if(this.state.typeOfLeave.substring(0,4)==='Earn')
{
  if(this.state.earnLeave===0)
        flag=0;
}
else if(this.state.typeOfLeave.substring(0,4)==='Casu')
{
  if(this.state.casualLeave===0)
        flag=0;
}
else if(this.state.typeOfLeave.substring(0,4)==='Wedd')
{
  if(this.state.marrigeLeave===0)
        flag=0;
}
console.log(flag)
  if(flag)
  {
 // console.log(userName);
  if(this.state.toDate!=='' && this.state.fromDate!=='' && this.state.typeOfLeave!=='' && this.state.reason!=='')
  {
  //  event.preventDefault()
    let requestData = {
            "toDate":this.state.toDate,
            "fromDate": this.state.fromDate,
            "typeOfLeave": this.state.typeOfLeave,
            "reason":this.state.reason,
            "username":this.state.user,
              }
              console.log(requestData);
              axios.post('http://localhost:4000/leave',requestData)
              .then(response =>{
                console.log(response)
                if(response.data.result==='success')
                {
                  alert('Data inserted successfully..')
                  this.props.history.push({
                    pathname: '/Attend',
                  });
                }
              })
              .catch(error =>{
                console.log(error)
              })   
    }
  }
  else
  {
    alert("You do not have available leave")
  }
  
}

render()
{
    return(
        <div>
 
        <Form onSubmit={this.handleLeave} className="atten-form-style">
        <Row form>
            <Col md={3}>
              <FormGroup>
                <Label >To Date</Label>
                <Input type="date" name="toDate" id="toDate" value={this.state.toDate}  onChange={this.handleChange}/>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label >From Date</Label>
                <Input type="date" name="fromDate" id="fromDate" value={this.state.fromDate}  onChange={this.handleChange} />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <Label className="label-leave1-style">Earn Leave</Label><br/>
                <Label className="label-leave-style" >{this.state.earnLeave}</Label>
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <Label className="label-leave1-style">Casual Leave</Label><br/>
                <Label className="label-leave-style">{this.state.casualLeave}</Label>
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <Label className="label-leave1-style">Wedding Leave</Label><br/>
                <Label className="label-leave-style">{this.state.marrigeLeave}</Label>
              </FormGroup>
            </Col>
          </Row>
        <Row form>
            <Col md={3}>
              <FormGroup>
                <Label for="exampleSelect">Select Leave type</Label>
                <Input type="select" name="typeOfLeave" id="exampleSelect" value={this.state.typeOfLeave}  onChange={this.handleChange}>
                    <option>Earn Leave</option>
                    <option>Casual Leave</option>
                    <option>Wedding Leave</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
          <FormGroup>
          <Label for="exampleText">Reason</Label>
          <Input type="textarea" name="reason" id="exampleText" value={this.state.reason}  onChange={this.handleChange} />
        </FormGroup>
        </Col>
        </Row>
        <Button type="submit" >Submit</Button>
      </Form>
    <LeaveApplications/>
        </div>
    );
}
}
export default Leave;