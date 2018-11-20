import React, {Component} from 'react';
import classNames from 'classnames/bind';

import style from './page.scss';
import {Form, FormGroup, FormControl, ControlLabel} from 'rsuite';
import TemplateInput from 'components/TemplateInput';
import Expressions from './Expressions';

const cx = classNames.bind(style);

class PageForm extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {value, disabled, mode, ...props} = this.props;

        return (
            <Form
                className={cx('form')}
                formValue={value}
                {...props}
            >
                <FormGroup>
                    <ControlLabel>名称</ControlLabel>
                    <FormControl name={'name'} disabled={disabled}/>
                </FormGroup>
                {mode === 'add' ?
                    <FormGroup>
                        <ControlLabel>URL</ControlLabel>
                        <FormControl name={'url'} disabled={disabled} />
                    </FormGroup>
                    : null
                }
                <FormGroup>
                    <ControlLabel>目标文件夹</ControlLabel>
                    <FormControl
                        accepter={TemplateInput}
                        name={'target'}
                        disabled={disabled}
                    />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>命名表达式</ControlLabel>
                    <FormControl
                        accepter={Expressions}
                        disabled={disabled}
                        name={'expressions'}
                    />
                </FormGroup>
            </Form>
        )
    }
}

PageForm.defaultProps = {
    disabled: false,
    mode: 'add',
    value: {}
};

export default PageForm;
