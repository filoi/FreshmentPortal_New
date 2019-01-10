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
    FormFeedback
  } from 'reactstrap';
import createHistory from 'history/createBrowserHistory';
import Button from '@material-ui/core/Button';
import RequestHandle from '../../components/RequestHandle';
import swal from 'sweetalert'
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
          name:'',
          code:'',
          description:'',      
          status:'',       
        };
        this.onChange = this.onChange.bind(this); 
        this.handleSubmit = this.handleSubmit.bind(this);
        this.printData = this.printData.bind(this);
        //this.onDismiss = this.onDismiss.bind(this);
      }

      onChange(e){
        this.setState({[e.target.name]:e.target.value});
      }

      handleSubmit(event) {
        event.preventDefault();
        const universityData ={
            name : this.state.name,
            code:this.state.code,
            description:this.state.description,
            status:this.state.status,
          }
        
        console.log(universityData);
        Request.RequestHandle('specializations','POST', JSON.stringify(universityData),this.printData); 
      }

      printData(Result){
        console.log('====================================');
        console.log(Result);
        console.log('====================================');
        if(Result.status){
            swal("Succses!", "Your information has been submitted.", "success");
            window.location.assign("/#/specialization");
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
            name : '',
            code:'',
            description:'',
            status:'',
        })

    }

  render() {
    const {alerttext} = this.state;
    return (
        <div className="animated fadeIn">
        <div className="title-bar" id="title-cont">
                  Add Specialization
              </div>
          <Row >
          <Col>
          <Card>
          
          <Form  ref={(el) => this.myFormRef = el} onSubmit={this.handleSubmit} encType="multipart/form-data" className="form-horizontal">
                
                <CardBody>
                  <Alert className="alert alert-danger" isOpen={this.state.visible} >
                   {alerttext}
                  </Alert>
                    <FormGroup row >
                      <Col md="3">
                        <Label htmlFor="text-input">Specialization Name:</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="name" name="name" value={this.state.name} onChange ={this.onChange}  placeholder="Specialization Name"  />
                        <FormFeedback>Oh noes! that name is already taken</FormFeedback>

                      </Col>
                    </FormGroup>
                   
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Code:</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text"  id="email" name="code" value={this.state.code} onChange ={this.onChange} placeholder="Code" autoComplete="email"/>
                        
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Description:</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="description" name="description" value={this.state.description} onChange ={this.onChange} placeholder="Description" autoComplete="email"/>
                       
                      </Col>
                    </FormGroup>
                       
                </CardBody>
                <CardFooter>
                      <Button type="reset" variant="contained" color="secondary" className="left-margin" onClick={()=>{this.resetForm()}}  >Reset</Button>
                      <Button type="submit" variant="contained" color="primary" className="left-margin rightbtn"  >Save</Button>
                      <Button type="button" variant="contained"  className="left-margin rightbtn" onClick={()=>{history.goBack()}}  >Cancel</Button>
  
                </CardFooter>
                </Form>
              </Card>
              </Col>
          </Row>
          <div>
        </div>
        </div>
    )
  }
}
