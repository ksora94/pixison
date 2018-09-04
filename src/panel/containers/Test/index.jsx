import React, {Component} from 'react';
import classNames from 'classnames/bind';
import style from './style.scss';

const cx = classNames.bind(style);

class Test extends Component {
    constructor () {
        super();
        this.state = {
            dataUrl: ''
        };
    }

    componentDidMount() {
        chrome.runtime.onMessage.addListener(event => {
            let {type, dataUrl} = event;

            if (type === 'IMAGE_PARSED_END') {
                this.setState({
                    dataUrl
                })
            }
        })
    }

    render() {
        const {dataUrl} = this.state;

        return (
            <div className={cx('test')}>
                <img src={dataUrl}/>
            </div>
        )
    }
}

export default Test;