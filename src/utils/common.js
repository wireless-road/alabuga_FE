import moment from 'moment'
import 'moment/locale/nn'
import 'moment/locale/nb'

export function validateEmail(email) { // eslint-disable-next-line
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email) && email?.length < 254
}

export function validatePass(pass) {
  const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/
  return passw.test(pass)
}


export function randomRGBA(opacity = null) {
  const o = Math.round
  const r = Math.random
  const s = 255
  
  return `rgba(${o(r()*s)},${o(r()*s)},${o(r()*s)},${opacity != null ? opacity : r().toFixed(1)})`
}

function isYoutubeURL(src) {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
  return src.match(regExp)
}

function isVimeoURL(src) {
  const regExp = /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/
  return src.match(regExp)
}

export function detectVideoProvider(src) {
  if (typeof src !== 'string') return null
  if (isYoutubeURL(src)) return 'youtube'
  if (isVimeoURL(src)) return 'vimeo'
  return null
}

export const formatDocSize = docSizeByMB => {
  return docSizeByMB < 1
    ? `${Math.round(docSizeByMB * 1000)} KB`
    : `${Number(docSizeByMB).toFixed(2)} MB`
}

/**
 * Rounds a number to the amount of decimals specified
 * 
 * @param {number} x   - the number to round
 * @param {number} y  - number of decimal places to keep
 * 
 * @return {number}
 */
export function roundDecimal(x, y) {
  return Math.round((x + Number.EPSILON) * Math.pow(10, y)) / Math.pow(10, y);
}

export function currencyFormat(num, currency = 'USD', useCurrencySymbol = false) {
  if (!num && num !== 0) return num
  const currencyDisplay = useCurrencySymbol ? 'symbol' : 'code'
  return new Intl.NumberFormat(navigator.language, { style: 'currency', currency, currencyDisplay }).format(num)
}

export const formatNumberToLocaleValue = num => {
  if (!num) return ''
  return new Intl.NumberFormat(navigator.language, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(num)
}

export const formatLocaleValueToNumber = num => {
  if (!num) return ''
  if (isNumber(num)) return num
  const lang = navigator.language
  const group = new Intl.NumberFormat(lang).format(1111).replace(/1/g, '')
  const decimal = new Intl.NumberFormat(lang).format(1.1).replace(/1/g, '')
  let formattedNum = num.toString().replace(new RegExp(`\\${group}`, 'g'), '')
  formattedNum = formattedNum.replace(new RegExp(`\\${decimal}`, 'g'), '.')
  // replace &minus; to simple '-' for correct formatting string to number
  formattedNum = formattedNum.replace('−', '-')
  return +formattedNum
}


export function formatDate(date) {
  if (!date) return null
  return new Date(date).toLocaleString('default', { day: 'numeric', month: 'short', year: 'numeric' })
}

export const detectLanguage = () => navigator.language.split(/[-_]/)[0] || 'en'

export const truncateString = (str, n) => (str.length > n) ? `${str.substr(0, n-1)  }...` : str

export const localeFormatDate = (date, format = 'L') => {
  const lang = detectLanguage()
  moment.locale(lang)
  return moment(date).format(format)
}

export const isNumber = val => typeof val === 'number' && !isNaN(val) && Number(val) === val

export const isToday = val => {
  const someDate = new Date(val)
  const today = new Date()
  return someDate.getDate() === today.getDate() &&
    someDate.getMonth() === today.getMonth() &&
    someDate.getFullYear() === today.getFullYear()
}

export const colorizeKeyword = (sentence, keyword) => {
  const reg = new RegExp(`(${keyword})`, 'gi')
  const newSentence = sentence?.replace(reg, '<span style="background-color: #FFF1AE">$1</span>')

  return newSentence
}
