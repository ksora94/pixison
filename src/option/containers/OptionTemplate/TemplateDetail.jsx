import React, {Component} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames/bind';
import style from './template.scss';
import Header from 'components/Header'
import {Input} from 'rsuite';
import {delTemplate} from 'option/store/actions';

const cx = classNames.bind(style);

const mapStateToProps = ({template}) => {
    console.log(template);
    return ({
        template: template.templates.find(item => item.name === template.selected)
    })
};

const mapDispatchToProps = dispatch => ({
   delTemplate(name) {
       dispatch(delTemplate(name));
   }
});


class TemplateDetail extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {template, delTemplate} = this.props;

        if (!template) return (<div />);
        const {name, expression, system} = template;
        return (
            <div className={cx('main')}>
                <Header disabled={system}
                        confirmText={name}
                        onDelete={() => delTemplate(name)}
                >
                    {name}
                </Header>
                <div className={cx('body')}>
                    <Input
                        value={expression}
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

export default connect(mapStateToProps, mapDispatchToProps)(TemplateDetail);