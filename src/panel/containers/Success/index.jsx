import React, {Component} from 'react';
import {connect} from "react-redux";
import {Icon, Button} from 'rsuite';
import classNames from 'classnames/bind';
import style from './success.scss';

import service from 'js/service';

const cx = classNames.bind(style);

class Success extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const {history, setting} = this.props;
        const {id} = history.location.state;

        if (!id) history.replace('/');
        if (setting.autoClose) window.close();
    }

    render() {
        return (
            <div className={cx('con')}>
                <div className={cx('title')}>添加成功</div>
                <div className={cx('buttons')}>
                    <Button
                        size={'sm'}
                        appearance={'subtle'}
                        onClick={() => window.close()}
                    >
                        <Icon icon={'close'}/> 关闭窗口
                    </Button>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        dataUrl: state.dataUrl,
        setting: state.setting
    })
)(Success);
