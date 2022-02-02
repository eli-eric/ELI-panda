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

