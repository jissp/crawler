export interface IFacliTransInfo {
    busCount: number;
    hotPlaceList: IHotPlaceItem[];
    subwayCount: number;
    nearBusRoute: INearBusRouteItem[];
    complexFacility: [];
    nearSubwayRoute: INearSubwayRoute[];
    nearFacility: INearFacility[];
}

export interface IHotPlaceItem {
    placeNm: string;
    timeSpent: number;
    hotPoint: number;
    transTpCd: string;
    refItm: number;
    tpCd: string;
    lat: number;
    lng: number;
    transTpNm: string;
    minutes: number;
    lineNm: string;
}

export interface INearCommonRouteItem {
    typeName: string;
    typeShortName: string;
    typeColor: string;
}

export interface INearBusRouteItem extends INearCommonRouteItem {
    busRouteList: string[];
}

export interface INearSubwayRoute extends INearCommonRouteItem {
    typeName: string;
    typeShortName: string;
    typeColor: string;
    subwayRouteList: string[];
}

export interface INearFacility {
    vInfo: {
        cssnm: string;
        labelnm: string;
        poi: string;
    };
    closestDist: string;
    order: number;
}
