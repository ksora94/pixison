import React, {Component} from 'react';
import {connect} from "react-redux";
import classNames from 'classnames/bind';
import style from './processing.scss';
import Loader from 'components/Loader';

import service from 'js/service';

const cx = classNames.bind(style);

const STATUS_MAP = {
    'CHECK_TARGET:start': '检查目标文件夹',
    'CHECK_TARGET:fail': '检查目标文件夹失败',
    'CREATE_TARGET:start': '创建目标文件夹',
    'CREATE_TARGET:fail': '创建目标文件夹失败',
    'UPLOAD_IMAGE:start': '上传图片',
    'UPLOAD_IMAGE:fail': '上传图片失败'
};

class Processing extends Component {
    constructor(props) {
        super(props);

        this.state = {
            status: 'CHECK_TARGET:start'
        };
    }

    componentDidMount() {
        const {token, dataUrl, pageUrl, rootFolder} = this.props;
        const {target, name} = this.props.history.location.state;

        if (!token) {
            history.replace('/');
            return;
        }
        service('getFileDetailByName', token, {
            folderId: rootFolder.id,
            name: target
        }).then( data => {
            if (!data.files.length) {
                this.changeStatus('CREATE_TARGET:start');
                return service('createFolder', token, {
                    title: target,
                    parentId: rootFolder.id
                }).then(data => data.id);
            }
            return data.files[0].id;
        }).then( parentId => {
            this.changeStatus('UPLOAD_IMAGE:start');
            return service('uploadImage', token, {
                description: pageUrl,
                name, parentId, dataUrl
            }).then(() => {
            })
        }).catch(({name}) => {
            let status;

            switch(name) {
                case 'getFileDetailByName':
                    status = 'CHECK_TARGET:fail';
                    break;
                case 'createFolder':
                    status = 'CREATE_TARGET:fail';
                    break;
                case 'uploadImage':
                    status = 'UPLOAD_IMAGE:fail';
                    break;
                default:
                    break;
            }

            this.changeStatus(status);
        })
    }

    changeStatus(status) {
        this.setState({status})
    }

    render() {
        return (
            <div className={cx('container', 'con')}>
                <Loader>{STATUS_MAP[this.state.status]}</Loader>
            </div>
        )
    }
}

export default connect(
    state => ({
        token: state.token,
        dataUrl: state.dataUrl,
        pageUrl: state.pageUrl,
        rootFolder: state.rootFolder
    })
)(Processing);
