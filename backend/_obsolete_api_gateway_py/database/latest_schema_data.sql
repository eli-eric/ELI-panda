-- DROP SCHEMA panda;

CREATE SCHEMA IF NOT EXISTS panda AUTHORIZATION postgres;

-- DROP SEQUENCE panda.t_catalog_availability_id_seq;

CREATE SEQUENCE  IF NOT EXISTS panda.t_catalog_availability_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE panda.t_catalog_availability_id_seq OWNER TO postgres;
GRANT ALL ON SEQUENCE panda.t_catalog_availability_id_seq TO postgres;

-- DROP SEQUENCE panda.t_catalog_availability_id_seq1;

CREATE SEQUENCE  IF NOT EXISTS panda.t_catalog_availability_id_seq1
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE panda.t_catalog_availability_id_seq1 OWNER TO postgres;
GRANT ALL ON SEQUENCE panda.t_catalog_availability_id_seq1 TO postgres;

-- DROP SEQUENCE panda.t_catalog_availability_id_seq2;

CREATE SEQUENCE  IF NOT EXISTS panda.t_catalog_availability_id_seq2
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE panda.t_catalog_availability_id_seq2 OWNER TO postgres;
GRANT ALL ON SEQUENCE panda.t_catalog_availability_id_seq2 TO postgres;

-- DROP SEQUENCE panda.t_catalog_category_id_seq;

CREATE SEQUENCE  IF NOT EXISTS panda.t_catalog_category_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE panda.t_catalog_category_id_seq OWNER TO postgres;
GRANT ALL ON SEQUENCE panda.t_catalog_category_id_seq TO postgres;

-- DROP SEQUENCE panda.t_catalog_category_id_seq1;

CREATE SEQUENCE  IF NOT EXISTS panda.t_catalog_category_id_seq1
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE panda.t_catalog_category_id_seq1 OWNER TO postgres;
GRANT ALL ON SEQUENCE panda.t_catalog_category_id_seq1 TO postgres;

-- DROP SEQUENCE panda.t_catalog_category_id_seq2;

CREATE SEQUENCE  IF NOT EXISTS panda.t_catalog_category_id_seq2
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE panda.t_catalog_category_id_seq2 OWNER TO postgres;
GRANT ALL ON SEQUENCE panda.t_catalog_category_id_seq2 TO postgres;

-- DROP SEQUENCE panda.t_catalog_category_property_group_id_seq;

CREATE SEQUENCE  IF NOT EXISTS panda.t_catalog_category_property_group_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE panda.t_catalog_category_property_group_id_seq OWNER TO postgres;
GRANT ALL ON SEQUENCE panda.t_catalog_category_property_group_id_seq TO postgres;

-- DROP SEQUENCE panda.t_catalog_category_property_group_id_seq1;

CREATE SEQUENCE  IF NOT EXISTS panda.t_catalog_category_property_group_id_seq1
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE panda.t_catalog_category_property_group_id_seq1 OWNER TO postgres;
GRANT ALL ON SEQUENCE panda.t_catalog_category_property_group_id_seq1 TO postgres;

-- DROP SEQUENCE panda.t_catalog_category_property_group_id_seq2;

CREATE SEQUENCE  IF NOT EXISTS panda.t_catalog_category_property_group_id_seq2
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE panda.t_catalog_category_property_group_id_seq2 OWNER TO postgres;
GRANT ALL ON SEQUENCE panda.t_catalog_category_property_group_id_seq2 TO postgres;

-- DROP SEQUENCE panda.t_catalog_category_property_id_seq;

CREATE SEQUENCE  IF NOT EXISTS panda.t_catalog_category_property_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE panda.t_catalog_category_property_id_seq OWNER TO postgres;
GRANT ALL ON SEQUENCE panda.t_catalog_category_property_id_seq TO postgres;

-- DROP SEQUENCE panda.t_catalog_category_property_id_seq1;

CREATE SEQUENCE  IF NOT EXISTS panda.t_catalog_category_property_id_seq1
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE panda.t_catalog_category_property_id_seq1 OWNER TO postgres;
GRANT ALL ON SEQUENCE panda.t_catalog_category_property_id_seq1 TO postgres;

-- DROP SEQUENCE panda.t_catalog_category_property_id_seq2;

CREATE SEQUENCE  IF NOT EXISTS panda.t_catalog_category_property_id_seq2
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE panda.t_catalog_category_property_id_seq2 OWNER TO postgres;
GRANT ALL ON SEQUENCE panda.t_catalog_category_property_id_seq2 TO postgres;

-- DROP SEQUENCE panda.t_catalog_category_property_lov_id_seq;

CREATE SEQUENCE  IF NOT EXISTS panda.t_catalog_category_property_lov_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE panda.t_catalog_category_property_lov_id_seq OWNER TO postgres;
GRANT ALL ON SEQUENCE panda.t_catalog_category_property_lov_id_seq TO postgres;

-- DROP SEQUENCE panda.t_catalog_category_property_lov_id_seq1;

CREATE SEQUENCE  IF NOT EXISTS panda.t_catalog_category_property_lov_id_seq1
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE panda.t_catalog_category_property_lov_id_seq1 OWNER TO postgres;
GRANT ALL ON SEQUENCE panda.t_catalog_category_property_lov_id_seq1 TO postgres;

-- DROP SEQUENCE panda.t_catalog_category_property_lov_id_seq2;

CREATE SEQUENCE  IF NOT EXISTS panda.t_catalog_category_property_lov_id_seq2
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE panda.t_catalog_category_property_lov_id_seq2 OWNER TO postgres;
GRANT ALL ON SEQUENCE panda.t_catalog_category_property_lov_id_seq2 TO postgres;

-- DROP SEQUENCE panda.t_catalog_category_property_type_id_seq;

CREATE SEQUENCE  IF NOT EXISTS panda.t_catalog_category_property_type_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE panda.t_catalog_category_property_type_id_seq OWNER TO postgres;
GRANT ALL ON SEQUENCE panda.t_catalog_category_property_type_id_seq TO postgres;

-- DROP SEQUENCE panda.t_catalog_category_property_type_id_seq1;

CREATE SEQUENCE  IF NOT EXISTS panda.t_catalog_category_property_type_id_seq1
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE panda.t_catalog_category_property_type_id_seq1 OWNER TO postgres;
GRANT ALL ON SEQUENCE panda.t_catalog_category_property_type_id_seq1 TO postgres;

-- DROP SEQUENCE panda.t_catalog_category_property_type_id_seq2;

