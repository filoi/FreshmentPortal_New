import React, { Component } from 'react'
import { SpeedDial, BubbleList, BubbleListItem } from 'react-speed-dial';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Avatar from 'material-ui/Avatar';
import "antd/dist/antd.css";
import IconButton from '@material-ui/core/IconButton';
import FileIcon from '@material-ui/icons/Assignment';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import createHistory from 'history/createBrowserHistory'
import swal from 'sweetalert'
import IconAdd from 'material-ui/svg-icons/content/add';
import { blue500 } from 'material-ui/styles/colors';
import MoreVert from '@material-ui/icons/MoreVert';
import {Table} from 'antd';
import withAuth from '../../components/withAuth';
import AuthService from '../../components/AuthService';
import RequestHandle from '../../components/RequestHandle';
import Common from '../../components/Common';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';
import States from '../../components/States';
import moment from 'moment'

import Modal from 'react-responsive-modal';
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
  FormFeedback,
  InputGroup, 
  InputGroupAddon, 
  InputGroupText,
} from 'reactstrap';
import Select from 'react-select';
import BaseApi from '../../components/BaseApi';
import InputRange from 'react-input-range';


const history = createHistory();
const Auth = new AuthService();
const Request = new RequestHandle();
const CommonRequest = new Common();




  export default class University extends withAuth(Component) {
    constructor(props) {
      super(props);
      this.state = {
        dataSource: [],
        data: [],
        pagination: {},
        loading: false,
        filter_open:false,
        searchUniversity:[],
        universityFilter:[],

        searchCollege:[],
        collegeFilter:[],

        searchCourse:[],
        courseFilter:[],

        searchSpecializations:[],
        specializationsFilter:[],  

        state:[]
      }
      this.onChange = this.onChange.bind(this); 
      this.printData = this.printData.bind(this);
      this.deleteRows = this.deleteRows.bind(this);

      this.handleChangeUniversityFilter = this.handleChangeUniversityFilter.bind(this);
      this.changeUniversityFilter = this.changeUniversityFilter.bind(this);

      this.handleChangeCollegeFilter = this.handleChangeCollegeFilter.bind(this);
      this.changeCollegeFilter = this.changeCollegeFilter.bind(this);

      this.handleChangeCourseFilter = this.handleChangeCourseFilter.bind(this);
      this.changeCourseFilter = this.changeCourseFilter.bind(this);

      this.handleChangeSpecializationsFilter = this.handleChangeSpecializationsFilter.bind(this);
      this.changeSpecializationsFilter = this.changeSpecializationsFilter.bind(this);

      this.onChangeSelectState = this.onChangeSelectState.bind(this);
      this.onCloseModal = this.onCloseModal.bind(this);

    }

    componentDidMount = () => {
      this.fetch();
    }

    onChange(e){
      this.setState({[e.target.name]:e.target.value});
    }

    onCloseModal = () => {
      this.setState({ filter_open:false});
    };

    onChangeSelectState(state){
      this.setState({state});
    }

    handleChangeUniversityFilter = (selectedOption) => {
      this.setState({ searchUniversity:selectedOption });
    }

    changeUniversityFilter(inputValue){
      var that =this;
      Request.RequestHandle('university?search='+inputValue,'GET',null,function(result) {
        that.setState({universityFilter:[]});          
        var universityFilter =[];
            result.data.results.map(item => { 
              universityFilter.push({
                'label':item.name,
                'value':item._id,
                });
            });
            that.setState({universityFilter});
        }); 
    }

    handleChangeCollegeFilter = (selectedOption) => {
      this.setState({ searchCollege:selectedOption });
    }

    changeCollegeFilter(inputValue){
      var that =this;
      Request.RequestHandle('college?search='+inputValue,'GET',null,function(result) {
    
          that.setState({collegeFilter:[]});          
          var collegeFilter =[];
              result.data.results.map(item => { 
                collegeFilter.push({
                  'label':item.name,
                  'value':item._id,
                  });
              });
              that.setState({collegeFilter});
    
        }); 
    }

    handleChangeCourseFilter = (selectedOption) => {
      this.setState({ searchCourse:selectedOption });
    }

    changeCourseFilter(inputValue){
      var that =this;
      Request.RequestHandle('course?search='+inputValue,'GET',null,function(result) {
        that.setState({courseFilter:[]});          
        var courseFilter =[];
            result.data.results.map(item => { 
              courseFilter.push({
                'label':item.name,
                'value':item._id,
                });
            });
            that.setState({courseFilter});
        }); 
    }

    handleChangeSpecializationsFilter = (selectedOption) => {
      this.setState({ searchSpecializations:selectedOption });
    }

    changeSpecializationsFilter(inputValue){
      var that =this;
      Request.RequestHandle('specializations?search='+inputValue,'GET',null,function(result) {
      
        if(result.status){
          that.setState({specializationsFilter:[]});          
          var specializationsFilter =[];
              result.data.results.map(item => { 
                specializationsFilter.push({
                  'label':item.name,
                  'value':item._id,
                  });
              });
              that.setState({specializationsFilter});
        }
        }); 
    }


    


    view() {

        const columns = [ {
          title: '',
          dataIndex: 'action',
          key: 'action',
          width: '6%',
        },
        // {
        //   title: 'Payment Status',
        //   dataIndex: 'status',
        //   key: 'status',
        //   filters: [
        //     { text: 'Paid', value: 'paid' },
        //     { text: 'Not Paid', value: 'not_paid' },
        //   ],
        //   width: '10%',
        // },
        // {
        //   title: 'Status',
        //   dataIndex: 'approved',
        //   key: 'approved',
        //   filters: [
        //     { text: 'Approved', value: 'approved' },
        //     { text: 'Not Approved', value: 'not_approved' },
        //   ],
        //   width: '10%',
        // }
        {
          title: 'Name',
          dataIndex: 'fname',
          key: 'fname',
          // ...CommonRequest.getColumnSearchProps('fname'),
        }, 
        // {
        //   title: 'Contact No',
        //   dataIndex: 'contact_no',
        //   key: 'contact_no',
        //   width: '15%',
        //   // ...CommonRequest.getColumnSearchProps('contact_no'),
        // }, 
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
          // ...CommonRequest.getColumnSearchProps('email'),
        }, {
          title: 'Number of Jobs Applied',
          dataIndex: 'jobs_applied',
          key: 'college',
          // ...CommonRequest.getColumnSearchProps('college'),
        },{
          title: 'Last Active',
          dataIndex: 'last_login',
          key: 'last_login',
          // ...CommonRequest.getColumnSearchProps('course'),
        }];

        
        return (
          <div className="content-body">
            <div className="row">
              <div className="col-12 col-xl-12">     
                <Table
                    columns={columns}
                    dataSource={this.state.dataSource}
                    pagination={this.state.pagination}
                    loading={this.state.loading}
                    onChange={this.handleTableChange}
                  />
              </div>  
            </div>
        </div>
        );
    
    }

    viewData(item){
      this.props.history.push({
        pathname: '/student/view/'+item._id,
        query: item
     })
    }


    editData(item){
      this.props.history.push({
        pathname: '/university/edit/'+item._id,
        query: item
     })
    }

    
    deleteData(id,key,status) {

      let payment = "not paid"; 
      if (status === "paid") {
        payment = "paid"
      } 
      swal({
        title: "Payment Status Change Confirmation",
        text: "Are you sure that you want to mark this student as "+payment+"?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          this.setState({
            isLoadedData: true,  
          });
          this.DeleteQuery(id,key,status);
          this.setState({
            isLoadedData: false,  
          });
        } else {
        }
      });
    }


    DeleteQuery = (id,key,status) => {
      this.deleteRows(id);
      var that  = this;
      const statusData ={
        status:status}
      Request.RequestHandle('students/payment_status/'+id,'POST', JSON.stringify(statusData),function(result){
        if (result.status) {
        var btn = <div > <Button variant="contained" className="active_button" color="primary" size="small" onClick={() => { that.deleteData(id ,key, 'not_paid') }} >paid</Button></div>
        if(status ==='not_paid'){
          btn = <div > <Button variant="contained" className="active_button" color="secondary" size="small" onClick={() => { that.deleteData(id,key,'paid') }}  >not paid</Button></div>
        }

        let dataSource = that.state.dataSource;
      
        dataSource.map((material,index) => { 
          if (material.key === key) {
            dataSource[index].status =btn;
          }
        })
        that.setState({ dataSource });

      }
      }); 
    }


    deleteRows = (id) => {
      let dataSource = this.state.dataSource.slice()
      dataSource = dataSource.filter(row => row._id !== id)
      this.setState({ dataSource })
    }

    DeleteResponse(result){
     if (result.status) {
       
     }
    }


      handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
          pagination: pager,
        });
        this.fetch({
          results: pagination.pageSize,
          page: pagination.current,
          sortField: sorter.field,
          sortOrder: sorter.order,
          ...filters,
        });
      }

    fetch = (params = {}) => {
      let payment_status = ""
      let approved_status = "";
      let submit_status="";

      if(this.props.location.search === "?approvel=pending"){
        approved_status = "&approved=not_approved";
        submit_status = "&is_submit=submit";

      }
    
      if(params.status !==undefined && params.status.length === 1 ){
        payment_status = "&paymentStatus="+params.status[0];
      }
      if(params.approved !==undefined && params.approved.length === 1 ){
        approved_status = "&approved="+params.approved[0];
      }
      let searchName = ""
      let searchContact = ""
      let searchEmail = ""

      if(params.fname !==undefined && params.fname.length === 1 ){
        searchName = "&search="+params.fname[0];
      } 
      if(params.contact_no !==undefined && params.contact_no.length === 1 ){
        searchContact = "&searchContact="+params.contact_no[0];
      } 
      if(params.email !==undefined && params.email.length === 1 ){
        searchEmail = "&searchEmail="+params.email[0];
      } 


      let searchUniversity = []
      let searchCollege = []
      let searchCourse = []
      let searchSpecializations = []
      let searchState = []

      if(this.state.searchUniversity !==undefined && this.state.searchUniversity.length !== 0 ){
        this.state.searchUniversity.map(item => { 
          searchUniversity.push(item.value);
            });
      } 

      if(this.state.searchCollege !==undefined && this.state.searchCollege.length !== 0 ){
        this.state.searchCollege.map(item => { 
          searchCollege.push(item.value);
            });
      } 

      if(this.state.searchCourse !==undefined && this.state.searchCourse.length !== 0 ){
        this.state.searchCourse.map(item => { 
          searchCourse.push(item.value);
            });
      } 

      if(this.state.searchSpecializations !==undefined && this.state.searchSpecializations.length !== 0 ){
        this.state.searchSpecializations.map(item => { 
          searchSpecializations.push(item.value);
            });
      } 

      if(this.state.state !==undefined && this.state.state.length !== 0 ){
        this.state.state.map(item => { 
          searchState.push(item.value);
            });
      } 

      let filter = {
        searchUni:searchUniversity,
        searchCollege:searchCollege,
        searchCourse:searchCourse,
        searchSpecialization:searchSpecializations,
        searchState:searchState,
      }

    
      this.setState({ loading: true });
      if(params.page === undefined){
        params.page = 1;
      }
      Request.RequestHandle('users/students/report?page='+params.page,'POST',JSON.stringify(filter),this.printData); 
    };

    onFilterOpenModal = () => {
      this.setState({ filter_open: true});
     };

     filterModel(){
      return( <Modal open={this.state.filter_open} onClose={this.onCloseModal} center>
       <Row>
         <Col>
           <Card>
           <CardBody>
           {/* <FormGroup row>
                       <Col md="3">
                         <Label htmlFor="email-input">Name:</Label>
                       </Col>
                       <Col xs="12" md="9">
                       <Input type="text"  id="searchName" name="searchName" value={this.state.searchName} onChange ={this.onChange} placeholder=""/>                     
                       </Col>
           </FormGroup> */}
           <FormGroup row>
                       <Col md="3">
                         <Label htmlFor="email-input">University:</Label>
                       </Col>
                       <Col xs="12" md="9">
                       <Select
                         value={this.state.searchUniversity}
                         onChange={this.handleChangeUniversityFilter}
                         onInputChange ={this.changeUniversityFilter}
                         options={this.state.universityFilter}
                         isSearchable
                         isMulti
                       />
                       </Col>
           </FormGroup>
           <FormGroup row>
                       <Col md="3">
                         <Label htmlFor="email-input">College:</Label>
                       </Col>
                       <Col xs="12" md="9">
                       <Select
                         value={this.state.searchCollege}
                         onChange={this.handleChangeCollegeFilter}
                         onInputChange ={this.changeCollegeFilter}
                         options={this.state.collegeFilter}
                         isSearchable
                         isMulti
                       />
                       </Col>
           </FormGroup>
           <FormGroup row>
                       <Col md="3">
                         <Label htmlFor="email-input">Course:</Label>
                       </Col>
                       <Col xs="12" md="9">
                       <Select
                         value={this.state.searchCourse}
                         onChange={this.handleChangeCourseFilter}
                         onInputChange ={this.changeCourseFilter}
                         options={this.state.courseFilter}
                         isSearchable
                         isMulti
                       />
                       </Col>
           </FormGroup>
           <FormGroup row>
                       <Col md="3">
                         <Label htmlFor="email-input">Specialization:</Label>
                       </Col>
                       <Col xs="12" md="9">
                       <Select
                         value={this.state.searchSpecializations}
                         onChange={this.handleChangeSpecializationsFilter}
                         onInputChange ={this.changeSpecializationsFilter}
                         options={this.state.specializationsFilter}
                         isSearchable
                         isMulti
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
                        placeholder ={"State"}
                        isSearchable
                        isMulti
                        />
                       </Col>
           </FormGroup>
           <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">number of jobs applied:</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="number"  id="job" name="job" value={this.state.job} onChange ={this.onChange} placeholder="number of jobs applied"/>
                      </Col>
            </FormGroup>
            <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">last active date:</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="date"  id="last_date" name="last_date" value={this.state.last_date} onChange ={this.onChange} placeholder="last active date"/>
                      </Col>
            </FormGroup>
           {/* <FormGroup row>
                       <Col md="3">
                         <Label htmlFor="email-input">Gender:</Label>
                       </Col>
                       <Col xs="12" md="9">
                       <Select
                         value={this.state.searchGender}
                         onChange={this.handleChangeGenderFilter}
                         options={[{
                                   'label':'Male',
                                   'value':'male',
                                   },{
                                   'label':"Female",
                                   'value':"female",
                                   }]}
                         isSearchable
                       />
                       </Col>
           </FormGroup>
           <FormGroup row>
               <Col md="3">
                 <Label htmlFor="email-input">Minimum Overall Grade:</Label>
               </Col>
               <Col xs="12" md="9">
               <InputGroup>
                           <InputGroupAddon addonType="prepend">Percentage</InputGroupAddon>
                           <Input placeholder="Minimum Percentage" name="min_overall_percentage" value={this.state.min_overall_percentage} onChange ={this.onChange}/>
                         </InputGroup>
                         <InputGroup>
                           <InputGroupAddon addonType="prepend">CGPA</InputGroupAddon>
                           <Input placeholder="Minimum CGPA" name="min_overall_cgpa" value={this.state.min_overall_cgpa} onChange ={this.onChange}/>
                         </InputGroup>
                         <InputGroup>
                           <InputGroupAddon addonType="prepend">Grade</InputGroupAddon>
                           <Input type="select" 
                             name="min_overall_grade" 
                             value={this.state.min_overall_grade}
                             onChange ={this.onChange}
                             >
                             <option></option>
                             {BaseApi.grades.map((material,index) => {
                               return <option value={material}>{material}</option>
                             })}
                           </Input>
                         </InputGroup>
               </Col>
           </FormGroup>
           <FormGroup row>
               <Col md="3">
                 <Label htmlFor="email-input">Graduated Year:</Label>
               </Col>
               <Col xs="12" md="9">
                 <Input type="text"  id="graduated_year" name="graduated_year" value={this.state.graduated_year} onChange ={this.onChange} placeholder=""/>
               </Col>
           </FormGroup>
           <FormGroup row>
                       <Col md="3">
                         <Label htmlFor="email-input">Age:</Label>
                       </Col>
                       <Col xs="12" md="9">
                       <InputRange
                         maxValue={100}
                         minValue={0}
                         value={this.state.value}
                         onChange={value => this.setState({ value })} />
                       </Col>
           </FormGroup> */}
           <hr/>
           <Button
             type="button"
             variant="contained"
             color="primary"
             className="left-margin rightbtn"
             onClick={() => {
               this.fetch();
             }}
           >
             Filter
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
       </Modal>)
     }

    printData(Result){
   this.onCloseModal();
      if(Result.status){
        let i= 1;
        var dataSource = [];
        Result.data.results.map(item => { 
          var init_i = i++;
          var btn = <div> <Button variant="contained" className="active_button" color="primary" size="small" onClick={() => { this.deleteData(item._id ,init_i, 'not_paid') }} >paid</Button></div>
          if(item.payment_status ==='not_paid'){
            btn = <div> <Button variant="contained" className="active_button" color="secondary" size="small" onClick={() => { this.deleteData(item._id,init_i,'paid') }}  >not paid</Button></div>
          }
          var college = '';
          if(item.college_doc.length > 0){
            college = item.college_doc[0].name
          }

          var course = '';
          if(item.course_doc.length > 0){
            course = item.course_doc[0].name
          }

          var approved = "Not Approved";
          if(item.is_approved === true){
            approved = "Approved"
          }

          // var last_login = "";
         
        
          if(item.last_login === undefined || item.last_login === null){
            item.last_login = {}
          }

          if(item.last_login.in_time !== undefined && item.last_login.in_time !== null){
            item.last_login.in_time = moment(item.last_login.in_time).format('LLLL')
          }else{
            item.last_login.in_time = ""
          }

          var phone =  "+91- "+item.contact_no;

          dataSource.push({
            'key':init_i,
            'fname':item.fname+' '+item.lname,
            'email':item.email,
            'contact_no':phone,
            'college':college,
            'course':course,
            'status':btn,
            'approved':approved,
            'last_login':item.last_login.in_time,
            'jobs_applied':item.number_of_jobs_applied,
            'action':<div >
            <Tooltip title="View">            
            <IconButton aria-label="View" color="primary" onClick={() => { this.viewData(item) }} ><FileIcon fontSize="small" /></IconButton>
            </Tooltip>
            </div>            
                    });
        });
        const pagination = { ...this.state.pagination };
        // Read total count from server
        // pagination.total = data.totalCount;
        pagination.total = Result.data.count;
        pagination.pageSize = Result.data.pagesize;
      this.setState({  loading: false,dataSource,pagination }); 
   
      }
    }

  render() {
    let that = this;
    const list =  {
      items: [{
          primaryText: 'Filter',
          rightAvatar: <Avatar backgroundColor={blue500} icon={<FilterListIcon />} />,
          onClick() {
            that.onFilterOpenModal()
          },
        }]
      };

const listbutton =<BubbleList>
            <BubbleListItem {...list.items[0]} />
            </BubbleList>;


const floatingActionButtonProps =
              {
              backgroundColor: blue500
              };


    return (
      <div className="animated fadeIn">
       <div className="title-bar" id="title-cont">
             Students Report
        </div>
            {this.view()}
            {this.filterModel()}
            <MuiThemeProvider>
              <SpeedDial
              hasBackdrop={false}
              icon={<MoreVert />}
              floatingActionButtonProps={floatingActionButtonProps}
              className ="flotingBtn"
              onChange ={()=>{this.onFilterOpenModal()}}
              >
              {listbutton}
              </SpeedDial>
              </MuiThemeProvider>
      </div>
    )
  }
}
