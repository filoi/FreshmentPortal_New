import React, { Component } from 'react'
import { SpeedDial, BubbleList, BubbleListItem } from 'react-speed-dial';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Avatar from 'material-ui/Avatar';
import "antd/dist/antd.css";
import IconButton from '@material-ui/core/IconButton';
import FileIcon from '@material-ui/icons/Assignment';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import swal from 'sweetalert'
import IconAdd from 'material-ui/svg-icons/content/add';
import { blue500 } from 'material-ui/styles/colors';
import {Table} from 'antd';
import withAuth from '../../components/withAuth';
import AuthService from '../../components/AuthService';
import RequestHandle from '../../components/RequestHandle';
import Common from '../../components/Common';
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
        page:'',  
      }
      this.printData = this.printData.bind(this);
      this.deleteRows = this.deleteRows.bind(this);
    }

    componentDidMount = () => {
      this.fetch();
    }

   

    Add() {
      if (Auth.access("CAN_ADD_SPECIALIZATIONS")) {
      const list =  {
                  items: [{
                      primaryText: 'Add',
                      rightAvatar: <Avatar backgroundColor={blue500} icon={<IconAdd />} />,
                      href: '#/specialization/add',
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

      if (Auth.access("CAN_VIEW_SPECIALIZATIONS")) {
        const columns = [ {
          title: 'Action',
          dataIndex: 'action',
          key: 'action',
          width: '16%',
        },{
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          ...CommonRequest.getColumnSearchProps('name'),
        }, {
          title: 'Code',
          dataIndex: 'code',
          key: 'code',
          width: '35%',
          ...CommonRequest.getColumnSearchProps('code'),
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
        pathname: '/specialization/view/'+item._id,
        query: item
     })
    }


    editData(item){
      console.log('====================================');
      console.log(item);
      console.log('====================================');
      this.props.history.push({
        pathname: '/specialization/edit/'+item._id,
        query: item
     })
    }

    
    deleteData(id) {

      swal({
        title: "Delete Confirmation",
        text: "Are you sure that you want to delete this specializations?",
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
    let dataSource = this.state.dataSource.slice()
    dataSource = dataSource.filter(row => row._id !== id)
    this.setState({ dataSource })
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
      console.log('params:', params);
      this.setState({ loading: true });
      if(params.page === undefined){
        params.page = 1;
      }
      Request.RequestHandle('specializations?page='+params.page,'GET',null,this.printData); 
    };

    printData(Result){
      console.log('====================================');
      console.log(Result.data.pages);
      console.log('====================================');
      if(Result.status){
        let i= 1;
        var dataSource = [];
        Result.data.results.map(item => { 
          dataSource.push({
            'key':i++,
            'name':item.name,
            'code':item.code,
            'action':<div><IconButton aria-label="Delete" color="primary" onClick={() => { this.editData(item) }} ><EditIcon fontSize="small" /></IconButton><IconButton aria-label="Delete" color="primary" onClick={() => { this.viewData(item) }} ><FileIcon fontSize="small" /></IconButton><IconButton aria-label="Delete" color="secondary" onClick={() => { this.deleteData(item._id) }} ><DeleteIcon fontSize="small" /></IconButton></div>
                    });
        });
        const pagination = { ...this.state.pagination };
        // Read total count from server
        // pagination.total = data.totalCount;
        pagination.total = Result.data.count;
        pagination.pageSize = 10;
      this.setState({  loading: false,dataSource,pagination,page:Result.data.pages }); 
      console.log('====================================');
      console.log(this.state.pagination);
      console.log('====================================');
      }
    }

  render() { 
    return (
      <div className="animated fadeIn">
       <div className="title-bar" id="title-cont">
                Manage Specializations
        </div>
            {this.view()}
            {this.Add()}
      </div>
    )
  }
}