CREATE SEQUENCE  IF NOT EXISTS panda.t_catalog_category_property_type_id_seq2
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE panda.t_catalog_category_property_type_id_seq2 OWNER TO postgres;
GRANT ALL ON SEQUENCE panda.t_catalog_category_property_type_id_seq2 TO postgres;

-- DROP SEQUENCE panda.t_catalog_documents_id_seq;

CREATE SEQUENCE  IF NOT EXISTS panda.t_catalog_documents_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE panda.t_catalog_documents_id_seq OWNER TO postgres;
GRANT ALL ON SEQUENCE panda.t_catalog_documents_id_seq TO postgres;

-- DROP SEQUENCE panda.t_catalog_documents_id_seq1;

CREATE SEQUENCE  IF NOT EXISTS panda.t_catalog_documents_id_seq1
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE panda.t_catalog_documents_id_seq1 OWNER TO postgres;
GRANT ALL ON SEQUENCE panda.t_catalog_documents_id_seq1 TO postgres;

-- DROP SEQUENCE panda.t_catalog_documents_id_seq2;

CREATE SEQUENCE  IF NOT EXISTS panda.t_catalog_documents_id_seq2
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE panda.t_catalog_documents_id_seq2 OWNER TO postgres;
GRANT ALL ON SEQUENCE panda.t_catalog_documents_id_seq2 TO postgres;

-- DROP SEQUENCE panda.t_catalog_item_id_seq;

CREATE SEQUENCE  IF NOT EXISTS panda.t_catalog_item_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE panda.t_catalog_item_id_seq OWNER TO postgres;
GRANT ALL ON SEQUENCE panda.t_catalog_item_id_seq TO postgres;

-- DROP SEQUENCE panda.t_catalog_item_id_seq1;

CREATE SEQUENCE  IF NOT EXISTS panda.t_catalog_item_id_seq1
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE panda.t_catalog_item_id_seq1 OWNER TO postgres;
GRANT ALL ON SEQUENCE panda.t_catalog_item_id_seq1 TO postgres;

-- DROP SEQUENCE panda.t_catalog_item_id_seq2;

CREATE SEQUENCE  IF NOT EXISTS panda.t_catalog_item_id_seq2
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE panda.t_catalog_item_id_seq2 OWNER TO postgres;
GRANT ALL ON SEQUENCE panda.t_catalog_item_id_seq2 TO postgres;

-- DROP SEQUENCE panda.t_item_documents_id_seq;

CREATE SEQUENCE  IF NOT EXISTS panda.t_item_documents_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE panda.t_item_documents_id_seq OWNER TO postgres;
GRANT ALL ON SEQUENCE panda.t_item_documents_id_seq TO postgres;

-- DROP SEQUENCE panda.t_item_documents_id_seq1;

CREATE SEQUENCE  IF NOT EXISTS panda.t_item_documents_id_seq1
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE panda.t_item_documents_id_seq1 OWNER TO postgres;
GRANT ALL ON SEQUENCE panda.t_item_documents_id_seq1 TO postgres;

-- DROP SEQUENCE panda.t_item_documents_id_seq2;

CREATE SEQUENCE  IF NOT EXISTS panda.t_item_documents_id_seq2
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE panda.t_item_documents_id_seq2 OWNER TO postgres;
GRANT ALL ON SEQUENCE panda.t_item_documents_id_seq2 TO postgres;

-- DROP SEQUENCE panda.t_item_id_seq;

CREATE SEQUENCE  IF NOT EXISTS panda.t_item_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE panda.t_item_id_seq OWNER TO postgres;
GRANT ALL ON SEQUENCE panda.t_item_id_seq TO postgres;

-- DROP SEQUENCE panda.t_item_id_seq1;

CREATE SEQUENCE  IF NOT EXISTS panda.t_item_id_seq1
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE panda.t_item_id_seq1 OWNER TO postgres;
GRANT ALL ON SEQUENCE panda.t_item_id_seq1 TO postgres;

-- DROP SEQUENCE panda.t_item_id_seq2;

CREATE SEQUENCE  IF NOT EXISTS panda.t_item_id_seq2
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE panda.t_item_id_seq2 OWNER TO postgres;
GRANT ALL ON SEQUENCE panda.t_item_id_seq2 TO postgres;

-- DROP SEQUENCE panda.t_location_id_seq;

CREATE SEQUENCE  IF NOT EXISTS panda.t_location_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE panda.t_location_id_seq OWNER TO postgres;
GRANT ALL ON SEQUENCE panda.t_location_id_seq TO postgres;

-- DROP SEQUENCE panda.t_location_id_seq1;

CREATE SEQUENCE  IF NOT EXISTS panda.t_location_id_seq1
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE panda.t_location_id_seq1 OWNER TO postgres;
GRANT ALL ON SEQUENCE panda.t_location_id_seq1 TO postgres;

-- DROP SEQUENCE panda.t_location_id_seq2;

CREATE SEQUENCE  IF NOT EXISTS panda.t_location_id_seq2
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE panda.t_location_id_seq2 OWNER TO postgres;
GRANT ALL ON SEQUENCE panda.t_location_id_seq2 TO postgres;

-- DROP SEQUENCE panda.t_security_access_entity_id_seq;

CREATE SEQUENCE  IF NOT EXISTS panda.t_security_access_entity_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE panda.t_security_access_entity_id_seq OWNER TO postgres;
GRANT ALL ON SEQUENCE panda.t_security_access_entity_id_seq TO postgres;

-- DROP SEQUENCE panda.t_security_access_entity_id_seq1;

CREATE SEQUENCE  IF NOT EXISTS panda.t_security_access_entity_id_seq1
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE panda.t_security_access_entity_id_seq1 OWNER TO postgres;
GRANT ALL ON SEQUENCE panda.t_security_access_entity_id_seq1 TO postgres;

-- DROP SEQUENCE panda.t_security_access_entity_id_seq2;

CREATE SEQUENCE  IF NOT EXISTS panda.t_security_access_entity_id_seq2
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE panda.t_security_access_entity_id_seq2 OWNER TO postgres;
GRANT ALL ON SEQUENCE panda.t_security_access_entity_id_seq2 TO postgres;

-- DROP SEQUENCE panda.t_security_access_id_seq;

CREATE SEQUENCE  IF NOT EXISTS panda.t_security_access_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE panda.t_security_access_id_seq OWNER TO postgres;
GRANT ALL ON SEQUENCE panda.t_security_access_id_seq TO postgres;

-- DROP SEQUENCE panda.t_security_access_id_seq1;

