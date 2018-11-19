import React, {Component} from 'react';
import {Redirect, Route} from 'react-router-dom'
import classNames from 'classnames/bind';
import style from './template.scss';
import {Nav} from 'rsuite';
import TemplateDetail from './Detail';
import {functionsArray} from 'js/functions';

const cx = classNames.bind(style);

class OptionTemplate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            functions: functionsArray,
            selected: functionsArray[0].key
        }
    }

    changeSelected(key) {
        const {history} = this.props;

        history.replace(`/template/detail?key=${key}`);
        this.setState({
            selected: key
        })
    }

    componentDidMount() {
        this.changeSelected(functionsArray[0].key);
    }

    render() {
        const {functions, selected} = this.state;

        return (
            <div className={cx('con')}>
                <div className={cx('nav')}>
                    <Nav
                        activeKey={selected}
                        onSelect={this.changeSelected.bind(this)}
                        vertical
                    >
                        {functions.map((item) =>
                            <Nav.Item key={item.key} eventKey={item.key}>
                                {item.name}
                            </Nav.Item>
                        )}
                    </Nav>
                </div>
                <Route exact path={'/template'} render={() => <Redirect to={'/template/detail'}/>} />
                <Route path={'/template/detail'} component={TemplateDetail}/>
            </div>
        )
    }
}

export default OptionTemplate;