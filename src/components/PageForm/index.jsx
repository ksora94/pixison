import React, {Component} from 'react';
import {Form, FormGroup, FormControl, ControlLabel, Schema} from 'rsuite';
import classNames from 'classnames/bind';

import style from './page.scss';
import TemplateInput from 'components/TemplateInput';
import Expressions from './Expressions';

const cx = classNames.bind(style);
const {StringType, ArrayType} = Schema.Types;

const model = Schema.Model({
    name: StringType().isRequired('名称为必填项'),
    url: StringType().isRequired('URL为必填项'),
    target: StringType().isRequired('目标文件夹为必填项'),
    expressions: ArrayType().isRequired('至少填写一条表达式')
});

const FormControlWithMessage = function ({name, error, ...props}) {
    return (
        <FormControl name={name} errorMessage={error[name]} errorPlacement={'bottomRight'} {...props}/>
    )
};

class PageForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: {}
        };
    }

    render() {
        const {error} = this.state;
        const {value, disabled, mode, ...props} = this.props;

        return (
            <Form
                ref={ref => (this.root = ref)}
                className={cx('form')}
                formValue={value}
                model={model}
                onCheck={error => this.setState({error})}
                {...props}
            >
                <FormGroup>
                    <ControlLabel>名称 *</ControlLabel>
                    <FormControlWithMessage name={'name'} error={error} disabled={disabled}/>
                </FormGroup>
                {mode === 'add' &&
                    <FormGroup>
                        <ControlLabel>URL *</ControlLabel>
                        <FormControlWithMessage name={'url'} error={error} disabled={disabled} />
                    </FormGroup>
                }
                <FormGroup className={cx('formControl')}>
                    <ControlLabel>目标文件夹 *</ControlLabel>
                    <FormControlWithMessage
                        accepter={TemplateInput}
                        name={'target'}
                        error={error}
                        disabled={disabled}
                    />
                </FormGroup>
                <FormGroup className={cx('formControl')}>
                    <ControlLabel>名称表达式 *</ControlLabel>
                    <FormControlWithMessage
                        accepter={Expressions}
                        disabled={disabled}
                        error={error}
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
