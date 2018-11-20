import React, {Component} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';

import style from './processing.scss';
import Uploader from 'components/Uploader'

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
        const {dataUrl, token, name} = this.props;
        const data = {
            description: 'test',
            dataUrl, name
        };

        return(
            <div>
                <Uploader token={token} data={data}>upload</Uploader>
                {name}
                <img src={dataUrl}/>
            </div>
        )
    }
}

export default connect(
    state => ({
        token: state.token,
        dataUrl: state.dataUrl,
        name: state.name
    })
)(Processing);
