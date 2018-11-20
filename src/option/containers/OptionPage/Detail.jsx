import React, {Component} from 'react';
import {connect} from "react-redux";
import qs from 'qs';
import classNames from 'classnames/bind';
import style from './page.scss';
import Header from 'components/Header';
import PageForm from 'components/PageForm';

const cx = classNames.bind(style);

const mapStateToProps = ({page}) => ({
    pages: page.pages
});


class Detail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            url: '',
            disabled: false,
            formValue: {
                name: '',
                url: '',
                target: '',
                expressions: []
            }
        };
    }

    componentWillReceiveProps(nextProps) {
        this.updateData(nextProps);
    }

    updateData(props) {
        const {url} = qs.parse(props.location.search.slice(1));
        const item = props.pages.find(f => f.url === url);
        const {name, target, expressions} = item;

        if (item && url !== this.state.url) {
            this.setState({
                url,
                disabled: item.system,
                formValue: {
                    name, url, target, expressions
                }
            })
        }
    }

    render() {
        const {url, disabled, formValue} = this.state;

        return (
            <div className={cx('main')}>
                <Header disabled={disabled}>
                    {url}
                </Header>
                <div className={cx('body')}>
                    <PageForm
                        mode={'detail'}
                        value={formValue}
                        disabled={disabled}
                        onChange={formValue => this.setState({formValue})}
                    />
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(Detail);
