import React, {Component} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames/bind';
import {Form, FormGroup, ControlLabel, Toggle, FormControl, IconButton, Icon, ButtonGroup, Portal} from 'rsuite';
import Container from 'components/Container';
import Loader from 'components/Loader';

import style from './setting.scss';
import storage from 'js/storage';
import {syncToDrive, syncFromDrive} from 'js/sync';

const cx = classNames.bind(style);

const ToggleMask = function ({value, ...props}) {
    return <Toggle checked={value} size={'md'} {...props}/>
};

const mapDispatchToProps = {
    setPages: (pages) => ({
        type: 'SET_PAGES',
        data: pages
    }),
    setRootFolder: (data) => ({
        type: 'SET_ROOT_FOLDER',
        data
    })
};

class OptionSetting extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: storage.get('SETTING'),
            uploadLoading: false,
            downloadLoading: false
        }
    }

   handleChange(value) {
       this.setState({value});
       storage.set('SETTING', value);
   }

   handleUploadClick() {
        const cb = () => this.setState({ uploadLoading: false });

        this.setState({
            uploadLoading: true
        });
       return syncToDrive()
           .then(cb, cb)
   }

   handleDownloadClick() {
        const {setPages, setRootFolder} = this.props;

       this.setState({
           downloadLoading: true
       });
       return syncFromDrive()
           .then((res) => {
               this.setState({
                   downloadLoading: false,
                   value: res.SETTING
               });

               setRootFolder(res.ROOT_FOLDER);
               setPages(res.PAGES);
           }).catch(() => {
               this.setState({
                   downloadLoading: false
               });
           })
   }

    render() {
        const {value, uploadLoading, downloadLoading} = this.state;

        return (
            <Container title={'全局设置'} disabled>
                <Form
                    className={cx('con')}
                    layout="horizontal"
                    formValue={value}
                    onChange={this.handleChange.bind(this)}
                >
                    <h5>基础设置</h5>
                    <FormGroup>
                        <ControlLabel>添加成功自动关闭弹窗</ControlLabel>
                        <FormControl accepter={ToggleMask} name={'autoClose'}/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>允许输入目标文件夹</ControlLabel>
                        <FormControl accepter={ToggleMask} name={'allowCustomTarget'}/>
                    </FormGroup>
                    <hr/>
                    <h5>同步设置</h5>
                    <FormGroup>
                      <ControlLabel>自动同步配置</ControlLabel>
                      <FormControl accepter={ToggleMask} name={'autoSync'}/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>手动同步配置</ControlLabel>
                        <ButtonGroup style={{marginLeft: '20px'}}>
                          <IconButton icon={<Icon icon="upload" />}
                                      appearance={'ghost'}
                                      disabled={uploadLoading || downloadLoading}
                                      loading={uploadLoading}
                                      onClick={this.handleUploadClick.bind(this)}
                          >同步到 Google Drive</IconButton>
                          <IconButton icon={<Icon icon="download" />}
                                      appearance={'ghost'}
                                      disabled={uploadLoading || downloadLoading}
                                      onClick={this.handleDownloadClick.bind(this)}
                          >从 Google Drive 同步</IconButton>
                        </ButtonGroup>
                    </FormGroup>
                </Form>
                {downloadLoading && (
                    <Portal>
                        <div className={cx('loading')}>
                            <Loader/>
                        </div>
                    </Portal>
                )}
            </Container>
        )
    }
}

export default connect(null, mapDispatchToProps)(OptionSetting);
