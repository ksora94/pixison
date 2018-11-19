import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Loader} from 'rsuite';
import classNames from 'classnames/bind';
import style from './authority.scss';
import store from 'panel/store';
import 'js/gapi'
import event from 'js/event';
import {getToken} from 'js/service';
import service from "~/js/service";

const cx = classNames.bind(style);

const STATUS_MAP = {
    'GET_TOKEN:start': '获取用户信息',
    'GET_TOKEN:fail': '获取用户信息失败',
    'GET_DATA_URL:start': '初始化图片数据',
    'INIT_ROOT_FOLDER:start': '初始化根文件夹',
    'INIT_ROOT_FOLDER:fail': '初始化根文件夹失败'
};

class Authority extends Component {
    constructor(props) {
        super(props);

        this.state = {
            status: 'GET_TOKEN:start'
        }
    }

    componentDidMount() {
        Promise.all([this.getToken(), this.initRootFolder()])
            .then(token => {
                chrome.runtime.sendMessage({
                    type: 'PANEL:authorized',
                    data: token
                });
                this.setState({
                    status: 'GET_DATA_URL:start'
                });

                return this.getDataUrl();
            }).then(() => this.props.history.replace('/processing'))
            .catch(e => {
                this.setState({
                    status: e
                })
            });
    }

    getToken() {
        return getToken().then(token => {
            if (token) {
                store.dispatch({
                    type: 'SET_TOKEN',
                    data: token
                });

            } else {
                throw new Error('GET_TOKEN:fail');
            }
        })
    }

    initRootFolder() {
        const {rootFolder, token} = this.props;

        this.setState({
            status: 'INIT_ROOT_FOLDER:start'
        });
        if (rootFolder) {
            return service('getFileDetail', token, {
                id: rootFolder
            }).catch(res => {
                if (res.code = '404') {
                    return this.createRootFolder();
                } else {
                    throw new Error('INIT_ROOT_FOLDER:fail');
                }
            })
        }
        return this.createRootFolder();
    }

    createRootFolder() {
        return service('createFolder', this.props.token, {
            title: 'Pixison'
        }).then(res => {
            store.dispatch({
                type: 'SET_ROOT_FOLDER',
                data: res.id
            });
            localStorage.setItem('ROOT_FOLDER', res.id);
        }).catch(() => {
            throw new Error('INIT_ROOT_FOLDER:fail');
        })
    }

    getDataUrl() {
        return new Promise(resolve => {
            event.add('CONTENT:image_parsed', data => {
                store.dispatch({
                    type: 'SET_DATA_URL',
                    data: data.dataUrl
                });
                store.dispatch({
                    type: 'SET_NAME',
                    data: data.name
                });
                resolve(data);
            });
        })
    }

    render() {
        const {status} = this.state;

        return (
            <div className={cx('container', 'con')}>
                <Loader
                    content={<span className={cx('text')}>{STATUS_MAP[status]}</span>}
                    className={cx('loading')}
                    size={'md'}
                />
            </div>
        )
    }
}

export default connect(
    state => ({
        rootFolder: state.rootFolder,
        token: state.token
    })
)(Authority);
