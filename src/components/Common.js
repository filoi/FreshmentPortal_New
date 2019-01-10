import React from 'react'
import {
     Input, Button, Icon,
  } from 'antd';
  import Highlighter from 'react-highlight-words';

export default class Common {
    constructor() {
        this.state = {
            searchText:""  
        }
      this.handleSearch = this.handleSearch.bind(this);
      this.handleReset = this.handleReset.bind(this);
       
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
       
      })

      handleSearch = (selectedKeys, confirm) => {
          console.log('====================================');
          console.log(this.state.searchText);
          console.log('====================================');
        // this.setState({ searchText: selectedKeys[0] });
        confirm();
      }
    
      handleReset = (clearFilters) => {
        clearFilters();
        // this.setState({ searchText: '' });
      }
}