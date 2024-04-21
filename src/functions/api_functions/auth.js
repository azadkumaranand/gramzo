import { FETCH_API } from "../utils";

export const generate_otp_api = async (phoneNumber) => FETCH_API({
    url: 'auth/otp/generate',
    body: {
        to: `+91${phoneNumber}`
    }
})

export const verify_otp_api = async (userId, code) => FETCH_API({
    url: 'auth/otp/verify',
    body: {
        userId,
        code
    }
})
