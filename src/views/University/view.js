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
  const ColoredLine = ({ color }) => (
    <hr
        style={{ 
            color: color,
            backgroundColor: color,
            height: 5
        }}
    />
  );
  
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
          email:'',
          contact_no:'',
          website:'',
          description:'',      
          status:'',      
          year:'',      
        };
        this.onChange = this.onChange.bind(this); 
        this.handleSubmit = this.handleSubmit.bind(this);
        this.printData = this.printData.bind(this);
        this.getData = this.getData.bind(this);
        //this.onDismiss = this.onDismiss.bind(this);
      }

      componentDidMount = () => {
        Request.RequestHandle('university/'+this.props.match.params.id,'GET',null,this.getData); 
      }

      getData(result){
        console.log(result);
        if(result.status){
          var data = result.data.results[0];
          this.setState({
          name : data.name,
          email:data.email,
          contact_no:data.contact_no,
          website:data.website,
          description:data.description,
          status:data.status,
          year:data.year
          });
        }
      }

      onChange(e){
        this.setState({[e.target.name]:e.target.value});
      }

      handleSubmit(event) {
        event.preventDefault();
        const universityData ={
            name : this.state.name,
            email:this.state.email,
            contact_no:this.state.contact_no,
            website:this.state.website,
            description:this.state.description,
            status:this.state.status,
            year:this.state.year
          }
        
        console.log(universityData);
        Request.RequestHandle('university/'+this.props.match.params.id,'POST', JSON.stringify(universityData),this.printData); 
      }

      printData(Result){
        console.log('====================================');
        console.log(Result);
        console.log('====================================');
        if(Result.status){
            swal("Succses!", "Your information has been submitted.", "success");
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
            email:'',
            contact_no:'',
            website:'',
            description:'',
            status:'',
            year:''
        })

    }

    

  render() {
    const {alerttext} = this.state;
    return (
        <div className="animated fadeIn">
        <div className="title-bar" id="title-cont">
                  View University
              </div>
          <Row >
          <Col>
          <Card>
          
          <Form  ref={(el) => this.myFormRef = el} onSubmit={this.handleSubmit} encType="multipart/form-data" className="form-horizontal">
                
                <CardBody>
                   <Alert color="light" isOpen={this.state.visible} >
                   {alerttext}
                  </Alert>
                    <FormGroup row >
                      <Col md="3">
                        <Label htmlFor="text-input">University Name:</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="name" name="name" value={this.state.name} onChange ={this.onChange}  disabled />
                        <FormFeedback>Oh noes! that name is already taken</FormFeedback>

                      </Col>
                    </FormGroup>
                   
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">E-Mail:</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="email"  id="email" name="email" value={this.state.email} onChange ={this.onChange} autoComplete="email" disabled />
                        
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Phone Number:</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="contact_no" name="contact_no" value={this.state.contact_no} onChange ={this.onChange} autoComplete="email" disabled />
                       
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Web Site:</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="website" name="website" value={this.state.website} onChange ={this.onChange} disabled />
                       
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Status:</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="status" name="status" value={this.state.status} onChange ={this.onChange} disabled />               
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Year:</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="number" id="year" name="year" value={this.state.year} onChange ={this.onChange} disabled/>
                       
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Description:</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="description" name="description" value={this.state.description} onChange ={this.onChange} disabled />
                       
                      </Col>
  
                      <ColoredLine color="red" />

                    </FormGroup>       
                </CardBody>
                <CardFooter>
                      <Button type="button" variant="contained"  className="left-margin" onClick={()=>{history.goBack()}}  >Cancel</Button>
                
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
