import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "@const/colors";
// import LinearGradient from 'react-native-linear-gradient';

const AddBtn = ({ onPress }) => {
	const pressHandler = () => {
		onPress();
	};
	return (

		<Pressable
			style={styles.button}
			onPress={pressHandler}
		>
			<AntDesign name="plus" color='white' size={24} />
		</Pressable>
		// </LinearGradient>
	);
};

export default AddBtn;

const styles = StyleSheet.create({

	button: {
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 4,
		overflow: "hidden",
		padding: 11,
		backgroundColor: colors.PRIMARY_GREEN_COLOR,
		width: 50,
		height: 50
	},
});