CREATE SEQUENCE  IF NOT EXISTS panda.t_security_access_id_seq1
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE panda.t_security_access_id_seq1 OWNER TO postgres;
GRANT ALL ON SEQUENCE panda.t_security_access_id_seq1 TO postgres;

-- DROP SEQUENCE panda.t_security_access_id_seq2;

CREATE SEQUENCE  IF NOT EXISTS panda.t_security_access_id_seq2
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE panda.t_security_access_id_seq2 OWNER TO postgres;
GRANT ALL ON SEQUENCE panda.t_security_access_id_seq2 TO postgres;

-- DROP SEQUENCE panda.t_security_role_id_seq;

CREATE SEQUENCE  IF NOT EXISTS panda.t_security_role_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE panda.t_security_role_id_seq OWNER TO postgres;
GRANT ALL ON SEQUENCE panda.t_security_role_id_seq TO postgres;

-- DROP SEQUENCE panda.t_security_role_id_seq1;

CREATE SEQUENCE  IF NOT EXISTS panda.t_security_role_id_seq1
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE panda.t_security_role_id_seq1 OWNER TO postgres;
GRANT ALL ON SEQUENCE panda.t_security_role_id_seq1 TO postgres;

-- DROP SEQUENCE panda.t_security_role_id_seq2;

CREATE SEQUENCE  IF NOT EXISTS panda.t_security_role_id_seq2
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE panda.t_security_role_id_seq2 OWNER TO postgres;
GRANT ALL ON SEQUENCE panda.t_security_role_id_seq2 TO postgres;

-- DROP SEQUENCE panda.t_security_team_id_seq;

CREATE SEQUENCE  IF NOT EXISTS panda.t_security_team_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE panda.t_security_team_id_seq OWNER TO postgres;
GRANT ALL ON SEQUENCE panda.t_security_team_id_seq TO postgres;

-- DROP SEQUENCE panda.t_security_team_id_seq1;

CREATE SEQUENCE  IF NOT EXISTS panda.t_security_team_id_seq1
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE panda.t_security_team_id_seq1 OWNER TO postgres;
GRANT ALL ON SEQUENCE panda.t_security_team_id_seq1 TO postgres;

-- DROP SEQUENCE panda.t_security_team_id_seq2;

CREATE SEQUENCE  IF NOT EXISTS panda.t_security_team_id_seq2
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE panda.t_security_team_id_seq2 OWNER TO postgres;
GRANT ALL ON SEQUENCE panda.t_security_team_id_seq2 TO postgres;

-- DROP SEQUENCE panda.t_security_user_id_seq;

CREATE SEQUENCE  IF NOT EXISTS panda.t_security_user_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE panda.t_security_user_id_seq OWNER TO postgres;
GRANT ALL ON SEQUENCE panda.t_security_user_id_seq TO postgres;

-- DROP SEQUENCE panda.t_security_user_id_seq1;

CREATE SEQUENCE  IF NOT EXISTS panda.t_security_user_id_seq1
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE panda.t_security_user_id_seq1 OWNER TO postgres;
GRANT ALL ON SEQUENCE panda.t_security_user_id_seq1 TO postgres;

-- DROP SEQUENCE panda.t_security_user_id_seq2;

CREATE SEQUENCE  IF NOT EXISTS panda.t_security_user_id_seq2
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE panda.t_security_user_id_seq2 OWNER TO postgres;
GRANT ALL ON SEQUENCE panda.t_security_user_id_seq2 TO postgres;

-- DROP SEQUENCE panda.t_supplier_id_seq;

CREATE SEQUENCE  IF NOT EXISTS panda.t_supplier_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE panda.t_supplier_id_seq OWNER TO postgres;
GRANT ALL ON SEQUENCE panda.t_supplier_id_seq TO postgres;

-- DROP SEQUENCE panda.t_supplier_id_seq1;

CREATE SEQUENCE  IF NOT EXISTS panda.t_supplier_id_seq1
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE panda.t_supplier_id_seq1 OWNER TO postgres;
GRANT ALL ON SEQUENCE panda.t_supplier_id_seq1 TO postgres;

-- DROP SEQUENCE panda.t_supplier_id_seq2;

CREATE SEQUENCE  IF NOT EXISTS panda.t_supplier_id_seq2
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE panda.t_supplier_id_seq2 OWNER TO postgres;
GRANT ALL ON SEQUENCE panda.t_supplier_id_seq2 TO postgres;

-- DROP SEQUENCE panda.t_system_id_seq;

CREATE SEQUENCE  IF NOT EXISTS panda.t_system_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE panda.t_system_id_seq OWNER TO postgres;
GRANT ALL ON SEQUENCE panda.t_system_id_seq TO postgres;

-- DROP SEQUENCE panda.t_system_id_seq1;

CREATE SEQUENCE  IF NOT EXISTS panda.t_system_id_seq1
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE panda.t_system_id_seq1 OWNER TO postgres;
GRANT ALL ON SEQUENCE panda.t_system_id_seq1 TO postgres;

-- DROP SEQUENCE panda.t_system_id_seq2;

CREATE SEQUENCE  IF NOT EXISTS panda.t_system_id_seq2
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE panda.t_system_id_seq2 OWNER TO postgres;
GRANT ALL ON SEQUENCE panda.t_system_id_seq2 TO postgres;

-- DROP SEQUENCE panda.t_system_relationship_type_id_seq;

CREATE SEQUENCE  IF NOT EXISTS panda.t_system_relationship_type_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE panda.t_system_relationship_type_id_seq OWNER TO postgres;
GRANT ALL ON SEQUENCE panda.t_system_relationship_type_id_seq TO postgres;

-- DROP SEQUENCE panda.t_system_relationship_type_id_seq1;

CREATE SEQUENCE  IF NOT EXISTS panda.t_system_relationship_type_id_seq1
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE panda.t_system_relationship_type_id_seq1 OWNER TO postgres;
GRANT ALL ON SEQUENCE panda.t_system_relationship_type_id_seq1 TO postgres;

-- DROP SEQUENCE panda.t_system_relationship_type_id_seq2;

CREATE SEQUENCE  IF NOT EXISTS panda.t_system_relationship_type_id_seq2
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE panda.t_system_relationship_type_id_seq2 OWNER TO postgres;
GRANT ALL ON SEQUENCE panda.t_system_relationship_type_id_seq2 TO postgres;
-- panda.t_catalog_availability definition

-- Drop table

-- DROP TABLE panda.t_catalog_availability;

