[Specs](https://docs.google.com/document/d/1ifmu_Uoo071bk8pbnaM0pHb3_2tFPqyy_AotKIZl5Qk/edit)

You should have a postrges running with credentials:

db: neon
username: admin
password: g@m3adm1n

Create the following tables:

```SQL
create table pictures (
  id serial primary key,
  pic_url varchar (256)
);

create table tags (
  id serial primary key,
  tag varchar (256)
);

create table picture_tags (
  pic_id int,
  tag_id int
);

insert into pictures (id, pic_url) values (3, 'http://www.lovethispic.com/uploaded_images/22349-Neon-Lights-Coca-cola.jpg');

```
