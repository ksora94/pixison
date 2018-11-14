import React, {Component} from 'react';
import {connect} from 'react-redux'
import classNames from 'classnames/bind';
import style from './template.scss';
import Header from 'components/Header';
import {TemplateForm} from 'components/Template';
import {addTemplate,selectTemplate} from 'option/store/actions'

const cx = classNames.bind(style);

const mapDispatchToProps = dispatch => ({
   handleSubmit(formValue) {
       dispatch(addTemplate(formValue));
       this.props.history.replace({
           pathname: '/template/detail',
           state: {
               system: false,
               ...formValue
           }
       });
       dispatch(selectTemplate(formValue.name));
   }
});

class TemplateAdd extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className={cx('main')}>
                <Header disabled>添加模板</Header>
                <div className={cx('body')}>
                    <TemplateForm onSubmit={this.props.handleSubmit.bind(this)}/>
                </div>
            </div>
        )
    }
}

export default connect(null, mapDispatchToProps)(TemplateAdd);