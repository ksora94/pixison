import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import style from './template.scss';
import TemplateInput from './Input';
import {Form, FormGroup, FormControl, ControlLabel,ButtonToolbar, Button} from 'rsuite';

const cx = classNames.bind(style);

const TemplateInputWrap = ({onChange, ...props}) => {
    return (
        <TemplateInput onChange={event => onChange(event.value)} {...props}/>
    )
};

class TemplateForm extends Component {
    constructor(props) {
        const {value} = props;

        super(props);

        this.state = {
            submitDisabled: !value.name || !value.expression
        }
    }

    handleSubmit() {
        this.props.onSubmit(this.form.state.formValue);
    }

    handleChange(formValue) {
        this.setState({
            submitDisabled: !formValue.name || !formValue.expression
        });
        this.props.onChange(formValue);
    }

    render() {
        const {submitDisabled} = this.state;
        const value = this.props.value;

        return (
            <Form fluid
                  ref={ref => this.form=ref}
                  formDefaultValue={value}
                  onChange={this.handleChange.bind(this)}
            >
                <FormGroup>
                    <ControlLabel>名称</ControlLabel>
                    <FormControl name={'name'} autoComplete='off'/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>表达式</ControlLabel>
                    <FormControl accepter={TemplateInputWrap} name={'expression'} />
                </FormGroup>
                <FormGroup>
                    <ButtonToolbar>
                        <Button onClick={this.handleSubmit.bind(this)} disabled={submitDisabled}>保存</Button>
                    </ButtonToolbar>
                </FormGroup>
            </Form>
        )
    }
}

TemplateForm.defaultProps = {
    value: {
        name: '',
        expression: ''
    },
    onSubmit: () => {},
    onChange: () => {}
};

TemplateForm.propTypes = {
    value: PropTypes.object,
    onSubmit: PropTypes.func,
    onChange: PropTypes.func
};

export default TemplateForm;