database name => price_plan

create table user_plan (
    id serial not null primary key,
    user_name varchar(100) not null,
    plan varchar(100) not null
);