CREATE TABLE  IF NOT EXISTS panda.t_catalog_availability (
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"name" varchar(100) NOT NULL,
	description varchar(500) NULL,
	CONSTRAINT t_catalog_availability_pk PRIMARY KEY (id)
);

-- Permissions

ALTER TABLE panda.t_catalog_availability OWNER TO postgres;
GRANT ALL ON TABLE panda.t_catalog_availability TO postgres;


-- panda.t_catalog_category_property_type definition

-- Drop table

-- DROP TABLE panda.t_catalog_category_property_type;

CREATE TABLE  IF NOT EXISTS panda.t_catalog_category_property_type (
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"name" varchar(200) NOT NULL,
	is_lov bool NOT NULL DEFAULT false,
	description varchar(500) NULL,
	CONSTRAINT t_catalog_category_property_type_pk PRIMARY KEY (id)
);

-- Permissions

ALTER TABLE panda.t_catalog_category_property_type OWNER TO postgres;
GRANT ALL ON TABLE panda.t_catalog_category_property_type TO postgres;


-- panda.t_facility definition

-- Drop table

-- DROP TABLE panda.t_facility;

CREATE TABLE  IF NOT EXISTS panda.t_facility (
	id int4 NOT NULL,
	"name" int4 NOT NULL,
	description varchar(500) NULL,
	CONSTRAINT t_facility_pk PRIMARY KEY (id)
);

-- Permissions

ALTER TABLE panda.t_facility OWNER TO postgres;
GRANT ALL ON TABLE panda.t_facility TO postgres;


-- panda.t_item_condition definition

-- Drop table

-- DROP TABLE panda.t_item_condition;

CREATE TABLE  IF NOT EXISTS panda.t_item_condition (
	id int4 NOT NULL,
	"name" int4 NOT NULL,
	description varchar(500) NULL,
	CONSTRAINT t_item_condition_pk PRIMARY KEY (id)
);

-- Permissions

ALTER TABLE panda.t_item_condition OWNER TO postgres;
GRANT ALL ON TABLE panda.t_item_condition TO postgres;


-- panda.t_item_proucrement_status definition

-- Drop table

-- DROP TABLE panda.t_item_proucrement_status;

CREATE TABLE  IF NOT EXISTS panda.t_item_proucrement_status (
	id int4 NOT NULL,
	"name" int4 NOT NULL,
	description varchar(500) NULL,
	CONSTRAINT t_item_proucrement_status_pk PRIMARY KEY (id)
);

-- Permissions

ALTER TABLE panda.t_item_proucrement_status OWNER TO postgres;
GRANT ALL ON TABLE panda.t_item_proucrement_status TO postgres;


-- panda.t_item_serviceability definition

-- Drop table

-- DROP TABLE panda.t_item_serviceability;

CREATE TABLE  IF NOT EXISTS panda.t_item_serviceability (
	id int4 NOT NULL,
	"name" int4 NOT NULL,
	description varchar(500) NULL,
	CONSTRAINT t_item_serviceability_pk PRIMARY KEY (id)
);

-- Permissions

ALTER TABLE panda.t_item_serviceability OWNER TO postgres;
GRANT ALL ON TABLE panda.t_item_serviceability TO postgres;


-- panda.t_item_status definition

-- Drop table

-- DROP TABLE panda.t_item_status;

CREATE TABLE  IF NOT EXISTS panda.t_item_status (
	id int4 NOT NULL,
	"name" int4 NOT NULL,
	description varchar(500) NULL,
	CONSTRAINT t_item_status_pk PRIMARY KEY (id)
);

-- Permissions

ALTER TABLE panda.t_item_status OWNER TO postgres;
GRANT ALL ON TABLE panda.t_item_status TO postgres;


-- panda.t_location definition

-- Drop table

-- DROP TABLE panda.t_location;

CREATE TABLE  IF NOT EXISTS panda.t_location (
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"name" varchar(100) NOT NULL,
	description varchar(500) NULL,
	CONSTRAINT t_location_pk PRIMARY KEY (id)
);

-- Permissions

ALTER TABLE panda.t_location OWNER TO postgres;
GRANT ALL ON TABLE panda.t_location TO postgres;


-- panda.t_manufacturer definition

-- Drop table

-- DROP TABLE panda.t_manufacturer;

CREATE TABLE  IF NOT EXISTS panda.t_manufacturer (
	id int4 NOT NULL,
	"name" int4 NOT NULL,
	description varchar(500) NULL,
	CONSTRAINT t_manufacturer_pk PRIMARY KEY (id)
);

-- Permissions

ALTER TABLE panda.t_manufacturer OWNER TO postgres;
GRANT ALL ON TABLE panda.t_manufacturer TO postgres;


-- panda.t_security_role definition

-- Drop table

-- DROP TABLE panda.t_security_role;

CREATE TABLE  IF NOT EXISTS panda.t_security_role (
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"name" varchar(50) NOT NULL,
	code varchar(50) NOT NULL,
	description varchar(500) NOT NULL,
	CONSTRAINT t_security_role_pk PRIMARY KEY (id)
);

-- Permissions

ALTER TABLE panda.t_security_role OWNER TO postgres;
GRANT ALL ON TABLE panda.t_security_role TO postgres;


-- panda.t_security_team definition

-- Drop table

-- DROP TABLE panda.t_security_team;

CREATE TABLE  IF NOT EXISTS panda.t_security_team (
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"name" varchar(100) NOT NULL,
	description varchar(500) NULL,
	CONSTRAINT t_security_team_pk PRIMARY KEY (id)
);

-- Permissions

ALTER TABLE panda.t_security_team OWNER TO postgres;
GRANT ALL ON TABLE panda.t_security_team TO postgres;


-- panda.t_supplier definition

-- Drop table

-- DROP TABLE panda.t_supplier;

CREATE TABLE  IF NOT EXISTS panda.t_supplier (
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"name" varchar(200) NOT NULL,
	note text NULL,
	address varchar(500) NULL,
	CONSTRAINT t_supplier_pk PRIMARY KEY (id)
);

-- Permissions

ALTER TABLE panda.t_supplier OWNER TO postgres;
GRANT ALL ON TABLE panda.t_supplier TO postgres;


-- panda.t_system_relationship_type definition

-- Drop table

-- DROP TABLE panda.t_system_relationship_type;

CREATE TABLE  IF NOT EXISTS panda.t_system_relationship_type (
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"name" varchar(300) NOT NULL,
	description varchar(500) NULL,
	CONSTRAINT t_system_relationship_type_pk PRIMARY KEY (id)
);

-- Permissions

