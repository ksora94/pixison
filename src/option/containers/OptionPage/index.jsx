import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import classNames from 'classnames/bind';
import style from './page.scss';
import Pages from './Pages'
import Content from './Content'

const cx = classNames.bind(style);

class OptionPage extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className={cx('con')}>
                <Route path={'/page'} component={Pages} />
                <Content/>
            </div>
        )
    }
}

export default OptionPage;