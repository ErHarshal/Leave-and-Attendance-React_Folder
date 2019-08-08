import React,{Component} from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input} from 'reactstrap';
import "bootstrap/dist/css/bootstrap.css";      
import axios from 'axios';
import {userName} from './login';
import EmployeeAttendance from './employeeAttendance';

 class Atten extends Component
 {
  constructor(props) {
    super(props);
    this.state = {
      inTime:null,
      outTime:null,
      workHourse:null,
      date:new Date(),
      user:userName,
    }
    this.handelIntimechange=this.handelIntimechange.bind(this);
    this.handelOuttimechange=this.handelOuttimechange.bind(this);
   // this.changeWorkHourse=this.changeWorkHourse.bind(this);
    this.changedate=this.changedate.bind(this);
    this.handleAtten=this.handleAtten.bind(this);
  }

  changedate(event)
  {
    this.setState({date:event.target.value});
  }

  handelIntimechange(event)
  {
    this.setState({inTime:event.target.value});
  }

  handelOuttimechange(event)
  {
      this.setState({outTime:event.target.value});
      this.setState({workHourse:parseInt(this.state.outTime ,10)- parseInt(this.state.inTime,10)});
  }

  

  /*changeWorkHourse(event){
    var h=this.state.outhours-this.state.inhours;
    var m=this.state.outmin-this.state.inmin;
    if (m<0)
    {
    m=60+m;
    h=h-1;
    }
    var year = '2013';
    var month = '04';
    var day = '18';
    var reserv = new Date(year,month,day,h,m)
    var ti=reserv.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})
    console.log(ti);
    this.setState({workHourse:ti});
  }*/

  handleAtten(event)
  {
      if(this.state.inTime!=='' && this.state.outTime!=='' && this.state.date!=='')
      {
        event.preventDefault()
     /*axios.post('http://localhost:4000/attendance',requestData)
      .then(response =>{
      //  console.log(response)
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
      }) */   

      axios({
        method: 'post',
        url: 'http://localhost:4000/attendance',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer "+localStorage.getItem("username")   //"Bearer msdnflksdjflkjglkjdfjsdgjupdifhpogidpofhipodfjgphdj"
        },
        data: {
          "attendate":this.state.date,
          "inTime": this.state.inTime,
          "outTime": this.state.outTime,
          "workingHours":this.state.workHourse,
          "username":this.state.user,
        }
      })
      .then(response =>{
        //  console.log(response)
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
 render()
    {
      return (
        <div>
        <Form onSubmit={this.handleAtten} className="atten-form-style">
          <Row form>
            <Col md={3}>
              <FormGroup>
                <Label >Date</Label>
                <Input type="date" value={this.state.date} onChange={this.changedate} id="AttenDate" />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={0.4}>
              <FormGroup>
                <Label>In Time</Label>
                <Input type="time" value={this.state.inhours} onChange={this.handelIntimechange} />
              </FormGroup>
            </Col>
            <Col md={0.4}>
              <FormGroup>
                <Label>Out Time</Label>
                <Input type="time"  value={this.state.outhours} onChange={this.handelOuttimechange} />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <Label>Working Hours</Label>
                <Input type="text" value={this.state.workHourse}  id="AttenOutHourse" />
              </FormGroup>
            </Col>
          </Row>
          <Button type="submit">Submit</Button>
        </Form>
        <EmployeeAttendance/>
        </div>
      );

    }
 }
 export default Atten;