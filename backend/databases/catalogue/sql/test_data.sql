--it could be better to delete all affected tables before run this script to keep the data consist
--create test data
--first we need test codebook data for catalog items like manufacturer, availability, ...
INSERT INTO panda.t_manufacturer ("name", description) select 'Thorlabs', 'Thorlabs' WHERE NOT EXISTS(SELECT 1 FROM panda.t_manufacturer WHERE "name" = 'Thorlabs');
INSERT INTO panda.t_manufacturer ("name", description) select 'Newport', 'Newport' WHERE NOT EXISTS(SELECT 1 FROM panda.t_manufacturer WHERE "name" = 'Newport');
INSERT INTO panda.t_manufacturer ("name", description) select 'National Instruments', 'National Instruments' WHERE NOT EXISTS(SELECT 1 FROM panda.t_manufacturer WHERE "name" = 'National Instruments');
INSERT INTO panda.t_manufacturer ("name", description) select 'OptoSigma', 'OptoSigma' WHERE NOT EXISTS(SELECT 1 FROM panda.t_manufacturer WHERE "name" = 'OptoSigma');

INSERT INTO panda.t_catalog_availability ("name", description) select 'Available', 'Available' WHERE NOT EXISTS(SELECT 1 FROM panda.t_catalog_availability WHERE "name" = 'Available');
INSERT INTO panda.t_catalog_availability ("name", description) select 'Not Available', 'Not Available' WHERE NOT EXISTS(SELECT 1 FROM panda.t_catalog_availability WHERE "name" = 'Not Available');


INSERT INTO panda.t_catalog_category (id_parent , "name", "code", order_position) SELECT NULL, 'Optics', 'O',1 WHERE NOT EXISTS(SELECT 1 FROM panda.t_catalog_category WHERE "code" = 'O');
INSERT INTO panda.t_catalog_category (id_parent , "name", "code", order_position) SELECT (SELECT id FROM panda.t_catalog_category WHERE code = 'O' LIMIT 1), 'Mirror', 'O-M',1 WHERE NOT EXISTS(SELECT 1 FROM panda.t_catalog_category WHERE "code" = 'O-M');
INSERT INTO panda.t_catalog_category (id_parent , "name", "code", order_position) SELECT (SELECT id FROM panda.t_catalog_category WHERE code = 'O' LIMIT 1), 'Lens', 'O-L',1 WHERE NOT EXISTS(SELECT 1 FROM panda.t_catalog_category WHERE "code" = 'O-L');


INSERT INTO panda.t_catalog_category_property_unit("name") SELECT 'W' WHERE NOT EXISTS(SELECT 1 FROM panda.t_catalog_category_property_unit WHERE "name" = 'W');
INSERT INTO panda.t_catalog_category_property_unit("name") SELECT 'm3/h' WHERE NOT EXISTS(SELECT 1 FROM panda.t_catalog_category_property_unit WHERE "name" = 'm3/h');
INSERT INTO panda.t_catalog_category_property_unit("name") SELECT 'mbar' WHERE NOT EXISTS(SELECT 1 FROM panda.t_catalog_category_property_unit WHERE "name" = 'mbar');
INSERT INTO panda.t_catalog_category_property_unit("name") SELECT 'l/sec' WHERE NOT EXISTS(SELECT 1 FROM panda.t_catalog_category_property_unit WHERE "name" = 'l/sec');
INSERT INTO panda.t_catalog_category_property_unit("name") SELECT 'min' WHERE NOT EXISTS(SELECT 1 FROM panda.t_catalog_category_property_unit WHERE "name" = 'min');


INSERT INTO panda.t_catalog_category_property_type("name", is_lov) SELECT 'text', false WHERE NOT EXISTS(SELECT 1 FROM panda.t_catalog_category_property_type WHERE "name" = 'text');
INSERT INTO panda.t_catalog_category_property_type("name", is_lov) SELECT 'number', false WHERE NOT EXISTS(SELECT 1 FROM panda.t_catalog_category_property_type WHERE "name" = 'number');
INSERT INTO panda.t_catalog_category_property_type("name", is_lov) SELECT 'bool', false WHERE NOT EXISTS(SELECT 1 FROM panda.t_catalog_category_property_type WHERE "name" = 'bool');
INSERT INTO panda.t_catalog_category_property_type("name", is_lov) SELECT 'date', false WHERE NOT EXISTS(SELECT 1 FROM panda.t_catalog_category_property_type WHERE "name" = 'date');



--one specific mirror from ELI-BEAMLINES DB
INSERT INTO panda.t_catalog_item ("name", id_category, estimated_price, note, image_main,id_availability,supported_to_date,typical_available_in_days,id_manufacturer, id_facility)
SELECT
'Broadband R=3800mm concave mirror', 
(SELECT id FROM panda.t_catalog_category WHERE code = 'O-M' LIMIT 1),
1642,
'PTN FS Broadband Plano-Concave mirror, 3", S1: HR Rs > 99.8 %,Rs-GDD = 0 ± 50fs^2, s-pol, ROC 3800mm, AOI 0 - 5 deg, low GDD; S2: Uncoated;  (OptoSigma FLCM-76.2C15-10-W1D-3800-75/95s-5D); L1 Cabinet 9',
NULL,
(SELECT id FROM panda.t_catalog_availability WHERE "name" = 'Available' LIMIT 1),
'2022-06-30',
30,
(SELECT id FROM panda.t_manufacturer WHERE "name" = 'OptoSigma' LIMIT 1),
(SELECT id FROM panda.t_facility WHERE "name" = 'ELI-BEAMLINES')
WHERE NOT EXISTS(SELECT 1 FROM panda.t_catalog_item WHERE "name" = 'Broadband R=3800mm concave mirror');


--300000 items derived(some data are randomed) from the mirror above -feel free to change the amount of the items, random values,....
INSERT INTO panda.t_catalog_item ("name", id_category, estimated_price, note, image_main,id_availability,supported_to_date,typical_available_in_days,id_manufacturer, id_facility)
SELECT
'Broadband R=3800mm concave mirror - ' || idx, 
(SELECT id FROM panda.t_catalog_category WHERE code = 'O-M' LIMIT 1),
(800 + floor(pg_catalog.random() * 1500)),
idx || 'PTN FS Broadband Plano-Concave mirror, 3", S1: HR Rs > 99.8 %,Rs-GDD = 0 ± 50fs^2, s-pol, ROC 3800mm, AOI 0 - 5 deg, low GDD; S2: Uncoated;  (OptoSigma FLCM-76.2C15-10-W1D-3800-75/95s-5D); L1 Cabinet 9',
NULL,
(SELECT id FROM panda.t_catalog_availability WHERE "name" = 'Available' LIMIT 1),
('2022-06-'||(1 + floor(pg_catalog.random() * 29)))::date,
(floor(pg_catalog.random() * 30)),
(SELECT id FROM panda.t_manufacturer WHERE "name" = 'OptoSigma' LIMIT 1),
(SELECT id FROM panda.t_facility WHERE "name" = 'ELI-BEAMLINES')
FROM  pg_catalog.generate_series(1,300000) AS idx; 

--if we want some images to generated items. it is a picture of the mirror
UPDATE  panda.t_catalog_item 
SET image_main = 'data:image/jpeg;base64,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'
WHERE id >= (SELECT id FROM panda.t_catalog_item ORDER BY id LIMIT 1) AND id <= (SELECT id FROM panda.t_catalog_item ORDER BY id LIMIT 1) + 30;

