import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card,CardBody,CardFooter,Col,Form,FormGroup,Input,Label,Row,Alert,FormFeedback,FormText,InputGroup, InputGroupAddon} from "reactstrap";
import createHistory from "history/createBrowserHistory";
import Button from "@material-ui/core/Button";
import RequestHandle from "../../components/RequestHandle";
import swal from "sweetalert";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Table } from "antd";
import "antd/dist/antd.css";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Modal from 'react-responsive-modal';
import Select from 'react-select';
import States from '../../components/States';
import Cities from '../../components/Cities';
import {Typeahead} from 'react-bootstrap-typeahead'; // ES2015

const columns = [
  {
    title: "Action",
    dataIndex: "action",
    key: "action"
  },
  {
    title: "Course",
    dataIndex: "course",
    key: "course"
  },
  {
    title: "Specialization",
    dataIndex: "specialization",
    key: "specialization"
  }
];

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

export default class edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      formdata: "",
      visible: false,
      alerttext: "",
      visible2: false,
      alerttext2: "",
      name: "",
      email: "",
      contact_no: "",
      college_code: "",
      year: "",
      website: "",
      university_id: "",
      university_name: "",
      address: "",
      state: {label:"Search and Select",value:""},
      city:null,
      pin_code: "",
      geolocation: "",
      total_student: "",
      palcement_head_name: "",
      placement_head_email: "",
      placement_head_contact_no: "",
      status: "",
      inputValue: "",
      selectedCourseOption: null,
      selectedCourseArry:[],
      courseOption: [],
      selectedSpecializationOption: [],
      selectedSpecializationArry:[],
      specializationOption: [],
      spOptions:[],
      course_id: "",
      course_name: "",
      selectCourses: [],
      specialization_id: "",
      specialization_name: "",
      selectSpecialization: [],
      printCourse: "",
      selectedCSOption: [],
      tabIndex: 0,
      footerButton: true,
      open: false,
      universityOption:[],
      selectedUniversityOption:{label:"Search and Select",value:""},
      loading: false,
      university_affiliated_to:'',
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.printData = this.printData.bind(this);
    this.filterColors = this.filterColors.bind(this);
    this.filterCourse = this.filterCourse.bind(this);
    this.onChangeSelectOption = this.onChangeSelectOption.bind(this);
    this.onChangeCourse = this.onChangeCourse.bind(this);
    this.getData = this.getData.bind(this);
    this.getCourseData = this.getCourseData.bind(this);
    this.deleteSelectedCourse = this.deleteSelectedCourse.bind(this);
    this.selectCoursesSpecialization = this.selectCoursesSpecialization.bind(this);
    this.onChangeSpecializations = this.onChangeSpecializations.bind(this);
    this.deleteData = this.deleteData.bind(this);
    this.tagSelect = this.tagSelect.bind(this);
    this.CourseModel = this.CourseModel.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.CourseModel = this.CourseModel.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changeCourse = this.changeCourse.bind(this);
    this.handleSpecializationChange = this.handleSpecializationChange.bind(this);
    this.changeSpecialization = this.changeSpecialization.bind(this);
    this.onChangeSelectUniversityOption = this.onChangeSelectUniversityOption.bind(this);
    this.changeUniversity = this.changeUniversity.bind(this);
    this.onChangeSelectState = this.onChangeSelectState.bind(this);
    this.ccsFetch = this.ccsFetch.bind(this);
    
  }

  onChangeSelectState(state){
    this.setState({state});
  }

  handleSpecializationChange = (selectedSpecializationOption) => {
    this.setState({ alerttext2: '', visible2: false });
    this.setState({ selectedSpecializationOption });
    var selectedSpecializationOptions = [];
    selectedSpecializationOption.map(item => { 
      selectedSpecializationOptions.push(item.value)
    })
    this.setState({ selectedSpecializationArry:selectedSpecializationOptions });
  }

  changeSpecialization(inputValue){
    var that =this;
  
    if(inputValue === null || inputValue === "" || inputValue === undefined){
      that.setState({spOptions:[]});  
      //that.setState({ selectedCourseOption:null });
    }else{
    // Request.RequestHandle( "ccs/"+that.state.selectedCourseOption.value+"/specialization?search="+that.state.selectedCourseOption.value,'GET',null,function(result) {
    Request.RequestHandle( "ccs//specializations?search="+inputValue,'GET',null,function(result) {
    
      if(result.status){
       
        //that.setState({ selectedSpecializationOption:null });
       // that.setState({specializationOption:[]});              
        var spOptions =[];
            result.data.results.map(item => { 
              spOptions.push({
                'label':item.name,
                'value':item._id,
                });
            });
            that.setState({spOptions});
      }else{
        
      }
     
        }); 
    }
}

  handleChange = (selectedCourseOption) => {
    this.setState({ selectedCourseOption , selectedSpecializationOption:[] });
    this.CoursesSpecialization(selectedCourseOption.value);
  }

  onChangeSelectUniversityOption(selectedUniversityOption){
    this.setState({selectedUniversityOption});
   
  }


  changeUniversity(inputValue){
    var that =this;
    if(inputValue === null || inputValue === "" || inputValue === undefined){
      that.setState({universityOption:[]});  
      //that.setState({ selectedCourseOption:null });

    }else{
    Request.RequestHandle( "university?search="+inputValue,'GET',null,function(result) {
      // Request.RequestHandle( "university?search="+inputValue,'GET',null,function(result) {
      if(result.status){
        that.setState({ selectedUniversityOption:null });
        that.setState({universityOption:[]});              
        var universityOption =[];
            result.data.results.map(item => { 
              universityOption.push({
                'label':item.name,
                'value':item._id,
                });
            });
            that.setState({universityOption});
      }
     
        }); 
    }
}


  changeCourse(inputValue){
    var that =this;
    if(inputValue === null || inputValue === "" || inputValue === undefined){
      that.setState({courseOption:[]});  
      //that.setState({ selectedCourseOption:null });

    }else{
    Request.RequestHandle( "course?search="+inputValue,'GET',null,function(result) {
      if(result.status){
        that.setState({ selectedCourseOption:null });
        that.setState({courseOption:[]});              
        var courseOption =[];
            result.data.results.map(item => { 
              courseOption.push({
                'label':item.name,
                'value':item._id,
                });
            });
            that.setState({courseOption});
      }
     
        }); 
    }
}

  componentDidMount = () => {
    Request.RequestHandle(
      "college/" + this.props.match.params.id,
      "GET",
      null,
      this.getData
    );
    this.ccsFetch();
    // this.CoursesSpecialization();
   
    // var arry = [];
    // arry.push({ id: "5c3463a4d0e9d113d2013649", value: "Test2" });
    // this.setState({ selectCourses: arry });
  };

  CoursesSpecialization(course){
    let that = this;
    Request.RequestHandle("ccs/"+course+"/specialization", "GET", null, function(result){
      if (result.status) {
      
        let data = [];
        result.data.results.map(item => {
          let spec = item.specializations_doc[0] 
          data.push({
            'label':spec.name,
            'value':spec._id,
            });
        });
       that.setState({spOptions:data});
      }
    });
  }

  ccsFetch(){
    
    this.setState({loading:true});
    Request.RequestHandle(
      "ccs/" + this.props.match.params.id + "/courses",
      "GET",
      null,
      this.getCourseData
    );
  }

  getCourseData(result) {
 
    var dataSt = result.data.data;
    // if (result.status && dataSt.length !== 0) {
    this.setState({loading:false});
      var selectedCSOptions = [];
     // selectedCSOptions = this.state.selectedCSOption;
      dataSt.map((item, i) => {
        var course = "";
        if (item.course_doc.length !== 0) {
          course = item.course_doc[0].name;
        }
        var specialization = "";
        if (item.specializations_doc.length !== 0) {
          specialization = item.specializations_doc[0].name;
        }
        selectedCSOptions.push({
          key: i,
          course_id: item.course_id,
          course: course,
          specialization_id: item.specialisation_id,
          specialization: specialization,
          action: (
            <div>
              <IconButton
                aria-label="Delete"
                color="secondary"
                onClick={() => {
                  this.deleteData(i, item.course_id, item.specialisation_id);
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </div>
          )
        });
      });
     // this.setState({selectedCSOption:[]});
      this.setState({selectedCSOption:selectedCSOptions});

    // }
  }

  getData(result) {
    var dataSt = result.data.results;
 
    if (result.status && dataSt.length !== 0) {
      var data = dataSt[0];
      var selectedUniversityOption ={};
      if(data.university_doc.length !==0){
        selectedUniversityOption ={'label':data.university_doc[0].name,'value':data.university_doc[0]._id}
      }

      console.log('====================================');
 console.log('dataSt',data.city);
 console.log('====================================');
        let city = [];
        city.push(data.city);

        let state = {'label':data.state,'value':data.state}
      this.setState({
        name: data.name,
        university_affiliated_to:data.university_affiliated_to,
        email: data.email,
        contact_no: data.contact_no,
        college_code: data.college_code,
        year: data.year,
        website: data.website,
        selectedUniversityOption: selectedUniversityOption,
        university_name: data.university_id,
        address: data.address,
        state: state,
        city: city,
        pin_code: data.pin_code,
        geolocation: data.geolocation,
        total_student: data.total_student,
        palcement_head_name: data.palcement_head_name,
        placement_head_email: data.placement_head_email,
        placement_head_contact_no: data.placement_head_contact_no,
        status: data.status
      });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onChangeSelectOption(selectedOption) {
    this.setState({ university_id: selectedOption.value });
  }

  onChangeCourse(selectedOption) {
    this.setState({
      course_id: selectedOption.value,
      course_name: selectedOption.label
    });
  }

  onChangeSpecializations(selectedOption) {
    this.setState({
      specialization_id: selectedOption.value,
      specialization_name: selectedOption.label
    });
  }

  handleInputChange = newValue => {
    const inputValue = newValue.replace(/\W/g, "");
    this.setState({ inputValue });
    return inputValue;
  };

  promiseOptions = inputValue =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(this.filterColors(inputValue));
      }, 1000);
    });

  filterColors = inputValue => {
    if (inputValue) {
      var that = this;
      Request.RequestHandle(
        "university?search=" + inputValue,
        "GET",
        null,
        function(result) {
          if (result.status) {
            that.setState({ universityOption: [] });
            var universityOption = [];
            result.data.results.map(item => {
              universityOption.push({
                label: item.name,
                value: item._id
              });
            });
            that.setState({ universityOption });
          }
        }
      );
    }

    return this.state.universityOption;
  };

  promiseOptionsCourse = inputValue =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(this.filterCourse(inputValue));
      }, 5000);
    });

  filterCourse = inputValue => {
    if (inputValue) {
      var that = this;
      Request.RequestHandle(
        "course?search=" + inputValue,
        "GET",
        null,
        function(result) {
          that.setState({ courseOption: [] });
          var courseOption = [];
          result.data.results.map(item => {
            courseOption.push({
              label: item.name,
              value: item._id
            });
          });

          that.setState({ courseOption });
        }
      );
    }
    return this.state.courseOption;
  };

  promiseOptionSpecialization = inputValue =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(this.filterSpecialization(inputValue));
      }, 2000);
    });

  filterSpecialization = inputValue => {
    if (inputValue) {
      var that = this;
      Request.RequestHandle(
        "specializations?search=" + inputValue,
        "GET",
        null,
        function(result) {
          that.setState({ specializationOption: [] });
          var specializationOption = [];
          result.data.results.map(item => {
            specializationOption.push({
              label: item.name,
              value: item._id
            });
          });

          that.setState({ specializationOption });
        }
      );
    }

    return this.state.specializationOption;
  };

  handleSubmit(event) {
    event.preventDefault();
    let city = "";
    if(this.state.city !=="" && this.state.city !==null && this.state.city[0] !== undefined){
      if(this.state.city[0].label !== undefined){
        city = this.state.city[0].label;
      }else{
        city = this.state.city[0];
      }
    }
    console.log('====================================');
    console.log(city);
    console.log('====================================');
    

    const universityData = {
      name: this.state.name,
      university_affiliated_to:this.state.university_affiliated_to,
      email: this.state.email,
      contact_no: this.state.contact_no,
      college_code: this.state.college_code,
      year: this.state.year,
      website: this.state.website,
      university_id:this.state.selectedUniversityOption.value, 
      address: this.state.address,
      state: this.state.state.value,
      city: city,
      pin_code: this.state.pin_code,
      geolocation: this.state.geolocation,
      total_student: this.state.total_student,
      palcement_head_name: this.state.palcement_head_name,
      placement_head_email: this.state.placement_head_email,
      placement_head_contact_no: this.state.placement_head_contact_no,
      status: this.state.status
    };

    Request.RequestHandle(
      "college/" + this.props.match.params.id,
      "POST",
      JSON.stringify(universityData),
      this.printData
    );
  }

  printData(Result) {
    if (Result.status) {
      swal("Success!", "Your information has been submitted.", "success");
      window.location.assign("/#/college");

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
      description: "",
      status: "active",
      year: ""
    });
  }

  deleteSelectedCourse(id) {
    var selectCourses = this.state.selectCourses;
    selectCourses.splice(id, 1);
    this.setState({ selectCourses });
  }

  selectCoursesSpecialization() {
    this.state.selectedSpecializationOption.map((value,key) => {
      
      var that = this;
      var id = this.props.match.params.id;
    this.setState({loading:true});     
      var list = {
        course_id: this.state.selectedCourseOption.value,
        specialisation_id: value.value,
        college_id: id
      };
      Request.RequestHandle("ccs", "POST", JSON.stringify(list), function(result){
        if (result.status) {
          that.setState({selectedCourseOption:null,selectedSpecializationOption:[],alerttext2: '', visible2:false});
         that.ccsFetch();
        }else{
          that.setState({loading:false});
          that.setState({ alerttext2: result.msg, visible2: true });
        }
      });
    
  });
  }

  deleteData(key, course, specialization) {
    var id = this.props.match.params.id;
    var that = this;
    swal({
      title: "Delete Confirmation",
      text: "Are you sure that you want to delete this?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        that.setState({loading:true});
        Request.RequestHandle(
          "ccs/" + id + "/courses/" + course + "/" + specialization,
          "DELETE",
          null,
          function(result) {
        that.setState({loading:false});
           
            if (result.status) {
             // that.setState({selectedCSOption:[]});
              that.ccsFetch();         
            }
          }
        );

      } else {
      }
    });
  }

  DeleteResponse(result) {}

  printSelectedCS() {
    return <Table dataSource={this.state.selectedCSOption} loading={this.state.loading} columns={columns} />;
  }

  tagSelect(tagSelect) {
    this.setState({ tabIndex: tagSelect });
    if (tagSelect === 1) {
      this.setState({ footerButton: false });
    } else {
      this.setState({ footerButton: true });
    }
  }

  handleOpen(){
    Request.RequestHandle('course','GET',null,function(result){
   
    }); 

    this.setState({ open: true });
  };

  handleClose(){
    this.setState({ open: false });
  };


  CourseModel() {

    return (
      <div>
       <Modal open={this.state.open} onClose={this.handleClose} center>
          <h2>Simple centered modal</h2>
        </Modal>
      </div>
    );
  }


  render() {
    const { alerttext,alerttext2, footerButton ,selectedCourseOption,selectedSpecializationOption} = this.state;
    let button;
    if (footerButton) {
      button = (
        <CardFooter>
          <Button
            type="reset"
            variant="contained"
            color="secondary"
            className="left-margin"
            onClick={() => {
              this.resetForm();
            }}
          >
            Reset
          </Button>
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
            className="left-margin rightbtn"
            onClick={() => {
              history.goBack();
            }}
          >
            Cancel
          </Button>
        </CardFooter>
      );
    } else {
      button = "";
    }
    let isDisabled = false;
    if(this.state.selectedCourseOption === null){
       isDisabled = true;
    }else{
    isDisabled = false;
    }

    return (
      <div className="animated fadeIn">
        <div className="title-bar" id="title-cont">
          Edit College
        </div>
        {this.CourseModel()}
        <Row>
          <Col>
            <Card>
              <Form
                ref={el => (this.myFormRef = el)}
                onSubmit={this.handleSubmit}
                encType="multipart/form-data"
                className="form-horizontal"
              >
                <CardBody>
                  <Tabs
                    selectedIndex={this.state.tabIndex}
                    onSelect={tabIndex => this.tagSelect(tabIndex)}
                  >
                    <TabList>
                      <Tab>Basic Details</Tab>
                      <Tab>Course & Specialization </Tab>
                    </TabList>

                    <TabPanel>
                      <Alert color="light" isOpen={this.state.visible}>
                        {alerttext}
                      </Alert>
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="text-input">College Name:*</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input
                            type="text"
                            id="name"
                            name="name"
                            value={this.state.name}
                            onChange={this.onChange}
                            placeholder="College Name"
                            disabled
                          />
                         
                        </Col>
                      </FormGroup>
                      
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="email-input">University:*</Label>
                        </Col>
                        <Col xs="12" md="9">
                        <Select
                        value={this.state.selectedUniversityOption}
                        onChange={this.onChangeSelectUniversityOption}
                        onInputChange ={this.changeUniversity}
                        options={this.state.universityOption}
                        isSearchable
                      />
                        </Col>
                      </FormGroup>
                      
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="email-input">Email:*</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input
                            type="text"
                            id="email"
                            name="email"
                            value={this.state.email}
                            onChange={this.onChange}
                            placeholder="Email"
                            autoComplete="email"
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="email-input">Contact No:*</Label>
                        </Col>
                        <Col xs="12" md="9">
                        <InputGroup>
                        <InputGroupAddon addonType="prepend" className="phone-number-code">+91</InputGroupAddon>
                        <Input type="text" id="contact_no" name="contact_no" value={this.state.contact_no} onChange ={this.onChange} placeholder="Phone Number" />
                      </InputGroup>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="email-input">College Code:*</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input
                            type="text"
                            id="college_code"
                            name="college_code"
                            value={this.state.college_code}
                            onChange={this.onChange}
                            placeholder="Code"
                            disabled
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="email-input">Address:*</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input
                            type="text"
                            id="address"
                            name="address"
                            value={this.state.address}
                            onChange={this.onChange}
                            placeholder="Address"
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="email-input">City:*</Label>
                        </Col>
                        <Col xs="12" md="9">
                        <Typeahead
                        allowNew
                        onChange={(city) => {
                         
                          this.setState({city});

                          console.log(city[0]);
                        }}
                        options={Cities}
                        // emptyLabel ={undefined}
                        id="city" 
                        name="city" 
                        selected={this.state.city}
                        placeholder="City"
                      />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="email-input">State:*</Label>
                        </Col>
                        <Col xs="12" md="9">
                        <Select
                        value={this.state.state}
                        onChange={this.onChangeSelectState}
                        options={States}
                        placeholder ={"State"}
                        isSearchable
                      />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="email-input">Pin Code:*</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input
                            type="text"
                            id="pin_code"
                            name="pin_code"
                            value={this.state.pin_code}
                            onChange={this.onChange}
                            placeholder="Pin Code"
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="email-input">Since:</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input
                            type="text"
                            id="year"
                            name="year"
                            value={this.state.year}
                            onChange={this.onChange}
                            placeholder="Year"
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="email-input">Website:*</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input
                            type="text"
                            id="website"
                            name="website"
                            value={this.state.website}
                            onChange={this.onChange}
                            placeholder="URL"
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="text-input">
                            Placement Head Name:*
                          </Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input
                            type="text"
                            id="palcement_head_name"
                            name="palcement_head_name"
                            value={this.state.palcement_head_name}
                            onChange={this.onChange}
                            placeholder="Placement Head Name"
                          />
                          
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="text-input">
                            Placement Head Email:*
                          </Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input
                            type="text"
                            id="placement_head_email"
                            name="placement_head_email"
                            value={this.state.placement_head_email}
                            onChange={this.onChange}
                            placeholder="Placement Head Email"
                          />
                       
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="text-input">
                            Placement Head Contact Number:*
                          </Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input
                            type="text"
                            id="placement_head_contact_no"
                            name="placement_head_contact_no"
                            value={this.state.placement_head_contact_no}
                            onChange={this.onChange}
                            placeholder="Placement Head Contact Number"
                          />
                          <FormFeedback>
                            Oh noes! that name is already taken
                          </FormFeedback>
                        </Col>
                      </FormGroup>
                     
                     
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="email-input">Student Range:*</Label>
                        </Col>
                        <Col xs="12" md="9">
                        <Input type="select" id="total_student" name="total_student" value={this.state.total_student} onChange ={this.onChange} placeholder="Total Student" >
                        <option value="">Select</option>
                        <option value="0-500">0-500</option>
                        <option value="500-1000">500-1000</option>
                        <option value="1000-5000">1000-5000</option>
                        <option value="5000+">5000+</option>
                        </Input>  
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="email-input">Geolocation:*</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input
                            type="text"
                            id="geolocation"
                            name="geolocation"
                            value={this.state.geolocation}
                            onChange={this.onChange}
                            placeholder="Geolocation"
                          />
                        </Col>
                      </FormGroup>
                      
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="email-input">Status:</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input
                            type="select"
                            id="status"
                            name="status"
                            value={this.state.status}
                            onChange={this.onChange}
                          >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                          </Input>
                        </Col>
                      </FormGroup>
                    </TabPanel>
                    <TabPanel>
                    <Alert color="light" isOpen={this.state.visible2}>
                        {alerttext2}
                      </Alert>
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="email-input">Course:</Label>
                        </Col>
                        <Col xs="12" md="9">
                        
                          <Select
                        value={selectedCourseOption}
                        onChange={this.handleChange}
                        onInputChange ={this.changeCourse}
                        options={this.state.courseOption}
                        isSearchable
                      />
                        </Col>
                       
                      </FormGroup>

                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="email-input">Specialization:</Label>
                        </Col>
                        <Col xs="12" md="9">
                        <Select
                        value={selectedSpecializationOption}
                        onChange={this.handleSpecializationChange}
                        //onInputChange ={this.changeSpecialization}
                        options={this.state.spOptions}
                        isSearchable
                        isDisabled ={isDisabled}
                        isMulti
                      />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col xs="12" md="12">
                          <Button
                            type="button"
                            variant="contained"
                            color="primary"
                            className="left-margin rightbtn"
                            onClick={() => {
                              this.selectCoursesSpecialization();
                            }}
                          >
                            Add
                          </Button>
                        </Col>
                      </FormGroup>
                      {this.state.selectedCSOption.length !==0 ?
                        <Table dataSource={this.state.selectedCSOption} loading={this.state.loading} columns={columns} />
                      :
                      <p>No Result</p>
                      }
                    </TabPanel>
                  </Tabs>
                </CardBody>
                {button}
              </Form>
            </Card>
          </Col>
        </Row>
        <div />
      </div>
    );
  }
}
