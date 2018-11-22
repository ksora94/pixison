import React, {Component} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames/bind';

import style from './setting.scss';
import service from 'js/service';
import Container from 'components/Container';

const cx = classNames.bind(style);

const mapStateToProps = ({global}) => ({
    token: global.token
});

class OptionSetting extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

    createFolder() {

    }

    render() {
        return (
            <Container title={'全局设置'} disabled>
                {this.props.token}
            </Container>
        )
    }
}

export default connect(mapStateToProps)(OptionSetting);
