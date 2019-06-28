import React, {Component} from 'react';
import {connect} from 'react-redux';
import Loader from 'components/Loader';

import classNames from 'classnames/bind';
import style from './authority.scss';
import store from 'panel/store';
import event from 'js/event';
import service from 'js/service';
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
        this.initRootFolder()
            .then(() => {
                chrome.runtime.sendMessage({
                    type: 'PANEL:authorized',
                    data: this.props.token
                });
                return this.getDataUrl();
            })
            .then(() => this.props.history.replace('/form'))
            .catch(e => {
                this.setState({
                    status: e
                })
            });
    }

    initRootFolder() {
        const {rootFolder} = this.props;

        this.setState({
            status: 'INIT_ROOT_FOLDER:start'
        });
        if (rootFolder.id) {
            return service('getFile', {
                id: rootFolder.id
            }).catch(res => {
                if (+res.code === 404) {
                    return this.createRootFolder();
                } else {
                    throw new Error('INIT_ROOT_FOLDER:fail');
                }
            }).catch(() => {
                throw new Error('INIT_ROOT_FOLDER:fail');
            })
        } else {
            return service('qFiles', {
                q: 'name+=+"Pixison"'
            }).then(res => {
                if (res.files.length) {
                    return this.props.setRootFolder(res.files[0]);
                } else {
                    return this.createRootFolder();
                }
            }).catch(() => {
                throw new Error('INIT_ROOT_FOLDER:fail');
            });
        }
    }

    createRootFolder() {
        return service('createFolder', {
            title: 'Pixison'
        }).then(res => {
            this.props.setRootFolder(res);

            return res;
        })
    }

    getDataUrl() {
        this.setState({
            status: 'GET_DATA_URL:start'
        });
        return new Promise(resolve => {
            event.add('CONTENT:image_parsed', data => {
                store.dispatch({
                    type: 'SET_URL',
                    data: {
                        dataUrl: data.dataUrl,
                        pageUrl: data.pageUrl
                    }
                });
                store.dispatch({
                    type: 'SET_NAMES',
                    data: data.names
                });
                store.dispatch({
                    type: 'SET_TARGETS',
                    data: data.targets
                });
                resolve(data);
            });
        })
    }

    changeStatus(status) {
        this.setState({status})
    }

    render() {
        const {status} = this.state;

        return (
            <div className={cx('container', 'con')}>
                <Loader>{STATUS_MAP[status]}</Loader>
            </div>
        )
    }
}

export default connect(
    state => ({
        rootFolder: state.rootFolder
    }),
    {
        setRootFolder(rootFolder) {
            storage.set('ROOT_FOLDER', rootFolder);
            return {
                type: 'SET_ROOT_FOLDER',
                data: rootFolder
            }
        }
    }
)(Authority);
