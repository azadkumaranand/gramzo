import { View, Text, StyleSheet, Modal } from 'react-native'
import React from 'react'
import ReatroRating from '@/ReatroRating'

const RatingModal = ({ item, visible, handleClose }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={handleClose}
            hasBackdrop={true}
            backdropColor="black"
            backdropOpacity={0.5}
        >
            <View style={styles.MainBox}>
                <View style={styles.ModalBox}>
                    <ReatroRating item={item} handleClose={handleClose} />
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({

    MainBox: {
        paddingTop: 65,
        paddingHorizontal: 15,
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.63)",
    },
    ModalBox: {
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 20,
        paddingBottom: 20,
        borderRadius: 12,
    },

})

export default RatingModal