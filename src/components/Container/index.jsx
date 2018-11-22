import React, {Component} from 'react';
import classNames from 'classnames/bind';
import style from './container.scss';
import Header from 'components/Header';
import qs from "qs";
import PageForm from "~/components/PageForm";

const cx = classNames.bind(style);



class Container extends Component {
    constructor(props) {
        super(props);

        this.state = {
            shadow: false
        }
    }

    render() {
        const {title, ...props} = this.props;
        const headClass = cx({
           head: true,
           'head-shadow': this.state.shadow
        });

        return (
            <div className={cx('main')}>
                <Header
                    className={headClass}
                    {...props}
                >
                    {title}
                </Header>
                <div
                    ref={'body'}
                    className={cx('body')}
                    onScroll={() => this.setState({shadow: !!this.refs.body.scrollTop})}
                >
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Container;
