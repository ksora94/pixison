import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import style from './template.scss';
import {Input} from "rsuite";
import {previewer} from 'js/functions';

const cx = classNames.bind(style);

class TemplateInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            focus: false
        };
    }

    handleFocus(focus) {
        this.setState({
            focus
        })
    }

    render() {
        const {focus} = this.state;
        const {value, onBlur, onFocus, onChange, ...props} = this.props;
        const className = cx({
            input: true,
            focus
        });

        return (
            <div className={className}>
                <Input
                    value={value}
                    componentClass="textarea"
                    rows={6}
                    onChange={onChange.bind(this)}
                    onFocus={event => {this.handleFocus(true);onFocus(event)}}
                    onBlur={event => {this.handleFocus(false);onBlur(event)}}
                    {...props}
                />
                <div className='preview'>
                    {previewer(value)}
                </div>
            </div>
        )
    }
}

TemplateInput.defaultProps = {
    value: '',
    onChange: () => {},
    onBlur: () => {},
    onFocus: () => {}
};

TemplateInput.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func
};

export default TemplateInput;