ALTER TABLE panda.t_system_relationship_type OWNER TO postgres;
GRANT ALL ON TABLE panda.t_system_relationship_type TO postgres;


-- panda.t_catalog_category definition

-- Drop table

-- DROP TABLE panda.t_catalog_category;

CREATE TABLE  IF NOT EXISTS panda.t_catalog_category (
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	id_parent int4 NULL,
	"name" varchar(200) NOT NULL,
	order_position int4 NOT NULL DEFAULT 0,
	code varchar(20) NOT NULL,
	image text NULL,
	CONSTRAINT t_catalog_category_pk PRIMARY KEY (id),
	CONSTRAINT t_catalog_category_fk FOREIGN KEY (id_parent) REFERENCES panda.t_catalog_category(id)
);

-- Permissions

ALTER TABLE panda.t_catalog_category OWNER TO postgres;
GRANT ALL ON TABLE panda.t_catalog_category TO postgres;


-- panda.t_catalog_category_property_group definition

-- Drop table

-- DROP TABLE panda.t_catalog_category_property_group;

CREATE TABLE  IF NOT EXISTS panda.t_catalog_category_property_group (
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"name" varchar(200) NOT NULL,
	id_category int4 NOT NULL,
	CONSTRAINT t_catalog_category_property_group_pk PRIMARY KEY (id),
	CONSTRAINT t_catalog_category_property_group_fk FOREIGN KEY (id_category) REFERENCES panda.t_catalog_category(id) ON DELETE CASCADE
);

-- Permissions

ALTER TABLE panda.t_catalog_category_property_group OWNER TO postgres;
GRANT ALL ON TABLE panda.t_catalog_category_property_group TO postgres;


-- panda.t_catalog_category_property_lov definition

-- Drop table

-- DROP TABLE panda.t_catalog_category_property_lov;

CREATE TABLE  IF NOT EXISTS panda.t_catalog_category_property_lov (
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"name" varchar(200) NOT NULL,
	id_property_type int4 NOT NULL,
	description varchar(500) NULL,
	CONSTRAINT t_catalog_category_property_lov_pk PRIMARY KEY (id),
	CONSTRAINT t_catalog_category_property_lov_fk FOREIGN KEY (id_property_type) REFERENCES panda.t_catalog_category_property_type(id)
);

-- Permissions

ALTER TABLE panda.t_catalog_category_property_lov OWNER TO postgres;
GRANT ALL ON TABLE panda.t_catalog_category_property_lov TO postgres;


-- panda.t_catalog_item definition

-- Drop table

-- DROP TABLE panda.t_catalog_item;

CREATE TABLE  IF NOT EXISTS panda.t_catalog_item (
	id int8 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"name" varchar(200) NOT NULL,
	id_category int4 NULL,
	estimated_price numeric(10, 2) NULL,
	note text NULL,
	image_main text NULL,
	id_availability int4 NULL,
	supported_to_date date NULL,
	typical_available_in_days int4 NULL,
	id_manufacturer int4 NULL,
	id_facility int4 NULL,
	CONSTRAINT t_catalog_item_pk PRIMARY KEY (id),
	CONSTRAINT t_catalog_item_ava_fk FOREIGN KEY (id_availability) REFERENCES panda.t_catalog_availability(id),
	CONSTRAINT t_catalog_item_category_fk FOREIGN KEY (id_category) REFERENCES panda.t_catalog_category(id),
	CONSTRAINT t_catalog_item_facility_fk FOREIGN KEY (id_facility) REFERENCES panda.t_facility(id),
	CONSTRAINT t_catalog_item_manufacturer_fk FOREIGN KEY (id_manufacturer) REFERENCES panda.t_manufacturer(id)
);

-- Permissions

ALTER TABLE panda.t_catalog_item OWNER TO postgres;
GRANT ALL ON TABLE panda.t_catalog_item TO postgres;


-- panda.t_item definition

-- Drop table

-- DROP TABLE panda.t_item;

CREATE TABLE  IF NOT EXISTS panda.t_item (
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	eun varchar(30) NOT NULL,
	id_item_status int4 NOT NULL,
	id_procurement_status int4 NOT NULL,
	id_condition int4 NOT NULL,
	id_serviceability int4 NULL,
	is_consumable bool NOT NULL DEFAULT false,
	delivery_date date NULL,
	id_supplier int4 NULL,
	warranty_expiry_date date NULL,
	delivery_notes text NULL,
	serial_number varchar(30) NULL,
	id_catalog_item int4 NULL,
	notes text NULL,
	id_facility int4 NULL,
	CONSTRAINT t_item_pk PRIMARY KEY (id),
	CONSTRAINT t_item_catalog_item_fk FOREIGN KEY (id_catalog_item) REFERENCES panda.t_catalog_item(id),
	CONSTRAINT t_item_condition_fk FOREIGN KEY (id_condition) REFERENCES panda.t_item_condition(id),
	CONSTRAINT t_item_procurement_fk FOREIGN KEY (id_procurement_status) REFERENCES panda.t_item_proucrement_status(id),
	CONSTRAINT t_item_serviceability_fk FOREIGN KEY (id_serviceability) REFERENCES panda.t_item_serviceability(id),
	CONSTRAINT t_item_status_fk FOREIGN KEY (id_item_status) REFERENCES panda.t_item_status(id),
	CONSTRAINT t_item_supplier_fk FOREIGN KEY (id_supplier) REFERENCES panda.t_supplier(id)
);

-- Permissions

ALTER TABLE panda.t_item OWNER TO postgres;
GRANT ALL ON TABLE panda.t_item TO postgres;


-- panda.t_item_documents definition

-- Drop table

-- DROP TABLE panda.t_item_documents;

CREATE TABLE  IF NOT EXISTS panda.t_item_documents (
	gid uuid NOT NULL,
	"name" varchar(300) NOT NULL,
	file_type varchar(50) NOT NULL,
	description varchar(500) NULL,
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	id_item int4 NOT NULL,
	document_data bytea NOT NULL,
	CONSTRAINT t_item_documents_pk PRIMARY KEY (id),
	CONSTRAINT t_item_documents_fk FOREIGN KEY (id_item) REFERENCES panda.t_item(id) ON DELETE CASCADE
);

-- Permissions

ALTER TABLE panda.t_item_documents OWNER TO postgres;
GRANT ALL ON TABLE panda.t_item_documents TO postgres;


-- panda.t_security_access_entity definition

-- Drop table

-- DROP TABLE panda.t_security_access_entity;

