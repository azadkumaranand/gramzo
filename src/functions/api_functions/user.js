import { FETCH_API } from "@func/utils"

// localhost:8000/u/users/getuserdetails
export const get_user_details_api = async (user_id, address_id) => FETCH_API({
    url: 'u/users/getuserdetails',
    body: {
        user_id,
        address_id
    }
})