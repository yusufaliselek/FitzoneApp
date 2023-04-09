import React from 'react'
import 'devextreme/dist/css/dx.light.css';
import { Scheduler, View, Editing } from 'devextreme-react/scheduler';
import Nav from '../../components/Nav/Nav';
import AddContentHeader from '../../components/Header/FitzoneHeader';

const appointments = [
    {
        title: "Install New Database",
        startDate: new Date("2023-02-23T08:45:00.000Z"),
        endDate: new Date("2023-02-23T09:45:00.000Z")
    }, {
        title: "Create New Online Marketing Strategy",
        startDate: new Date("2023-02-24T09:00:00.000Z"),
        endDate: new Date("2023-02-24T11:00:00.000Z")
    }, {
        title: "Upgrade Personal Computers",
        startDate: new Date("2023-02-25T10:15:00.000Z"),
        endDate: new Date("2023-02-25T13:30:00.000Z")
    }, {
        title: "Customer Workshop",
        startDate: new Date("2023-02-26T08:00:00.000Z"),
        endDate: new Date("2023-02-26T10:00:00.000Z"),
        dayLong: true,
        recurrence: "FREQ=WEEKLY;BYDAY=TU,FR;COUNT=10"
    }, {
        title: "Prepare Development Plan",
        startDate: new Date("2023-02-27T08:00:00.000Z"),
        endDate: new Date("2023-02-27T10:30:00.000Z")
    }, {
        title: "Testing",
        startDate: new Date("2023-02-23T09:00:00.000Z"),
        endDate: new Date("2023-02-23T10:00:00.000Z"),
        recurrence: "FREQ=WEEKLY;INTERVAL=2;COUNT=2"
    }, {
        title: "Meeting of Instructors",
        startDate: new Date("2023-02-24T10:00:00.000Z"),
        endDate: new Date("2023-02-24T11:15:00.000Z"),
        recurrence: "FREQ=DAILY;BYDAY=WE;UNTIL=20211001"
    }, {
        title: "Recruiting students",
        startDate: new Date("2023-02-25T08:00:00.000Z"),
        endDate: new Date("2023-02-25T09:00:00.000Z"),
        recurrence: "FREQ=YEARLY",
    }, {
        title: "Monthly Planning",
        startDate: new Date("2023-02-26T09:30:00.000Z"),
        endDate: new Date("2023-02-26T10:45:00.000Z"),
        recurrence: "FREQ=MONTHLY;BYMONTHDAY=28;COUNT=1"
    }, {
        title: "Open Day",
        startDate: new Date("2023-02-27T09:30:00.000Z"),
        endDate: new Date("2023-02-27T19:00:00.000Z"),
    }
];

const Calendar = () => {
    return (
        <div className='flex w-screen h-screen'>
            {/* Navbar */}
            <Nav pageName='Takvim' />
            <div className='flex flex-col w-full h-screen'>
                <AddContentHeader pageName='Takvim' />
                <div className=' overflow-scroll overscroll-x-none'>
                    <Scheduler
                        dataSource={appointments}
                        textExpr="title"
                        allDayExpr="dayLong"
                        recurrenceRuleExpr="recurrence">
                        <View
                            type="day"
                            startDayHour={10}
                            endDayHour={22}
                        />
                        <View
                            type="week"
                            startDayHour={10}
                            endDayHour={22}
                        />
                        <View type="month" />
                        <Editing
                            allowTimeZoneEditing={true}
                            allowDragging={false}
                        />
                    </Scheduler>
                </div>

            </div>
        </div>
    )
}

export default Calendar