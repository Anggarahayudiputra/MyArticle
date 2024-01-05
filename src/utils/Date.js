export function formatedDate(date, year, month, day) {
    return new Date(date).toLocaleDateString('en-us',
        {
            // weekday: "long",
            year: year ? "numeric" : undefined,
            month: month ? "short" : undefined,
            day: day ? "numeric" : undefined
        })
}