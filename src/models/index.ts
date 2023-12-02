export interface Translation {
    [key: string | number]: any
}

export interface ActionResponse {
    result: any;
    errors: any;
}

export interface SelectOption {
    id: number;
    name: string;
    unavailable: boolean;
}