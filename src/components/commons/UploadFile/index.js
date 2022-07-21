import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import cn from 'classnames'
import { useDropzone } from 'react-dropzone'
import { IconUpload, IconUploadBig } from '../../../assests/icons'
import Button from '../Button'
import Text from '../Text'
import Loading from '../Loading'
import { BOOTSTRAP_VARIANTS } from '../../../constants/common'
import './style.scss'

const useHandleTranslation = () => {
  const [ t ] = useTranslation()
  return {
    dragNDropText: t('common_components.upload_file.drag_n_drop_text'),
    orText: t('common_components.upload_file.or_text'),
    chooseFilesText: t('common_components.upload_file.choose_files_text'),
  }
}

const UploadFile = props => {
  const {
    loading, onDropAccepted, onDropRejected, accept, withText,
    uploadMessage, multiple, withIcon, withButton, buttonSize
  } = props
  const translator = useHandleTranslation()

  // const handleOnDropRejected = files => {
  //   typeof onDropRejected === 'function' && onDropRejected(files)
  // }

  // const handleOnDropAccepted = files => {
  //   if (typeof onDropAccepted === 'function' && files.length) {
  //     onDropAccepted(files)
  //   }
  // }

  const handleOnDrop = (acceptedFiles, fileRejections) => {
    if (fileRejections.length > 0) {
      typeof onDropRejected === 'function' && onDropRejected(fileRejections)
    } else if (typeof onDropAccepted === 'function' && acceptedFiles.length) {
        onDropAccepted(acceptedFiles)
      }
  }

  const {
    getRootProps,
    open,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    noClick: true,
    noKeyboard: true,
    ...(accept && accept.length && { accept }),
    disabled: loading,
    // onDropRejected: handleOnDropRejected,
    // onDropAccepted: handleOnDropAccepted,
    onDrop: handleOnDrop,
    multiple
  })

  const dropZoneClass = cn('rounded upload-card', {
    'drag-active': isDragActive,
    'drag-accept': isDragAccept,
    'drag-reject': isDragReject,
  })

  return (
    <div {...((withButton && !withText) ? { className: 'upload-card only-button' } : getRootProps({ className: dropZoneClass }))}>
      <Loading childLoading loading={loading} />
      {withIcon && <div className="icon-upload-big"><IconUploadBig /></div>}
      {withText && <Text lines={1} align="center" className="upload-message">{uploadMessage || translator.dragNDropText}</Text>}
      {withText && withButton && <Text lines={1} align="center" className="upload-or-message">{translator.orText}</Text>}
      {withButton && (
        <div className="upload-button text-center">
          <Button
            onClick={open}
            text={translator.chooseFilesText}
            variant={BOOTSTRAP_VARIANTS.DARK}
            icon={<IconUpload />}
            size={buttonSize}
          />
      </div>
      )}
      <input {...getInputProps()} name="file" className="hide" />
    </div>
  )
}

UploadFile.propTypes = {
  loading: PropTypes.bool,
  onDropAccepted: PropTypes.func,
  onDropRejected: PropTypes.func,
  accept: PropTypes.arrayOf(PropTypes.string),
  uploadMessage: PropTypes.string,
  multiple: PropTypes.bool,
  withIcon: PropTypes.bool,
  withText: PropTypes.bool,
  withButton: PropTypes.bool,
  buttonSize: PropTypes.string
}

UploadFile.defaultProps = {
  loading: false,
  onDropAccepted: null,
  onDropRejected: null,
  accept: null,
  multiple: true,
  withIcon: false,
  withText: true,
  withButton: true,
  buttonSize: 'md'
}

UploadFile.displayName = 'UploadFile'

export default UploadFile
