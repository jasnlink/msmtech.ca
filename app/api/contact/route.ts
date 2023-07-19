import { NextResponse } from "next/server"
import { NextRequest } from "next/server"
import { ContactFormValidation, contactFormSchema } from "@/src/models/validationSchemas"
import { ValidationError } from "yup"
import nodemailer from "nodemailer"
import dayjs from "dayjs"

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || ``),
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
})

async function sendMail(formData: ContactFormValidation) {
    const result = await transporter.sendMail({
        from: `"Contact Form Mailer" <${process.env.CONTACT_FORM_FROM}>`,
        to: `${process.env.CONTACT_FORM_TO}`,
        subject: `New Form Submission from - ${formData.email}`,
        text: `First Name: ${formData.firstName}\nLast Name: ${formData.lastName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nBudget: ${formData.budget.name}\nProject Date: ${dayjs(formData.date).format('YYYY-MM-DD')}\nMessage: ${formData.message}`,
        html: `
            <style type="text/css">
                .tg  {border-collapse:collapse;border-spacing:0;}
                .tg td{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
                    overflow:hidden;padding:10px 5px;word-break:normal;}
                .tg th{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
                    font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}
                .tg .tg-i7zr{font-family:Arial, Helvetica, sans-serif !important;text-align:left;vertical-align:top}
                .tg .tg-epbc{font-family:Arial, Helvetica, sans-serif !important;font-weight:bold;text-align:left;vertical-align:top}
                .tg .tg-az8j{border-color:inherit;font-family:Arial, Helvetica, sans-serif !important;font-weight:bold;text-align:left;
                    vertical-align:top}
            </style>
            <table class="tg">
                <thead>
                    <tr>
                        <th class="tg-az8j">First Name</th>
                        <th class="tg-i7zr">${formData.firstName}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="tg-epbc">Last Name</td>
                        <td class="tg-i7zr">${formData.lastName}</td>
                    </tr>
                    <tr>
                        <td class="tg-epbc">Email</td>
                        <td class="tg-i7zr">${formData.email}</td>
                    </tr>
                    <tr>
                        <td class="tg-epbc">Phone</td>
                        <td class="tg-i7zr">${formData.phone}</td>
                    </tr>
                    <tr>
                        <td class="tg-epbc">Budget</td>
                        <td class="tg-i7zr">${formData.budget.name}</td>
                    </tr>
                    <tr>
                        <td class="tg-epbc">Project Date</td>
                        <td class="tg-i7zr">${dayjs(formData.date).format('YYYY-MM-DD')}</td>
                    </tr>
                    <tr>
                        <td class="tg-epbc">Message</td>
                        <td class="tg-i7zr">${formData.message}</td>
                    </tr>
                </tbody>
            </table>
        `
    })

    console.log("mail sent: %s", result.messageId);
}

export async function POST(request: NextRequest) {
    const data = await request.json()
    return contactFormSchema.validate(data)
        .then((res: ContactFormValidation) => {
            console.log('validation passed...', res)

            return sendMail(res)
            .then(() => {
                console.log('sending positive response...')
                return NextResponse.json(null, { status: 200 })
            })
            .catch((err) => {
                console.error('mail was not sent...', err)
                return NextResponse.json(
                    {
                        status: 500
                    }
                )
            })
        })
        .catch((err: ValidationError) => {
            console.error('validation error...', err)
            let errorMessage: { [key: string]: string } = {}
            if (err.path && err.errors.length) {
                errorMessage[err.path] = err.errors[0]
            }
            return NextResponse.json(
                errorMessage,
                {
                    status: 422
                }
            )
        })
}