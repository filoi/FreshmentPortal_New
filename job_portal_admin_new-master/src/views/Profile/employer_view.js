import React, { Component } from 'react'
import {
    Card,
    CardBody,
    CardFooter,
    Col, 
    Form,
    FormGroup,
    Input,
    Label,
    Row,
    Alert,
    InputGroup, InputGroupAddon,
  } from 'reactstrap';
import createHistory from 'history/createBrowserHistory';
import Button from '@material-ui/core/Button';
import RequestHandle from '../../components/RequestHandle';
import swal from 'sweetalert';
import AuthService from '../../components/AuthService';
import Select from 'react-select';
import States from '../../components/States';

const Auth = new AuthService();

const Request = new RequestHandle();
const history = createHistory();

  
export default class add extends Component {
    constructor(props) {
        super(props);
        this.state = {
          collapse: true,
          fadeIn: true,
          timeout: 300,
          formdata:'',
          visible: false,
          alerttext:'',
          fname:'',
          lname:'',
          email:'',
          contact_no:'',
          payment_status:'',
          college:'',
          course:'',
          status:'',      
          password:'',
          new_password:'',
          conform_password:'',
          ChangePassword:false,
          editProfile:false,
          pin_code:"",
          website:"",
          description:"",
          industry:"",
          locations:"",
          state:null, 
        };
        this.onChange = this.onChange.bind(this); 
        this.handleSubmit = this.handleSubmit.bind(this);
        this.printData = this.printData.bind(this);
        this.getData = this.getData.bind(this);
        this.DeleteQuery = this.DeleteQuery.bind(this);
        this.formProfile = this.formProfile.bind(this);
        this.formProfileEdit = this.formProfileEdit.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.ChangePasswordformProfile = this.ChangePasswordformProfile.bind(this);
        this.handleSubmitProfile = this.handleSubmitProfile.bind(this);
        this.onChangeSelectState = this.onChangeSelectState.bind(this);

      }

      onChange(e){
        this.setState({[e.target.name]:e.target.value});
      }

      onChangeSelectState(state){
        this.setState({state});
      }

      componentDidMount = () => {
       
      //   if(this.props.history.location.state !==undefined){
      //     if(this.props.history.location.state.password){
      //     this.setState({
      //       ChangePassword : true});
      //   }
      // }
      if(Auth.getProfile().default_password){
        this.setState({
          ChangePassword: true
        });
      }

        Request.RequestHandle('employer/'+Auth.getProfile().id,'GET',null,this.getData); 
      }

      getData(result){
     
        if(result.status){
          var data = result.data.results[0];
        let state = {'label':data.state,'value':data.state}

          this.setState({
            name : data.name,
            email:data.email,
            contact_no:data.contact_no,
            address:data.address,
            city:data.city,
            state:state,
            hr_name:data.hr_name,
            hr_email:data.hr_email,
            hr_contact_no:data.hr_contact_no,
            pin_code:data.pin_code,
            website:data.website,
            status:data.status,
            description:data.description,
            industry:data.industry,
            locations:data.location,
          });
        }
      }

