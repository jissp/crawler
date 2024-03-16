import { IArticle } from '@libs/naver-land-client/clients/dtos';
import { TradeType } from '@libs/naver-land-client/interfaces/naver-land.interface';
import { Direction } from '@libs/naver-land-client/interfaces/article.interface';
import { ArticleComplexResult } from '@libs/naver-land-client/clients/dtos/results';

export const transformFixtureArticle: IArticle = {
    atclNo: '2410628525',
    cortarNo: '1156012600',
    atclNm: '신동아하이팰리스',
    atclStatCd: 'R0',
    rletTpCd: 'A02',
    uprRletTpCd: 'A02',
    rletTpNm: '오피스텔',
    tradTpCd: TradeType.매매,
    tradTpNm: '매매',
    vrfcTpCd: 'OWNER',
    flrInfo: '8/15',
    prc: 66000,
    rentPrc: 0,
    hanPrc: '6억 6,000',
    spc1: 122,
    spc2: 71.47,
    direction: Direction.남서향,
    atclCfmYmd: '24.03.04.',
    lat: 37.52209,
    lng: 126.88448,
    atclFetrDesc: '5호선 양평역세권, 주인거주중 상태 깨끗, 즉시 입주 가능',
    tagList: ['25년이내', '역세권', '방두개', '화장실한개', '복층'],
    bildNm: '102동',
    minute: 0,
    sameAddrCnt: 3,
    sameAddrDirectCnt: 0,
    cpid: 'bizmk',
    cpNm: '매경부동산',
    cpCnt: 2,
    rltrNm: '중흥S(단지내)공인중개사사무소',
    directTradYn: 'N',
    minMviFee: 0,
    maxMviFee: 0,
    etRoomCnt: 0,
    tradePriceHan: '',
    tradeRentPrice: 0,
    tradeCheckedByOwner: false,
    cpLinkVO: {
        cpId: 'bizmk',
        mobileArticleLinkTypeCode: 'NONE',
        mobileBmsInspectPassYn: 'Y',
        pcArticleLinkUseAtArticleTitle: false,
        pcArticleLinkUseAtCpName: false,
        mobileArticleLinkUseAtArticleTitle: false,
        mobileArticleLinkUseAtCpName: false,
    },
    dtlAddrYn: 'N',
    dtlAddr: '',
};

