/**
 <Modal>
     <Modal.Header children='Название_модального_окна' />
     <Modal.Body> ... </Modal.Body>
     <Modal.Footer>
         <Button onClick={this.handleClose} white>Отменить</Button>
         <Button onClick={this.handleSubmit} blue>Сохранить</Button>
     </Modal.Footer>
 </Modal>
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const Backdrop = props => <div {...props} className={[ 'modal-base__backdrop', props.className ]} />;
const Container = props => <div {...props} className={[ 'modal-base__container', props.className ]} />;
const Row = props => <div {...props} className={[ 'modal-base__row', props.className ]} />;
const Header = props => <div {...props} className={[ 'modal-base__row modal-base__header', props.className ]} />;
const Body = props => <div {...props} className={[ 'modal-base__row modal-base__body', props.className ]} />;
const Footer = props => <div {...props} className={[ 'modal_group__row modal-base__footer', props.className ]} />;

const shortcutPropTypes = { className: PropTypes.string };

Backdrop.propTypes = shortcutPropTypes;
Container.propTypes = shortcutPropTypes;
Row.propTypes = shortcutPropTypes;
Header.propTypes = shortcutPropTypes;
Body.propTypes = shortcutPropTypes;
Footer.propTypes = shortcutPropTypes;

export default class Modal extends Component {
    static propTypes = {
        className: PropTypes.string,
        children: PropTypes.node.isRequired,
        open: PropTypes.bool,
        onOpen: PropTypes.func,
        onClose: PropTypes.func,
    };

    static defaultProps = {
        open: false,
    };

    open = () => this.toggle(true, this.props.onOpen);

    close = () => this.toggle(false, this.props.onClose);

    toggle = (open, callback) => typeof callback === 'function' && callback();

    render() {
        const { className, children, open, ...props } = this.props;

        return (
            <div className={[ 'modal-base', className, open && 'open' ]}>
                <Backdrop onClick={this.close} />
                <Container {...props}>
                    <span className="modal-base__close" onClick={this.close} />
                    {children}
                </Container>
            </div>
        );
    }
}

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;
Modal.Row = Row;
Modal.Container = Container;
