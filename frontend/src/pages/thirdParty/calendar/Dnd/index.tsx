import React, { useState } from "react";
import { momentLocalizer, Views } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import eventsData, { stringOrDate } from "../events";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import moment from "moment";
import { StyledCalendar } from "../calandar.style";

const DragAndDropCalendar = withDragAndDrop(StyledCalendar);

const Dnd = () => {
  const [events, setEvents] = useState(eventsData);

  const moveEvent = ({
    event,
    start,
    end,
    isAllDay: droppedOnAllDaySlot,
  }: {
    event: any;
    start: stringOrDate;
    end: stringOrDate;
    isAllDay: boolean;
  }) => {
    const idx = events.indexOf(event);
    let allDay = event.allDay;

    if (!event.allDay && droppedOnAllDaySlot) {
      allDay = true;
    } else if (event.allDay && !droppedOnAllDaySlot) {
      allDay = false;
    }

    const updatedEvent = { ...event, start, end, allDay };

    const nextEvents = [...events];
    nextEvents.splice(idx, 1, updatedEvent);

    setEvents(nextEvents);
  };

  const resizeEvent = ({
    event,
    start,
    end,
  }: {
    event: any;
    start: stringOrDate;
    end: stringOrDate;
  }) => {
    const nextEvents = events.map((existingEvent: any) => {
      return existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent;
    });

    setEvents(nextEvents);

    //alert(`${event.title} was resized to ${start}-${end}`)
  };

  const newEvent = (event: any) => {
    let idList = events.map((a: any) => a.id);
    let newId = Math.max(...idList) + 1;
    let hour = {
      id: newId,
      title: "New Event",
      allDay: event.slots.length === 1,
      start: event.start,
      end: event.end,
    };
    setEvents(events.concat([hour]));
  };

  // @ts-ignore
  return (
    <DragAndDropCalendar
      selectable
      localizer={momentLocalizer(moment)}
      events={events}
      onEventDrop={moveEvent}
      resizable
      onEventResize={resizeEvent}
      onSelectSlot={newEvent}
      onDragStart={console.log}
      defaultView={Views.MONTH}
      defaultDate={new Date(2021, 10, 12)}
    />
  );
};

export default Dnd;
