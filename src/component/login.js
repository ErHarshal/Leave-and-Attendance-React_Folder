import React ,{Component} from 'react';
import { Form, Label, Input } from 'reactstrap';
//import { withRouter } from 'react-router';
//import '../App.css';
//import "react-tabs/style/react-tabs.css";
import "bootstrap/dist/css/bootstrap.css";
import axios from 'axios';
let  userName;

export default class Login extends Component{
  constructor(props) {
    super(props);
    this.state = {
      username:'',
      password:'',
      selectedOption:'Employee',
    };
    this.handleUsername=this.handleUsername.bind(this);
    this.handlePassword=this.handlePassword.bind(this);
    this.handleLogin=this.handleLogin.bind(this);
    this.radioChange = this.radioChange.bind(this);
  }

  handleUsername(event)
  {
    this.setState({username:event.target.value});
  }
  handlePassword(event)
  {
    this.setState({password:event.target.value});
  }
  radioChange(event) {
    this.setState({
      selectedOption: event.currentTarget.value
    });
  }

  async handleLogin(event)
  {
    const {password, username,selectedOption} = this.state;
    if(username!=='' && password!=='' && selectedOption==="Employee")
    {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.username))
      {
      userName=username;
        event.preventDefault()
        let requestData = {
           "password": password,
            "type":"user",
            "username": username,
          }
         await axios.post('http://localhost:4000/login',requestData)
        .then(response =>{
          console.log(response.data.token)
          if(response.data.result==="success")
          {
            
            const token=response.data.token;
            localStorage.setItem('username',token);
            this.props.history.push({
              pathname: '/Attend',
            });
          }
          else
          {
            alert("Incorrect Details");
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
    else if(username==='admin' && password==='admin' && selectedOption==="Admin")
    {
      this.props.history.push({
        pathname: '/admin',
      });
    }
    else
    { 
        alert("Please enter the username and password");
    }
  }

  render() {
        return (
            <div className="center">
              
              <Form className="form-style" inline>
                <table className="table-border">
                  <tr>
                        <td><Label for="exampleEmail" className="label-style">Username</Label></td>
                        <td><Input className="input-style" value={this.state.username} onChange={this.handleUsername} type="email" required/></td>
                    </tr>
                    <tr>
                      <td><Label for="examplePassword" className="label-style">Password</Label></td>
                      <td><Input className="input-style" value={this.state.password} onChange={this.handlePassword} type="password" required/></td>
                      </tr>


                      <tr>
                        <td> <Label className="type-user-style"> Type of User </Label></td>
                        <td><input type="radio" name="UserType" value="Employee" checked={this.state.selectedOption === 'Employee'} onChange={this.radioChange}/>Employee <br/></td></tr>
                        <tr>
                          <td></td>
                        <td> <input type="radio" name="UserType" value="Admin" checked={this.state.selectedOption === 'Admin'} onChange={this.radioChange}/> Admin<br/></td>
                        </tr>


                        <tr>
                          <td><button className="button-style" onClick={this.handleLogin}>Login</button> </td>
                          <td>  <button className="button-style" onClick={()=>{
              this.props.history.push({
                pathname: '/Register',
              });
                }}>Sign up</button> </td>
                          </tr>
         
            </table>
        
          </Form>
          
          </div>
        );
      }
      
}
export {userName};