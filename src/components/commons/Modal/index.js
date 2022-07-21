import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { Modal, ModalDialog } from 'react-bootstrap'
import Draggable  from 'react-draggable'

import { IconClose } from '../../../assests/icons'

import Loading from '../Loading'

import './style.scss'

const DraggableModalDialog = props => <Draggable handle=".modal-title"><ModalDialog {...props} /></Draggable>

const CustomModal = (props) => {
  const {
    show,
    centered,
    draggable,
    className,
    title,
    children,
    loading,
    onHide,
    size,
    noPadding,
    ...bootstrapModalProps
  } = props
  const customClasses = cn('custom-modal', { 'no-padding': noPadding }, [
    className,
  ])

  return (
    <Modal
      className={customClasses}
      show={show}
      centered={centered}
      onHide={onHide}
      size={size}
      {...(draggable ? { dialogAs : DraggableModalDialog } : {})}
      {...bootstrapModalProps}
    >
      <Modal.Title className="modal-title-wrapper">
        <div className="modal-title-custom">{title}</div>
        <span role="button" onClick={onHide} className="close-icon"><IconClose /></span>
      </Modal.Title>
      <Modal.Body className="modal-body-wrapper">
        <Loading
          loading={loading}
          className="modal-loading-state"
          childLoading
        />
        <div className="modal-container">{children}</div>
      </Modal.Body>
    </Modal>
  )
}

CustomModal.propTypes = {
  className: PropTypes.string,
  loading: PropTypes.bool,
  onHide: PropTypes.func,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  show: PropTypes.bool,
  centered: PropTypes.bool,
  draggable: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'lg', 'xl']),
  noPadding: PropTypes.bool,
}

CustomModal.defaultProps = {
  className: '',
  loading: false,
  onHide: () => {},
  title: '',
  children: null,
  show: false,
  centered: false,
  draggable: false,
  size: 'sm',
  noPadding: false,
}

export default CustomModal
