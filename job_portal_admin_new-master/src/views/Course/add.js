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
import swal from 'sweetalert';
import Select from 'react-select';

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
          code:'',
          duration:'',
          marking_criteria:'percentage',
          academic_term:'yearly',
          description:'',      
          status:'active',  
          specialization:'', 
          selectedOption: null,
          selectedArry:[],
          spOptions:[],         
        };
        this.onChange = this.onChange.bind(this); 
        this.handleSubmit = this.handleSubmit.bind(this);
        this.printData = this.printData.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.changeSpecializations = this.changeSpecializations.bind(this);

      }

      onChange(e){
        this.setState({[e.target.name]:e.target.value});
      }

      handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        var selectOptions = [];
        selectedOption.map(item => { 
          selectOptions.push(item.value)
        })
        this.setState({ selectedArry:selectOptions });
      }

      changeSpecializations(inputValue){
        var that =this;
        Request.RequestHandle('specializations?search='+inputValue,'GET',null,function(result) {
          that.setState({universityOption:[]});              
          var spOptions =[];
              result.data.results.map(item => { 
                spOptions.push({
                  'label':item.name,
                  'value':item._id,
                  });
              });
              that.setState({spOptions});
          }); 
      }

      handleSubmit(event) {
        event.preventDefault();
        const universityData ={
            name : this.state.name,
            code:this.state.code,
            duration:this.state.duration,
            marking_criteria:this.state.marking_criteria,
            description:this.state.description,
            status:this.state.status,
            academic_term:this.state.academic_term,
            list:this.state.selectedArry,
          }

      
        Request.RequestHandle('course','POST', JSON.stringify(universityData),this.printData); 
      }

      printData(Result){
     
        if(Result.status){
            swal("Success!", "Your information has been submitted.", "success");
            window.location.assign("/#/course");

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
            code:'',
            duration:'',
            marking_criteria:'',
            academic_term:'',
            description:'',      
            status:'active',
        })

    }

  render() {
    const {alerttext} = this.state;
    const { selectedOption } = this.state;

    return (
        <div className="animated fadeIn">
        <div className="title-bar" id="title-cont">
                  Add Course
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
                        <Label htmlFor="text-input">Course Name:*</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="name" name="name" value={this.state.name} onChange ={this.onChange}  placeholder="Course Name"  />
                        <FormFeedback>Oh noes! that name is already taken</FormFeedback>

                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Course Code:*</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text"  id="code" name="code" value={this.state.code} onChange ={this.onChange} placeholder="Code" />
                        
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Course Duration(Month):*</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="number" id="duration" name="duration" value={this.state.duration} onChange ={this.onChange} placeholder="Duration" />
                       
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Marking Criteria:*</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="select" id="marking_criteria" name="marking_criteria" value={this.state.marking_criteria} onChange ={this.onChange} placeholder="Marking Criteria">
                        <option value="percentage">Percentage</option>
                        <option value="cgpa ">CGPA</option>
                        <option value="grades">Grades</option>
                        </Input>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Academic Term:*</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="select" id="academic_term" name="academic_term" value={this.state.academic_term} onChange ={this.onChange} placeholder="Marking Criteria">
                        <option value="yearly">Yearly</option>
                        <option value="semister">Semester</option>
                        <option value="trimly">Trimester</option>
                        </Input>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Specializations:</Label>
                      </Col>
                      <Col xs="12" md="9">
                      <Select
                        value={selectedOption}
                        onChange={this.handleChange}
                        onInputChange ={this.changeSpecializations}
                        options={this.state.spOptions}
                        placeholder={"Search and Select"}
                        isMulti
                        isSearchable
                      />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Description:</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="textarea" id="description" name="description" value={this.state.description} onChange ={this.onChange} placeholder="Description" />
                       
                      </Col>
  
                      <ColoredLine color="red" />

                    </FormGroup> 
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Status:</Label>
                      </Col>
                      <Col xs="12" md="9">
                      <Input type="select" id="status" name="status" value={this.state.status} onChange ={this.onChange} >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </Input>
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
