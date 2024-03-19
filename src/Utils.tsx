export const formatCreatedAt = (createdAt: string): string => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
        timeZone: 'Europe/Warsaw',
    };
    return new Date(createdAt).toLocaleString('pl-PL', options);
};
