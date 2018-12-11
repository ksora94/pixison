import React, {Component} from 'react';
import classNames from 'classnames/bind';
import style from './loader.scss';
import {Loader} from "rsuite";

const cx = classNames.bind(style);

class ComponentName extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
                <Loader
                    content={<span className={cx('text')}>{this.props.children}</span>}
                    className={cx('con')}
                    size={'md'}
                    {...this.props}
                />
        )
    }
}

export default ComponentName;
