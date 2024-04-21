import { FETCH_API } from "../utils";

// localhost:8000/a/orders/getorders?status=done&page=1&perPage=20
export const get_orders_api = async ({ store_id, status = 'received', page = 1, perPage = 12, startDate, endDate }) => FETCH_API({
    url: `a/orders/getorders?status=${status}&page=${page}&perPage=${perPage}`,
    method: 'POST',
    body: {
        store_id: store_id,
        startDate,
        endDate
    }
})

///a/orders/updateorderstatus
export const update_order_status_api = async ({ order_id, status, data }) => FETCH_API({
    url: `a/orders/updateorderstatus`,
    method: 'POST',
    body: {
        order_id,
        status,
        data
    }
})

export const reject_order_api = async (order_id, reason_for_cancellation) => FETCH_API({
    url: `a/orders/updateorderstatus`,
    method: 'POST',
    body: {
        order_id,
        status: 'cancelled',
        reason_for_cancellation
    }
})

