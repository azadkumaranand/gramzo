import React, { useRef, useState } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import colors from "@const/colors";
import Paragraph from '../Paragraph';

const Dropdown = ({ data, lable, onSelect }) => {
	const [visible, setVisible] = React.useState(false);
	const [selected, setSelected] = useState(undefined);
	const [dropdownTop, setDropdownTop] = useState(0);
	const DropdownButton = useRef();

	const toggleDropdown = () => {
		visible ? setVisible(!visible) : openDropdown();
	}
	
	const openDropdown = () => {
		DropdownButton.current.measure((_fx, _fy, _w, h, _px, py) => {
			setDropdownTop(py + h);
		});
		setVisible(true);
	};

	const onItemPress = (item) => {
		setSelected(item);
		onSelect(item);
		setVisible(false);
	};


	const renderItem = ({ item }) => (
		<TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
			<Text>{item?.lable}</Text>
		</TouchableOpacity>
	);
	const renderDropdown = () => {
		if (visible) {
			return (
				<Modal visible={visible} transparent animationType="fade">
					<TouchableOpacity
						style={styles.overlay}
						onPress={() => setVisible(false)}
					>
						<View style={[styles.dropdown, { top: dropdownTop }]}>
							<FlatList
								data={data}
								renderItem={renderItem}
								keyExtractor={(item, index) => index.toString()}
							/>
						</View>
					</TouchableOpacity>
				</Modal>
			);
		}
	};
	return (
		<View>
			<Paragraph color={colors.INPUT_LABLE_TEXT}>
				{lable}
			</Paragraph>
			<TouchableOpacity
				ref={DropdownButton}
				style={styles.button}
				onPress={toggleDropdown}
			>
				{renderDropdown()}
				<Paragraph color={colors.INPUT_LABLE_TEXT}>{selected ? selected.lable : `'Choose' ${ lable }`}</Paragraph>
				<AntDesign name="arrowright" color={colors.INPUT_LABLE_TEXT} />
			</TouchableOpacity>
		</View>
	)
}

export default Dropdown;
const styles = StyleSheet.create({
	button: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderWidth: 1,
		paddingHorizontal: 12,
		paddingVertical: 8,
		borderColor: colors.INPUT_BORDER_COLOR,
		borderRadius: 50,
		marginTop: 6,
		marginBottom: 12,
		width: '100%',
		zIndex: 1,
	},
	dropdown: {
		position: 'absolute',
		backgroundColor: '#fff',
		width: '100%',
		shadowColor: '#000000',
		shadowRadius: 4,
		shadowOffset: { height: 4, width: 0 },
		shadowOpacity: 0.5,
	},
	item: {
		paddingHorizontal: 10,
		paddingVertical: 10,
		borderBottomWidth: 1,
	},
});