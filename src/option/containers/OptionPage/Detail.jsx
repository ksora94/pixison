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
            name: ''
        };
    }

    componentWillReceiveProps(nextProps) {
        this.updateData(nextProps);
    }

    updateData(props) {
        const {url} = qs.parse(props.location.search.slice(1));
        const item = props.pages.find(f => f.url === url);

        if (item) {
            this.setState({
                name: item.name
            })
        }
    }

    render() {
        const {name} = this.state;

        return (
            <div className={cx('main')}>
                <Header disabled>
                    {name}
                </Header>
                <div className={cx('body')}>
                    <PageForm/>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(Detail);
