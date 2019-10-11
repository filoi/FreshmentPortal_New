import React, { Component } from 'react'
import { SpeedDial, BubbleList, BubbleListItem } from 'react-speed-dial';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Avatar from 'material-ui/Avatar';
import "antd/dist/antd.css";
import withAuth from '../../components/withAuth';
import AuthService from '../../components/AuthService';
import RequestHandle from '../../components/RequestHandle';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import FileIcon from '@material-ui/icons/Assignment';
import EditIcon from '@material-ui/icons/Edit';
import MoreVert from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import createHistory from 'history/createBrowserHistory'
import swal from 'sweetalert'
import IconAdd from 'material-ui/svg-icons/content/add';
import { blue500,red600 } from 'material-ui/styles/colors';
import { red500 } from 'material-ui/styles/colors';
import Common from '../../components/Common';

import {
  Table, Input, Button, Icon, Tooltip,
} from 'antd';
import Highlighter from 'react-highlight-words';

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
         if(params.page === undefined){
           params.page = 1;
         }
         let searchName = ""
         let searchCode = ""
         let searchMarkingCriteria = ""
         let searchAcademicTerm = ""
   
         if(params.name !==undefined && params.name.length === 1 ){
           searchName = "&search="+params.name[0];
         } 
         if(params.code !==undefined && params.code.length === 1 ){
           searchCode = "&searchCode="+params.code[0];
         } 
        //  if(params.marking_criteria !==undefined && params.marking_criteria.length === 1 ){
        //    searchMarkingCriteria = "&searchMarkingCriteria="+params.marking_criteria[0];
        //  } 
        //  if(params.academic_term !==undefined && params.academic_term.length === 1 ){
        //    searchAcademicTerm = "&searchAcademicTerm="+params.academic_term[0];
        //  } 
         Request.RequestHandle('specializations?page='+params.page+searchName+searchCode,'GET',null,this.printData); 
       };
   

    printData(Result){
    
      if(Result.status){
        let i= 1;
        var dataSource = [];
        Result.data.results.map(item => { 
          dataSource.push({
            'key':i++,
            'name':item.name,
            'code':item.code,
            'status':item.status,
            'action':<div>
             <Tooltip title="Edit">
            <IconButton aria-label="Delete" color="primary" onClick={() => { this.editData(item) }} ><EditIcon fontSize="small" /></IconButton>
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
        pagination.total = Result.data.count;
        pagination.pageSize =Result.data.pagesize;
        this.setState({  loading: false,dataSource,pagination });
      }

    }

    Add() {
      if (Auth.access("CAN_ADD_UNIVERSITIES")) {
    const list =  {
          items: [
           
            {
              primaryText: 'Add',
              rightAvatar: <Avatar backgroundColor={blue500} icon={<IconAdd />} />,
              href: '#/specialization/add',
            }
          ],
        }
    
    const listbutton =
        <BubbleList>
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

    view(columns) {
      if (Auth.access("CAN_VIEW_UNIVERSITIES")) {
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
        pathname: '/specialization/view/'+item._id,
        query: item
     })
    }


    editData(item){
     
      this.props.history.push({
        pathname: '/specialization/edit/'+item._id,
        query: item
     })
    }

    
    deleteData(id) {

      swal({
        title: "Delete Confirmation",
        text: "Are you sure that you want to delete this Specialization?",
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
      Request.RequestHandle('specializations/'+id,'DELETE',null,this.DeleteResponse); 
    }


  deleteRows = (id) => {
    let dataSource = this.state.dataSource;
    dataSource.splice(id, 1);
      this.setState({dataSource});
  }

  DeleteResponse(response){
  }

  

render() {   
const columns = [ {
  title: 'Action',
  dataIndex: 'action',
  key: 'action',
  width: '150px',
},{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  ...CommonRequest.getColumnSearchProps('name'),
}, {
  title: 'Code',
  dataIndex: 'code',
  key: 'code',
  ...CommonRequest.getColumnSearchProps('code'),
}, {
  title: 'Status',
  dataIndex: 'status',
  key: 'status',
  ...CommonRequest.getColumnSearchProps('status'),
}];

    return (
      <div className="animated fadeIn">
       <div className="title-bar" id="title-cont">
                Manage Specializations
        </div>
            {this.view(columns)}
            {this.Add()}
      </div>
    )
  }
}
