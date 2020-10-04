import { Place } from './place';
import { User } from './user';

export interface PlaceHistory {
    id: number;
    placeFk?: number;
    profileFk?: number;
    date?: string;
    mask?: number;
    glove?: number;
    sanitizer?: number;
    airConditioning?: number;
    socialDistanding?: number;
    comment?: string;
    placeFkNavigation?: Place;
    profileFkNavigation?: User;

    _userName?:string;
}