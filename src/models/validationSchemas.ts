import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { boolean, number, object, string, date, InferType } from "yup";
dayjs.extend(utc)
export const contactFormSchema = object({
    firstName: string().required('A first name is required.'),
    lastName: string().required('A last name is required.'),
    email: string().email('Check your email and try again.').required('An email is required.'),
    phone: string().notRequired(),
    budget: object({
        id: number().required('The budget object is missing the id.'),
        name: string().required('The budget object is missing the name.'),
        unavailable: boolean().required('The budget object is missing the unavailability flag.')
    }).required('A budget must be selected.'),
    date: date().transform(value => {return dayjs.utc(value).endOf('day').toDate()}).min(dayjs.utc().startOf('day').toDate(), 'The project date must be in the future.').required('A project date must be selected.'),
    message: string().required('A message is required.')
})

export interface ContactFormValidation extends InferType<typeof contactFormSchema>{}

export const addLeadFormValidation = object({
    shopName: string().required('A shop is required.'),
    shopEmail: string().email('Check your email and try again.').required('A shop email is required.'),
    app: string().required('An app must be selected.'),
})

export interface AddLeadFormValidation extends InferType<typeof addLeadFormValidation>{}

export const affiliateEmailFormSchema = object({
    email: string().email('Check your email and try again.').required('An email is required.'),
})

export interface AffiliateEmailFormValidation extends InferType<typeof affiliateEmailFormSchema>{}

export const affiliateLoginCodeFormSchema = object({
    loginCode: string().min(6, 'Login code must be atleast 6 digits long.').max(6, 'Login code cannot be longer than 6 digits.').required('Enter your 6-digit login code.'),
})

export interface AffiliateLoginCodeFormValidation extends InferType<typeof affiliateLoginCodeFormSchema>{}