import { NaverLandArticleCoordinates } from '@libs/naver-land-client/interfaces/naver-land.interface';

export class ArticleDevelopmentResult {
    railList: RailItem[];
    jiguList: JiguItem[];
}

interface RailItem {
    stationId: number;
    stationName: string;
    railId: number;
    railName: string;
    openDate: string;
    coordinates: NaverLandArticleCoordinates;
    distance: number;
    walkingTime: number;
}

interface JiguItem {
    id: number;
    name: string;
    typeName: string;
    step: string;
    period: string | null;
}
