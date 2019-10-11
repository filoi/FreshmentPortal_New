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
        const columns = [ {
          title: 'Action',
          dataIndex: 'action',
          key: 'action',
          width: '5%',
        },{
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
          width: '10px',
        },{
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          ...CommonRequest.getColumnSearchProps('name'),
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
        }, 
        // {
        //   title: 'Industry',
        //   dataIndex: 'industry',
        //   key: 'industry',
        //   ...CommonRequest.getColumnSearchProps('industry'),
        // },
        {
          title: 'Company Name',
          dataIndex: 'hr_name',
          key: 'hr_name',
          ...CommonRequest.getColumnSearchProps('hr_name'),
        },{
          title: 'State',
          dataIndex: 'state',
          key: 'state',
          ...CommonRequest.getColumnSearchProps('state'),
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
        this.fetch({
          results: pagination.pageSize,
          page: pagination.current,
          sortField: sorter.field,
          sortOrder: sorter.order,
          ...filters,
        });
      }

    fetch = (params = {}) => {
    
      this.setState({ loading: true });
      let searchName = ""
      let searchContact = ""
      let searchEmail = ""
      let searchIndustry = ""
      let searchHrname = ""
      let searchState = ""
      if(params.page === undefined){
        params.page = 1;
      }
      if(params.name !==undefined && params.name.length === 1 ){
        searchName = "&search="+params.name[0];
      } 
      if(params.contact_no !==undefined && params.contact_no.length === 1 ){
        searchContact = "&searchContact="+params.contact_no[0];
      } 
      if(params.email !==undefined && params.email.length === 1 ){
        searchEmail = "&searchEmail="+params.email[0];
      } 
      if(params.industry !==undefined && params.industry.length === 1 ){
        searchIndustry = "&searchIndustry="+params.industry[0];
      } 
      
      if(params.hr_name !==undefined && params.hr_name.length === 1 ){
        searchHrname = "&searchHrname="+params.hr_name[0];
      } 

      if(params.state !==undefined && params.state.length === 1 ){
        searchState = "&searchState="+params.state[0];
      } 

      Request.RequestHandle('employer?page='+params.page+searchContact+searchName+searchEmail+searchIndustry+searchHrname+searchState,'GET',null,this.printData); 
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

          dataSource.push({
            'key':init_i,
            'name':item.name,
            'email':item.email,
            'contact_no':phone_number,
            'industry':item.industry,
            'hr_name':item.hr_name,
            'state':item.state,
            'status':btn,
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
        pagination.pageSize = Result.data.count/Result.data.pages;
      this.setState({  loading: false,dataSource,pagination }); 
     
      }
    }

  render() { 
    return (
      <div className="animated fadeIn">
       <div className="title-bar" id="title-cont">
                Manage Employer
        </div>
            {this.view()}
            {this.Add()}
      </div>
    )
  }
}
