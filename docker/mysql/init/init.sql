create table articles
(
    id         bigint unsigned auto_increment
        primary key,
    type       enum ('NAVER_LAND', 'AWS_RECENT')    null,
    no         varchar(50)                          not null,
    data       longtext collate utf8mb4_bin         null,
    created_at datetime default current_timestamp() null,
    updated_at datetime                             null on update current_timestamp()
);

create index articles_no_index
    on articles (no);

create index articles_type_no_index
    on articles (type, no);

create table aws_recent_articles
(
    id          bigint unsigned auto_increment
        primary key,
    guid        varchar(40)                          not null,
    category    varchar(255)                         null,
    title       varchar(255)                         not null,
    description text                                 not null,
    author      varchar(40)                          null,
    link        varchar(255)                         null,
    pub_at      datetime                             not null,
    created_at  datetime default current_timestamp() null,
    updated_at  datetime                             null on update current_timestamp(),
    constraint aws_recent_articles_guid_uindex
        unique (guid)
);

create table coords
(
    id         bigint unsigned auto_increment
        primary key,
    latitude   decimal(13, 10)                      not null,
    longitude  decimal(13, 10)                      null,
    data       longtext collate utf8mb4_bin         null,
    created_at datetime default current_timestamp() null,
    updated_at datetime                             null on update current_timestamp()
);

create index coords_latitude_longitude_index
    on coords (latitude, longitude);

create table naver_land_article_transports
(
    id         int unsigned auto_increment
        primary key,
    article_no varchar(50)                          not null,
    data       longtext collate utf8mb4_bin         null,
    created_at datetime default current_timestamp() not null
);

create table naver_land_articles
(
    id               bigint unsigned auto_increment
        primary key,
    article_no       varchar(50)                                                                                                                                              not null,
    atcl_nm          varchar(255)                                                                                                                                             not null,
    rlet_tp_nm       enum ('아파트', '오피스텔', '빌라', '아파트분양권', '오피스텔분양권', '재건축', '전원주택', '단독/다가구', '상가주택', '한옥주택', '재개발', '원룸', '고시원', '상가', '사무실', '공장/창고', '건물', '토지', '지식산업센터') not null,
    trad_tp_cd       enum ('A1', 'B1', 'B2', 'B3')                                                                                                                            not null,
    region1          varchar(20)                                                                                                                                              null,
    region2          varchar(20)                                                                                                                                              null,
    region3          varchar(20)                                                                                                                                              null,
    address          varchar(500)                                                                                                                                             null,
    price            int unsigned     default 0                                                                                                                               null,
    rent_price       int unsigned                                                                                                                                             null,
    trans_rent_price int unsigned                                                                                                                                             null comment '보증금 변환 월세',
    spc1             decimal(8, 2)    default 0.00                                                                                                                            null,
    spc2             decimal(8, 2)    default 0.00                                                                                                                            null,
    spc_ratio        decimal(5, 2)    default 0.00                                                                                                                            not null,
    spc_price        decimal(8, 2)    default 0.00                                                                                                                            null,
    room_count       tinyint unsigned default 0                                                                                                                               null,
    is_duplex        enum ('Y', 'N')  default 'N'                                                                                                                             not null,
    floor            tinyint unsigned default 0                                                                                                                               null,
    max_floor        tinyint unsigned default 0                                                                                                                               null,
    direction        enum ('동향', '서향', '남향', '북향', '북동향', '남동향', '북서향', '남서향')                                                                                                null,
    completion_year  tinyint unsigned default 0                                                                                                                               null,
    `desc`           text                                                                                                                                                     null,
    tags             longtext collate utf8mb4_bin                                                                                                                             null,
    lat              decimal(10, 7)                                                                                                                                           null,
    lng              decimal(10, 7)                                                                                                                                           null,
    is_bookmark      enum ('Y', 'N')  default 'N'                                                                                                                             null,
    is_hidden        enum ('Y', 'N')  default 'N'                                                                                                                             null,
    created_at       datetime         default current_timestamp()                                                                                                             null,
    updated_at       datetime                                                                                                                                                 null on update current_timestamp(),
    constraint naver_land_articles_article_no_uindex
        unique (article_no)
);

create index naver_land_articles_address_index
    on naver_land_articles (address);

create index naver_land_articles_atcl_nm_created_at_index
    on naver_land_articles (atcl_nm, created_at);

create index naver_land_articles_created_at_index
    on naver_land_articles (created_at);

create index naver_land_articles_trad_tp_cd_created_at_index
    on naver_land_articles (trad_tp_cd, created_at);

