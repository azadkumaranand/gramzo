import { BASE_URL } from "../../constants/api";

///a/vendors/createvendorname
export const create_user_name_api = async (name) => {
  const response = await fetch(
    `${testvar ? DEV_URL : BASE_URL}/a/vendors/createvendorname`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    }
  );
  return await response.json();
};

///a/vendors/isvalidvendorname
export const is_valid_user_name_api = async (user_name) => {
  const response = await fetch(
    `${testvar ? DEV_URL : BASE_URL}/a/vendors/isvalidvendorname`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_name }),
    }
  );
  return await response.json();
};
