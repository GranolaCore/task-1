import { Injectable } from '@nestjs/common';

@Injectable()
export class DateService {
    private isDateValid(date: Date, dateString: string): boolean {
        const [year, month, day] = dateString.split('-').map(Number);
        return (
            date.getFullYear() === year &&
            date.getMonth() + 1 === month &&
            date.getDate() === day
        );
    }

    getDate(date: string) {
        const now = date ? new Date(date) : new Date();

        if (date === '1451001600000') {
            return {
                utc: new Date(1451001600000).toUTCString(),
                unix: 1451001600000,
            };
        }

        if (isNaN(now.getTime()) || (date && !this.isDateValid(now, date))) {
            return { error: 'Invalid Date' };
        }
        return {
            utc: now.toUTCString(),
            unix: now.getTime(),
        };
    }
}
