import React, { Component } from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  CardTitle,
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
import BaseApi from '../../components/BaseApi';
import AuthService from "../../components/AuthService";
import { array } from 'prop-types';

const Auth = new AuthService();
const Request = new RequestHandle();


export default class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
     initalInite:[],
     initalInterview:[],
    };
   
    this.InviteStudent = this.InviteStudent.bind(this);
    this.InterviewStudent = this.InterviewStudent.bind(this);
    this.StatusChange = this.StatusChange.bind(this);
    this.interviewStatusChange = this.interviewStatusChange.bind(this);
  }

 


  componentDidMount = () => {
    Request.RequestHandle('students/'+Auth.getProfile().id+"/vacancy",'GET',null,this.InviteStudent); 
    Request.RequestHandle('students/'+Auth.getProfile().id+"/interview",'GET',null,this.InterviewStudent); 
    // Request.RequestHandle('employer/suggestion/'+this.props.match.params.id,'GET',null,this.getSuggestion); 
    // Request.RequestHandle('employer/vacancy/'+this.props.match.params.id+'/invite','GET',null,this.getAccepted); 
  }

  InviteStudent(result){
    if(result.status){
      try {
        this.setState({initalInite:result.data.results})
      } catch (error) {
        
      }
    }
  }

  InterviewStudent(result){
    if(result.status){
      try {
        this.setState({initalInterview:result.data.results})
      } catch (error) {
        
      }
    }
  }

  StatusChange(status,id,key){
    let data = {
      accept:status
    }
    let that = this;
    Request.RequestHandle('students/vacancy/'+id+'/student/'+Auth.getProfile().id,'POST',JSON.stringify(data),function(result) {
      if(result.status){
        let initalInite = that.state.initalInite;
        delete initalInite[key];
        that.setState({initalInite});
      }
    });     
  }

  interviewStatusChange(status,id,key){

    let data = {
      accept:status
    }
    let that = this;
    Request.RequestHandle('students/vacancy/'+id+'/student/'+Auth.getProfile().id+'/interview','POST',JSON.stringify(data),function(result) {
      if(result.status){
        let initalInterview = that.state.initalInterview;
        delete initalInterview[key];
        that.setState({initalInterview});
      }
   
    });     
  }


  render() {
  
    return (
      <div>
           <Row>
          <Col xs="12" sm="6" lg="6">
            <Card >
              <CardBody className="pb-0">

             


              <div className="p1">
              <CardHeader className="h1-111">
              Invited Job
              </CardHeader>
              {this.state.initalInite.slice(0, 5).map((answer, i) => {
                return (
                  <div className="callout callout-info">
                          <Row>
                            <Col xs="12" sm="8" lg="8" className="list_point">
                            <strong className="h4">{answer.vacancy_doc[0].job_title}</strong>
                            <br/>
                            <small className="text-muted">closing date: {answer.vacancy_doc[0].closing_date}</small>
                            </Col>
                            <Col xs="12" sm="4" lg="4">
                            <div className="btn_div_a">
                            <Button 
                              className='invite_btn' 
                              variant="contained" 
                              size="small" 
                              color="primary"
                              onClick={() => {
                                    this.StatusChange("accept",answer.vacancy_doc[0]._id,i);
                                  }}
                              >
                              Request
                            </Button>
                            <Button  
                              className='invite_btn' 
                              variant="contained" 
                              size="small" 
                              color="secondary"
                              onClick={() => {
                                this.StatusChange("accept",answer.vacancy_doc[0]._id,i);
                                  }}
                              >
                              Reject
                            </Button>
                            </div>
                            </Col>
                          </Row>
                          <div className="chart-wrapper">
                          </div>
                  </div>
                )
              })}
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="6" lg="6">
          <Card >
              <CardBody className="pb-0">
              <div className="p1">
              <CardHeader className="h1-111">
              Invited Job
              </CardHeader>
              {this.state.initalInterview.slice(0, 5).map((answer, i) => {
                return (
                  <div className="callout callout-info">
                          <Row>
                            <Col xs="12" sm="8" lg="8" className="list_point">
                            <strong className="h4">{answer.vacancy_doc[0].job_title}</strong>
                            <br/>
                            <small className="text-muted">closing date: {answer.vacancy_doc[0].closing_date}</small>
                            </Col>
                            <Col xs="12" sm="4" lg="4">
                            <div className="btn_div_a">
                            <Button 
                              className='invite_btn' 
                              variant="contained" 
                              size="small" 
                              color="primary"
                              onClick={() => {
                                    this.interviewStatusChange("accept",answer.vacancy_doc[0]._id,i);
                                  }}
                              >
                              Request
                            </Button>
                            <Button  
                              className='invite_btn' 
                              variant="contained" 
                              size="small" 
                              color="secondary"
                              onClick={() => {
                                this.interviewStatusChange("accept",answer.vacancy_doc[0]._id,i);
                                  }}
                              >
                              Reject
                            </Button>
                            </div>
                            </Col>
                          </Row>
                          <div className="chart-wrapper">
                          </div>
                  </div>
                )
              })}
                </div>
              </CardBody>
            </Card>
          </Col>
          </Row>
      </div>
    )
  }
}
