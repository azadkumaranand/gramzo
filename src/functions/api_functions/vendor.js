import { FETCH_API } from "../utils";

export const is_new_vendor_api = async (data) => FETCH_API({
  url: 'a/vendors/isnewvendor',
  body: data
})

///a/vendors/register
export const create_vendor_api = async (data) => FETCH_API({
  url: 'a/vendors/register',
  body: data
})