export interface Place {
    id: number;
    title: string;
    lat?: number;
    lng?: number;
    placeCategoryFk?: number;
    adderss: string;
    provinceFk?: number;
    cityFk?: number;
    tel: string;
}