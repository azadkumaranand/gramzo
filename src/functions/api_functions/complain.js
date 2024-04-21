import { FETCH_API } from "../utils";

// localhost:8000/a/complains/getcomplains?page=1&perPage=20
export const get_complains_api = async ({ page = 1, perPage = 5, store_id, status }) => FETCH_API({
    url: `a/complains/getcomplains?page=${page}&perPage=${perPage}`,
    method: 'POST',
    body: {
        store_id,
        status
    }
})

///localhost:8000/a/complains/updatecomplain
export const update_complain_api = async ({ complain_id, status, vendor_refund_amount, optionSelected }) => FETCH_API({
    url: 'a/complains/updatecomplain',
    method: 'POST',
    body: {
        complain_id,
        status,
        vendor_refund_amount,
        optionSelected
    }
})


///localhost:8000/a/complains/changestatus

export const change_complain_status_api = async ({ complain_id, status }) => FETCH_API({
    url: 'a/complains/changestatus',
    method: 'POST',
    body: {
        complain_id,
        status
    }
})