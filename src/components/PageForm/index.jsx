import React, {Component} from 'react';
import classNames from 'classnames/bind';
import style from './page.scss';
import {Form, FormGroup, FormControl, ControlLabel, SelectPicker} from 'rsuite';

const cx = classNames.bind(style);

class PageForm extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {value} = this.props;

        return (
            <Form
                formDefaultValue={value}
            >
                <FormGroup>
                    <ControlLabel>名称</ControlLabel>
                    <FormControl name={'name'} />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>URL</ControlLabel>
                    <FormControl name={'url'} />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>目标文件夹</ControlLabel>
                    <FormControl
                        accepter={SelectPicker}
                        name={'target'}
                        placeholder={<span>&nbsp;</span>}
                        style={{width: 300}}
                        menuStyle={{ width: 300 }}
                    />
                </FormGroup>
            </Form>
        )
    }
}

PageForm.defaultProps = {
    value: {
        name: '',
        url: '',
        target: ''
    }
};

export default PageForm;
