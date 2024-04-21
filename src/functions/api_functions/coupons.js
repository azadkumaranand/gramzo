import { BASE_URL } from "../../constants/api";

///a/coupon/addcoupon
export const add_update_coupon_api = async (data) => {
  // console.log("api func", JSON.stringify(data))
  try {
    const response = await fetch(
      `${testvar ? DEV_URL : BASE_URL}/a/coupon/addcoupon`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Network error:", error);
  }
};

//a/coupon/deletecoupon
export const delete_coupon_api = async (data) => {
  console.log(JSON.stringify(data));
  const response = await fetch(
    `${testvar ? DEV_URL : BASE_URL}/a/coupon/deletecoupon`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  return await response.json();
};

///u/coupon/getcoupons
export const get_coupons_api = async () => {
  // restaurant_id
  const response = await fetch(
    `${testvar ? DEV_URL : BASE_URL}/a/coupon/getallcoupons`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return await response.json();
};

export const get_coupon_details_api = async (offer_id) => {
  const response = await fetch(
    `${testvar ? DEV_URL : BASE_URL}/a/coupon/getcouponsbyname`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        offer_id,
      }),
    }
  );
  return await response.json();
};

export const update_coupon_status = async (id, value) => {
  try {
    console.log(JSON.stringify({ id, value }));
    const response = await fetch(
      `${testvar ? DEV_URL : BASE_URL}/a/coupon/updatecouponstatus`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, value }),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating coupon status:", error);
    throw error;
  }
};
