import { FETCH_API } from "../utils"

//POST: localhost:8000/a/vendors/pd/adddeliverytime
export const add_delivery_time_api = async (body) => FETCH_API({
    url: 'a/vendors/pd/adddeliverytime',
    body
})


//POST: localhost:8000/a/vendors/pd/addaddress
export const add_pickup_address_api = async (body) => FETCH_API({
    url: 'a/vendors/pd/addaddress',
    body
})

//POST: localhost:8000/a/vendors/pd/changedefaultaddress
export const change_default_pickup_address_api = async (body) => FETCH_API({
    url: 'a/vendors/pd/changedefaultaddress',
    body
})

//POST: localhost:8000/a/vendors/pd/deleteaddress
export const delete_pickup_address_api = async (body) => FETCH_API({
    url: 'a/vendors/pd/deleteaddress',
    body,
})


//POST: localhost:8000/a/vendors/pd/addcharges
export const add_delivery_charges_api = async (body) => {
    // const { store_id, type, delivery_charge, min_order_amount, location } = req.body;
    return FETCH_API({
        url: 'a/vendors/pd/addcharges',
        body
    })
}
