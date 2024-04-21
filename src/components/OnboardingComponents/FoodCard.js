import React, { useState } from 'react';
import { Modal, View, StyleSheet, Dimensions, ScrollView, Text, Te, TouchableOpacity, Button } from 'react-native';
import Paragraph from '../Paragraph';
import Subtitle from '../Subtitle';
import ImagePickerExample from './ImagePicker';
import OnboardingInputFields from './OnboardingInputFields';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import colors from "@const/colors";
import { useNavigation } from '@react-navigation/native';
import { uploadFileAndGetURL } from '../../config/firebase';
const FoodCard = ({ visible }) => {
	const navigation = useNavigation();
	const [isVeg, setIsVeg] = useState(false);
	const [isNonVeg, setIsNonVeg] = useState(false);
	const dimensionWidth = Dimensions.get('screen').width;
	const [image, setImage] = useState('');
	const [description, setDescription] = useState('');
	const [name, setName] = useState('');
	const [price, setPrice] = useState('');

	if (!visible) {
		return null;
	}

	const onImageSelect = async (url) => {
		const link = await uploadFileAndGetURL('food', url);
		setImage(link);
	}

	const handleSave = () => {
		navigation.navigate('ParentScreen');
	}

	return (
		<View style={styles.cardContainer}>
			<ScrollView style={styles.card}>
				<View>
					<Subtitle color='black'>
						Add Food
					</Subtitle>
				</View>
				<View>
					<OnboardingInputFields name='Food Name' placeholder='Enter Here' onChangeText={setName} />
					<OnboardingInputFields name='Food Description' placeholder='Enter a description...' onChangeText={setDescription} />
					<Paragraph color='black'>Upload a photo of a Food</Paragraph>
					<ImagePickerExample onImageSelect={onImageSelect} />
					<View style={styles.customizationContainer}>
						<OnboardingInputFields name='Add Customization' placeholder='Enter here' width={dimensionWidth / 2.6} />
						<OnboardingInputFields name='Extra Fees' placeholder='Enter here' width={dimensionWidth / 2.6} />
					</View>
					<View>
						<Paragraph color={colors.ORANGE_SHADE}>Food Badge</Paragraph>
						<View style={styles.chekcboxContainer}>
							<BouncyCheckbox
								size={25}
								disabled={isNonVeg}
								style={{ width: 90 }}
								fillColor={colors.ORANGE_SHADE}
								text='veg'
								unfillColor="#FFFFFF"
								iconStyle={{ borderColor: colors.INPUT_BORDER_COLOR }}
								textStyle={{ color: 'black', textDecorationLine: 'none' }}
								innerIconStyle={{ borderWidth: 1, borderColor: colors.INPUT_BORDER_COLOR }}
								onPress={(isChecked) => { setIsVeg(isChecked) }}
							/>
							<BouncyCheckbox
								size={25}
								disabled={isVeg}
								style={{ width: 90 }}
								fillColor={colors.ORANGE_SHADE}
								text='Non-veg'
								unfillColor="#FFFFFF"
								iconStyle={{ borderColor: colors.INPUT_BORDER_COLOR }}
								textStyle={{ color: 'black', textDecorationLine: 'none' }}
								innerIconStyle={{ borderWidth: 1, borderColor: colors.INPUT_BORDER_COLOR }}
								onPress={(isChecked) => { setIsNonVeg(isChecked) }}
							/>
						</View>
						<Button title='Add Food' onPress={handleSave} />
					</View>
				</View>
			</ScrollView>
		</View>

	);
};

export default FoodCard;

const dimensionHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
	cardContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#000000AA',
		zIndex: 99
	},
	card: {
		padding: 20,
		backgroundColor: 'white',
		width: '90%',
	},
	customizationContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 16
	},
	chekcboxContainer: {
		flexDirection: 'row',
		marginBottom: 20
	}
});