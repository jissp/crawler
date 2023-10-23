create table crawlings
(
    id         bigint unsigned auto_increment,
    type       enum ('NAVER_LAND')                                           null,
    no         varchar(50)                                                   not null,
    data       json                                                          null,
    created_at datetime                            default current_timestamp null,
    updated_at datetime collate utf8mb4_unicode_ci default null              null on update current_timestamp,
    constraint crawlings_pk
        primary key (id)
);

create index crawlings_no_index
    on crawlings (no);

create index crawlings_type_no_index
    on crawlings (type, no);

