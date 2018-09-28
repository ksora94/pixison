import React, {Component} from 'react';
import classNames from 'classnames';
import style from './subMenu.scss';
import {Sidenav, Nav, Icon} from 'rsuite';

const cx = classNames.bind(style);

class SubMenu extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <Sidenav defaultOpenKeys={['3', '4']} activeKey="1">
                    <Sidenav.Body>
                        <Nav>
                            <Nav.Item eventKey="1" icon={<Icon icon="dashboard" />}>
                                Dashboard
                            </Nav.Item>
                        </Nav>
                    </Sidenav.Body>
                </Sidenav>
            </div>
        )
    }
}

export default SubMenu;