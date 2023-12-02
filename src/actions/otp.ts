import { totp } from "otplib";
if (!process.env.OTP_SECRET) {
    console.error(`Could not load OTP_SECRET`)
    throw new Error(`Could not load OTP_SECRET`)
}

totp.options = {
    digits: 6,
    step: 1,
    window: [300, 0]
}

const totpActions = {
    generateCode(identifiers: string[]=[]) {
        return totp.generate(`${process.env.OTP_SECRET}.${identifiers.join('.')}`)
    },
    verifyCode(token: string, identifiers: string[]=[]) {
        return totp.verify({
            secret: `${process.env.OTP_SECRET}.${identifiers.join('.')}`,
            token: token,
        })
    }
}

export const generateOtpCode = totpActions.generateCode
export const verifyOtpCode = totpActions.verifyCode
