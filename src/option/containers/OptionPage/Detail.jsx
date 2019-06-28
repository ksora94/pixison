import React, {Component} from 'react';
import {connect} from "react-redux";
import qs from 'qs';
import classNames from 'classnames/bind';

import style from './page.scss';
import Container from 'components/Container';
import PageForm from 'components/PageForm';
import {autoSyncToDrive} from "js/sync";

const cx = classNames.bind(style);

const mapStateToProps = ({page}) => ({
    pages: page.pages
});

const mapDispatchToProps = {
    deletePage: (url) => ({
        type: 'DELETE_PAGE',
        data: url
    })
};


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
                default: null,
                expressions: []
            }
        };
    }

    componentDidMount() {
        this.updateData(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.updateData(nextProps);
    }

    updateData(props) {
        const {url} = qs.parse(props.location.search.slice(1));
        const item = props.pages.find(f => f.url === url);

        if (item && url !== this.state.url) {
            const {name, target, expressions} = item;

            this.setState({
                url,
                disabled: item.system,
                formValue: {
                    default: item.default,
                    name, url, target, expressions
                }
            })
        }
    }

    handleDeletePage() {
        this.props.deletePage(this.state.url);
        autoSyncToDrive();
        this.props.history.replace('/page');
    }

    render() {
        const {url, disabled, formValue} = this.state;
        const {history} = this.props;

        return (
            <Container
                title={url}
                disabled={disabled}
                confirmText={formValue.name}
                onDelete={this.handleDeletePage.bind(this)}
                onEdit={() => history.replace(`/page/edit?${qs.stringify({url})}`)}
            >
                <PageForm
                    mode={'detail'}
                    value={formValue}
                    disabled
                />
            </Container>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