      deleteData(status) {

        swal({
          title: "Payment Status Change Confirmation",
          text: "Are you sure that you want to "+status+" this Student?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            this.setState({
              isLoadedData: true,  
            });
            this.DeleteQuery(status);
            this.setState({
              isLoadedData: false,  
            });
          } else {
          }
        });
      }

      DeleteQuery = (status) => {
        var that  = this;
        const statusData ={
          status:status}
        Request.RequestHandle('students/payment_status/'+this.props.match.params.id,'POST', JSON.stringify(statusData),function(result){
       
          if (result.status) {
          var btn = <div > <Button variant="contained" className="active_button" color="primary" size="small" onClick={() => { that.deleteData('not_paid') }} >paid</Button></div>
          if(status ==='not_paid'){
            btn = <div > <Button variant="contained" className="active_button" color="secondary" size="small" onClick={() => { that.deleteData('paid') }}  >not paid</Button></div>
          }
  
         
          that.setState({ payment_status:btn });
  
        }
        }); 
      }

      handleSubmitProfile() {
        const universityData ={
            name : this.state.name,
            email:this.state.email,
            contact_no:this.state.contact_no,
            website:this.state.website,
            address:this.state.address,
            state:this.state.state.value,
            city:this.state.city,
            pin_code:this.state.pin_code,
            hr_name:this.state.hr_name,
            hr_email:this.state.hr_email,
            hr_contact_no:this.state.hr_contact_no,
            status:this.state.status,
            description:this.state.description,
            industry:this.state.industry,
            locations:this.state.location,
          }

        
          var that = this;
        Request.RequestHandle('employer/'+Auth.getProfile().id,'POST', JSON.stringify(universityData),function(result) {
          if(result.status){
            that.setState({editProfile:false});
            swal("Success!", "Your information has been Updated.", "success");
          }else{
            swal("error!", result.msg, "error");
            
          }
        }); 
      }

      handleSubmit() {
        // event.preventDefault();
        const universityData ={
          password : this.state.password,
          new_password:this.state.new_password,
          conform_password:this.state.conform_password
          }
        
        Request.RequestHandle('employer/change_password/'+Auth.getProfile().id,'POST', JSON.stringify(universityData),this.printData); 
      }

      printData(Result){
    
        if(Result.status){
          this.setState({
          password : '',
          new_password:'',
          conform_password:'',
          ChangePassword:false
          })

            swal("Success!", "password successfully changed.", "success");
        }else{
            this.setState({alerttext:Result.msg,visible:true})
        }
       }
     
    // validation(){
    //     var x = true;
    //     if(this.state.name ==""){
    //         x= false;
    //     }
    //     if(this.state.email ==""){
    //         x= false;
    //     }
    //     if(this.state.contact_no ==""){
    //         x= false;
    //     }
    //     if(this.state.website ==""){
    //         x= false;
    //     }
    //     if(this.state.year ==""){
    //         x= false;
    //     }
    //     return x;
    // }

    resetForm(){
        this.setState({
          name:'',
          email:'',
          contact_no:'',
          website:'',
          address:'',
          state:'',
          city:'',
          pin_code:'',
          hr_name:'',
          hr_email:'',
          hr_contact_no:'',
          status:'',      
        })

    }

    formProfile(){
      return(
        <Form  ref={(el) => this.myFormRef = el}  encType="multipart/form-data" className="form-horizontal">
                
        <CardBody>
            <FormGroup row >
              <Col md="3">
                <Label htmlFor="text-input">Name:</Label>
              </Col>
              <Col xs="12" md="9">
                <p>{this.state.name}</p>
              </Col>
            </FormGroup>
            
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="email-input">Email:</Label>
              </Col>
              <Col xs="12" md="9">
              <p>{this.state.email}</p>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="email-input">Contact Number:</Label>
              </Col>
              <Col xs="12" md="9">
              <p>+91{this.state.contact_no}</p>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="email-input">Fax:</Label>
              </Col>
              <Col xs="12" md="9">
              <p>{this.state.fax}</p>
              </Col>
            </FormGroup>
            <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Nature of Business:</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <p>{this.state.description}</p>
                      </Col>
                    </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="email-input">Website:</Label>
              </Col>
              <Col xs="12" md="9">
              <p>{this.state.website}</p>
              </Col>
            </FormGroup>
           
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="email-input">Address:</Label>
              </Col>
              <Col xs="12" md="9">
              <p>{this.state.address}</p>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="email-input">City:</Label>
              </Col>
              <Col xs="12" md="9">
              <p>{this.state.city}</p>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="email-input">State:</Label>
              </Col>
              <Col xs="12" md="9">
              {this.state.state !== null &&
                <p>{this.state.state.value}</p>
              }
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="email-input">Pin Code:</Label>
              </Col>
              <Col xs="12" md="9">
              <p>{this.state.pin_code}</p>
              </Col>
            </FormGroup>
            <hr/>
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="email-input">SPOC Name:</Label>
              </Col>
              <Col xs="12" md="9">
              <p>{this.state.hr_name}</p>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="email-input">SPOC Contact Number:</Label>
              </Col>
              <Col xs="12" md="9">
              <p>+91{this.state.hr_contact_no}</p>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="email-input">SPOC Email:</Label>
              </Col>
              <Col xs="12" md="9">
              <p>{this.state.hr_email}</p>
              </Col>
            </FormGroup>
        
        </CardBody>
        <CardFooter>
              <Button type="button" variant="contained"   onClick={()=>{this.passwordChange()}}  >Change Password</Button>
              <Button type="button" variant="contained"  color="primary" className="left-margin rightbtn"   onClick={()=>{this.profileEditChange()}}  >Edit</Button>
        </CardFooter>
        </Form>
      )
    }

    formProfileEdit(){
      return(
        <Form  ref={(el) => this.myFormRef = el}  encType="multipart/form-data" className="form-horizontal">
                
        <CardBody>
            <FormGroup row >
              <Col md="3">
                <Label htmlFor="text-input">Name:</Label>
              </Col>
              <Col xs="12" md="9">
              <p>{this.state.name}</p>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="email-input">Email:</Label>
              </Col>
              <Col xs="12" md="9">
              <p>{this.state.email}</p>
     

              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="email-input">Website:</Label>
              </Col>
              <Col xs="12" md="9">
              <Input 
                type="text" 
                name="website" 
                value={this.state.website} 
                onChange ={this.onChange} 
                placeholder="Website"
                />               

              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="email-input">Contact Number:</Label>
              </Col>
              <Col xs="12" md="9">
              <InputGroup>
                <InputGroupAddon addonType="prepend" className="phone-number-code">+91</InputGroupAddon>
                <Input 
                type="text" 
                name="contact_no" 
                value={this.state.contact_no} 
                onChange ={this.onChange} 
                placeholder="Contact Number"
                />               
              </InputGroup>
              
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="email-input">Address:</Label>
              </Col>
              <Col xs="12" md="9">
              <Input 
                type="text" 
                name="address" 
                value={this.state.address} 
                onChange ={this.onChange} 
                placeholder="Address"
                />               

              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="email-input">City:</Label>
              </Col>
              <Col xs="12" md="9">
              <Input 
                type="text" 
                name="city" 
                value={this.state.city} 
                onChange ={this.onChange} 
                placeholder="City"
                />               

              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="email-input">State:</Label>
              </Col>
              <Col xs="12" md="9">
              <Select
                        value={this.state.state}
                        onChange={this.onChangeSelectState}
                        options={States}
                        placeholder={"Select"}
                        isSearchable
                      />       

              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="email-input">Pin Code:</Label>
              </Col>
              <Col xs="12" md="9">
              <Input 
                type="number" 
                name="pin_code" 
                value={this.state.pin_code} 
                onChange ={this.onChange} 
                placeholder="Pin Code"
                />               

              </Col>
            </FormGroup>
            <hr/>
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="email-input">Company Name:</Label>
              </Col>
              <Col xs="12" md="9">
              <Input 
                type="text" 
                name="hr_name" 
                value={this.state.hr_name} 
                onChange ={this.onChange} 
                placeholder="Company Name"
                />               

              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="email-input">Company Contact Number:</Label>
              </Col>
              <Col xs="12" md="9">
              <InputGroup>
                <InputGroupAddon addonType="prepend" className="phone-number-code">+91</InputGroupAddon>
                <Input 
                type="text" 
                name="hr_contact_no" 
                value={this.state.hr_contact_no} 
                onChange ={this.onChange} 
                placeholder="Company Contact Number"
                />               
              </InputGroup>
            
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="email-input">Company Email:</Label>
              </Col>
              <Col xs="12" md="9">
              <Input 
                type="text" 
                name="hr_email" 
                value={this.state.hr_email} 
                onChange ={this.onChange} 
                placeholder="Company Email"
                />               

              </Col>
            </FormGroup>
        
        </CardBody>
        <CardFooter>
              <Button type="button" variant="contained"   onClick={()=>{this.profileEditChange()}}  >Cancel</Button>
              <Button type="button" variant="contained" className="left-margin rightbtn"  color="secondary"  onClick={()=>{this.handleSubmitProfile()}}  >Update</Button>
        </CardFooter>
        </Form>
      )
    }


    ChangePasswordformProfile(){
      return(
        <Form  ref={(el) => this.myFormRef = el}  encType="multipart/form-data" className="form-horizontal">
                
        <CardBody>
           <Alert color="light" isOpen={this.state.visible} >
           {this.state.alerttext}
          </Alert>
            <FormGroup row >
              <Col md="3">
                <Label htmlFor="text-input">Old Password:</Label>
              </Col>
              <Col xs="12" md="9">                        
              <Input type="password" id="password" name="password" value={this.state.password} onChange ={this.onChange} placeholder="Password"/>
              </Col>
            </FormGroup>
            <FormGroup row >
              <Col md="3">
                <Label htmlFor="text-input">New Password:</Label>
              </Col>
              <Col xs="12" md="9">
              <Input type="password" id="new_password" name="new_password" value={this.state.new_password} onChange ={this.onChange} placeholder="New Password"/>              
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="email-input">Confirm Password:</Label>
              </Col>
              <Col xs="12" md="9">
              <Input type="password" id="conform_password" name="conform_password" value={this.state.conform_password} onChange ={this.onChange} placeholder="Confirm Password"/>              
              </Col>
            </FormGroup>
        </CardBody>
        <CardFooter>
              <Button type="button" variant="contained" color="primary" className="left-margin rightbtn" onClick={()=>{this.handleSubmit()}} >Save</Button>
              <Button type="button" variant="contained"   onClick={()=>{this.passwordChange()}}  >Cancel</Button>              
        </CardFooter>
        </Form>
      )
    }

    passwordChange(){
      this.setState({
        password : '',
        new_password:'',
        conform_password:''
        });

      this.setState({
        ChangePassword : !this.state.ChangePassword});
    }

    profileEditChange(){
      this.setState({
        editProfile : !this.state.editProfile});
    }

  render() {
    return (
        <div className="animated fadeIn">
        <div className="title-bar" id="title-cont">
                  Profile
              </div>
          <Row >
          <Col>
          <Card>
          {this.state.ChangePassword ? 
          this.ChangePasswordformProfile() 
          :
          <div>
          {this.state.editProfile ? this.formProfileEdit() : this.formProfile()}
          </div> 
          }
          
              </Card>
              </Col>
          </Row>
          <div>
        </div>
        </div>
    )
  }
}
