import React, {Component} from 'react';
import classNames from 'classnames/bind';
import {Form, FormGroup, ControlLabel, Toggle, FormControl} from 'rsuite';
import Container from 'components/Container';

import style from './setting.scss';
import storage from 'js/storage';

const cx = classNames.bind(style);

const ToggleMask = function ({value, ...props}) {
    return <Toggle checked={value} size={'md'} {...props}/>
};

class OptionSetting extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: storage.get('SETTING')
        }
    }

   handleChange(value) {
       this.setState({value});
       storage.set('SETTING', value);
   }

    render() {
        return (
            <Container title={'全局设置'} disabled>
                <Form
                    className={cx('con')}
                    layout="horizontal"
                    formValue={this.state.value}
                    onChange={this.handleChange.bind(this)}
                >
                    <FormGroup>
                        <ControlLabel>添加成功自动关闭弹窗</ControlLabel>
                        <FormControl accepter={ToggleMask} name={'autoClose'}/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>允许输入目标文件夹</ControlLabel>
                        <FormControl accepter={ToggleMask} name={'allowCustomTarget'}/>
                    </FormGroup>
                </Form>
            </Container>
        )
    }
}

export default OptionSetting;
