import React, {Component} from 'react';
import Home from './HomeComponent';
import About from './AboutComponent';
import SmartPick from './SmartPickComponent';
import Contact from './ContactComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect } from 'react-router-dom';

class Main extends Component {
    render() {
      return (
        <div>
          <Header/>
          <Switch>
              <Route path='/home' component={Home} />
              <Route exact path='/smartpick' component={SmartPick} />} />
              <Route exact path='/contactus' component={Contact} />} />
              <Route exact path='/aboutus' component={About} />} />
              <Redirect to="/home" />
          </Switch>
          <Footer/>
        </div>
        )
    }
}

export default Main;