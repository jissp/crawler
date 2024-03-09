import { NaverLandArticleCoordinates } from '@libs/naver-land-client/interfaces/naver-land.interface';

export class ArticleComplexResult {
    name: string;
    type: string;
    address: {
        legalDivision: string;
        jibun: string;
        roadName: string;
    };
    coordinates: NaverLandArticleCoordinates;
    photos: ArticleComplexPhotoItem[];
    totalHouseholdNumber: number;
    dongCount: number;
    constructionCompany: string;
    buildingUse: null;
    isServicedResidence: boolean;
    buildingRatioInfo: {
        floorAreaRatio: number;
        buildingCoverageRatio: number;
    };
    useApprovalDate: string;
    approvalElapsedYear: number;
    parkingInfo: {
        totalParkingCount: number;
        parkingCountPerHousehold: number;
    };
    heatingAndCoolingInfo: {
        heatingAndCoolingSystemType: string;
        heatingEnergyType: string;
    };
    managementOfficeContact: string;
    monopolyRestrictionType: string;
}

export interface ArticleComplexPhotoItem {
    url: string;
    category: string | null;
    comment: string | null;
}
