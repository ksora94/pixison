import React, {Component} from 'react';
import _ from 'lodash';
import {Form, FormGroup, FormControl, ControlLabel, Schema} from 'rsuite';
import classNames from 'classnames/bind';

import style from './page.scss';
import TemplateInput from 'components/TemplateInput';
import Expressions from './Expressions';

const cx = classNames.bind(style);
const {StringType, ObjectType} = Schema.Types;

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
        this.model = Schema.Model({
            name: StringType()
                .isRequired('名称为必填项'),
            url: StringType()
                .addRule(value => !props.urls.some(url => value === url), '已存在的URL')
                .isRequired('URL为必填项'),
            expressions: ObjectType()
                .addRule(value => !!value.expressions.length, '至少填写一条表达式')
                .addRule(value => value.expressions.every(e => e), '存在空表达式')
                .addRule(value => _.uniq(value.expressions).length === value.expressions.length, '存在同样的表达式')
        });
    }

    handleChange(value) {
        this.props.onChange({
            ...value,
            default: value.expressions.default,
            expressions: value.expressions.expressions
        })
    }

    render() {
        const {error} = this.state;
        const {value, disabled, mode, onChange, ...props} = this.props;
        const formValue = {
            ...value,
            expressions: {
                default: value.default,
                expressions: value.expressions
            }
        };

        return (
            <Form
                ref={ref => (this.root = ref)}
                checkTrigger={'none'}
                className={cx('form')}
                formValue={formValue}
                model={this.model}
                onCheck={error => this.setState({error})}
                onChange={this.handleChange.bind(this)}
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
                    <ControlLabel>目标文件夹</ControlLabel>
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
    value: {},
    urls: []
};

export default PageForm;
