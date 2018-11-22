import React, {Component} from 'react';
import {Table, Button, IconButton, Icon, Radio} from 'rsuite';
import classNames from 'classnames/bind';
import style from './page.scss';
import TemplateInput from 'components/TemplateInput';

const cx = classNames.bind(style);

const RadioCell = function ({rowData, dataKey, onChange, checkedValue, disabled, ...props}) {
    return (
        <Table.Cell {...props} style={{padding: '4px 0'}}>
            {(!disabled || checkedValue === rowData[dataKey]) &&
            <Radio
                onChange={onChange}
                name={'expressionDefault'}
                value={rowData[dataKey]}
                checked={checkedValue === rowData[dataKey]}
            />
            }
        </Table.Cell>
    )
};

const ExpressionCell = function ({rowData, dataKey, editIndex, value, onChange, ...props}) {
    const style = editIndex === rowData.index ? {padding: '4px 10px'} : {};

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

const ActionCell = function ({rowData, dataKey, editIndex, onSaveClick, onEditClick, onDelClick, onCancelClick, ...props}) {
    return editIndex === rowData.index ? (
        <Table.Cell {...props} style={{padding: '6px'}}>
            <Button appearance={'link'} onClick={() => onSaveClick(rowData)}>完成</Button>
            <Button appearance={'link'} onClick={() => onCancelClick(rowData)}>取消</Button>
        </Table.Cell>
    ) : (
        <Table.Cell {...props} style={{padding: '6px'}}>
            <Button appearance={'link'} onClick={() => onEditClick(rowData)}>修改</Button>
            <Button appearance={'link'} onClick={() => onDelClick(rowData)}>删除</Button>
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

    handleSaveClick() {
        const {editIndex, editValue} = this.state;
        const expressions = [...this.props.value.expressions];
        let defaultExpression = this.props.value.default || editValue;

        expressions[editIndex] = editValue;
        this.setState({
            editIndex: -1,
            editValue: ''
        });
        this.props.onChange({
            default: defaultExpression,
            expressions
        });

    }

    handleEditClick({index, value}) {
        this.setState({
            editIndex: index,
            editValue: value
        })
    }

    handleAddClick() {
        const expressions = [...this.props.value.expressions];
        let defaultExpression = this.props.value.default;

        if (this.state.editIndex >= 0) return;
        expressions.push('');
        this.props.onChange({
            default: defaultExpression,
            expressions
        });
        this.setState({
            editIndex: expressions.length - 1,
            editValue: ''
        });
    }

    handleDelClick({index, value}) {
        const expressions = [...this.props.value.expressions];
        let defaultExpression = this.props.value.default;

        expressions.splice(index, 1);
        if (defaultExpression === value) {
            defaultExpression = expressions.length ? expressions[0] : null;
        }
        this.props.onChange({
            default: defaultExpression,
            expressions
        });
    }

    handleCancelClick({index, value}) {
        const expressions = [...this.props.value.expressions];

        if (!value) {
            expressions.splice(index, 1);
        }
        this.props.onChange({
            default: this.props.value.default,
            expressions
        });
        this.setState({
            editIndex: -1,
            editValue: ''
        });
    }

    handleCheckDefault(value) {
        this.props.onChange({
            default: value,
            expressions: this.props.value.expressions
        })
    }

    render() {
        const {editIndex, editValue} = this.state;
        const {disabled, value} = this.props;
        const expressions = value.expressions.map((value, index) => ({
            value,
            index
        }));

        return (
            <div className={cx('expressions')}>
                <Table
                    data={expressions}
                    height={expressions.length ? 200 : 0}
                    autoHeight={true}
                >
                    {editIndex < 0 &&
                    <Table.Column width={70} fixed>
                        <Table.HeaderCell>默认</Table.HeaderCell>
                        <RadioCell
                            disabled={disabled}
                            dataKey={'value'}
                            checkedValue={value.default}
                            onChange={this.handleCheckDefault.bind(this)}
                        />
                    </Table.Column>
                    }
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
                    <Table.Column width={120}>
                        <Table.HeaderCell/>
                        <ActionCell
                            editIndex={editIndex}
                            onSaveClick={this.handleSaveClick.bind(this)}
                            onEditClick={this.handleEditClick.bind(this)}
                            onDelClick={this.handleDelClick.bind(this)}
                            onCancelClick={this.handleCancelClick.bind(this)}
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
    value: {
        default: null,
        expressions: []
    },
    disabled: false,
    onChange: () => {
    }
};

export default Expressions;
