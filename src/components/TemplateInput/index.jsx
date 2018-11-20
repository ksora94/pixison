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
        const {value, as, onBlur, onFocus, ...props} = this.props;
        const className = cx({
            input: true,
            focus
        });

        return (
            <div className={className}>
                <Input
                    value={value}
                    componentClass={as}
                    rows={6}
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
    as: 'textarea',
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
