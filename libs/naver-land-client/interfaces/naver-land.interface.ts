export enum RealEstateType {
    /** 아파트 */
    APT = 'APT',
    /** 오피스텔 */
    OPST = 'OPST',
    /** 빌라 */
    VL = 'VL',
    /** 아파트분양권 */
    ABYG = 'ABYG',
    /** 오피스텔분양권 */
    OBYG = 'OBYG',
    /** 재건축 */
    JGC = 'JGC',
    /** 전원주택 */
    JWJT = 'JWJT',
    /** 단독/다가구 */
    DDDGG = 'DDDGG',
    /** 상가주택 */
    SGJT = 'SGJT',
    /** 한옥주택 */
    HOJT = 'HOJT',
    /** 재개발 */
    JGB = 'JGB',
    /** 원룸 */
    OR = 'OR',
    /** 고시원 */
    GSW = 'GSW',
    /** 상가 */
    SG = 'SG',
    /** 사무실 */
    SMS = 'SMS',
    /** 공장/창고 */
    GJCG = 'GJCG',
    /** 건물 */
    GM = 'GM',
    /** 토지 */
    TJ = 'TJ',
    /** 지식산업센터 */
    APTHGJ = 'APTHGJ',
}

export enum TradeType {
    /** 매매 */
    A1 = 'A1',
    /** 전세 */
    B1 = 'B1',
    /** 단기임대 */
    B2 = 'B2',
    /** 월세 */
    B3 = 'B3',
}

export type Tag =
    | ParkingTag
    | StructTag
    | RoomCountTag
    | CprodTag
    | BathRoomTag
    | FloorTag
    | DvsexTag
    | LoanTag
    | HouseHoldTag
    | NumppTag
    | EtcTag
    | CompletionTag
    | MtcstTag
    | RoomOptionTag
    | InfctTag
    | DirectionTag;

export enum ParkingTag {
    /** 주차가능 */
    PARKINGYN = 'PARKINGYN',
    /** 세대당 1대이상 */
    PARKINGONE = 'PARKINGONE',
    /** 세대당 1.5대이상 */
    PARKINGMORE = 'PARKINGMORE',
}

export enum StructTag {
    /** 주방분리형 */
    KITCHSEPA = 'KITCHSEPA',
    /** 복층 */
    DUPLEX = 'DUPLEX',
    /** 옥탑 */
    ROOFTOP = 'ROOFTOP',
    /** 베란다/발코니 */
    VERANDA = 'VERANDA',
}

export enum RoomCountTag {
    /** 1개 */
    ONEROOM = 'ONEROOM',
    /** 2개 */
    TWOROOM = 'TWOROOM',
    /** 3개 */
    THREEROOM = 'THREEROOM',
    /** 4개이상 */
    FOURROOM = 'FOURROOM',
}

export enum CprodTag {
    /** 일단위 */
    DAILY = 'DAILY',
    /** 월단위 */
    MONTHLY = 'MONTHLY',
}

export enum BathRoomTag {
    /** 1개 */
    ONEBATH = 'ONEBATH',
    /** 2개 */
    TOWBATH = 'TOWBATH',
    /** 3개 */
    THREEBATH = 'THREEBATH',
    /** 4개 이상 */
    FOURBATH = 'FOURBATH',
}

export enum FloorTag {
    /** 1층 */
    ONEFLOOR = 'ONEFLOOR',
    /** 저층 */
    LOWFLOOR = 'LOWFLOOR',
    /** 중간층 */
    MIDFLOOR = 'MIDFLOOR',
    /** 고층 */
    HIGHFLOOR = 'HIGHFLOOR',
    /** 탑층 */
    TOPFLOOR = 'TOPFLOOR',
    /** 지하층 */
    UNDERFLOOR = 'UNDERFLOOR',
    /** 지상층(1층제외 */
    UPPERFLOOR = 'UPPERFLOOR',
}

export enum DvsexTag {
    /** 여성전용 */
    FORWOMAN = 'FORWOMAN',
    /** 남성전용 */
    FORMAN = 'FORMAN',
    /** 남녀층구분 */
    FLOORSEPA = 'FLOORSEPA',
}

export enum LoanTag {
    /** 융자금없는 */
    NOLOAN = 'NOLOAN',
    /** 융자금 30%미만 */
    LOWLOAN = 'LOWLOAN',
}

export enum HouseHoldTag {
    /** 100세대 이상 */
    HSEH100 = 'HSEH100',
    /** 500세대 이상 */
    HSEH500 = 'HSEH500',
    /** 1000세대 이상 */
    HSEH1000 = 'HSEH1000',
}

export enum NumppTag {
    /** 1인실 */
    SINGLE = 'SINGLE',
    /** 2인실 */
    DOUBLE = 'DOUBLE',
}

