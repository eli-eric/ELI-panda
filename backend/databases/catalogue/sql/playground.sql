select  * from t_catalog_category tcc
order by id_parent asc;

select p.name as Property, g."name" as Group , tcc."name" as category from t_catalog_category_property p
left join t_catalog_category_property_group g on p.id_group = g.id  
left join t_catalog_category tcc on g.id_category = tcc.id 
order by tcc."name" , g."name" ;

select itm.name as "Item name", tccp."name" as "Property name", tcipv.value->>'value' as "Value", tcc."name" as "Category",tcc.id  from t_catalog_item itm
right join t_catalog_item_property_value tcipv on itm.id = tcipv.id_item 
left join t_catalog_category_property tccp on tccp.id = tcipv.id_property 
left join t_catalog_category tcc on tcc.id = itm.id_category ;

/* Grouped property types for the cameras category */
select count(itm.id), tccp ."name"  from t_catalog_item itm
right join t_catalog_item_property_value tcipv on itm.id = tcipv.id_item 
left join t_catalog_category_property tccp on tccp.id = tcipv.id_property 
where itm.id_category in (35,36,37)
group by tccp."name";

/* get grouped by value and get count of the itmes with this value and the property type for this value */
select 
count(itm.id) as "Items count",
tccp."name" as "Property type",
tccp.id as "Property type ID",
case when tccpt.is_lov then 'list' else tccpt."name" end , 
tcipv.value->>'value' as "Value"
from t_catalog_item itm
right join t_catalog_item_property_value tcipv on itm.id = tcipv.id_item 
left join t_catalog_category_property tccp on tccp.id = tcipv.id_property
left join t_catalog_category_property_type tccpt on tccpt.id = tccp.id_property_type 
where itm.id_category in (27)
group by tcipv.value, tccp."name" , tccpt."name" , tccpt.is_lov ,tccp.id
order by tccp."name" ;

/*here I try to get specific items based on some property counts result*/
select itm.id, itm.name 
from t_catalog_item itm
right join t_catalog_item_property_value tcipv on itm.id = tcipv.id_item 
left join t_catalog_category_property tccp on tccp.id = tcipv.id_property
left join t_catalog_category_property_type tccpt on tccpt.id = tccp.id_property_type
where itm.id_category = 27 and tccp.id = 54 and tcipv.value->>'value' = 'CCD'; 


delete from t_catalog_item ;
delete from t_catalog_category ;
delete from t_catalog_category_property ;

delete from t_catalog_category_property_group;


select * from t_catalog_category_property_type pt ;
select * from t_catalog_category_property_unit pu ;

INSERT INTO panda.t_catalog_category_property_unit("name") SELECT 'W' WHERE NOT EXISTS(SELECT 1 FROM panda.t_catalog_category_property_unit WHERE "name" = 'W');
INSERT INTO panda.t_catalog_category_property_unit("name") SELECT 'm3/h' WHERE NOT EXISTS(SELECT 1 FROM panda.t_catalog_category_property_unit WHERE "name" = 'm3/h');
INSERT INTO panda.t_catalog_category_property_unit("name") SELECT 'mbar' WHERE NOT EXISTS(SELECT 1 FROM panda.t_catalog_category_property_unit WHERE "name" = 'mbar');
INSERT INTO panda.t_catalog_category_property_unit("name") SELECT 'l/sec' WHERE NOT EXISTS(SELECT 1 FROM panda.t_catalog_category_property_unit WHERE "name" = 'l/sec');
INSERT INTO panda.t_catalog_category_property_unit("name") SELECT 'min' WHERE NOT EXISTS(SELECT 1 FROM panda.t_catalog_category_property_unit WHERE "name" = 'min');

INSERT INTO panda.t_catalog_category_property_type("name", is_lov) SELECT 'text', false WHERE NOT EXISTS(SELECT 1 FROM panda.t_catalog_category_property_type WHERE "name" = 'text');
INSERT INTO panda.t_catalog_category_property_type("name", is_lov) SELECT 'number', false WHERE NOT EXISTS(SELECT 1 FROM panda.t_catalog_category_property_type WHERE "name" = 'number');
INSERT INTO panda.t_catalog_category_property_type("name", is_lov) SELECT 'bool', false WHERE NOT EXISTS(SELECT 1 FROM panda.t_catalog_category_property_type WHERE "name" = 'bool');
INSERT INTO panda.t_catalog_category_property_type("name", is_lov) SELECT 'date', false WHERE NOT EXISTS(SELECT 1 FROM panda.t_catalog_category_property_type WHERE "name" = 'date');
