import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import style from './template.scss';
import {Input, Panel} from "rsuite";
import {previewer} from 'js/functions';

const cx = classNames.bind(style);

class TemplateInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            expressionReview: previewer(props.defaultValue),
            isError: false,
            focus: false
        };
    }

    handleChange(value) {
        const expressionReview = previewer(value, this.handleError);

        this.setState({
            isError: false,
            expressionReview
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
        const {expressionReview, focus} = this.state;
        const {onChange, onBlur, onFocus, ...props} = this.props;
        const className = cx({
            input: true,
            focus
        });

        return (
            <div className={className}>
                <Input
                    componentClass="textarea"
                    rows={6}
                    onChange={this.handleChange.bind(this)}
                    onFocus={event => {this.handleFocus(true);onFocus(event)}}
                    onBlur={event => {this.handleFocus(false);onBlur(event)}}
                    {...props}
                />
                <div className='preview'>
                    {expressionReview}
                </div>
            </div>
        )
    }
}

TemplateInput.defaultProps = {
    onChange: () => {},
    onBlur: () => {},
    onFocus: () => {}
};

TemplateInput.propTypes = {
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func
};

export default TemplateInput;