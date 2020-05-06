import moment from 'moment'

export const isValidEmail = (email: string) => !!(email.match(/^[A-Za-z0-9.!#$%&'*+\/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Z-a-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/))
export const isValidName = (name: string) => !!(name.match(/^[^_]([A-Za-z_]){1,24}$/))
export const isValidPassword = (password: string) => !!(password.match(/^([A-Za-z\d]){4,}$/))
export const getDate = (date: Date) => moment(date).format('DD.MM.YYYY')