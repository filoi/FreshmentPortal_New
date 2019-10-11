import React from 'react'
import RequestHandle from './RequestHandle';
import {Input, Button, Icon} from 'antd';
import Highlighter from 'react-highlight-words';

const Request = new RequestHandle();

export default class Common {
    constructor(search,data) {
        this.state = {
            searchText:search||'',
            data:data || []  
        }
      this.handleSearch = this.handleSearch.bind(this);
      this.handleReset = this.handleReset.bind(this);
      this.newState = this.newState.bind(this);
       
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
         
        // this.setState({ searchText: selectedKeys[0] });

        confirm();
      }
    
      handleReset = (clearFilters) => {
        clearFilters();
        // this.setState({ searchText: '' });
      }

      newState(){

      }
}