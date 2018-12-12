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
    'UPLOAD_IMAGE:start': '添加图片',
    'UPLOAD_IMAGE:fail': '添加图片失败'
};

class Processing extends Component {
    constructor(props) {
        super(props);

        this.state = {
            status: 'CHECK_TARGET:start'
        };
    }

    componentDidMount() {
        const {dataUrl, pageUrl, rootFolder, history} = this.props;
        const {target, name} = history.location.state;

        if (!dataUrl) {
            history.replace('/');
            return;
        }
        service('getFileDetailByName', {
            folderId: rootFolder.id,
            name: target
        }).then( data => {
            if (!data.files.length) {
                this.changeStatus('CREATE_TARGET:start');
                return service('createFolder', {
                    title: target,
                    parentId: rootFolder.id
                }).then(data => data.id);
            }
            return data.files[0].id;
        }).then( parentId => {
            this.changeStatus('UPLOAD_IMAGE:start');
            return service('uploadImage', {
                description: pageUrl,
                name, parentId, dataUrl
            })
        }).then(data => {
            history.replace({
                pathname: '/success',
                state: data
            });
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
        dataUrl: state.dataUrl,
        pageUrl: state.pageUrl,
        rootFolder: state.rootFolder
    })
)(Processing);
