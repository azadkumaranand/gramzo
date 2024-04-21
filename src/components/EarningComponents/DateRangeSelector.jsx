import { View, Text, TouchableOpacity, Modal } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import dayjs from 'dayjs';
import { useToast } from "react-native-toast-notifications";
import DateTimePicker from '@/DateTimePicker';

const DateRangeSelector = ({ dateRange, handleSubmit }) => {

    const [isOpen, setIsOpen] = useState(false)
    const [type, setType] = useState('startDate');

    const toast = useToast();


    const handleConfirm = (pickedDate) => {
        setIsOpen(false);
        handleSubmit({ type, date: pickedDate })
        if (type === 'startDate') {
            setType('endDate');
            setIsOpen(true);
        } else {
            if (dateRange.startDate >= pickedDate) {
                toast.show("Start date should be less than end date", {
                    type: "warning",
                    placement: "top",
                    duration: 3000,
                    offsetTop: 100,
                    animationType: "zoom-in",
                });
                setIsOpen(true);
                return
            }
            setType('startDate');
        }
    }

    return (
        <View>
            <TouchableOpacity
                style={{
                    borderColor: (dateRange.startDate && dateRange.endDate) ? '#42AF10' : "#E5E7EB",
                    borderRadius: 5,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderWidth: 1,
                    flexDirection: "row",
                    justifyContent: "center",
                    gap: 3,
                    alignItems: "center",
                }}
                onPress={() => setIsOpen(true)}
            >
                {(dateRange.startDate && dateRange.endDate) ? (
                    <Text
                        style={{
                            fontSize: 14,
                            color: (dateRange.startDate && dateRange.endDate) ? "#42AF10" : "#93908F",
                        }}
                    >
                        {dayjs(dateRange.startDate).format("DD/MM/YY")} - {dayjs(dateRange.endDate).format("DD/MM/YY")}
                    </Text>
                ) : (
                    <AntDesign name="calendar" size={20} color="#555555" />
                )}

            </TouchableOpacity>


            <DateTimePicker
                open={isOpen}
                setOpen={setIsOpen}
                handleSelectDate={handleConfirm}
                key={type}
                minimumDate={(type === 'endDate') ? new Date(dayjs(dateRange.startDate).add(1, 'day').format("YYYY-MM-DD")) : null}
            />

        </View>
    )
}

export default DateRangeSelector