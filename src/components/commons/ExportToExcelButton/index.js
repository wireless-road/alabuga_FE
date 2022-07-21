import React from 'react'
import PropTypes from 'prop-types'
import XLSX from 'xlsx-js-style'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

import { Button } from '../index'
import { BOOTSTRAP_VARIANTS } from '../../../constants/common'
import { IconExport } from '../../../assests/icons'
import { appActions } from '../../../redux/actions'

const ExportToExcelButton = ({ data: exportData, filename, sheetName, handleGetAllData, ...otherProps }) => {
  const [t] = useTranslation()
  const dispatch = useDispatch()
  const onClick = async () => {
    try {
      const  data_ = handleGetAllData ? await handleGetAllData() : exportData
      const data = data_.data
      const labels_ = data_.labels
      const wb = XLSX.utils.book_new()
      const labels = labels_.map(x => ({label_type: x.relation_type, label_value: x.name}))
      // const binaryWS = XLSX.utils.json_to_sheet([{'label_type':1, 'label_value':2}, {'label_type':3, 'label_value': 4}, {'label_type':5, 'label_value': 6}])
      const binaryWS = XLSX.utils.json_to_sheet(labels)
      const idx = (labels.length > 0) ? labels.length+3 : 1
      const cell = `A${idx}`
      XLSX.utils.sheet_add_json(binaryWS, data, { skipHeader: false, origin: cell })

      if (data.length) {
        // set excel column width due to max string length of every input data column
        const wscols = []
        Object.keys(data[0]).forEach(col => {
          const minColumnLength = Math.min(...(data.map(el => el[col]?.length || 0)), col.length)
          const maxColumnLength = Math.max(...(data.map(el => el[col]?.length || 0)), col.length)
          const columnLength = ((minColumnLength === 0 ) || (maxColumnLength / minColumnLength < 4)) ? maxColumnLength + 3 : (minColumnLength + maxColumnLength) / 2
          wscols.push({ wch: columnLength })
        })
        binaryWS['!cols'] = wscols
        const style = {
          font: {
                name: 'Calibri',
                bold: false,
                color: { rgb: 'FF131313' },
              },
          fill: {
            'fgColor': { rgb: 'FFBEBEBE' }
          },
          alignment: {
            'horizontal': 'center'
          },
          border: {
            top: {
              style: 'thin',
              color: { rgb: 'FF131313' }
            },
            bottom: {
              style: 'thin',
              color: { rgb: 'FF131313' }
            },
            left: {
              style: 'thin',
              color: { rgb: 'FF131313' }
            },
            right: {
              style: 'thin',
              color: { rgb: 'FF131313' }
            },
          }
        }

        const rowNum = idx-1
        var colNum
        const range = XLSX.utils.decode_range(binaryWS['!ref'])
        // for(rowNum = range.s.r; rowNum <= range.e.r; rowNum++){
           for(colNum=range.s.c; colNum<=range.e.c; colNum++){
              const nextCell = binaryWS[
                 XLSX.utils.encode_cell({ r: rowNum, c: colNum })
              ]
              nextCell.s = style
           }
       // }
        if(labels.length > 0) {
          binaryWS['A1'].s = style
          binaryWS['B1'].s = style
        }
      }

      XLSX.utils.book_append_sheet(wb, binaryWS, sheetName)
      XLSX.writeFile(wb, `${filename}.xlsx`)
    } catch (error) {
      dispatch(appActions.showErrorNotification(t('common_phrases.something_went_wrong')))
    }
  }

  return (
    <Button
      text={t('common_components.export_button.title')}
      variant={BOOTSTRAP_VARIANTS.LIGHT}
      size="sm"
      icon={<IconExport />}
      iconPosition="right"
      onClick={onClick}
      {...otherProps}
    />
  )
}

ExportToExcelButton.propTypes = {
  data: PropTypes.array,
  filename: PropTypes.string,
  sheetName: PropTypes.string,
}

ExportToExcelButton.defaultProps = {
  data: [],
  filename: 'Exported',
  sheetName: 'Sheet1',
}

export default ExportToExcelButton
