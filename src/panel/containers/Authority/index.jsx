import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Loader} from 'rsuite';

import classNames from 'classnames/bind';
import style from './authority.scss';
import store from 'panel/store';
import event from 'js/event';
import service, {getToken} from 'js/service';
import storage from "~/js/storage";

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

        this.getToken()
            .then(() => this.initRootFolder())
            .then(() => {
                chrome.runtime.sendMessage({
                    type: 'PANEL:authorized',
                    data: this.props.token
                });
                return this.getDataUrl();
            })
            .then(() => this.props.history.replace('/processing'))
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
        if (rootFolder.id) {
            return service('getFileDetail', token, {
                id: rootFolder.id
            }).catch(res => {
                if (res.code = '404') {
                    return this.createRootFolder();
                } else {
                    throw new Error('INIT_ROOT_FOLDER:fail');
                }
            })
        } else {
            return this.createRootFolder();
        }
    }

    createRootFolder() {
        return service('createFolder', this.props.token, {
            title: 'Pixison'
        }).then(res => {
            store.dispatch({
                type: 'SET_ROOT_FOLDER',
                data: res
            });
            storage.set('ROOT_FOLDER', res);
        }).catch(() => {
            throw new Error('INIT_ROOT_FOLDER:fail');
        })
    }

    getDataUrl() {
        this.setState({
            status: 'GET_DATA_URL:start'
        });
        return new Promise(resolve => {
            event.add('CONTENT:image_parsed', data => {
                store.dispatch({
                    type: 'SET_DATA_URL',
                    data: data.dataUrl
                });
                store.dispatch({
                    type: 'SET_NAMES',
                    data: data.names
                });
                store.dispatch({
                    type: 'SET_TARGETS',
                    data: data.targets
                });
                console.log(data.names);
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
