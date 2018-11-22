import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import style from './header.scss';
import {IconButton, Icon, Modal, Button} from 'rsuite';

const cx = classNames.bind(style);

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showDelModal: false
        }
    }

    toggleModal(showDelModal) {
        this.setState({
            showDelModal
        });
    }

    handleDelConfirm() {
        this.props.onDelete();
        this.toggleModal(false);
    }

    render() {
        const {children, onEdit, className, disabled, confirmText, ...props} = this.props;
        const {showDelModal} = this.state;

        return (
            <div className={cx('con', className)}>
                <span className={cx('title')}>{children}</span>
                {!disabled &&
                    <div>
                        <IconButton
                            appearance={'subtle'}
                            icon={<Icon icon={'edit'}/>}
                            onClick={onEdit}
                        />
                        <IconButton
                            appearance={'subtle'}
                            icon={<Icon icon={'trash-o'}/>}
                            onClick={() => this.toggleModal(true)}
                        />
                    </div>
                }
                <Modal size={'xs'}
                       show={showDelModal}
                       onHide={() => this.toggleModal(false)}
                >
                    <Modal.Header>
                        <Modal.Title>删除</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        确定删除 {confirmText} 吗
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => this.handleDelConfirm()} appearance="subtle">确定</Button>
                        <Button onClick={() => this.toggleModal(false)} appearance="subtle">取消</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

Header.defaultProps = {
    disabled: false,
    confirmText: '',
    onDelete: () => {},
    onEdit: () => {}
};

Header.propTypes = {
    disabled: PropTypes.bool,
    confirmText: PropTypes.string,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
};

export default Header;
