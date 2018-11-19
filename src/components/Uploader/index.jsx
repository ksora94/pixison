import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Uploader extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <button onClick={this.upload.bind(this)}>{this.props.children}</button>
        )
    }

    upload() {
        const {token, data, onSuccess} = this.props;

        Uploader.start(token, data)
            .then(onSuccess);
    }

    static start (token, {dataUrl, name, description}) {

        const boundary = '-------314159265358979323846';
        const delimiter = "\r\n--" + boundary + "\r\n";
        const close_delimiter = "\r\n--" + boundary + "--";

        let metadata = {
            mimeType: 'image/jpeg',
            name, description
        };

        let multipartRequestBody =
            delimiter +  'Content-Type: application/json\r\n\r\n' +
            JSON.stringify(metadata) +
            delimiter +
            'Content-Type: image/jpeg\r\n' +
            'Content-Transfer-Encoding: base64\r\n' + '\r\n' + dataUrl.replace(/^data:.*;base64,/, "") +
            close_delimiter;

        return new Promise(resolve => {
            gapi.client.request({
                path: '/upload/drive/v3/files',
                method: 'POST',
                params: {
                    'uploadType': 'multipart'
                },
                headers: {
                    'Content-Type': 'multipart/mixed; boundary="' + boundary + '"',
                    'Authorization': 'Bearer ' + token,
                },
                body: multipartRequestBody
            }).execute((file) => {
                resolve(file)
            });
        });

    }
}

Uploader.defaultProps = {
    onSuccess: () => {}
};

Uploader.propTypes = {
    token: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    onSuccess: PropTypes.func
};

export default Uploader;
