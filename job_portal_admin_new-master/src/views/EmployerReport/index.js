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
import Modal from 'react-responsive-modal';
import Profile from './student_profile_popup';

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
        searchEmployer:'',
        employerFilter:[], 
        filter_open:false,
        studentData:[],

      }
      this.printData = this.printData.bind(this);
      this.deleteRows = this.deleteRows.bind(this);

      this.handleChangeEmployerFilter = this.handleChangeEmployerFilter.bind(this);
      this.changeEmployerFilter = this.changeEmployerFilter.bind(this);
      this.onCloseModal = this.onCloseModal.bind(this);

    }

    componentDidMount = () => {
      // this.fetch();
    }

    onCloseModal = () => {
      this.setState({ filter_open:false});
    };

    handleChangeEmployerFilter = (selectedOption) => {
      this.setState({ searchEmployer:selectedOption });
      this.fetch(selectedOption.value,{});
    }

    changeEmployerFilter(inputValue){
      var that =this;
      Request.RequestHandle('employer?search='+inputValue,'GET',null,function(result) {
        that.setState({employerFilter:[]});          
        var employerFilter =[];
            result.data.results.map(item => { 
              employerFilter.push({
                'label':item.name,
                'value':item._id,
                });
            });
            that.setState({employerFilter});
        }); 
    }

   

    Add() {
      if (Auth.access("CAN_ADD_UNIVERSITIES")) {
      const list =  {
                  items: [{
                      primaryText: 'Add',
                      rightAvatar: <Avatar backgroundColor={blue500} icon={<IconAdd />} />,
                      href: '#/employee/add',
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
            <MuiThemeProvider>
            <SpeedDial
            hasBackdrop={false}
            icon={<MoreVert />}
            floatingActionButtonProps={floatingActionButtonProps}
            className ="flotingBtn"
            >
            {listbutton}
            </SpeedDial>
            </MuiThemeProvider>
              );
      }else{
        return "";
      }
    }

    view() {

      if (Auth.access("CAN_VIEW_UNIVERSITIES")) {
        const columns = [ 
        {
          title: 'Vacancy',
          dataIndex: 'name',
          key: 'name',
          width: '20%',
          // ...CommonRequest.getColumnSearchProps('name'),
        }, {
          title: 'Number Of Invited',
          dataIndex: 'number_of_job',
          key: 'number_of_job',
         
          // ...CommonRequest.getColumnSearchProps('contact_no'),
        }, {
          title: 'Number Of Invite accepted',
          dataIndex: 'number_of_closed_job',
          key: 'number_of_closed_job',
          // ...CommonRequest.getColumnSearchProps('email'),
        }, {
          title: 'Number Of Selected',
          dataIndex: 'ctc_offered',
          key: 'ctc_offered',
          // ...CommonRequest.getColumnSearchProps('industry'),
        }];

       
        
        return (
          <div className="content-body">
           <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="email-input">Employer:-</Label>
                      </Col>
                      <Col xs="12" md="9">
                      <Select
                         value={this.state.searchEmployer}
                         onChange={this.handleChangeEmployerFilter}
                         onInputChange ={this.changeEmployerFilter}
                         options={this.state.employerFilter}
                         isSearchable
                       />
                      </Col>
          </FormGroup>
            <div className="row">
            
           
               
              <div className="col-12 col-xl-12">    
              {this.state.dataSource.length !==0 ?
                 <Table
                    columns={columns}
                    dataSource={this.state.dataSource}
                    pagination={this.state.pagination}
                    loading={this.state.loading}
                    onChange={this.handleTableChange}

                  />
              :
              "Not Found"
              } 
              </div>  
            </div>
        </div>
        );
      }else{
        return "";
      }
    }

    viewData(item){
      this.props.history.push({
        pathname: '/employee/view/'+item._id,
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

      swal({
        title: "Status Change Confirmation",
        text: "Are you sure that you want to "+status+" this Employer?",
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
      Request.RequestHandle('employer/change_status/'+id,'POST', JSON.stringify(statusData),function(result){
        if (result.status) {
        var btn = <div><Button variant="contained" className="active_button" color="primary" size="small" onClick={() => { that.deleteData(id ,key, 'inactive') }} >active</Button></div>
        if(status ==='inactive'){
          btn = <div><Button variant="contained" className="active_button" color="secondary" size="small" onClick={() => { that.deleteData(id,key,'active') }}  >inactive</Button></div>
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
        let id = "";
        if(this.state.searchEmployer !=="" && this.state.searchEmployer !==undefined ){
          id= this.state.searchEmployer.value;
        }
        this.fetch(id,{
          results: pagination.pageSize,
          page: pagination.current,
          sortField: sorter.field,
          sortOrder: sorter.order,
          ...filters,
        });
      }

    fetch = (id,params = {}) => {
   
     
      if(params.page === undefined){
        params.page = 1;
      }
        
      Request.RequestHandle('users/employer/'+id+'?page='+params.page,'GET',null,this.printData); 
    };

    printData(Result){
     
      if(Result.status){
        let i= 1;
        var dataSource = [];
        Result.data.results.map(item => { 
          var init_i = i++;
          var btn = <div > <Button variant="contained" className="active_button" color="primary" size="small" onClick={() => { this.deleteData(item._id ,init_i, 'inactive') }} >active</Button></div>
          if(item.status ==='inactive'){
            btn = <div> <Button variant="contained" className="active_button" color="secondary" size="small" onClick={() => { this.deleteData(item._id,init_i,'active') }}  >inactive</Button></div>
          }

          var phone_number = '+91- '+item.contact_no

            let ctc = item.min_ctc;
          if(item.max_ctc !== null){
             ctc = ctc+','+item.min_ctc;
          }

          let name = <a className="link" href  onClick={()=>{this.onFilterOpenModal(item._id)}}>{item.job_title}</a> 
        
          dataSource.push({
            'key':init_i,
            'name':name,
            'number_of_job':item.invited,
            'number_of_closed_job':item.invite_accept,
            'ctc_offered':item.offered,
           

                    });
        });
        const pagination = { ...this.state.pagination };
        // Read total count from server
        // pagination.total = data.totalCount;
        pagination.total = Result.data.count;
        pagination.pageSize = Result.data.count/Result.data.pages;
      this.setState({  loading: false,dataSource,pagination }); 
     
      }
    }

    onFilterOpenModal = (id) => {
      var that = this;
      Request.RequestHandle('users/vacancy/'+id+'/offer','GET',null,function(Result){
     
        if(Result.status && Result.data.results.length !==0){
          let studentData =[];
          let i = 0;

          Result.data.results.map(item => { 
            var init_i = i++;
            var name = item.fname+' '+item.lname;
            studentData.push({
              'key':init_i,
              'name':name,
              'email':item.email,
              'contact_no':'+91-'+item.contact_no,
                      });
          });
          that.setState({studentData}); 


        }

      }); 
      this.setState({ filter_open: true});
     };

    filterModel(){

      const columns2 = [ 
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          width: '30%',
          // ...CommonRequest.getColumnSearchProps('name'),
        }, {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
         
          // ...CommonRequest.getColumnSearchProps('contact_no'),
        }, {
          title: 'Contact Number',
          dataIndex: 'contact_no',
          key: 'contact_no',
          // ...CommonRequest.getColumnSearchProps('email'),
        }];


      return( <Modal open={this.state.filter_open} onClose={this.onCloseModal} center>
       <Row>
         <Col>
           <Card>
           <CardBody>
           <CardTitle>Selected Students</CardTitle>
           <Table
                    columns={columns2}
                    dataSource={this.state.studentData}
                    // pagination={this.state.pagination}
                    loading={this.state.loading}
                    // onChange={this.handleTableChange}

                  />
         </CardBody>
           </Card>
         </Col>
       </Row>
       </Modal>)
     }


  render() { 
    return (
      <div className="animated fadeIn">
       <div className="title-bar" id="title-cont">
                 Employer Report
        </div>
            {this.view()}
            {this.filterModel()}
      </div>
    )
  }
}
