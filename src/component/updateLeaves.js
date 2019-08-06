import React,{Component} from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input} from 'reactstrap';
import axios from 'axios';

class UpdateLeaves extends Component
{
    constructor(props){
        super(props);
        this.state={
                username:'',
                typeOfLeave:'Earned Leave',
                Nodays:0
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleLeaveUpdate=this.handleLeaveUpdate.bind(this);
    }
    handleChange(event)
    {
      this.setState({
        [event.target.name]: event.target.value
       });
    }

    handleLeaveUpdate(event)
    {
        event.preventDefault();
        const data={
            "username":this.state.username,
            "typeOfLeave":this.state.typeOfLeave,
              "noOfDays":this.state.Nodays
          }
          console.log(data);
          axios.post('http://3.19.59.27:4000/adminapitoupdateleaves',data)
          .then(res=>{
            console.log(res);
              if(res.data.nModified===1)
              alert("User Leave are updated !!!!");
              else
              alert("Please enter correct datails !!!!");
          })
          .catch(function(err){
              console.log(err);
          })
    }

    render(){
        return(
                <div>
  <Form onSubmit={this.handleLeaveUpdate} className="atten-form-style">
  <Row form>
        <Col md={6}>
        <FormGroup >
          <Label for="exampleEmail">Username</Label>
          <Input type="email" name="username" id="exampleEmail" value={this.state.username} onChange={this.handleChange} />
        </FormGroup>
        </Col>
        </Row>
        <Row form>
            <Col md={3}>
              <FormGroup>
                <Label for="exampleSelect">Select Leave type</Label>
                <Input type="select" name="typeOfLeave" id="exampleSelect" value={this.state.typeOfLeave}  onChange={this.handleChange}>
                    <option>Earned Leave</option>
                    <option>Casual Leave</option>
                    <option>Marrige Leave</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={3}>
          <FormGroup>
          <Label for="exampleText">Number of Leave days to be credit or Debit </Label><br/>
          <Input type="number" name="Nodays" value={this.state.Nodays}  onChange={this.handleChange} />
        </FormGroup>
        </Col>
        </Row>
        <Button type="submit" >Submit</Button>
      </Form>
                </div>
        );
    }
}
export default UpdateLeaves;