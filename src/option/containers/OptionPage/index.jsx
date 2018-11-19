import React, {Component} from 'react';
import qs from 'qs';
import {connect} from 'react-redux';
import {Nav, IconButton, Icon} from 'rsuite';
import classNames from 'classnames/bind';
import style from './page.scss';
import {Redirect, Route} from "react-router-dom";
import PageDetail from "./Detail";

const cx = classNames.bind(style);

const mapStateToProps = ({page}) => ({
    pages: page.pages
});

class OptionPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: props.pages[0].url
        }
    }

    componentDidMount() {
        this.changeSelected(this.props.pages[0].url);
    }

    changeSelected(url) {
        const {history} = this.props;

        history.replace(`/page/detail?${qs.stringify({url})}`);
        this.setState({
            selected: url
        })
    }

    render() {
        const {pages} = this.props;
        const {selected} = this.state;

        return (
            <div className={cx('con')}>
                <div className={cx('nav')}>
                    <div className={cx('nav-top')}>
                        <IconButton
                            appearance={'subtle'}
                            icon={<Icon icon={'plus-circle'}/>}
                            onClick={() => {}}
                        >添加</IconButton>
                    </div>
                    <Nav
                        activeKey={selected}
                        onSelect={this.changeSelected.bind(this)}
                        vertical
                    >
                        {pages.map((item) =>
                            <Nav.Item key={item.url} eventKey={item.url}>
                                {item.url} <span className={cx('itemName')}>{item.name}</span>
                            </Nav.Item>
                        )}
                    </Nav>
                </div>
                <Route exact path={'/page'} render={() => <Redirect to={'/page/detail'}/>} />
                <Route path={'/page/detail'} component={PageDetail}/>
            </div>
        )
    }
}

export default connect(mapStateToProps)(OptionPage);