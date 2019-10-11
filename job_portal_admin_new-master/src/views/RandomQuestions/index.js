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
import MoreVert from '@material-ui/icons/MoreVert';
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
      if (Auth.access("CAN_ADD_COURSES")) {
      const list =  {
                  items: [{
                      primaryText: 'Add',
                      rightAvatar: <Avatar backgroundColor={blue500} icon={<IconAdd />} />,
                      href: '#/questions/add',
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
        const columns = [ {
          title: 'Action',
          dataIndex: 'action',
          key: 'action',
          width: '150px',
        },{
          title: 'Question',
          dataIndex: 'question',
          key: 'question',
          ...CommonRequest.getColumnSearchProps('question'),
        }, {
          title: 'Answers',
          dataIndex: 'answers',
          key: 'answers',
          width: '30%',
        }, {
          title: 'Topic',
          dataIndex: 'category',
          key: 'category',
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
        pathname: '/questions/view/'+item._id,
        query: item
     })
    }


    editData(item){
     
      this.props.history.push({
        pathname: '/questions/edit/'+item._id,
        query: item
     })
    }

    
    deleteData(id) {

      swal({
        title: "Delete Confirmation",
        text: "Are you sure that you want to delete this course?",
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
         /// window.location.reload();


        } else {
        }
      });
    }


    DeleteQuery = (id) => {
      this.deleteRows(id);
      Request.RequestHandle('course/'+id,'DELETE',null,this.DeleteResponse); 
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
      this.setState({ loading: true });
      let question = ""

      if(params.page === undefined){
        params.page = 1;
      }
      if(params.question !==undefined && params.question.length === 1 ){
        question = "&search="+params.question[0];
      }
      Request.RequestHandle('question?page='+params.page+question,'GET',null,this.printData); 
    };

    printData(Result){
   
      if(Result.status){
        let i= 1;
        var dataSource = [];
        Result.data.results.map(item => { 
          var str = <p></p>;
          var str = item.ans.replace(/&&/g, ',');
          // var ans = item.ans.split('&&');
          // var currect_ans = item.correct_ans.split('&&');
          // ans.map((val)=>{
          //   var select_ans = "";
          //   if(currect_ans.indexOf(val) !== -1 ){
          //     select_ans = <a href className="ans">val</a>
          //   }else{
          //     select_ans = <a href className="ans">val</a>
          //   }
          //   str = str+select_ans'
          // }); 
            
          
          dataSource.push({
            'key':i++,
            'question':item.question,
            'answers':str,
            'category':item.topic,
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
        // Read total count from server
        // pagination.total = data.totalCount;
        pagination.total = Result.data.count;
        pagination.pageSize =Result.data.pageSize;
       // pagination.pageSize = Result.data.count/Result.data.pages;
      this.setState({  loading: false,dataSource,pagination }); 
     
      }
    }

  render() { 
    return (
      <div className="animated fadeIn">
       <div className="title-bar" id="title-cont">
                Manage Random Questions
        </div>
            {this.view()}
            {this.Add()}
      </div>
    )
  }
}
