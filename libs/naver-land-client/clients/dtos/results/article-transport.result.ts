export interface ArticleTransportResult {
    busList: BusItem[];
    subwayList: SubWayItem[];
}

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
