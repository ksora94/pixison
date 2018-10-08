import React, {Component} from 'react';
import classNames from 'classnames/bind';
import style from './page.scss';

const cx = classNames.bind(style);

class Pages extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className={cx('pages')}>

            </div>
        )
    }
}

export default Pages;