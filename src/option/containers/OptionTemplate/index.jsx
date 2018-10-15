import React, {Component} from 'react';
import {Route} from 'react-router-dom'
import {connect} from 'react-redux';
import classNames from 'classnames/bind';
import style from './template.scss';
import {IconButton, Icon, Nav} from 'rsuite';
import TemplateDetail from './TemplateDetail';
import TemplateAdd from './TemplateAdd';

const cx = classNames.bind(style);

const mapStateToProps = ({templateReducers}) => {
    return {
        templates: templateReducers.templates
    };
};

class OptionTemplate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 0
        }
    }

    componentWillMount() {
        this.changeSelected(0);
    }

    changeSelected(event) {
        const {templates, history} = this.props;

        this.setState({
            selected: event
        });
        history.replace({
            pathname: '/template/detail',
            state: {
                template: templates[event]
            }
        })
    }

    goTemplateAdd() {
        this.props.history.replace({
            pathname: '/template/add'
        })
    }

    render() {
        const {templates} = this.props;
        const {selected} = this.state;

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
                        {templates.map((item, index) =>
                            <Nav.Item key={item.expression} eventKey={index}>
                                {item.name}
                            </Nav.Item>
                        )}
                    </Nav>
                </div>
                <Route path={'/template/detail'} component={TemplateDetail}/>
                <Route path={'/template/add'} component={TemplateAdd}/>
            </div>
        )
    }
}

export default connect(mapStateToProps)(OptionTemplate);