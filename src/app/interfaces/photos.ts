import { IFile } from '@ionic-native/file/ngx';


export interface Photo extends IFile {
    name: string;
    localURL: string;
    src: string;
    type: string;
    lastModified: number;
    lastModifiedDate: number;
    size: number;
    start: number;
    end: number;
}