import React, {Component} from 'react';
import classNames from 'classnames/bind';
import style from './template.scss';
import Header from 'components/Header';
import {TemplateInput} from 'components/Template';

const cx = classNames.bind(style);

class TemplateAdd extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className={cx('main')}>
                <Header disabled>添加模板</Header>
                <div className={cx('body')}>
                    <TemplateInput>

                    </TemplateInput>
                </div>
            </div>
        )
    }
}

export default TemplateAdd;