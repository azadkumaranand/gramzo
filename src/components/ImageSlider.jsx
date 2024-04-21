import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function ImageSlider({ images = [] }) {
    const IMAGE_WIDTH = Dimensions.get("window").width - 40;

    const flatListRef = React.useRef(null);
    const [imageIndex, setImageIndex] = React.useState(0);

    const handleCouponScroll = (event) => {
        let contentOffset = event.nativeEvent.contentOffset;
        let index = Math.floor(contentOffset.x / 300);
        if (index >= 0 && index < images.length) {
            setImageIndex(index)
        }
    }

    const handleImageChange = (diff) => {
        flatListRef.current?.scrollToIndex({
            index: imageIndex + diff,
            animated: true
        })
    }

    const renderItem = ({ item }) => {
        return (
            <Image
                source={{ uri: item }}
                style={{
                    width: IMAGE_WIDTH,
                    height: 200,
                    borderRadius: 8,
                    // objectFit: 'cover'
                }}
            />
        )
    }

    return (
        <View
            style={{
                position: 'relative',
                marginVertical: 10,
            }}
        >
            <FlatList
                ref={flatListRef}
                horizontal
                data={images}
                onScroll={handleCouponScroll}
                renderItem={renderItem}
                showsHorizontalScrollIndicator={false}
                snapToAlignment="start"
                decelerationRate={"fast"}
                snapToInterval={IMAGE_WIDTH}
                keyExtractor={(item, index) => index.toString()}
            />


            <View
                style={{
                    position: 'absolute',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    left: -13
                }}
            >
                <TouchableOpacity
                    style={{
                        backgroundColor: imageIndex === 0 ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.6)',
                        width: 26,
                        height: 28,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 6,
                    }}
                    onPress={() => handleImageChange(-1)}
                    disabled={imageIndex === 0}
                >
                    <AntDesign name="left" size={13} color="white" />
                </TouchableOpacity>
            </View>

            <View
                style={{
                    position: 'absolute',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    right: -13
                }}
            >
                <TouchableOpacity
                    style={{
                        backgroundColor: imageIndex === images.length - 1 ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.6)',
                        width: 26,
                        height: 28,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 6,
                    }}
                    onPress={() => handleImageChange(1)}
                    disabled={imageIndex === images.length - 1}
                >
                    <AntDesign name="right" size={13} color="white" />
                </TouchableOpacity>
            </View>
            <View
                style={{
                    alignItems: 'center',
                }}
            >
                <View style={{
                    flexDirection: 'row',
                    gap: 5,
                    justifyContent: 'center',
                    position: 'absolute',
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 100,
                    marginBottom: 10
                }}>
                    {images.map((item, index) => (
                        <View key={index} style={{
                            width: 6,
                            height: 6,
                            borderRadius: 999,
                            backgroundColor: imageIndex == index ? "#FFFFFF" : 'rgba(182, 182, 182, 1)'
                            // backgroundColor: 'green'
                        }}></View>
                    ))}
                </View>
            </View>
        </View>
    )
}