'use server'

import prisma from "@/src/actions/database"
import { generateOtpCode, verifyOtpCode } from "@/src/actions/otp"
import { ActionResponse } from "@/src/models"
import { addLeadFormValidation, affiliateEmailFormSchema, affiliateLoginCodeFormSchema } from "@/src/models/validationSchemas"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import nodemailer from "nodemailer";
import { ValidationError } from "yup"

export async function handleLoginEmail(data: FormData): Promise<ActionResponse> {

    let response: ActionResponse = {
        result: {},
        errors: {},
    }

    const email = data.get('email')?.toString() ?? ''
    let dataValidation = null

    try {
        dataValidation = await affiliateEmailFormSchema.validate({
            email: email
        })
    } catch (error) {
        console.log(`handleLoginEmail dataValidation error`, {
            error: error,
            email: email,
        })
        if (error instanceof ValidationError) {
            response.errors = {
                message: error.errors[0]
            }
        } else {
            throw Error
        }
        return response
    }

    console.log(`Running handleLoginEmail`, {
        email: email,
    })

    const foundEmail = await prisma.affiliateUser.findUnique({
        where: {
            email: email,
            deleted: false,
        }
    })

    if (!foundEmail || !dataValidation) {
        console.error(`handleLoginEmail Error`, {
            email: email,
            foundEmail: foundEmail,
        })
        response.errors = {
            message: 'Check your email and try again.'
        }
        return response
    }

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || ``),
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    })

    const token = generateOtpCode([email])

    const result = await transporter.sendMail({
        from: `"msmtech_ mailer" <${process.env.OTP_FROM}>`,
        to: `${email}`,
        subject: `Your one-time login code is ${token}`,
        text: `MSM TECHNOLOGIES -- Your one-time login code is ${token}. Please do not share it with anyone. Thank you!`,
        html: `
            <h1>MSM TECHNOLOGIES</h1>
            <p>Your one-time login code is ${token}</p>
            <p>Please do not share it with anyone.</p>
            <p>Thank you!</p>
        `
    })

    console.log(`handleLoginEmail finished running`, {
        email: email,
        token: token,
        messageId: result.messageId
    });
    response.result = dataValidation
    return response

}

export async function handleLoginCode(data: FormData): Promise<ActionResponse> {

    let response: ActionResponse = {
        result: {},
        errors: {},
    }

    const email = data.get('email')?.toString() ?? ''
    const loginCode = data.get('loginCode')?.toString() ?? ''
    
    let emailDataValidation = null
    let loginCodeDataValidation = null
    
    try {
        emailDataValidation = await affiliateEmailFormSchema.validate({
            email: email
        })
        loginCodeDataValidation = await affiliateLoginCodeFormSchema.validate({
            loginCode: loginCode
        })
    } catch (error) {
        console.log(`handleLoginCode dataValidation error`, {
            error: error,
            email: email,
            loginCode: loginCode,
        })
        if (error instanceof ValidationError) {
            response.errors = {
                path: error.path,
                message: error.errors[0]
            }
        } else {
            throw Error
        }
        return response
    }

    console.log(`Running handleLoginCode`, {
        email: email,
        loginCode: loginCode,
    })
    
    const isValid = verifyOtpCode(loginCode, [email])
    if (!isValid) {
        console.error(`handleLoginEmail Error`, {
            email: email,
            loginCode: loginCode,
        })
        response.errors = {
            message: 'Check you login code and try again.'
        }
        return response
    }

    const sessionId = crypto.randomUUID();
    // Create a new session in the database
    await prisma.session.create({
        data: {
            id: sessionId,
            affiliateUser: {
                connect: {
                    email: email
                }
            },
            expires: new Date((new Date).getTime() + (604800 * 1000))
        }
    });

    const cookieStore = cookies()
    const cookieOptions = {
        name: "session-id",
        value: sessionId,
        maxAge: 604800,
    };

    cookieStore.set(cookieOptions)

    console.log(`handleLoginCode finished running`, {
        email: email,
        sessionId: sessionId,
        loginCode: loginCode
    });

    return response
}

export async function validateSessionRedirect(lng?: string) {
    const sessionValidation = await validateSession()
    console.log(`Running validateSessionRedirect`, {
        sessionValidation: sessionValidation,
    })
    if (sessionValidation) {
        redirect(`/${lng ?? `en`}/affiliates/dashboard`)
    }
    redirect(`/${lng ?? `en`}/affiliates`)
}

export async function validateSession() {
    const cookieStore = cookies()
    const sessionStore = cookieStore.get('session-id')
    console.log(`Running validateSession`, {
        sessionStore: sessionStore,
    })
    if (sessionStore?.value) {
        try {
            const foundSession = await prisma.session.findFirst({
                where: {
                    id: sessionStore.value,
                    deleted: false,
                    expires: {
                        gt: (new Date)
                    }
                }
            })

            if (foundSession) {
                return true
            } else {
                return false
            }
        } catch (error) {
            console.error(`validateSessionRedirect error`, {
                sessionStore: sessionStore,
                error: error
            })
        }
    }
    return false
}

export async function logoutSession() {
    const cookieStore = cookies()
    cookieStore.set('session-id', '')
    return
}

export async function actionAddLead(lng: string, data: FormData) {
    let response: ActionResponse = {
        result: {},
        errors: {},
    }

    const affiliateLeadInput = {
        shopName: data.get('shopName')?.toString() ?? '',
        shopEmail: data.get('shopEmail')?.toString() ?? '',
        app: data.get('app')?.toString() ?? '',
    }

    
    let affiliateLeadInputValidation = null
    
    try {
        affiliateLeadInputValidation = await addLeadFormValidation.validate(affiliateLeadInput)
    } catch (error) {
        console.log(`actionAddLead dataValidation error`, {
            error: error,
            affiliateLeadInput: affiliateLeadInput,
        })
        if (error instanceof ValidationError) {
            response.errors = {
                path: error.path,
                message: error.errors[0]
            }
        } else {
            throw Error
        }
        return response
    }

    
    const cookieStore = cookies()
    const sessionStore = cookieStore.get('session-id')

    console.log(`Running actionAddLead`, {
        affiliateLeadInput: affiliateLeadInput,
        sessionStore: sessionStore,
    })

    if (sessionStore?.value) {

        const currentUser = await getCurrentUserFromSession(sessionStore.value)

        try {
            await prisma.affiliateLead.create({
                data: {
                    id: crypto.randomUUID(),
                    shop: affiliateLeadInput.shopName,
                    shopEmail: affiliateLeadInput.shopEmail,
                    affiliateUserId: currentUser?.id ?? '',
                    app: affiliateLeadInput.app,
                }
            })
        } catch (error) {
            console.error(`actionAddLead error`, {
                affiliateLeadInput: affiliateLeadInput,
                currentUser: currentUser,
                sessionStore: sessionStore,
                error: error
            })
            throw Error
        }
    

    }

    return redirect(`/${lng ?? `en`}/affiliates/dashboard`)

}

export async function getCurrentUserFromSession(sessionId: string) {
    try {
        return await prisma.affiliateUser.findFirst({
            where: {
                session: {
                    id: sessionId
                },
                deleted: false
            }
        })
    } catch (error) {
        console.error(`getCurrentUserFromSession error`, {
            sessionId: sessionId,
            error: error
        })
    }
}