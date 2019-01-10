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
import DeleteIcon from '@material-ui/icons/Delete';
import createHistory from 'history/createBrowserHistory'
import swal from 'sweetalert'
import IconAdd from 'material-ui/svg-icons/content/add';
import { blue500,red600 } from 'material-ui/styles/colors';
import { red500 } from 'material-ui/styles/colors';
import {
  Table, Input, Button, Icon,
} from 'antd';
import Highlighter from 'react-highlight-words';

const history = createHistory();
const Auth = new AuthService();
const Request = new RequestHandle();




  export default class University extends withAuth(Component) {
    constructor(props) {
      super(props);
      this.state = {
        dataSource: []  
      }
      this.printData = this.printData.bind(this);
      this.deleteRows = this.deleteRows.bind(this);
    }

    componentDidMount = () => {
      Request.RequestHandle('specializations','GET',null,this.printData); 
    }

    printData(Result){
     console.log('====================================');
     console.log(Result);
     console.log('====================================');
      if(Result.status){
        let i= 1;
        var dataSource = [];
        Result.data.results.map(item => { 
          dataSource.push({
            'key':i++,
            'name':item.name,
            'code':item.code,
            'status':item.status,
            'action':<div><IconButton aria-label="Delete" color="primary" onClick={() => { this.editData(item) }} ><EditIcon fontSize="small" /></IconButton><IconButton aria-label="Delete" color="primary" onClick={() => { this.viewData(item) }} ><FileIcon fontSize="small" /></IconButton><IconButton aria-label="Delete" color="secondary" onClick={() => { this.deleteData(item._id) }} ><DeleteIcon fontSize="small" /></IconButton></div>
                    });
        });
        console.log('====================================');
        console.log(dataSource);
        console.log('====================================');
      this.setState({ dataSource });
        
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
                <Table dataSource={this.state.dataSource} columns={columns} />
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
    let dataSource = this.state.dataSource.slice()
    dataSource = dataSource.filter(row => row._id !== id)
    this.setState({ dataSource })
  }

  DeleteResponse(response){
    console.log(response);
  }

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys, selectedKeys, confirm, clearFilters,
    }) => (
      <div className="custom-filter-dropdown">
        <Input
          ref={node => { this.searchInput = node; }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: (text) => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ),
  })

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  }

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: '' });
  }

  render() { 

    
const columns = [ {
  title: 'Action',
  dataIndex: 'action',
  key: 'action',
},{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  ...this.getColumnSearchProps('name'),
}, {
  title: 'Code',
  dataIndex: 'code',
  key: 'code',
  ...this.getColumnSearchProps('code'),
}, {
  title: 'Status',
  dataIndex: 'status',
  key: 'status',
  ...this.getColumnSearchProps('status'),
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
