import { BASE_URL } from "../../constants/api";

///a/items/additem
export const add_update_item_api = async (data) => {
  // const {
  //     item_id,
  //     item_name,
  //     item_description,
  //     item_photo_url,
  //     add_customization,
  //     item_badge,
  //     category,
  //     price,
  //     store_id,
  //   } = req.body;

  const response = await fetch(
    `${testvar ? DEV_URL : BASE_URL}/a/items/additem`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.token}`,
      },
      body: JSON.stringify(data),
    }
  );
  return await response.json();
};

///a/items/deleteitem
export const delete_item_api = async (data) => {
  // const { item_id } = req.body;
  const response = await fetch(
    `${testvar ? DEV_URL : BASE_URL}/a/items/deleteitem`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${data.token}`,
      },
      body: JSON.stringify(data),
    }
  );
  return await response.json();
};

// /a/items/getitems
export const get_items_api = async (store_id, page = 1, perPage = 5) => {
  // store_id
  const response = await fetch(
    `${
      testvar ? DEV_URL : BASE_URL
    }/a/items/getitems?page=${page}&perPage=${perPage}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        store_id,
      }),
    }
  );
  return await response.json();
};
