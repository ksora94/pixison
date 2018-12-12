import React, {Component} from 'react';
import classNames from 'classnames/bind';
import style from './subMenu.scss';
import {Sidenav, Nav, Icon} from 'rsuite';

const cx = classNames.bind(style);

class SubMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: props.location.pathname.split('/')[1] || 'setting'
        };
    }

    goOption(optionId) {
        this.props.history.replace('/' + optionId);
        this.setState({
            selected: optionId
        })
    }

    render() {
        const {selected} = this.state;
        const navList = [{
            title: '全局设置',
            icon: 'setting',
            id: 'setting'
        }, {
            title: '页面管理',
            icon: 'web',
            id: 'page'
        }, {
            title: '表达式管理',
            icon: 'book',
            id: 'template'
        }];

        return (
            <div className={cx('con')}>
                <div className={cx('logo')} />
                <Sidenav
                    expanded={false}
                    activeKey={selected}
                    appearance="subtle"
                    onSelect={this.goOption.bind(this)}>
                    <Sidenav.Body>
                        <Nav>
                            {navList.map(item =>
                                <Nav.Item key={item.id} eventKey={item.id} icon={<Icon icon={item.icon}/>}>
                                    {item.title}
                                </Nav.Item>
                            )}
                        </Nav>
                    </Sidenav.Body>
                </Sidenav>
            </div>
        )
    }
}

export default SubMenu;
