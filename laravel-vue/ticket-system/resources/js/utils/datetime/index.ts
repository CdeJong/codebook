
import { Temporal } from "@js-temporal/polyfill";

const formatter = Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    hour12: false
});

export const format = (value : string) : string => {
    const datetime = Temporal.Instant
        .from(value)
        .toZonedDateTimeISO(Temporal.Now.timeZoneId());

    const parts = formatter.formatToParts(datetime.epochMilliseconds)
        .reduce<Record<string, string>>((currentParts, part) => {
            currentParts[part.type] = part.value;
            return currentParts;
        }, {});  

    if (isToday(datetime)) {
        return `Today at ${parts.hour}:${parts.minute}`;
    } else if (isYesterday(datetime)) {
        return `Yesterday at ${parts.hour}:${parts.minute}`;
    } else if (isCurrentWeek(datetime)) {
        return `${parts.weekday} at ${parts.hour}:${parts.minute}`;
    } else {
        return `${parts.day} ${parts.month} at ${parts.hour}:${parts.minute}`; 
    }

}

const isToday = (datetime : Temporal.ZonedDateTime) : boolean => {
    const today = Temporal.Now.plainDateISO(Temporal.Now.timeZoneId());
    return Temporal.PlainDate.compare(datetime.toPlainDate(), today) === 0;
}

const isYesterday = (datetime : Temporal.ZonedDateTime) : boolean => {
    const yesterday = Temporal.Now.plainDateISO(Temporal.Now.timeZoneId()).subtract({ days: 1 });
    return Temporal.PlainDate.compare(datetime.toPlainDate(), yesterday) === 0;
}

const isCurrentWeek = (datetime : Temporal.ZonedDateTime) : boolean => {
    const now = Temporal.Now.zonedDateTimeISO(Temporal.Now.timeZoneId())
    return datetime.yearOfWeek === now.yearOfWeek && datetime.weekOfYear === now.weekOfYear;
    
}