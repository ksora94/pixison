import React, {Component} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames/bind';
import style from './setting.scss';
import service from 'js/service';

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
        return (<div onClick={this.createFolder.bind(this)}>{this.props.token}</div>)
    }
}

export default connect(mapStateToProps)(OptionSetting);
