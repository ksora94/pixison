import React, {Component} from 'react';
import qs from 'qs';
import {connect} from 'react-redux';
import {Nav, IconButton, Icon} from 'rsuite';
import classNames from 'classnames/bind';
import style from './page.scss';
import {Redirect, Route} from "react-router-dom";
import PageDetail from "./Detail";
import PageAdd from './Add';

const cx = classNames.bind(style);

const mapStateToProps = ({page}) => ({
    pages: page.pages
});

class OptionPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: qs.parse(props.location.search.slice(1)).url
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            selected: qs.parse(props.location.search.slice(1)).url
        })
    }

    render() {
        const {pages, history} = this.props;
        const {selected} = this.state;

        return (
            <div className={cx('con')}>
                <div className={cx('nav')}>
                    <div className={cx('nav-top')}>
                        <IconButton
                            appearance={'subtle'}
                            icon={<Icon icon={'plus-circle'}/>}
                            onClick={() => history.replace('/page/add')}
                        >添加</IconButton>
                    </div>
                    <Nav
                        activeKey={selected}
                        onSelect={url =>  history.replace(`/page/detail?${qs.stringify({url})}`)}
                        vertical
                    >
                        {pages.map((item) =>
                            <Nav.Item key={item.url} eventKey={item.url}>
                                {item.url} <span className={cx('itemName')}>{item.name}</span>
                            </Nav.Item>
                        )}
                    </Nav>
                </div>
                <Route exact path={'/page'}
                       render={() => <Redirect to={`/page/detail?${qs.stringify({url: pages[0].url})}`}/>}
                />
                <Route path={'/page/detail'} component={PageDetail}/>
                <Route path={'/page/add'} component={PageAdd}/>
            </div>
        )
    }
}

export default connect(mapStateToProps)(OptionPage);