CREATE TABLE  IF NOT EXISTS panda.t_security_access_entity (
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"name" varchar(100) NOT NULL,
	id_parent int4 NULL,
	code varchar(100) NOT NULL,
	description varchar(500) NULL,
	CONSTRAINT t_security_access_entity_pk PRIMARY KEY (id),
	CONSTRAINT t_security_access_entity_fk FOREIGN KEY (id_parent) REFERENCES panda.t_security_access_entity(id) ON DELETE CASCADE
);

-- Permissions

ALTER TABLE panda.t_security_access_entity OWNER TO postgres;
GRANT ALL ON TABLE panda.t_security_access_entity TO postgres;


-- panda.t_security_user definition

-- Drop table

-- DROP TABLE panda.t_security_user;

CREATE TABLE  IF NOT EXISTS panda.t_security_user (
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	username varchar(200) NOT NULL,
	email varchar(200) NULL,
	password_hash varchar(100) NULL,
	password_salt varchar(100) NULL,
	first_name varchar(100) NULL,
	last_name varchar(100) NULL,
	id_facility int4 NULL,
	CONSTRAINT t_security_user_pk PRIMARY KEY (id),
	CONSTRAINT t_security_user_facility_fk FOREIGN KEY (id_facility) REFERENCES panda.t_facility(id)
);

-- Permissions

ALTER TABLE panda.t_security_user OWNER TO postgres;
GRANT ALL ON TABLE panda.t_security_user TO postgres;


-- panda.t_security_user_role definition

-- Drop table

-- DROP TABLE panda.t_security_user_role;

CREATE TABLE  IF NOT EXISTS panda.t_security_user_role (
	id_user int4 NOT NULL,
	id_role int4 NOT NULL,
	CONSTRAINT t_security_user_role_pk PRIMARY KEY (id_user, id_role),
	CONSTRAINT t_security_role_fk FOREIGN KEY (id_role) REFERENCES panda.t_security_role(id),
	CONSTRAINT t_security_user_fk FOREIGN KEY (id_user) REFERENCES panda.t_security_user(id)
);

-- Permissions

ALTER TABLE panda.t_security_user_role OWNER TO postgres;
GRANT ALL ON TABLE panda.t_security_user_role TO postgres;


-- panda.t_security_user_team definition

-- Drop table

-- DROP TABLE panda.t_security_user_team;

CREATE TABLE  IF NOT EXISTS panda.t_security_user_team (
	id_user int4 NOT NULL,
	id_team int4 NOT NULL,
	is_leader bool NOT NULL DEFAULT false,
	CONSTRAINT t_security_user_team_pk PRIMARY KEY (id_user, id_team),
	CONSTRAINT t_security_user_team_team_fk FOREIGN KEY (id_team) REFERENCES panda.t_security_team(id),
	CONSTRAINT t_security_user_team_user_fk FOREIGN KEY (id_user) REFERENCES panda.t_security_user(id)
);

-- Permissions

ALTER TABLE panda.t_security_user_team OWNER TO postgres;
GRANT ALL ON TABLE panda.t_security_user_team TO postgres;


-- panda.t_system definition

-- Drop table

-- DROP TABLE panda.t_system;

CREATE TABLE  IF NOT EXISTS panda.t_system (
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"name" varchar(300) NOT NULL,
	description text NULL,
	id_responsible_team int4 NULL,
	id_maintaned_team int4 NULL,
	id_location int4 NULL,
	tags varchar(300) NULL,
	id_facility int4 NOT NULL,
	CONSTRAINT t_system_pk PRIMARY KEY (id),
	CONSTRAINT t_system_facility_fk FOREIGN KEY (id_facility) REFERENCES panda.t_facility(id),
	CONSTRAINT t_system_location_fk FOREIGN KEY (id_location) REFERENCES panda.t_location(id),
	CONSTRAINT t_system_maint_fk FOREIGN KEY (id_maintaned_team) REFERENCES panda.t_security_team(id),
	CONSTRAINT t_system_respo_fk FOREIGN KEY (id_responsible_team) REFERENCES panda.t_security_team(id)
);

-- Permissions

ALTER TABLE panda.t_system OWNER TO postgres;
GRANT ALL ON TABLE panda.t_system TO postgres;


-- panda.t_system_item definition

-- Drop table

-- DROP TABLE panda.t_system_item;

CREATE TABLE  IF NOT EXISTS panda.t_system_item (
	id_system int4 NOT NULL,
	id_item int4 NOT NULL,
	CONSTRAINT t_system_item_pk PRIMARY KEY (id_system, id_item),
	CONSTRAINT t_system_item_item_fk FOREIGN KEY (id_item) REFERENCES panda.t_item(id),
	CONSTRAINT t_system_item_system_fk FOREIGN KEY (id_system) REFERENCES panda.t_system(id)
);

-- Permissions

ALTER TABLE panda.t_system_item OWNER TO postgres;
GRANT ALL ON TABLE panda.t_system_item TO postgres;


-- panda.t_system_relationship definition

-- Drop table

-- DROP TABLE panda.t_system_relationship;

CREATE TABLE  IF NOT EXISTS panda.t_system_relationship (
	id_system_from int4 NOT NULL,
	id_system_to int4 NOT NULL,
	id_relationship_type int4 NOT NULL,
	CONSTRAINT t_system_relationship_pk PRIMARY KEY (id_system_from, id_system_to, id_relationship_type),
	CONSTRAINT t_system_relationship_from_fk FOREIGN KEY (id_system_from) REFERENCES panda.t_system(id),
	CONSTRAINT t_system_relationship_to_fk FOREIGN KEY (id_system_to) REFERENCES panda.t_system(id),
	CONSTRAINT t_system_relationship_type_fk FOREIGN KEY (id_relationship_type) REFERENCES panda.t_system_relationship_type(id)
);

-- Permissions

ALTER TABLE panda.t_system_relationship OWNER TO postgres;
GRANT ALL ON TABLE panda.t_system_relationship TO postgres;


-- panda.t_catalog_category_property definition

-- Drop table

-- DROP TABLE panda.t_catalog_category_property;

CREATE TABLE  IF NOT EXISTS panda.t_catalog_category_property (
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"name" varchar(200) NOT NULL,
	position_column int4 NOT NULL DEFAULT 0,
	position_row int4 NOT NULL DEFAULT 0,
	id_group int4 NOT NULL,
	id_property_type int4 NOT NULL,
	position_column_span int4 NOT NULL DEFAULT 1,
	position_row_span int4 NOT NULL DEFAULT 1,
	CONSTRAINT t_catalog_category_property_pk PRIMARY KEY (id),
	CONSTRAINT t_catalog_category_property_group_fk FOREIGN KEY (id_group) REFERENCES panda.t_catalog_category_property_group(id) ON DELETE CASCADE,
	CONSTRAINT t_catalog_category_property_type_fk FOREIGN KEY (id_property_type) REFERENCES panda.t_catalog_category_property_type(id)
);

