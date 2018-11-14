import React, {Component} from 'react';
import {Redirect, Route} from 'react-router-dom'
import {connect} from 'react-redux';
import classNames from 'classnames/bind';
import style from './template.scss';
import {IconButton, Icon, Nav} from 'rsuite';
import TemplateDetail from './TemplateDetail';
import TemplateAdd from './TemplateAdd';
import {selectTemplate} from 'option/store/actions';

const cx = classNames.bind(style);

const mapStateToProps = ({template}) => ({
    templates: template.templates,
    selected: template.selected
});

const mapDispatchToProps = dispatch => ({
    selectTemplate(name) {
        dispatch(selectTemplate(name));
    }
});

class OptionTemplate extends Component {
    constructor(props) {
        super(props);
    }

    changeSelected(name) {
        const {history, selectTemplate} = this.props;

        selectTemplate(name);
        history.replace({
            pathname: '/template/detail',
            state: {
                name
            }
        })
    }

    goTemplateAdd() {
        this.props.history.replace({
            pathname: '/template/add'
        })
    }

    render() {
        const {templates, selected} = this.props;

        return (
            <div className={cx('con')}>
                <div className={cx('nav')}>
                    <div className={cx('nav-top')}>
                        <IconButton
                            appearance={'subtle'}
                            icon={<Icon icon={'plus-circle'}/>}
                            onClick={() => this.goTemplateAdd()}
                        >添加</IconButton>
                    </div>
                    <Nav
                        activeKey={selected}
                        onSelect={this.changeSelected.bind(this)}
                        vertical
                    >
                        {templates.map((item) =>
                            <Nav.Item key={item.name} eventKey={item.name}>
                                {item.name}
                            </Nav.Item>
                        )}
                    </Nav>
                </div>
                <Route exact path={'/template'} render={() => <Redirect to={'/template/detail'}/>} />
                <Route path={'/template/detail'} component={TemplateDetail}/>
                <Route path={'/template/add'} component={TemplateAdd}/>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OptionTemplate);