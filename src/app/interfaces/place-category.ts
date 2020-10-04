import { Place } from './place';

export interface PlaceCategory {
    id: number;
    title: string;
    place: Place[];
}