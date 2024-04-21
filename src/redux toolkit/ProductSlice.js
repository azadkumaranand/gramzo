import { createSlice } from "@reduxjs/toolkit";
import { BASE_URL, DEV_URL, testvar } from "../constants/api";

const initialState = {
  productOfferings: [],
  ProductListed: {
    Sweet: [
      { id: 1, name: "jaggery", isChecked: false },
      { id: 2, name: "MangoPickle", isChecked: false },
      { id: 3, name: "Amla", isChecked: false },
      { id: 4, name: "Thekua", isChecked: false },
    ],
    Spice: [
      { id: 5, name: "MysorePak", isChecked: false },
      { id: 6, name: "DarjeelingTea", isChecked: false },
      { id: 7, name: "Honey", isChecked: false },
      { id: 8, name: "Saffron", isChecked: false },
    ],
  },
  products: [
    {
      __v: 0,
      _id: "65f4306ead3b00a225e74e85",
      createdAt: "2024-03-15T11:26:38.143Z",
      description: "",
      files: [],
      product_category: "Sweet",
      product_name: "Honey",
      product_price: 0,
      product_quantity: 0,
      product_status: "draft",
      rating: 1,
      updatedAt: "2024-03-15T11:26:38.143Z",
      vendor: "65f172dcd085963700200752",
    },
  ],
  totalProducts: 0,
  isLoading: true,
};

const productSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {
    addSelectedProduct: (state, action) => {
      const { item, isChecked, category, addNewProduct } = action.payload;
      if (addNewProduct) {
        state.ProductListed[category] = [
          ...state.ProductListed[category],
          item,
        ];
      } else {
        const NewItem = state.ProductListed[category].find(
          (i) => i._id == item._id
        );
        console.log(NewItem);
        NewItem.isChecked = isChecked;
      }
    },
    fetchOfferings: (state, action) => {
      state.productOfferings = action.payload.offerings;
      state.ProductListed = action.payload.offerings;
      // state.isLoading = false
    },
    updateProducts: (state, action) => {
      // console.log("action", action.payload);
      state.products = action.payload.products;
      state.totalProducts =
        state.totalProducts + action.payload.products.length;
      // console.log("State", state.products);
    },
    addProductSuccess: (state, action) => {
      return {
        ...state,
        totalProducts: state.totalProducts + 1,
        products: [action.payload.product, ...state.products],
      };
    },
    deleteProductSuccess: (state, action) => {
      state.products.map((product) => {
        if (product._id === action.payload.productId) {
          let index = state.products.findIndex(function (item) {
            return item._id === action.payload.productId;
          });
          if (index > -1) {
            state.products.splice(index, 1);
          }
        }
      });
    },
    changeProductStatus: (state, action) => {
      state.products.map((product) => {
        if (product._id === action.payload.productId) {
          let index = state.products.findIndex(function (item) {
            return item._id === action.payload.productId;
          });
          if (index > -1) {
            state.products[index].product_status = action.payload.status;
          }
        }
      });
    },
    updateProductSuccess: (state, action) => {
      // console.log(action.payload);
      state.products.map((product) => {
        if (product._id === action.payload.product._id) {
          let index = state.products.findIndex(function (item) {
            return item._id === action.payload.product._id;
          });
          if (index > -1) {
            state.products[index] = action.payload.product;
          }
          // console.log("erere", state.products[index]);
        }
      });
    },
    changeLoadingState(state) {
      state.isLoading = action.payload.loading;
    },
  },
});

export const {
  addSelectedProduct,
  fetchOfferings,
  updateProducts,
  addProductSuccess,
  deleteProductSuccess,
  changeProductStatus,
  updateProductSuccess,
  changeLoadingState,
} = productSlice.actions;
export default productSlice.reducer;

export const fetchProductOfferings = () => {
  return async (dispatch, getState) => {
    try {
      const res = await fetch(
        `${testvar ? DEV_URL : BASE_URL}/a/offerings/getOfferings`
      );
      const resjson = await res.json();
      const obj = {};
      for (const item of resjson) {
        if (!obj[item.category]) {
          obj[item.category] = [item];
        } else {
          obj[item.category].push(item);
        }
      }
      dispatch(fetchOfferings({ offerings: obj }));
    } catch (err) {
      console.log(err);
    }
  };
};

export const addProductsFromOfferings = (products, vendorId) => {
  return async (dispatch, getState) => {
    // console.log(vendorId);
    // if (vendorId === undefined || vendorId !== "" || !products) {
    //   return;
    // }
    // if (vendorId && products) {
    try {
      const res = await fetch(
        `${testvar ? DEV_URL : BASE_URL}/a/products/addOfferingProducts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            offeringProducts: products,
            vendor_id: vendorId,
          }),
        }
      );
      const resjson = await res.json();
      const resproducts = resjson.products;
      console.log("resjson", resjson);
      dispatch(updateProducts({ products: resproducts }));
    } catch (err) {
      console.log(err);
    }
    // }
  };
};

export const getProducts = () => {
  return async (dispatch, getState) => {
    const vendorId = getState().vendor.user._id;
    if (vendorId === undefined || vendorId === "") {
      return;
    }
    // console.log(vendorId);
    try {
      const res = await fetch(
        `${testvar ? DEV_URL : BASE_URL}/a/products/getProducts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ vendor_id: vendorId }),
        }
      );
      const resjson = await res.json();
      // console.log("getp", resjson);
      dispatch(updateProducts({ products: resjson.products }));
    } catch (err) {
      console.log("get p err", err);
    }
  };
};

export const addProduct = (productData) => {
  return async (dispatch, getState) => {
    const vendorId = getState().vendor.user._id;
    if (!vendorId) {
      return;
    }
    // console.log({ vendor_id: vendorId, ...productData });
    try {
      // dispatch(changeLoadingState({ loading: true }));
      const res = await fetch(
        `${testvar ? DEV_URL : BASE_URL}/a/products/addProduct`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ vendor_id: vendorId, ...productData }),
        }
      );
      const resjson = await res.json();
      console.log(resjson);
      if (resjson.msg === "Success") {
        if (resjson.type === "add")
          dispatch(addProductSuccess({ product: resjson.product }));
        else if (resjson.type === "update")
          dispatch(updateProductSuccess({ product: resjson.product }));
      }
      // dispatch(changeLoadingState({ loading: true }));
    } catch (err) {
      console.log(err);
      dispatch(changeLoadingState({ loading: true }));
    }
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch, getState) => {
    const vendorId = getState().vendor.user._id;
    if (!vendorId || !productId) return;
    // console.log(vendorId, productId);
    try {
      const res = await fetch(
        `${testvar ? DEV_URL : BASE_URL}/a/products/deleteProduct`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ vendor_id: vendorId, product_id: productId }),
        }
      );
      const resjson = await res.json();
      // console.log("resj", resjson);
      if (resjson?.status === "success") {
        dispatch(deleteProductSuccess({ productId: productId }));
      }
    } catch (err) {
      console.log("delete p", err);
    }
  };
};

export const changeStatus = (productId, status) => {
  return async (dispatch, getState) => {
    const vendorId = getState().vendor.user._id;
    if (!vendorId || !productId) return;

    try {
      const res = await fetch(
        `${testvar ? DEV_URL : BASE_URL}/a/products/changeStatus`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            vendor_id: vendorId,
            product_id: productId,
            status: status,
          }),
        }
      );
      const resjson = await res.json();
      // console.log("resj", resjson);
      if (resjson?.status === "success") {
        dispatch(changeProductStatus({ productId: productId, status: status }));
      }
    } catch (err) {
      console.log("delete p", err);
    }
  };
};
