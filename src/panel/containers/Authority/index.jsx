import React, {Component} from 'react';
import {Loader} from 'rsuite';
import classNames from 'classnames/bind';
import style from './authority.scss';
import store from 'panel/store';
import 'js/gapi'
import event from 'js/event';

const cx = classNames.bind(style);

const STATUS_MAP = {
    'GET_TOKEN:start': <span>获取用户信息</span>,
    'GET_TOKEN:fail': <span>获取用户信息失败</span>,
    'GET_DATA_URL:start': <span>初始化图片数据</span>
};

class Authority extends Component {
    constructor(props) {
        super(props);

        this.state = {
            status: 'GET_TOKEN:start'
        }
    }

    componentDidMount() {
        Promise.all([Authority.getToken(), Authority.getGAPIClient()])
            .then(token => {
               chrome.runtime.sendMessage({
                   type: 'PANEL:authorized',
                   data: token
               });
                this.setState({
                    status: 'GET_DATA_URL:start'
                });

               return Authority.getDataUrl();
            }).then(() => this.props.history.replace('/processing'))
            .catch(e => {
                this.setState({
                    status: e
                })
            });
    }

    static getToken() {
        return new Promise((resolve, reject) => {
            chrome.identity.getAuthToken({
                interactive: true
            }, (token) => {
                if (token) {
                    store.dispatch({
                        type: 'SET_TOKEN',
                        data: token
                    });
                    resolve(token)
                } else {
                    reject('GET_TOKEN:fail');
                }
            })
        })
    }

    static getDataUrl() {
        return new Promise(resolve => {
            event.add('CONTENT:image_parsed', data=> {
                store.dispatch({
                    type: 'SET_DATA_URL',
                    data
                });
                resolve(data);
            });
        })
    }

    static getGAPIClient() {
        return new Promise(resolve => gapi.load('client', resolve()));
    }

    render() {
        const {status} = this.state;

        return (
            <div className={cx('con')}>
                <Loader
                    content={STATUS_MAP[status]}
                    className={cx('loading')}
                    size={'md'}
                />
            </div>
        )
    }
}

export default Authority;
