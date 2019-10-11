import React, { Component } from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav } from 'reactstrap';
import PropTypes from 'prop-types';
import {  AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo-text.png';
import sygnet from '../../assets/img/brand/sygnet.svg'
import AuthService from '../../components/AuthService';
import BaseApi from '../../components/BaseApi';
const Auth = new AuthService();

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  constructor(props) {
    super(props);
    this.onLogout = this.onLogout.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }
  componentDidMount = () => {
    console.log('====================================');
    console.log(Date.now());
    console.log('====================================');
    if (!Auth.loggedIn()) {
      Auth.logout();
      window.location.replace(BaseApi.home_url+"?status=logout");
    }   
  }

  onLogout(e){
    Auth.logout();
    
    try
    {
      window.location.replace(BaseApi.home_url+"?status=logout");
    }
    catch(err){}
    window.location.replace(BaseApi.home_url+"?status=logout");

  }


  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;
    console.log('====================================');
    console.log(Auth.getProfile());
    console.log('====================================');
    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 150, height: 30, alt: 'Job Portal' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'Job Portal' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="ml-auto" navbar>
        <AppHeaderDropdown direction="down">
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle nav> 
             <a target='#'  className="name">{Auth.getProfile().name}</a>
              <img src="assets/img/logo_d.png" className="img-avatar" alt="USER" /> 
             </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              <DropdownItem><i className="fa fa-user"></i><a href="#/profile" >Profile</a></DropdownItem>
              <DropdownItem onClick={e => this.onLogout(e)}><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu>
            </Dropdown>
          </AppHeaderDropdown>
        </Nav>
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}



DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
