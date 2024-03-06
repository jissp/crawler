export interface BusItem {
    typeName: string;
    typeColor: string;
    list: string[];
}

export interface SubWayItem {
    stationName: string;
    typeList: SubWayType[];
}

export interface SubWayType {
    id: number;
    name: string;
    color: string;
    walkingDistance: number;
    walkingDuration: number;
}

export interface ArticleTransportResponseDto {
    isSuccess: true;
    result: {
        busList: BusItem[];
        subwayList: SubWayItem[];
    };
}