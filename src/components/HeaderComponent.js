import React, { Component } from 'react';
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, Jumbotron } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import LanguageSelect from './LanguageSelectComponent';

class Header extends Component {
    constructor(props) {
        super(props);
    
        this.toggleNav = this.toggleNav.bind(this);
        this.state = {
          isNavOpen: false
        };
      }

    toggleNav() {
        this.setState({
          isNavOpen: !this.state.isNavOpen
        });
    }

    render() {
        const {t} = this.props;
        return(
            <div className="mb-5">
                <Navbar dark expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto" href="/"><img src='assets/images/logo.png' height="30" width="41" alt='Smart Pick' /></NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className="nav-link"  to='/home'><span className="fa fa-home fa-lg"></span> {t("home")}</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link"  to='/smartpick'><span className="fa fa-list-ol fa-lg"></span> {t("smart_pick")}</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to='/contactus'><span className="fa fa-address-card fa-lg"></span> {t("contact_us")}</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to='/aboutus'><span className="fa fa-info fa-lg"></span> {t("about_us")}</NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                        <div className="language-select">
                            <LanguageSelect/>
                        </div>
                    </div>
                </Navbar>
            </div>
        );
    }
}

export default withTranslation()(Header);