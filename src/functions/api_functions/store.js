import { FETCH_API } from "@func/utils";

///a/vendors/createstore
export const create_store_api = async (data) =>
  FETCH_API({
    url: `a/vendors/createstore`,
    body: data,
  });

///a/vendors/checkstorename
export const check_store_name_api = async (store_name) =>
  FETCH_API({
    url: `a/vendors/checkstorename`,
    body: { store_name },
  });

///a/vendors/getstore
export const get_store_api = async (vendor_id) =>
  FETCH_API({
    url: `a/vendors/getstore`,
    body: { vendor_id },
  });

///a/vendors/changestorestatus
export const change_store_status_api = async (store_id, status) =>
  FETCH_API({
    url: `a/vendors/changestorestatus`,
    body: { store_id },
  });

///a/vendors/ps/addpaymentsetting
export const add_payment_settings_api = async (body) =>
  FETCH_API({
    url: `a/vendors/ps/addpaymentsetting`,
    body,
  });

//GET: /a/vendors/ps/getpaymentsetting?vendor_id=65491d4022c4a5e891f06a94
export const get_payment_settings_api = async (vendor_id) =>
  FETCH_API({
    url: `a/vendors/ps/getpaymentsetting?vendor_id=${vendor_id}`,
    method: "GET",
  });

///a/vendors/payout/getpayout?page=1&perPage=20
export const get_payout_api = async (store_id, page) =>
  FETCH_API({
    url: `a/vendors/payout/getpayout?page=${page}&perPage=5`,
    body: { store_id },
  });

///a/vendors/getstoresummary
export const get_store_summary_api = async (store_id) =>
  FETCH_API({
    url: `a/vendors/getstoresummary?store_id=${store_id}`,
    method: "GET",
  });

// GET: localhost:8000/a/vendors/getstoredetails?store_id=store_id
export const get_todays_store_summary_api = async (store_id) =>
  FETCH_API({
    url: `a/vendors/getstoredetails?store_id=${store_id}`,
    method: "GET",
  });

//POST: /a/vendors/editstoredetails
export const edit_store_details_api = async (body) =>
  FETCH_API({
    url: `a/vendors/editstoredetails`,
    body,
  });

//POST: /a/vendors/addStory
export const add_vendor_story = async (body) =>
  FETCH_API({
    url: `a/vendors/addStory`,
    body,
  });
