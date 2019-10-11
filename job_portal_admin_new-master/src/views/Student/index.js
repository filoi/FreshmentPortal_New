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
        loading: false  
      }
      this.printData = this.printData.bind(this);
      this.deleteRows = this.deleteRows.bind(this);
    }

    componentDidMount = () => {
      this.fetch();
    }


  

    view() {

        const columns = [ {
          title: 'Action',
          dataIndex: 'action',
          key: 'action',
          width: '6%',
        },{
          title: 'Payment Status',
          dataIndex: 'status',
          key: 'status',
          filters: [
            { text: 'Paid', value: 'paid' },
            { text: 'Not Paid', value: 'not_paid' },
          ],
          width: '10%',
        },{
          title: 'Status',
          dataIndex: 'approved',
          key: 'approved',
          filters: [
            { text: 'Approved', value: 'approved' },
            { text: 'Not Approved', value: 'not_approved' },
          ],
          width: '10%',
        },{
          title: 'Name',
          dataIndex: 'fname',
          key: 'fname',
          ...CommonRequest.getColumnSearchProps('fname'),
        }, {
          title: 'Contact No',
          dataIndex: 'contact_no',
          key: 'contact_no',
          width: '15%',
          ...CommonRequest.getColumnSearchProps('contact_no'),
        }, {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
          ...CommonRequest.getColumnSearchProps('email'),
        }, {
          title: 'College',
          dataIndex: 'college',
          key: 'college',
          ...CommonRequest.getColumnSearchProps('college'),
        },{
          title: 'Course',
          dataIndex: 'course',
          key: 'course',
          ...CommonRequest.getColumnSearchProps('course'),
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
     
      this.setState({ loading: true });
      if(params.page === undefined){
        params.page = 1;
      }
      Request.RequestHandle('students?page='+params.page+payment_status+approved_status+searchName+searchContact+searchEmail+submit_status,'GET',null,this.printData); 
    };

    printData(Result){
   
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
    return (
      <div className="animated fadeIn">
       <div className="title-bar" id="title-cont">
                Manage Students
        </div>
            {this.view()}
      </div>
    )
  }
}
