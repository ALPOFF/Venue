import React, { useEffect, useState } from 'react'
import DatePicker from 'react-native-date-picker'
import { connect } from "react-redux";
import { setNewEventDate } from "../state/appReducer";

const DateTimePicker = (props) => {

    const [date, setDate] = useState(new Date())

    useEffect(() => {
        props.setNewEventDate(JSON.stringify(date))
    }, [date])

    return (
        <DatePicker
            date={date}
            onDateChange={setDate}
        />
    )
}

export default connect(null, {
    setNewEventDate
})(DateTimePicker);