-- Permissions

ALTER TABLE panda.t_catalog_category_property OWNER TO postgres;
GRANT ALL ON TABLE panda.t_catalog_category_property TO postgres;


-- panda.t_catalog_documents definition

-- Drop table

-- DROP TABLE panda.t_catalog_documents;

CREATE TABLE  IF NOT EXISTS panda.t_catalog_documents (
	gid uuid NOT NULL,
	"name" varchar(300) NOT NULL,
	file_type varchar(50) NOT NULL,
	description varchar(500) NULL,
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	id_catalog_item int4 NOT NULL,
	document_data bytea NOT NULL,
	CONSTRAINT t_catalog_documents_pk PRIMARY KEY (id),
	CONSTRAINT t_catalog_documents_fk FOREIGN KEY (id_catalog_item) REFERENCES panda.t_catalog_item(id) ON DELETE CASCADE
);

-- Permissions

ALTER TABLE panda.t_catalog_documents OWNER TO postgres;
GRANT ALL ON TABLE panda.t_catalog_documents TO postgres;


-- panda.t_catalog_item_property_value definition

-- Drop table

-- DROP TABLE panda.t_catalog_item_property_value;

CREATE TABLE  IF NOT EXISTS panda.t_catalog_item_property_value (
	id_item int4 NOT NULL,
	id_property int4 NOT NULL,
	value jsonb NULL,
	CONSTRAINT t_catalog_item_property_value_pk PRIMARY KEY (id_item, id_property),
	CONSTRAINT t_catalog_item_property_value__property_fk FOREIGN KEY (id_property) REFERENCES panda.t_catalog_category_property(id),
	CONSTRAINT t_catalog_item_property_value_item_fk FOREIGN KEY (id_item) REFERENCES panda.t_catalog_item(id)
);

-- Permissions

ALTER TABLE panda.t_catalog_item_property_value OWNER TO postgres;
GRANT ALL ON TABLE panda.t_catalog_item_property_value TO postgres;


-- panda.t_security_access definition

-- Drop table

-- DROP TABLE panda.t_security_access;

CREATE TABLE  IF NOT EXISTS panda.t_security_access (
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	id_role int4 NOT NULL,
	id_entity int4 NOT NULL,
	can_view bool NOT NULL DEFAULT false,
	can_create bool NOT NULL DEFAULT false,
	can_edit bool NOT NULL DEFAULT false,
	can_delete bool NOT NULL DEFAULT false,
	CONSTRAINT t_security_access_pk PRIMARY KEY (id),
	CONSTRAINT t_security_access_entity_fk FOREIGN KEY (id_entity) REFERENCES panda.t_security_access_entity(id),
	CONSTRAINT t_security_access_role_fk FOREIGN KEY (id_role) REFERENCES panda.t_security_role(id)
);

-- Permissions

ALTER TABLE panda.t_security_access OWNER TO postgres;
GRANT ALL ON TABLE panda.t_security_access TO postgres;


-- Permissions

GRANT ALL ON SCHEMA panda TO postgres;

-- Now we try to add some test data to the t_security_team table:

INSERT INTO panda.t_security_team
("name", "description")
SELECT 'PANDA', 'PANDA development team'
WHERE NOT EXISTS(SELECT 1 FROM panda.t_security_team WHERE "name" = 'PANDA');


--add default facilities ELI-ALPS, ELI-BEAMLINES, ELI-NP
--one little fix
ALTER TABLE panda.t_facility ALTER COLUMN "name" TYPE varchar(50) USING "name"::varchar;

INSERT INTO panda.t_facility (id , "name", description) select 1, 'ELI-ALPS', 'Extreme Light Infrastructure Attosecond Light Pulse Source' WHERE NOT EXISTS(SELECT 1 FROM panda.t_facility WHERE "name" = 'ELI-ALPS');
INSERT INTO panda.t_facility (id , "name", description) select 2, 'ELI-BEAMLINES', 'Extreme Light Infrastructure Beamlines' WHERE NOT EXISTS(SELECT 1 FROM panda.t_facility WHERE "name" = 'ELI-BEAMLINES');
INSERT INTO panda.t_facility (id , "name", description) select 3, 'ELI-NP', 'Extreme Light Infrastructure Nuclear Physics' WHERE NOT EXISTS(SELECT 1 FROM panda.t_facility WHERE "name" = 'ELI-NP');


--add is_enabled to the user table
ALTER TABLE panda.t_security_user add if not exists is_enabled bool NOT NULL DEFAULT false;
--add test admin user and admin role - pwd elipanda2022
INSERT INTO panda.t_security_user (username, email, password_hash,first_name,last_name,is_enabled) select 'admin', 'admin@eli', '$2b$12$X8TY4Sx5hcJGJCrIhUo0.OyNx6PYbkX90BWKwDsr9fhq.XDW0m5.m', 'Admin', 'Administrator', true WHERE NOT EXISTS(SELECT 1 FROM panda.t_security_user WHERE username = 'admin');


ALTER TABLE panda.t_facility DROP COLUMN if exists is_enabled;

--fix some mistakes in the base schema
ALTER TABLE panda.t_manufacturer ALTER COLUMN "name" TYPE varchar(50) USING "name"::varchar;

DO
$$
BEGIN
  IF NOT EXISTS (SELECT * FROM information_schema.columns WHERE table_schema = 'panda' AND table_name = 't_manufacturer' AND column_name = 'id' AND is_identity = 'YES') THEN
     ALTER TABLE panda.t_manufacturer ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY;
  END IF;
END;
$$
LANGUAGE plpgsql;

--function to get the catalog items and paging
DROP FUNCTION IF EXISTS panda.f_get_catalog_items_paged(int4,int4,varchar,int4);

CREATE OR REPLACE FUNCTION panda.f_get_catalog_items_paged(page_size integer DEFAULT 20, page_num integer DEFAULT 0, search_pattern character varying DEFAULT NULL::character varying, orderby_name integer DEFAULT 0)
 RETURNS TABLE("ID" int8, 
 "Name" character varying,
 "Category" character varying, 
 "Manufacturer" character varying,
 "Availability" character varying, 
 "Facility" character varying, 
 "EstimatedPrice" NUMERIC(10,2), 
 "Note" text,
 "TypicalAvailableInDays" integer, 
 "SupportedToDate" date)
 LANGUAGE plpgsql
