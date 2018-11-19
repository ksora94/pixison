import React, {Component} from 'react';
import {Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Loader} from 'rsuite';

import SubMenu from './SubMenu';
import OptionSetting from './OptionSetting';
import OptionPage from './OptionPage';
import OptionTemplate from './OptionTemplate';
import service, {getToken} from 'js/service';
import 'js/gapi';

const mapStateToProps = ({global}) => ({
   token: global.token,
   rootFolder: global.rootFolder
});

const mapDispatchToProps = {
    setToken: (token) => ({
        type: 'SET_TOKEN',
        data: token
    }),
    setRootFolder: (id) => ({
        type: 'SET_ROOT_FOLDER',
        data: id
    })
};

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false
        };
    }

    componentDidCatch(error, info) {
        console.error(error, info);
    }

    componentDidMount() {
        const {rootFolder} = this.props;

        getToken().then(token => {
            this.props.setToken(token);
            this.setState({
                loaded: true
            });

            if (rootFolder) {
                service('getFileDetail', token, {
                    id: rootFolder
                }).catch(res => {
                    if (res.code = '404') {
                        this.createRootFolder();
                    }
                })
            } else {
                this.createRootFolder();
            }
        })
    }

    createRootFolder() {
        service('createFolder', this.props.token, {
            title: 'Pixison'
        }).then(res => {
            this.props.setRootFolder(res.id);
            localStorage.setItem('ROOT_FOLDER', res.id);
        })
    }

    render() {
        const {loaded} = this.state;

        return (
            <div className="option-container">
                <Route path={'/'} component={SubMenu} />
                <Route exact path={'/'} render={() => <Redirect to={'/setting'}/>} />
                {loaded ?
                    <div className='option-main'>
                        <Route path={'/setting'} component={OptionSetting}/>
                        <Route path={'/page'} component={OptionPage}/>
                        <Route path={'/template'} component={OptionTemplate}/>
                    </div>
                    :
                    <div className='option-main_load'>
                        <Loader
                            className={'loading'}
                            size={'md'}
                        />
                    </div>
                }
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));