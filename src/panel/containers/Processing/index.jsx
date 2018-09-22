import React, {Component} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import style from './processing.scss';

const cx = classNames.bind(style);

class Processing extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const {token, history} = this.props;

        if (!token) history.replace('/')
    }

    render() {
        return(
            <div>
                <img src={this.props.dataUrl}/>
                {this.props.token}
            </div>
        )
    }
}

export default connect(
    state => ({
        token: state.token,
        dataUrl: state.dataUrl
    })
)(Processing);