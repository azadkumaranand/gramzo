import React from 'react'
import { Modal } from 'react-native'
import DatePicker from '@react-native-community/datetimepicker'

const DateTimePicker = ({ setOpen, handleSelectDate, open, mode, minimumDate, maximumDate }) => {

  const handleConfirm = (pickedDate) => {
    setOpen(false);
    handleSelectDate(pickedDate);
  }

  const onChange = (event, pickedDate) => {
    switch (event.type) {
      case 'dismissed':
        setOpen(false);
        break;
      case 'set':
        setOpen(false);
        handleSelectDate(pickedDate);
        break;
      default:
        break;
    }
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={open}
      onRequestClose={() => {
        setOpen(false);
      }}
    >
      <DatePicker
        mode='date'
        textColor='#93908F'
        onChange={onChange}
        theme="light"
        minimumDate={minimumDate}
        maximumDate={maximumDate}
        value={new Date()}
      />
    </Modal>
  )
}

export default DateTimePicker;
