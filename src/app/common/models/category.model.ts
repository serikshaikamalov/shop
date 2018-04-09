export interface ICategory {
    Id: number;
    Title ?: string;
    ParentId ?: number;
    StatusId ?: number;    
    Children ?: ICategory[];
    IsActive ?: boolean;
    Level ?: number;
}