import React, {Component} from 'react';
import classNames from 'classnames/bind';
import style from './page.scss';

const cx = classNames.bind(style);

class Content extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className={cx('content')}>

            </div>
        )
    }
}

export default Content;