import React, { Component } from 'react'
import {
    Card,
    CardBody,
    CardFooter,
    CardSubtitle,
    Col, 
    Form,
    FormGroup,
    Label,
    Row,
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
          fname:'',
          lname:'',
          email:'',
          contact_no:'',
          payment_status:'',
          college:'',
          course:'',
          status:'active',      
        };
        this.onChange = this.onChange.bind(this); 
        this.handleSubmit = this.handleSubmit.bind(this);
        this.printData = this.printData.bind(this);
        this.getData = this.getData.bind(this);
        this.DeleteQuery = this.DeleteQuery.bind(this);

      }

      onChange(e){
        this.setState({[e.target.name]:e.target.value});
      }


      componentDidMount = () => {
        Request.RequestHandle('students/'+this.props.match.params.id,'GET',null,this.getData); 
      }

      getData(result){
        if(result.status){
          var data = result.data.results[0];
          var btn = <div > <Button variant="contained" className="active_button" color="primary" size="small" onClick={() => { this.deleteData('not_paid') }} >paid</Button></div>
          if(data.payment_status ==='not_paid'){
            btn = <div > <Button variant="contained" className="active_button" color="secondary" size="small" onClick={() => { this.deleteData('paid') }}  >Not Paid</Button></div>
          }

          var college = '';
          if(data.college_doc.length > 0){
            college = data.college_doc[0].name
          }

          var course = '';
          if(data.course_doc.length > 0){
            course = data.course_doc[0].name
          }

          this.setState({
            fname : data.fname,
            lname : data.lname,
            email:data.email,
            contact_no:data.contact_no,
            payment_status:btn,
            college:college,
            course:course,
            status:data.status,
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

      handleSubmit(event) {
        event.preventDefault();
        const universityData ={
            name : this.state.name,
            email:this.state.email,
            contact_no:this.state.contact_no,
            website:this.state.website,
            address:this.state.website,
            state:this.state.state,
            city:this.state.city,
            pin_code:this.state.pin_code,
            hr_name:this.state.hr_name,
            hr_email:this.state.hr_email,
            hr_contact_no:this.state.hr_contact_no,
            status:this.state.status,
          }
        
        Request.RequestHandle('employer','POST', JSON.stringify(universityData),this.printData); 
      }

      printData(Result){
       
        if(Result.status){
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
            status:'active',      
          })

            swal("Success!", "Your information has been submitted.", "success");
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
          status:'active',      
        })

    }

  render() {
    const {alerttext} = this.state;
    return (
        <div className="animated fadeIn">
        <div className="title-bar" id="title-cont">
                  Student Profile
              </div>
          <Row >
          <Col>
          <Card>
          
          <Form  ref={(el) => this.myFormRef = el} onSubmit={this.handleSubmit} encType="multipart/form-data" className="form-horizontal">
                
          <CardBody>
        <CardSubtitle className="student_title">Basic Details</CardSubtitle>
        <hr/>
            <FormGroup row >
              <Col md="2">
                <Label htmlFor="text-input">First Name:</Label>
              </Col>
              <Col xs="12" md="9">
                <p>{this.state.fname}</p>
              </Col>
            </FormGroup>
            <FormGroup row >
              <Col md="2">
                <Label htmlFor="text-input">Last Name:</Label>
              </Col>
              <Col xs="12" md="9">
              <p>{this.state.lname}</p>
              </Col>
            </FormGroup>
            <FormGroup row >
              <Col md="2">
                <Label htmlFor="text-input">Age:</Label>
              </Col>
              <Col xs="12" md="4">
              <p>22</p>
              </Col>
              <Col md="2">
                <Label htmlFor="text-input">Gender:</Label>
              </Col>
              <Col xs="12" md="4">
              <p>Male</p>
              </Col>
            </FormGroup>
            <FormGroup row >
              <Col md="2">
                <Label htmlFor="text-input">Current Address:</Label>
              </Col>
              <Col xs="12" md="4">
              <p>Kokuvil East,Kouvil,jaffna</p>
              </Col>
              <Col md="2">
                <Label htmlFor="text-input">Permanant Address:</Label>
              </Col>
              <Col xs="12" md="4">
              <p>Kokuvil East,Kouvil,jaffna</p>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="2">
                <Label htmlFor="email-input">E-Mail:</Label>
              </Col>
              <Col xs="12" md="4">
              <p>{this.state.email}</p>
              </Col>
              <Col md="2">
                <Label htmlFor="email-input">Phone Number:</Label>
              </Col>
              <Col xs="12" md="4">
              <p>{this.state.contact_no}</p>
              </Col>
            </FormGroup>
            <hr/>
        <CardSubtitle className="student_title">Education Details</CardSubtitle>
            <hr/>
            <FormGroup row>
              <Col md="2">
                <Label htmlFor="email-input">Grades:</Label>
              </Col>
              <Col xs="12" md="9">
              <p></p>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="2">
                <Label htmlFor="email-input">Projects:</Label>
              </Col>
              <Col xs="12" md="9">
              <p></p>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="2">
                <Label htmlFor="email-input">Course:</Label>
              </Col>
              <Col xs="12" md="9">
              <p>{this.state.course}</p>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="2">
                <Label htmlFor="email-input">College:</Label>
              </Col>
              <Col xs="12" md="9">
              <p>{this.state.college}</p>
              </Col>
            </FormGroup>
            {/* <FormGroup row>
              <Col md="2">
                <Label htmlFor="email-input">Payment Status:</Label>
              </Col>
              <Col xs="12" md="9">
              <p>{this.state.payment_status}</p>
              </Col>
            </FormGroup> */}
            <hr/>
        <CardSubtitle className="student_title" >Skillset</CardSubtitle>
        <hr/>
        </CardBody>
                <CardFooter>
                      <Button type="button" variant="contained"   onClick={()=>{history.goBack()}}  >Cancel</Button>
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
