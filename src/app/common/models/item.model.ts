import { IImage } from './image.model';

export interface IItem {
    Id ?: number;
    Title ?: string;
    Price ?: number;
    Count ?: number;
    ImageId ?:  number;
    CategoryId ?: number;
    StatusId ?: number;

    // Dictionaries
    Image ?: IImage;     
}