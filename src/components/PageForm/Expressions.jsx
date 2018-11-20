import React, {Component} from 'react';
import {Table, Button, IconButton, Icon} from 'rsuite';
import classNames from 'classnames/bind';
import style from './page.scss';
import TemplateInput from 'components/TemplateInput';

const cx = classNames.bind(style);

const IndexCell = function ({rowData, dataKey, ...props}) {
    return <Table.Cell {...props}>{rowData[dataKey] + 1}</Table.Cell>
};

const ExpressionCell = function ({ rowData, dataKey, editIndex, value, onChange, ...props }) {
    const style = editIndex === rowData.index ? {padding: '4px 0'} : {};

    return (
        <Table.Cell {...props} style={style}>
            {editIndex === rowData.index ?
                <TemplateInput
                    as={'input'}
                    value={value}
                    onChange={onChange}
                />
                :
                rowData[dataKey]
            }
        </Table.Cell>
    )
};

const ActionCell = function ({rowData, dataKey, editIndex, onEditClick, onDelClick, ...props}) {
    return (
        <Table.Cell {...props} style={{padding: '6px'}}>
            <Button appearance={'link'} onClick={() => onEditClick(rowData)}>{editIndex === rowData.index ? '完成' : '修改'}</Button>
            {editIndex !== rowData.index && <Button appearance={'link'} onClick={() => onDelClick(rowData)}>删除</Button>}
        </Table.Cell>
    )
};

class Expressions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editIndex: -1,
            editValue: ''
        }
    }

    handleEditClick({index, value}) {
        const {editIndex, editValue} = this.state;

        if (editIndex === index) {
            const newValue = [...this.props.value];

            newValue[editIndex] = editValue;
            this.setState({
                editIndex: -1,
                editValue: ''
            });
            this.props.onChange(newValue);
        } else {
            this.setState({
                editIndex: index,
                editValue: value
            })
        }
    }

    handleAddClick() {
        const newValue = [...this.props.value];

        newValue.push('');
        this.props.onChange(newValue);
        this.setState({
            editIndex: newValue.length - 1,
            editValue: ''
        });
    }

    handleDelClick({index}) {
        const newValue = [...this.props.value];

        newValue.splice(index, 1);
        this.props.onChange(newValue);
    }

    render() {
        const {editIndex, editValue} = this.state;
        const {disabled} = this.props;
        const value = this.props.value.map((value, index) => ({
            value,
            index
        }));

        return (
            <div className={'page_expressions'}>
                <Table
                    showHeader={false}
                    data={value}
                    height={value.length ? 200 : 0}
                    autoHeight={true}
                >
                    <Table.Column width={70} fixed>
                        <Table.HeaderCell>序号</Table.HeaderCell>
                        <IndexCell dataKey={'index'} />
                    </Table.Column>
                    <Table.Column flexGrow={1}>
                        <Table.HeaderCell>表达式</Table.HeaderCell>
                        <ExpressionCell
                            editIndex={editIndex}
                            dataKey={'value'}
                            value={editValue}
                            onChange={editValue => this.setState({editValue})}
                        />
                    </Table.Column>
                    {!disabled &&
                        <Table.Column width={140}>
                            <Table.HeaderCell/>
                            <ActionCell
                                editIndex={editIndex}
                                onEditClick={this.handleEditClick.bind(this)}
                                onDelClick={this.handleDelClick.bind(this)}
                            />
                        </Table.Column>
                    }
                </Table>
                {!disabled &&
                    <IconButton
                        onClick={this.handleAddClick.bind(this)}
                        style={{marginTop: '10px'}}
                        appearance={'subtle'}
                        icon={<Icon icon="plus"/>}
                    />
                }
            </div>
        )
    }
}

Expressions.defaultProps = {
    value: [],
    disabled: false,
    onChange: () => {}
};

export default Expressions;
