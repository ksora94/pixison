import React, {Component} from 'react';
import classNames from 'classnames/bind';
import style from './template.scss';
import Header from 'components/Header'
import {Input} from 'rsuite';

const cx = classNames.bind(style);

class TemplateDetail extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const location = this.props.location;

        if (!location.state) return (<div />);
        const {template} = location.state;
        return (
            <div className={cx('main')}>
                <Header disabled={template.system}
                        confirmText={template.name}
                >
                    {template.name}
                </Header>
                <div className={cx('body')}>
                    <Input
                        value={template.expression}
                        componentClass="textarea"
                        rows={6}
                        style={{ width: '100%' }}
                        disabled
                    />
                </div>
            </div>
        )
    }
}

export default TemplateDetail;