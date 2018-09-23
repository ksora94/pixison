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
        const {dataUrl} = this.props;

        return(
            <div>
                <button onClick={() => this.uploadFile(dataUrl)}>upload</button>
                <img src={dataUrl}/>
            </div>
        )
    }

    uploadFile (t) {
        const {token, dataUrl} = this.props;

        const boundary = '-------314159265358979323846';
        const delimiter = "\r\n--" + boundary + "\r\n";
        const close_delim = "\r\n--" + boundary + "--";

        let metadata = {
            description : 'savefile for my game',
            mimeType: 'image/jpeg',
            name: 'abc'
        };

        let multipartRequestBody =
            delimiter +  'Content-Type: application/json\r\n\r\n' +
            JSON.stringify(metadata) +
            delimiter +
            'Content-Type: image/jpeg\r\n' +
            'Content-Transfer-Encoding: base64\r\n' + '\r\n' + dataUrl.replace(/^data:.*;base64,/, "") +
            close_delim;

        gapi.client.request
        ( {
            path: '/upload/drive/v3/files',
            method: 'POST',
            params: {
                'uploadType': 'multipart'
            },
            headers: {
                'Content-Type': 'multipart/mixed; boundary="' + boundary + '"',
                'Authorization': 'Bearer ' + token,
            },
            body:multipartRequestBody
        }).execute((file) => {
            console.log("Wrote to file " + file.name + " id: " + file.id);
        });
    }
}

export default connect(
    state => ({
        token: state.token,
        dataUrl: state.dataUrl
    })
)(Processing);