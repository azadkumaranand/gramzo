import React, { useState, useRef } from "react";
import {
    View,
    TextInput,
    Animated,
    StyleSheet,
    TouchableWithoutFeedback,
    Text,
} from "react-native";
import fonts, { textStyle } from "@const/fonts";


const StoryInputField = ({ label, value, onChangeText, Unrequired, ...props }) => {
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef(null);
    const placeholderAnim = useRef(new Animated.Value(value ? 1 : 0)).current;

    React.useEffect(() => {
        if (!(value || isFocused)) return handleBlur()

        if (value) {
            Animated.timing(placeholderAnim, {
                toValue: 1,
                duration: 150,
                useNativeDriver: false,
            }).start();
        }
    }, [value])

    const handleFocus = () => {
        setIsFocused(true);
        Animated.timing(placeholderAnim, {
            toValue: 1,
            duration: 150,
            useNativeDriver: false,
        }).start();
        inputRef.current.focus();
    };

    const handleBlur = () => {
        setIsFocused(false);
        if (!value) {
            Animated.timing(placeholderAnim, {
                toValue: 0,
                duration: 150,
                useNativeDriver: false,
            }).start();
        }
    };

    const handleInputChange = (inputText) => {
        onChangeText(inputText);
    };

    const placeholderPosition = placeholderAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [10, -15], // Adjust the top positions as needed
    });

    return (
        <View style={styles.container}>

            <View style={{
                // marginTop: 5,
            }}>
                <TextInput
                    ref={inputRef}
                    style={styles.input}
                    value={value}
                    onChangeText={handleInputChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    {...props}
                />
            </View>
            <TouchableWithoutFeedback onPress={handleFocus}>
                <Animated.View
                    style={[styles.placeholder, { top: placeholderPosition }]}
                >
                    <Text style={textStyle(14, fonts.PRIMARY_FONT_400, "#aaa")}>
                        {label}
                    </Text>
                    {
                        !Unrequired &&
                        <Text style={textStyle(16, fonts.PRIMARY_FONT_400, "red")}>
                            *
                        </Text>
                    }
                </Animated.View>
            </TouchableWithoutFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "relative",
        // marginVertical: 5,
        // width: "100%",
    },
    input: {
        width: "100%",
        height: 60,
        paddingHorizontal: 20,
        // borderWidth: 1,
        // borderRadius: 100,
        // borderColor: "#D0D5DD",
        fontFamily: fonts.PRIMARY_FONT_400,
        // marginBottom: 10,
    },
    placeholder: {
        position: "absolute",
        color: "#aaa",
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        fontSize: 14,
        left: 20,
        zIndex: 1,
        fontFamily: fonts.PRIMARY_FONT_400,
        backgroundColor: "#fff",
    },
});

export default StoryInputField;
