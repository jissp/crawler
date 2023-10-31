create table naver_land_articles
(
    id              bigint unsigned auto_increment
        primary key,
    article_no      varchar(50)                                                                                                                                              not null,
    atcl_nm         varchar(255)                                                                                                                                             not null,
    rlet_tp_nm      enum ('아파트', '오피스텔', '빌라', '아파트분양권', '오피스텔분양권', '재건축', '전원주택', '단독/다가구', '상가주택', '한옥주택', '재개발', '원룸', '고시원', '상가', '사무실', '공장/창고', '건물', '토지', '지식산업센터') not null,
    trad_tp_cd      enum ('A1', 'B1', 'B2', 'B3')                                                                                                                            not null,
    region1         varchar(20)                                                                                                                                              null,
    region2         varchar(20)                                                                                                                                              null,
    region3         varchar(20)                                                                                                                                              null,
    address         varchar(500)                                                                                                                                             null,
    price           int unsigned     default '0'                                                                                                                             null,
    rent_price      int unsigned                                                                                                                                             null,
    spc1            decimal(8, 2)    default 0.00                                                                                                                            null,
    spc2            decimal(8, 2)    default 0.00                                                                                                                            null,
    spc_ratio       decimal(5, 2)    default 0.00                                                                                                                            not null,
    spc_price       decimal(8, 2)    default 0.00                                                                                                                            null,
    room_count      tinyint unsigned default '0'                                                                                                                             null,
    floor           tinyint unsigned default '0'                                                                                                                             null,
    max_floor       tinyint unsigned default '0'                                                                                                                             null,
    direction       enum ('동향', '서향', '남향', '북향', '북동향', '남동향', '북서향', '남서향')                                                                                                null,
    completion_year tinyint unsigned default '0'                                                                                                                             null,
    lat             decimal(10, 7)                                                                                                                                           null,
    lng             decimal(10, 7)                                                                                                                                           null,
    created_at      datetime         default CURRENT_TIMESTAMP                                                                                                               null,
    updated_at      datetime                                                                                                                                                 null on update CURRENT_TIMESTAMP
);

create index naver_land_articles_article_no_index
    on naver_land_articles (article_no);

create index naver_land_articles_atcl_nm_index
    on naver_land_articles (atcl_nm);

create index naver_land_articles_region1_index
    on naver_land_articles (region1);

create index naver_land_articles_trad_tp_cd_index
    on naver_land_articles (trad_tp_cd);

