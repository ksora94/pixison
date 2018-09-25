import React, {Component} from 'react';
import {Loader} from 'rsuite';
import classNames from 'classnames/bind';
import style from './authority.scss';
import store from 'panel/store';
import 'js/gapi'
import event from 'js/event';

const cx = classNames.bind(style);

class Authority extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        Promise.all([Authority.getToken(), Authority.getGAPIClient()])
            .then(token => {
               chrome.runtime.sendMessage({
                   type: 'PANEL:authorized',
                   data: token
               });

               return Authority.getDataUrl();
            }).then(() => this.props.history.replace('/processing'));
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
                    reject();
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
        return (
            <div className={cx('con')}>
                <Loader/>
            </div>
        )
    }
}

export default Authority;
