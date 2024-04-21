import { ScrollView, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import { useRoute } from "@react-navigation/native";

const ListedProducScreen = () => {
  const { params } = useRoute();
  const { type, selected } = params;
  const products = useSelector((state) => state.product.products);
  // console.log(products);

  // const [newProducts, setNewProducts] = useState([]);
  // useEffect(() => {
  //   // newProducts = products;
  //   setNewProducts(products);
  //   if (type === "Sweets") {
  //     setNewProducts(
  //       products.filter((prod) => prod.product_category === "Sweet")
  //     );
  //   }
  //   if (type === "Pickle") {
  //     setNewProducts(
  //       products.filter((prod) => prod.product_category === "Spice")
  //     );
  //   }
  //   if (type === "Draft") {
  //     setNewProducts(
  //       products.filter((prod) => prod.product_status === "draft")
  //     );
  //   }
  // }, [products]);

  var newProducts = products;
  if (type === "Sweets") {
    newProducts = products.filter((prod) => prod.product_category === "Sweet");
  }
  if (type === "Pickle") {
    newProducts = products.filter((prod) => prod.product_category === "Spice");
  }
  if (type === "Draft") {
    newProducts = products.filter((prod) => prod.product_status === "draft");
  }

  return (
    <ScrollView
      style={{
        // paddingHorizontal: 18,
        marginTop: 10,
      }}
    >
      {newProducts.map((prod, index) => (
        <ProductCard product={prod} key={prod?._id + index} />
      ))}
      <View style={{ height: 160 }}></View>
    </ScrollView>
  );
  ``;
};

export default ListedProducScreen;
