import { PlaceCategory } from './place-category';
import { PlaceHistory } from './place-history';

export interface Place {
    id: number;
    title: string;
    lat?: number;
    lng?: number;
    placeCategoryFk?: number;
    adderss: string;
    provinceFk?: number;
    cityFk?: number;
    tel?: string;
    // CityFkNavigation?:city;
    placeCategoryFkNavigation?: PlaceCategory;
    placeHistory?: PlaceHistory[]


}