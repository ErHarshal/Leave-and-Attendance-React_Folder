import React ,{Component} from 'react';
import { Button, Form, FormGroup, Label, Input,Row,Col } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.css";  
import axios from 'axios';


export default class Register extends Component {
      constructor(props){
        super(props);
        this.state={
          firstName:'',
          LastName:'',
          empId:0,
          password:'',
          username:'',
          selectedOption:'male',
        };
          this.handleRegister=this.handleRegister.bind(this);
          this.handleChange=this.handleChange.bind(this);
      }
  handleChange(event)
  {
    this.setState({
      [event.target.name]: event.target.value
     });
  }


  handleRegister= event =>
  {

    if(this.state.username!=='' && this.state.password!=='' && this.state.selectedOption!=='' && this.state.firstName!=='' && this.state.LastName!=='' && this.state.empId!=='')
    {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.username))
      {
        event.preventDefault()
 let requestData = {
  "empId":this.state.empId,
   "password": this.state.password,
      "firstName": this.state.firstName,
      "LastName":this.state.LastName,
      "username": this.state.username,
      "Gender": this.state.selectedOption
    
  }

        axios.post('http://localhost:4000/register',requestData)
        .then(response =>{
          console.log(response)
          if(response.status===200)
          {
              this.props.history.push({
               pathname: '/',
             });
          }
        })
        .catch(error =>{
          console.log(error)
        })
        
      }
      else{
        alert("please Enter valid Username");
       }
    }
    else
    { 
        alert("please Enter all details");
    }
  }

  render() {
    return (
      <Form onSubmit={this.handleRegister} className="atten-form-style">
        <Row form>
        <Col md={3}>
            <FormGroup >
          <Label>First Name</Label>
          <Input type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange} />
        </FormGroup>
        </Col>

         <Col md={3}>
        <FormGroup >
          <Label>Last Name</Label>
          <Input type="text" name="LastName" value={this.state.LastName} onChange={this.handleChange} />
        </FormGroup>
        </Col>
        
        <Col md={3}>
        <FormGroup >
          <Label>Employee Id</Label >
              <Input type="number" name="empId" value={this.state.empId} onChange={this.handleChange} />         
        </FormGroup>
        </Col>
        </Row>

        <Row form>
        <Col md={6}>
        <FormGroup >
          <Label for="exampleEmail">Username</Label>
          <Input type="email" name="username" id="exampleEmail" value={this.state.username} onChange={this.handleChange} />
        </FormGroup>
        </Col>
        </Row>

        <Row form>
        <Col md={6}>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input type="password" name="password" id="examplePassword" value={this.state.password} onChange={this.handleChange} />
        </FormGroup>
        </Col>
        </Row>

        <FormGroup>
            <label>Select gender</label><br/>
            <input type="radio" name="selectedOption" value="male" checked={this.state.selectedOption === 'male'} onChange={this.handleChange} /> Male<br/>
            <input type="radio" name="selectedOption" value="female" checked={this.state.selectedOption === 'female'} onChange={this.handleChange} /> Female<br/>
            <input type="radio" name="selectedOption" value="other" checked={this.state.selectedOption === 'other'} onChange={this.handleChange} /> Other<br/>  
        </FormGroup>
        <Button type="submit">Register</Button>
      </Form>
    );
  }
}