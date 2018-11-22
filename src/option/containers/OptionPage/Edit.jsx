import React, {Component} from 'react';
import {Button} from "rsuite";
import classNames from 'classnames/bind';

import style from './page.scss';
import Container from 'components/Container';
import PageForm from 'components/PageForm';
import connect from "react-redux/es/connect/connect";
import qs from "qs";

const cx = classNames.bind(style);

const mapStateToProps = ({page}) => ({
    pages: page.pages
});

const mapDispatchToProps = {
    modifyPage: (page) => ({
        type: 'MODIFY_PAGE',
        data: page
    })
};

class Edit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            url: '',
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

    submit() {
        const {formValue} = this.state;

        if(this.form.root.check()) {
            this.props.modifyPage(formValue);
            this.props.history.replace(`/page/detail?${qs.stringify({url: formValue.url})}`);
        }
    }


    render() {
        const {url, formValue} = this.state;

        return (
            <Container title={url} disabled>
                <PageForm
                    ref={ref => (this.form = ref)}
                    mode={'edit'}
                    value={formValue}
                    onChange={formValue => this.setState({formValue})}
                />
                <Button
                    appearance={'primary'}
                    size={'md'}
                    style={{marginTop:'40px'}}
                    onClick={this.submit.bind(this)}
                >修改</Button>
            </Container>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
