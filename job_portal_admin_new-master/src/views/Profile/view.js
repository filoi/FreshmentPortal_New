import React, { Component } from "react";
import {Card,CardBody,CardFooter,CardTitle,CardText,Col,Form,FormGroup,Input,Label,Row,Alert,ListGroup, ListGroupItem} from "reactstrap";
import Button from "@material-ui/core/Button";
import RequestHandle from "../../components/RequestHandle";
import swal from "sweetalert";
import AuthService from "../../components/AuthService";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ReactPlayer from 'react-player'
import { Line } from 'rc-progress';
import Modal from 'react-responsive-modal';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import BaseApi from '../../components/BaseApi';
import Question from './Question'
import Timer from 'react-compound-timer'
import IconButton from '@material-ui/core/IconButton';
import FileIcon from '@material-ui/icons/Assignment';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconAdd from 'material-ui/svg-icons/content/add';
import Moment from 'react-moment';
import States from '../../components/States';
import Select from 'react-select';
import { log } from "core-js";
import DownloadLink from "react-download-link";

const Auth = new AuthService();

const Request = new RequestHandle();

export default class add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numChar: 0,
      collapse: true,
      fadeIn: true,
      timeout: 300,
      formdata: "",
      downloadUrl:"",
      visible: false,
      alerttext: "",
      fname: "",
      lname: "",
      email: "",
      contact_no: "",
      payment_status: "",
      college: "",
      course: "",
      age:null,
      attachment:'',
      gender:"male",
      project:"",
      grades:[],
      status: "",
      password: "",
      specific_acadamic_achivement: "",
      video: "",
      written_introduction_answer: "",
      written_introduction_question: "",
      writen_introduction:"",
      written_test_result: "",
      academic_from: "",
      academic_to: "",
      new_password: "",
      conform_password: "",
      ChangePassword: false,
      tabIndex: 0,
      edit_profile:false,
      is_submitted:false,
      percentage:0,
      open: false,
      open_video_model:false,
      open_question_model:false,
      selectedFile: null,
      markSheet:null,
      loaded: 0,
      defult_permanant_address:"",
      defult_p_state:'',
      defult_p_city:'',
      defult_p_pin_code:'',
      permanant_address:"",
      p_state:{},
      p_city:'',
      p_pin_code:'',
      current_address:"",
      c_state:{},
      c_city:'',
      c_pin_code:'',
      checked:false,
      specialization:'',
      internship_details:'',
      employer:'',
      project_summary:'',
      internship_duration:'',
      overall_grade:'',
      minor_spc:'',
      major_spc:'',
      visibleTest:false,
      alerttextTest:'',
      fileprogress:0,
      intern_employer:'',
      intern_duration:'',
      intern_details:'',
      project_summary:'',
      intern_id:'',
      internship:[],
      loader:false,
      course_grade:"",
      quiz: {
        "title": "Elementary Math Quiz",
        "questions": [
          {
            "question": "In the past people were buried with the items they would need in the afterlife, what would you want buried with you so you could use it in the afterlife?",
            "answers": [
              {
                "point": 1,
                "label": "20"
              },
              {
                "point": 0,
                "label": "10"
              },
              {
                "point": 0,
                "label": "30"
              },
              {
                "point": 0,
                "label": "25"
              }
            ]
          },
          {
            "question": "2 + 4 x 10 =",
            "answers": [
              {
                "point": 0,
                "label": "60"
              },
              {
                "point": 1,
                "label": "42"
              },
              {
                "point": 0,
                "label": "40"
              },
              {
                "point": 0,
                "label": "20"
              }
            ]
          }
        ]
      },
      questions:[
                  {
                    _id:"12345",
                    question:"Which international organisation has recently called for a total ban on nuclear weapons?",
                    answer1:"international",
                    answer2:"international2",
                    answer3:"international3",
                    answer4:"international",
                    check_answer1:false,
                    check_answer2:false,
                    check_answer3:false,
                    check_answer4:false
                  },
                
                ],
      index: 0,
      answers: [],
      time_out:false,
      open_intern_model:false,
      intern_edit:false,
      imagePreviewUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCKb1XnU6gPufsz5DpyfCd7u2fbc-ZnRWZKPHfm899c4ouARWQ",
      file:""
    };
    this.onChange = this.onChange.bind(this);
    this.textCounter = this.textCounter.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.printData = this.printData.bind(this);
    this.getData = this.getData.bind(this);
    this.DeleteQuery = this.DeleteQuery.bind(this);
    this.formProfile = this.formProfile.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.ChangePasswordformProfile = this.ChangePasswordformProfile.bind(this);
    this.tagSelect = this.tagSelect.bind(this);
    this.enrolledDetails = this.enrolledDetails.bind(this);
    this.basicDetails = this.basicDetails.bind(this);
    this.educationDetails = this.educationDetails.bind(this);
    this.skillSet = this.skillSet.bind(this);
    this.saveProfile = this.saveProfile.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.onOpenModal = this.onOpenModal.bind(this);
    this.printProfile = this.printProfile.bind(this);
    this.onChangeGrades = this.onChangeGrades.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
    this.onOpenVideoModal = this.onOpenVideoModal.bind(this);
    this.onOpenWrittenQuestionModal = this.onOpenWrittenQuestionModal.bind(this);
    this.fileAttagment = this.fileAttagment.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.submitProfile = this.submitProfile.bind(this);
    this.handleSubmitQuize = this.handleSubmitQuize.bind(this);
    this.QuestionPaper = this.QuestionPaper.bind(this);
    this.timeOut = this.timeOut.bind(this);
    this.attachmentUpdate = this.attachmentUpdate.bind(this);
    this.gradeUpdate = this.gradeUpdate.bind(this);
    this.internUpload = this.internUpload.bind(this);
    this.editData = this.editData.bind(this);
    // this.editData = this.editData.bind(this);
    this.onChangeSelectCState = this.onChangeSelectCState.bind(this);
    this.onChangeSelectPState = this.onChangeSelectPState.bind(this);
    this.submitQuize = this.submitQuize.bind(this);

  }

 


  onChangeSelectCState(c_state){
    this.setState({c_state});
  }

  onChangeSelectPState(p_state){
    this.setState({p_state});
  }

  handleSubmitQuize() {
  
    if (this.state.index < this.state.questions.length-1) {
      this.setState({'index': this.state.index + 1})
    } 
    
    if(this.state.index === this.state.questions.length-1) {
      this.submitQuize()
    }
  }

  handlePreviewQuize(){
    if (this.state.index > 0) {
      this.setState({'index': this.state.index -1})
    } else {
      
    }
  }

  submitQuize(){
    const that = this;
    var list = [];
    this.state.questions.map(val =>{
    var currect_ans = ""
      if(val.check_answer1){
        currect_ans = currect_ans+val.answer1+"&&"
      }
      if(val.check_answer2){
        currect_ans = currect_ans+val.answer2+"&&"
      }
      if(val.check_answer3){
        currect_ans = currect_ans+val.answer3+"&&"
      }
      if(val.check_answer4){
        currect_ans = currect_ans+val.answer4+"&&"
      }
      if(val.check_answer5){
        currect_ans = currect_ans+val.answer5+"&&"
      }
      if(val.check_answer6){
        currect_ans = currect_ans+val.answer6+"&&"
      }

      list.push({id:val._id,ans:currect_ans})
    })
  
    const quesData = {
      list:list,
      stu_id:Auth.getProfile().id
    }

   Request.RequestHandle('question/exam/marks','POST', JSON.stringify(quesData),function(result) {
 
    if (result.status) {
      that.onCloseModal();
      that.printProfile();
      that.setState({index: 0});
      if (that.state.time_out) {
    swal("Time Out!", "This test will save and submit automatically.", "success");
        
      }else{
    swal("Success!", "This test will save and submit", "success");
      }
    } else {
      swal("Error!", result.msg, "error");
    } 
   }); 
    

  }

  handleAnswerSelected(event) {
    let split = event.target.name.split("-");
    let name = split[1];
    let index_id = split[0];
    let answer = true;
    if (event.target.value === "true") {
      answer = false;
    }

    let question = this.state.questions
    switch(name) {
      case "check_answer1":
        question[index_id].check_answer1 = answer; 
        break;
      case "check_answer2":
        question[index_id].check_answer2 = answer;         
        break;
      case "check_answer3":
        question[index_id].check_answer3 = answer;         
        break;
      case "check_answer4":
        question[index_id].check_answer4 = answer;         
        break;
      case "check_answer5":
        question[index_id].check_answer5 = answer;         
        break;
        case "check_answer6":
        question[index_id].check_answer6 = answer;         
        break;
      default:
        // code block
    }

    this.setState({questions:question})
   
  }

  timeOut(){
    this.submitQuize();
    this.setState({time_out:true});

  }

  QuestionPaper() {
    const {
      quiz, index, answers,time_out,questions
    } = this.state

    let completed = (questions && (index === questions.length)) ? false : false
    let lastIndex = (questions && (index === questions.length-1)) ? true : false
    let timer_count = (time_out) ? false : false
    let numberOfQuestions = questions ? questions.length : 0
    let score = 0
    if (completed) {
      this.state.answers.map((answer, i) => (
        score = score + this.state.quiz.questions[i].answers[answer].point
      ))
    }

    return (
      <Row>
      <Col>
        <Card>
        <CardBody  style={{paddingBottom: "0px"}}>
        <CardTitle>Written Exam</CardTitle>
        {completed ?
          <div>
            <p>Congratulation, you finished the quiz</p>
            Your score is {score}
          </div>
        :
        <div>
        {timer_count ?
            <div>
            <p>this test will save and submit automatically when the time expires or</p><a href onClick="">try again</a>
          </div>
            :
          <div>
          <div className="exam-heading">
          <div className="exam-timer">
          <Timer
              initialTime={1800000}
              direction="backward"
              checkpoints={[
                  {
                      time:0,
                      callback: () =>{this.timeOut()},
                  },
                  {
                      time: 60000 * 60 * 48 - 5000,
                      callback: () => console.log('Checkpoint B'),
                  }
              ]}
          >
              <Timer.Hours />: 
              <Timer.Minutes />:
              <Timer.Seconds /> 
          </Timer>
          </div>
          <div className="exam-title">Question {index + 1} of {numberOfQuestions}</div>          
          </div>
          {questions && index < numberOfQuestions ?
            <Question
              question={questions[index]}
              index={index}
              lastIndex={lastIndex}
              onAnswerSelected={(event) => this.handleAnswerSelected(event)}
              onSubmit={() => this.handleSubmitQuize()}
              onPreview={() => this.handlePreviewQuize()}
            />
          : ''}
          </div>
          }
        </div>
        }
        </CardBody>
        </Card>
      </Col>
    </Row>
    )
  }


  submitProfile(){
    let that = this;
    swal({
      title: "Submit Confirmation",
      text: "Are you sure that you want to Submit Your Profile?",
      icon: "success",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      Request.RequestHandle('students/submit/'+Auth.getProfile().id,'POST', null,function(result){
   
        if(result.status){
          that.printProfile();
          // that.setState({is_submitted:true})
      swal("Success!", "Your profile has been submitted.", "success");
        }else{
  
        }
      }); 


    });


    
  }

  handleCheck(){
    this.setState({checked: !this.state.checked});   

    if(!this.state.checked){
      this.setState({permanant_address:this.state.current_address});
      this.setState({p_state:this.state.c_state});
      this.setState({p_city:this.state.c_city});
      this.setState({p_pin_code:this.state.c_pin_code});
    }else{   
      this.setState({permanant_address:""});
      this.setState({p_state:{label:"select",value:''}});
      this.setState({p_city:""});
      this.setState({p_pin_code:""});
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }


  textCounter(e){
    this.setState({numChar: e.target.value.length});
  }

  handleChange1(ev) {
    console.log(this.state.c_pin_code)
    const re = /^[0-9\b]+$/;
      if (ev.target.value === '' || re.test(ev.target.value)) {
      console.log(re.test(ev.target.value));
      this.setState({c_pin_code: ev.target.value})
   }
   else{
    this.setState({c_pin_code:''})
   }
  }

  handleChange2(ev) {
    console.log(this.state.p_pin_code)
    const re = /^[0-9\b]+$/;
      if (ev.target.value === '' || re.test(ev.target.value)) {
      console.log(re.test(ev.target.value));
      this.setState({c_pin_code: ev.target.value})
   }
   else{
    this.setState({p_pin_code:''})
   }
  }


  onChangeGrades(id,e){
    var grades = this.state.update_grades;
    this.setState({ [e.target.name]: e.target.value });
    grades.map((material,index) => { 
      if(material.id === id){
        grades[index] = {id:id,grades:e.target.value}
      }
    });
   this.setState({update_grades:grades });
  }

  handleselectedFile = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })
  }

  fileAttagment = event => {
    this.setState({
      markSheet: event.target.files[0],
    })
  }

  onOpenModal = () => {
    var that = this;
    var question = [];
    Request.RequestHandle('question','GET', null,function(result){
    // Window.alert(result);
    console.log('====================================');
    console.log(result);
    console.log('====================================');
      if(result.status){
        result.data.results.map(value =>{
        

          if(value !== null){
            var answer = [];
            var i =0;
            var answersList = value.ans.split("&&");
            for (let ind = 0; ind < 6; ind++) {
               answer[ind] = "";
              
            }
            for (let index = 0; index < answersList.length; index++) {
              answer[i++] = answersList[index];
              
            }
           
            question.push({
              _id:value._id,
              question:value.question,
              answer1:answer[0],
              answer2:answer[1],
              answer3:answer[2],
              answer4:answer[3],
              answer5:answer[4],
              answer6:answer[5],
              check_answer1:false,
              check_answer2:false,
              check_answer3:false,
              check_answer4:false,
              check_answer5:false,
              check_answer6:false
            })
          }
        })
          
        that.setState({ open: true,questions:question});
      }else{
        swal("Error!", result.msg, "error");
      }
    }); 

  };


  onOpenVideoModal = () => {
    var that = this;
    that.setState({ open_video_model: true}); 

  };

  onOpenWrittenQuestionModal=()=>{
    var that = this;
    if(this.state.written_introduction_question === "" || this.state.written_introduction_question === undefined || this.state.written_introduction_question === null)
  {
    Request.RequestHandle('written_question/students/exam','GET',null,function(result){
        if(result.status){
          console.log(result);
          if(!result.element || result.element.length === 0 || result.element[0].question === undefined){
            swal("Not Found!", "please try again at another time", "error");
          }else{
            that.setState({ written_introduction_question:result.element[0].question,open_question_model: true}); 
          }
        }
    })
  }else{
    that.setState({ open_question_model: true}); 
  }
  };

 
  onCloseModal = () => {
    this.setState({ 
            open: false,
            open_intern_model:false,
            intern_employer:'',
            intern_duration:'',
            intern_details:'',
            project_summary:'',
            open_question_model:false
    });
    this.setState({ open_video_model: false,fileprogress:0 });
  };

  componentDidMount = () => {
    
    // if (this.props.history.location.state !== undefined) {
    //   if (this.props.history.location.state.password) {
    //     this.setState({
    //       ChangePassword: true
    //     });
    //   }
    // }

    if(Auth.getProfile().default_password){
      this.setState({
        ChangePassword: true
      });
    }
    this.printProfile();
   
  };


  printProfile(){
  
    var that = this;
    Request.RequestHandle(
      "students/" + Auth.getProfile().id,
      "GET",
      null,
      that.getData
    );
  }

  getData(result) {
  console.log(result);
    if (result.status) {
      var data = result.data.results[0];
  
      var btn = "Paid";
      if (data.payment_status === "not_paid") {
        btn = "Not Paid";
      }

      var college = "";
      if (data.college_doc.length > 0) {
        college = data.college_doc[0].name;
      }

      var course = "";
      var course_grade = "";
      if (data.course_doc.length > 0) {
        course = data.course_doc[0].name;
        course_grade = data.course_doc[0].marking_criteria;
      }

      //var image = "";
      if (data.image !==undefined && data.image !==null && data.image !=="") {
       // image = data.image;
        this.setState({imagePreviewUrl:BaseApi.download_url+data.image});
      }

      var major = "";
      if (data.major_doc.length > 0) {
        major = data.major_doc[0].name;
      }

      var minor = "";
      if (data.minor_doc.length > 0) {
        minor = data.minor_doc[0].name;
      }
      var grades = []
      var inital_grades = data.grade_doc;
     

      if(inital_grades.length !== 0 ){
        
        inital_grades.sort(function(a, b){return a.period_number - b.period_number});

      }

      data.grade_doc.map((material,index) => { 
        grades.push({id:material._id,grades:material.grades});
      });

      let c_state = {label:data.c_state,value:data.c_state};
      let p_state = {label:data.p_state,value:data.p_state};

      if(result.data.percentage === 85){
        this.setState({percentage:100});
      }
     else{
      this.setState({percentage:result.data.percentage});
     }
     

      this.setState({
        fname: data.fname,
        lname: data.lname,
        email: data.email,
        contact_no: data.contact_no,
        age: data.age,
        is_submitted:data.is_submited,
        defult_permanant_address:data.permanant_address,
        defult_p_state:data.p_state,
        defult_p_city:data.p_city,
        defult_p_pin_code:data.p_pin_code,
        permanant_address:data.permanant_address,
        p_state:p_state,
        p_city:data.p_city,
        p_pin_code:data.p_pin_code,
        current_address:data.current_address,
        c_state:c_state,
        c_city:data.c_city,
        c_pin_code:data.c_pin_code,
        gender:data.gender,
        project:data.project,
        specific_acadamic_achivement: data.specific_acadamic_achivement,
        video: data.video,
        written_introduction_answer: data.written_answer,
        written_introduction_question: data.written_question,
        writen_introduction: data.writen_introduction,
        written_test_result: data.written_test_result,
        academic_from: data.academic_from,
        academic_to: data.academic_to,
        payment_status: btn,
        college: college,
        course: course,
        grades:inital_grades,
        course_grade:course_grade,
        update_grades: grades,
        status: data.status,
        
        attachment:data.attachment,
        specialization:data.specialization,
        internship_details:data.internship_details,
        employer:data.employer,
        internship_duration:data.internship_duration,
        overall_grade:data.overall_grade,
        minor_spc:minor,
        major_spc:major,
        internship:data.internship_doc
      });     
    }
  }


  saveProfile(){
    const studentData ={
      fname : this.state.fname,
      lname:this.state.lname,
      contact_no:this.state.contact_no,
      age:this.state.age,
      current_address:this.state.current_address,
      c_state:this.state.c_state.value,
      c_city:this.state.c_city,
      c_pin_code:this.state.c_pin_code,
      p_state:this.state.p_state.value,
      p_city:this.state.p_city,
      p_pin_code:this.state.p_pin_code,
      permanant_address:this.state.permanant_address,
      gender:this.state.gender,
      project:this.state.project,
      academic_from:this.state.academic_from,
      academic_to:this.state.academic_to,
      internship_details:this.state.internship_details,
      employer:this.state.employer,
      project_summary:this.state.project_summary,
      internship_duration:this.state.internship_duration,
      overall_grade:this.state.overall_grade,
      writen_introduction:this.state.writen_introduction
    }
   
    var that = this;
    let success = true;
    let msg = "";

    this.setState({loader:true});
    Request.RequestHandle('students/'+ Auth.getProfile().id,'POST', JSON.stringify(studentData),function(result){
      if(result.status){
        that.profileUpdate();
      }else{
        that.setState({loader:false});
        swal("Error!", result.msg, "error");
      }
    }); 
  }

  profileUpdate(){
    var that = this;
    if(this.state.file === null || this.state.file ==="" || this.state.file ===undefined){
      if(this.state.tabIndex === 0){
        that.setState({loader:false});
        swal("Success!", "Your Profile has been Updated.", "success");
        that.setState({edit_profile:false});
        that.printProfile();
      }else if(that.state.tabIndex === 1){
        that.attachmentUpdate();
      }
    }else{
      const file = new FormData()
      file.append('image', this.state.file);
      Request.UploadRequestHandle('students/profile/'+ Auth.getProfile().id,'POST',file,function(result){
       
        if(result.status){
          if(that.state.tabIndex === 0){
            that.setState({loader:false});
            swal("Success!", "Your profile has been Updated.", "success");
            that.setState({edit_profile:false});
            that.printProfile();
          }else if(that.state.tabIndex === 1){
            that.attachmentUpdate();
          }
        }else{
        that.setState({loader:false});
          swal("Error!", result.msg, "error");       
        }
      }); 
    }
  }

  attachmentUpdate(){
    var that = this;
    if(this.state.markSheet === null || this.state.markSheet ==="" || this.state.markSheet ===undefined){
      that.gradeUpdate();
    }else{
      const markSheet = new FormData()
      markSheet.append('attachment', this.state.markSheet);
      Request.UploadRequestHandle('students/attachment/'+ Auth.getProfile().id,'POST',markSheet,function(result){
        if(result.status){
          that.gradeUpdate();
        }else{
        that.setState({loader:false});
          swal("Error!", result.msg, "error");       
        }
      }); 
    }
  }

  gradeUpdate(){
    var that = this;
    const list ={
      list:this.state.update_grades
    }
    Request.RequestHandle('grade/update','POST', JSON.stringify(list),function(result){
     
      if(result.status){
        that.setState({loader:false});
        swal("Success!", "Your profile has been Updated.", "success");
        that.setState({edit_profile:false,tabIndex:0});
        that.printProfile();
      }else{
        that.setState({loader:false});
        swal("Error!", result.msg, "error");       
      }
    }); 
  }


  internUpload(){
    var that = this;
    const list ={
      employer:this.state.intern_employer,
      internship_details:this.state.intern_details,
      internship_duration:this.state.intern_duration,
      project_summary:this.state.project_summary,
      student_id:Auth.getProfile().id
    }
 
    if(this.state.intern_edit){
      Request.RequestHandle('internship/'+that.state.intern_id,'POST', JSON.stringify(list),function(result){
        if(result.status){
          that.setState({
            open_intern_model:false,
            intern_edit:false,
            intern_employer:'',
            intern_duration:'',
            intern_details:'',
            project_summary:'',
          });
          swal("Success!", "Your internship details has been updated.", "success");
          that.printProfile();
        }else{
          swal("Error!", result.msg, "error");      
        }
      }); 
    }else{
      Request.RequestHandle('internship','POST', JSON.stringify(list),function(result){
        if(result.status){
          that.setState({
            open_intern_model:false,
            intern_employer:'',
            intern_duration:'',
            intern_details:'',
            project_summary:'',
          });
          swal("Success!", "Your internship details  has been added.", "success");
          that.printProfile();
        }else{
          swal("Error!", result.msg, "error");      
        }
      }); 
    }
  
  }


  deleteData(material) {
    swal({
      title: "Delete",
      text: "Are you sure that you want to delete this ?",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        this.setState({
          isLoadedData: true
        });
        this.DeleteQuery(material);
        this.setState({
          isLoadedData: false
        });
      } else {
      }
    });
  }

  DeleteQuery = material => {
    var that = this;
    Request.RequestHandle(
      "internship/"+material._id,
      "DELETE",
        null,
      function(result) {
        if (result.status) {
          that.printProfile();
        }
      }
    );
  };

  handleSubmit(event) {
    event.preventDefault();
    const universityData = {
      password: this.state.password,
      new_password: this.state.new_password,
      conform_password: this.state.conform_password
    };

    Request.RequestHandle(
      "students/change_password/" + Auth.getProfile().id,
      "POST",
      JSON.stringify(universityData),
      this.printData
    );
  }

  printData(Result) {
    if (Result.status) {
      this.setState({
        password: "",
        new_password: "",
        conform_password: "",
        ChangePassword:false
      });

      swal("Success!", "password successfully changed.", "success");
    } else {
      this.setState({ alerttext: Result.msg, visible: true });
    }
  }

  resetForm() {
    this.setState({
      name: "",
      email: "",
      contact_no: "",
      website: "",
      address: "",
      state: "",
      city: "",
      pin_code: "",
      hr_name: "",
      hr_email: "",
      hr_contact_no: "",
      status: ""
    });
  }

  tagSelect(tagSelect) {
    this.setState({ tabIndex: tagSelect });
    if (tagSelect === 1) {
      this.setState({ footerButton: false });
    } else {
      this.setState({ footerButton: true });
    }
  }

  handleChangeFile(e){

    let reader = new FileReader();
    let file = e.target.files[0];
    let filesize = ((file.size/1024)/1024).toFixed(4);

    if(file !== undefined && (file.type === "image/jpeg" || file.type === "image/jpg" || file.type !== "image/png" ) && filesize < 6 ){
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }
    reader.readAsDataURL(file)
    }   

  }

  enrolledDetails(){
    return (
      <div>
        <div className="profile-cover">

        {this.state.edit_profile === true ?
          <div class="profile-pic">
          <img className="profile-img" src={this.state.imagePreviewUrl}/>    
          <div class="edit"><a href className="a-input-file" ><i class="fa fa-camera fa-lg"></i></a><input type='file' onChange={ (e) => this.handleChangeFile(e) } /></div>
	      </div>
          :
          <img className="profile-img" src={this.state.imagePreviewUrl}/>    

        }

        

            <div className="profile-name">
              {this.state.fname} {this.state.lname}
              <div> 
                <span>{this.state.email} | </span> 
                <span>{"+91-" + this.state.contact_no}</span>
              </div>
              <div> 
                <span>{this.state.course} @ </span> 
                <span>{this.state.college}</span>
              </div>
            </div>
        </div>
      </div>
    );
  }

  

  basicDetails() {
    return (
      <div>
        <FormGroup row>
          <Col>
            <p className="qution" className="sec-title">Personal Info</p>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="2">
            <Label htmlFor="text-input">Date of Birth:</Label>
          </Col>
          <Col xs="12" md="4">
          {this.state.age !=="" && this.state.age !==undefined && this.state.age !==null &&
          <Moment format="D MMM YYYY" withTitle>
          {this.state.age}
            </Moment>
          }
          
          </Col>
          <Col md="2">
            <Label htmlFor="text-input">Gender:</Label>
          </Col>
          <Col xs="12" md="4">
            <p>{this.state.gender}</p>
          </Col>
        </FormGroup>
        
        <FormGroup row>
          <Col>
            <p  className="qution sec-title">Current Address</p>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="2">
            <Label htmlFor="text-input">Address:</Label>
          </Col>
          <Col xs="12" md="4">
            <p>{this.state.current_address}</p>
          </Col>
          <Col md="2">
            <Label htmlFor="text-input">State:</Label>
          </Col>
          <Col xs="12" md="4">
          <p>{this.state.c_state.value}</p>
         
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="2">
            <Label htmlFor="text-input">City:</Label>
          </Col>
          <Col xs="12" md="4">
            <p>{this.state.c_city}</p>
          </Col>
          <Col md="2">
            <Label htmlFor="text-input">Pin Code:</Label>
          </Col>
          <Col xs="12" md="4">
            <p>{this.state.c_pin_code}</p>
          </Col>
        </FormGroup>
      
      
        <FormGroup row>
          <Col>
            <p className="qution sec-title" >Permanant Address</p>
          </Col>
          
        </FormGroup>
        <FormGroup row>
          <Col md="2">
            <Label htmlFor="text-input">Address:</Label>
          </Col>
          <Col xs="12" md="4">
            <p>{this.state.permanant_address}</p>
          </Col>
          <Col md="2">
            <Label htmlFor="text-input">State:</Label>
          </Col>
          <Col xs="12" md="4">
          <p>{this.state.p_state.value}</p>
         
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="2">
            <Label htmlFor="text-input">City:</Label>
          </Col>
          <Col xs="12" md="4">
            <p>{this.state.p_city}</p>
          </Col>
          <Col md="2">
            <Label htmlFor="text-input">Pin Code:</Label>
          </Col>
          <Col xs="12" md="4">
            <p>{this.state.p_pin_code}</p>
          </Col>
        </FormGroup>
     
      </div>
    );
  }

  educationDetails() {
const attachment = this.state.attachment;
let selectAttage ="";
if(attachment === undefined || attachment=== null || attachment ===""){
  selectAttage ="";
}else{
  selectAttage=<a href={BaseApi.download_url+this.state.attachment} target="_blank"><img src="https://freeiconshop.com/wp-content/uploads/edd/download-flat.png" width={30} title="Click to view the Mark Sheet" /></a>;
}

  
    return (
      <div>
         <FormGroup row>
          <Col>
          <p className="qution" className="sec-title">Education</p>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="3">
            <Label htmlFor="email-input">College:</Label>
          </Col>
          <Col xs="12" md="9">
            <p>{this.state.college}</p>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="3">
            <Label htmlFor="email-input">Course:</Label>
          </Col>
          <Col xs="12" md="9">
            <p>{this.state.course}</p>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="3">
            <Label htmlFor="email-input">Specialization(Major):</Label>
          </Col>
          <Col xs="12" md="9">
            <p>{this.state.major_spc}</p>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="3">
            <Label htmlFor="email-input">Specialization(Minor): </Label>
          </Col>
          <Col xs="12" md="9">
            <p>{this.state.minor_spc}</p>
          </Col>
        </FormGroup>
        

        <FormGroup row>
          <Col  xs="2" md="3">
            <Label htmlFor="email-input">Academic Duration:</Label>
          </Col>
          <Col xs="5" md="5">
          {this.state.academic_from !== "" &&
          <p>From {this.state.academic_from} to {this.state.academic_to}</p>
          }
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="3">
            <Label htmlFor="email-input">Grades:</Label>
          </Col>
          <Col xs="12" md="9">
            <ListGroup>
            {this.state.grades.map((material,index) => {
              console.log('------Index-------')
              console.log(index);
              console.log(material);
              return (<ListGroupItem className="col-md-6">
                        <Row className="list_row">
                          <Col md="6">{material.course_type} {material.period_number}:</Col>
                          <Col xs="12" md="6">
                            <p>{material.grades}</p>
                          </Col>
                        </Row>
              </ListGroupItem>)
            })}
            </ListGroup>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="3">
            <Label htmlFor="email-input">Overall Grade:</Label>
          </Col>
          <Col xs="12" md="9">
          <p>{this.state.overall_grade}</p>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="3">
            <Label htmlFor="email-input">Marks Sheet:</Label>
          </Col>
          <Col xs="12" md="9">
         {selectAttage}
          </Col>
        </FormGroup>
        
        <FormGroup row>
          <Col md="3">
            <Label htmlFor="email-input">Project:</Label>
          </Col>
          <Col xs="12" md="9">
          <p>{this.state.project}</p>
          </Col>
        </FormGroup>
      </div>
    );
  }


  skillSet(){

    const video = this.state.video;
    let selectVideo ="";
    if(video === undefined || video=== null || video ===""){
      selectVideo ="";
    }else{
      selectVideo=<a  target="_blank" href={BaseApi.download_url+this.state.video} download>Play Video</a>;
    }

// Our Assement
    return (
      <div>
        <FormGroup row>
          <Col md="2">
            <Label htmlFor="text-input">Written Skills:</Label>
          </Col>
          <Col xs="12" md="10">
          <p className="bold">{this.state.written_introduction_question}</p>
          <p>{this.state.written_introduction_answer}</p>
          </Col>
        </FormGroup>
      
        <FormGroup row>
          <Col md="2">
            <Label htmlFor="email-input">Video Introduction:</Label>
          </Col>
          <Col xs="12" md="9">
           {selectVideo} 
          </Col>
        </FormGroup>

        <hr/>

        {/* {this.state.written_test_result ===null || this.state.written_test_result ==="" || this.state.written_test_result ===undefined ?
          <FormGroup row>
          <Col md="2">
            <Label htmlFor="text-input">Written Test:</Label>
          </Col>
          <Col xs="12" md="9">
          <div className="btn_div" ><p className="btn_p" onClick={this.onOpenModal} >[Start]</p></div> 
          </Col>
        </FormGroup>
        :
        <FormGroup row>
          <Col md="2">
            <Label htmlFor="email-input">Written Test Result:</Label>
          </Col>
          <Col xs="12" md="9">
          <p>{this.state.written_test_result}</p>
          </Col>
        </FormGroup>
        } */}


      </div>
    );
  }

  Internship(){
   return(
     <div>
      <FormGroup row>
          <Col>
            <p className="qution sec-title">Internship</p>
          </Col>
        </FormGroup>
        {this.state.internship.length ===0 &&
          <FormGroup row>
          <Col>
            <p >None availability</p>
          </Col>
        </FormGroup>
        }
     {this.state.internship.map((material,index) => {
       return(<div>
       
        <FormGroup row>
          <Col md="2">
            <Label htmlFor="email-input">Employer:</Label>
          </Col>
          <Col xs="12" md="9">
          <p>{material.employer}</p>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="2">
            <Label htmlFor="email-input">Internship Details:</Label>
          </Col>
          <Col xs="12" md="9">
          <p>{material.internship_details}</p>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="2">
            <Label htmlFor="email-input">Internship Duration:</Label>
          </Col>
          <Col xs="12" md="9">
          <p>{material.internship_duration}</p>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="2">
            <Label htmlFor="email-input">Project:</Label>
          </Col>
          <Col xs="12" md="9">
          <p>{material.project_summary}</p>
          </Col>
        </FormGroup>
        <hr/>
       </div>)
      
     })
     }
        
     </div>
   )
  }

  editData(material){
    this.setState({
      intern_employer:material.employer,
      intern_duration:material.internship_duration,
      intern_details:material.internship_details,
      project_summary:material.project_summary,
      intern_id:material._id,
      open_intern_model:true,
      intern_edit:true
    });
  }

 

  
  editInternship(){
    return(
      <div>
       <FormGroup row>
          <Col>
            <p className="qution" className="sec-title">Internship</p>
          </Col>
        </FormGroup>
       {/* <FormGroup row>
        <Col xs="12" md="12">
        <Button type="button" variant="contained" className="rightbtn" color="primary" onClick={() => {this.setState({open_intern_model:true}) }}  >New</Button>
        </Col>
      </FormGroup>
      <hr/> */}
      {this.state.internship.map((material,index) => {
        return(<div>
          <div className="profile_introdction"><IconButton aria-label="Edit" className="icon_btn" color="primary" onClick={() => { this.editData(material) }} ><EditIcon fontSize="small" /></IconButton><IconButton aria-label="Delete" color="secondary" className="icon_btn" onClick={() => { this.deleteData(material) }} ><DeleteIcon fontSize="small" /></IconButton></div>         
         <FormGroup row>
           <Col md="2">
             <Label htmlFor="email-input">Employer:</Label>
           </Col>
           <Col xs="12" md="9">
           <p>{material.employer}</p>
           </Col>
         </FormGroup>
         <FormGroup row>
           <Col md="2">
             <Label htmlFor="email-input">Internship Details:</Label>
           </Col>
           <Col xs="12" md="9">
           <p>{material.internship_details}</p>
           </Col>
         </FormGroup>
         <FormGroup row>
           <Col md="2">
             <Label htmlFor="email-input">Internship Duration:</Label>
           </Col>
           <Col xs="12" md="9">
           <p>{material.internship_duration}</p>
           </Col>
         </FormGroup>
         <FormGroup row>
           <Col md="2">
             <Label htmlFor="email-input">Project:</Label>
           </Col>
           <Col xs="12" md="9">
           <p>{material.project_summary}</p>
           </Col>
         </FormGroup>
         <hr/>
        </div>)
       
      })
      }
      </div>
    )    
   }

  editSkillSet(){
    return (
      <div>
        <FormGroup row>
          <Col md="2">
            <Label htmlFor="text-input">Written Skills:</Label>
          </Col>
          <Col xs="12" md="9">
          <div className="btn_div" ><p className="btn_p" onClick={this.onOpenWrittenQuestionModal} >[Start]</p></div>

          {/* <Input
                type="textarea"
                id="writen_introduction"
                name="writen_introduction"
                value={this.state.writen_introduction}
                onChange={this.onChange}
                placeholder="Written Introduction"
                /> */}
          </Col>
        </FormGroup>
      
        <FormGroup row>
          <Col md="2">
            <Label htmlFor="email-input">Video Introduction:</Label>
          </Col>
          <Col xs="12" md="9">
          <div className="btn_div" ><p className="btn_p" onClick={this.onOpenVideoModal} >[Upload]</p></div>
          </Col>
        </FormGroup>
        <hr/>
        {/* {this.state.written_test_result ===null || this.state.written_test_result ==="" || this.state.written_test_result ===undefined ?
          <FormGroup row>
          <Col md="2">
            <Label htmlFor="text-input">Written Test:</Label>
          </Col>
          <Col xs="12" md="9">
          <div className="btn_div" ><p className="btn_p" onClick={this.onOpenModal} >[Start]</p></div> 
          </Col>
        </FormGroup>
        :
        <FormGroup row>
          <Col md="2">
            <Label htmlFor="text-input">Written Test Result:</Label>
          </Col>
          <Col xs="12" md="9">
          <p>{this.state.written_test_result}</p>
          </Col>
        </FormGroup>
        } */}
       
      </div>
    );
  }

  editBasicDetails() {
    return (
      <div>
        <FormGroup row>
          <Col>
            <p className="qution" className="sec-title">Personal Info</p>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="2">
            <Label htmlFor="text-input">Date of Birth:</Label>
          </Col>
          <Col xs="12" md="4">
          <Input
                type="date"
                id="age"
                name="age"
                value={this.state.age}
                onChange={this.onChange}
                placeholder="Date of Birth"
                />
          </Col>
          <Col md="2">
            <Label htmlFor="text-input">Gender:</Label>
          </Col>
          <Col xs="12" md="4">
          <Input type="select" 
                name="gender" 
                id="gender"  
                value={this.state.gender}
                onChange={this.onChange}>
            <option></option>
            <option>Male</option>
            <option>Female</option>
          </Input>
          </Col>
        </FormGroup>
        
        <FormGroup row>
          <Col>
          <p  className="qution sec-title">Current Address</p>
          </Col>
          
        </FormGroup>
        <FormGroup row>
          <Col md="2">
            <Label htmlFor="text-input">Address:</Label>
          </Col>
          <Col xs="12" md="4">
          <Input
                type="text"
                id="current_address"
                name="current_address"
                value={this.state.current_address}
                onChange={this.onChange}
                placeholder="Address"
                />
          </Col>
          <Col md="2">
            <Label htmlFor="text-input">State:</Label>
          </Col>
          <Col xs="12" md="4">
          <Select
                        value={this.state.c_state}
                        onChange={this.onChangeSelectCState}
                        options={States}
                        placeholder ={"State"}
                        isSearchable
            />
         
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="2">
            <Label htmlFor="text-input">City:</Label>
          </Col>
          <Col xs="12" md="4">
          <Input
                type="text"
                id="c_city"
                name="c_city"
                value={this.state.c_city}
                onChange={this.onChange}
                placeholder="City"
                />
          </Col>
          <Col md="2">
            <Label htmlFor="text-input">Pin Code:</Label>
          </Col>
          <Col xs="12" md="4">
          <Input type="text"
                name="c_pin_code"
                required
                maxLength={6} 
                placeholder="Pincode"
                value={this.state.c_pin_code}
                onInput={this.handleChange1.bind(this)}
                />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col>
          <p  className="qution sec-title">Permanant Address</p>
          </Col>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="checkbox"
            onChange={this.handleCheck}
            defaultChecked={this.state.checked}
             />{' '}
            Same as current address
          </Label>
          <br/>
        </FormGroup>
        
      
        <FormGroup row>
          <Col md="2">
            <Label htmlFor="text-input">Address:</Label>
          </Col>
          <Col xs="12" md="4">
             <Input
                type="text"
                id="current_address"
                name="current_address"
                value={this.state.permanant_address}
                onChange={this.onChange}
                placeholder="Address"
                />
          </Col>
          <Col md="2">
            <Label htmlFor="text-input">State:</Label>
          </Col>
          <Col xs="12" md="4">
          <Select
                        value={this.state.p_state}
                        onChange={this.onChangeSelectPState}
                        options={States}
                        placeholder ={"State"}
                        isSearchable
            />
        
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="2">
            <Label htmlFor="text-input">City:</Label>
          </Col>
          <Col xs="12" md="4">
          <Input
                type="text"
                id="p_city"
                name="p_city"
                value={this.state.p_city}
                onChange={this.onChange}
                placeholder="City"
                
                />
          </Col>
          <Col md="2">
            <Label htmlFor="text-input">Pin Code:</Label>
          </Col>
          <Col xs="12" md="4">
          <Input
                type="text"
                id="p_pin_code"
                name="p_pin_code"
                value={this.state.p_pin_code}
                placeholder="Pincode"
                required
                maxLength={6} 
                onInput={this.handleChange2.bind(this)}
                />
          </Col>
        </FormGroup>
       
      </div>
    );
  }


  editEducationDetails() {
    return (
      <div>
        <FormGroup row>
          <Col>
          <p className="qution" className="sec-title">Education</p>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="3">
            <Label htmlFor="email-input">College:</Label>
          </Col>
          <Col xs="12" md="9">
            <p>{this.state.college}</p>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="3">
            <Label htmlFor="email-input">Course:</Label>
          </Col>
          <Col xs="12" md="9">
            <p>{this.state.course}</p>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="3">
            <Label htmlFor="email-input">Specialization(Major):</Label>
          </Col>
          <Col xs="12" md="9">
            <p>{this.state.major_spc}</p>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="3">
            <Label htmlFor="email-input">Specialization(Minor): </Label>
          </Col>
          <Col xs="12" md="9">
            <p>{this.state.minor_spc}</p>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col  md="3">
            <Label htmlFor="email-input">Academic Duration From:</Label>
          </Col>
          <Col xs="4" md="3">

          {this.state.academic_from !== "" &&
          <p>From {this.state.academic_from} to {this.state.academic_to}</p>
          }
{/* 
          <Input type="select" 
                name="academic_from" 
                id="academic_from"  
                value={this.state.academic_from}
                onChange={this.onChange}>
                 <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
            <option value="2018">2018</option>
            <option value="2017">2017</option>
            <option value="2016">2016</option>
            <option value="2015">2015</option>
            <option value="2014">2014</option>
            <option value="2013">2013</option>
            <option value="2012">2012</option>
            <option value="2011">2011</option>
            <option value="2010">2010</option>
            <option value="2009">2009</option>
            <option value="2008">2008</option>
            <option value="2007">2007</option>
            <option value="2006">2006</option>
            <option value="2005">2005</option>
            <option value="2004">2004</option>
            <option value="2003">2003</option>
            <option value="2002">2002</option>
            <option value="2001">2001</option>
            <option value="2000">2000</option>
            <option value="1999">1999</option>
            <option value="1998">1998</option>
            <option value="1997">1997</option>
            <option value="1996">1996</option>
            <option value="1995">1995</option>
            <option value="1994">1994</option>
            <option value="1993">1993</option>
            <option value="1992">1992</option>
            <option value="1991">1991</option>
            <option value="1990">1990</option>
            <option value="1989">1989</option>
            <option value="1988">1988</option>
            <option value="1987">1987</option>
            <option value="1986">1986</option>
            <option value="1985">1985</option>
            <option value="1984">1984</option>
            <option value="1983">1983</option>
            <option value="1982">1982</option>
            <option value="1981">1981</option>
            <option value="1980">1980</option>
            <option value="1979">1979</option>
            <option value="1978">1978</option>
            <option value="1977">1977</option>
            <option value="1976">1976</option>
            <option value="1975">1975</option>
            <option value="1974">1974</option>
            <option value="1973">1973</option>
            <option value="1972">1972</option>
            <option value="1971">1971</option>
            <option value="1970">1970</option>
            <option value="1969">1969</option>
            <option value="1968">1968</option>
            <option value="1967">1967</option>
            <option value="1966">1966</option>
            <option value="1965">1965</option>
            <option value="1964">1964</option>
            <option value="1963">1963</option>
            <option value="1962">1962</option>
            <option value="1961">1961</option>
            <option value="1960">1960</option>
            <option value="1959">1959</option>
            <option value="1958">1958</option>
            <option value="1957">1957</option>
            <option value="1956">1956</option>
            <option value="1955">1955</option>
            <option value="1954">1954</option>
            <option value="1953">1953</option>
            <option value="1952">1952</option>
            <option value="1951">1951</option>
            <option value="1950">1950</option>
            <option value="1949">1949</option>
            <option value="1948">1948</option>
            <option value="1947">1947</option>
            <option value="1946">1946</option>
            <option value="1945">1945</option>
            <option value="1944">1944</option>
            <option value="1943">1943</option>
            <option value="1942">1942</option>
            <option value="1941">1941</option>
            <option value="1940">1940</option>
            <option value="1939">1939</option>
            <option value="1938">1938</option>
            <option value="1937">1937</option>
            <option value="1936">1936</option>
            <option value="1935">1935</option>
            <option value="1934">1934</option>
            <option value="1933">1933</option>
            <option value="1932">1932</option>
            <option value="1931">1931</option>
            <option value="1930">1930</option>
            <option value="1929">1929</option>
            <option value="1928">1928</option>
            <option value="1927">1927</option>
            <option value="1926">1926</option>
            <option value="1925">1925</option>
            <option value="1924">1924</option>
            <option value="1923">1923</option>
            <option value="1922">1922</option>
            <option value="1921">1921</option>
            <option value="1920">1920</option>
            <option value="1919">1919</option>
            <option value="1918">1918</option>
            <option value="1917">1917</option>
            <option value="1916">1916</option>
            <option value="1915">1915</option>
            <option value="1914">1914</option>
            <option value="1913">1913</option>
            <option value="1912">1912</option>
            <option value="1911">1911</option>
            <option value="1910">1910</option>
            <option value="1909">1909</option>
            <option value="1908">1908</option>
            <option value="1907">1907</option>
            <option value="1906">1906</option>
            <option value="1905">1905</option>
                  </Input>
           
          </Col>
          <Col  xs="1" md="1">
            <Label htmlFor="email-input">To:</Label>
          </Col>
          <Col xs="3" md="3">
              <Input type="select" 
                name="academic_to" 
                id="academic_to"  
                value={this.state.academic_to}
                onChange={this.onChange}>
                 <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
            <option value="2018">2018</option>
            <option value="2017">2017</option>
            <option value="2016">2016</option>
            <option value="2015">2015</option>
            <option value="2014">2014</option>
           
                  </Input> */}
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="3">
            <Label htmlFor="email-input">Grades:</Label>
          </Col>
          <Col xs="12" md="9">
            <ListGroup>
            {this.state.grades.map((material,index) => {
              return (<ListGroupItem>
                        <Row className="list_row">
                          <Col md="3">{material.course_type} {material.period_number}:</Col>
                          <Col xs="12" md="9">
                          {this.state.course_grade ==="grades" ?
                          <Input type="select" 
                            name="grades[]" 
                            defaultValue={material.grades}
                            value={this.state.grade}
                            onChange={(e) => this.onChangeGrades(material._id, e)}>
                            <option></option>
                            {BaseApi.grades.map((material,index) => {
                              return <option value={material}>{material}</option>
                            })}
                          </Input>
                          :
                          <Input
                              type="text"
                              name="grades[]"
                              defaultValue={material.grades}
                              value={this.state.grade}
                              onChange={(e) => this.onChangeGrades(material._id, e)}
                              placeholder="Grade"
                              />
                          }
                            
                          </Col>
                        </Row>
              </ListGroupItem>)
            })}
            </ListGroup>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="3">
            <Label htmlFor="email-input">Overall Grade:</Label>
          </Col>
          <Col xs="12" md="9">
          {this.state.course_grade ==="grades" ?
              <Input type="select" 
                    name="overall_grade" 
                    id="overall_grade" 
                    value = {this.state.overall_grade}
                    onChange={this.onChange}
              >
                  <option></option>
              {BaseApi.grades.map((material,index) => {
                return <option value={material}>{material}</option>
                })}
              </Input>
              :
              <Input type="text" 
            name="overall_grade" 
            id="overall_grade" 
            value = {this.state.overall_grade}
            onChange={this.onChange}
             />
          }
          </Col>
        </FormGroup>

        <FormGroup row>
          <Col md="3">
            <Label htmlFor="email-input">Marks Sheet:</Label>
          </Col>
          <Col xs="12" md="9">
          <Input 
            type="file" 
            onChange={this.fileAttagment} style={{ height: 200 }}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Col md="3">
            <Label htmlFor="email-input">Projects:</Label>
          </Col>
          <Col xs="12" md="9">
          <Input type="textarea" 
            name="project" 
            id="project" 
            value = {this.state.project}
            onChange={this.onChange}
             />
          </Col>
        </FormGroup>

       
      </div>
    );
  }

  downloadPdf(){
    let that = this;
    Request.RequestHandle('students/cv/full','GET', null,function(result){
      window.open(BaseApi.download_url+result.data, '_blank');
     }); 
  }


  formProfile() {
    let EditBtn = "";
    let SaveBtn = "";
    let tab=false;
 
    if(this.state.tabIndex === 0){
      EditBtn = "Edit Profile";
      SaveBtn = <Button type="button" variant="contained"  color="primary" className="left-margin rightbtn"  onClick={() => {this.saveProfile()}}  >Save</Button>;
    }else if(this.state.tabIndex === 1){
      EditBtn = "Edit Education";
      SaveBtn = <Button type="button" variant="contained"  color="primary" className="left-margin rightbtn"  onClick={() => {this.saveProfile()}}  >Save</Button>;
    }else if(this.state.tabIndex === 2){
      SaveBtn = <Button type="button" variant="contained"  color="primary" style={{ backgroundColor: "#0D7CF3"}} className="left-margin rightbtn"  onClick={() => {this.setState({open_intern_model:true}) }}  >Add Internship</Button>;
      EditBtn = "Edit Internship";
    }else if(this.state.tabIndex === 3){
      EditBtn = "Edit Our Assessment";
    }
     
    if(this.state.edit_profile === true){
       tab=true;
    }


    return (
    
<div>
        <div className="profile-header">
        <div className="progress-div">
        <Line className="progress_bar" percent={this.state.percentage} strokeWidth="1"  title={ "Profile Completeness: " + this.state.percentage + "%"} strokeColor="#32CD32" />
        <div className="progress_text" title={ "Profile Completeness: " + this.state.percentage + "%"}>{this.state.percentage}%</div>
        </div>
          <div className ="basic-info">
            {this.enrolledDetails()}
          </div>
        </div>

        <CardBody>
          <Tabs
            selectedIndex={this.state.tabIndex}
            onSelect={tabIndex => this.tagSelect(tabIndex)}
          >
            <TabList style={{marginBottom: "20px"}}>
              <Tab disabled={tab}>Profile</Tab>
              <Tab disabled={tab}>Education</Tab>
              <Tab disabled={tab}>Internship</Tab>
              <Tab disabled={tab}>Our Assessment</Tab>
            </TabList>
            {this.state.edit_profile ? <TabPanel>{this.editBasicDetails()}</TabPanel> : <TabPanel>{this.basicDetails()}</TabPanel>}
            {this.state.edit_profile ? <TabPanel>{this.editEducationDetails()}</TabPanel> : <TabPanel>{this.educationDetails()}</TabPanel>}
            {this.state.edit_profile ? <TabPanel>{this.editInternship()}</TabPanel> : <TabPanel>{this.Internship()}</TabPanel>}
            {this.state.edit_profile ? <TabPanel>{this.editSkillSet()}</TabPanel> : <TabPanel>{this.skillSet()}</TabPanel>}
          </Tabs>
        </CardBody>
        
         
          {this.state.edit_profile
                ? 
          <CardFooter>          
          <Button type="button" variant="contained"   onClick={() => {this.setState({ edit_profile:false }) }}  >Cancel</Button>
          <div className="right-div">
          {SaveBtn}
          </div>
          </CardFooter>
                : 
          <CardFooter>
          <Button type="button" variant="contained" onClick={() => {this.passwordChange();}}>Change Password</Button>
          {this.state.percentage === 100 &&  !this.state.is_submitted ?
            <Button type="button" variant="contained"  color="secondary" className="left-margin rightbtn"  onClick={() => {this.submitProfile() }} >Submit Profile</Button>          
            :
            <div className="right-div">
          <Button type="button" variant="contained"  color="primary" className="left-margin rightbtn"    disabled>Submit Profile</Button>          
      
          <Button type="button" variant="contained"  color="primary" className="left-margin rightbtn" onClick={() => {this.downloadPdf()}} >Download Pdf</Button>

              
        
          </div>
          }

          {this.state.is_submitted ?
          ""
          :
          <div className="right-div">
          <Button type="button" variant="contained"  color="primary"   onClick={() => {this.setState({ edit_profile:true }) }}  >{EditBtn}</Button>
          </div>
          }
          </CardFooter>
            }
     </div> 
    );
  }

  ChangePasswordformProfile() {
    return (
      <Form
        ref={el => (this.myFormRef = el)}
        onSubmit={this.handleSubmit}
        encType="multipart/form-data"
        className="form-horizontal"
      >
        <CardBody>
          <Alert color="light" isOpen={this.state.visible}>
            {this.state.alerttext}
          </Alert>
          <FormGroup row>
            <Col md="3">
              <Label htmlFor="text-input">Old Password:</Label>
            </Col>
            <Col xs="12" md="9">
              <Input
                type="password"
                id="password"
                name="password"
                value={this.state.password}
                onChange={this.onChange}
                placeholder="Password"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col md="3">
              <Label htmlFor="text-input">New Password:</Label>
            </Col>
            <Col xs="12" md="9">
              <Input
                type="password"
                id="new_password"
                name="new_password"
                value={this.state.new_password}
                onChange={this.onChange}
                placeholder="New Password"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col md="3">
              <Label htmlFor="email-input">Confirm Password:</Label>
            </Col>
            <Col xs="12" md="9">
              <Input
                type="password"
                id="conform_password"
                name="conform_password"
                value={this.state.conform_password}
                onChange={this.onChange}
                placeholder="Confirm Password"
              />
            </Col>
          </FormGroup>
        </CardBody>
        <CardFooter>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="left-margin rightbtn"
          >
            Save
          </Button>
          <Button
            type="button"
            variant="contained"
            onClick={() => {
              this.passwordChange();
            }}
          >
            Cancel
          </Button>
        </CardFooter>
      </Form>
    );
  }

  passwordChange() {
    this.setState({
      ChangePassword: !this.state.ChangePassword
    });

    this.setState({
      password: "",
      new_password: "",
      conform_password: ""
    });
  }

  writtenExamSave(){
   
    if(this.state.written_introduction_answer === "" || this.state.written_introduction_answer === null || this.state.written_introduction_answer === undefined){
      this.setState({
        written_introduction_answer: ""
      });
    }else{
      console.log('====================================');
      console.log(this.state.written_introduction_answer);
      console.log('====================================');
      const writtng_data ={
        written_answer: this.state.written_introduction_answer,
        written_question: this.state.written_introduction_question,
      };
      let that = this;
      Request.RequestHandle('students/written_exam/'+ Auth.getProfile().id,'POST', JSON.stringify(writtng_data),function(result){
        console.log('====================================');
          console.log(result);
          console.log('====================================');
        if(result.status){
        
        swal("Success!", "Written skill has been submitted.", "success");
        that.setState({edit_profile:false});
        that.printProfile();
        that.onCloseModal();
        }else{
          that.setState({alerttextTest:result.msg,visibleTest:true});

        }
      }); 
    }
  }


  fileUpload(){

      
    const data = new FormData()
    data.append('video', this.state.selectedFile);
    let fileType = ['video/mp4', 'video/3gp', 'video/3gpp','video/webm'];
    let error = false;
    let error_msg = "";
    if(this.state.selectedFile === undefined || this.state.selectedFile === null || this.state.selectedFile === "" ){
      error = true;
      error_msg = "video file not found"
    }else if (fileType.indexOf(this.state.selectedFile.type) === -1) {
      error = true;
      error_msg = "You have uploaded an invalid video file type"
    }else if (this.state.selectedFile.size === 3038741) {
      error = true;
      error_msg = "File size exceeds 3 MB"
    }


    if(error){
      swal("Error!", error_msg, "error");
      return false;
    }


    var that = this;
    Request.ajaxUploadRequestHandle('students/video/'+ Auth.getProfile().id,'POST',data,function(result){

    //  that.consume(result.body.getReader());
        if(result.status){
          if ( result.data.status) {
            swal("Success!", "Video introduction has been submitted.", "success");
            that.setState({edit_profile:false});
            that.onCloseModal();
            that.printProfile();
          } else {
            swal("Error!", result.data.msg, "error");

            that.setState({alerttextTest:result.data.msg,visibleTest:true,fileprogress:0});
            
          }
        }else{
          swal("Error!", "Try again", "error");
          that.setState({alerttextTest:'Try again',visibleTest:true,fileprogress:0});
        }
    },
    function(p){

      that.setState({
                fileprogress: (p.loaded / p.total)*100
              })

    }); 
  }



  render() {
    const { open,open_video_model,open_intern_model,open_question_model,alerttextTest } = this.state;
    
    return (
      <div>
      {this.state.loader === true &&
        <div class="loader"></div>
      }
     
         <Modal open={open} onClose={this.onCloseModal} center>
        <Row>
          <Col>
          {this.QuestionPaper()}
          </Col>
        </Row>
        </Modal>

        <Modal open={open_question_model} onClose={this.onCloseModal} center>
        <Row>
          <Col>
            <Card>
            <CardBody  style={{paddingBottom: "0px"}}>
            <CardTitle>Written Skills</CardTitle>
            <div>
            <p style={{ color:"red" }}>{alerttextTest}</p>
          </div>
          <FormGroup row>
            <Col md="3">
              <Label htmlFor="text-input">Question:</Label>
            </Col>
            <Col xs="12" md="9">
            <p>{this.state.written_introduction_question}</p>  
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col md="3">
              <Label htmlFor="text-input">Answer:</Label>
            </Col>
            <Col xs="12" md="9">
            <Input
                 type="textarea"  
                 name="written_introduction_answer" 
                 onInput = {this.textCounter}
                 value={this.state.written_introduction_answer}
               onChange={this.onChange} 
                 />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col md="12">
              <p style={{textAlign:'right'}}>{this.state.numChar}/200  *(Min 200 Characters).</p>
            </Col>
          </FormGroup>
          <hr/>
         
          <Button
            type="button"
            variant="contained"
            color="primary"
            className="left-margin rightbtn"
            onClick={() => {
              this.writtenExamSave();
            }}
          >
            Submit
          </Button>
          <Button
            type="button"
            variant="contained"
            onClick={() => {
              this.onCloseModal();
            }}
          >
            Cancel
          </Button>
          </CardBody>
            </Card>
          </Col>
        </Row>
        </Modal>

        <Modal open={open_video_model} onClose={this.onCloseModal} center>
        <Row>
          <Col>
            <Card>
            <CardBody  style={{paddingBottom: "0px"}}>
            <CardTitle>Video Introduction</CardTitle>
          <FormGroup row>
            <Col md="3">
              <Label htmlFor="text-input">Upload Video:</Label>
            </Col>
            <Col xs="12" md="9">
            <Input
                 type="file"  
                onChange={this.handleselectedFile} style={{ height: 200 }}/>
            
            </Col>
          </FormGroup>
          {this.state.fileprogress !== 0 ?
          <FormGroup row>
            <Col xs="12" md="12">
            <Line className="progress_bar" percent={this.state.fileprogress} strokeWidth="1" title={ "Profile Completeness: " + this.state.fileprogress + "%"} strokeColor="#FE1DFE" />
          <div className="progress_text" title={ "Profile Completeness: " + this.state.fileprogress + "%"}></div>
          </Col>
          </FormGroup>
          :
          ""
          }
          <hr/>
         
          <Button
            type="button"
            variant="contained"
            color="primary"
            className="left-margin rightbtn"
            onClick={() => {
              this.fileUpload();
            }}
          >
            Upload
          </Button>
          <Button
            type="button"
            variant="contained"
            onClick={() => {
              this.onCloseModal();
            }}
          >
            Cancel
          </Button>
          </CardBody>
            </Card>
          </Col>
        </Row>
        </Modal>

        <Modal open={open_intern_model} onClose={this.onCloseModal} center>
        <Row>
          <Col>
            <Card>
            <CardBody  style={{paddingBottom: "0px"}}>
            <CardTitle>Add Internship</CardTitle>
          <FormGroup row>
            <Col md="3">
              <Label htmlFor="text-input">Employer:</Label>
            </Col>
            <Col xs="12" md="9">
            <Input
                 type="text" 
                 name="intern_employer" 
                 value={this.state.intern_employer} 
                onChange={this.onChange} />
            
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col md="3">
              <Label htmlFor="text-input">Internship Duration:</Label>
            </Col>
            <Col xs="12" md="9">
            <Input type="select" id="intern_duration" name="intern_duration" value={this.state.intern_duration} onChange ={this.onChange} >
                  <option></option>
                  <option value="<1 month">  &lt;1 Month</option>
                  <option value="1-2 months">1-2 Months</option>
                  <option value="2-3 months">2-3 Months</option>
                  <option value="3-4 months">3-4 Months</option>
                  <option value="4-5 months">4-5 Months</option>
                  <option value="5-6 months">5-6 Months</option>
            </Input>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col md="3">
              <Label htmlFor="text-input">Projects:</Label>
            </Col>
            <Col xs="12" md="9">
            <Input
                 type="text"  
                 name="project_summary" 
                 value={this.state.project_summary}  
                onChange={this.onChange} />
            
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col md="3">
              <Label htmlFor="text-input">Details:</Label>
            </Col>
            <Col xs="12" md="9">
            <Input
                 type="textarea" 
                 name="intern_details" 
                 value={this.state.intern_details}  
                onChange={this.onChange} />
            
            </Col>
          </FormGroup>
            <hr/>
          <Button
            type="button"
            variant="contained"
            color="primary"
            className="left-margin rightbtn"
            onClick={() => {
              this.internUpload();
            }}
          >
            Upload
          </Button>
          <Button
            type="button"
            variant="contained"
            onClick={() => {
              this.onCloseModal();
            }}
          >
            Cancel
          </Button>
          </CardBody>
            </Card>
          </Col>
        </Row>
        </Modal>
      <div className="animated fadeIn">
       
        <div className="title-bar" id="title-cont">
          Profile
        </div>
        
      
      
        <Row>
          <Col>
            <Card>
              {this.state.ChangePassword
                ? this.ChangePasswordformProfile()
                : this.formProfile()}
            </Card>
          </Col>
        </Row>
        </div>
      </div>

    );
  }
}