AS $function$
begin
	return query 
		SELECT tci.id, tci."name" , tcc."name" AS category, tm."name" AS manufacturer, tca."name" AS availability, tf."name" AS facility,estimated_price ,note, typical_available_in_days, supported_to_date
		FROM panda.t_catalog_item tci 
		LEFT JOIN panda.t_catalog_category tcc ON tci.id_category =tcc.id
		LEFT JOIN panda.t_manufacturer tm ON tci.id_manufacturer = tm.id 
		LEFT JOIN panda.t_catalog_availability tca ON tci.id_availability = tca.id 
		LEFT JOIN panda.t_facility tf ON tci.id_facility = tf.id  		
		WHERE 			
		(search_pattern IS NULL OR tci."name" ILIKE search_pattern)
		ORDER BY 
		CASE WHEN orderby_name = 1 THEN tci."name" END, 
		CASE WHEN orderby_name = 2 THEN tci."name" END DESC, 
		tci."id" ASC 

		LIMIT page_size
		OFFSET page_num * page_size;
		
end; $function$
;

-- Permissions for f_get_catalog_items_paged

ALTER FUNCTION panda.f_get_catalog_items_paged(int4,int4,varchar,int4) OWNER TO postgres;
GRANT ALL ON FUNCTION panda.f_get_catalog_items_paged(int4,int4,varchar,int4) TO postgres;

--we also need a function to count total items for the function above
DROP FUNCTION IF EXISTS panda.f_get_catalog_items_count(varchar);

CREATE OR REPLACE FUNCTION panda.f_get_catalog_items_count(search_pattern character varying DEFAULT NULL::character varying)
 RETURNS TABLE("Count" int8)
 LANGUAGE plpgsql
AS $function$
begin
	return query 
		SELECT count(*)
		FROM panda.t_catalog_item tci 
		LEFT JOIN panda.t_catalog_category tcc ON tci.id_category =tcc.id
		LEFT JOIN panda.t_manufacturer tm ON tci.id_manufacturer = tm.id 
		LEFT JOIN panda.t_catalog_availability tca ON tci.id_availability = tca.id 
		LEFT JOIN panda.t_facility tf ON tci.id_facility = tf.id  		
		WHERE 			
		(search_pattern IS NULL OR tci."name" ILIKE search_pattern)
		;
		
end; $function$
;

-- Permissions for f_get_catalog_items_count

ALTER FUNCTION panda.f_get_catalog_items_count(varchar) OWNER TO postgres;
GRANT ALL ON FUNCTION panda.f_get_catalog_items_count(varchar) TO postgres;


--return type changed so we have to re-create the this function to ge catalog items
DROP FUNCTION IF EXISTS panda.f_get_catalog_items_paged(int4,int4,varchar,int4);

CREATE OR REPLACE FUNCTION panda.f_get_catalog_items_paged(page_size integer DEFAULT 20, page_num integer DEFAULT 0, search_pattern character varying DEFAULT NULL::character varying, orderby_name integer DEFAULT 0)
 RETURNS TABLE("ID" int8, 
 "Name" character varying,
 "Category" character varying, 
 "Manufacturer" character varying,
 "Availability" character varying, 
 "Facility" character varying, 
 "EstimatedPrice" NUMERIC(10,2), 
 "Note" text,
 "TypicalAvailableInDays" integer, 
 "SupportedToDate" date,
 "Image" text)
 LANGUAGE plpgsql
AS $function$
begin
	return query 
		SELECT tci.id, tci."name" , tcc."name" AS category, tm."name" AS manufacturer, tca."name" AS availability, tf."name" AS facility,estimated_price ,note, typical_available_in_days, supported_to_date, image_main
		FROM panda.t_catalog_item tci 
		LEFT JOIN panda.t_catalog_category tcc ON tci.id_category =tcc.id
		LEFT JOIN panda.t_manufacturer tm ON tci.id_manufacturer = tm.id 
		LEFT JOIN panda.t_catalog_availability tca ON tci.id_availability = tca.id 
		LEFT JOIN panda.t_facility tf ON tci.id_facility = tf.id  		
		WHERE 			
		(search_pattern IS NULL OR tci."name" ILIKE search_pattern)
		ORDER BY 
		CASE WHEN orderby_name = 1 THEN tci."name" END, 
		CASE WHEN orderby_name = 2 THEN tci."name" END DESC, 
		tci."id" ASC 

		LIMIT page_size
		OFFSET page_num * page_size;
		
end; $function$
;

-- Permissions for f_get_catalog_items_paged

ALTER FUNCTION panda.f_get_catalog_items_paged(int4,int4,varchar,int4) OWNER TO postgres;
GRANT ALL ON FUNCTION panda.f_get_catalog_items_paged(int4,int4,varchar,int4) TO postgres;

-- add order to catalog item prop group
ALTER TABLE panda.t_catalog_category_property_group ADD IF NOT EXISTS order_position int4 NOT NULL DEFAULT 0;


--add units table for catalogue
CREATE TABLE IF NOT EXISTS  panda.t_catalog_category_property_unit (
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"name" varchar(50) NOT NULL,
	description varchar(200) NULL,
	CONSTRAINT t_catalog_category_property_unit_pk PRIMARY KEY (id),
	CONSTRAINT t_catalog_category_property_unit_un UNIQUE (name)
);

-- Permissions
ALTER TABLE panda.t_catalog_category_property_unit OWNER TO postgres;
GRANT ALL ON TABLE panda.t_catalog_category_property_unit TO postgres;


ALTER TABLE panda.t_catalog_category_property ADD IF NOT EXISTS id_unit int4 NULL;
ALTER TABLE panda.t_catalog_category_property ADD IF NOT EXISTS default_value jsonb NULL;

DO
$$
BEGIN
  IF NOT EXISTS (SELECT * FROM information_schema.table_constraints tc WHERE table_schema = 'panda' AND table_name = 't_catalog_category_property' AND  constraint_type = 'FOREIGN KEY' AND constraint_name = 't_catalog_category_property_unit_fk') THEN
     ALTER TABLE panda.t_catalog_category_property ADD CONSTRAINT t_catalog_category_property_unit_fk FOREIGN KEY (id_unit) REFERENCES panda.t_catalog_category_property_unit(id);
  END IF;
END;
$$
LANGUAGE plpgsql;