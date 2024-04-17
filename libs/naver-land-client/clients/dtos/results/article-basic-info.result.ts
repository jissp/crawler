export class ArticleBasicInfoResult {
    priceInfo: ArticleBasicInfoPriceInfo;
    detailInfo: ArticleBasicInfoDetailInfo;
    communalComplexInfo: ArticleBasicInfoCommunalComplexInfo;
}

export interface ArticleBasicInfoPriceInfo {
    price: number;
    previousDeposit: number;
    previousMonthlyRent: number;
    loan: number;
    loanCode: string;
}

export interface ArticleBasicInfoDetailInfo {
    facilityInfo: ArticleBasicInfoFacilityInfo;
    articleDetailInfo: ArticleBasicInfoArticleDetailInfo;
    movingInInfo: ArticleBasicInfoArticleMovingInfo;
    verificationInfo: ArticleBasicInfoVerificationInfo;
    spaceInfo: ArticleBasicInfoSpaceInfo;
    sizeInfo: ArticleBasicInfoSizeInfo;
}

export interface ArticleBasicInfoFacilityInfo {
    life: any[];
    security: any[];
    etc: any[];
    buildingConjunctionDateType: null;
    buildingConjunctionDate: null;
    approvalElapsedYear: null;
    entranceType: string;
    heatingAndCoolingSystemType: null;
    heatingEnergyType: null;
    totalParkingCount: number;
    parkingCountPerHousehold: number;
    structure: null;
    householdNumber: null;
}

export interface ArticleBasicInfoArticleDetailInfo {
    articleNumber: string;
    articleName: string;
    nonComplexBuildingName: null;
    nonComplexBuildingSubName: null;
    articleFeatureDescription: string | null;
    articleDescription: string | null;
    isAddressExposed: true;
    isJibunAddressExposed: null;
    isDirectTrade: false;
    directTradeOwnerCellPhoneNumber: null;
    buildingType: null;
    cpId: string;
    exposureStartDate: string;
    buildingUse: string;
    buildingPrincipalUse: null;
}

export interface ArticleBasicInfoArticleMovingInfo {
    movingInNegotiation: false;
    movingInDate: string;
    movingInMonth: null;
    movingInType: string;
    contractPeriod: null;
}

export interface ArticleBasicInfoVerificationInfo {
    verificationType: 'OWNER' | 'DOC';
    isAssociationArticle: boolean;
    exposureStartDate: string;
}

export interface ArticleBasicInfoSpaceInfo {
    floorInfo: ArticleBasicInfoSpaceFloorInfo;
    roomCount: number;
    bathRoomCount: number;
    direction: string;
    duplex: false;
    directionStandard: string;
}

export interface ArticleBasicInfoSpaceFloorInfo {
    targetFloor: number | null;
    totalFloor: number | null;
    groundTotalFloor: number | null;
    undergroundTotalFloor: number | null;
    floorType: string;
    residenceType: string;
}

export interface ArticleBasicInfoSizeInfo {
    supplySpace: number;
    exclusiveSpace: number;
    supplySpaceName: string;
    exclusiveSpaceName: string;
    floorAreaRatio: number | null;
    buildingCoverageRatio: number | null;
}

export interface ArticleBasicInfoCommunalComplexInfo {
    complexName: string;
    dongName: string;
}