export enum EtcTag {
    /** LH매입임대주택 */
    LHRENT = 'LHRENT',
    /** 매물사진 */
    ARTICLEPHOTO = 'ARTICLEPHOTO',
    /** 올수리 */
    ALLREPAIR = 'ALLREPAIR',
    /** 테라스 */
    TERRACE = 'TERRACE',
    /** 마당 */
    YARD = 'YARD',
    /** 무보증 */
    NOWARRAN = 'NOWARRAN',
    /** 확장형 */
    EXTEND = 'EXTEND',
    /** 대단지 */
    BIGCPLX = 'BIGCPLX',
    /** 역세권 */
    STATION = 'STATION',
    /** 세대분리 */
    HOUSESEPA = 'HOUSESEPA',
    /** 욕실수리 */
    BATHREPAIR = 'BATHREPAIR',
    /** 주방교체 */
    CHANGESINC = 'CHANGESINC',
    /** 보일러교체 */
    CHANGEBOIL = 'CHANGEBOIL',
    /** 급매 */
    FASTSELL = 'FASTSELL',
    /** 필로티 */
    PILOTI = 'PILOTI',
    /** 소형평수 */
    SMLSPC = 'SMLSPC',
    /** 대형평수 */
    BIGSPC = 'BIGSPC',
    /** 펜트하우스 */
    PENT = 'PENT',
    /** 큰길 */
    MAINROAD = 'MAINROAD',
    /** 세안고 */
    RENTHUG = 'RENTHUG',
    /** 애완동물 */
    PET = 'PET',
    /** 천장에어컨 */
    ROOFAIRCON = 'ROOFAIRCON',
    /** 고급빌라 */
    LUXURYVILLA = 'LUXURYVILLA',
    /** 총2층 */
    TOTFLR2 = 'TOTFLR2',
    /** 총3층 */
    TOTFLR3 = 'TOTFLR3',
    /** 총4층 */
    TOTFLR4 = 'TOTFLR4',
    /** 총5층 */
    TOTFLR5 = 'TOTFLR5',
    /** 보안 */
    SECURITY = 'SECURITY',
    /** 소형전월세 */
    SMALLSPCRENT = 'SMALLSPCRENT',
    /** 요리 */
    COOKING = 'COOKING',
    /** 기본형 */
    NORMAL = 'NORMAL',
    /** 곰팡이없는 */
    MOLD = 'MOLD',
    /** 결로없는 */
    CONDENSATION = 'CONDENSATION',
}

export enum CompletionTag {
    /** ~2년 */
    COMPLETION2UNDER = 'COMPLETION2UNDER',
    /** ~4년 */
    COMPLETION4UNDER = 'COMPLETION4UNDER',
    /** ~10년 */
    COMPLETION10UNDER = 'COMPLETION10UNDER',
    /** ~15년 */
    COMPLETION15UNDER = 'COMPLETION15UNDER',
    /** ~25년 */
    COMPLETION25UNDER = 'COMPLETION25UNDER',
    /** 25년 */
    COMPLETION25OVER = 'COMPLETION25OVER',
    /** 30년 */
    COMPLETION30OVER = 'COMPLETION30OVER',
}

export enum MtcstTag {
    /** ~10 */
    MF10UNDER = 'MF10UNDER',
    /** ~20 */
    MF20UNDER = 'MF20UNDER',
    /** ~30 */
    MF30UNDER = 'MF30UNDER',
    /** ~40 */
    MF40UNDER = 'MF40UNDER',
    /** ~50 */
    MF50UNDER = 'MF50UNDER',
    /** ~60 */
    MF60UNDER = 'MF60UNDER',
    /** ~70 */
    MF70UNDER = 'MF70UNDER',
    /** ~80 */
    MF80UNDER = 'MF80UNDER',
}

export enum RoomOptionTag {
    /** 풀옵션 */
    FULLOP = 'FULLOP',
    /** 에어컨 */
    AIRCON = 'AIRCON',
    /** 인터폰 */
    INTERPHONE = 'INTERPHONE',
    /** 냉장고 */
    REFRI = 'REFRI',
    /** 세탁기 */
    WASHER = 'WASHER',
    /** 옷장 */
    WARDROBE = 'WARDROBE',
    /** 가스레인지 */
    GASRANGE = 'GASRANGE',
    /** 인덕션레인지 */
    INDUCTION = 'INDUCTION',
    /** 붙박이장 */
    BUILTIN = 'BUILTIN',
    /** 신발장 */
    SHOERACK = 'SHOERACK',
    /** 침대 */
    BED = 'BED',
    /** 책상 */
    DESK = 'DESK',
    /** 식탁 */
    TABLE = 'TABLE',
    /** 소파 */
    SOFA = 'SOFA',
    /** 건조기 */
    DRYER = 'DRYER',
    /** 샤워부스 */
    SHOWERBOOTH = 'SHOWERBOOTH',
    /** 욕조 */
    BATHTUB = 'BATHTUB',
    /** 비데 */
    BIDET = 'BIDET',
    /** 싱크대 */
    SINC = 'SINC',
    /** 식기세척기 */
    DISHWASHER = 'DISHWASHER',
    /** 전자레인지 */
    MICROWAVE = 'MICROWAVE',
    /** 가스오븐 */
    GASOVEN = 'GASOVEN',
    /** 개인화장실 */
    INDVTOILET = 'INDVTOILET',
    /** 개인샤워실 */
    INDVSHOWER = 'INDVSHOWER',
}

export enum InfctTag {
    /** CCTV */
    CCTV = 'CCTV',
    /** 방범창 */
    SECUREWINDOW = 'SECUREWINDOW',
    /** 비디오폰 */
    VIDEOPHONE = 'VIDEOPHONE',
    /** 경비원 */
    GUARD = 'GUARD',
    /** 현관보안 */
    DOORSECURE = 'DOORSECURE',
    /** 화재경보기 */
    FIREALARM = 'FIREALARM',
    /** 엘리베이터 */
    ELEVATOR = 'ELEVATOR',
    /** 무인택배함 */
    DELIVERYBOX = 'DELIVERYBOX',
}

export enum DirectionTag {
    /** 동 */
    EAST = 'EAST',
    /** 서 */
    WEST = 'WEST',
    /** 남 */
    SOUTH = 'SOUTH',
    /** 북 */
    NORTH = 'NORTH',
    /** 북동 */
    EASTNORTH = 'EASTNORTH',
    /** 남동 */
    EASTSOUTH = 'EASTSOUTH',
    /** 북서 */
    WESTNORTH = 'WESTNORTH',
    /** 남서 */
    WESTSOUTH = 'WESTSOUTH',
}
