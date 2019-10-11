import React, { Component } from 'react'
import {
    Card,
    CardBody,
    CardTitle,
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
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Table, Divider, Tag } from 'antd';
import "antd/dist/antd.css";
import "react-input-range/lib/css/index.css";
import "react-tabs/style/react-tabs.css";
import Moment from 'react-moment';


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
          job_title:'',
          number:'',
          description:'',
          closing_date:'', 
          specialization:'',     
          status:'active', 
          universityOption:[],
          selectedOption: [],
          selectedArry:[],
          spOptions:[], 
          tabIndex: 0,
          editInterview:false,
          date_from:'',
          venue:'',
          suggestionData:[],   
          suggestionPrintData:[],
          suggestionAcceptData:[],   
          suggestionAcceptPrintData:[],
          initilSuggestionAcceptData:[],
          interviewData:[],   
          interviewPrintData:[],
          interviewAcceptData:[],   
          interviewAcceptPrintData:[],
          open: false,
          fname:'',
          lname:'',
          email:'',
          gender:'',
          course:'',
          college:'',
          desired_educational_qualification:[],     
          job_location:'',   
          job_start_date:'',     
          desired_skills:'',     
          minimum_marks_required:'',
          studentDetails:[],
          filter_open:false ,
          searchUni:'',
          searchageFrom:'',     
          searchageTo:'',     
          searchMarks:'',     

          searchUniversity:[],
          universityFilter:[],

          searchCollege:[],
          collegeFilter:[],

          searchCourse:[],
          courseFilter:[],

          searchSpecializations:[],
          specializationsFilter:[],

          searchGender:'',
          value: { min: 20, max: 30 },

          graduated_year:'',
          min_overall_grade:'',
          openStatusModel:false,
          change_status:[],
          selected_status:'',
          selected_status_student_id:'',
          search_status:''

        };
       
        this.getData = this.getData.bind(this);
        
      }

    
      componentDidMount = () => {
        Request.RequestHandle('students/vacancy/'+this.props.match.params.id,'GET',null,this.getData); 
      }


     
      getData(result){

        if(result.status){
          // if(result.data.results.length === 0 || result.data.results[0].vacancy_doc ===undefined || result.data.results[0].vacancy_doc.length ===0){
          //   result.data.results[0].vacancy_doc[0];
          // }
          var data = result.data.results[0];

        //if(data.course_doc)
          this.setState({
            job_title:data.job_title,
            date_from:data.date_from,
            venue:data.venue,
            number:data.number,
            description:data.description,
            closing_date:data.closing_date,      
            status:data.status,  
            desired_educational_qualification:data.course_doc,    
            job_location:data.job_location,    
            job_start_date:data.job_start_date,    
            desired_skills:data.desired_skills,    
            minimum_marks_required:data.minimum_marks_required,
            selectedOption:data.spec_doc,
            minimum_percentage:data.minimum_percentage,
            minimum_cgpa:data.minimum_cgpa,
            minimum_grade:data.minimum_grade     
          });
        }
      }

     
  render() {
  
    return (
        <div className="animated fadeIn">
        <div className="title-bar" id="title-cont">
                  Vacancy
              </div>
          <Row >
          <Col>
          <Card>  
                <CardBody className="pb-0">
                <FormGroup row >
                      <Col md="3">
                        <Label htmlFor="text-input">Job Title:</Label>
                      </Col>
                      <Col xs="12" md="9">
                      <p>{this.state.job_title}</p>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">No. of Position:</Label>
                      </Col>
                      <Col xs="12" md="9">
                      <p>{this.state.number}</p>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Desired Education Qualification(s):</Label>
                      </Col>
                      <Col xs="12" md="9">
                      {this.state.desired_educational_qualification.map(ui =>{
                            return (<p>{ui.name}</p>)
                      })}
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Specializations:</Label>
                      </Col>
                      <Col xs="12" md="9">
                      <p>
                      {this.state.selectedOption.map((material,index) => { 
                        return material.name+', '
                      })
                      }
                      </p>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Application Start Date:</Label>
                      </Col>
                      <Col xs="12" md="9">
                      <Moment format="D MMM YYYY" withTitle>
                      {this.state.job_start_date}
                        </Moment>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Application Closing Date:</Label>
                      </Col>
                      <Col xs="12" md="9">
                      <Moment format="D MMM YYYY" withTitle>
                      {this.state.closing_date}
                      </Moment>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Locations:</Label>
                      </Col>
                      <Col xs="12" md="9">
                      <p>{this.state.job_location}</p>
                      </Col>
                    </FormGroup>
                    
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Minimum Marks:</Label>
                      </Col>
                      <Col xs="12" md="9">
                      <p>Percentage :-{this.state.minimum_percentage}</p>
                      <p>CGPA :-{this.state.minimum_cgpa}</p>
                      <p>Grade :-{this.state.minimum_grade}</p>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Description:</Label>
                      </Col>
                      <Col xs="12" md="9">
                      <p>{this.state.description}</p>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Status:</Label>
                      </Col>
                      <Col xs="12" md="9">
                      <p>{this.state.status}</p>
                      </Col>
                    </FormGroup>
                </CardBody>
               
              </Card>
              </Col>
          </Row>
          <div>
        </div>
        </div>
    )
  }
}
