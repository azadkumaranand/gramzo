import React, { useState, useEffect } from 'react';
import { Button, Image, View, StyleSheet, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Paragraph from '../Paragraph';
import colors from "@const/colors";

export default function ImagePickerExample({ onImageSelect }) {
	const [image, setImage] = useState(null);

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});
		if (result.assets) {
			setImage(result.assets[0].uri);
			onImageSelect(result.assets[0].uri);
		}
	};

	return (
		<View style={styles.imagePicker}>
			<Pressable style={styles.imagePickerBtn} onPress={pickImage}>
				<Paragraph color={colors.INPUT_LABLE_TEXT}>
					Choose file
				</Paragraph>
			</Pressable>
			<View>
				{image ? <Image source={{ uri: image }} style={{ width: 100, height: 50 }} /> : <Paragraph color={colors.INPUT_LABLE_TEXT}>No file is chosen</Paragraph>}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	imagePicker: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 16
	},
	imagePickerBtn: {
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1,
		borderColor: colors.INPUT_BORDER_COLOR,
		padding: 10,
		borderRadius: 12,
		width: '50%'
	}
})