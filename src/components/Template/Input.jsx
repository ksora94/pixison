import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classNames from 'classnames/bind';
import style from './template.scss';
import {Input, Panel} from "rsuite";
import {previewer} from 'js/functions';

const cx = classNames.bind(style);

class TemplateInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.value,
            expressionReview: '',
            isError: false,
            focus: false
        };
    }

    handleChange(value) {
        const expressionReview = previewer(value, this.handleError);

        this.setState({
            isError: true,
            value, expressionReview
        });

        this.props.onChange({
            value, expressionReview
        })
    }

    handleError() {
        this.setState({
            isError: true
        })
    }

    handleFocus(focus) {
        this.setState({
            focus
        })
    }

    render() {
        const {value, expressionReview, focus} = this.state;
        const props = _.omit(this.props, ['value']);
        const className = cx({
            input: true,
            focus
        });

        return (
            <div className={className}>
                <Input
                    {...props}
                    value={value}
                    componentClass="textarea"
                    rows={6}
                    onChange={this.handleChange.bind(this)}
                    onFocus={() => this.handleFocus(true)}
                    onBlur={() => this.handleFocus(false)}
                />
                <div className='preview'>
                    {expressionReview}
                </div>
            </div>
        )
    }
}

TemplateInput.defaultProps = {
    value: '',
    onChange: () => {}
};

TemplateInput.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func
};

export default TemplateInput;