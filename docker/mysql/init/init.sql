create table articles
(
    id         bigint unsigned auto_increment,
    type       enum ('NAVER_LAND')                                           null,
    no         varchar(50)                                                   not null,
    data       json                                                          null,
    created_at datetime                            default current_timestamp null,
    updated_at datetime collate utf8mb4_unicode_ci default null              null on update current_timestamp,
    constraint articles_pk
        primary key (id)
) collate = utf8mb4_unicode_ci;

create index articles_no_index
    on articles (no);

create index articles_type_no_index
    on articles (type, no);


-- auto-generated definition
create table naver_land_articles
(
    id         bigint unsigned auto_increment
        primary key,
    article_no varchar(50)                                                                                                                                              not null,
    atcl_nm    varchar(255)                                                                                                                                             not null,
    rlet_tp_nm enum ('아파트', '오피스텔', '빌라', '아파트분양권', '오피스텔분양권', '재건축', '전원주택', '단독/다가구', '상가주택', '한옥주택', '재개발', '원룸', '고시원', '상가', '사무실', '공장/창고', '건물', '토지', '지식산업센터') not null,
    trad_tp_cd enum ('A1', 'B1', 'B2', 'B3')                                                                                                                            not null,
    price      decimal(8, 2) default 0.00                                                                                                                               null,
    spc1       decimal(8, 2) default 0.00                                                                                                                               null,
    spc2       decimal(8, 2) default 0.00                                                                                                                               null,
    direction  enum ('동향', '서향', '남향', '북향', '북동향', '남동향', '북서향', '남서향')                                                                                                null,
    lat        decimal(10, 7)                                                                                                                                           null,
    lng        decimal(10, 7)                                                                                                                                           null,
    created_at datetime      default CURRENT_TIMESTAMP                                                                                                                  null,
    updated_at datetime                                                                                                                                                 null on update CURRENT_TIMESTAMP
) collate = utf8mb4_unicode_ci;

create index naver_land_articles_article_no_index
    on naver_land_articles (article_no);

create index naver_land_articles_atcl_nm_index
    on naver_land_articles (atcl_nm);

create index naver_land_articles_trad_tp_cd_index
    on naver_land_articles (trad_tp_cd);


