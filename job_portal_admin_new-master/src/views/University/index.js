import React, { Component } from 'react'
import { SpeedDial, BubbleList, BubbleListItem } from 'react-speed-dial';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Avatar from 'material-ui/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FileIcon from '@material-ui/icons/Assignment';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import swal from 'sweetalert';
import IconAdd from 'material-ui/svg-icons/content/add';
import { blue500 } from 'material-ui/styles/colors';
import MoreVert from '@material-ui/icons/MoreVert';
import {Table} from 'antd';
import "antd/dist/antd.css";
import withAuth from '../../components/withAuth';
import AuthService from '../../components/AuthService';
import RequestHandle from '../../components/RequestHandle';
import Common from '../../components/Common';
import Tooltip from '@material-ui/core/Tooltip';
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
                      href: '#/university/add',
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
          width: '150px',
        },{
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          // sorter: true,
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
        }, {
          title: 'Website',
          dataIndex: 'website',
          key: 'website',
          ...CommonRequest.getColumnSearchProps('website'),
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
        pathname: '/university/view/'+item._id,
        query: item
     })
    }

    editData(item){
      this.props.history.push({
        pathname: '/university/edit/'+item._id,
        query: item
     })
    }

    deleteData(id) {

      swal({
        title: "Delete Confirmation",
        text: "Are you sure that you want to delete this University?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          this.setState({
            isLoadedData: true,  
          });
          this.DeleteQuery(id);
          this.setState({
            isLoadedData: false,  
          });
        } else {
        }
      });
    }


    DeleteQuery = (id) => {
      this.deleteRows(id);
      Request.RequestHandle('university/'+id,'DELETE',null,this.DeleteResponse); 
    }


    deleteRows = (id) => {
      let dataSource = this.state.dataSource;
      dataSource.splice(id, 1);
        this.setState({dataSource});
    }

    DeleteResponse(){

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

      let searchName = ""
      let searchContact = ""
      let searchEmail = ""
      let searchWebsite = ""
      let sortName = ""
      let sortContact = ""
      let sortEmail = ""
      this.setState({ loading: true });
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
      if(params.website !==undefined && params.website.length === 1 ){
        searchWebsite = "&searchWebsite="+params.website[0];
      } 

      // if(params.sortField !==undefined && params.sortOrder !==undefined){
        
      //   searchWebsite = "&searchWebsite="+params.website[0];
      // } 

      Request.RequestHandle('university?page='+params.page+searchName+searchContact+searchEmail+searchWebsite,'GET',null,this.printData); 
    };

    printData(Result){
    
      if(Result.status){
        let i= 1;
        var dataSource = [];
        Result.data.results.map(item => {
          var phone_number =  "+91- "+item.contact_no
          dataSource.push({
            'key':i++,
            'name':item.name,
            'email':item.email,
            'contact_no':phone_number,
            'website':item.website,
            'action':<div>
            <Tooltip title="Edit">
            <IconButton aria-label="Edit" color="primary" onClick={() => { this.editData(item) }} ><EditIcon fontSize="small" /></IconButton>
            </Tooltip>
            <Tooltip title="View">
            <IconButton aria-label="View" color="primary" onClick={() => { this.viewData(item) }} ><FileIcon fontSize="small" /></IconButton>
            </Tooltip>
            {/* <Tooltip title="Delete">
            <IconButton aria-label="Delete" color="secondary" onClick={() => { this.deleteData(item._id) }} ><DeleteIcon fontSize="small" /></IconButton>
            </Tooltip> */}
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
                Manage Universities
        </div>
            {this.view()}
            {this.Add()}
      </div>
    )
  }
}
