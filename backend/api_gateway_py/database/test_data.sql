--it could be better to delete all affected tables before run this script to keep the data consist
--create test data
--first we need test codebook data for catalog items like manufacturer, availability, ...
INSERT INTO panda.t_manufacturer ("name", description) select 'Thorlabs', 'Thorlabs' WHERE NOT EXISTS(SELECT 1 FROM panda.t_manufacturer WHERE "name" = 'Thorlabs');
INSERT INTO panda.t_manufacturer ("name", description) select 'Newport', 'Newport' WHERE NOT EXISTS(SELECT 1 FROM panda.t_manufacturer WHERE "name" = 'Newport');
INSERT INTO panda.t_manufacturer ("name", description) select 'National Instruments', 'National Instruments' WHERE NOT EXISTS(SELECT 1 FROM panda.t_manufacturer WHERE "name" = 'National Instruments');

INSERT INTO panda.t_catalog_availability ("name", description) select 'Available', 'Available' WHERE NOT EXISTS(SELECT 1 FROM panda.t_catalog_availability WHERE "name" = 'Available');
INSERT INTO panda.t_catalog_availability ("name", description) select 'Not Available', 'Not Available' WHERE NOT EXISTS(SELECT 1 FROM panda.t_catalog_availability WHERE "name" = 'Not Available');


INSERT INTO panda.t_catalog_category (id_parent , "name", "code", order_position) SELECT NULL, 'Optics', 'O',1 WHERE NOT EXISTS(SELECT 1 FROM panda.t_catalog_category WHERE "code" = 'O');
INSERT INTO panda.t_catalog_category (id_parent , "name", "code", order_position) SELECT (SELECT id FROM panda.t_catalog_category WHERE code = 'O' LIMIT 1), 'Mirror', 'O-M',1 WHERE NOT EXISTS(SELECT 1 FROM panda.t_catalog_category WHERE "code" = 'O-M');
INSERT INTO panda.t_catalog_category (id_parent , "name", "code", order_position) SELECT (SELECT id FROM panda.t_catalog_category WHERE code = 'O' LIMIT 1), 'Lens', 'O-L',1 WHERE NOT EXISTS(SELECT 1 FROM panda.t_catalog_category WHERE "code" = 'O-L');