export const transformFixtureArticleComplexResult: ArticleComplexResult = {
    name: '영풍',
    type: 'A01',
    address: {
        legalDivision: '경기도 광명시 철산동',
        jibun: '207',
        roadName: '시청로29번길 12',
    },
    coordinates: { xcoordinate: 126.8624, ycoordinate: 37.480328 },
    photos: [
        {
            url: 'https://landthumb-phinf.pstatic.net/20170321_7/apt_realimage_1490071851665ccmz2_JPEG/97abffa8cf304411267f487a65a4ef2b.jpg',
            category: '전경',
            comment:
                '영풍 아파트 전경의 모습입니다. 곳곳에 나무가 많이 심어져있어 공기가 맑으며 주변 모습은 확 트여져 있어 확 트인 느낌을 받을 수 있습니다',
        },
        {
            url: 'https://landthumb-phinf.pstatic.net/20170321_289/apt_realimage_1490071802346SUc4l_JPEG/3558a9d8c25e3526e41077ce8e038dc6.jpg',
            category: '정문',
            comment:
                '영풍 아파트 정문 모습입니다. 차단기가 있으며 왼쪽으로는 경비실이 있어 경비원분이 외부인과 외부차량을 통제 관리하고 있습니다.',
        },
        {
            url: 'https://landthumb-phinf.pstatic.net/20170321_126/apt_realimage_1490071852241M7krQ_JPEG/a4a0ec7e21febe7dcf1ab247467bab26.jpg',
            category: '전경',
            comment:
                '영풍 아파트 전경의 모습입니다. 곳곳에 나무가 많이 심어져있어 공기가 맑으며 주변 모습은 확 트여져 있어 확 트인 느낌을 받을 수 있습니다',
        },
        {
            url: 'https://landthumb-phinf.pstatic.net/20170321_228/apt_realimage_1490071852856WQXFT_JPEG/441d84377706231124dca0fce08da672.jpg',
            category: '건물 외관',
            comment:
                '아파트 건물 외관 모습입니다. 1993년도에 준공되어 연식은 오래된 아파트지만 동의 숫자가 또렷이 보일 정도로 깨끗하게 관리된 모습입니다.\n',
        },
        {
            url: 'https://landthumb-phinf.pstatic.net/20170321_23/apt_realimage_14900718533341rCBh_JPEG/8b2f1f46d3001682d0f978d4a49d1701.jpg',
            category: '건물 외관',
            comment:
                '아파트 건물 외관 모습입니다. 1993년도에 준공되어 연식은 오래된 아파트지만 동의 숫자가 또렷이 보일 정도로 깨끗하게 관리된 모습입니다.\n',
        },
        {
            url: 'https://landthumb-phinf.pstatic.net/20170321_29/apt_realimage_1490071853885l8gXG_JPEG/eda66536509609eea061c5ceb8bcdbaa.jpg',
            category: '1층 공용현관',
            comment:
                '아파트 1층 공용현관의 모습입니다. 1층 공용현관에는 별도의 보안시설은 없지만 입주민들이 편리하게 입출 입을 할 수 있습니다.\n',
        },
        {
            url: 'https://landthumb-phinf.pstatic.net/20170321_299/apt_realimage_1490071855559xH1dc_JPEG/bffd6f3cf5f34f7b3ab713e34f93c27a.jpg',
            category: '조경',
            comment:
                '영풍 아파트 조경의 모습입니다. 곳곳에 가로등이 설치되어있고 cctv가 설치되어 있어 보다 안전하다는 장점이 있습니다.\n',
        },
        {
            url: 'https://landthumb-phinf.pstatic.net/20170321_76/apt_realimage_1490071859752aBs4w_JPEG/89aeb444cd3f051695a52c44a422a9e4.jpg',
            category: '지상주차장',
            comment:
                '영풍 아파트 지상주차장 모습입니다. 지상주차장에는 입주민들의 차량들을 많이 주차를 할 수 있도록 주차공간이 많이 만들어져있습니다.\n',
        },
        {
            url: 'https://landthumb-phinf.pstatic.net/20170321_271/apt_realimage_14900718603446RuOR_JPEG/978349d92244548a9f8fcf62af9c08be.jpg',
            category: '지상주차장',
            comment:
                '영풍 아파트 지상주차장 모습입니다. 지상주차장에는 입주민들의 차량들을 많이 주차를 할 수 있도록 주차공간이 많이 만들어져있습니다.\n',
        },
        {
            url: 'https://landthumb-phinf.pstatic.net/20170321_149/apt_realimage_1490071860995GK1uQ_JPEG/0cc4aba40225f2cb216274e54be2de91.jpg',
            category: '노인정',
            comment:
                '노인정의 모습입니다. 단지 안에 노인정이 위치하고 있어 어르신분들이 언제나 가까운 거리에서 이용할 수 있는 장점이 있습니다.\n',
        },
        {
            url: 'https://landthumb-phinf.pstatic.net/20170321_230/apt_realimage_1490071861605zmllT_JPEG/f2e91da1f6bff893d004ba1684f43cba.jpg',
            category: '쓰레기장',
            comment:
                '영풍 아파트 쓰레기장 모습입니다. 쓰레기장에는 입주민들이 깔끔하게 이용할 수 있도록 깨끗하게 관리되어있는 모습입니다.\n',
        },
        {
            url: 'https://landthumb-phinf.pstatic.net/20170321_143/apt_realimage_1490071862381Xqgt9_JPEG/859edced74f35cfa170ea535deec8886.jpg',
            category: '분리수거장',
            comment:
                '분리수거장 모습입니다. 쓰레기장 주변에 위치하고 있으며 분리수거를 편리하게 할 수 있도록 잘 분리되어 있는 모습입니다.\n',
        },
        {
            url: 'https://landthumb-phinf.pstatic.net/20170321_270/apt_realimage_1490071862913gQkxH_JPEG/9e6c7b6753af2c0190117d76e753e8cd.jpg',
            category: '경비실',
            comment:
                '영풍 아파트 경비실의 모습입니다. 아파트 정문 쪽에 위치하고 있으며 경비원분들이 아파트를 항상 관리하고 있어 안전합니다.\n',
        },
        {
            url: 'https://landthumb-phinf.pstatic.net/20110421_4/land_system_1303342169651QnPGl_JPEG/007.jpg',
            category: null,
            comment: null,
        },
        {
            url: 'https://landthumb-phinf.pstatic.net/20110421_191/land_system_1303342169097GX6Km_JPEG/002.jpg',
            category: null,
            comment: null,
        },
        {
            url: 'https://landthumb-phinf.pstatic.net/20110421_266/land_system_1303342169883JNyww_JPEG/008.jpg',
            category: null,
            comment: null,
        },
        {
            url: 'https://landthumb-phinf.pstatic.net/20110421_215/land_system_13033421700676HoBW_JPEG/009.jpg',
            category: null,
            comment: null,
        },
        {
            url: 'https://landthumb-phinf.pstatic.net/20110421_260/land_system_1303342172892VkGVL_JPEG/011.jpg',
            category: null,
            comment: null,
        },
        {
            url: 'https://landthumb-phinf.pstatic.net/20110421_145/land_system_1303342173095HEjst_JPEG/013.jpg',
            category: null,
            comment: null,
        },
        {
            url: 'https://landthumb-phinf.pstatic.net/20110421_174/land_system_1303342173702nY1Kb_JPEG/003.jpg',
            category: null,
            comment: null,
        },
        {
            url: 'https://landthumb-phinf.pstatic.net/20110421_158/land_system_1303342174102N8Aah_JPEG/010.jpg',
            category: null,
            comment: null,
        },
        {
            url: 'https://landthumb-phinf.pstatic.net/20110422_197/land_system_1303436640271cd369_JPEG/DSCN3813-1.jpg',
            category: null,
            comment: null,
        },
        {
            url: 'https://landthumb-phinf.pstatic.net/20110422_149/land_system_130343664051114Etz_JPEG/DSCN3825-1.jpg',
            category: null,
            comment: null,
        },
        {
            url: 'https://landthumb-phinf.pstatic.net/20110421_276/land_system_1303342169290iKr5u_JPEG/004.jpg',
            category: null,
            comment: null,
        },
        {
            url: 'https://landthumb-phinf.pstatic.net/20110422_245/land_system_13034366413242DNDl_JPEG/DSCN3835-1.jpg',
            category: null,
            comment: null,
        },
        {
            url: 'https://landthumb-phinf.pstatic.net/20110421_107/land_system_1303342173857YhFzR_JPEG/006.jpg',
            category: null,
            comment: null,
        },
        {
            url: 'https://landthumb-phinf.pstatic.net/20110422_7/land_system_13034366407853KznW_JPEG/DSCN3814-1.jpg',
            category: null,
            comment: null,
        },
        {
            url: 'https://landthumb-phinf.pstatic.net/20110422_271/land_system_1303436641116B84bP_JPEG/DSCN3807-1.jpg',
            category: null,
            comment: null,
        },
    ],
    totalHouseholdNumber: 156,
    dongCount: 19,
    constructionCompany: '영풍산업주식회사',
    buildingUse: '공동주택',
    isServicedResidence: false,
    buildingRatioInfo: { floorAreaRatio: 76, buildingCoverageRatio: 23 },
    useApprovalDate: '19931215',
    approvalElapsedYear: 31,
    parkingInfo: { totalParkingCount: 150, parkingCountPerHousehold: 0.96 },
    heatingAndCoolingInfo: {
        heatingAndCoolingSystemType: 'HT001',
        heatingEnergyType: 'HF001',
    },
    managementOfficeContact: '02-2682-9087',
    monopolyRestrictionType: 'N',
};
