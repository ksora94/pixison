import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import SubMenu from './SubMenu';
import OptionSetting from './OptionSetting';
import OptionPage from './OptionPage';
import OptionTemplate from './OptionTemplate';

class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="option-container">
                <Route path={'/'} component={SubMenu} />
                <Route exact path={'/'} render={() => <Redirect to={'/setting'}/>} />
                <div className='option-main'>
                    <Route path={'/setting'} component={OptionSetting} />
                    <Route path={'/page'} component={OptionPage} />
                    <Route path={'/template'} component={OptionTemplate} />
                </div>
            </div>
        )
    }
}

export default App;