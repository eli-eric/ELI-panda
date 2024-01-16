/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A BigInt value up to 64 bits in size, which can be a number or a string if used inline, or a string only if used as a variable. Always returned as a string. */
  BigInt: { input: any; output: any; }
  /** A date, represented as a 'yyyy-mm-dd' string */
  Date: { input: any; output: any; }
};

export type BigIntAggregateSelectionNonNullable = {
  __typename?: 'BigIntAggregateSelectionNonNullable';
  average: Scalars['BigInt']['output'];
  max: Scalars['BigInt']['output'];
  min: Scalars['BigInt']['output'];
  sum: Scalars['BigInt']['output'];
};

export type CatalogueCategoriesConnection = {
  __typename?: 'CatalogueCategoriesConnection';
  edges: Array<CatalogueCategoryEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type CatalogueCategory = {
  __typename?: 'CatalogueCategory';
  catalogueCategoriesHasSubcategory: Array<CatalogueCategory>;
  catalogueCategoriesHasSubcategoryAggregate?: Maybe<CatalogueCategoryCatalogueCategoryCatalogueCategoriesHasSubcategoryAggregationSelection>;
  catalogueCategoriesHasSubcategoryConnection: CatalogueCategoryCatalogueCategoriesHasSubcategoryConnection;
  catalogueItemsBelongsToCategory: Array<CatalogueItem>;
  catalogueItemsBelongsToCategoryAggregate?: Maybe<CatalogueCategoryCatalogueItemCatalogueItemsBelongsToCategoryAggregationSelection>;
  catalogueItemsBelongsToCategoryConnection: CatalogueCategoryCatalogueItemsBelongsToCategoryConnection;
  code: Scalars['String']['output'];
  hasGroupCatalogueCategoryPropertyGroups: Array<CatalogueCategoryPropertyGroup>;
  hasGroupCatalogueCategoryPropertyGroupsAggregate?: Maybe<CatalogueCategoryCatalogueCategoryPropertyGroupHasGroupCatalogueCategoryPropertyGroupsAggregationSelection>;
  hasGroupCatalogueCategoryPropertyGroupsConnection: CatalogueCategoryHasGroupCatalogueCategoryPropertyGroupsConnection;
  hasSubcategoryCatalogueCategories: Array<CatalogueCategory>;
  hasSubcategoryCatalogueCategoriesAggregate?: Maybe<CatalogueCategoryCatalogueCategoryHasSubcategoryCatalogueCategoriesAggregationSelection>;
  hasSubcategoryCatalogueCategoriesConnection: CatalogueCategoryHasSubcategoryCatalogueCategoriesConnection;
  name: Scalars['String']['output'];
  parentCategory?: Maybe<CatalogueCategory>;
  parentCategoryAggregate?: Maybe<CatalogueCategoryCatalogueCategoryParentCategoryAggregationSelection>;
  parentCategoryConnection: CatalogueCategoryParentCategoryConnection;
  parentPath: Array<Maybe<ParentPathItem>>;
  systemType?: Maybe<SystemType>;
  systemTypeAggregate?: Maybe<CatalogueCategorySystemTypeSystemTypeAggregationSelection>;
  systemTypeConnection: CatalogueCategorySystemTypeConnection;
  uid: Scalars['ID']['output'];
};


export type CatalogueCategoryCatalogueCategoriesHasSubcategoryArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<CatalogueCategoryOptions>;
  where?: InputMaybe<CatalogueCategoryWhere>;
};


export type CatalogueCategoryCatalogueCategoriesHasSubcategoryAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<CatalogueCategoryWhere>;
};


export type CatalogueCategoryCatalogueCategoriesHasSubcategoryConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<CatalogueCategoryCatalogueCategoriesHasSubcategoryConnectionSort>>;
  where?: InputMaybe<CatalogueCategoryCatalogueCategoriesHasSubcategoryConnectionWhere>;
};


export type CatalogueCategoryCatalogueItemsBelongsToCategoryArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<CatalogueItemOptions>;
  where?: InputMaybe<CatalogueItemWhere>;
};


export type CatalogueCategoryCatalogueItemsBelongsToCategoryAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<CatalogueItemWhere>;
};


export type CatalogueCategoryCatalogueItemsBelongsToCategoryConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<CatalogueCategoryCatalogueItemsBelongsToCategoryConnectionSort>>;
  where?: InputMaybe<CatalogueCategoryCatalogueItemsBelongsToCategoryConnectionWhere>;
};


export type CatalogueCategoryHasGroupCatalogueCategoryPropertyGroupsArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<CatalogueCategoryPropertyGroupOptions>;
  where?: InputMaybe<CatalogueCategoryPropertyGroupWhere>;
};


export type CatalogueCategoryHasGroupCatalogueCategoryPropertyGroupsAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<CatalogueCategoryPropertyGroupWhere>;
};


export type CatalogueCategoryHasGroupCatalogueCategoryPropertyGroupsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<CatalogueCategoryHasGroupCatalogueCategoryPropertyGroupsConnectionSort>>;
  where?: InputMaybe<CatalogueCategoryHasGroupCatalogueCategoryPropertyGroupsConnectionWhere>;
};


export type CatalogueCategoryHasSubcategoryCatalogueCategoriesArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<CatalogueCategoryOptions>;
  where?: InputMaybe<CatalogueCategoryWhere>;
};


export type CatalogueCategoryHasSubcategoryCatalogueCategoriesAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<CatalogueCategoryWhere>;
};


export type CatalogueCategoryHasSubcategoryCatalogueCategoriesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<CatalogueCategoryHasSubcategoryCatalogueCategoriesConnectionSort>>;
  where?: InputMaybe<CatalogueCategoryHasSubcategoryCatalogueCategoriesConnectionWhere>;
};


export type CatalogueCategoryParentCategoryArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<CatalogueCategoryOptions>;
  where?: InputMaybe<CatalogueCategoryWhere>;
};


export type CatalogueCategoryParentCategoryAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<CatalogueCategoryWhere>;
};


export type CatalogueCategoryParentCategoryConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<CatalogueCategoryParentCategoryConnectionSort>>;
  where?: InputMaybe<CatalogueCategoryParentCategoryConnectionWhere>;
};


export type CatalogueCategorySystemTypeArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<SystemTypeOptions>;
  where?: InputMaybe<SystemTypeWhere>;
};


export type CatalogueCategorySystemTypeAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<SystemTypeWhere>;
};


export type CatalogueCategorySystemTypeConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<CatalogueCategorySystemTypeConnectionSort>>;
  where?: InputMaybe<CatalogueCategorySystemTypeConnectionWhere>;
};

export type CatalogueCategoryAggregateSelection = {
  __typename?: 'CatalogueCategoryAggregateSelection';
  code: StringAggregateSelectionNonNullable;
  count: Scalars['Int']['output'];
  name: StringAggregateSelectionNonNullable;
  uid: IdAggregateSelectionNonNullable;
};

export type CatalogueCategoryCatalogueCategoriesHasSubcategoryAggregateInput = {
  AND?: InputMaybe<Array<CatalogueCategoryCatalogueCategoriesHasSubcategoryAggregateInput>>;
  NOT?: InputMaybe<CatalogueCategoryCatalogueCategoriesHasSubcategoryAggregateInput>;
  OR?: InputMaybe<Array<CatalogueCategoryCatalogueCategoriesHasSubcategoryAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<CatalogueCategoryCatalogueCategoriesHasSubcategoryNodeAggregationWhereInput>;
};

export type CatalogueCategoryCatalogueCategoriesHasSubcategoryConnectFieldInput = {
  connect?: InputMaybe<Array<CatalogueCategoryConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<CatalogueCategoryConnectWhere>;
};

export type CatalogueCategoryCatalogueCategoriesHasSubcategoryConnection = {
  __typename?: 'CatalogueCategoryCatalogueCategoriesHasSubcategoryConnection';
  edges: Array<CatalogueCategoryCatalogueCategoriesHasSubcategoryRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type CatalogueCategoryCatalogueCategoriesHasSubcategoryConnectionSort = {
  node?: InputMaybe<CatalogueCategorySort>;
};

export type CatalogueCategoryCatalogueCategoriesHasSubcategoryConnectionWhere = {
  AND?: InputMaybe<Array<CatalogueCategoryCatalogueCategoriesHasSubcategoryConnectionWhere>>;
  NOT?: InputMaybe<CatalogueCategoryCatalogueCategoriesHasSubcategoryConnectionWhere>;
  OR?: InputMaybe<Array<CatalogueCategoryCatalogueCategoriesHasSubcategoryConnectionWhere>>;
  node?: InputMaybe<CatalogueCategoryWhere>;
};

export type CatalogueCategoryCatalogueCategoriesHasSubcategoryCreateFieldInput = {
  node: CatalogueCategoryCreateInput;
};

export type CatalogueCategoryCatalogueCategoriesHasSubcategoryDeleteFieldInput = {
  delete?: InputMaybe<CatalogueCategoryDeleteInput>;
  where?: InputMaybe<CatalogueCategoryCatalogueCategoriesHasSubcategoryConnectionWhere>;
};

export type CatalogueCategoryCatalogueCategoriesHasSubcategoryDisconnectFieldInput = {
  disconnect?: InputMaybe<CatalogueCategoryDisconnectInput>;
  where?: InputMaybe<CatalogueCategoryCatalogueCategoriesHasSubcategoryConnectionWhere>;
};

export type CatalogueCategoryCatalogueCategoriesHasSubcategoryFieldInput = {
  connect?: InputMaybe<Array<CatalogueCategoryCatalogueCategoriesHasSubcategoryConnectFieldInput>>;
  create?: InputMaybe<Array<CatalogueCategoryCatalogueCategoriesHasSubcategoryCreateFieldInput>>;
};

export type CatalogueCategoryCatalogueCategoriesHasSubcategoryNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<CatalogueCategoryCatalogueCategoriesHasSubcategoryNodeAggregationWhereInput>>;
  NOT?: InputMaybe<CatalogueCategoryCatalogueCategoriesHasSubcategoryNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<CatalogueCategoryCatalogueCategoriesHasSubcategoryNodeAggregationWhereInput>>;
  code_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  code_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type CatalogueCategoryCatalogueCategoriesHasSubcategoryRelationship = {
  __typename?: 'CatalogueCategoryCatalogueCategoriesHasSubcategoryRelationship';
  cursor: Scalars['String']['output'];
  node: CatalogueCategory;
};

export type CatalogueCategoryCatalogueCategoriesHasSubcategoryUpdateConnectionInput = {
  node?: InputMaybe<CatalogueCategoryUpdateInput>;
};

export type CatalogueCategoryCatalogueCategoriesHasSubcategoryUpdateFieldInput = {
  connect?: InputMaybe<Array<CatalogueCategoryCatalogueCategoriesHasSubcategoryConnectFieldInput>>;
  create?: InputMaybe<Array<CatalogueCategoryCatalogueCategoriesHasSubcategoryCreateFieldInput>>;
  delete?: InputMaybe<Array<CatalogueCategoryCatalogueCategoriesHasSubcategoryDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<CatalogueCategoryCatalogueCategoriesHasSubcategoryDisconnectFieldInput>>;
  update?: InputMaybe<CatalogueCategoryCatalogueCategoriesHasSubcategoryUpdateConnectionInput>;
  where?: InputMaybe<CatalogueCategoryCatalogueCategoriesHasSubcategoryConnectionWhere>;
};

export type CatalogueCategoryCatalogueCategoryCatalogueCategoriesHasSubcategoryAggregationSelection = {
  __typename?: 'CatalogueCategoryCatalogueCategoryCatalogueCategoriesHasSubcategoryAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<CatalogueCategoryCatalogueCategoryCatalogueCategoriesHasSubcategoryNodeAggregateSelection>;
};

export type CatalogueCategoryCatalogueCategoryCatalogueCategoriesHasSubcategoryNodeAggregateSelection = {
  __typename?: 'CatalogueCategoryCatalogueCategoryCatalogueCategoriesHasSubcategoryNodeAggregateSelection';
  code: StringAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  uid: IdAggregateSelectionNonNullable;
};

export type CatalogueCategoryCatalogueCategoryHasSubcategoryCatalogueCategoriesAggregationSelection = {
  __typename?: 'CatalogueCategoryCatalogueCategoryHasSubcategoryCatalogueCategoriesAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<CatalogueCategoryCatalogueCategoryHasSubcategoryCatalogueCategoriesNodeAggregateSelection>;
};

export type CatalogueCategoryCatalogueCategoryHasSubcategoryCatalogueCategoriesNodeAggregateSelection = {
  __typename?: 'CatalogueCategoryCatalogueCategoryHasSubcategoryCatalogueCategoriesNodeAggregateSelection';
  code: StringAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  uid: IdAggregateSelectionNonNullable;
};

export type CatalogueCategoryCatalogueCategoryParentCategoryAggregationSelection = {
  __typename?: 'CatalogueCategoryCatalogueCategoryParentCategoryAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<CatalogueCategoryCatalogueCategoryParentCategoryNodeAggregateSelection>;
};

export type CatalogueCategoryCatalogueCategoryParentCategoryNodeAggregateSelection = {
  __typename?: 'CatalogueCategoryCatalogueCategoryParentCategoryNodeAggregateSelection';
  code: StringAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  uid: IdAggregateSelectionNonNullable;
};

export type CatalogueCategoryCatalogueCategoryPropertyGroupHasGroupCatalogueCategoryPropertyGroupsAggregationSelection = {
  __typename?: 'CatalogueCategoryCatalogueCategoryPropertyGroupHasGroupCatalogueCategoryPropertyGroupsAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<CatalogueCategoryCatalogueCategoryPropertyGroupHasGroupCatalogueCategoryPropertyGroupsNodeAggregateSelection>;
};

export type CatalogueCategoryCatalogueCategoryPropertyGroupHasGroupCatalogueCategoryPropertyGroupsNodeAggregateSelection = {
  __typename?: 'CatalogueCategoryCatalogueCategoryPropertyGroupHasGroupCatalogueCategoryPropertyGroupsNodeAggregateSelection';
  name: StringAggregateSelectionNonNullable;
  uid: StringAggregateSelectionNonNullable;
};

export type CatalogueCategoryCatalogueItemCatalogueItemsBelongsToCategoryAggregationSelection = {
  __typename?: 'CatalogueCategoryCatalogueItemCatalogueItemsBelongsToCategoryAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<CatalogueCategoryCatalogueItemCatalogueItemsBelongsToCategoryNodeAggregateSelection>;
};

export type CatalogueCategoryCatalogueItemCatalogueItemsBelongsToCategoryNodeAggregateSelection = {
  __typename?: 'CatalogueCategoryCatalogueItemCatalogueItemsBelongsToCategoryNodeAggregateSelection';
  catalogueNumber: StringAggregateSelectionNonNullable;
  description: StringAggregateSelectionNullable;
  manufacturerUrl: StringAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  uid: StringAggregateSelectionNonNullable;
};

export type CatalogueCategoryCatalogueItemsBelongsToCategoryAggregateInput = {
  AND?: InputMaybe<Array<CatalogueCategoryCatalogueItemsBelongsToCategoryAggregateInput>>;
  NOT?: InputMaybe<CatalogueCategoryCatalogueItemsBelongsToCategoryAggregateInput>;
  OR?: InputMaybe<Array<CatalogueCategoryCatalogueItemsBelongsToCategoryAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<CatalogueCategoryCatalogueItemsBelongsToCategoryNodeAggregationWhereInput>;
};

export type CatalogueCategoryCatalogueItemsBelongsToCategoryConnectFieldInput = {
  connect?: InputMaybe<Array<CatalogueItemConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<CatalogueItemConnectWhere>;
};

export type CatalogueCategoryCatalogueItemsBelongsToCategoryConnection = {
  __typename?: 'CatalogueCategoryCatalogueItemsBelongsToCategoryConnection';
  edges: Array<CatalogueCategoryCatalogueItemsBelongsToCategoryRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type CatalogueCategoryCatalogueItemsBelongsToCategoryConnectionSort = {
  node?: InputMaybe<CatalogueItemSort>;
};

export type CatalogueCategoryCatalogueItemsBelongsToCategoryConnectionWhere = {
  AND?: InputMaybe<Array<CatalogueCategoryCatalogueItemsBelongsToCategoryConnectionWhere>>;
  NOT?: InputMaybe<CatalogueCategoryCatalogueItemsBelongsToCategoryConnectionWhere>;
  OR?: InputMaybe<Array<CatalogueCategoryCatalogueItemsBelongsToCategoryConnectionWhere>>;
  node?: InputMaybe<CatalogueItemWhere>;
};

export type CatalogueCategoryCatalogueItemsBelongsToCategoryCreateFieldInput = {
  node: CatalogueItemCreateInput;
};

export type CatalogueCategoryCatalogueItemsBelongsToCategoryDeleteFieldInput = {
  delete?: InputMaybe<CatalogueItemDeleteInput>;
  where?: InputMaybe<CatalogueCategoryCatalogueItemsBelongsToCategoryConnectionWhere>;
};

export type CatalogueCategoryCatalogueItemsBelongsToCategoryDisconnectFieldInput = {
  disconnect?: InputMaybe<CatalogueItemDisconnectInput>;
  where?: InputMaybe<CatalogueCategoryCatalogueItemsBelongsToCategoryConnectionWhere>;
};

export type CatalogueCategoryCatalogueItemsBelongsToCategoryFieldInput = {
  connect?: InputMaybe<Array<CatalogueCategoryCatalogueItemsBelongsToCategoryConnectFieldInput>>;
  create?: InputMaybe<Array<CatalogueCategoryCatalogueItemsBelongsToCategoryCreateFieldInput>>;
};

export type CatalogueCategoryCatalogueItemsBelongsToCategoryNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<CatalogueCategoryCatalogueItemsBelongsToCategoryNodeAggregationWhereInput>>;
  NOT?: InputMaybe<CatalogueCategoryCatalogueItemsBelongsToCategoryNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<CatalogueCategoryCatalogueItemsBelongsToCategoryNodeAggregationWhereInput>>;
  catalogueNumber_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  catalogueNumber_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  catalogueNumber_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  catalogueNumber_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  catalogueNumber_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  catalogueNumber_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  catalogueNumber_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  catalogueNumber_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  catalogueNumber_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  catalogueNumber_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  catalogueNumber_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  catalogueNumber_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  catalogueNumber_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  catalogueNumber_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  catalogueNumber_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  description_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  description_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  description_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  description_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  description_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  description_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  description_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  description_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  description_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  description_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  manufacturerUrl_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  manufacturerUrl_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  manufacturerUrl_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  manufacturerUrl_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  manufacturerUrl_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  manufacturerUrl_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  manufacturerUrl_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  manufacturerUrl_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  manufacturerUrl_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  manufacturerUrl_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  manufacturerUrl_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  manufacturerUrl_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  manufacturerUrl_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  manufacturerUrl_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  manufacturerUrl_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  uid_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  uid_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  uid_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  uid_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  uid_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  uid_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  uid_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  uid_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  uid_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  uid_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type CatalogueCategoryCatalogueItemsBelongsToCategoryRelationship = {
  __typename?: 'CatalogueCategoryCatalogueItemsBelongsToCategoryRelationship';
  cursor: Scalars['String']['output'];
  node: CatalogueItem;
};

export type CatalogueCategoryCatalogueItemsBelongsToCategoryUpdateConnectionInput = {
  node?: InputMaybe<CatalogueItemUpdateInput>;
};

export type CatalogueCategoryCatalogueItemsBelongsToCategoryUpdateFieldInput = {
  connect?: InputMaybe<Array<CatalogueCategoryCatalogueItemsBelongsToCategoryConnectFieldInput>>;
  create?: InputMaybe<Array<CatalogueCategoryCatalogueItemsBelongsToCategoryCreateFieldInput>>;
  delete?: InputMaybe<Array<CatalogueCategoryCatalogueItemsBelongsToCategoryDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<CatalogueCategoryCatalogueItemsBelongsToCategoryDisconnectFieldInput>>;
  update?: InputMaybe<CatalogueCategoryCatalogueItemsBelongsToCategoryUpdateConnectionInput>;
  where?: InputMaybe<CatalogueCategoryCatalogueItemsBelongsToCategoryConnectionWhere>;
};

export type CatalogueCategoryConnectInput = {
  catalogueCategoriesHasSubcategory?: InputMaybe<Array<CatalogueCategoryCatalogueCategoriesHasSubcategoryConnectFieldInput>>;
  catalogueItemsBelongsToCategory?: InputMaybe<Array<CatalogueCategoryCatalogueItemsBelongsToCategoryConnectFieldInput>>;
  hasGroupCatalogueCategoryPropertyGroups?: InputMaybe<Array<CatalogueCategoryHasGroupCatalogueCategoryPropertyGroupsConnectFieldInput>>;
  hasSubcategoryCatalogueCategories?: InputMaybe<Array<CatalogueCategoryHasSubcategoryCatalogueCategoriesConnectFieldInput>>;
  parentCategory?: InputMaybe<CatalogueCategoryParentCategoryConnectFieldInput>;
  systemType?: InputMaybe<CatalogueCategorySystemTypeConnectFieldInput>;
};

export type CatalogueCategoryConnectWhere = {
  node: CatalogueCategoryWhere;
};

export type CatalogueCategoryCreateInput = {
  catalogueCategoriesHasSubcategory?: InputMaybe<CatalogueCategoryCatalogueCategoriesHasSubcategoryFieldInput>;
  catalogueItemsBelongsToCategory?: InputMaybe<CatalogueCategoryCatalogueItemsBelongsToCategoryFieldInput>;
  code: Scalars['String']['input'];
  hasGroupCatalogueCategoryPropertyGroups?: InputMaybe<CatalogueCategoryHasGroupCatalogueCategoryPropertyGroupsFieldInput>;
  hasSubcategoryCatalogueCategories?: InputMaybe<CatalogueCategoryHasSubcategoryCatalogueCategoriesFieldInput>;
  name: Scalars['String']['input'];
  parentCategory?: InputMaybe<CatalogueCategoryParentCategoryFieldInput>;
  systemType?: InputMaybe<CatalogueCategorySystemTypeFieldInput>;
};

export type CatalogueCategoryDeleteInput = {
  catalogueCategoriesHasSubcategory?: InputMaybe<Array<CatalogueCategoryCatalogueCategoriesHasSubcategoryDeleteFieldInput>>;
  catalogueItemsBelongsToCategory?: InputMaybe<Array<CatalogueCategoryCatalogueItemsBelongsToCategoryDeleteFieldInput>>;
  hasGroupCatalogueCategoryPropertyGroups?: InputMaybe<Array<CatalogueCategoryHasGroupCatalogueCategoryPropertyGroupsDeleteFieldInput>>;
  hasSubcategoryCatalogueCategories?: InputMaybe<Array<CatalogueCategoryHasSubcategoryCatalogueCategoriesDeleteFieldInput>>;
  parentCategory?: InputMaybe<CatalogueCategoryParentCategoryDeleteFieldInput>;
  systemType?: InputMaybe<CatalogueCategorySystemTypeDeleteFieldInput>;
};

export type CatalogueCategoryDisconnectInput = {
  catalogueCategoriesHasSubcategory?: InputMaybe<Array<CatalogueCategoryCatalogueCategoriesHasSubcategoryDisconnectFieldInput>>;
  catalogueItemsBelongsToCategory?: InputMaybe<Array<CatalogueCategoryCatalogueItemsBelongsToCategoryDisconnectFieldInput>>;
  hasGroupCatalogueCategoryPropertyGroups?: InputMaybe<Array<CatalogueCategoryHasGroupCatalogueCategoryPropertyGroupsDisconnectFieldInput>>;
  hasSubcategoryCatalogueCategories?: InputMaybe<Array<CatalogueCategoryHasSubcategoryCatalogueCategoriesDisconnectFieldInput>>;
  parentCategory?: InputMaybe<CatalogueCategoryParentCategoryDisconnectFieldInput>;
  systemType?: InputMaybe<CatalogueCategorySystemTypeDisconnectFieldInput>;
};

export type CatalogueCategoryEdge = {
  __typename?: 'CatalogueCategoryEdge';
  cursor: Scalars['String']['output'];
  node: CatalogueCategory;
};

export type CatalogueCategoryHasGroupCatalogueCategoryPropertyGroupsAggregateInput = {
  AND?: InputMaybe<Array<CatalogueCategoryHasGroupCatalogueCategoryPropertyGroupsAggregateInput>>;
  NOT?: InputMaybe<CatalogueCategoryHasGroupCatalogueCategoryPropertyGroupsAggregateInput>;
  OR?: InputMaybe<Array<CatalogueCategoryHasGroupCatalogueCategoryPropertyGroupsAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<CatalogueCategoryHasGroupCatalogueCategoryPropertyGroupsNodeAggregationWhereInput>;
};

export type CatalogueCategoryHasGroupCatalogueCategoryPropertyGroupsConnectFieldInput = {
  connect?: InputMaybe<Array<CatalogueCategoryPropertyGroupConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<CatalogueCategoryPropertyGroupConnectWhere>;
};

export type CatalogueCategoryHasGroupCatalogueCategoryPropertyGroupsConnection = {
  __typename?: 'CatalogueCategoryHasGroupCatalogueCategoryPropertyGroupsConnection';
  edges: Array<CatalogueCategoryHasGroupCatalogueCategoryPropertyGroupsRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type CatalogueCategoryHasGroupCatalogueCategoryPropertyGroupsConnectionSort = {
  node?: InputMaybe<CatalogueCategoryPropertyGroupSort>;
};

export type CatalogueCategoryHasGroupCatalogueCategoryPropertyGroupsConnectionWhere = {
  AND?: InputMaybe<Array<CatalogueCategoryHasGroupCatalogueCategoryPropertyGroupsConnectionWhere>>;
  NOT?: InputMaybe<CatalogueCategoryHasGroupCatalogueCategoryPropertyGroupsConnectionWhere>;
  OR?: InputMaybe<Array<CatalogueCategoryHasGroupCatalogueCategoryPropertyGroupsConnectionWhere>>;
  node?: InputMaybe<CatalogueCategoryPropertyGroupWhere>;
};

export type CatalogueCategoryHasGroupCatalogueCategoryPropertyGroupsCreateFieldInput = {
  node: CatalogueCategoryPropertyGroupCreateInput;
};

export type CatalogueCategoryHasGroupCatalogueCategoryPropertyGroupsDeleteFieldInput = {
  delete?: InputMaybe<CatalogueCategoryPropertyGroupDeleteInput>;
  where?: InputMaybe<CatalogueCategoryHasGroupCatalogueCategoryPropertyGroupsConnectionWhere>;
};

export type CatalogueCategoryHasGroupCatalogueCategoryPropertyGroupsDisconnectFieldInput = {
  disconnect?: InputMaybe<CatalogueCategoryPropertyGroupDisconnectInput>;
  where?: InputMaybe<CatalogueCategoryHasGroupCatalogueCategoryPropertyGroupsConnectionWhere>;
};

export type CatalogueCategoryHasGroupCatalogueCategoryPropertyGroupsFieldInput = {
  connect?: InputMaybe<Array<CatalogueCategoryHasGroupCatalogueCategoryPropertyGroupsConnectFieldInput>>;
  create?: InputMaybe<Array<CatalogueCategoryHasGroupCatalogueCategoryPropertyGroupsCreateFieldInput>>;
};

export type CatalogueCategoryHasGroupCatalogueCategoryPropertyGroupsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<CatalogueCategoryHasGroupCatalogueCategoryPropertyGroupsNodeAggregationWhereInput>>;
  NOT?: InputMaybe<CatalogueCategoryHasGroupCatalogueCategoryPropertyGroupsNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<CatalogueCategoryHasGroupCatalogueCategoryPropertyGroupsNodeAggregationWhereInput>>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  uid_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  uid_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  uid_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  uid_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  uid_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  uid_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  uid_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  uid_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  uid_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  uid_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type CatalogueCategoryHasGroupCatalogueCategoryPropertyGroupsRelationship = {
  __typename?: 'CatalogueCategoryHasGroupCatalogueCategoryPropertyGroupsRelationship';
  cursor: Scalars['String']['output'];
  node: CatalogueCategoryPropertyGroup;
};

export type CatalogueCategoryHasGroupCatalogueCategoryPropertyGroupsUpdateConnectionInput = {
  node?: InputMaybe<CatalogueCategoryPropertyGroupUpdateInput>;
};

export type CatalogueCategoryHasGroupCatalogueCategoryPropertyGroupsUpdateFieldInput = {
  connect?: InputMaybe<Array<CatalogueCategoryHasGroupCatalogueCategoryPropertyGroupsConnectFieldInput>>;
  create?: InputMaybe<Array<CatalogueCategoryHasGroupCatalogueCategoryPropertyGroupsCreateFieldInput>>;
  delete?: InputMaybe<Array<CatalogueCategoryHasGroupCatalogueCategoryPropertyGroupsDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<CatalogueCategoryHasGroupCatalogueCategoryPropertyGroupsDisconnectFieldInput>>;
  update?: InputMaybe<CatalogueCategoryHasGroupCatalogueCategoryPropertyGroupsUpdateConnectionInput>;
  where?: InputMaybe<CatalogueCategoryHasGroupCatalogueCategoryPropertyGroupsConnectionWhere>;
};

export type CatalogueCategoryHasSubcategoryCatalogueCategoriesAggregateInput = {
  AND?: InputMaybe<Array<CatalogueCategoryHasSubcategoryCatalogueCategoriesAggregateInput>>;
  NOT?: InputMaybe<CatalogueCategoryHasSubcategoryCatalogueCategoriesAggregateInput>;
  OR?: InputMaybe<Array<CatalogueCategoryHasSubcategoryCatalogueCategoriesAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<CatalogueCategoryHasSubcategoryCatalogueCategoriesNodeAggregationWhereInput>;
};

export type CatalogueCategoryHasSubcategoryCatalogueCategoriesConnectFieldInput = {
  connect?: InputMaybe<Array<CatalogueCategoryConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<CatalogueCategoryConnectWhere>;
};

export type CatalogueCategoryHasSubcategoryCatalogueCategoriesConnection = {
  __typename?: 'CatalogueCategoryHasSubcategoryCatalogueCategoriesConnection';
  edges: Array<CatalogueCategoryHasSubcategoryCatalogueCategoriesRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type CatalogueCategoryHasSubcategoryCatalogueCategoriesConnectionSort = {
  node?: InputMaybe<CatalogueCategorySort>;
};

export type CatalogueCategoryHasSubcategoryCatalogueCategoriesConnectionWhere = {
  AND?: InputMaybe<Array<CatalogueCategoryHasSubcategoryCatalogueCategoriesConnectionWhere>>;
  NOT?: InputMaybe<CatalogueCategoryHasSubcategoryCatalogueCategoriesConnectionWhere>;
  OR?: InputMaybe<Array<CatalogueCategoryHasSubcategoryCatalogueCategoriesConnectionWhere>>;
  node?: InputMaybe<CatalogueCategoryWhere>;
};

export type CatalogueCategoryHasSubcategoryCatalogueCategoriesCreateFieldInput = {
  node: CatalogueCategoryCreateInput;
};

export type CatalogueCategoryHasSubcategoryCatalogueCategoriesDeleteFieldInput = {
  delete?: InputMaybe<CatalogueCategoryDeleteInput>;
  where?: InputMaybe<CatalogueCategoryHasSubcategoryCatalogueCategoriesConnectionWhere>;
};

export type CatalogueCategoryHasSubcategoryCatalogueCategoriesDisconnectFieldInput = {
  disconnect?: InputMaybe<CatalogueCategoryDisconnectInput>;
  where?: InputMaybe<CatalogueCategoryHasSubcategoryCatalogueCategoriesConnectionWhere>;
};

export type CatalogueCategoryHasSubcategoryCatalogueCategoriesFieldInput = {
  connect?: InputMaybe<Array<CatalogueCategoryHasSubcategoryCatalogueCategoriesConnectFieldInput>>;
  create?: InputMaybe<Array<CatalogueCategoryHasSubcategoryCatalogueCategoriesCreateFieldInput>>;
};

export type CatalogueCategoryHasSubcategoryCatalogueCategoriesNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<CatalogueCategoryHasSubcategoryCatalogueCategoriesNodeAggregationWhereInput>>;
  NOT?: InputMaybe<CatalogueCategoryHasSubcategoryCatalogueCategoriesNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<CatalogueCategoryHasSubcategoryCatalogueCategoriesNodeAggregationWhereInput>>;
  code_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  code_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type CatalogueCategoryHasSubcategoryCatalogueCategoriesRelationship = {
  __typename?: 'CatalogueCategoryHasSubcategoryCatalogueCategoriesRelationship';
  cursor: Scalars['String']['output'];
  node: CatalogueCategory;
};

export type CatalogueCategoryHasSubcategoryCatalogueCategoriesUpdateConnectionInput = {
  node?: InputMaybe<CatalogueCategoryUpdateInput>;
};

export type CatalogueCategoryHasSubcategoryCatalogueCategoriesUpdateFieldInput = {
  connect?: InputMaybe<Array<CatalogueCategoryHasSubcategoryCatalogueCategoriesConnectFieldInput>>;
  create?: InputMaybe<Array<CatalogueCategoryHasSubcategoryCatalogueCategoriesCreateFieldInput>>;
  delete?: InputMaybe<Array<CatalogueCategoryHasSubcategoryCatalogueCategoriesDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<CatalogueCategoryHasSubcategoryCatalogueCategoriesDisconnectFieldInput>>;
  update?: InputMaybe<CatalogueCategoryHasSubcategoryCatalogueCategoriesUpdateConnectionInput>;
  where?: InputMaybe<CatalogueCategoryHasSubcategoryCatalogueCategoriesConnectionWhere>;
};

export type CatalogueCategoryOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /** Specify one or more CatalogueCategorySort objects to sort CatalogueCategories by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<CatalogueCategorySort>>;
};

export type CatalogueCategoryParentCategoryAggregateInput = {
  AND?: InputMaybe<Array<CatalogueCategoryParentCategoryAggregateInput>>;
  NOT?: InputMaybe<CatalogueCategoryParentCategoryAggregateInput>;
  OR?: InputMaybe<Array<CatalogueCategoryParentCategoryAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<CatalogueCategoryParentCategoryNodeAggregationWhereInput>;
};

export type CatalogueCategoryParentCategoryConnectFieldInput = {
  connect?: InputMaybe<CatalogueCategoryConnectInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<CatalogueCategoryConnectWhere>;
};

export type CatalogueCategoryParentCategoryConnection = {
  __typename?: 'CatalogueCategoryParentCategoryConnection';
  edges: Array<CatalogueCategoryParentCategoryRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type CatalogueCategoryParentCategoryConnectionSort = {
  node?: InputMaybe<CatalogueCategorySort>;
};

export type CatalogueCategoryParentCategoryConnectionWhere = {
  AND?: InputMaybe<Array<CatalogueCategoryParentCategoryConnectionWhere>>;
  NOT?: InputMaybe<CatalogueCategoryParentCategoryConnectionWhere>;
  OR?: InputMaybe<Array<CatalogueCategoryParentCategoryConnectionWhere>>;
  node?: InputMaybe<CatalogueCategoryWhere>;
};

export type CatalogueCategoryParentCategoryCreateFieldInput = {
  node: CatalogueCategoryCreateInput;
};

export type CatalogueCategoryParentCategoryDeleteFieldInput = {
  delete?: InputMaybe<CatalogueCategoryDeleteInput>;
  where?: InputMaybe<CatalogueCategoryParentCategoryConnectionWhere>;
};

export type CatalogueCategoryParentCategoryDisconnectFieldInput = {
  disconnect?: InputMaybe<CatalogueCategoryDisconnectInput>;
  where?: InputMaybe<CatalogueCategoryParentCategoryConnectionWhere>;
};

export type CatalogueCategoryParentCategoryFieldInput = {
  connect?: InputMaybe<CatalogueCategoryParentCategoryConnectFieldInput>;
  create?: InputMaybe<CatalogueCategoryParentCategoryCreateFieldInput>;
};

export type CatalogueCategoryParentCategoryNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<CatalogueCategoryParentCategoryNodeAggregationWhereInput>>;
  NOT?: InputMaybe<CatalogueCategoryParentCategoryNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<CatalogueCategoryParentCategoryNodeAggregationWhereInput>>;
  code_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  code_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type CatalogueCategoryParentCategoryRelationship = {
  __typename?: 'CatalogueCategoryParentCategoryRelationship';
  cursor: Scalars['String']['output'];
  node: CatalogueCategory;
};

export type CatalogueCategoryParentCategoryUpdateConnectionInput = {
  node?: InputMaybe<CatalogueCategoryUpdateInput>;
};

export type CatalogueCategoryParentCategoryUpdateFieldInput = {
  connect?: InputMaybe<CatalogueCategoryParentCategoryConnectFieldInput>;
  create?: InputMaybe<CatalogueCategoryParentCategoryCreateFieldInput>;
  delete?: InputMaybe<CatalogueCategoryParentCategoryDeleteFieldInput>;
  disconnect?: InputMaybe<CatalogueCategoryParentCategoryDisconnectFieldInput>;
  update?: InputMaybe<CatalogueCategoryParentCategoryUpdateConnectionInput>;
  where?: InputMaybe<CatalogueCategoryParentCategoryConnectionWhere>;
};

export type CatalogueCategoryPropertiesConnection = {
  __typename?: 'CatalogueCategoryPropertiesConnection';
  edges: Array<CatalogueCategoryPropertyEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type CatalogueCategoryProperty = {
  __typename?: 'CatalogueCategoryProperty';
  catalogueCategoryPropertyGroupsContainsProperty: Array<CatalogueCategoryPropertyGroup>;
  catalogueCategoryPropertyGroupsContainsPropertyAggregate?: Maybe<CatalogueCategoryPropertyCatalogueCategoryPropertyGroupCatalogueCategoryPropertyGroupsContainsPropertyAggregationSelection>;
  catalogueCategoryPropertyGroupsContainsPropertyConnection: CatalogueCategoryPropertyCatalogueCategoryPropertyGroupsContainsPropertyConnection;
  defaultValue: Scalars['String']['output'];
  isPropertyTypeCatalogueCategoryPropertyTypes: Array<CatalogueCategoryPropertyType>;
  isPropertyTypeCatalogueCategoryPropertyTypesAggregate?: Maybe<CatalogueCategoryPropertyCatalogueCategoryPropertyTypeIsPropertyTypeCatalogueCategoryPropertyTypesAggregationSelection>;
  isPropertyTypeCatalogueCategoryPropertyTypesConnection: CatalogueCategoryPropertyIsPropertyTypeCatalogueCategoryPropertyTypesConnection;
  listOfValues: Scalars['String']['output'];
  name: Scalars['String']['output'];
  uid: Scalars['String']['output'];
  unit?: Maybe<Unit>;
  unitAggregate?: Maybe<CatalogueCategoryPropertyUnitUnitAggregationSelection>;
  unitConnection: CatalogueCategoryPropertyUnitConnection;
  value?: Maybe<Scalars['String']['output']>;
};


export type CatalogueCategoryPropertyCatalogueCategoryPropertyGroupsContainsPropertyArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<CatalogueCategoryPropertyGroupOptions>;
  where?: InputMaybe<CatalogueCategoryPropertyGroupWhere>;
};


export type CatalogueCategoryPropertyCatalogueCategoryPropertyGroupsContainsPropertyAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<CatalogueCategoryPropertyGroupWhere>;
};


export type CatalogueCategoryPropertyCatalogueCategoryPropertyGroupsContainsPropertyConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<CatalogueCategoryPropertyCatalogueCategoryPropertyGroupsContainsPropertyConnectionSort>>;
  where?: InputMaybe<CatalogueCategoryPropertyCatalogueCategoryPropertyGroupsContainsPropertyConnectionWhere>;
};


export type CatalogueCategoryPropertyIsPropertyTypeCatalogueCategoryPropertyTypesArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<CatalogueCategoryPropertyTypeOptions>;
  where?: InputMaybe<CatalogueCategoryPropertyTypeWhere>;
};


export type CatalogueCategoryPropertyIsPropertyTypeCatalogueCategoryPropertyTypesAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<CatalogueCategoryPropertyTypeWhere>;
};


export type CatalogueCategoryPropertyIsPropertyTypeCatalogueCategoryPropertyTypesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<CatalogueCategoryPropertyIsPropertyTypeCatalogueCategoryPropertyTypesConnectionSort>>;
  where?: InputMaybe<CatalogueCategoryPropertyIsPropertyTypeCatalogueCategoryPropertyTypesConnectionWhere>;
};


export type CatalogueCategoryPropertyUnitArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<UnitOptions>;
  where?: InputMaybe<UnitWhere>;
};


export type CatalogueCategoryPropertyUnitAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<UnitWhere>;
};


export type CatalogueCategoryPropertyUnitConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<CatalogueCategoryPropertyUnitConnectionSort>>;
  where?: InputMaybe<CatalogueCategoryPropertyUnitConnectionWhere>;
};

export type CatalogueCategoryPropertyAggregateSelection = {
  __typename?: 'CatalogueCategoryPropertyAggregateSelection';
  count: Scalars['Int']['output'];
  defaultValue: StringAggregateSelectionNonNullable;
  listOfValues: StringAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  uid: StringAggregateSelectionNonNullable;
  value: StringAggregateSelectionNullable;
};

export type CatalogueCategoryPropertyCatalogueCategoryPropertyGroupCatalogueCategoryPropertyGroupsContainsPropertyAggregationSelection = {
  __typename?: 'CatalogueCategoryPropertyCatalogueCategoryPropertyGroupCatalogueCategoryPropertyGroupsContainsPropertyAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<CatalogueCategoryPropertyCatalogueCategoryPropertyGroupCatalogueCategoryPropertyGroupsContainsPropertyNodeAggregateSelection>;
};

export type CatalogueCategoryPropertyCatalogueCategoryPropertyGroupCatalogueCategoryPropertyGroupsContainsPropertyNodeAggregateSelection = {
  __typename?: 'CatalogueCategoryPropertyCatalogueCategoryPropertyGroupCatalogueCategoryPropertyGroupsContainsPropertyNodeAggregateSelection';
  name: StringAggregateSelectionNonNullable;
  uid: StringAggregateSelectionNonNullable;
};

export type CatalogueCategoryPropertyCatalogueCategoryPropertyGroupsContainsPropertyAggregateInput = {
  AND?: InputMaybe<Array<CatalogueCategoryPropertyCatalogueCategoryPropertyGroupsContainsPropertyAggregateInput>>;
  NOT?: InputMaybe<CatalogueCategoryPropertyCatalogueCategoryPropertyGroupsContainsPropertyAggregateInput>;
  OR?: InputMaybe<Array<CatalogueCategoryPropertyCatalogueCategoryPropertyGroupsContainsPropertyAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<CatalogueCategoryPropertyCatalogueCategoryPropertyGroupsContainsPropertyNodeAggregationWhereInput>;
};

export type CatalogueCategoryPropertyCatalogueCategoryPropertyGroupsContainsPropertyConnectFieldInput = {
  connect?: InputMaybe<Array<CatalogueCategoryPropertyGroupConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<CatalogueCategoryPropertyGroupConnectWhere>;
};

export type CatalogueCategoryPropertyCatalogueCategoryPropertyGroupsContainsPropertyConnection = {
  __typename?: 'CatalogueCategoryPropertyCatalogueCategoryPropertyGroupsContainsPropertyConnection';
  edges: Array<CatalogueCategoryPropertyCatalogueCategoryPropertyGroupsContainsPropertyRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type CatalogueCategoryPropertyCatalogueCategoryPropertyGroupsContainsPropertyConnectionSort = {
  node?: InputMaybe<CatalogueCategoryPropertyGroupSort>;
};

export type CatalogueCategoryPropertyCatalogueCategoryPropertyGroupsContainsPropertyConnectionWhere = {
  AND?: InputMaybe<Array<CatalogueCategoryPropertyCatalogueCategoryPropertyGroupsContainsPropertyConnectionWhere>>;
  NOT?: InputMaybe<CatalogueCategoryPropertyCatalogueCategoryPropertyGroupsContainsPropertyConnectionWhere>;
  OR?: InputMaybe<Array<CatalogueCategoryPropertyCatalogueCategoryPropertyGroupsContainsPropertyConnectionWhere>>;
  node?: InputMaybe<CatalogueCategoryPropertyGroupWhere>;
};

export type CatalogueCategoryPropertyCatalogueCategoryPropertyGroupsContainsPropertyCreateFieldInput = {
  node: CatalogueCategoryPropertyGroupCreateInput;
};

export type CatalogueCategoryPropertyCatalogueCategoryPropertyGroupsContainsPropertyDeleteFieldInput = {
  delete?: InputMaybe<CatalogueCategoryPropertyGroupDeleteInput>;
  where?: InputMaybe<CatalogueCategoryPropertyCatalogueCategoryPropertyGroupsContainsPropertyConnectionWhere>;
};

export type CatalogueCategoryPropertyCatalogueCategoryPropertyGroupsContainsPropertyDisconnectFieldInput = {
  disconnect?: InputMaybe<CatalogueCategoryPropertyGroupDisconnectInput>;
  where?: InputMaybe<CatalogueCategoryPropertyCatalogueCategoryPropertyGroupsContainsPropertyConnectionWhere>;
};

export type CatalogueCategoryPropertyCatalogueCategoryPropertyGroupsContainsPropertyFieldInput = {
  connect?: InputMaybe<Array<CatalogueCategoryPropertyCatalogueCategoryPropertyGroupsContainsPropertyConnectFieldInput>>;
  create?: InputMaybe<Array<CatalogueCategoryPropertyCatalogueCategoryPropertyGroupsContainsPropertyCreateFieldInput>>;
};

export type CatalogueCategoryPropertyCatalogueCategoryPropertyGroupsContainsPropertyNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<CatalogueCategoryPropertyCatalogueCategoryPropertyGroupsContainsPropertyNodeAggregationWhereInput>>;
  NOT?: InputMaybe<CatalogueCategoryPropertyCatalogueCategoryPropertyGroupsContainsPropertyNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<CatalogueCategoryPropertyCatalogueCategoryPropertyGroupsContainsPropertyNodeAggregationWhereInput>>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  uid_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  uid_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  uid_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  uid_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  uid_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  uid_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  uid_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  uid_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  uid_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  uid_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type CatalogueCategoryPropertyCatalogueCategoryPropertyGroupsContainsPropertyRelationship = {
  __typename?: 'CatalogueCategoryPropertyCatalogueCategoryPropertyGroupsContainsPropertyRelationship';
  cursor: Scalars['String']['output'];
  node: CatalogueCategoryPropertyGroup;
};

export type CatalogueCategoryPropertyCatalogueCategoryPropertyGroupsContainsPropertyUpdateConnectionInput = {
  node?: InputMaybe<CatalogueCategoryPropertyGroupUpdateInput>;
};

export type CatalogueCategoryPropertyCatalogueCategoryPropertyGroupsContainsPropertyUpdateFieldInput = {
  connect?: InputMaybe<Array<CatalogueCategoryPropertyCatalogueCategoryPropertyGroupsContainsPropertyConnectFieldInput>>;
  create?: InputMaybe<Array<CatalogueCategoryPropertyCatalogueCategoryPropertyGroupsContainsPropertyCreateFieldInput>>;
  delete?: InputMaybe<Array<CatalogueCategoryPropertyCatalogueCategoryPropertyGroupsContainsPropertyDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<CatalogueCategoryPropertyCatalogueCategoryPropertyGroupsContainsPropertyDisconnectFieldInput>>;
  update?: InputMaybe<CatalogueCategoryPropertyCatalogueCategoryPropertyGroupsContainsPropertyUpdateConnectionInput>;
  where?: InputMaybe<CatalogueCategoryPropertyCatalogueCategoryPropertyGroupsContainsPropertyConnectionWhere>;
};

export type CatalogueCategoryPropertyCatalogueCategoryPropertyTypeIsPropertyTypeCatalogueCategoryPropertyTypesAggregationSelection = {
  __typename?: 'CatalogueCategoryPropertyCatalogueCategoryPropertyTypeIsPropertyTypeCatalogueCategoryPropertyTypesAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<CatalogueCategoryPropertyCatalogueCategoryPropertyTypeIsPropertyTypeCatalogueCategoryPropertyTypesNodeAggregateSelection>;
};

export type CatalogueCategoryPropertyCatalogueCategoryPropertyTypeIsPropertyTypeCatalogueCategoryPropertyTypesNodeAggregateSelection = {
  __typename?: 'CatalogueCategoryPropertyCatalogueCategoryPropertyTypeIsPropertyTypeCatalogueCategoryPropertyTypesNodeAggregateSelection';
  code: StringAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  uid: StringAggregateSelectionNonNullable;
};

export type CatalogueCategoryPropertyConnectInput = {
  catalogueCategoryPropertyGroupsContainsProperty?: InputMaybe<Array<CatalogueCategoryPropertyCatalogueCategoryPropertyGroupsContainsPropertyConnectFieldInput>>;
  isPropertyTypeCatalogueCategoryPropertyTypes?: InputMaybe<Array<CatalogueCategoryPropertyIsPropertyTypeCatalogueCategoryPropertyTypesConnectFieldInput>>;
  unit?: InputMaybe<CatalogueCategoryPropertyUnitConnectFieldInput>;
};

export type CatalogueCategoryPropertyConnectWhere = {
  node: CatalogueCategoryPropertyWhere;
};

export type CatalogueCategoryPropertyCreateInput = {
  catalogueCategoryPropertyGroupsContainsProperty?: InputMaybe<CatalogueCategoryPropertyCatalogueCategoryPropertyGroupsContainsPropertyFieldInput>;
  defaultValue: Scalars['String']['input'];
  isPropertyTypeCatalogueCategoryPropertyTypes?: InputMaybe<CatalogueCategoryPropertyIsPropertyTypeCatalogueCategoryPropertyTypesFieldInput>;
  listOfValues: Scalars['String']['input'];
  name: Scalars['String']['input'];
  uid: Scalars['String']['input'];
  unit?: InputMaybe<CatalogueCategoryPropertyUnitFieldInput>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type CatalogueCategoryPropertyDeleteInput = {
  catalogueCategoryPropertyGroupsContainsProperty?: InputMaybe<Array<CatalogueCategoryPropertyCatalogueCategoryPropertyGroupsContainsPropertyDeleteFieldInput>>;
  isPropertyTypeCatalogueCategoryPropertyTypes?: InputMaybe<Array<CatalogueCategoryPropertyIsPropertyTypeCatalogueCategoryPropertyTypesDeleteFieldInput>>;
  unit?: InputMaybe<CatalogueCategoryPropertyUnitDeleteFieldInput>;
};

export type CatalogueCategoryPropertyDisconnectInput = {
  catalogueCategoryPropertyGroupsContainsProperty?: InputMaybe<Array<CatalogueCategoryPropertyCatalogueCategoryPropertyGroupsContainsPropertyDisconnectFieldInput>>;
  isPropertyTypeCatalogueCategoryPropertyTypes?: InputMaybe<Array<CatalogueCategoryPropertyIsPropertyTypeCatalogueCategoryPropertyTypesDisconnectFieldInput>>;
  unit?: InputMaybe<CatalogueCategoryPropertyUnitDisconnectFieldInput>;
};

export type CatalogueCategoryPropertyEdge = {
  __typename?: 'CatalogueCategoryPropertyEdge';
  cursor: Scalars['String']['output'];
  node: CatalogueCategoryProperty;
};

export type CatalogueCategoryPropertyGroup = {
  __typename?: 'CatalogueCategoryPropertyGroup';
  catalogueCategoriesHasGroup: Array<CatalogueCategory>;
  catalogueCategoriesHasGroupAggregate?: Maybe<CatalogueCategoryPropertyGroupCatalogueCategoryCatalogueCategoriesHasGroupAggregationSelection>;
  catalogueCategoriesHasGroupConnection: CatalogueCategoryPropertyGroupCatalogueCategoriesHasGroupConnection;
  containsPropertyCatalogueCategoryProperties: Array<CatalogueCategoryProperty>;
  containsPropertyCatalogueCategoryPropertiesAggregate?: Maybe<CatalogueCategoryPropertyGroupCatalogueCategoryPropertyContainsPropertyCatalogueCategoryPropertiesAggregationSelection>;
  containsPropertyCatalogueCategoryPropertiesConnection: CatalogueCategoryPropertyGroupContainsPropertyCatalogueCategoryPropertiesConnection;
  name: Scalars['String']['output'];
  uid: Scalars['String']['output'];
};


export type CatalogueCategoryPropertyGroupCatalogueCategoriesHasGroupArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<CatalogueCategoryOptions>;
  where?: InputMaybe<CatalogueCategoryWhere>;
};


export type CatalogueCategoryPropertyGroupCatalogueCategoriesHasGroupAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<CatalogueCategoryWhere>;
};


export type CatalogueCategoryPropertyGroupCatalogueCategoriesHasGroupConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<CatalogueCategoryPropertyGroupCatalogueCategoriesHasGroupConnectionSort>>;
  where?: InputMaybe<CatalogueCategoryPropertyGroupCatalogueCategoriesHasGroupConnectionWhere>;
};


export type CatalogueCategoryPropertyGroupContainsPropertyCatalogueCategoryPropertiesArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<CatalogueCategoryPropertyOptions>;
  where?: InputMaybe<CatalogueCategoryPropertyWhere>;
};


export type CatalogueCategoryPropertyGroupContainsPropertyCatalogueCategoryPropertiesAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<CatalogueCategoryPropertyWhere>;
};


export type CatalogueCategoryPropertyGroupContainsPropertyCatalogueCategoryPropertiesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<CatalogueCategoryPropertyGroupContainsPropertyCatalogueCategoryPropertiesConnectionSort>>;
  where?: InputMaybe<CatalogueCategoryPropertyGroupContainsPropertyCatalogueCategoryPropertiesConnectionWhere>;
};

export type CatalogueCategoryPropertyGroupAggregateSelection = {
  __typename?: 'CatalogueCategoryPropertyGroupAggregateSelection';
  count: Scalars['Int']['output'];
  name: StringAggregateSelectionNonNullable;
  uid: StringAggregateSelectionNonNullable;
};

export type CatalogueCategoryPropertyGroupCatalogueCategoriesHasGroupAggregateInput = {
  AND?: InputMaybe<Array<CatalogueCategoryPropertyGroupCatalogueCategoriesHasGroupAggregateInput>>;
  NOT?: InputMaybe<CatalogueCategoryPropertyGroupCatalogueCategoriesHasGroupAggregateInput>;
  OR?: InputMaybe<Array<CatalogueCategoryPropertyGroupCatalogueCategoriesHasGroupAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<CatalogueCategoryPropertyGroupCatalogueCategoriesHasGroupNodeAggregationWhereInput>;
};

export type CatalogueCategoryPropertyGroupCatalogueCategoriesHasGroupConnectFieldInput = {
  connect?: InputMaybe<Array<CatalogueCategoryConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<CatalogueCategoryConnectWhere>;
};

export type CatalogueCategoryPropertyGroupCatalogueCategoriesHasGroupConnection = {
  __typename?: 'CatalogueCategoryPropertyGroupCatalogueCategoriesHasGroupConnection';
  edges: Array<CatalogueCategoryPropertyGroupCatalogueCategoriesHasGroupRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type CatalogueCategoryPropertyGroupCatalogueCategoriesHasGroupConnectionSort = {
  node?: InputMaybe<CatalogueCategorySort>;
};

export type CatalogueCategoryPropertyGroupCatalogueCategoriesHasGroupConnectionWhere = {
  AND?: InputMaybe<Array<CatalogueCategoryPropertyGroupCatalogueCategoriesHasGroupConnectionWhere>>;
  NOT?: InputMaybe<CatalogueCategoryPropertyGroupCatalogueCategoriesHasGroupConnectionWhere>;
  OR?: InputMaybe<Array<CatalogueCategoryPropertyGroupCatalogueCategoriesHasGroupConnectionWhere>>;
  node?: InputMaybe<CatalogueCategoryWhere>;
};

export type CatalogueCategoryPropertyGroupCatalogueCategoriesHasGroupCreateFieldInput = {
  node: CatalogueCategoryCreateInput;
};

export type CatalogueCategoryPropertyGroupCatalogueCategoriesHasGroupDeleteFieldInput = {
  delete?: InputMaybe<CatalogueCategoryDeleteInput>;
  where?: InputMaybe<CatalogueCategoryPropertyGroupCatalogueCategoriesHasGroupConnectionWhere>;
};

export type CatalogueCategoryPropertyGroupCatalogueCategoriesHasGroupDisconnectFieldInput = {
  disconnect?: InputMaybe<CatalogueCategoryDisconnectInput>;
  where?: InputMaybe<CatalogueCategoryPropertyGroupCatalogueCategoriesHasGroupConnectionWhere>;
};

export type CatalogueCategoryPropertyGroupCatalogueCategoriesHasGroupFieldInput = {
  connect?: InputMaybe<Array<CatalogueCategoryPropertyGroupCatalogueCategoriesHasGroupConnectFieldInput>>;
  create?: InputMaybe<Array<CatalogueCategoryPropertyGroupCatalogueCategoriesHasGroupCreateFieldInput>>;
};

export type CatalogueCategoryPropertyGroupCatalogueCategoriesHasGroupNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<CatalogueCategoryPropertyGroupCatalogueCategoriesHasGroupNodeAggregationWhereInput>>;
  NOT?: InputMaybe<CatalogueCategoryPropertyGroupCatalogueCategoriesHasGroupNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<CatalogueCategoryPropertyGroupCatalogueCategoriesHasGroupNodeAggregationWhereInput>>;
  code_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  code_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type CatalogueCategoryPropertyGroupCatalogueCategoriesHasGroupRelationship = {
  __typename?: 'CatalogueCategoryPropertyGroupCatalogueCategoriesHasGroupRelationship';
  cursor: Scalars['String']['output'];
  node: CatalogueCategory;
};

export type CatalogueCategoryPropertyGroupCatalogueCategoriesHasGroupUpdateConnectionInput = {
  node?: InputMaybe<CatalogueCategoryUpdateInput>;
};

export type CatalogueCategoryPropertyGroupCatalogueCategoriesHasGroupUpdateFieldInput = {
  connect?: InputMaybe<Array<CatalogueCategoryPropertyGroupCatalogueCategoriesHasGroupConnectFieldInput>>;
  create?: InputMaybe<Array<CatalogueCategoryPropertyGroupCatalogueCategoriesHasGroupCreateFieldInput>>;
  delete?: InputMaybe<Array<CatalogueCategoryPropertyGroupCatalogueCategoriesHasGroupDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<CatalogueCategoryPropertyGroupCatalogueCategoriesHasGroupDisconnectFieldInput>>;
  update?: InputMaybe<CatalogueCategoryPropertyGroupCatalogueCategoriesHasGroupUpdateConnectionInput>;
  where?: InputMaybe<CatalogueCategoryPropertyGroupCatalogueCategoriesHasGroupConnectionWhere>;
};

export type CatalogueCategoryPropertyGroupCatalogueCategoryCatalogueCategoriesHasGroupAggregationSelection = {
  __typename?: 'CatalogueCategoryPropertyGroupCatalogueCategoryCatalogueCategoriesHasGroupAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<CatalogueCategoryPropertyGroupCatalogueCategoryCatalogueCategoriesHasGroupNodeAggregateSelection>;
};

export type CatalogueCategoryPropertyGroupCatalogueCategoryCatalogueCategoriesHasGroupNodeAggregateSelection = {
  __typename?: 'CatalogueCategoryPropertyGroupCatalogueCategoryCatalogueCategoriesHasGroupNodeAggregateSelection';
  code: StringAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  uid: IdAggregateSelectionNonNullable;
};

export type CatalogueCategoryPropertyGroupCatalogueCategoryPropertyContainsPropertyCatalogueCategoryPropertiesAggregationSelection = {
  __typename?: 'CatalogueCategoryPropertyGroupCatalogueCategoryPropertyContainsPropertyCatalogueCategoryPropertiesAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<CatalogueCategoryPropertyGroupCatalogueCategoryPropertyContainsPropertyCatalogueCategoryPropertiesNodeAggregateSelection>;
};

export type CatalogueCategoryPropertyGroupCatalogueCategoryPropertyContainsPropertyCatalogueCategoryPropertiesNodeAggregateSelection = {
  __typename?: 'CatalogueCategoryPropertyGroupCatalogueCategoryPropertyContainsPropertyCatalogueCategoryPropertiesNodeAggregateSelection';
  defaultValue: StringAggregateSelectionNonNullable;
  listOfValues: StringAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  uid: StringAggregateSelectionNonNullable;
  value: StringAggregateSelectionNullable;
};

export type CatalogueCategoryPropertyGroupConnectInput = {
  catalogueCategoriesHasGroup?: InputMaybe<Array<CatalogueCategoryPropertyGroupCatalogueCategoriesHasGroupConnectFieldInput>>;
  containsPropertyCatalogueCategoryProperties?: InputMaybe<Array<CatalogueCategoryPropertyGroupContainsPropertyCatalogueCategoryPropertiesConnectFieldInput>>;
};

export type CatalogueCategoryPropertyGroupConnectWhere = {
  node: CatalogueCategoryPropertyGroupWhere;
};

export type CatalogueCategoryPropertyGroupContainsPropertyCatalogueCategoryPropertiesAggregateInput = {
  AND?: InputMaybe<Array<CatalogueCategoryPropertyGroupContainsPropertyCatalogueCategoryPropertiesAggregateInput>>;
  NOT?: InputMaybe<CatalogueCategoryPropertyGroupContainsPropertyCatalogueCategoryPropertiesAggregateInput>;
  OR?: InputMaybe<Array<CatalogueCategoryPropertyGroupContainsPropertyCatalogueCategoryPropertiesAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<CatalogueCategoryPropertyGroupContainsPropertyCatalogueCategoryPropertiesNodeAggregationWhereInput>;
};

export type CatalogueCategoryPropertyGroupContainsPropertyCatalogueCategoryPropertiesConnectFieldInput = {
  connect?: InputMaybe<Array<CatalogueCategoryPropertyConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<CatalogueCategoryPropertyConnectWhere>;
};

export type CatalogueCategoryPropertyGroupContainsPropertyCatalogueCategoryPropertiesConnection = {
  __typename?: 'CatalogueCategoryPropertyGroupContainsPropertyCatalogueCategoryPropertiesConnection';
  edges: Array<CatalogueCategoryPropertyGroupContainsPropertyCatalogueCategoryPropertiesRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type CatalogueCategoryPropertyGroupContainsPropertyCatalogueCategoryPropertiesConnectionSort = {
  node?: InputMaybe<CatalogueCategoryPropertySort>;
};

export type CatalogueCategoryPropertyGroupContainsPropertyCatalogueCategoryPropertiesConnectionWhere = {
  AND?: InputMaybe<Array<CatalogueCategoryPropertyGroupContainsPropertyCatalogueCategoryPropertiesConnectionWhere>>;
  NOT?: InputMaybe<CatalogueCategoryPropertyGroupContainsPropertyCatalogueCategoryPropertiesConnectionWhere>;
  OR?: InputMaybe<Array<CatalogueCategoryPropertyGroupContainsPropertyCatalogueCategoryPropertiesConnectionWhere>>;
  node?: InputMaybe<CatalogueCategoryPropertyWhere>;
};

export type CatalogueCategoryPropertyGroupContainsPropertyCatalogueCategoryPropertiesCreateFieldInput = {
  node: CatalogueCategoryPropertyCreateInput;
};

export type CatalogueCategoryPropertyGroupContainsPropertyCatalogueCategoryPropertiesDeleteFieldInput = {
  delete?: InputMaybe<CatalogueCategoryPropertyDeleteInput>;
  where?: InputMaybe<CatalogueCategoryPropertyGroupContainsPropertyCatalogueCategoryPropertiesConnectionWhere>;
};

export type CatalogueCategoryPropertyGroupContainsPropertyCatalogueCategoryPropertiesDisconnectFieldInput = {
  disconnect?: InputMaybe<CatalogueCategoryPropertyDisconnectInput>;
  where?: InputMaybe<CatalogueCategoryPropertyGroupContainsPropertyCatalogueCategoryPropertiesConnectionWhere>;
};

export type CatalogueCategoryPropertyGroupContainsPropertyCatalogueCategoryPropertiesFieldInput = {
  connect?: InputMaybe<Array<CatalogueCategoryPropertyGroupContainsPropertyCatalogueCategoryPropertiesConnectFieldInput>>;
  create?: InputMaybe<Array<CatalogueCategoryPropertyGroupContainsPropertyCatalogueCategoryPropertiesCreateFieldInput>>;
};

export type CatalogueCategoryPropertyGroupContainsPropertyCatalogueCategoryPropertiesNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<CatalogueCategoryPropertyGroupContainsPropertyCatalogueCategoryPropertiesNodeAggregationWhereInput>>;
  NOT?: InputMaybe<CatalogueCategoryPropertyGroupContainsPropertyCatalogueCategoryPropertiesNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<CatalogueCategoryPropertyGroupContainsPropertyCatalogueCategoryPropertiesNodeAggregationWhereInput>>;
  defaultValue_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  defaultValue_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  defaultValue_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  defaultValue_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  defaultValue_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  defaultValue_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  defaultValue_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  defaultValue_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  defaultValue_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  defaultValue_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  defaultValue_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  defaultValue_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  defaultValue_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  defaultValue_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  defaultValue_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  listOfValues_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  listOfValues_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  listOfValues_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  listOfValues_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  listOfValues_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  listOfValues_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  listOfValues_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  listOfValues_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  listOfValues_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  listOfValues_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  listOfValues_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  listOfValues_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  listOfValues_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  listOfValues_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  listOfValues_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  uid_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  uid_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  uid_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  uid_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  uid_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  uid_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  uid_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  uid_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  uid_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  uid_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  value_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  value_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  value_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  value_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  value_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  value_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  value_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  value_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  value_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  value_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  value_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  value_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  value_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  value_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  value_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type CatalogueCategoryPropertyGroupContainsPropertyCatalogueCategoryPropertiesRelationship = {
  __typename?: 'CatalogueCategoryPropertyGroupContainsPropertyCatalogueCategoryPropertiesRelationship';
  cursor: Scalars['String']['output'];
  node: CatalogueCategoryProperty;
};

export type CatalogueCategoryPropertyGroupContainsPropertyCatalogueCategoryPropertiesUpdateConnectionInput = {
  node?: InputMaybe<CatalogueCategoryPropertyUpdateInput>;
};

export type CatalogueCategoryPropertyGroupContainsPropertyCatalogueCategoryPropertiesUpdateFieldInput = {
  connect?: InputMaybe<Array<CatalogueCategoryPropertyGroupContainsPropertyCatalogueCategoryPropertiesConnectFieldInput>>;
  create?: InputMaybe<Array<CatalogueCategoryPropertyGroupContainsPropertyCatalogueCategoryPropertiesCreateFieldInput>>;
  delete?: InputMaybe<Array<CatalogueCategoryPropertyGroupContainsPropertyCatalogueCategoryPropertiesDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<CatalogueCategoryPropertyGroupContainsPropertyCatalogueCategoryPropertiesDisconnectFieldInput>>;
  update?: InputMaybe<CatalogueCategoryPropertyGroupContainsPropertyCatalogueCategoryPropertiesUpdateConnectionInput>;
  where?: InputMaybe<CatalogueCategoryPropertyGroupContainsPropertyCatalogueCategoryPropertiesConnectionWhere>;
};

export type CatalogueCategoryPropertyGroupCreateInput = {
  catalogueCategoriesHasGroup?: InputMaybe<CatalogueCategoryPropertyGroupCatalogueCategoriesHasGroupFieldInput>;
  containsPropertyCatalogueCategoryProperties?: InputMaybe<CatalogueCategoryPropertyGroupContainsPropertyCatalogueCategoryPropertiesFieldInput>;
  name: Scalars['String']['input'];
  uid: Scalars['String']['input'];
};

export type CatalogueCategoryPropertyGroupDeleteInput = {
  catalogueCategoriesHasGroup?: InputMaybe<Array<CatalogueCategoryPropertyGroupCatalogueCategoriesHasGroupDeleteFieldInput>>;
  containsPropertyCatalogueCategoryProperties?: InputMaybe<Array<CatalogueCategoryPropertyGroupContainsPropertyCatalogueCategoryPropertiesDeleteFieldInput>>;
};

export type CatalogueCategoryPropertyGroupDisconnectInput = {
  catalogueCategoriesHasGroup?: InputMaybe<Array<CatalogueCategoryPropertyGroupCatalogueCategoriesHasGroupDisconnectFieldInput>>;
  containsPropertyCatalogueCategoryProperties?: InputMaybe<Array<CatalogueCategoryPropertyGroupContainsPropertyCatalogueCategoryPropertiesDisconnectFieldInput>>;
};

export type CatalogueCategoryPropertyGroupEdge = {
  __typename?: 'CatalogueCategoryPropertyGroupEdge';
  cursor: Scalars['String']['output'];
  node: CatalogueCategoryPropertyGroup;
};

export type CatalogueCategoryPropertyGroupOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /** Specify one or more CatalogueCategoryPropertyGroupSort objects to sort CatalogueCategoryPropertyGroups by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<CatalogueCategoryPropertyGroupSort>>;
};

export type CatalogueCategoryPropertyGroupRelationInput = {
  catalogueCategoriesHasGroup?: InputMaybe<Array<CatalogueCategoryPropertyGroupCatalogueCategoriesHasGroupCreateFieldInput>>;
  containsPropertyCatalogueCategoryProperties?: InputMaybe<Array<CatalogueCategoryPropertyGroupContainsPropertyCatalogueCategoryPropertiesCreateFieldInput>>;
};

/** Fields to sort CatalogueCategoryPropertyGroups by. The order in which sorts are applied is not guaranteed when specifying many fields in one CatalogueCategoryPropertyGroupSort object. */
export type CatalogueCategoryPropertyGroupSort = {
  name?: InputMaybe<SortDirection>;
  uid?: InputMaybe<SortDirection>;
};

export type CatalogueCategoryPropertyGroupUpdateInput = {
  catalogueCategoriesHasGroup?: InputMaybe<Array<CatalogueCategoryPropertyGroupCatalogueCategoriesHasGroupUpdateFieldInput>>;
  containsPropertyCatalogueCategoryProperties?: InputMaybe<Array<CatalogueCategoryPropertyGroupContainsPropertyCatalogueCategoryPropertiesUpdateFieldInput>>;
  name?: InputMaybe<Scalars['String']['input']>;
  uid?: InputMaybe<Scalars['String']['input']>;
};

export type CatalogueCategoryPropertyGroupWhere = {
  AND?: InputMaybe<Array<CatalogueCategoryPropertyGroupWhere>>;
  NOT?: InputMaybe<CatalogueCategoryPropertyGroupWhere>;
  OR?: InputMaybe<Array<CatalogueCategoryPropertyGroupWhere>>;
  catalogueCategoriesHasGroupAggregate?: InputMaybe<CatalogueCategoryPropertyGroupCatalogueCategoriesHasGroupAggregateInput>;
  /** Return CatalogueCategoryPropertyGroups where all of the related CatalogueCategoryPropertyGroupCatalogueCategoriesHasGroupConnections match this filter */
  catalogueCategoriesHasGroupConnection_ALL?: InputMaybe<CatalogueCategoryPropertyGroupCatalogueCategoriesHasGroupConnectionWhere>;
  /** Return CatalogueCategoryPropertyGroups where none of the related CatalogueCategoryPropertyGroupCatalogueCategoriesHasGroupConnections match this filter */
  catalogueCategoriesHasGroupConnection_NONE?: InputMaybe<CatalogueCategoryPropertyGroupCatalogueCategoriesHasGroupConnectionWhere>;
  /** Return CatalogueCategoryPropertyGroups where one of the related CatalogueCategoryPropertyGroupCatalogueCategoriesHasGroupConnections match this filter */
  catalogueCategoriesHasGroupConnection_SINGLE?: InputMaybe<CatalogueCategoryPropertyGroupCatalogueCategoriesHasGroupConnectionWhere>;
  /** Return CatalogueCategoryPropertyGroups where some of the related CatalogueCategoryPropertyGroupCatalogueCategoriesHasGroupConnections match this filter */
  catalogueCategoriesHasGroupConnection_SOME?: InputMaybe<CatalogueCategoryPropertyGroupCatalogueCategoriesHasGroupConnectionWhere>;
  /** Return CatalogueCategoryPropertyGroups where all of the related CatalogueCategories match this filter */
  catalogueCategoriesHasGroup_ALL?: InputMaybe<CatalogueCategoryWhere>;
  /** Return CatalogueCategoryPropertyGroups where none of the related CatalogueCategories match this filter */
  catalogueCategoriesHasGroup_NONE?: InputMaybe<CatalogueCategoryWhere>;
  /** Return CatalogueCategoryPropertyGroups where one of the related CatalogueCategories match this filter */
  catalogueCategoriesHasGroup_SINGLE?: InputMaybe<CatalogueCategoryWhere>;
  /** Return CatalogueCategoryPropertyGroups where some of the related CatalogueCategories match this filter */
  catalogueCategoriesHasGroup_SOME?: InputMaybe<CatalogueCategoryWhere>;
  containsPropertyCatalogueCategoryPropertiesAggregate?: InputMaybe<CatalogueCategoryPropertyGroupContainsPropertyCatalogueCategoryPropertiesAggregateInput>;
  /** Return CatalogueCategoryPropertyGroups where all of the related CatalogueCategoryPropertyGroupContainsPropertyCatalogueCategoryPropertiesConnections match this filter */
  containsPropertyCatalogueCategoryPropertiesConnection_ALL?: InputMaybe<CatalogueCategoryPropertyGroupContainsPropertyCatalogueCategoryPropertiesConnectionWhere>;
  /** Return CatalogueCategoryPropertyGroups where none of the related CatalogueCategoryPropertyGroupContainsPropertyCatalogueCategoryPropertiesConnections match this filter */
  containsPropertyCatalogueCategoryPropertiesConnection_NONE?: InputMaybe<CatalogueCategoryPropertyGroupContainsPropertyCatalogueCategoryPropertiesConnectionWhere>;
  /** Return CatalogueCategoryPropertyGroups where one of the related CatalogueCategoryPropertyGroupContainsPropertyCatalogueCategoryPropertiesConnections match this filter */
  containsPropertyCatalogueCategoryPropertiesConnection_SINGLE?: InputMaybe<CatalogueCategoryPropertyGroupContainsPropertyCatalogueCategoryPropertiesConnectionWhere>;
  /** Return CatalogueCategoryPropertyGroups where some of the related CatalogueCategoryPropertyGroupContainsPropertyCatalogueCategoryPropertiesConnections match this filter */
  containsPropertyCatalogueCategoryPropertiesConnection_SOME?: InputMaybe<CatalogueCategoryPropertyGroupContainsPropertyCatalogueCategoryPropertiesConnectionWhere>;
  /** Return CatalogueCategoryPropertyGroups where all of the related CatalogueCategoryProperties match this filter */
  containsPropertyCatalogueCategoryProperties_ALL?: InputMaybe<CatalogueCategoryPropertyWhere>;
  /** Return CatalogueCategoryPropertyGroups where none of the related CatalogueCategoryProperties match this filter */
  containsPropertyCatalogueCategoryProperties_NONE?: InputMaybe<CatalogueCategoryPropertyWhere>;
  /** Return CatalogueCategoryPropertyGroups where one of the related CatalogueCategoryProperties match this filter */
  containsPropertyCatalogueCategoryProperties_SINGLE?: InputMaybe<CatalogueCategoryPropertyWhere>;
  /** Return CatalogueCategoryPropertyGroups where some of the related CatalogueCategoryProperties match this filter */
  containsPropertyCatalogueCategoryProperties_SOME?: InputMaybe<CatalogueCategoryPropertyWhere>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  uid?: InputMaybe<Scalars['String']['input']>;
  uid_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  uid_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  uid_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  uid_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
};

export type CatalogueCategoryPropertyGroupsConnection = {
  __typename?: 'CatalogueCategoryPropertyGroupsConnection';
  edges: Array<CatalogueCategoryPropertyGroupEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type CatalogueCategoryPropertyIsPropertyTypeCatalogueCategoryPropertyTypesAggregateInput = {
  AND?: InputMaybe<Array<CatalogueCategoryPropertyIsPropertyTypeCatalogueCategoryPropertyTypesAggregateInput>>;
  NOT?: InputMaybe<CatalogueCategoryPropertyIsPropertyTypeCatalogueCategoryPropertyTypesAggregateInput>;
  OR?: InputMaybe<Array<CatalogueCategoryPropertyIsPropertyTypeCatalogueCategoryPropertyTypesAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<CatalogueCategoryPropertyIsPropertyTypeCatalogueCategoryPropertyTypesNodeAggregationWhereInput>;
};

export type CatalogueCategoryPropertyIsPropertyTypeCatalogueCategoryPropertyTypesConnectFieldInput = {
  connect?: InputMaybe<Array<CatalogueCategoryPropertyTypeConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<CatalogueCategoryPropertyTypeConnectWhere>;
};

export type CatalogueCategoryPropertyIsPropertyTypeCatalogueCategoryPropertyTypesConnection = {
  __typename?: 'CatalogueCategoryPropertyIsPropertyTypeCatalogueCategoryPropertyTypesConnection';
  edges: Array<CatalogueCategoryPropertyIsPropertyTypeCatalogueCategoryPropertyTypesRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type CatalogueCategoryPropertyIsPropertyTypeCatalogueCategoryPropertyTypesConnectionSort = {
  node?: InputMaybe<CatalogueCategoryPropertyTypeSort>;
};

export type CatalogueCategoryPropertyIsPropertyTypeCatalogueCategoryPropertyTypesConnectionWhere = {
  AND?: InputMaybe<Array<CatalogueCategoryPropertyIsPropertyTypeCatalogueCategoryPropertyTypesConnectionWhere>>;
  NOT?: InputMaybe<CatalogueCategoryPropertyIsPropertyTypeCatalogueCategoryPropertyTypesConnectionWhere>;
  OR?: InputMaybe<Array<CatalogueCategoryPropertyIsPropertyTypeCatalogueCategoryPropertyTypesConnectionWhere>>;
  node?: InputMaybe<CatalogueCategoryPropertyTypeWhere>;
};

export type CatalogueCategoryPropertyIsPropertyTypeCatalogueCategoryPropertyTypesCreateFieldInput = {
  node: CatalogueCategoryPropertyTypeCreateInput;
};

export type CatalogueCategoryPropertyIsPropertyTypeCatalogueCategoryPropertyTypesDeleteFieldInput = {
  delete?: InputMaybe<CatalogueCategoryPropertyTypeDeleteInput>;
  where?: InputMaybe<CatalogueCategoryPropertyIsPropertyTypeCatalogueCategoryPropertyTypesConnectionWhere>;
};

export type CatalogueCategoryPropertyIsPropertyTypeCatalogueCategoryPropertyTypesDisconnectFieldInput = {
  disconnect?: InputMaybe<CatalogueCategoryPropertyTypeDisconnectInput>;
  where?: InputMaybe<CatalogueCategoryPropertyIsPropertyTypeCatalogueCategoryPropertyTypesConnectionWhere>;
};

export type CatalogueCategoryPropertyIsPropertyTypeCatalogueCategoryPropertyTypesFieldInput = {
  connect?: InputMaybe<Array<CatalogueCategoryPropertyIsPropertyTypeCatalogueCategoryPropertyTypesConnectFieldInput>>;
  create?: InputMaybe<Array<CatalogueCategoryPropertyIsPropertyTypeCatalogueCategoryPropertyTypesCreateFieldInput>>;
};

export type CatalogueCategoryPropertyIsPropertyTypeCatalogueCategoryPropertyTypesNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<CatalogueCategoryPropertyIsPropertyTypeCatalogueCategoryPropertyTypesNodeAggregationWhereInput>>;
  NOT?: InputMaybe<CatalogueCategoryPropertyIsPropertyTypeCatalogueCategoryPropertyTypesNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<CatalogueCategoryPropertyIsPropertyTypeCatalogueCategoryPropertyTypesNodeAggregationWhereInput>>;
  code_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  code_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  uid_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  uid_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  uid_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  uid_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  uid_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  uid_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  uid_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  uid_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  uid_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  uid_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type CatalogueCategoryPropertyIsPropertyTypeCatalogueCategoryPropertyTypesRelationship = {
  __typename?: 'CatalogueCategoryPropertyIsPropertyTypeCatalogueCategoryPropertyTypesRelationship';
  cursor: Scalars['String']['output'];
  node: CatalogueCategoryPropertyType;
};

export type CatalogueCategoryPropertyIsPropertyTypeCatalogueCategoryPropertyTypesUpdateConnectionInput = {
  node?: InputMaybe<CatalogueCategoryPropertyTypeUpdateInput>;
};

export type CatalogueCategoryPropertyIsPropertyTypeCatalogueCategoryPropertyTypesUpdateFieldInput = {
  connect?: InputMaybe<Array<CatalogueCategoryPropertyIsPropertyTypeCatalogueCategoryPropertyTypesConnectFieldInput>>;
  create?: InputMaybe<Array<CatalogueCategoryPropertyIsPropertyTypeCatalogueCategoryPropertyTypesCreateFieldInput>>;
  delete?: InputMaybe<Array<CatalogueCategoryPropertyIsPropertyTypeCatalogueCategoryPropertyTypesDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<CatalogueCategoryPropertyIsPropertyTypeCatalogueCategoryPropertyTypesDisconnectFieldInput>>;
  update?: InputMaybe<CatalogueCategoryPropertyIsPropertyTypeCatalogueCategoryPropertyTypesUpdateConnectionInput>;
  where?: InputMaybe<CatalogueCategoryPropertyIsPropertyTypeCatalogueCategoryPropertyTypesConnectionWhere>;
};

export type CatalogueCategoryPropertyOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /** Specify one or more CatalogueCategoryPropertySort objects to sort CatalogueCategoryProperties by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<CatalogueCategoryPropertySort>>;
};

export type CatalogueCategoryPropertyRelationInput = {
  catalogueCategoryPropertyGroupsContainsProperty?: InputMaybe<Array<CatalogueCategoryPropertyCatalogueCategoryPropertyGroupsContainsPropertyCreateFieldInput>>;
  isPropertyTypeCatalogueCategoryPropertyTypes?: InputMaybe<Array<CatalogueCategoryPropertyIsPropertyTypeCatalogueCategoryPropertyTypesCreateFieldInput>>;
  unit?: InputMaybe<CatalogueCategoryPropertyUnitCreateFieldInput>;
};

/** Fields to sort CatalogueCategoryProperties by. The order in which sorts are applied is not guaranteed when specifying many fields in one CatalogueCategoryPropertySort object. */
export type CatalogueCategoryPropertySort = {
  defaultValue?: InputMaybe<SortDirection>;
  listOfValues?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  uid?: InputMaybe<SortDirection>;
  value?: InputMaybe<SortDirection>;
};

export type CatalogueCategoryPropertyType = {
  __typename?: 'CatalogueCategoryPropertyType';
  catalogueCategoryPropertiesIsPropertyType: Array<CatalogueCategoryProperty>;
  catalogueCategoryPropertiesIsPropertyTypeAggregate?: Maybe<CatalogueCategoryPropertyTypeCatalogueCategoryPropertyCatalogueCategoryPropertiesIsPropertyTypeAggregationSelection>;
  catalogueCategoryPropertiesIsPropertyTypeConnection: CatalogueCategoryPropertyTypeCatalogueCategoryPropertiesIsPropertyTypeConnection;
  code: Scalars['String']['output'];
  name: Scalars['String']['output'];
  uid: Scalars['String']['output'];
};


export type CatalogueCategoryPropertyTypeCatalogueCategoryPropertiesIsPropertyTypeArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<CatalogueCategoryPropertyOptions>;
  where?: InputMaybe<CatalogueCategoryPropertyWhere>;
};


export type CatalogueCategoryPropertyTypeCatalogueCategoryPropertiesIsPropertyTypeAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<CatalogueCategoryPropertyWhere>;
};


export type CatalogueCategoryPropertyTypeCatalogueCategoryPropertiesIsPropertyTypeConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<CatalogueCategoryPropertyTypeCatalogueCategoryPropertiesIsPropertyTypeConnectionSort>>;
  where?: InputMaybe<CatalogueCategoryPropertyTypeCatalogueCategoryPropertiesIsPropertyTypeConnectionWhere>;
};

export type CatalogueCategoryPropertyTypeAggregateSelection = {
  __typename?: 'CatalogueCategoryPropertyTypeAggregateSelection';
  code: StringAggregateSelectionNonNullable;
  count: Scalars['Int']['output'];
  name: StringAggregateSelectionNonNullable;
  uid: StringAggregateSelectionNonNullable;
};

export type CatalogueCategoryPropertyTypeCatalogueCategoryPropertiesIsPropertyTypeAggregateInput = {
  AND?: InputMaybe<Array<CatalogueCategoryPropertyTypeCatalogueCategoryPropertiesIsPropertyTypeAggregateInput>>;
  NOT?: InputMaybe<CatalogueCategoryPropertyTypeCatalogueCategoryPropertiesIsPropertyTypeAggregateInput>;
  OR?: InputMaybe<Array<CatalogueCategoryPropertyTypeCatalogueCategoryPropertiesIsPropertyTypeAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<CatalogueCategoryPropertyTypeCatalogueCategoryPropertiesIsPropertyTypeNodeAggregationWhereInput>;
};

export type CatalogueCategoryPropertyTypeCatalogueCategoryPropertiesIsPropertyTypeConnectFieldInput = {
  connect?: InputMaybe<Array<CatalogueCategoryPropertyConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<CatalogueCategoryPropertyConnectWhere>;
};

export type CatalogueCategoryPropertyTypeCatalogueCategoryPropertiesIsPropertyTypeConnection = {
  __typename?: 'CatalogueCategoryPropertyTypeCatalogueCategoryPropertiesIsPropertyTypeConnection';
  edges: Array<CatalogueCategoryPropertyTypeCatalogueCategoryPropertiesIsPropertyTypeRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type CatalogueCategoryPropertyTypeCatalogueCategoryPropertiesIsPropertyTypeConnectionSort = {
  node?: InputMaybe<CatalogueCategoryPropertySort>;
};

export type CatalogueCategoryPropertyTypeCatalogueCategoryPropertiesIsPropertyTypeConnectionWhere = {
  AND?: InputMaybe<Array<CatalogueCategoryPropertyTypeCatalogueCategoryPropertiesIsPropertyTypeConnectionWhere>>;
  NOT?: InputMaybe<CatalogueCategoryPropertyTypeCatalogueCategoryPropertiesIsPropertyTypeConnectionWhere>;
  OR?: InputMaybe<Array<CatalogueCategoryPropertyTypeCatalogueCategoryPropertiesIsPropertyTypeConnectionWhere>>;
  node?: InputMaybe<CatalogueCategoryPropertyWhere>;
};

export type CatalogueCategoryPropertyTypeCatalogueCategoryPropertiesIsPropertyTypeCreateFieldInput = {
  node: CatalogueCategoryPropertyCreateInput;
};

export type CatalogueCategoryPropertyTypeCatalogueCategoryPropertiesIsPropertyTypeDeleteFieldInput = {
  delete?: InputMaybe<CatalogueCategoryPropertyDeleteInput>;
  where?: InputMaybe<CatalogueCategoryPropertyTypeCatalogueCategoryPropertiesIsPropertyTypeConnectionWhere>;
};

export type CatalogueCategoryPropertyTypeCatalogueCategoryPropertiesIsPropertyTypeDisconnectFieldInput = {
  disconnect?: InputMaybe<CatalogueCategoryPropertyDisconnectInput>;
  where?: InputMaybe<CatalogueCategoryPropertyTypeCatalogueCategoryPropertiesIsPropertyTypeConnectionWhere>;
};

export type CatalogueCategoryPropertyTypeCatalogueCategoryPropertiesIsPropertyTypeFieldInput = {
  connect?: InputMaybe<Array<CatalogueCategoryPropertyTypeCatalogueCategoryPropertiesIsPropertyTypeConnectFieldInput>>;
  create?: InputMaybe<Array<CatalogueCategoryPropertyTypeCatalogueCategoryPropertiesIsPropertyTypeCreateFieldInput>>;
};

export type CatalogueCategoryPropertyTypeCatalogueCategoryPropertiesIsPropertyTypeNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<CatalogueCategoryPropertyTypeCatalogueCategoryPropertiesIsPropertyTypeNodeAggregationWhereInput>>;
  NOT?: InputMaybe<CatalogueCategoryPropertyTypeCatalogueCategoryPropertiesIsPropertyTypeNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<CatalogueCategoryPropertyTypeCatalogueCategoryPropertiesIsPropertyTypeNodeAggregationWhereInput>>;
  defaultValue_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  defaultValue_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  defaultValue_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  defaultValue_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  defaultValue_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  defaultValue_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  defaultValue_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  defaultValue_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  defaultValue_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  defaultValue_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  defaultValue_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  defaultValue_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  defaultValue_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  defaultValue_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  defaultValue_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  listOfValues_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  listOfValues_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  listOfValues_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  listOfValues_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  listOfValues_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  listOfValues_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  listOfValues_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  listOfValues_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  listOfValues_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  listOfValues_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  listOfValues_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  listOfValues_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  listOfValues_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  listOfValues_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  listOfValues_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  uid_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  uid_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  uid_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  uid_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  uid_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  uid_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  uid_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  uid_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  uid_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  uid_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  value_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  value_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  value_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  value_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  value_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  value_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  value_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  value_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  value_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  value_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  value_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  value_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  value_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  value_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  value_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type CatalogueCategoryPropertyTypeCatalogueCategoryPropertiesIsPropertyTypeRelationship = {
  __typename?: 'CatalogueCategoryPropertyTypeCatalogueCategoryPropertiesIsPropertyTypeRelationship';
  cursor: Scalars['String']['output'];
  node: CatalogueCategoryProperty;
};

export type CatalogueCategoryPropertyTypeCatalogueCategoryPropertiesIsPropertyTypeUpdateConnectionInput = {
  node?: InputMaybe<CatalogueCategoryPropertyUpdateInput>;
};

export type CatalogueCategoryPropertyTypeCatalogueCategoryPropertiesIsPropertyTypeUpdateFieldInput = {
  connect?: InputMaybe<Array<CatalogueCategoryPropertyTypeCatalogueCategoryPropertiesIsPropertyTypeConnectFieldInput>>;
  create?: InputMaybe<Array<CatalogueCategoryPropertyTypeCatalogueCategoryPropertiesIsPropertyTypeCreateFieldInput>>;
  delete?: InputMaybe<Array<CatalogueCategoryPropertyTypeCatalogueCategoryPropertiesIsPropertyTypeDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<CatalogueCategoryPropertyTypeCatalogueCategoryPropertiesIsPropertyTypeDisconnectFieldInput>>;
  update?: InputMaybe<CatalogueCategoryPropertyTypeCatalogueCategoryPropertiesIsPropertyTypeUpdateConnectionInput>;
  where?: InputMaybe<CatalogueCategoryPropertyTypeCatalogueCategoryPropertiesIsPropertyTypeConnectionWhere>;
};

export type CatalogueCategoryPropertyTypeCatalogueCategoryPropertyCatalogueCategoryPropertiesIsPropertyTypeAggregationSelection = {
  __typename?: 'CatalogueCategoryPropertyTypeCatalogueCategoryPropertyCatalogueCategoryPropertiesIsPropertyTypeAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<CatalogueCategoryPropertyTypeCatalogueCategoryPropertyCatalogueCategoryPropertiesIsPropertyTypeNodeAggregateSelection>;
};

export type CatalogueCategoryPropertyTypeCatalogueCategoryPropertyCatalogueCategoryPropertiesIsPropertyTypeNodeAggregateSelection = {
  __typename?: 'CatalogueCategoryPropertyTypeCatalogueCategoryPropertyCatalogueCategoryPropertiesIsPropertyTypeNodeAggregateSelection';
  defaultValue: StringAggregateSelectionNonNullable;
  listOfValues: StringAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  uid: StringAggregateSelectionNonNullable;
  value: StringAggregateSelectionNullable;
};

export type CatalogueCategoryPropertyTypeConnectInput = {
  catalogueCategoryPropertiesIsPropertyType?: InputMaybe<Array<CatalogueCategoryPropertyTypeCatalogueCategoryPropertiesIsPropertyTypeConnectFieldInput>>;
};

export type CatalogueCategoryPropertyTypeConnectWhere = {
  node: CatalogueCategoryPropertyTypeWhere;
};

export type CatalogueCategoryPropertyTypeCreateInput = {
  catalogueCategoryPropertiesIsPropertyType?: InputMaybe<CatalogueCategoryPropertyTypeCatalogueCategoryPropertiesIsPropertyTypeFieldInput>;
  code: Scalars['String']['input'];
  name: Scalars['String']['input'];
  uid: Scalars['String']['input'];
};

export type CatalogueCategoryPropertyTypeDeleteInput = {
  catalogueCategoryPropertiesIsPropertyType?: InputMaybe<Array<CatalogueCategoryPropertyTypeCatalogueCategoryPropertiesIsPropertyTypeDeleteFieldInput>>;
};

export type CatalogueCategoryPropertyTypeDisconnectInput = {
  catalogueCategoryPropertiesIsPropertyType?: InputMaybe<Array<CatalogueCategoryPropertyTypeCatalogueCategoryPropertiesIsPropertyTypeDisconnectFieldInput>>;
};

export type CatalogueCategoryPropertyTypeEdge = {
  __typename?: 'CatalogueCategoryPropertyTypeEdge';
  cursor: Scalars['String']['output'];
  node: CatalogueCategoryPropertyType;
};

export type CatalogueCategoryPropertyTypeOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /** Specify one or more CatalogueCategoryPropertyTypeSort objects to sort CatalogueCategoryPropertyTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<CatalogueCategoryPropertyTypeSort>>;
};

export type CatalogueCategoryPropertyTypeRelationInput = {
  catalogueCategoryPropertiesIsPropertyType?: InputMaybe<Array<CatalogueCategoryPropertyTypeCatalogueCategoryPropertiesIsPropertyTypeCreateFieldInput>>;
};

/** Fields to sort CatalogueCategoryPropertyTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one CatalogueCategoryPropertyTypeSort object. */
export type CatalogueCategoryPropertyTypeSort = {
  code?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  uid?: InputMaybe<SortDirection>;
};

export type CatalogueCategoryPropertyTypeUpdateInput = {
  catalogueCategoryPropertiesIsPropertyType?: InputMaybe<Array<CatalogueCategoryPropertyTypeCatalogueCategoryPropertiesIsPropertyTypeUpdateFieldInput>>;
  code?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  uid?: InputMaybe<Scalars['String']['input']>;
};

export type CatalogueCategoryPropertyTypeWhere = {
  AND?: InputMaybe<Array<CatalogueCategoryPropertyTypeWhere>>;
  NOT?: InputMaybe<CatalogueCategoryPropertyTypeWhere>;
  OR?: InputMaybe<Array<CatalogueCategoryPropertyTypeWhere>>;
  catalogueCategoryPropertiesIsPropertyTypeAggregate?: InputMaybe<CatalogueCategoryPropertyTypeCatalogueCategoryPropertiesIsPropertyTypeAggregateInput>;
  /** Return CatalogueCategoryPropertyTypes where all of the related CatalogueCategoryPropertyTypeCatalogueCategoryPropertiesIsPropertyTypeConnections match this filter */
  catalogueCategoryPropertiesIsPropertyTypeConnection_ALL?: InputMaybe<CatalogueCategoryPropertyTypeCatalogueCategoryPropertiesIsPropertyTypeConnectionWhere>;
  /** Return CatalogueCategoryPropertyTypes where none of the related CatalogueCategoryPropertyTypeCatalogueCategoryPropertiesIsPropertyTypeConnections match this filter */
  catalogueCategoryPropertiesIsPropertyTypeConnection_NONE?: InputMaybe<CatalogueCategoryPropertyTypeCatalogueCategoryPropertiesIsPropertyTypeConnectionWhere>;
  /** Return CatalogueCategoryPropertyTypes where one of the related CatalogueCategoryPropertyTypeCatalogueCategoryPropertiesIsPropertyTypeConnections match this filter */
  catalogueCategoryPropertiesIsPropertyTypeConnection_SINGLE?: InputMaybe<CatalogueCategoryPropertyTypeCatalogueCategoryPropertiesIsPropertyTypeConnectionWhere>;
  /** Return CatalogueCategoryPropertyTypes where some of the related CatalogueCategoryPropertyTypeCatalogueCategoryPropertiesIsPropertyTypeConnections match this filter */
  catalogueCategoryPropertiesIsPropertyTypeConnection_SOME?: InputMaybe<CatalogueCategoryPropertyTypeCatalogueCategoryPropertiesIsPropertyTypeConnectionWhere>;
  /** Return CatalogueCategoryPropertyTypes where all of the related CatalogueCategoryProperties match this filter */
  catalogueCategoryPropertiesIsPropertyType_ALL?: InputMaybe<CatalogueCategoryPropertyWhere>;
  /** Return CatalogueCategoryPropertyTypes where none of the related CatalogueCategoryProperties match this filter */
  catalogueCategoryPropertiesIsPropertyType_NONE?: InputMaybe<CatalogueCategoryPropertyWhere>;
  /** Return CatalogueCategoryPropertyTypes where one of the related CatalogueCategoryProperties match this filter */
  catalogueCategoryPropertiesIsPropertyType_SINGLE?: InputMaybe<CatalogueCategoryPropertyWhere>;
  /** Return CatalogueCategoryPropertyTypes where some of the related CatalogueCategoryProperties match this filter */
  catalogueCategoryPropertiesIsPropertyType_SOME?: InputMaybe<CatalogueCategoryPropertyWhere>;
  code?: InputMaybe<Scalars['String']['input']>;
  code_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  code_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  code_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  code_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  uid?: InputMaybe<Scalars['String']['input']>;
  uid_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  uid_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  uid_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  uid_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
};

export type CatalogueCategoryPropertyTypesConnection = {
  __typename?: 'CatalogueCategoryPropertyTypesConnection';
  edges: Array<CatalogueCategoryPropertyTypeEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type CatalogueCategoryPropertyUnitAggregateInput = {
  AND?: InputMaybe<Array<CatalogueCategoryPropertyUnitAggregateInput>>;
  NOT?: InputMaybe<CatalogueCategoryPropertyUnitAggregateInput>;
  OR?: InputMaybe<Array<CatalogueCategoryPropertyUnitAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<CatalogueCategoryPropertyUnitNodeAggregationWhereInput>;
};

export type CatalogueCategoryPropertyUnitConnectFieldInput = {
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<UnitConnectWhere>;
};

export type CatalogueCategoryPropertyUnitConnection = {
  __typename?: 'CatalogueCategoryPropertyUnitConnection';
  edges: Array<CatalogueCategoryPropertyUnitRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type CatalogueCategoryPropertyUnitConnectionSort = {
  node?: InputMaybe<UnitSort>;
};

export type CatalogueCategoryPropertyUnitConnectionWhere = {
  AND?: InputMaybe<Array<CatalogueCategoryPropertyUnitConnectionWhere>>;
  NOT?: InputMaybe<CatalogueCategoryPropertyUnitConnectionWhere>;
  OR?: InputMaybe<Array<CatalogueCategoryPropertyUnitConnectionWhere>>;
  node?: InputMaybe<UnitWhere>;
};

export type CatalogueCategoryPropertyUnitCreateFieldInput = {
  node: UnitCreateInput;
};

export type CatalogueCategoryPropertyUnitDeleteFieldInput = {
  where?: InputMaybe<CatalogueCategoryPropertyUnitConnectionWhere>;
};

export type CatalogueCategoryPropertyUnitDisconnectFieldInput = {
  where?: InputMaybe<CatalogueCategoryPropertyUnitConnectionWhere>;
};

export type CatalogueCategoryPropertyUnitFieldInput = {
  connect?: InputMaybe<CatalogueCategoryPropertyUnitConnectFieldInput>;
  create?: InputMaybe<CatalogueCategoryPropertyUnitCreateFieldInput>;
};

export type CatalogueCategoryPropertyUnitNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<CatalogueCategoryPropertyUnitNodeAggregationWhereInput>>;
  NOT?: InputMaybe<CatalogueCategoryPropertyUnitNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<CatalogueCategoryPropertyUnitNodeAggregationWhereInput>>;
  code_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  code_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type CatalogueCategoryPropertyUnitRelationship = {
  __typename?: 'CatalogueCategoryPropertyUnitRelationship';
  cursor: Scalars['String']['output'];
  node: Unit;
};

export type CatalogueCategoryPropertyUnitUnitAggregationSelection = {
  __typename?: 'CatalogueCategoryPropertyUnitUnitAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<CatalogueCategoryPropertyUnitUnitNodeAggregateSelection>;
};

export type CatalogueCategoryPropertyUnitUnitNodeAggregateSelection = {
  __typename?: 'CatalogueCategoryPropertyUnitUnitNodeAggregateSelection';
  code: StringAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  uid: IdAggregateSelectionNonNullable;
};

export type CatalogueCategoryPropertyUnitUpdateConnectionInput = {
  node?: InputMaybe<UnitUpdateInput>;
};

export type CatalogueCategoryPropertyUnitUpdateFieldInput = {
  connect?: InputMaybe<CatalogueCategoryPropertyUnitConnectFieldInput>;
  create?: InputMaybe<CatalogueCategoryPropertyUnitCreateFieldInput>;
  delete?: InputMaybe<CatalogueCategoryPropertyUnitDeleteFieldInput>;
  disconnect?: InputMaybe<CatalogueCategoryPropertyUnitDisconnectFieldInput>;
  update?: InputMaybe<CatalogueCategoryPropertyUnitUpdateConnectionInput>;
  where?: InputMaybe<CatalogueCategoryPropertyUnitConnectionWhere>;
};

export type CatalogueCategoryPropertyUpdateInput = {
  catalogueCategoryPropertyGroupsContainsProperty?: InputMaybe<Array<CatalogueCategoryPropertyCatalogueCategoryPropertyGroupsContainsPropertyUpdateFieldInput>>;
  defaultValue?: InputMaybe<Scalars['String']['input']>;
  isPropertyTypeCatalogueCategoryPropertyTypes?: InputMaybe<Array<CatalogueCategoryPropertyIsPropertyTypeCatalogueCategoryPropertyTypesUpdateFieldInput>>;
  listOfValues?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  uid?: InputMaybe<Scalars['String']['input']>;
  unit?: InputMaybe<CatalogueCategoryPropertyUnitUpdateFieldInput>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type CatalogueCategoryPropertyWhere = {
  AND?: InputMaybe<Array<CatalogueCategoryPropertyWhere>>;
  NOT?: InputMaybe<CatalogueCategoryPropertyWhere>;
  OR?: InputMaybe<Array<CatalogueCategoryPropertyWhere>>;
  catalogueCategoryPropertyGroupsContainsPropertyAggregate?: InputMaybe<CatalogueCategoryPropertyCatalogueCategoryPropertyGroupsContainsPropertyAggregateInput>;
  /** Return CatalogueCategoryProperties where all of the related CatalogueCategoryPropertyCatalogueCategoryPropertyGroupsContainsPropertyConnections match this filter */
  catalogueCategoryPropertyGroupsContainsPropertyConnection_ALL?: InputMaybe<CatalogueCategoryPropertyCatalogueCategoryPropertyGroupsContainsPropertyConnectionWhere>;
  /** Return CatalogueCategoryProperties where none of the related CatalogueCategoryPropertyCatalogueCategoryPropertyGroupsContainsPropertyConnections match this filter */
  catalogueCategoryPropertyGroupsContainsPropertyConnection_NONE?: InputMaybe<CatalogueCategoryPropertyCatalogueCategoryPropertyGroupsContainsPropertyConnectionWhere>;
  /** Return CatalogueCategoryProperties where one of the related CatalogueCategoryPropertyCatalogueCategoryPropertyGroupsContainsPropertyConnections match this filter */
  catalogueCategoryPropertyGroupsContainsPropertyConnection_SINGLE?: InputMaybe<CatalogueCategoryPropertyCatalogueCategoryPropertyGroupsContainsPropertyConnectionWhere>;
  /** Return CatalogueCategoryProperties where some of the related CatalogueCategoryPropertyCatalogueCategoryPropertyGroupsContainsPropertyConnections match this filter */
  catalogueCategoryPropertyGroupsContainsPropertyConnection_SOME?: InputMaybe<CatalogueCategoryPropertyCatalogueCategoryPropertyGroupsContainsPropertyConnectionWhere>;
  /** Return CatalogueCategoryProperties where all of the related CatalogueCategoryPropertyGroups match this filter */
  catalogueCategoryPropertyGroupsContainsProperty_ALL?: InputMaybe<CatalogueCategoryPropertyGroupWhere>;
  /** Return CatalogueCategoryProperties where none of the related CatalogueCategoryPropertyGroups match this filter */
  catalogueCategoryPropertyGroupsContainsProperty_NONE?: InputMaybe<CatalogueCategoryPropertyGroupWhere>;
  /** Return CatalogueCategoryProperties where one of the related CatalogueCategoryPropertyGroups match this filter */
  catalogueCategoryPropertyGroupsContainsProperty_SINGLE?: InputMaybe<CatalogueCategoryPropertyGroupWhere>;
  /** Return CatalogueCategoryProperties where some of the related CatalogueCategoryPropertyGroups match this filter */
  catalogueCategoryPropertyGroupsContainsProperty_SOME?: InputMaybe<CatalogueCategoryPropertyGroupWhere>;
  defaultValue?: InputMaybe<Scalars['String']['input']>;
  defaultValue_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  defaultValue_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  defaultValue_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  defaultValue_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  isPropertyTypeCatalogueCategoryPropertyTypesAggregate?: InputMaybe<CatalogueCategoryPropertyIsPropertyTypeCatalogueCategoryPropertyTypesAggregateInput>;
  /** Return CatalogueCategoryProperties where all of the related CatalogueCategoryPropertyIsPropertyTypeCatalogueCategoryPropertyTypesConnections match this filter */
  isPropertyTypeCatalogueCategoryPropertyTypesConnection_ALL?: InputMaybe<CatalogueCategoryPropertyIsPropertyTypeCatalogueCategoryPropertyTypesConnectionWhere>;
  /** Return CatalogueCategoryProperties where none of the related CatalogueCategoryPropertyIsPropertyTypeCatalogueCategoryPropertyTypesConnections match this filter */
  isPropertyTypeCatalogueCategoryPropertyTypesConnection_NONE?: InputMaybe<CatalogueCategoryPropertyIsPropertyTypeCatalogueCategoryPropertyTypesConnectionWhere>;
  /** Return CatalogueCategoryProperties where one of the related CatalogueCategoryPropertyIsPropertyTypeCatalogueCategoryPropertyTypesConnections match this filter */
  isPropertyTypeCatalogueCategoryPropertyTypesConnection_SINGLE?: InputMaybe<CatalogueCategoryPropertyIsPropertyTypeCatalogueCategoryPropertyTypesConnectionWhere>;
  /** Return CatalogueCategoryProperties where some of the related CatalogueCategoryPropertyIsPropertyTypeCatalogueCategoryPropertyTypesConnections match this filter */
  isPropertyTypeCatalogueCategoryPropertyTypesConnection_SOME?: InputMaybe<CatalogueCategoryPropertyIsPropertyTypeCatalogueCategoryPropertyTypesConnectionWhere>;
  /** Return CatalogueCategoryProperties where all of the related CatalogueCategoryPropertyTypes match this filter */
  isPropertyTypeCatalogueCategoryPropertyTypes_ALL?: InputMaybe<CatalogueCategoryPropertyTypeWhere>;
  /** Return CatalogueCategoryProperties where none of the related CatalogueCategoryPropertyTypes match this filter */
  isPropertyTypeCatalogueCategoryPropertyTypes_NONE?: InputMaybe<CatalogueCategoryPropertyTypeWhere>;
  /** Return CatalogueCategoryProperties where one of the related CatalogueCategoryPropertyTypes match this filter */
  isPropertyTypeCatalogueCategoryPropertyTypes_SINGLE?: InputMaybe<CatalogueCategoryPropertyTypeWhere>;
  /** Return CatalogueCategoryProperties where some of the related CatalogueCategoryPropertyTypes match this filter */
  isPropertyTypeCatalogueCategoryPropertyTypes_SOME?: InputMaybe<CatalogueCategoryPropertyTypeWhere>;
  listOfValues?: InputMaybe<Scalars['String']['input']>;
  listOfValues_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  listOfValues_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  listOfValues_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  listOfValues_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  uid?: InputMaybe<Scalars['String']['input']>;
  uid_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  uid_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  uid_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  uid_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  unit?: InputMaybe<UnitWhere>;
  unitAggregate?: InputMaybe<CatalogueCategoryPropertyUnitAggregateInput>;
  unitConnection?: InputMaybe<CatalogueCategoryPropertyUnitConnectionWhere>;
  unitConnection_NOT?: InputMaybe<CatalogueCategoryPropertyUnitConnectionWhere>;
  unit_NOT?: InputMaybe<UnitWhere>;
  value?: InputMaybe<Scalars['String']['input']>;
  value_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  value_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  value_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  value_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
};

export type CatalogueCategoryRelationInput = {
  catalogueCategoriesHasSubcategory?: InputMaybe<Array<CatalogueCategoryCatalogueCategoriesHasSubcategoryCreateFieldInput>>;
  catalogueItemsBelongsToCategory?: InputMaybe<Array<CatalogueCategoryCatalogueItemsBelongsToCategoryCreateFieldInput>>;
  hasGroupCatalogueCategoryPropertyGroups?: InputMaybe<Array<CatalogueCategoryHasGroupCatalogueCategoryPropertyGroupsCreateFieldInput>>;
  hasSubcategoryCatalogueCategories?: InputMaybe<Array<CatalogueCategoryHasSubcategoryCatalogueCategoriesCreateFieldInput>>;
  parentCategory?: InputMaybe<CatalogueCategoryParentCategoryCreateFieldInput>;
  systemType?: InputMaybe<CatalogueCategorySystemTypeCreateFieldInput>;
};

/** Fields to sort CatalogueCategories by. The order in which sorts are applied is not guaranteed when specifying many fields in one CatalogueCategorySort object. */
export type CatalogueCategorySort = {
  code?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  uid?: InputMaybe<SortDirection>;
};

export type CatalogueCategorySystemTypeAggregateInput = {
  AND?: InputMaybe<Array<CatalogueCategorySystemTypeAggregateInput>>;
  NOT?: InputMaybe<CatalogueCategorySystemTypeAggregateInput>;
  OR?: InputMaybe<Array<CatalogueCategorySystemTypeAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<CatalogueCategorySystemTypeNodeAggregationWhereInput>;
};

export type CatalogueCategorySystemTypeConnectFieldInput = {
  connect?: InputMaybe<SystemTypeConnectInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<SystemTypeConnectWhere>;
};

export type CatalogueCategorySystemTypeConnection = {
  __typename?: 'CatalogueCategorySystemTypeConnection';
  edges: Array<CatalogueCategorySystemTypeRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type CatalogueCategorySystemTypeConnectionSort = {
  node?: InputMaybe<SystemTypeSort>;
};

export type CatalogueCategorySystemTypeConnectionWhere = {
  AND?: InputMaybe<Array<CatalogueCategorySystemTypeConnectionWhere>>;
  NOT?: InputMaybe<CatalogueCategorySystemTypeConnectionWhere>;
  OR?: InputMaybe<Array<CatalogueCategorySystemTypeConnectionWhere>>;
  node?: InputMaybe<SystemTypeWhere>;
};

export type CatalogueCategorySystemTypeCreateFieldInput = {
  node: SystemTypeCreateInput;
};

export type CatalogueCategorySystemTypeDeleteFieldInput = {
  delete?: InputMaybe<SystemTypeDeleteInput>;
  where?: InputMaybe<CatalogueCategorySystemTypeConnectionWhere>;
};

export type CatalogueCategorySystemTypeDisconnectFieldInput = {
  disconnect?: InputMaybe<SystemTypeDisconnectInput>;
  where?: InputMaybe<CatalogueCategorySystemTypeConnectionWhere>;
};

export type CatalogueCategorySystemTypeFieldInput = {
  connect?: InputMaybe<CatalogueCategorySystemTypeConnectFieldInput>;
  create?: InputMaybe<CatalogueCategorySystemTypeCreateFieldInput>;
};

export type CatalogueCategorySystemTypeNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<CatalogueCategorySystemTypeNodeAggregationWhereInput>>;
  NOT?: InputMaybe<CatalogueCategorySystemTypeNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<CatalogueCategorySystemTypeNodeAggregationWhereInput>>;
  code_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  code_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  mask_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  mask_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  mask_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  mask_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  mask_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  mask_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  mask_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  mask_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  mask_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  mask_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  mask_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  mask_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  mask_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  mask_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  mask_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type CatalogueCategorySystemTypeRelationship = {
  __typename?: 'CatalogueCategorySystemTypeRelationship';
  cursor: Scalars['String']['output'];
  node: SystemType;
};

export type CatalogueCategorySystemTypeSystemTypeAggregationSelection = {
  __typename?: 'CatalogueCategorySystemTypeSystemTypeAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<CatalogueCategorySystemTypeSystemTypeNodeAggregateSelection>;
};

export type CatalogueCategorySystemTypeSystemTypeNodeAggregateSelection = {
  __typename?: 'CatalogueCategorySystemTypeSystemTypeNodeAggregateSelection';
  code: StringAggregateSelectionNonNullable;
  mask: StringAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  uid: IdAggregateSelectionNonNullable;
};

export type CatalogueCategorySystemTypeUpdateConnectionInput = {
  node?: InputMaybe<SystemTypeUpdateInput>;
};

export type CatalogueCategorySystemTypeUpdateFieldInput = {
  connect?: InputMaybe<CatalogueCategorySystemTypeConnectFieldInput>;
  create?: InputMaybe<CatalogueCategorySystemTypeCreateFieldInput>;
  delete?: InputMaybe<CatalogueCategorySystemTypeDeleteFieldInput>;
  disconnect?: InputMaybe<CatalogueCategorySystemTypeDisconnectFieldInput>;
  update?: InputMaybe<CatalogueCategorySystemTypeUpdateConnectionInput>;
  where?: InputMaybe<CatalogueCategorySystemTypeConnectionWhere>;
};

export type CatalogueCategoryUpdateInput = {
  catalogueCategoriesHasSubcategory?: InputMaybe<Array<CatalogueCategoryCatalogueCategoriesHasSubcategoryUpdateFieldInput>>;
  catalogueItemsBelongsToCategory?: InputMaybe<Array<CatalogueCategoryCatalogueItemsBelongsToCategoryUpdateFieldInput>>;
  code?: InputMaybe<Scalars['String']['input']>;
  hasGroupCatalogueCategoryPropertyGroups?: InputMaybe<Array<CatalogueCategoryHasGroupCatalogueCategoryPropertyGroupsUpdateFieldInput>>;
  hasSubcategoryCatalogueCategories?: InputMaybe<Array<CatalogueCategoryHasSubcategoryCatalogueCategoriesUpdateFieldInput>>;
  name?: InputMaybe<Scalars['String']['input']>;
  parentCategory?: InputMaybe<CatalogueCategoryParentCategoryUpdateFieldInput>;
  systemType?: InputMaybe<CatalogueCategorySystemTypeUpdateFieldInput>;
};

export type CatalogueCategoryWhere = {
  AND?: InputMaybe<Array<CatalogueCategoryWhere>>;
  NOT?: InputMaybe<CatalogueCategoryWhere>;
  OR?: InputMaybe<Array<CatalogueCategoryWhere>>;
  catalogueCategoriesHasSubcategoryAggregate?: InputMaybe<CatalogueCategoryCatalogueCategoriesHasSubcategoryAggregateInput>;
  /** Return CatalogueCategories where all of the related CatalogueCategoryCatalogueCategoriesHasSubcategoryConnections match this filter */
  catalogueCategoriesHasSubcategoryConnection_ALL?: InputMaybe<CatalogueCategoryCatalogueCategoriesHasSubcategoryConnectionWhere>;
  /** Return CatalogueCategories where none of the related CatalogueCategoryCatalogueCategoriesHasSubcategoryConnections match this filter */
  catalogueCategoriesHasSubcategoryConnection_NONE?: InputMaybe<CatalogueCategoryCatalogueCategoriesHasSubcategoryConnectionWhere>;
  /** Return CatalogueCategories where one of the related CatalogueCategoryCatalogueCategoriesHasSubcategoryConnections match this filter */
  catalogueCategoriesHasSubcategoryConnection_SINGLE?: InputMaybe<CatalogueCategoryCatalogueCategoriesHasSubcategoryConnectionWhere>;
  /** Return CatalogueCategories where some of the related CatalogueCategoryCatalogueCategoriesHasSubcategoryConnections match this filter */
  catalogueCategoriesHasSubcategoryConnection_SOME?: InputMaybe<CatalogueCategoryCatalogueCategoriesHasSubcategoryConnectionWhere>;
  /** Return CatalogueCategories where all of the related CatalogueCategories match this filter */
  catalogueCategoriesHasSubcategory_ALL?: InputMaybe<CatalogueCategoryWhere>;
  /** Return CatalogueCategories where none of the related CatalogueCategories match this filter */
  catalogueCategoriesHasSubcategory_NONE?: InputMaybe<CatalogueCategoryWhere>;
  /** Return CatalogueCategories where one of the related CatalogueCategories match this filter */
  catalogueCategoriesHasSubcategory_SINGLE?: InputMaybe<CatalogueCategoryWhere>;
  /** Return CatalogueCategories where some of the related CatalogueCategories match this filter */
  catalogueCategoriesHasSubcategory_SOME?: InputMaybe<CatalogueCategoryWhere>;
  catalogueItemsBelongsToCategoryAggregate?: InputMaybe<CatalogueCategoryCatalogueItemsBelongsToCategoryAggregateInput>;
  /** Return CatalogueCategories where all of the related CatalogueCategoryCatalogueItemsBelongsToCategoryConnections match this filter */
  catalogueItemsBelongsToCategoryConnection_ALL?: InputMaybe<CatalogueCategoryCatalogueItemsBelongsToCategoryConnectionWhere>;
  /** Return CatalogueCategories where none of the related CatalogueCategoryCatalogueItemsBelongsToCategoryConnections match this filter */
  catalogueItemsBelongsToCategoryConnection_NONE?: InputMaybe<CatalogueCategoryCatalogueItemsBelongsToCategoryConnectionWhere>;
  /** Return CatalogueCategories where one of the related CatalogueCategoryCatalogueItemsBelongsToCategoryConnections match this filter */
  catalogueItemsBelongsToCategoryConnection_SINGLE?: InputMaybe<CatalogueCategoryCatalogueItemsBelongsToCategoryConnectionWhere>;
  /** Return CatalogueCategories where some of the related CatalogueCategoryCatalogueItemsBelongsToCategoryConnections match this filter */
  catalogueItemsBelongsToCategoryConnection_SOME?: InputMaybe<CatalogueCategoryCatalogueItemsBelongsToCategoryConnectionWhere>;
  /** Return CatalogueCategories where all of the related CatalogueItems match this filter */
  catalogueItemsBelongsToCategory_ALL?: InputMaybe<CatalogueItemWhere>;
  /** Return CatalogueCategories where none of the related CatalogueItems match this filter */
  catalogueItemsBelongsToCategory_NONE?: InputMaybe<CatalogueItemWhere>;
  /** Return CatalogueCategories where one of the related CatalogueItems match this filter */
  catalogueItemsBelongsToCategory_SINGLE?: InputMaybe<CatalogueItemWhere>;
  /** Return CatalogueCategories where some of the related CatalogueItems match this filter */
  catalogueItemsBelongsToCategory_SOME?: InputMaybe<CatalogueItemWhere>;
  code?: InputMaybe<Scalars['String']['input']>;
  code_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  code_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  code_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  code_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  hasGroupCatalogueCategoryPropertyGroupsAggregate?: InputMaybe<CatalogueCategoryHasGroupCatalogueCategoryPropertyGroupsAggregateInput>;
  /** Return CatalogueCategories where all of the related CatalogueCategoryHasGroupCatalogueCategoryPropertyGroupsConnections match this filter */
  hasGroupCatalogueCategoryPropertyGroupsConnection_ALL?: InputMaybe<CatalogueCategoryHasGroupCatalogueCategoryPropertyGroupsConnectionWhere>;
  /** Return CatalogueCategories where none of the related CatalogueCategoryHasGroupCatalogueCategoryPropertyGroupsConnections match this filter */
  hasGroupCatalogueCategoryPropertyGroupsConnection_NONE?: InputMaybe<CatalogueCategoryHasGroupCatalogueCategoryPropertyGroupsConnectionWhere>;
  /** Return CatalogueCategories where one of the related CatalogueCategoryHasGroupCatalogueCategoryPropertyGroupsConnections match this filter */
  hasGroupCatalogueCategoryPropertyGroupsConnection_SINGLE?: InputMaybe<CatalogueCategoryHasGroupCatalogueCategoryPropertyGroupsConnectionWhere>;
  /** Return CatalogueCategories where some of the related CatalogueCategoryHasGroupCatalogueCategoryPropertyGroupsConnections match this filter */
  hasGroupCatalogueCategoryPropertyGroupsConnection_SOME?: InputMaybe<CatalogueCategoryHasGroupCatalogueCategoryPropertyGroupsConnectionWhere>;
  /** Return CatalogueCategories where all of the related CatalogueCategoryPropertyGroups match this filter */
  hasGroupCatalogueCategoryPropertyGroups_ALL?: InputMaybe<CatalogueCategoryPropertyGroupWhere>;
  /** Return CatalogueCategories where none of the related CatalogueCategoryPropertyGroups match this filter */
  hasGroupCatalogueCategoryPropertyGroups_NONE?: InputMaybe<CatalogueCategoryPropertyGroupWhere>;
  /** Return CatalogueCategories where one of the related CatalogueCategoryPropertyGroups match this filter */
  hasGroupCatalogueCategoryPropertyGroups_SINGLE?: InputMaybe<CatalogueCategoryPropertyGroupWhere>;
  /** Return CatalogueCategories where some of the related CatalogueCategoryPropertyGroups match this filter */
  hasGroupCatalogueCategoryPropertyGroups_SOME?: InputMaybe<CatalogueCategoryPropertyGroupWhere>;
  hasSubcategoryCatalogueCategoriesAggregate?: InputMaybe<CatalogueCategoryHasSubcategoryCatalogueCategoriesAggregateInput>;
  /** Return CatalogueCategories where all of the related CatalogueCategoryHasSubcategoryCatalogueCategoriesConnections match this filter */
  hasSubcategoryCatalogueCategoriesConnection_ALL?: InputMaybe<CatalogueCategoryHasSubcategoryCatalogueCategoriesConnectionWhere>;
  /** Return CatalogueCategories where none of the related CatalogueCategoryHasSubcategoryCatalogueCategoriesConnections match this filter */
  hasSubcategoryCatalogueCategoriesConnection_NONE?: InputMaybe<CatalogueCategoryHasSubcategoryCatalogueCategoriesConnectionWhere>;
  /** Return CatalogueCategories where one of the related CatalogueCategoryHasSubcategoryCatalogueCategoriesConnections match this filter */
  hasSubcategoryCatalogueCategoriesConnection_SINGLE?: InputMaybe<CatalogueCategoryHasSubcategoryCatalogueCategoriesConnectionWhere>;
  /** Return CatalogueCategories where some of the related CatalogueCategoryHasSubcategoryCatalogueCategoriesConnections match this filter */
  hasSubcategoryCatalogueCategoriesConnection_SOME?: InputMaybe<CatalogueCategoryHasSubcategoryCatalogueCategoriesConnectionWhere>;
  /** Return CatalogueCategories where all of the related CatalogueCategories match this filter */
  hasSubcategoryCatalogueCategories_ALL?: InputMaybe<CatalogueCategoryWhere>;
  /** Return CatalogueCategories where none of the related CatalogueCategories match this filter */
  hasSubcategoryCatalogueCategories_NONE?: InputMaybe<CatalogueCategoryWhere>;
  /** Return CatalogueCategories where one of the related CatalogueCategories match this filter */
  hasSubcategoryCatalogueCategories_SINGLE?: InputMaybe<CatalogueCategoryWhere>;
  /** Return CatalogueCategories where some of the related CatalogueCategories match this filter */
  hasSubcategoryCatalogueCategories_SOME?: InputMaybe<CatalogueCategoryWhere>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  parentCategory?: InputMaybe<CatalogueCategoryWhere>;
  parentCategoryAggregate?: InputMaybe<CatalogueCategoryParentCategoryAggregateInput>;
  parentCategoryConnection?: InputMaybe<CatalogueCategoryParentCategoryConnectionWhere>;
  parentCategoryConnection_NOT?: InputMaybe<CatalogueCategoryParentCategoryConnectionWhere>;
  parentCategory_NOT?: InputMaybe<CatalogueCategoryWhere>;
  systemType?: InputMaybe<SystemTypeWhere>;
  systemTypeAggregate?: InputMaybe<CatalogueCategorySystemTypeAggregateInput>;
  systemTypeConnection?: InputMaybe<CatalogueCategorySystemTypeConnectionWhere>;
  systemTypeConnection_NOT?: InputMaybe<CatalogueCategorySystemTypeConnectionWhere>;
  systemType_NOT?: InputMaybe<SystemTypeWhere>;
  uid?: InputMaybe<Scalars['ID']['input']>;
  uid_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  uid_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  uid_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  uid_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
};

export type CatalogueItem = {
  __typename?: 'CatalogueItem';
  catalogueCategory: CatalogueCategory;
  catalogueCategoryAggregate?: Maybe<CatalogueItemCatalogueCategoryCatalogueCategoryAggregationSelection>;
  catalogueCategoryConnection: CatalogueItemCatalogueCategoryConnection;
  catalogueNumber: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  item?: Maybe<Item>;
  itemAggregate?: Maybe<CatalogueItemItemItemAggregationSelection>;
  itemConnection: CatalogueItemItemConnection;
  manufacturerUrl: Scalars['String']['output'];
  name: Scalars['String']['output'];
  properties: Array<CatalogueCategoryProperty>;
  propertiesAggregate?: Maybe<CatalogueItemCatalogueCategoryPropertyPropertiesAggregationSelection>;
  propertiesConnection: CatalogueItemPropertiesConnection;
  supplier?: Maybe<Supplier>;
  supplierAggregate?: Maybe<CatalogueItemSupplierSupplierAggregationSelection>;
  supplierConnection: CatalogueItemSupplierConnection;
  uid: Scalars['String']['output'];
};


export type CatalogueItemCatalogueCategoryArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<CatalogueCategoryOptions>;
  where?: InputMaybe<CatalogueCategoryWhere>;
};


export type CatalogueItemCatalogueCategoryAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<CatalogueCategoryWhere>;
};


export type CatalogueItemCatalogueCategoryConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<CatalogueItemCatalogueCategoryConnectionSort>>;
  where?: InputMaybe<CatalogueItemCatalogueCategoryConnectionWhere>;
};


export type CatalogueItemItemArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<ItemOptions>;
  where?: InputMaybe<ItemWhere>;
};


export type CatalogueItemItemAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ItemWhere>;
};


export type CatalogueItemItemConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<CatalogueItemItemConnectionSort>>;
  where?: InputMaybe<CatalogueItemItemConnectionWhere>;
};


export type CatalogueItemPropertiesArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<CatalogueCategoryPropertyOptions>;
  where?: InputMaybe<CatalogueCategoryPropertyWhere>;
};


export type CatalogueItemPropertiesAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<CatalogueCategoryPropertyWhere>;
};


export type CatalogueItemPropertiesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<CatalogueItemPropertiesConnectionSort>>;
  where?: InputMaybe<CatalogueItemPropertiesConnectionWhere>;
};


export type CatalogueItemSupplierArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<SupplierOptions>;
  where?: InputMaybe<SupplierWhere>;
};


export type CatalogueItemSupplierAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<SupplierWhere>;
};


export type CatalogueItemSupplierConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<CatalogueItemSupplierConnectionSort>>;
  where?: InputMaybe<CatalogueItemSupplierConnectionWhere>;
};

export type CatalogueItemAggregateSelection = {
  __typename?: 'CatalogueItemAggregateSelection';
  catalogueNumber: StringAggregateSelectionNonNullable;
  count: Scalars['Int']['output'];
  description: StringAggregateSelectionNullable;
  manufacturerUrl: StringAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  uid: StringAggregateSelectionNonNullable;
};

export type CatalogueItemCatalogueCategoryAggregateInput = {
  AND?: InputMaybe<Array<CatalogueItemCatalogueCategoryAggregateInput>>;
  NOT?: InputMaybe<CatalogueItemCatalogueCategoryAggregateInput>;
  OR?: InputMaybe<Array<CatalogueItemCatalogueCategoryAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<CatalogueItemCatalogueCategoryNodeAggregationWhereInput>;
};

export type CatalogueItemCatalogueCategoryCatalogueCategoryAggregationSelection = {
  __typename?: 'CatalogueItemCatalogueCategoryCatalogueCategoryAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<CatalogueItemCatalogueCategoryCatalogueCategoryNodeAggregateSelection>;
};

export type CatalogueItemCatalogueCategoryCatalogueCategoryNodeAggregateSelection = {
  __typename?: 'CatalogueItemCatalogueCategoryCatalogueCategoryNodeAggregateSelection';
  code: StringAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  uid: IdAggregateSelectionNonNullable;
};

export type CatalogueItemCatalogueCategoryConnectFieldInput = {
  connect?: InputMaybe<CatalogueCategoryConnectInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<CatalogueCategoryConnectWhere>;
};

export type CatalogueItemCatalogueCategoryConnection = {
  __typename?: 'CatalogueItemCatalogueCategoryConnection';
  edges: Array<CatalogueItemCatalogueCategoryRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type CatalogueItemCatalogueCategoryConnectionSort = {
  node?: InputMaybe<CatalogueCategorySort>;
};

export type CatalogueItemCatalogueCategoryConnectionWhere = {
  AND?: InputMaybe<Array<CatalogueItemCatalogueCategoryConnectionWhere>>;
  NOT?: InputMaybe<CatalogueItemCatalogueCategoryConnectionWhere>;
  OR?: InputMaybe<Array<CatalogueItemCatalogueCategoryConnectionWhere>>;
  node?: InputMaybe<CatalogueCategoryWhere>;
};

export type CatalogueItemCatalogueCategoryCreateFieldInput = {
  node: CatalogueCategoryCreateInput;
};

export type CatalogueItemCatalogueCategoryDeleteFieldInput = {
  delete?: InputMaybe<CatalogueCategoryDeleteInput>;
  where?: InputMaybe<CatalogueItemCatalogueCategoryConnectionWhere>;
};

export type CatalogueItemCatalogueCategoryDisconnectFieldInput = {
  disconnect?: InputMaybe<CatalogueCategoryDisconnectInput>;
  where?: InputMaybe<CatalogueItemCatalogueCategoryConnectionWhere>;
};

export type CatalogueItemCatalogueCategoryFieldInput = {
  connect?: InputMaybe<CatalogueItemCatalogueCategoryConnectFieldInput>;
  create?: InputMaybe<CatalogueItemCatalogueCategoryCreateFieldInput>;
};

export type CatalogueItemCatalogueCategoryNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<CatalogueItemCatalogueCategoryNodeAggregationWhereInput>>;
  NOT?: InputMaybe<CatalogueItemCatalogueCategoryNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<CatalogueItemCatalogueCategoryNodeAggregationWhereInput>>;
  code_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  code_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type CatalogueItemCatalogueCategoryPropertyPropertiesAggregationSelection = {
  __typename?: 'CatalogueItemCatalogueCategoryPropertyPropertiesAggregationSelection';
  count: Scalars['Int']['output'];
  edge?: Maybe<CatalogueItemCatalogueCategoryPropertyPropertiesEdgeAggregateSelection>;
  node?: Maybe<CatalogueItemCatalogueCategoryPropertyPropertiesNodeAggregateSelection>;
};

export type CatalogueItemCatalogueCategoryPropertyPropertiesEdgeAggregateSelection = {
  __typename?: 'CatalogueItemCatalogueCategoryPropertyPropertiesEdgeAggregateSelection';
  value: StringAggregateSelectionNullable;
};

export type CatalogueItemCatalogueCategoryPropertyPropertiesNodeAggregateSelection = {
  __typename?: 'CatalogueItemCatalogueCategoryPropertyPropertiesNodeAggregateSelection';
  defaultValue: StringAggregateSelectionNonNullable;
  listOfValues: StringAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  uid: StringAggregateSelectionNonNullable;
  value: StringAggregateSelectionNullable;
};

export type CatalogueItemCatalogueCategoryRelationship = {
  __typename?: 'CatalogueItemCatalogueCategoryRelationship';
  cursor: Scalars['String']['output'];
  node: CatalogueCategory;
};

export type CatalogueItemCatalogueCategoryUpdateConnectionInput = {
  node?: InputMaybe<CatalogueCategoryUpdateInput>;
};

export type CatalogueItemCatalogueCategoryUpdateFieldInput = {
  connect?: InputMaybe<CatalogueItemCatalogueCategoryConnectFieldInput>;
  create?: InputMaybe<CatalogueItemCatalogueCategoryCreateFieldInput>;
  delete?: InputMaybe<CatalogueItemCatalogueCategoryDeleteFieldInput>;
  disconnect?: InputMaybe<CatalogueItemCatalogueCategoryDisconnectFieldInput>;
  update?: InputMaybe<CatalogueItemCatalogueCategoryUpdateConnectionInput>;
  where?: InputMaybe<CatalogueItemCatalogueCategoryConnectionWhere>;
};

export type CatalogueItemConnectInput = {
  catalogueCategory?: InputMaybe<CatalogueItemCatalogueCategoryConnectFieldInput>;
  item?: InputMaybe<CatalogueItemItemConnectFieldInput>;
  properties?: InputMaybe<Array<CatalogueItemPropertiesConnectFieldInput>>;
  supplier?: InputMaybe<CatalogueItemSupplierConnectFieldInput>;
};

export type CatalogueItemConnectWhere = {
  node: CatalogueItemWhere;
};

export type CatalogueItemCreateInput = {
  catalogueCategory?: InputMaybe<CatalogueItemCatalogueCategoryFieldInput>;
  catalogueNumber: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  item?: InputMaybe<CatalogueItemItemFieldInput>;
  manufacturerUrl: Scalars['String']['input'];
  name: Scalars['String']['input'];
  properties?: InputMaybe<CatalogueItemPropertiesFieldInput>;
  supplier?: InputMaybe<CatalogueItemSupplierFieldInput>;
  uid: Scalars['String']['input'];
};

export type CatalogueItemDeleteInput = {
  catalogueCategory?: InputMaybe<CatalogueItemCatalogueCategoryDeleteFieldInput>;
  item?: InputMaybe<CatalogueItemItemDeleteFieldInput>;
  properties?: InputMaybe<Array<CatalogueItemPropertiesDeleteFieldInput>>;
  supplier?: InputMaybe<CatalogueItemSupplierDeleteFieldInput>;
};

export type CatalogueItemDisconnectInput = {
  catalogueCategory?: InputMaybe<CatalogueItemCatalogueCategoryDisconnectFieldInput>;
  item?: InputMaybe<CatalogueItemItemDisconnectFieldInput>;
  properties?: InputMaybe<Array<CatalogueItemPropertiesDisconnectFieldInput>>;
  supplier?: InputMaybe<CatalogueItemSupplierDisconnectFieldInput>;
};

export type CatalogueItemEdge = {
  __typename?: 'CatalogueItemEdge';
  cursor: Scalars['String']['output'];
  node: CatalogueItem;
};

export type CatalogueItemItemAggregateInput = {
  AND?: InputMaybe<Array<CatalogueItemItemAggregateInput>>;
  NOT?: InputMaybe<CatalogueItemItemAggregateInput>;
  OR?: InputMaybe<Array<CatalogueItemItemAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<CatalogueItemItemNodeAggregationWhereInput>;
};

export type CatalogueItemItemConnectFieldInput = {
  connect?: InputMaybe<ItemConnectInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<ItemConnectWhere>;
};

export type CatalogueItemItemConnection = {
  __typename?: 'CatalogueItemItemConnection';
  edges: Array<CatalogueItemItemRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type CatalogueItemItemConnectionSort = {
  node?: InputMaybe<ItemSort>;
};

export type CatalogueItemItemConnectionWhere = {
  AND?: InputMaybe<Array<CatalogueItemItemConnectionWhere>>;
  NOT?: InputMaybe<CatalogueItemItemConnectionWhere>;
  OR?: InputMaybe<Array<CatalogueItemItemConnectionWhere>>;
  node?: InputMaybe<ItemWhere>;
};

export type CatalogueItemItemCreateFieldInput = {
  node: ItemCreateInput;
};

export type CatalogueItemItemDeleteFieldInput = {
  delete?: InputMaybe<ItemDeleteInput>;
  where?: InputMaybe<CatalogueItemItemConnectionWhere>;
};

export type CatalogueItemItemDisconnectFieldInput = {
  disconnect?: InputMaybe<ItemDisconnectInput>;
  where?: InputMaybe<CatalogueItemItemConnectionWhere>;
};

export type CatalogueItemItemFieldInput = {
  connect?: InputMaybe<CatalogueItemItemConnectFieldInput>;
  create?: InputMaybe<CatalogueItemItemCreateFieldInput>;
};

export type CatalogueItemItemItemAggregationSelection = {
  __typename?: 'CatalogueItemItemItemAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<CatalogueItemItemItemNodeAggregateSelection>;
};

export type CatalogueItemItemItemNodeAggregateSelection = {
  __typename?: 'CatalogueItemItemItemNodeAggregateSelection';
  eun: StringAggregateSelectionNullable;
  name: StringAggregateSelectionNonNullable;
  notes: StringAggregateSelectionNullable;
  serialNumber: StringAggregateSelectionNullable;
  uid: IdAggregateSelectionNonNullable;
};

export type CatalogueItemItemNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<CatalogueItemItemNodeAggregationWhereInput>>;
  NOT?: InputMaybe<CatalogueItemItemNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<CatalogueItemItemNodeAggregationWhereInput>>;
  eun_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  eun_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  eun_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  eun_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  eun_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  eun_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  eun_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  eun_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  eun_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  eun_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  eun_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  eun_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  eun_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  eun_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  eun_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  notes_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  notes_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  notes_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  notes_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  notes_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  notes_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  notes_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  notes_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  notes_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  notes_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  notes_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  notes_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  notes_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  notes_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  notes_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  serialNumber_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  serialNumber_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  serialNumber_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  serialNumber_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  serialNumber_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  serialNumber_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  serialNumber_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  serialNumber_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  serialNumber_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  serialNumber_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  serialNumber_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  serialNumber_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  serialNumber_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  serialNumber_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  serialNumber_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type CatalogueItemItemRelationship = {
  __typename?: 'CatalogueItemItemRelationship';
  cursor: Scalars['String']['output'];
  node: Item;
};

export type CatalogueItemItemUpdateConnectionInput = {
  node?: InputMaybe<ItemUpdateInput>;
};

export type CatalogueItemItemUpdateFieldInput = {
  connect?: InputMaybe<CatalogueItemItemConnectFieldInput>;
  create?: InputMaybe<CatalogueItemItemCreateFieldInput>;
  delete?: InputMaybe<CatalogueItemItemDeleteFieldInput>;
  disconnect?: InputMaybe<CatalogueItemItemDisconnectFieldInput>;
  update?: InputMaybe<CatalogueItemItemUpdateConnectionInput>;
  where?: InputMaybe<CatalogueItemItemConnectionWhere>;
};

export type CatalogueItemOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /** Specify one or more CatalogueItemSort objects to sort CatalogueItems by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<CatalogueItemSort>>;
};

export type CatalogueItemPropertiesAggregateInput = {
  AND?: InputMaybe<Array<CatalogueItemPropertiesAggregateInput>>;
  NOT?: InputMaybe<CatalogueItemPropertiesAggregateInput>;
  OR?: InputMaybe<Array<CatalogueItemPropertiesAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  edge?: InputMaybe<CatalogueItemPropertiesEdgeAggregationWhereInput>;
  node?: InputMaybe<CatalogueItemPropertiesNodeAggregationWhereInput>;
};

export type CatalogueItemPropertiesConnectFieldInput = {
  connect?: InputMaybe<Array<CatalogueCategoryPropertyConnectInput>>;
  edge?: InputMaybe<HasCataloguePropertyCreateInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<CatalogueCategoryPropertyConnectWhere>;
};

export type CatalogueItemPropertiesConnection = {
  __typename?: 'CatalogueItemPropertiesConnection';
  edges: Array<CatalogueItemPropertiesRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type CatalogueItemPropertiesConnectionSort = {
  edge?: InputMaybe<HasCataloguePropertySort>;
  node?: InputMaybe<CatalogueCategoryPropertySort>;
};

export type CatalogueItemPropertiesConnectionWhere = {
  AND?: InputMaybe<Array<CatalogueItemPropertiesConnectionWhere>>;
  NOT?: InputMaybe<CatalogueItemPropertiesConnectionWhere>;
  OR?: InputMaybe<Array<CatalogueItemPropertiesConnectionWhere>>;
  edge?: InputMaybe<HasCataloguePropertyWhere>;
  node?: InputMaybe<CatalogueCategoryPropertyWhere>;
};

export type CatalogueItemPropertiesCreateFieldInput = {
  edge?: InputMaybe<HasCataloguePropertyCreateInput>;
  node: CatalogueCategoryPropertyCreateInput;
};

export type CatalogueItemPropertiesDeleteFieldInput = {
  delete?: InputMaybe<CatalogueCategoryPropertyDeleteInput>;
  where?: InputMaybe<CatalogueItemPropertiesConnectionWhere>;
};

export type CatalogueItemPropertiesDisconnectFieldInput = {
  disconnect?: InputMaybe<CatalogueCategoryPropertyDisconnectInput>;
  where?: InputMaybe<CatalogueItemPropertiesConnectionWhere>;
};

export type CatalogueItemPropertiesEdgeAggregationWhereInput = {
  AND?: InputMaybe<Array<CatalogueItemPropertiesEdgeAggregationWhereInput>>;
  NOT?: InputMaybe<CatalogueItemPropertiesEdgeAggregationWhereInput>;
  OR?: InputMaybe<Array<CatalogueItemPropertiesEdgeAggregationWhereInput>>;
  value_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  value_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  value_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  value_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  value_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  value_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  value_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  value_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  value_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  value_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  value_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  value_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  value_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  value_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  value_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type CatalogueItemPropertiesFieldInput = {
  connect?: InputMaybe<Array<CatalogueItemPropertiesConnectFieldInput>>;
  create?: InputMaybe<Array<CatalogueItemPropertiesCreateFieldInput>>;
};

export type CatalogueItemPropertiesNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<CatalogueItemPropertiesNodeAggregationWhereInput>>;
  NOT?: InputMaybe<CatalogueItemPropertiesNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<CatalogueItemPropertiesNodeAggregationWhereInput>>;
  defaultValue_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  defaultValue_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  defaultValue_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  defaultValue_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  defaultValue_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  defaultValue_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  defaultValue_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  defaultValue_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  defaultValue_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  defaultValue_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  defaultValue_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  defaultValue_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  defaultValue_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  defaultValue_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  defaultValue_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  listOfValues_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  listOfValues_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  listOfValues_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  listOfValues_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  listOfValues_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  listOfValues_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  listOfValues_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  listOfValues_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  listOfValues_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  listOfValues_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  listOfValues_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  listOfValues_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  listOfValues_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  listOfValues_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  listOfValues_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  uid_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  uid_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  uid_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  uid_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  uid_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  uid_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  uid_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  uid_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  uid_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  uid_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  value_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  value_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  value_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  value_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  value_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  value_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  value_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  value_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  value_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  value_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  value_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  value_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  value_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  value_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  value_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type CatalogueItemPropertiesRelationship = HasCatalogueProperty & {
  __typename?: 'CatalogueItemPropertiesRelationship';
  cursor: Scalars['String']['output'];
  node: CatalogueCategoryProperty;
  value?: Maybe<Scalars['String']['output']>;
};

export type CatalogueItemPropertiesUpdateConnectionInput = {
  edge?: InputMaybe<HasCataloguePropertyUpdateInput>;
  node?: InputMaybe<CatalogueCategoryPropertyUpdateInput>;
};

export type CatalogueItemPropertiesUpdateFieldInput = {
  connect?: InputMaybe<Array<CatalogueItemPropertiesConnectFieldInput>>;
  create?: InputMaybe<Array<CatalogueItemPropertiesCreateFieldInput>>;
  delete?: InputMaybe<Array<CatalogueItemPropertiesDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<CatalogueItemPropertiesDisconnectFieldInput>>;
  update?: InputMaybe<CatalogueItemPropertiesUpdateConnectionInput>;
  where?: InputMaybe<CatalogueItemPropertiesConnectionWhere>;
};

export type CatalogueItemRelationInput = {
  catalogueCategory?: InputMaybe<CatalogueItemCatalogueCategoryCreateFieldInput>;
  item?: InputMaybe<CatalogueItemItemCreateFieldInput>;
  properties?: InputMaybe<Array<CatalogueItemPropertiesCreateFieldInput>>;
  supplier?: InputMaybe<CatalogueItemSupplierCreateFieldInput>;
};

/** Fields to sort CatalogueItems by. The order in which sorts are applied is not guaranteed when specifying many fields in one CatalogueItemSort object. */
export type CatalogueItemSort = {
  catalogueNumber?: InputMaybe<SortDirection>;
  description?: InputMaybe<SortDirection>;
  manufacturerUrl?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  uid?: InputMaybe<SortDirection>;
};

export type CatalogueItemSupplierAggregateInput = {
  AND?: InputMaybe<Array<CatalogueItemSupplierAggregateInput>>;
  NOT?: InputMaybe<CatalogueItemSupplierAggregateInput>;
  OR?: InputMaybe<Array<CatalogueItemSupplierAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<CatalogueItemSupplierNodeAggregationWhereInput>;
};

export type CatalogueItemSupplierConnectFieldInput = {
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<SupplierConnectWhere>;
};

export type CatalogueItemSupplierConnection = {
  __typename?: 'CatalogueItemSupplierConnection';
  edges: Array<CatalogueItemSupplierRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type CatalogueItemSupplierConnectionSort = {
  node?: InputMaybe<SupplierSort>;
};

export type CatalogueItemSupplierConnectionWhere = {
  AND?: InputMaybe<Array<CatalogueItemSupplierConnectionWhere>>;
  NOT?: InputMaybe<CatalogueItemSupplierConnectionWhere>;
  OR?: InputMaybe<Array<CatalogueItemSupplierConnectionWhere>>;
  node?: InputMaybe<SupplierWhere>;
};

export type CatalogueItemSupplierCreateFieldInput = {
  node: SupplierCreateInput;
};

export type CatalogueItemSupplierDeleteFieldInput = {
  where?: InputMaybe<CatalogueItemSupplierConnectionWhere>;
};

export type CatalogueItemSupplierDisconnectFieldInput = {
  where?: InputMaybe<CatalogueItemSupplierConnectionWhere>;
};

export type CatalogueItemSupplierFieldInput = {
  connect?: InputMaybe<CatalogueItemSupplierConnectFieldInput>;
  create?: InputMaybe<CatalogueItemSupplierCreateFieldInput>;
};

export type CatalogueItemSupplierNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<CatalogueItemSupplierNodeAggregationWhereInput>>;
  NOT?: InputMaybe<CatalogueItemSupplierNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<CatalogueItemSupplierNodeAggregationWhereInput>>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type CatalogueItemSupplierRelationship = {
  __typename?: 'CatalogueItemSupplierRelationship';
  cursor: Scalars['String']['output'];
  node: Supplier;
};

export type CatalogueItemSupplierSupplierAggregationSelection = {
  __typename?: 'CatalogueItemSupplierSupplierAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<CatalogueItemSupplierSupplierNodeAggregateSelection>;
};

export type CatalogueItemSupplierSupplierNodeAggregateSelection = {
  __typename?: 'CatalogueItemSupplierSupplierNodeAggregateSelection';
  name: StringAggregateSelectionNonNullable;
  uid: IdAggregateSelectionNonNullable;
};

export type CatalogueItemSupplierUpdateConnectionInput = {
  node?: InputMaybe<SupplierUpdateInput>;
};

export type CatalogueItemSupplierUpdateFieldInput = {
  connect?: InputMaybe<CatalogueItemSupplierConnectFieldInput>;
  create?: InputMaybe<CatalogueItemSupplierCreateFieldInput>;
  delete?: InputMaybe<CatalogueItemSupplierDeleteFieldInput>;
  disconnect?: InputMaybe<CatalogueItemSupplierDisconnectFieldInput>;
  update?: InputMaybe<CatalogueItemSupplierUpdateConnectionInput>;
  where?: InputMaybe<CatalogueItemSupplierConnectionWhere>;
};

export type CatalogueItemUpdateInput = {
  catalogueCategory?: InputMaybe<CatalogueItemCatalogueCategoryUpdateFieldInput>;
  catalogueNumber?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  item?: InputMaybe<CatalogueItemItemUpdateFieldInput>;
  manufacturerUrl?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  properties?: InputMaybe<Array<CatalogueItemPropertiesUpdateFieldInput>>;
  supplier?: InputMaybe<CatalogueItemSupplierUpdateFieldInput>;
  uid?: InputMaybe<Scalars['String']['input']>;
};

export type CatalogueItemWhere = {
  AND?: InputMaybe<Array<CatalogueItemWhere>>;
  NOT?: InputMaybe<CatalogueItemWhere>;
  OR?: InputMaybe<Array<CatalogueItemWhere>>;
  catalogueCategory?: InputMaybe<CatalogueCategoryWhere>;
  catalogueCategoryAggregate?: InputMaybe<CatalogueItemCatalogueCategoryAggregateInput>;
  catalogueCategoryConnection?: InputMaybe<CatalogueItemCatalogueCategoryConnectionWhere>;
  catalogueCategoryConnection_NOT?: InputMaybe<CatalogueItemCatalogueCategoryConnectionWhere>;
  catalogueCategory_NOT?: InputMaybe<CatalogueCategoryWhere>;
  catalogueNumber?: InputMaybe<Scalars['String']['input']>;
  catalogueNumber_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  catalogueNumber_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  catalogueNumber_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  catalogueNumber_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  description_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  description_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  description_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  description_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  item?: InputMaybe<ItemWhere>;
  itemAggregate?: InputMaybe<CatalogueItemItemAggregateInput>;
  itemConnection?: InputMaybe<CatalogueItemItemConnectionWhere>;
  itemConnection_NOT?: InputMaybe<CatalogueItemItemConnectionWhere>;
  item_NOT?: InputMaybe<ItemWhere>;
  manufacturerUrl?: InputMaybe<Scalars['String']['input']>;
  manufacturerUrl_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  manufacturerUrl_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  manufacturerUrl_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  manufacturerUrl_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  propertiesAggregate?: InputMaybe<CatalogueItemPropertiesAggregateInput>;
  /** Return CatalogueItems where all of the related CatalogueItemPropertiesConnections match this filter */
  propertiesConnection_ALL?: InputMaybe<CatalogueItemPropertiesConnectionWhere>;
  /** Return CatalogueItems where none of the related CatalogueItemPropertiesConnections match this filter */
  propertiesConnection_NONE?: InputMaybe<CatalogueItemPropertiesConnectionWhere>;
  /** Return CatalogueItems where one of the related CatalogueItemPropertiesConnections match this filter */
  propertiesConnection_SINGLE?: InputMaybe<CatalogueItemPropertiesConnectionWhere>;
  /** Return CatalogueItems where some of the related CatalogueItemPropertiesConnections match this filter */
  propertiesConnection_SOME?: InputMaybe<CatalogueItemPropertiesConnectionWhere>;
  /** Return CatalogueItems where all of the related CatalogueCategoryProperties match this filter */
  properties_ALL?: InputMaybe<CatalogueCategoryPropertyWhere>;
  /** Return CatalogueItems where none of the related CatalogueCategoryProperties match this filter */
  properties_NONE?: InputMaybe<CatalogueCategoryPropertyWhere>;
  /** Return CatalogueItems where one of the related CatalogueCategoryProperties match this filter */
  properties_SINGLE?: InputMaybe<CatalogueCategoryPropertyWhere>;
  /** Return CatalogueItems where some of the related CatalogueCategoryProperties match this filter */
  properties_SOME?: InputMaybe<CatalogueCategoryPropertyWhere>;
  supplier?: InputMaybe<SupplierWhere>;
  supplierAggregate?: InputMaybe<CatalogueItemSupplierAggregateInput>;
  supplierConnection?: InputMaybe<CatalogueItemSupplierConnectionWhere>;
  supplierConnection_NOT?: InputMaybe<CatalogueItemSupplierConnectionWhere>;
  supplier_NOT?: InputMaybe<SupplierWhere>;
  uid?: InputMaybe<Scalars['String']['input']>;
  uid_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  uid_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  uid_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  uid_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
};

export type CatalogueItemsConnection = {
  __typename?: 'CatalogueItemsConnection';
  edges: Array<CatalogueItemEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export enum CleaningScheduleDay {
  Friday = 'FRIDAY',
  Monday = 'MONDAY',
  Saturday = 'SATURDAY',
  Sunday = 'SUNDAY',
  Thursday = 'THURSDAY',
  Tuesday = 'TUESDAY',
  Wednesday = 'WEDNESDAY'
}

export type ContactPersonRole = {
  __typename?: 'ContactPersonRole';
  name: Scalars['String']['output'];
  uid: Scalars['ID']['output'];
};

export type ContactPersonRoleAggregateSelection = {
  __typename?: 'ContactPersonRoleAggregateSelection';
  count: Scalars['Int']['output'];
  name: StringAggregateSelectionNonNullable;
  uid: IdAggregateSelectionNonNullable;
};

export type ContactPersonRoleConnectWhere = {
  node: ContactPersonRoleWhere;
};

export type ContactPersonRoleCreateInput = {
  name: Scalars['String']['input'];
};

export type ContactPersonRoleEdge = {
  __typename?: 'ContactPersonRoleEdge';
  cursor: Scalars['String']['output'];
  node: ContactPersonRole;
};

export type ContactPersonRoleOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /** Specify one or more ContactPersonRoleSort objects to sort ContactPersonRoles by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<ContactPersonRoleSort>>;
};

/** Fields to sort ContactPersonRoles by. The order in which sorts are applied is not guaranteed when specifying many fields in one ContactPersonRoleSort object. */
export type ContactPersonRoleSort = {
  name?: InputMaybe<SortDirection>;
  uid?: InputMaybe<SortDirection>;
};

export type ContactPersonRoleUpdateInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type ContactPersonRoleWhere = {
  AND?: InputMaybe<Array<ContactPersonRoleWhere>>;
  NOT?: InputMaybe<ContactPersonRoleWhere>;
  OR?: InputMaybe<Array<ContactPersonRoleWhere>>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  uid?: InputMaybe<Scalars['ID']['input']>;
  uid_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  uid_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  uid_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  uid_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
};

export type ContactPersonRolesConnection = {
  __typename?: 'ContactPersonRolesConnection';
  edges: Array<ContactPersonRoleEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type CreateCatalogueCategoriesMutationResponse = {
  __typename?: 'CreateCatalogueCategoriesMutationResponse';
  catalogueCategories: Array<CatalogueCategory>;
  info: CreateInfo;
};

export type CreateCatalogueCategoryPropertiesMutationResponse = {
  __typename?: 'CreateCatalogueCategoryPropertiesMutationResponse';
  catalogueCategoryProperties: Array<CatalogueCategoryProperty>;
  info: CreateInfo;
};

export type CreateCatalogueCategoryPropertyGroupsMutationResponse = {
  __typename?: 'CreateCatalogueCategoryPropertyGroupsMutationResponse';
  catalogueCategoryPropertyGroups: Array<CatalogueCategoryPropertyGroup>;
  info: CreateInfo;
};

export type CreateCatalogueCategoryPropertyTypesMutationResponse = {
  __typename?: 'CreateCatalogueCategoryPropertyTypesMutationResponse';
  catalogueCategoryPropertyTypes: Array<CatalogueCategoryPropertyType>;
  info: CreateInfo;
};

export type CreateCatalogueItemsMutationResponse = {
  __typename?: 'CreateCatalogueItemsMutationResponse';
  catalogueItems: Array<CatalogueItem>;
  info: CreateInfo;
};

export type CreateContactPersonRolesMutationResponse = {
  __typename?: 'CreateContactPersonRolesMutationResponse';
  contactPersonRoles: Array<ContactPersonRole>;
  info: CreateInfo;
};

export type CreateEmployeesMutationResponse = {
  __typename?: 'CreateEmployeesMutationResponse';
  employees: Array<Employee>;
  info: CreateInfo;
};

export type CreateFacilitiesMutationResponse = {
  __typename?: 'CreateFacilitiesMutationResponse';
  facilities: Array<Facility>;
  info: CreateInfo;
};

export type CreateHallContactPeopleMutationResponse = {
  __typename?: 'CreateHallContactPeopleMutationResponse';
  hallContactPeople: Array<HallContactPerson>;
  info: CreateInfo;
};

/** Information about the number of nodes and relationships created during a create mutation */
export type CreateInfo = {
  __typename?: 'CreateInfo';
  /** @deprecated This field has been deprecated because bookmarks are now handled by the driver. */
  bookmark?: Maybe<Scalars['String']['output']>;
  nodesCreated: Scalars['Int']['output'];
  relationshipsCreated: Scalars['Int']['output'];
};

export type CreateItemConditionsMutationResponse = {
  __typename?: 'CreateItemConditionsMutationResponse';
  info: CreateInfo;
  itemConditions: Array<ItemCondition>;
};

export type CreateItemUsagesMutationResponse = {
  __typename?: 'CreateItemUsagesMutationResponse';
  info: CreateInfo;
  itemUsages: Array<ItemUsage>;
};

export type CreateItemsMutationResponse = {
  __typename?: 'CreateItemsMutationResponse';
  info: CreateInfo;
  items: Array<Item>;
};

export type CreateLocationsMutationResponse = {
  __typename?: 'CreateLocationsMutationResponse';
  info: CreateInfo;
  locations: Array<Location>;
};

export type CreateOrdersMutationResponse = {
  __typename?: 'CreateOrdersMutationResponse';
  info: CreateInfo;
  orders: Array<Order>;
};

export type CreateParentPathItemsMutationResponse = {
  __typename?: 'CreateParentPathItemsMutationResponse';
  info: CreateInfo;
  parentPathItems: Array<ParentPathItem>;
};

export type CreateRolesMutationResponse = {
  __typename?: 'CreateRolesMutationResponse';
  info: CreateInfo;
  roles: Array<Role>;
};

export type CreateRoomCardsMutationResponse = {
  __typename?: 'CreateRoomCardsMutationResponse';
  info: CreateInfo;
  roomCards: Array<RoomCard>;
};

export type CreateSchemaMigrationsMutationResponse = {
  __typename?: 'CreateSchemaMigrationsMutationResponse';
  info: CreateInfo;
  schemaMigrations: Array<SchemaMigration>;
};

export type CreateSuppliersMutationResponse = {
  __typename?: 'CreateSuppliersMutationResponse';
  info: CreateInfo;
  suppliers: Array<Supplier>;
};

export type CreateSystemCriticalitiesMutationResponse = {
  __typename?: 'CreateSystemCriticalitiesMutationResponse';
  info: CreateInfo;
  systemCriticalities: Array<SystemCriticality>;
};

export type CreateSystemImportancesMutationResponse = {
  __typename?: 'CreateSystemImportancesMutationResponse';
  info: CreateInfo;
  systemImportances: Array<SystemImportance>;
};

export type CreateSystemTypeGroupsMutationResponse = {
  __typename?: 'CreateSystemTypeGroupsMutationResponse';
  info: CreateInfo;
  systemTypeGroups: Array<SystemTypeGroup>;
};

export type CreateSystemTypesMutationResponse = {
  __typename?: 'CreateSystemTypesMutationResponse';
  info: CreateInfo;
  systemTypes: Array<SystemType>;
};

export type CreateSystemsMutationResponse = {
  __typename?: 'CreateSystemsMutationResponse';
  info: CreateInfo;
  systems: Array<System>;
};

export type CreateTeamsMutationResponse = {
  __typename?: 'CreateTeamsMutationResponse';
  info: CreateInfo;
  teams: Array<Team>;
};

export type CreateUnitsMutationResponse = {
  __typename?: 'CreateUnitsMutationResponse';
  info: CreateInfo;
  units: Array<Unit>;
};

export type CreateUsersMutationResponse = {
  __typename?: 'CreateUsersMutationResponse';
  info: CreateInfo;
  users: Array<User>;
};

export type CreateZonesMutationResponse = {
  __typename?: 'CreateZonesMutationResponse';
  info: CreateInfo;
  zones: Array<Zone>;
};

/** Information about the number of nodes and relationships deleted during a delete mutation */
export type DeleteInfo = {
  __typename?: 'DeleteInfo';
  /** @deprecated This field has been deprecated because bookmarks are now handled by the driver. */
  bookmark?: Maybe<Scalars['String']['output']>;
  nodesDeleted: Scalars['Int']['output'];
  relationshipsDeleted: Scalars['Int']['output'];
};

export type Employee = {
  __typename?: 'Employee';
  email?: Maybe<Scalars['String']['output']>;
  facility: Facility;
  facilityAggregate?: Maybe<EmployeeFacilityFacilityAggregationSelection>;
  facilityConnection: EmployeeFacilityConnection;
  firstName: Scalars['String']['output'];
  fullName?: Maybe<Scalars['String']['output']>;
  lastName: Scalars['String']['output'];
  phoneNumber?: Maybe<Scalars['String']['output']>;
  uid: Scalars['ID']['output'];
  user?: Maybe<User>;
  userAggregate?: Maybe<EmployeeUserUserAggregationSelection>;
  userConnection: EmployeeUserConnection;
};


export type EmployeeFacilityArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<FacilityOptions>;
  where?: InputMaybe<FacilityWhere>;
};


export type EmployeeFacilityAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<FacilityWhere>;
};


export type EmployeeFacilityConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<EmployeeFacilityConnectionSort>>;
  where?: InputMaybe<EmployeeFacilityConnectionWhere>;
};


export type EmployeeUserArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<UserOptions>;
  where?: InputMaybe<UserWhere>;
};


export type EmployeeUserAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<UserWhere>;
};


export type EmployeeUserConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<EmployeeUserConnectionSort>>;
  where?: InputMaybe<EmployeeUserConnectionWhere>;
};

export type EmployeeAggregateSelection = {
  __typename?: 'EmployeeAggregateSelection';
  count: Scalars['Int']['output'];
  email: StringAggregateSelectionNullable;
  firstName: StringAggregateSelectionNonNullable;
  fullName: StringAggregateSelectionNullable;
  lastName: StringAggregateSelectionNonNullable;
  phoneNumber: StringAggregateSelectionNullable;
  uid: IdAggregateSelectionNonNullable;
};

export type EmployeeConnectInput = {
  facility?: InputMaybe<EmployeeFacilityConnectFieldInput>;
  user?: InputMaybe<EmployeeUserConnectFieldInput>;
};

export type EmployeeConnectWhere = {
  node: EmployeeWhere;
};

export type EmployeeCreateInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  facility?: InputMaybe<EmployeeFacilityFieldInput>;
  firstName: Scalars['String']['input'];
  fullName?: InputMaybe<Scalars['String']['input']>;
  lastName: Scalars['String']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<EmployeeUserFieldInput>;
};

export type EmployeeDeleteInput = {
  facility?: InputMaybe<EmployeeFacilityDeleteFieldInput>;
  user?: InputMaybe<EmployeeUserDeleteFieldInput>;
};

export type EmployeeDisconnectInput = {
  facility?: InputMaybe<EmployeeFacilityDisconnectFieldInput>;
  user?: InputMaybe<EmployeeUserDisconnectFieldInput>;
};

export type EmployeeEdge = {
  __typename?: 'EmployeeEdge';
  cursor: Scalars['String']['output'];
  node: Employee;
};

export type EmployeeFacilityAggregateInput = {
  AND?: InputMaybe<Array<EmployeeFacilityAggregateInput>>;
  NOT?: InputMaybe<EmployeeFacilityAggregateInput>;
  OR?: InputMaybe<Array<EmployeeFacilityAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<EmployeeFacilityNodeAggregationWhereInput>;
};

export type EmployeeFacilityConnectFieldInput = {
  connect?: InputMaybe<FacilityConnectInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<FacilityConnectWhere>;
};

export type EmployeeFacilityConnection = {
  __typename?: 'EmployeeFacilityConnection';
  edges: Array<EmployeeFacilityRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type EmployeeFacilityConnectionSort = {
  node?: InputMaybe<FacilitySort>;
};

export type EmployeeFacilityConnectionWhere = {
  AND?: InputMaybe<Array<EmployeeFacilityConnectionWhere>>;
  NOT?: InputMaybe<EmployeeFacilityConnectionWhere>;
  OR?: InputMaybe<Array<EmployeeFacilityConnectionWhere>>;
  node?: InputMaybe<FacilityWhere>;
};

export type EmployeeFacilityCreateFieldInput = {
  node: FacilityCreateInput;
};

export type EmployeeFacilityDeleteFieldInput = {
  delete?: InputMaybe<FacilityDeleteInput>;
  where?: InputMaybe<EmployeeFacilityConnectionWhere>;
};

export type EmployeeFacilityDisconnectFieldInput = {
  disconnect?: InputMaybe<FacilityDisconnectInput>;
  where?: InputMaybe<EmployeeFacilityConnectionWhere>;
};

export type EmployeeFacilityFacilityAggregationSelection = {
  __typename?: 'EmployeeFacilityFacilityAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<EmployeeFacilityFacilityNodeAggregateSelection>;
};

export type EmployeeFacilityFacilityNodeAggregateSelection = {
  __typename?: 'EmployeeFacilityFacilityNodeAggregateSelection';
  code: StringAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  uid: StringAggregateSelectionNonNullable;
};

export type EmployeeFacilityFieldInput = {
  connect?: InputMaybe<EmployeeFacilityConnectFieldInput>;
  create?: InputMaybe<EmployeeFacilityCreateFieldInput>;
};

export type EmployeeFacilityNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<EmployeeFacilityNodeAggregationWhereInput>>;
  NOT?: InputMaybe<EmployeeFacilityNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<EmployeeFacilityNodeAggregationWhereInput>>;
  code_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  code_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  uid_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  uid_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  uid_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  uid_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  uid_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  uid_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  uid_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  uid_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  uid_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  uid_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type EmployeeFacilityRelationship = {
  __typename?: 'EmployeeFacilityRelationship';
  cursor: Scalars['String']['output'];
  node: Facility;
};

export type EmployeeFacilityUpdateConnectionInput = {
  node?: InputMaybe<FacilityUpdateInput>;
};

export type EmployeeFacilityUpdateFieldInput = {
  connect?: InputMaybe<EmployeeFacilityConnectFieldInput>;
  create?: InputMaybe<EmployeeFacilityCreateFieldInput>;
  delete?: InputMaybe<EmployeeFacilityDeleteFieldInput>;
  disconnect?: InputMaybe<EmployeeFacilityDisconnectFieldInput>;
  update?: InputMaybe<EmployeeFacilityUpdateConnectionInput>;
  where?: InputMaybe<EmployeeFacilityConnectionWhere>;
};

export type EmployeeOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /** Specify one or more EmployeeSort objects to sort Employees by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<EmployeeSort>>;
};

export type EmployeeRelationInput = {
  facility?: InputMaybe<EmployeeFacilityCreateFieldInput>;
  user?: InputMaybe<EmployeeUserCreateFieldInput>;
};

/** Fields to sort Employees by. The order in which sorts are applied is not guaranteed when specifying many fields in one EmployeeSort object. */
export type EmployeeSort = {
  email?: InputMaybe<SortDirection>;
  firstName?: InputMaybe<SortDirection>;
  fullName?: InputMaybe<SortDirection>;
  lastName?: InputMaybe<SortDirection>;
  phoneNumber?: InputMaybe<SortDirection>;
  uid?: InputMaybe<SortDirection>;
};

export type EmployeeUpdateInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  facility?: InputMaybe<EmployeeFacilityUpdateFieldInput>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  fullName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<EmployeeUserUpdateFieldInput>;
};

export type EmployeeUserAggregateInput = {
  AND?: InputMaybe<Array<EmployeeUserAggregateInput>>;
  NOT?: InputMaybe<EmployeeUserAggregateInput>;
  OR?: InputMaybe<Array<EmployeeUserAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<EmployeeUserNodeAggregationWhereInput>;
};

export type EmployeeUserConnectFieldInput = {
  connect?: InputMaybe<UserConnectInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<UserConnectWhere>;
};

export type EmployeeUserConnection = {
  __typename?: 'EmployeeUserConnection';
  edges: Array<EmployeeUserRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type EmployeeUserConnectionSort = {
  node?: InputMaybe<UserSort>;
};

export type EmployeeUserConnectionWhere = {
  AND?: InputMaybe<Array<EmployeeUserConnectionWhere>>;
  NOT?: InputMaybe<EmployeeUserConnectionWhere>;
  OR?: InputMaybe<Array<EmployeeUserConnectionWhere>>;
  node?: InputMaybe<UserWhere>;
};

export type EmployeeUserCreateFieldInput = {
  node: UserCreateInput;
};

export type EmployeeUserDeleteFieldInput = {
  delete?: InputMaybe<UserDeleteInput>;
  where?: InputMaybe<EmployeeUserConnectionWhere>;
};

export type EmployeeUserDisconnectFieldInput = {
  disconnect?: InputMaybe<UserDisconnectInput>;
  where?: InputMaybe<EmployeeUserConnectionWhere>;
};

export type EmployeeUserFieldInput = {
  connect?: InputMaybe<EmployeeUserConnectFieldInput>;
  create?: InputMaybe<EmployeeUserCreateFieldInput>;
};

export type EmployeeUserNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<EmployeeUserNodeAggregationWhereInput>>;
  NOT?: InputMaybe<EmployeeUserNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<EmployeeUserNodeAggregationWhereInput>>;
  email_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  email_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  email_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  email_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  email_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  email_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  email_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  email_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  email_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  firstName_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  firstName_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  firstName_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  firstName_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  firstName_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  firstName_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  firstName_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  firstName_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  firstName_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  firstName_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  firstName_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  firstName_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  firstName_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  firstName_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  firstName_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  lastName_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  lastName_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  lastName_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  lastName_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  lastName_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  lastName_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  lastName_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  lastName_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  lastName_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  lastName_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  lastName_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  lastName_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  lastName_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  lastName_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  lastName_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  passwordHash_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  passwordHash_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  passwordHash_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  passwordHash_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  passwordHash_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  passwordHash_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  passwordHash_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  passwordHash_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  passwordHash_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  passwordHash_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  passwordHash_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  passwordHash_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  passwordHash_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  passwordHash_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  passwordHash_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  username_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  username_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  username_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  username_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  username_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  username_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  username_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  username_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type EmployeeUserRelationship = {
  __typename?: 'EmployeeUserRelationship';
  cursor: Scalars['String']['output'];
  node: User;
};

export type EmployeeUserUpdateConnectionInput = {
  node?: InputMaybe<UserUpdateInput>;
};

export type EmployeeUserUpdateFieldInput = {
  connect?: InputMaybe<EmployeeUserConnectFieldInput>;
  create?: InputMaybe<EmployeeUserCreateFieldInput>;
  delete?: InputMaybe<EmployeeUserDeleteFieldInput>;
  disconnect?: InputMaybe<EmployeeUserDisconnectFieldInput>;
  update?: InputMaybe<EmployeeUserUpdateConnectionInput>;
  where?: InputMaybe<EmployeeUserConnectionWhere>;
};

export type EmployeeUserUserAggregationSelection = {
  __typename?: 'EmployeeUserUserAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<EmployeeUserUserNodeAggregateSelection>;
};

export type EmployeeUserUserNodeAggregateSelection = {
  __typename?: 'EmployeeUserUserNodeAggregateSelection';
  email: StringAggregateSelectionNonNullable;
  firstName: StringAggregateSelectionNonNullable;
  lastName: StringAggregateSelectionNonNullable;
  passwordHash: StringAggregateSelectionNonNullable;
  uid: IdAggregateSelectionNonNullable;
  username: StringAggregateSelectionNonNullable;
};

export type EmployeeWhere = {
  AND?: InputMaybe<Array<EmployeeWhere>>;
  NOT?: InputMaybe<EmployeeWhere>;
  OR?: InputMaybe<Array<EmployeeWhere>>;
  email?: InputMaybe<Scalars['String']['input']>;
  email_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  email_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  email_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  email_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  facility?: InputMaybe<FacilityWhere>;
  facilityAggregate?: InputMaybe<EmployeeFacilityAggregateInput>;
  facilityConnection?: InputMaybe<EmployeeFacilityConnectionWhere>;
  facilityConnection_NOT?: InputMaybe<EmployeeFacilityConnectionWhere>;
  facility_NOT?: InputMaybe<FacilityWhere>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  firstName_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  firstName_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  firstName_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  firstName_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  fullName?: InputMaybe<Scalars['String']['input']>;
  fullName_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  fullName_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  fullName_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  fullName_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  lastName_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  lastName_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  lastName_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  lastName_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  phoneNumber_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  phoneNumber_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  phoneNumber_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  phoneNumber_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  uid?: InputMaybe<Scalars['ID']['input']>;
  uid_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  uid_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  uid_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  uid_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  user?: InputMaybe<UserWhere>;
  userAggregate?: InputMaybe<EmployeeUserAggregateInput>;
  userConnection?: InputMaybe<EmployeeUserConnectionWhere>;
  userConnection_NOT?: InputMaybe<EmployeeUserConnectionWhere>;
  user_NOT?: InputMaybe<UserWhere>;
};

export type EmployeesConnection = {
  __typename?: 'EmployeesConnection';
  edges: Array<EmployeeEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type FacilitiesConnection = {
  __typename?: 'FacilitiesConnection';
  edges: Array<FacilityEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Facility = {
  __typename?: 'Facility';
  code: Scalars['String']['output'];
  hasLocationLocations: Array<Location>;
  hasLocationLocationsAggregate?: Maybe<FacilityLocationHasLocationLocationsAggregationSelection>;
  hasLocationLocationsConnection: FacilityHasLocationLocationsConnection;
  hasZoneZones: Array<Zone>;
  hasZoneZonesAggregate?: Maybe<FacilityZoneHasZoneZonesAggregationSelection>;
  hasZoneZonesConnection: FacilityHasZoneZonesConnection;
  locationsBelongsToFacility: Array<Location>;
  locationsBelongsToFacilityAggregate?: Maybe<FacilityLocationLocationsBelongsToFacilityAggregationSelection>;
  locationsBelongsToFacilityConnection: FacilityLocationsBelongsToFacilityConnection;
  name: Scalars['String']['output'];
  systemTypeGroupsBelongsToFacility: Array<SystemTypeGroup>;
  systemTypeGroupsBelongsToFacilityAggregate?: Maybe<FacilitySystemTypeGroupSystemTypeGroupsBelongsToFacilityAggregationSelection>;
  systemTypeGroupsBelongsToFacilityConnection: FacilitySystemTypeGroupsBelongsToFacilityConnection;
  uid: Scalars['String']['output'];
};


export type FacilityHasLocationLocationsArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<LocationOptions>;
  where?: InputMaybe<LocationWhere>;
};


export type FacilityHasLocationLocationsAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<LocationWhere>;
};


export type FacilityHasLocationLocationsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<FacilityHasLocationLocationsConnectionSort>>;
  where?: InputMaybe<FacilityHasLocationLocationsConnectionWhere>;
};


export type FacilityHasZoneZonesArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<ZoneOptions>;
  where?: InputMaybe<ZoneWhere>;
};


export type FacilityHasZoneZonesAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ZoneWhere>;
};


export type FacilityHasZoneZonesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<FacilityHasZoneZonesConnectionSort>>;
  where?: InputMaybe<FacilityHasZoneZonesConnectionWhere>;
};


export type FacilityLocationsBelongsToFacilityArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<LocationOptions>;
  where?: InputMaybe<LocationWhere>;
};


export type FacilityLocationsBelongsToFacilityAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<LocationWhere>;
};


export type FacilityLocationsBelongsToFacilityConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<FacilityLocationsBelongsToFacilityConnectionSort>>;
  where?: InputMaybe<FacilityLocationsBelongsToFacilityConnectionWhere>;
};


export type FacilitySystemTypeGroupsBelongsToFacilityArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<SystemTypeGroupOptions>;
  where?: InputMaybe<SystemTypeGroupWhere>;
};


export type FacilitySystemTypeGroupsBelongsToFacilityAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<SystemTypeGroupWhere>;
};


export type FacilitySystemTypeGroupsBelongsToFacilityConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<FacilitySystemTypeGroupsBelongsToFacilityConnectionSort>>;
  where?: InputMaybe<FacilitySystemTypeGroupsBelongsToFacilityConnectionWhere>;
};

export type FacilityAggregateSelection = {
  __typename?: 'FacilityAggregateSelection';
  code: StringAggregateSelectionNonNullable;
  count: Scalars['Int']['output'];
  name: StringAggregateSelectionNonNullable;
  uid: StringAggregateSelectionNonNullable;
};

export type FacilityConnectInput = {
  hasLocationLocations?: InputMaybe<Array<FacilityHasLocationLocationsConnectFieldInput>>;
  hasZoneZones?: InputMaybe<Array<FacilityHasZoneZonesConnectFieldInput>>;
  locationsBelongsToFacility?: InputMaybe<Array<FacilityLocationsBelongsToFacilityConnectFieldInput>>;
  systemTypeGroupsBelongsToFacility?: InputMaybe<Array<FacilitySystemTypeGroupsBelongsToFacilityConnectFieldInput>>;
};

export type FacilityConnectWhere = {
  node: FacilityWhere;
};

export type FacilityCreateInput = {
  code: Scalars['String']['input'];
  hasLocationLocations?: InputMaybe<FacilityHasLocationLocationsFieldInput>;
  hasZoneZones?: InputMaybe<FacilityHasZoneZonesFieldInput>;
  locationsBelongsToFacility?: InputMaybe<FacilityLocationsBelongsToFacilityFieldInput>;
  name: Scalars['String']['input'];
  systemTypeGroupsBelongsToFacility?: InputMaybe<FacilitySystemTypeGroupsBelongsToFacilityFieldInput>;
  uid: Scalars['String']['input'];
};

export type FacilityDeleteInput = {
  hasLocationLocations?: InputMaybe<Array<FacilityHasLocationLocationsDeleteFieldInput>>;
  hasZoneZones?: InputMaybe<Array<FacilityHasZoneZonesDeleteFieldInput>>;
  locationsBelongsToFacility?: InputMaybe<Array<FacilityLocationsBelongsToFacilityDeleteFieldInput>>;
  systemTypeGroupsBelongsToFacility?: InputMaybe<Array<FacilitySystemTypeGroupsBelongsToFacilityDeleteFieldInput>>;
};

export type FacilityDisconnectInput = {
  hasLocationLocations?: InputMaybe<Array<FacilityHasLocationLocationsDisconnectFieldInput>>;
  hasZoneZones?: InputMaybe<Array<FacilityHasZoneZonesDisconnectFieldInput>>;
  locationsBelongsToFacility?: InputMaybe<Array<FacilityLocationsBelongsToFacilityDisconnectFieldInput>>;
  systemTypeGroupsBelongsToFacility?: InputMaybe<Array<FacilitySystemTypeGroupsBelongsToFacilityDisconnectFieldInput>>;
};

export type FacilityEdge = {
  __typename?: 'FacilityEdge';
  cursor: Scalars['String']['output'];
  node: Facility;
};

export type FacilityHasLocationLocationsAggregateInput = {
  AND?: InputMaybe<Array<FacilityHasLocationLocationsAggregateInput>>;
  NOT?: InputMaybe<FacilityHasLocationLocationsAggregateInput>;
  OR?: InputMaybe<Array<FacilityHasLocationLocationsAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<FacilityHasLocationLocationsNodeAggregationWhereInput>;
};

export type FacilityHasLocationLocationsConnectFieldInput = {
  connect?: InputMaybe<Array<LocationConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<LocationConnectWhere>;
};

export type FacilityHasLocationLocationsConnection = {
  __typename?: 'FacilityHasLocationLocationsConnection';
  edges: Array<FacilityHasLocationLocationsRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type FacilityHasLocationLocationsConnectionSort = {
  node?: InputMaybe<LocationSort>;
};

export type FacilityHasLocationLocationsConnectionWhere = {
  AND?: InputMaybe<Array<FacilityHasLocationLocationsConnectionWhere>>;
  NOT?: InputMaybe<FacilityHasLocationLocationsConnectionWhere>;
  OR?: InputMaybe<Array<FacilityHasLocationLocationsConnectionWhere>>;
  node?: InputMaybe<LocationWhere>;
};

export type FacilityHasLocationLocationsCreateFieldInput = {
  node: LocationCreateInput;
};

export type FacilityHasLocationLocationsDeleteFieldInput = {
  delete?: InputMaybe<LocationDeleteInput>;
  where?: InputMaybe<FacilityHasLocationLocationsConnectionWhere>;
};

export type FacilityHasLocationLocationsDisconnectFieldInput = {
  disconnect?: InputMaybe<LocationDisconnectInput>;
  where?: InputMaybe<FacilityHasLocationLocationsConnectionWhere>;
};

export type FacilityHasLocationLocationsFieldInput = {
  connect?: InputMaybe<Array<FacilityHasLocationLocationsConnectFieldInput>>;
  create?: InputMaybe<Array<FacilityHasLocationLocationsCreateFieldInput>>;
};

export type FacilityHasLocationLocationsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<FacilityHasLocationLocationsNodeAggregationWhereInput>>;
  NOT?: InputMaybe<FacilityHasLocationLocationsNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<FacilityHasLocationLocationsNodeAggregationWhereInput>>;
  code_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  code_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type FacilityHasLocationLocationsRelationship = {
  __typename?: 'FacilityHasLocationLocationsRelationship';
  cursor: Scalars['String']['output'];
  node: Location;
};

export type FacilityHasLocationLocationsUpdateConnectionInput = {
  node?: InputMaybe<LocationUpdateInput>;
};

export type FacilityHasLocationLocationsUpdateFieldInput = {
  connect?: InputMaybe<Array<FacilityHasLocationLocationsConnectFieldInput>>;
  create?: InputMaybe<Array<FacilityHasLocationLocationsCreateFieldInput>>;
  delete?: InputMaybe<Array<FacilityHasLocationLocationsDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<FacilityHasLocationLocationsDisconnectFieldInput>>;
  update?: InputMaybe<FacilityHasLocationLocationsUpdateConnectionInput>;
  where?: InputMaybe<FacilityHasLocationLocationsConnectionWhere>;
};

export type FacilityHasZoneZonesAggregateInput = {
  AND?: InputMaybe<Array<FacilityHasZoneZonesAggregateInput>>;
  NOT?: InputMaybe<FacilityHasZoneZonesAggregateInput>;
  OR?: InputMaybe<Array<FacilityHasZoneZonesAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<FacilityHasZoneZonesNodeAggregationWhereInput>;
};

export type FacilityHasZoneZonesConnectFieldInput = {
  connect?: InputMaybe<Array<ZoneConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<ZoneConnectWhere>;
};

export type FacilityHasZoneZonesConnection = {
  __typename?: 'FacilityHasZoneZonesConnection';
  edges: Array<FacilityHasZoneZonesRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type FacilityHasZoneZonesConnectionSort = {
  node?: InputMaybe<ZoneSort>;
};

export type FacilityHasZoneZonesConnectionWhere = {
  AND?: InputMaybe<Array<FacilityHasZoneZonesConnectionWhere>>;
  NOT?: InputMaybe<FacilityHasZoneZonesConnectionWhere>;
  OR?: InputMaybe<Array<FacilityHasZoneZonesConnectionWhere>>;
  node?: InputMaybe<ZoneWhere>;
};

export type FacilityHasZoneZonesCreateFieldInput = {
  node: ZoneCreateInput;
};

export type FacilityHasZoneZonesDeleteFieldInput = {
  delete?: InputMaybe<ZoneDeleteInput>;
  where?: InputMaybe<FacilityHasZoneZonesConnectionWhere>;
};

export type FacilityHasZoneZonesDisconnectFieldInput = {
  disconnect?: InputMaybe<ZoneDisconnectInput>;
  where?: InputMaybe<FacilityHasZoneZonesConnectionWhere>;
};

export type FacilityHasZoneZonesFieldInput = {
  connect?: InputMaybe<Array<FacilityHasZoneZonesConnectFieldInput>>;
  create?: InputMaybe<Array<FacilityHasZoneZonesCreateFieldInput>>;
};

export type FacilityHasZoneZonesNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<FacilityHasZoneZonesNodeAggregationWhereInput>>;
  NOT?: InputMaybe<FacilityHasZoneZonesNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<FacilityHasZoneZonesNodeAggregationWhereInput>>;
  code_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  code_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type FacilityHasZoneZonesRelationship = {
  __typename?: 'FacilityHasZoneZonesRelationship';
  cursor: Scalars['String']['output'];
  node: Zone;
};

export type FacilityHasZoneZonesUpdateConnectionInput = {
  node?: InputMaybe<ZoneUpdateInput>;
};

export type FacilityHasZoneZonesUpdateFieldInput = {
  connect?: InputMaybe<Array<FacilityHasZoneZonesConnectFieldInput>>;
  create?: InputMaybe<Array<FacilityHasZoneZonesCreateFieldInput>>;
  delete?: InputMaybe<Array<FacilityHasZoneZonesDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<FacilityHasZoneZonesDisconnectFieldInput>>;
  update?: InputMaybe<FacilityHasZoneZonesUpdateConnectionInput>;
  where?: InputMaybe<FacilityHasZoneZonesConnectionWhere>;
};

export type FacilityLocationHasLocationLocationsAggregationSelection = {
  __typename?: 'FacilityLocationHasLocationLocationsAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<FacilityLocationHasLocationLocationsNodeAggregateSelection>;
};

export type FacilityLocationHasLocationLocationsNodeAggregateSelection = {
  __typename?: 'FacilityLocationHasLocationLocationsNodeAggregateSelection';
  code: StringAggregateSelectionNullable;
  name: StringAggregateSelectionNonNullable;
  uid: IdAggregateSelectionNonNullable;
};

export type FacilityLocationLocationsBelongsToFacilityAggregationSelection = {
  __typename?: 'FacilityLocationLocationsBelongsToFacilityAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<FacilityLocationLocationsBelongsToFacilityNodeAggregateSelection>;
};

export type FacilityLocationLocationsBelongsToFacilityNodeAggregateSelection = {
  __typename?: 'FacilityLocationLocationsBelongsToFacilityNodeAggregateSelection';
  code: StringAggregateSelectionNullable;
  name: StringAggregateSelectionNonNullable;
  uid: IdAggregateSelectionNonNullable;
};

export type FacilityLocationsBelongsToFacilityAggregateInput = {
  AND?: InputMaybe<Array<FacilityLocationsBelongsToFacilityAggregateInput>>;
  NOT?: InputMaybe<FacilityLocationsBelongsToFacilityAggregateInput>;
  OR?: InputMaybe<Array<FacilityLocationsBelongsToFacilityAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<FacilityLocationsBelongsToFacilityNodeAggregationWhereInput>;
};

export type FacilityLocationsBelongsToFacilityConnectFieldInput = {
  connect?: InputMaybe<Array<LocationConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<LocationConnectWhere>;
};

export type FacilityLocationsBelongsToFacilityConnection = {
  __typename?: 'FacilityLocationsBelongsToFacilityConnection';
  edges: Array<FacilityLocationsBelongsToFacilityRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type FacilityLocationsBelongsToFacilityConnectionSort = {
  node?: InputMaybe<LocationSort>;
};

export type FacilityLocationsBelongsToFacilityConnectionWhere = {
  AND?: InputMaybe<Array<FacilityLocationsBelongsToFacilityConnectionWhere>>;
  NOT?: InputMaybe<FacilityLocationsBelongsToFacilityConnectionWhere>;
  OR?: InputMaybe<Array<FacilityLocationsBelongsToFacilityConnectionWhere>>;
  node?: InputMaybe<LocationWhere>;
};

export type FacilityLocationsBelongsToFacilityCreateFieldInput = {
  node: LocationCreateInput;
};

export type FacilityLocationsBelongsToFacilityDeleteFieldInput = {
  delete?: InputMaybe<LocationDeleteInput>;
  where?: InputMaybe<FacilityLocationsBelongsToFacilityConnectionWhere>;
};

export type FacilityLocationsBelongsToFacilityDisconnectFieldInput = {
  disconnect?: InputMaybe<LocationDisconnectInput>;
  where?: InputMaybe<FacilityLocationsBelongsToFacilityConnectionWhere>;
};

export type FacilityLocationsBelongsToFacilityFieldInput = {
  connect?: InputMaybe<Array<FacilityLocationsBelongsToFacilityConnectFieldInput>>;
  create?: InputMaybe<Array<FacilityLocationsBelongsToFacilityCreateFieldInput>>;
};

export type FacilityLocationsBelongsToFacilityNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<FacilityLocationsBelongsToFacilityNodeAggregationWhereInput>>;
  NOT?: InputMaybe<FacilityLocationsBelongsToFacilityNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<FacilityLocationsBelongsToFacilityNodeAggregationWhereInput>>;
  code_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  code_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type FacilityLocationsBelongsToFacilityRelationship = {
  __typename?: 'FacilityLocationsBelongsToFacilityRelationship';
  cursor: Scalars['String']['output'];
  node: Location;
};

export type FacilityLocationsBelongsToFacilityUpdateConnectionInput = {
  node?: InputMaybe<LocationUpdateInput>;
};

export type FacilityLocationsBelongsToFacilityUpdateFieldInput = {
  connect?: InputMaybe<Array<FacilityLocationsBelongsToFacilityConnectFieldInput>>;
  create?: InputMaybe<Array<FacilityLocationsBelongsToFacilityCreateFieldInput>>;
  delete?: InputMaybe<Array<FacilityLocationsBelongsToFacilityDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<FacilityLocationsBelongsToFacilityDisconnectFieldInput>>;
  update?: InputMaybe<FacilityLocationsBelongsToFacilityUpdateConnectionInput>;
  where?: InputMaybe<FacilityLocationsBelongsToFacilityConnectionWhere>;
};

export type FacilityOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /** Specify one or more FacilitySort objects to sort Facilities by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<FacilitySort>>;
};

export type FacilityRelationInput = {
  hasLocationLocations?: InputMaybe<Array<FacilityHasLocationLocationsCreateFieldInput>>;
  hasZoneZones?: InputMaybe<Array<FacilityHasZoneZonesCreateFieldInput>>;
  locationsBelongsToFacility?: InputMaybe<Array<FacilityLocationsBelongsToFacilityCreateFieldInput>>;
  systemTypeGroupsBelongsToFacility?: InputMaybe<Array<FacilitySystemTypeGroupsBelongsToFacilityCreateFieldInput>>;
};

/** Fields to sort Facilities by. The order in which sorts are applied is not guaranteed when specifying many fields in one FacilitySort object. */
export type FacilitySort = {
  code?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  uid?: InputMaybe<SortDirection>;
};

export type FacilitySystemTypeGroupSystemTypeGroupsBelongsToFacilityAggregationSelection = {
  __typename?: 'FacilitySystemTypeGroupSystemTypeGroupsBelongsToFacilityAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<FacilitySystemTypeGroupSystemTypeGroupsBelongsToFacilityNodeAggregateSelection>;
};

export type FacilitySystemTypeGroupSystemTypeGroupsBelongsToFacilityNodeAggregateSelection = {
  __typename?: 'FacilitySystemTypeGroupSystemTypeGroupsBelongsToFacilityNodeAggregateSelection';
  name: StringAggregateSelectionNonNullable;
  uid: StringAggregateSelectionNonNullable;
};

export type FacilitySystemTypeGroupsBelongsToFacilityAggregateInput = {
  AND?: InputMaybe<Array<FacilitySystemTypeGroupsBelongsToFacilityAggregateInput>>;
  NOT?: InputMaybe<FacilitySystemTypeGroupsBelongsToFacilityAggregateInput>;
  OR?: InputMaybe<Array<FacilitySystemTypeGroupsBelongsToFacilityAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<FacilitySystemTypeGroupsBelongsToFacilityNodeAggregationWhereInput>;
};

export type FacilitySystemTypeGroupsBelongsToFacilityConnectFieldInput = {
  connect?: InputMaybe<Array<SystemTypeGroupConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<SystemTypeGroupConnectWhere>;
};

export type FacilitySystemTypeGroupsBelongsToFacilityConnection = {
  __typename?: 'FacilitySystemTypeGroupsBelongsToFacilityConnection';
  edges: Array<FacilitySystemTypeGroupsBelongsToFacilityRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type FacilitySystemTypeGroupsBelongsToFacilityConnectionSort = {
  node?: InputMaybe<SystemTypeGroupSort>;
};

export type FacilitySystemTypeGroupsBelongsToFacilityConnectionWhere = {
  AND?: InputMaybe<Array<FacilitySystemTypeGroupsBelongsToFacilityConnectionWhere>>;
  NOT?: InputMaybe<FacilitySystemTypeGroupsBelongsToFacilityConnectionWhere>;
  OR?: InputMaybe<Array<FacilitySystemTypeGroupsBelongsToFacilityConnectionWhere>>;
  node?: InputMaybe<SystemTypeGroupWhere>;
};

export type FacilitySystemTypeGroupsBelongsToFacilityCreateFieldInput = {
  node: SystemTypeGroupCreateInput;
};

export type FacilitySystemTypeGroupsBelongsToFacilityDeleteFieldInput = {
  delete?: InputMaybe<SystemTypeGroupDeleteInput>;
  where?: InputMaybe<FacilitySystemTypeGroupsBelongsToFacilityConnectionWhere>;
};

export type FacilitySystemTypeGroupsBelongsToFacilityDisconnectFieldInput = {
  disconnect?: InputMaybe<SystemTypeGroupDisconnectInput>;
  where?: InputMaybe<FacilitySystemTypeGroupsBelongsToFacilityConnectionWhere>;
};

export type FacilitySystemTypeGroupsBelongsToFacilityFieldInput = {
  connect?: InputMaybe<Array<FacilitySystemTypeGroupsBelongsToFacilityConnectFieldInput>>;
  create?: InputMaybe<Array<FacilitySystemTypeGroupsBelongsToFacilityCreateFieldInput>>;
};

export type FacilitySystemTypeGroupsBelongsToFacilityNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<FacilitySystemTypeGroupsBelongsToFacilityNodeAggregationWhereInput>>;
  NOT?: InputMaybe<FacilitySystemTypeGroupsBelongsToFacilityNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<FacilitySystemTypeGroupsBelongsToFacilityNodeAggregationWhereInput>>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  uid_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  uid_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  uid_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  uid_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  uid_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  uid_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  uid_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  uid_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  uid_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  uid_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type FacilitySystemTypeGroupsBelongsToFacilityRelationship = {
  __typename?: 'FacilitySystemTypeGroupsBelongsToFacilityRelationship';
  cursor: Scalars['String']['output'];
  node: SystemTypeGroup;
};

export type FacilitySystemTypeGroupsBelongsToFacilityUpdateConnectionInput = {
  node?: InputMaybe<SystemTypeGroupUpdateInput>;
};

export type FacilitySystemTypeGroupsBelongsToFacilityUpdateFieldInput = {
  connect?: InputMaybe<Array<FacilitySystemTypeGroupsBelongsToFacilityConnectFieldInput>>;
  create?: InputMaybe<Array<FacilitySystemTypeGroupsBelongsToFacilityCreateFieldInput>>;
  delete?: InputMaybe<Array<FacilitySystemTypeGroupsBelongsToFacilityDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<FacilitySystemTypeGroupsBelongsToFacilityDisconnectFieldInput>>;
  update?: InputMaybe<FacilitySystemTypeGroupsBelongsToFacilityUpdateConnectionInput>;
  where?: InputMaybe<FacilitySystemTypeGroupsBelongsToFacilityConnectionWhere>;
};

export type FacilityUpdateInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  hasLocationLocations?: InputMaybe<Array<FacilityHasLocationLocationsUpdateFieldInput>>;
  hasZoneZones?: InputMaybe<Array<FacilityHasZoneZonesUpdateFieldInput>>;
  locationsBelongsToFacility?: InputMaybe<Array<FacilityLocationsBelongsToFacilityUpdateFieldInput>>;
  name?: InputMaybe<Scalars['String']['input']>;
  systemTypeGroupsBelongsToFacility?: InputMaybe<Array<FacilitySystemTypeGroupsBelongsToFacilityUpdateFieldInput>>;
  uid?: InputMaybe<Scalars['String']['input']>;
};

export type FacilityWhere = {
  AND?: InputMaybe<Array<FacilityWhere>>;
  NOT?: InputMaybe<FacilityWhere>;
  OR?: InputMaybe<Array<FacilityWhere>>;
  code?: InputMaybe<Scalars['String']['input']>;
  code_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  code_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  code_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  code_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  hasLocationLocationsAggregate?: InputMaybe<FacilityHasLocationLocationsAggregateInput>;
  /** Return Facilities where all of the related FacilityHasLocationLocationsConnections match this filter */
  hasLocationLocationsConnection_ALL?: InputMaybe<FacilityHasLocationLocationsConnectionWhere>;
  /** Return Facilities where none of the related FacilityHasLocationLocationsConnections match this filter */
  hasLocationLocationsConnection_NONE?: InputMaybe<FacilityHasLocationLocationsConnectionWhere>;
  /** Return Facilities where one of the related FacilityHasLocationLocationsConnections match this filter */
  hasLocationLocationsConnection_SINGLE?: InputMaybe<FacilityHasLocationLocationsConnectionWhere>;
  /** Return Facilities where some of the related FacilityHasLocationLocationsConnections match this filter */
  hasLocationLocationsConnection_SOME?: InputMaybe<FacilityHasLocationLocationsConnectionWhere>;
  /** Return Facilities where all of the related Locations match this filter */
  hasLocationLocations_ALL?: InputMaybe<LocationWhere>;
  /** Return Facilities where none of the related Locations match this filter */
  hasLocationLocations_NONE?: InputMaybe<LocationWhere>;
  /** Return Facilities where one of the related Locations match this filter */
  hasLocationLocations_SINGLE?: InputMaybe<LocationWhere>;
  /** Return Facilities where some of the related Locations match this filter */
  hasLocationLocations_SOME?: InputMaybe<LocationWhere>;
  hasZoneZonesAggregate?: InputMaybe<FacilityHasZoneZonesAggregateInput>;
  /** Return Facilities where all of the related FacilityHasZoneZonesConnections match this filter */
  hasZoneZonesConnection_ALL?: InputMaybe<FacilityHasZoneZonesConnectionWhere>;
  /** Return Facilities where none of the related FacilityHasZoneZonesConnections match this filter */
  hasZoneZonesConnection_NONE?: InputMaybe<FacilityHasZoneZonesConnectionWhere>;
  /** Return Facilities where one of the related FacilityHasZoneZonesConnections match this filter */
  hasZoneZonesConnection_SINGLE?: InputMaybe<FacilityHasZoneZonesConnectionWhere>;
  /** Return Facilities where some of the related FacilityHasZoneZonesConnections match this filter */
  hasZoneZonesConnection_SOME?: InputMaybe<FacilityHasZoneZonesConnectionWhere>;
  /** Return Facilities where all of the related Zones match this filter */
  hasZoneZones_ALL?: InputMaybe<ZoneWhere>;
  /** Return Facilities where none of the related Zones match this filter */
  hasZoneZones_NONE?: InputMaybe<ZoneWhere>;
  /** Return Facilities where one of the related Zones match this filter */
  hasZoneZones_SINGLE?: InputMaybe<ZoneWhere>;
  /** Return Facilities where some of the related Zones match this filter */
  hasZoneZones_SOME?: InputMaybe<ZoneWhere>;
  locationsBelongsToFacilityAggregate?: InputMaybe<FacilityLocationsBelongsToFacilityAggregateInput>;
  /** Return Facilities where all of the related FacilityLocationsBelongsToFacilityConnections match this filter */
  locationsBelongsToFacilityConnection_ALL?: InputMaybe<FacilityLocationsBelongsToFacilityConnectionWhere>;
  /** Return Facilities where none of the related FacilityLocationsBelongsToFacilityConnections match this filter */
  locationsBelongsToFacilityConnection_NONE?: InputMaybe<FacilityLocationsBelongsToFacilityConnectionWhere>;
  /** Return Facilities where one of the related FacilityLocationsBelongsToFacilityConnections match this filter */
  locationsBelongsToFacilityConnection_SINGLE?: InputMaybe<FacilityLocationsBelongsToFacilityConnectionWhere>;
  /** Return Facilities where some of the related FacilityLocationsBelongsToFacilityConnections match this filter */
  locationsBelongsToFacilityConnection_SOME?: InputMaybe<FacilityLocationsBelongsToFacilityConnectionWhere>;
  /** Return Facilities where all of the related Locations match this filter */
  locationsBelongsToFacility_ALL?: InputMaybe<LocationWhere>;
  /** Return Facilities where none of the related Locations match this filter */
  locationsBelongsToFacility_NONE?: InputMaybe<LocationWhere>;
  /** Return Facilities where one of the related Locations match this filter */
  locationsBelongsToFacility_SINGLE?: InputMaybe<LocationWhere>;
  /** Return Facilities where some of the related Locations match this filter */
  locationsBelongsToFacility_SOME?: InputMaybe<LocationWhere>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  systemTypeGroupsBelongsToFacilityAggregate?: InputMaybe<FacilitySystemTypeGroupsBelongsToFacilityAggregateInput>;
  /** Return Facilities where all of the related FacilitySystemTypeGroupsBelongsToFacilityConnections match this filter */
  systemTypeGroupsBelongsToFacilityConnection_ALL?: InputMaybe<FacilitySystemTypeGroupsBelongsToFacilityConnectionWhere>;
  /** Return Facilities where none of the related FacilitySystemTypeGroupsBelongsToFacilityConnections match this filter */
  systemTypeGroupsBelongsToFacilityConnection_NONE?: InputMaybe<FacilitySystemTypeGroupsBelongsToFacilityConnectionWhere>;
  /** Return Facilities where one of the related FacilitySystemTypeGroupsBelongsToFacilityConnections match this filter */
  systemTypeGroupsBelongsToFacilityConnection_SINGLE?: InputMaybe<FacilitySystemTypeGroupsBelongsToFacilityConnectionWhere>;
  /** Return Facilities where some of the related FacilitySystemTypeGroupsBelongsToFacilityConnections match this filter */
  systemTypeGroupsBelongsToFacilityConnection_SOME?: InputMaybe<FacilitySystemTypeGroupsBelongsToFacilityConnectionWhere>;
  /** Return Facilities where all of the related SystemTypeGroups match this filter */
  systemTypeGroupsBelongsToFacility_ALL?: InputMaybe<SystemTypeGroupWhere>;
  /** Return Facilities where none of the related SystemTypeGroups match this filter */
  systemTypeGroupsBelongsToFacility_NONE?: InputMaybe<SystemTypeGroupWhere>;
  /** Return Facilities where one of the related SystemTypeGroups match this filter */
  systemTypeGroupsBelongsToFacility_SINGLE?: InputMaybe<SystemTypeGroupWhere>;
  /** Return Facilities where some of the related SystemTypeGroups match this filter */
  systemTypeGroupsBelongsToFacility_SOME?: InputMaybe<SystemTypeGroupWhere>;
  uid?: InputMaybe<Scalars['String']['input']>;
  uid_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  uid_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  uid_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  uid_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
};

export type FacilityZoneHasZoneZonesAggregationSelection = {
  __typename?: 'FacilityZoneHasZoneZonesAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<FacilityZoneHasZoneZonesNodeAggregateSelection>;
};

export type FacilityZoneHasZoneZonesNodeAggregateSelection = {
  __typename?: 'FacilityZoneHasZoneZonesNodeAggregateSelection';
  code: StringAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  uid: IdAggregateSelectionNonNullable;
};

export type HallContactPeopleConnection = {
  __typename?: 'HallContactPeopleConnection';
  edges: Array<HallContactPersonEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type HallContactPerson = {
  __typename?: 'HallContactPerson';
  employee: Employee;
  employeeAggregate?: Maybe<HallContactPersonEmployeeEmployeeAggregationSelection>;
  employeeConnection: HallContactPersonEmployeeConnection;
  role?: Maybe<ContactPersonRole>;
  roleAggregate?: Maybe<HallContactPersonContactPersonRoleRoleAggregationSelection>;
  roleConnection: HallContactPersonRoleConnection;
  roomCard: RoomCard;
  roomCardAggregate?: Maybe<HallContactPersonRoomCardRoomCardAggregationSelection>;
  roomCardConnection: HallContactPersonRoomCardConnection;
  uid: Scalars['ID']['output'];
};


export type HallContactPersonEmployeeArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<EmployeeOptions>;
  where?: InputMaybe<EmployeeWhere>;
};


export type HallContactPersonEmployeeAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<EmployeeWhere>;
};


export type HallContactPersonEmployeeConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<HallContactPersonEmployeeConnectionSort>>;
  where?: InputMaybe<HallContactPersonEmployeeConnectionWhere>;
};


export type HallContactPersonRoleArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<ContactPersonRoleOptions>;
  where?: InputMaybe<ContactPersonRoleWhere>;
};


export type HallContactPersonRoleAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ContactPersonRoleWhere>;
};


export type HallContactPersonRoleConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<HallContactPersonRoleConnectionSort>>;
  where?: InputMaybe<HallContactPersonRoleConnectionWhere>;
};


export type HallContactPersonRoomCardArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<RoomCardOptions>;
  where?: InputMaybe<RoomCardWhere>;
};


export type HallContactPersonRoomCardAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<RoomCardWhere>;
};


export type HallContactPersonRoomCardConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<HallContactPersonRoomCardConnectionSort>>;
  where?: InputMaybe<HallContactPersonRoomCardConnectionWhere>;
};

export type HallContactPersonAggregateSelection = {
  __typename?: 'HallContactPersonAggregateSelection';
  count: Scalars['Int']['output'];
  uid: IdAggregateSelectionNonNullable;
};

export type HallContactPersonConnectInput = {
  employee?: InputMaybe<HallContactPersonEmployeeConnectFieldInput>;
  role?: InputMaybe<HallContactPersonRoleConnectFieldInput>;
  roomCard?: InputMaybe<HallContactPersonRoomCardConnectFieldInput>;
};

export type HallContactPersonConnectWhere = {
  node: HallContactPersonWhere;
};

export type HallContactPersonContactPersonRoleRoleAggregationSelection = {
  __typename?: 'HallContactPersonContactPersonRoleRoleAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<HallContactPersonContactPersonRoleRoleNodeAggregateSelection>;
};

export type HallContactPersonContactPersonRoleRoleNodeAggregateSelection = {
  __typename?: 'HallContactPersonContactPersonRoleRoleNodeAggregateSelection';
  name: StringAggregateSelectionNonNullable;
  uid: IdAggregateSelectionNonNullable;
};

export type HallContactPersonCreateInput = {
  employee?: InputMaybe<HallContactPersonEmployeeFieldInput>;
  role?: InputMaybe<HallContactPersonRoleFieldInput>;
  roomCard?: InputMaybe<HallContactPersonRoomCardFieldInput>;
};

export type HallContactPersonDeleteInput = {
  employee?: InputMaybe<HallContactPersonEmployeeDeleteFieldInput>;
  role?: InputMaybe<HallContactPersonRoleDeleteFieldInput>;
  roomCard?: InputMaybe<HallContactPersonRoomCardDeleteFieldInput>;
};

export type HallContactPersonDisconnectInput = {
  employee?: InputMaybe<HallContactPersonEmployeeDisconnectFieldInput>;
  role?: InputMaybe<HallContactPersonRoleDisconnectFieldInput>;
  roomCard?: InputMaybe<HallContactPersonRoomCardDisconnectFieldInput>;
};

export type HallContactPersonEdge = {
  __typename?: 'HallContactPersonEdge';
  cursor: Scalars['String']['output'];
  node: HallContactPerson;
};

export type HallContactPersonEmployeeAggregateInput = {
  AND?: InputMaybe<Array<HallContactPersonEmployeeAggregateInput>>;
  NOT?: InputMaybe<HallContactPersonEmployeeAggregateInput>;
  OR?: InputMaybe<Array<HallContactPersonEmployeeAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<HallContactPersonEmployeeNodeAggregationWhereInput>;
};

export type HallContactPersonEmployeeConnectFieldInput = {
  connect?: InputMaybe<EmployeeConnectInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<EmployeeConnectWhere>;
};

export type HallContactPersonEmployeeConnection = {
  __typename?: 'HallContactPersonEmployeeConnection';
  edges: Array<HallContactPersonEmployeeRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type HallContactPersonEmployeeConnectionSort = {
  node?: InputMaybe<EmployeeSort>;
};

export type HallContactPersonEmployeeConnectionWhere = {
  AND?: InputMaybe<Array<HallContactPersonEmployeeConnectionWhere>>;
  NOT?: InputMaybe<HallContactPersonEmployeeConnectionWhere>;
  OR?: InputMaybe<Array<HallContactPersonEmployeeConnectionWhere>>;
  node?: InputMaybe<EmployeeWhere>;
};

export type HallContactPersonEmployeeCreateFieldInput = {
  node: EmployeeCreateInput;
};

export type HallContactPersonEmployeeDeleteFieldInput = {
  delete?: InputMaybe<EmployeeDeleteInput>;
  where?: InputMaybe<HallContactPersonEmployeeConnectionWhere>;
};

export type HallContactPersonEmployeeDisconnectFieldInput = {
  disconnect?: InputMaybe<EmployeeDisconnectInput>;
  where?: InputMaybe<HallContactPersonEmployeeConnectionWhere>;
};

export type HallContactPersonEmployeeEmployeeAggregationSelection = {
  __typename?: 'HallContactPersonEmployeeEmployeeAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<HallContactPersonEmployeeEmployeeNodeAggregateSelection>;
};

export type HallContactPersonEmployeeEmployeeNodeAggregateSelection = {
  __typename?: 'HallContactPersonEmployeeEmployeeNodeAggregateSelection';
  email: StringAggregateSelectionNullable;
  firstName: StringAggregateSelectionNonNullable;
  fullName: StringAggregateSelectionNullable;
  lastName: StringAggregateSelectionNonNullable;
  phoneNumber: StringAggregateSelectionNullable;
  uid: IdAggregateSelectionNonNullable;
};

export type HallContactPersonEmployeeFieldInput = {
  connect?: InputMaybe<HallContactPersonEmployeeConnectFieldInput>;
  create?: InputMaybe<HallContactPersonEmployeeCreateFieldInput>;
};

export type HallContactPersonEmployeeNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<HallContactPersonEmployeeNodeAggregationWhereInput>>;
  NOT?: InputMaybe<HallContactPersonEmployeeNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<HallContactPersonEmployeeNodeAggregationWhereInput>>;
  email_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  email_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  email_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  email_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  email_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  email_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  email_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  email_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  email_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  firstName_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  firstName_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  firstName_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  firstName_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  firstName_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  firstName_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  firstName_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  firstName_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  firstName_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  firstName_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  firstName_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  firstName_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  firstName_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  firstName_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  firstName_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  fullName_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  fullName_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  fullName_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  fullName_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  fullName_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  fullName_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  fullName_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  fullName_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  fullName_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  fullName_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  fullName_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  fullName_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  fullName_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  fullName_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  fullName_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  lastName_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  lastName_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  lastName_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  lastName_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  lastName_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  lastName_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  lastName_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  lastName_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  lastName_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  lastName_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  lastName_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  lastName_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  lastName_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  lastName_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  lastName_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  phoneNumber_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  phoneNumber_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  phoneNumber_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  phoneNumber_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  phoneNumber_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type HallContactPersonEmployeeRelationship = {
  __typename?: 'HallContactPersonEmployeeRelationship';
  cursor: Scalars['String']['output'];
  node: Employee;
};

export type HallContactPersonEmployeeUpdateConnectionInput = {
  node?: InputMaybe<EmployeeUpdateInput>;
};

export type HallContactPersonEmployeeUpdateFieldInput = {
  connect?: InputMaybe<HallContactPersonEmployeeConnectFieldInput>;
  create?: InputMaybe<HallContactPersonEmployeeCreateFieldInput>;
  delete?: InputMaybe<HallContactPersonEmployeeDeleteFieldInput>;
  disconnect?: InputMaybe<HallContactPersonEmployeeDisconnectFieldInput>;
  update?: InputMaybe<HallContactPersonEmployeeUpdateConnectionInput>;
  where?: InputMaybe<HallContactPersonEmployeeConnectionWhere>;
};

export type HallContactPersonOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /** Specify one or more HallContactPersonSort objects to sort HallContactPeople by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<HallContactPersonSort>>;
};

export type HallContactPersonRelationInput = {
  employee?: InputMaybe<HallContactPersonEmployeeCreateFieldInput>;
  role?: InputMaybe<HallContactPersonRoleCreateFieldInput>;
  roomCard?: InputMaybe<HallContactPersonRoomCardCreateFieldInput>;
};

export type HallContactPersonRoleAggregateInput = {
  AND?: InputMaybe<Array<HallContactPersonRoleAggregateInput>>;
  NOT?: InputMaybe<HallContactPersonRoleAggregateInput>;
  OR?: InputMaybe<Array<HallContactPersonRoleAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<HallContactPersonRoleNodeAggregationWhereInput>;
};

export type HallContactPersonRoleConnectFieldInput = {
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<ContactPersonRoleConnectWhere>;
};

export type HallContactPersonRoleConnection = {
  __typename?: 'HallContactPersonRoleConnection';
  edges: Array<HallContactPersonRoleRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type HallContactPersonRoleConnectionSort = {
  node?: InputMaybe<ContactPersonRoleSort>;
};

export type HallContactPersonRoleConnectionWhere = {
  AND?: InputMaybe<Array<HallContactPersonRoleConnectionWhere>>;
  NOT?: InputMaybe<HallContactPersonRoleConnectionWhere>;
  OR?: InputMaybe<Array<HallContactPersonRoleConnectionWhere>>;
  node?: InputMaybe<ContactPersonRoleWhere>;
};

export type HallContactPersonRoleCreateFieldInput = {
  node: ContactPersonRoleCreateInput;
};

export type HallContactPersonRoleDeleteFieldInput = {
  where?: InputMaybe<HallContactPersonRoleConnectionWhere>;
};

export type HallContactPersonRoleDisconnectFieldInput = {
  where?: InputMaybe<HallContactPersonRoleConnectionWhere>;
};

export type HallContactPersonRoleFieldInput = {
  connect?: InputMaybe<HallContactPersonRoleConnectFieldInput>;
  create?: InputMaybe<HallContactPersonRoleCreateFieldInput>;
};

export type HallContactPersonRoleNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<HallContactPersonRoleNodeAggregationWhereInput>>;
  NOT?: InputMaybe<HallContactPersonRoleNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<HallContactPersonRoleNodeAggregationWhereInput>>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type HallContactPersonRoleRelationship = {
  __typename?: 'HallContactPersonRoleRelationship';
  cursor: Scalars['String']['output'];
  node: ContactPersonRole;
};

export type HallContactPersonRoleUpdateConnectionInput = {
  node?: InputMaybe<ContactPersonRoleUpdateInput>;
};

export type HallContactPersonRoleUpdateFieldInput = {
  connect?: InputMaybe<HallContactPersonRoleConnectFieldInput>;
  create?: InputMaybe<HallContactPersonRoleCreateFieldInput>;
  delete?: InputMaybe<HallContactPersonRoleDeleteFieldInput>;
  disconnect?: InputMaybe<HallContactPersonRoleDisconnectFieldInput>;
  update?: InputMaybe<HallContactPersonRoleUpdateConnectionInput>;
  where?: InputMaybe<HallContactPersonRoleConnectionWhere>;
};

export type HallContactPersonRoomCardAggregateInput = {
  AND?: InputMaybe<Array<HallContactPersonRoomCardAggregateInput>>;
  NOT?: InputMaybe<HallContactPersonRoomCardAggregateInput>;
  OR?: InputMaybe<Array<HallContactPersonRoomCardAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<HallContactPersonRoomCardNodeAggregationWhereInput>;
};

export type HallContactPersonRoomCardConnectFieldInput = {
  connect?: InputMaybe<RoomCardConnectInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<RoomCardConnectWhere>;
};

export type HallContactPersonRoomCardConnection = {
  __typename?: 'HallContactPersonRoomCardConnection';
  edges: Array<HallContactPersonRoomCardRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type HallContactPersonRoomCardConnectionSort = {
  node?: InputMaybe<RoomCardSort>;
};

export type HallContactPersonRoomCardConnectionWhere = {
  AND?: InputMaybe<Array<HallContactPersonRoomCardConnectionWhere>>;
  NOT?: InputMaybe<HallContactPersonRoomCardConnectionWhere>;
  OR?: InputMaybe<Array<HallContactPersonRoomCardConnectionWhere>>;
  node?: InputMaybe<RoomCardWhere>;
};

export type HallContactPersonRoomCardCreateFieldInput = {
  node: RoomCardCreateInput;
};

export type HallContactPersonRoomCardDeleteFieldInput = {
  delete?: InputMaybe<RoomCardDeleteInput>;
  where?: InputMaybe<HallContactPersonRoomCardConnectionWhere>;
};

export type HallContactPersonRoomCardDisconnectFieldInput = {
  disconnect?: InputMaybe<RoomCardDisconnectInput>;
  where?: InputMaybe<HallContactPersonRoomCardConnectionWhere>;
};

export type HallContactPersonRoomCardFieldInput = {
  connect?: InputMaybe<HallContactPersonRoomCardConnectFieldInput>;
  create?: InputMaybe<HallContactPersonRoomCardCreateFieldInput>;
};

export type HallContactPersonRoomCardNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<HallContactPersonRoomCardNodeAggregationWhereInput>>;
  NOT?: InputMaybe<HallContactPersonRoomCardNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<HallContactPersonRoomCardNodeAggregationWhereInput>>;
  additionalRequirements_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  additionalRequirements_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  additionalRequirements_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  additionalRequirements_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  additionalRequirements_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  additionalRequirements_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  additionalRequirements_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  additionalRequirements_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  additionalRequirements_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  additionalRequirements_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  additionalRequirements_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  additionalRequirements_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  additionalRequirements_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  additionalRequirements_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  additionalRequirements_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  compressedAirDistributionClient_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  compressedAirDistributionClient_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  compressedAirDistributionClient_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  compressedAirDistributionClient_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  compressedAirDistributionClient_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  compressedAirDistributionClient_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  compressedAirDistributionClient_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  compressedAirDistributionClient_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  compressedAirDistributionClient_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  compressedAirDistributionClient_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  compressedAirDistributionClient_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  compressedAirDistributionClient_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  compressedAirDistributionClient_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  compressedAirDistributionClient_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  compressedAirDistributionClient_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  compressedAirDistribution_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  compressedAirDistribution_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  compressedAirDistribution_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  compressedAirDistribution_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  compressedAirDistribution_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  compressedAirDistribution_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  compressedAirDistribution_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  compressedAirDistribution_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  compressedAirDistribution_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  compressedAirDistribution_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  compressedAirDistribution_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  compressedAirDistribution_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  compressedAirDistribution_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  compressedAirDistribution_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  compressedAirDistribution_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  coolingWaterClient_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  coolingWaterClient_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  coolingWaterClient_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  coolingWaterClient_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  coolingWaterClient_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  coolingWaterClient_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  coolingWaterClient_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  coolingWaterClient_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  coolingWaterClient_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  coolingWaterClient_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  coolingWaterClient_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  coolingWaterClient_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  coolingWaterClient_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  coolingWaterClient_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  coolingWaterClient_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  coolingWater_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  coolingWater_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  coolingWater_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  coolingWater_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  coolingWater_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  coolingWater_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  coolingWater_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  coolingWater_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  coolingWater_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  coolingWater_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  coolingWater_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  coolingWater_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  coolingWater_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  coolingWater_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  coolingWater_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  entryToHvacTent_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  entryToHvacTent_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  entryToHvacTent_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  entryToHvacTent_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  entryToHvacTent_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  entryToHvacTent_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  entryToHvacTent_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  entryToHvacTent_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  entryToHvacTent_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  entryToHvacTent_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  entryToHvacTent_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  entryToHvacTent_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  entryToHvacTent_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  entryToHvacTent_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  entryToHvacTent_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  indoorEnvironmentQualityClient_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  indoorEnvironmentQualityClient_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  indoorEnvironmentQualityClient_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  indoorEnvironmentQualityClient_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  indoorEnvironmentQualityClient_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  indoorEnvironmentQualityClient_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  indoorEnvironmentQualityClient_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  indoorEnvironmentQualityClient_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  indoorEnvironmentQualityClient_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  indoorEnvironmentQualityClient_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  indoorEnvironmentQualityClient_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  indoorEnvironmentQualityClient_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  indoorEnvironmentQualityClient_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  indoorEnvironmentQualityClient_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  indoorEnvironmentQualityClient_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  indoorEnvironmentQuality_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  indoorEnvironmentQuality_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  indoorEnvironmentQuality_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  indoorEnvironmentQuality_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  indoorEnvironmentQuality_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  indoorEnvironmentQuality_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  indoorEnvironmentQuality_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  indoorEnvironmentQuality_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  indoorEnvironmentQuality_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  indoorEnvironmentQuality_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  indoorEnvironmentQuality_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  indoorEnvironmentQuality_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  indoorEnvironmentQuality_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  indoorEnvironmentQuality_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  indoorEnvironmentQuality_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  maxPressureInColdDistributionClient_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  maxPressureInColdDistributionClient_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  maxPressureInColdDistributionClient_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  maxPressureInColdDistributionClient_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  maxPressureInColdDistributionClient_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  maxPressureInColdDistributionClient_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  maxPressureInColdDistributionClient_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  maxPressureInColdDistributionClient_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  maxPressureInColdDistributionClient_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  maxPressureInColdDistributionClient_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  maxPressureInColdDistributionClient_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  maxPressureInColdDistributionClient_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  maxPressureInColdDistributionClient_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  maxPressureInColdDistributionClient_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  maxPressureInColdDistributionClient_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  maxPressureInColdDistribution_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  maxPressureInColdDistribution_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  maxPressureInColdDistribution_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  maxPressureInColdDistribution_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  maxPressureInColdDistribution_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  maxPressureInColdDistribution_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  maxPressureInColdDistribution_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  maxPressureInColdDistribution_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  maxPressureInColdDistribution_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  maxPressureInColdDistribution_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  maxPressureInColdDistribution_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  maxPressureInColdDistribution_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  maxPressureInColdDistribution_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  maxPressureInColdDistribution_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  maxPressureInColdDistribution_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  nitrogenCentralDistributionClient_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  nitrogenCentralDistributionClient_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  nitrogenCentralDistributionClient_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  nitrogenCentralDistributionClient_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  nitrogenCentralDistributionClient_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  nitrogenCentralDistributionClient_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  nitrogenCentralDistributionClient_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  nitrogenCentralDistributionClient_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  nitrogenCentralDistributionClient_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  nitrogenCentralDistributionClient_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  nitrogenCentralDistributionClient_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  nitrogenCentralDistributionClient_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  nitrogenCentralDistributionClient_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  nitrogenCentralDistributionClient_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  nitrogenCentralDistributionClient_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  nitrogenCentralDistribution_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  nitrogenCentralDistribution_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  nitrogenCentralDistribution_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  nitrogenCentralDistribution_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  nitrogenCentralDistribution_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  nitrogenCentralDistribution_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  nitrogenCentralDistribution_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  nitrogenCentralDistribution_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  nitrogenCentralDistribution_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  nitrogenCentralDistribution_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  nitrogenCentralDistribution_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  nitrogenCentralDistribution_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  nitrogenCentralDistribution_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  nitrogenCentralDistribution_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  nitrogenCentralDistribution_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type HallContactPersonRoomCardRelationship = {
  __typename?: 'HallContactPersonRoomCardRelationship';
  cursor: Scalars['String']['output'];
  node: RoomCard;
};

export type HallContactPersonRoomCardRoomCardAggregationSelection = {
  __typename?: 'HallContactPersonRoomCardRoomCardAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<HallContactPersonRoomCardRoomCardNodeAggregateSelection>;
};

export type HallContactPersonRoomCardRoomCardNodeAggregateSelection = {
  __typename?: 'HallContactPersonRoomCardRoomCardNodeAggregateSelection';
  additionalRequirements: StringAggregateSelectionNullable;
  compressedAirDistribution: StringAggregateSelectionNullable;
  compressedAirDistributionClient: StringAggregateSelectionNullable;
  coolingWater: StringAggregateSelectionNullable;
  coolingWaterClient: StringAggregateSelectionNullable;
  entryToHvacTent: StringAggregateSelectionNullable;
  indoorEnvironmentQuality: StringAggregateSelectionNullable;
  indoorEnvironmentQualityClient: StringAggregateSelectionNullable;
  maxPressureInColdDistribution: StringAggregateSelectionNullable;
  maxPressureInColdDistributionClient: StringAggregateSelectionNullable;
  name: StringAggregateSelectionNonNullable;
  nitrogenCentralDistribution: StringAggregateSelectionNullable;
  nitrogenCentralDistributionClient: StringAggregateSelectionNullable;
  uid: IdAggregateSelectionNonNullable;
};

export type HallContactPersonRoomCardUpdateConnectionInput = {
  node?: InputMaybe<RoomCardUpdateInput>;
};

export type HallContactPersonRoomCardUpdateFieldInput = {
  connect?: InputMaybe<HallContactPersonRoomCardConnectFieldInput>;
  create?: InputMaybe<HallContactPersonRoomCardCreateFieldInput>;
  delete?: InputMaybe<HallContactPersonRoomCardDeleteFieldInput>;
  disconnect?: InputMaybe<HallContactPersonRoomCardDisconnectFieldInput>;
  update?: InputMaybe<HallContactPersonRoomCardUpdateConnectionInput>;
  where?: InputMaybe<HallContactPersonRoomCardConnectionWhere>;
};

/** Fields to sort HallContactPeople by. The order in which sorts are applied is not guaranteed when specifying many fields in one HallContactPersonSort object. */
export type HallContactPersonSort = {
  uid?: InputMaybe<SortDirection>;
};

export type HallContactPersonUpdateInput = {
  employee?: InputMaybe<HallContactPersonEmployeeUpdateFieldInput>;
  role?: InputMaybe<HallContactPersonRoleUpdateFieldInput>;
  roomCard?: InputMaybe<HallContactPersonRoomCardUpdateFieldInput>;
};

export type HallContactPersonWhere = {
  AND?: InputMaybe<Array<HallContactPersonWhere>>;
  NOT?: InputMaybe<HallContactPersonWhere>;
  OR?: InputMaybe<Array<HallContactPersonWhere>>;
  employee?: InputMaybe<EmployeeWhere>;
  employeeAggregate?: InputMaybe<HallContactPersonEmployeeAggregateInput>;
  employeeConnection?: InputMaybe<HallContactPersonEmployeeConnectionWhere>;
  employeeConnection_NOT?: InputMaybe<HallContactPersonEmployeeConnectionWhere>;
  employee_NOT?: InputMaybe<EmployeeWhere>;
  role?: InputMaybe<ContactPersonRoleWhere>;
  roleAggregate?: InputMaybe<HallContactPersonRoleAggregateInput>;
  roleConnection?: InputMaybe<HallContactPersonRoleConnectionWhere>;
  roleConnection_NOT?: InputMaybe<HallContactPersonRoleConnectionWhere>;
  role_NOT?: InputMaybe<ContactPersonRoleWhere>;
  roomCard?: InputMaybe<RoomCardWhere>;
  roomCardAggregate?: InputMaybe<HallContactPersonRoomCardAggregateInput>;
  roomCardConnection?: InputMaybe<HallContactPersonRoomCardConnectionWhere>;
  roomCardConnection_NOT?: InputMaybe<HallContactPersonRoomCardConnectionWhere>;
  roomCard_NOT?: InputMaybe<RoomCardWhere>;
  uid?: InputMaybe<Scalars['ID']['input']>;
  uid_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  uid_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  uid_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  uid_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
};

export type IdAggregateSelectionNonNullable = {
  __typename?: 'IDAggregateSelectionNonNullable';
  longest: Scalars['ID']['output'];
  shortest: Scalars['ID']['output'];
};

export type IdAggregateSelectionNullable = {
  __typename?: 'IDAggregateSelectionNullable';
  longest?: Maybe<Scalars['ID']['output']>;
  shortest?: Maybe<Scalars['ID']['output']>;
};

export type Item = {
  __typename?: 'Item';
  catalogueItem: CatalogueItem;
  catalogueItemAggregate?: Maybe<ItemCatalogueItemCatalogueItemAggregationSelection>;
  catalogueItemConnection: ItemCatalogueItemConnection;
  conditionStatus?: Maybe<ItemCondition>;
  conditionStatusAggregate?: Maybe<ItemItemConditionConditionStatusAggregationSelection>;
  conditionStatusConnection: ItemConditionStatusConnection;
  eun?: Maybe<Scalars['String']['output']>;
  itemUsage?: Maybe<ItemUsage>;
  itemUsageAggregate?: Maybe<ItemItemUsageItemUsageAggregationSelection>;
  itemUsageConnection: ItemItemUsageConnection;
  name: Scalars['String']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  order?: Maybe<Order>;
  orderAggregate?: Maybe<ItemOrderOrderAggregationSelection>;
  orderConnection: ItemOrderConnection;
  serialNumber?: Maybe<Scalars['String']['output']>;
  system: Array<System>;
  systemAggregate?: Maybe<ItemSystemSystemAggregationSelection>;
  systemConnection: ItemSystemConnection;
  uid: Scalars['ID']['output'];
};


export type ItemCatalogueItemArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<CatalogueItemOptions>;
  where?: InputMaybe<CatalogueItemWhere>;
};


export type ItemCatalogueItemAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<CatalogueItemWhere>;
};


export type ItemCatalogueItemConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<ItemCatalogueItemConnectionSort>>;
  where?: InputMaybe<ItemCatalogueItemConnectionWhere>;
};


export type ItemConditionStatusArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<ItemConditionOptions>;
  where?: InputMaybe<ItemConditionWhere>;
};


export type ItemConditionStatusAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ItemConditionWhere>;
};


export type ItemConditionStatusConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<ItemConditionStatusConnectionSort>>;
  where?: InputMaybe<ItemConditionStatusConnectionWhere>;
};


export type ItemItemUsageArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<ItemUsageOptions>;
  where?: InputMaybe<ItemUsageWhere>;
};


export type ItemItemUsageAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ItemUsageWhere>;
};


export type ItemItemUsageConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<ItemItemUsageConnectionSort>>;
  where?: InputMaybe<ItemItemUsageConnectionWhere>;
};


export type ItemOrderArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<OrderOptions>;
  where?: InputMaybe<OrderWhere>;
};


export type ItemOrderAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<OrderWhere>;
};


export type ItemOrderConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<ItemOrderConnectionSort>>;
  where?: InputMaybe<ItemOrderConnectionWhere>;
};


export type ItemSystemArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<SystemOptions>;
  where?: InputMaybe<SystemWhere>;
};


export type ItemSystemAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<SystemWhere>;
};


export type ItemSystemConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<ItemSystemConnectionSort>>;
  where?: InputMaybe<ItemSystemConnectionWhere>;
};

export type ItemAggregateSelection = {
  __typename?: 'ItemAggregateSelection';
  count: Scalars['Int']['output'];
  eun: StringAggregateSelectionNullable;
  name: StringAggregateSelectionNonNullable;
  notes: StringAggregateSelectionNullable;
  serialNumber: StringAggregateSelectionNullable;
  uid: IdAggregateSelectionNonNullable;
};

export type ItemCatalogueItemAggregateInput = {
  AND?: InputMaybe<Array<ItemCatalogueItemAggregateInput>>;
  NOT?: InputMaybe<ItemCatalogueItemAggregateInput>;
  OR?: InputMaybe<Array<ItemCatalogueItemAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<ItemCatalogueItemNodeAggregationWhereInput>;
};

export type ItemCatalogueItemCatalogueItemAggregationSelection = {
  __typename?: 'ItemCatalogueItemCatalogueItemAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<ItemCatalogueItemCatalogueItemNodeAggregateSelection>;
};

export type ItemCatalogueItemCatalogueItemNodeAggregateSelection = {
  __typename?: 'ItemCatalogueItemCatalogueItemNodeAggregateSelection';
  catalogueNumber: StringAggregateSelectionNonNullable;
  description: StringAggregateSelectionNullable;
  manufacturerUrl: StringAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  uid: StringAggregateSelectionNonNullable;
};

export type ItemCatalogueItemConnectFieldInput = {
  connect?: InputMaybe<CatalogueItemConnectInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<CatalogueItemConnectWhere>;
};

export type ItemCatalogueItemConnection = {
  __typename?: 'ItemCatalogueItemConnection';
  edges: Array<ItemCatalogueItemRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type ItemCatalogueItemConnectionSort = {
  node?: InputMaybe<CatalogueItemSort>;
};

export type ItemCatalogueItemConnectionWhere = {
  AND?: InputMaybe<Array<ItemCatalogueItemConnectionWhere>>;
  NOT?: InputMaybe<ItemCatalogueItemConnectionWhere>;
  OR?: InputMaybe<Array<ItemCatalogueItemConnectionWhere>>;
  node?: InputMaybe<CatalogueItemWhere>;
};

export type ItemCatalogueItemCreateFieldInput = {
  node: CatalogueItemCreateInput;
};

export type ItemCatalogueItemDeleteFieldInput = {
  delete?: InputMaybe<CatalogueItemDeleteInput>;
  where?: InputMaybe<ItemCatalogueItemConnectionWhere>;
};

export type ItemCatalogueItemDisconnectFieldInput = {
  disconnect?: InputMaybe<CatalogueItemDisconnectInput>;
  where?: InputMaybe<ItemCatalogueItemConnectionWhere>;
};

export type ItemCatalogueItemFieldInput = {
  connect?: InputMaybe<ItemCatalogueItemConnectFieldInput>;
  create?: InputMaybe<ItemCatalogueItemCreateFieldInput>;
};

export type ItemCatalogueItemNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ItemCatalogueItemNodeAggregationWhereInput>>;
  NOT?: InputMaybe<ItemCatalogueItemNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<ItemCatalogueItemNodeAggregationWhereInput>>;
  catalogueNumber_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  catalogueNumber_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  catalogueNumber_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  catalogueNumber_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  catalogueNumber_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  catalogueNumber_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  catalogueNumber_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  catalogueNumber_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  catalogueNumber_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  catalogueNumber_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  catalogueNumber_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  catalogueNumber_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  catalogueNumber_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  catalogueNumber_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  catalogueNumber_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  description_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  description_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  description_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  description_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  description_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  description_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  description_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  description_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  description_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  description_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  manufacturerUrl_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  manufacturerUrl_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  manufacturerUrl_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  manufacturerUrl_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  manufacturerUrl_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  manufacturerUrl_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  manufacturerUrl_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  manufacturerUrl_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  manufacturerUrl_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  manufacturerUrl_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  manufacturerUrl_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  manufacturerUrl_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  manufacturerUrl_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  manufacturerUrl_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  manufacturerUrl_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  uid_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  uid_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  uid_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  uid_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  uid_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  uid_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  uid_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  uid_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  uid_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  uid_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type ItemCatalogueItemRelationship = {
  __typename?: 'ItemCatalogueItemRelationship';
  cursor: Scalars['String']['output'];
  node: CatalogueItem;
};

export type ItemCatalogueItemUpdateConnectionInput = {
  node?: InputMaybe<CatalogueItemUpdateInput>;
};

export type ItemCatalogueItemUpdateFieldInput = {
  connect?: InputMaybe<ItemCatalogueItemConnectFieldInput>;
  create?: InputMaybe<ItemCatalogueItemCreateFieldInput>;
  delete?: InputMaybe<ItemCatalogueItemDeleteFieldInput>;
  disconnect?: InputMaybe<ItemCatalogueItemDisconnectFieldInput>;
  update?: InputMaybe<ItemCatalogueItemUpdateConnectionInput>;
  where?: InputMaybe<ItemCatalogueItemConnectionWhere>;
};

export type ItemCondition = {
  __typename?: 'ItemCondition';
  code: Scalars['String']['output'];
  name: Scalars['String']['output'];
  uid: Scalars['ID']['output'];
};

export type ItemConditionAggregateSelection = {
  __typename?: 'ItemConditionAggregateSelection';
  code: StringAggregateSelectionNonNullable;
  count: Scalars['Int']['output'];
  name: StringAggregateSelectionNonNullable;
  uid: IdAggregateSelectionNonNullable;
};

export type ItemConditionConnectWhere = {
  node: ItemConditionWhere;
};

export type ItemConditionCreateInput = {
  code: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type ItemConditionEdge = {
  __typename?: 'ItemConditionEdge';
  cursor: Scalars['String']['output'];
  node: ItemCondition;
};

export type ItemConditionOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /** Specify one or more ItemConditionSort objects to sort ItemConditions by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<ItemConditionSort>>;
};

/** Fields to sort ItemConditions by. The order in which sorts are applied is not guaranteed when specifying many fields in one ItemConditionSort object. */
export type ItemConditionSort = {
  code?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  uid?: InputMaybe<SortDirection>;
};

export type ItemConditionStatusAggregateInput = {
  AND?: InputMaybe<Array<ItemConditionStatusAggregateInput>>;
  NOT?: InputMaybe<ItemConditionStatusAggregateInput>;
  OR?: InputMaybe<Array<ItemConditionStatusAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<ItemConditionStatusNodeAggregationWhereInput>;
};

export type ItemConditionStatusConnectFieldInput = {
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<ItemConditionConnectWhere>;
};

export type ItemConditionStatusConnection = {
  __typename?: 'ItemConditionStatusConnection';
  edges: Array<ItemConditionStatusRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type ItemConditionStatusConnectionSort = {
  node?: InputMaybe<ItemConditionSort>;
};

export type ItemConditionStatusConnectionWhere = {
  AND?: InputMaybe<Array<ItemConditionStatusConnectionWhere>>;
  NOT?: InputMaybe<ItemConditionStatusConnectionWhere>;
  OR?: InputMaybe<Array<ItemConditionStatusConnectionWhere>>;
  node?: InputMaybe<ItemConditionWhere>;
};

export type ItemConditionStatusCreateFieldInput = {
  node: ItemConditionCreateInput;
};

export type ItemConditionStatusDeleteFieldInput = {
  where?: InputMaybe<ItemConditionStatusConnectionWhere>;
};

export type ItemConditionStatusDisconnectFieldInput = {
  where?: InputMaybe<ItemConditionStatusConnectionWhere>;
};

export type ItemConditionStatusFieldInput = {
  connect?: InputMaybe<ItemConditionStatusConnectFieldInput>;
  create?: InputMaybe<ItemConditionStatusCreateFieldInput>;
};

export type ItemConditionStatusNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ItemConditionStatusNodeAggregationWhereInput>>;
  NOT?: InputMaybe<ItemConditionStatusNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<ItemConditionStatusNodeAggregationWhereInput>>;
  code_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  code_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type ItemConditionStatusRelationship = {
  __typename?: 'ItemConditionStatusRelationship';
  cursor: Scalars['String']['output'];
  node: ItemCondition;
};

export type ItemConditionStatusUpdateConnectionInput = {
  node?: InputMaybe<ItemConditionUpdateInput>;
};

export type ItemConditionStatusUpdateFieldInput = {
  connect?: InputMaybe<ItemConditionStatusConnectFieldInput>;
  create?: InputMaybe<ItemConditionStatusCreateFieldInput>;
  delete?: InputMaybe<ItemConditionStatusDeleteFieldInput>;
  disconnect?: InputMaybe<ItemConditionStatusDisconnectFieldInput>;
  update?: InputMaybe<ItemConditionStatusUpdateConnectionInput>;
  where?: InputMaybe<ItemConditionStatusConnectionWhere>;
};

export type ItemConditionUpdateInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type ItemConditionWhere = {
  AND?: InputMaybe<Array<ItemConditionWhere>>;
  NOT?: InputMaybe<ItemConditionWhere>;
  OR?: InputMaybe<Array<ItemConditionWhere>>;
  code?: InputMaybe<Scalars['String']['input']>;
  code_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  code_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  code_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  code_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  uid?: InputMaybe<Scalars['ID']['input']>;
  uid_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  uid_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  uid_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  uid_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
};

export type ItemConditionsConnection = {
  __typename?: 'ItemConditionsConnection';
  edges: Array<ItemConditionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type ItemConnectInput = {
  catalogueItem?: InputMaybe<ItemCatalogueItemConnectFieldInput>;
  conditionStatus?: InputMaybe<ItemConditionStatusConnectFieldInput>;
  itemUsage?: InputMaybe<ItemItemUsageConnectFieldInput>;
  order?: InputMaybe<ItemOrderConnectFieldInput>;
  system?: InputMaybe<Array<ItemSystemConnectFieldInput>>;
};

export type ItemConnectWhere = {
  node: ItemWhere;
};

export type ItemCreateInput = {
  catalogueItem?: InputMaybe<ItemCatalogueItemFieldInput>;
  conditionStatus?: InputMaybe<ItemConditionStatusFieldInput>;
  eun?: InputMaybe<Scalars['String']['input']>;
  itemUsage?: InputMaybe<ItemItemUsageFieldInput>;
  name: Scalars['String']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<ItemOrderFieldInput>;
  serialNumber?: InputMaybe<Scalars['String']['input']>;
  system?: InputMaybe<ItemSystemFieldInput>;
};

export type ItemDeleteInput = {
  catalogueItem?: InputMaybe<ItemCatalogueItemDeleteFieldInput>;
  conditionStatus?: InputMaybe<ItemConditionStatusDeleteFieldInput>;
  itemUsage?: InputMaybe<ItemItemUsageDeleteFieldInput>;
  order?: InputMaybe<ItemOrderDeleteFieldInput>;
  system?: InputMaybe<Array<ItemSystemDeleteFieldInput>>;
};

export type ItemDisconnectInput = {
  catalogueItem?: InputMaybe<ItemCatalogueItemDisconnectFieldInput>;
  conditionStatus?: InputMaybe<ItemConditionStatusDisconnectFieldInput>;
  itemUsage?: InputMaybe<ItemItemUsageDisconnectFieldInput>;
  order?: InputMaybe<ItemOrderDisconnectFieldInput>;
  system?: InputMaybe<Array<ItemSystemDisconnectFieldInput>>;
};

export type ItemEdge = {
  __typename?: 'ItemEdge';
  cursor: Scalars['String']['output'];
  node: Item;
};

export type ItemItemConditionConditionStatusAggregationSelection = {
  __typename?: 'ItemItemConditionConditionStatusAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<ItemItemConditionConditionStatusNodeAggregateSelection>;
};

export type ItemItemConditionConditionStatusNodeAggregateSelection = {
  __typename?: 'ItemItemConditionConditionStatusNodeAggregateSelection';
  code: StringAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  uid: IdAggregateSelectionNonNullable;
};

export type ItemItemUsageAggregateInput = {
  AND?: InputMaybe<Array<ItemItemUsageAggregateInput>>;
  NOT?: InputMaybe<ItemItemUsageAggregateInput>;
  OR?: InputMaybe<Array<ItemItemUsageAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<ItemItemUsageNodeAggregationWhereInput>;
};

export type ItemItemUsageConnectFieldInput = {
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<ItemUsageConnectWhere>;
};

export type ItemItemUsageConnection = {
  __typename?: 'ItemItemUsageConnection';
  edges: Array<ItemItemUsageRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type ItemItemUsageConnectionSort = {
  node?: InputMaybe<ItemUsageSort>;
};

export type ItemItemUsageConnectionWhere = {
  AND?: InputMaybe<Array<ItemItemUsageConnectionWhere>>;
  NOT?: InputMaybe<ItemItemUsageConnectionWhere>;
  OR?: InputMaybe<Array<ItemItemUsageConnectionWhere>>;
  node?: InputMaybe<ItemUsageWhere>;
};

export type ItemItemUsageCreateFieldInput = {
  node: ItemUsageCreateInput;
};

export type ItemItemUsageDeleteFieldInput = {
  where?: InputMaybe<ItemItemUsageConnectionWhere>;
};

export type ItemItemUsageDisconnectFieldInput = {
  where?: InputMaybe<ItemItemUsageConnectionWhere>;
};

export type ItemItemUsageFieldInput = {
  connect?: InputMaybe<ItemItemUsageConnectFieldInput>;
  create?: InputMaybe<ItemItemUsageCreateFieldInput>;
};

export type ItemItemUsageItemUsageAggregationSelection = {
  __typename?: 'ItemItemUsageItemUsageAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<ItemItemUsageItemUsageNodeAggregateSelection>;
};

export type ItemItemUsageItemUsageNodeAggregateSelection = {
  __typename?: 'ItemItemUsageItemUsageNodeAggregateSelection';
  code: StringAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  uid: IdAggregateSelectionNonNullable;
};

export type ItemItemUsageNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ItemItemUsageNodeAggregationWhereInput>>;
  NOT?: InputMaybe<ItemItemUsageNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<ItemItemUsageNodeAggregationWhereInput>>;
  code_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  code_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type ItemItemUsageRelationship = {
  __typename?: 'ItemItemUsageRelationship';
  cursor: Scalars['String']['output'];
  node: ItemUsage;
};

export type ItemItemUsageUpdateConnectionInput = {
  node?: InputMaybe<ItemUsageUpdateInput>;
};

export type ItemItemUsageUpdateFieldInput = {
  connect?: InputMaybe<ItemItemUsageConnectFieldInput>;
  create?: InputMaybe<ItemItemUsageCreateFieldInput>;
  delete?: InputMaybe<ItemItemUsageDeleteFieldInput>;
  disconnect?: InputMaybe<ItemItemUsageDisconnectFieldInput>;
  update?: InputMaybe<ItemItemUsageUpdateConnectionInput>;
  where?: InputMaybe<ItemItemUsageConnectionWhere>;
};

export type ItemOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /** Specify one or more ItemSort objects to sort Items by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<ItemSort>>;
};

export type ItemOrderAggregateInput = {
  AND?: InputMaybe<Array<ItemOrderAggregateInput>>;
  NOT?: InputMaybe<ItemOrderAggregateInput>;
  OR?: InputMaybe<Array<ItemOrderAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<ItemOrderNodeAggregationWhereInput>;
};

export type ItemOrderConnectFieldInput = {
  connect?: InputMaybe<OrderConnectInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<OrderConnectWhere>;
};

export type ItemOrderConnection = {
  __typename?: 'ItemOrderConnection';
  edges: Array<ItemOrderRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type ItemOrderConnectionSort = {
  node?: InputMaybe<OrderSort>;
};

export type ItemOrderConnectionWhere = {
  AND?: InputMaybe<Array<ItemOrderConnectionWhere>>;
  NOT?: InputMaybe<ItemOrderConnectionWhere>;
  OR?: InputMaybe<Array<ItemOrderConnectionWhere>>;
  node?: InputMaybe<OrderWhere>;
};

export type ItemOrderCreateFieldInput = {
  node: OrderCreateInput;
};

export type ItemOrderDeleteFieldInput = {
  delete?: InputMaybe<OrderDeleteInput>;
  where?: InputMaybe<ItemOrderConnectionWhere>;
};

export type ItemOrderDisconnectFieldInput = {
  disconnect?: InputMaybe<OrderDisconnectInput>;
  where?: InputMaybe<ItemOrderConnectionWhere>;
};

export type ItemOrderFieldInput = {
  connect?: InputMaybe<ItemOrderConnectFieldInput>;
  create?: InputMaybe<ItemOrderCreateFieldInput>;
};

export type ItemOrderNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ItemOrderNodeAggregationWhereInput>>;
  NOT?: InputMaybe<ItemOrderNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<ItemOrderNodeAggregationWhereInput>>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type ItemOrderOrderAggregationSelection = {
  __typename?: 'ItemOrderOrderAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<ItemOrderOrderNodeAggregateSelection>;
};

export type ItemOrderOrderNodeAggregateSelection = {
  __typename?: 'ItemOrderOrderNodeAggregateSelection';
  name: StringAggregateSelectionNonNullable;
  uid: IdAggregateSelectionNonNullable;
};

export type ItemOrderRelationship = {
  __typename?: 'ItemOrderRelationship';
  cursor: Scalars['String']['output'];
  node: Order;
};

export type ItemOrderUpdateConnectionInput = {
  node?: InputMaybe<OrderUpdateInput>;
};

export type ItemOrderUpdateFieldInput = {
  connect?: InputMaybe<ItemOrderConnectFieldInput>;
  create?: InputMaybe<ItemOrderCreateFieldInput>;
  delete?: InputMaybe<ItemOrderDeleteFieldInput>;
  disconnect?: InputMaybe<ItemOrderDisconnectFieldInput>;
  update?: InputMaybe<ItemOrderUpdateConnectionInput>;
  where?: InputMaybe<ItemOrderConnectionWhere>;
};

export type ItemRelationInput = {
  catalogueItem?: InputMaybe<ItemCatalogueItemCreateFieldInput>;
  conditionStatus?: InputMaybe<ItemConditionStatusCreateFieldInput>;
  itemUsage?: InputMaybe<ItemItemUsageCreateFieldInput>;
  order?: InputMaybe<ItemOrderCreateFieldInput>;
  system?: InputMaybe<Array<ItemSystemCreateFieldInput>>;
};

/** Fields to sort Items by. The order in which sorts are applied is not guaranteed when specifying many fields in one ItemSort object. */
export type ItemSort = {
  eun?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  notes?: InputMaybe<SortDirection>;
  serialNumber?: InputMaybe<SortDirection>;
  uid?: InputMaybe<SortDirection>;
};

export type ItemSystemAggregateInput = {
  AND?: InputMaybe<Array<ItemSystemAggregateInput>>;
  NOT?: InputMaybe<ItemSystemAggregateInput>;
  OR?: InputMaybe<Array<ItemSystemAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<ItemSystemNodeAggregationWhereInput>;
};

export type ItemSystemConnectFieldInput = {
  connect?: InputMaybe<Array<SystemConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<SystemConnectWhere>;
};

export type ItemSystemConnection = {
  __typename?: 'ItemSystemConnection';
  edges: Array<ItemSystemRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type ItemSystemConnectionSort = {
  node?: InputMaybe<SystemSort>;
};

export type ItemSystemConnectionWhere = {
  AND?: InputMaybe<Array<ItemSystemConnectionWhere>>;
  NOT?: InputMaybe<ItemSystemConnectionWhere>;
  OR?: InputMaybe<Array<ItemSystemConnectionWhere>>;
  node?: InputMaybe<SystemWhere>;
};

export type ItemSystemCreateFieldInput = {
  node: SystemCreateInput;
};

export type ItemSystemDeleteFieldInput = {
  delete?: InputMaybe<SystemDeleteInput>;
  where?: InputMaybe<ItemSystemConnectionWhere>;
};

export type ItemSystemDisconnectFieldInput = {
  disconnect?: InputMaybe<SystemDisconnectInput>;
  where?: InputMaybe<ItemSystemConnectionWhere>;
};

export type ItemSystemFieldInput = {
  connect?: InputMaybe<Array<ItemSystemConnectFieldInput>>;
  create?: InputMaybe<Array<ItemSystemCreateFieldInput>>;
};

export type ItemSystemNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ItemSystemNodeAggregationWhereInput>>;
  NOT?: InputMaybe<ItemSystemNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<ItemSystemNodeAggregationWhereInput>>;
  description_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  description_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  description_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  description_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  description_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  description_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  description_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  description_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  description_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  description_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  systemAlias_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  systemAlias_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  systemAlias_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  systemAlias_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  systemAlias_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  systemAlias_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  systemAlias_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  systemAlias_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  systemAlias_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  systemAlias_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  systemAlias_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  systemAlias_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  systemAlias_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  systemAlias_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  systemAlias_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  systemCode_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  systemCode_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  systemCode_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  systemCode_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  systemCode_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  systemCode_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  systemCode_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  systemCode_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  systemCode_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  systemCode_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  systemCode_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  systemCode_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  systemCode_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  systemCode_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  systemCode_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type ItemSystemRelationship = {
  __typename?: 'ItemSystemRelationship';
  cursor: Scalars['String']['output'];
  node: System;
};

export type ItemSystemSystemAggregationSelection = {
  __typename?: 'ItemSystemSystemAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<ItemSystemSystemNodeAggregateSelection>;
};

export type ItemSystemSystemNodeAggregateSelection = {
  __typename?: 'ItemSystemSystemNodeAggregateSelection';
  description: StringAggregateSelectionNullable;
  name: StringAggregateSelectionNonNullable;
  systemAlias: StringAggregateSelectionNullable;
  systemCode: StringAggregateSelectionNullable;
  uid: IdAggregateSelectionNonNullable;
};

export type ItemSystemUpdateConnectionInput = {
  node?: InputMaybe<SystemUpdateInput>;
};

export type ItemSystemUpdateFieldInput = {
  connect?: InputMaybe<Array<ItemSystemConnectFieldInput>>;
  create?: InputMaybe<Array<ItemSystemCreateFieldInput>>;
  delete?: InputMaybe<Array<ItemSystemDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<ItemSystemDisconnectFieldInput>>;
  update?: InputMaybe<ItemSystemUpdateConnectionInput>;
  where?: InputMaybe<ItemSystemConnectionWhere>;
};

export type ItemUpdateInput = {
  catalogueItem?: InputMaybe<ItemCatalogueItemUpdateFieldInput>;
  conditionStatus?: InputMaybe<ItemConditionStatusUpdateFieldInput>;
  eun?: InputMaybe<Scalars['String']['input']>;
  itemUsage?: InputMaybe<ItemItemUsageUpdateFieldInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<ItemOrderUpdateFieldInput>;
  serialNumber?: InputMaybe<Scalars['String']['input']>;
  system?: InputMaybe<Array<ItemSystemUpdateFieldInput>>;
};

export type ItemUsage = {
  __typename?: 'ItemUsage';
  code: Scalars['String']['output'];
  name: Scalars['String']['output'];
  uid: Scalars['ID']['output'];
};

export type ItemUsageAggregateSelection = {
  __typename?: 'ItemUsageAggregateSelection';
  code: StringAggregateSelectionNonNullable;
  count: Scalars['Int']['output'];
  name: StringAggregateSelectionNonNullable;
  uid: IdAggregateSelectionNonNullable;
};

export type ItemUsageConnectWhere = {
  node: ItemUsageWhere;
};

export type ItemUsageCreateInput = {
  code: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type ItemUsageEdge = {
  __typename?: 'ItemUsageEdge';
  cursor: Scalars['String']['output'];
  node: ItemUsage;
};

export type ItemUsageOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /** Specify one or more ItemUsageSort objects to sort ItemUsages by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<ItemUsageSort>>;
};

/** Fields to sort ItemUsages by. The order in which sorts are applied is not guaranteed when specifying many fields in one ItemUsageSort object. */
export type ItemUsageSort = {
  code?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  uid?: InputMaybe<SortDirection>;
};

export type ItemUsageUpdateInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type ItemUsageWhere = {
  AND?: InputMaybe<Array<ItemUsageWhere>>;
  NOT?: InputMaybe<ItemUsageWhere>;
  OR?: InputMaybe<Array<ItemUsageWhere>>;
  code?: InputMaybe<Scalars['String']['input']>;
  code_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  code_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  code_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  code_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  uid?: InputMaybe<Scalars['ID']['input']>;
  uid_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  uid_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  uid_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  uid_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
};

export type ItemUsagesConnection = {
  __typename?: 'ItemUsagesConnection';
  edges: Array<ItemUsageEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type ItemWhere = {
  AND?: InputMaybe<Array<ItemWhere>>;
  NOT?: InputMaybe<ItemWhere>;
  OR?: InputMaybe<Array<ItemWhere>>;
  catalogueItem?: InputMaybe<CatalogueItemWhere>;
  catalogueItemAggregate?: InputMaybe<ItemCatalogueItemAggregateInput>;
  catalogueItemConnection?: InputMaybe<ItemCatalogueItemConnectionWhere>;
  catalogueItemConnection_NOT?: InputMaybe<ItemCatalogueItemConnectionWhere>;
  catalogueItem_NOT?: InputMaybe<CatalogueItemWhere>;
  conditionStatus?: InputMaybe<ItemConditionWhere>;
  conditionStatusAggregate?: InputMaybe<ItemConditionStatusAggregateInput>;
  conditionStatusConnection?: InputMaybe<ItemConditionStatusConnectionWhere>;
  conditionStatusConnection_NOT?: InputMaybe<ItemConditionStatusConnectionWhere>;
  conditionStatus_NOT?: InputMaybe<ItemConditionWhere>;
  eun?: InputMaybe<Scalars['String']['input']>;
  eun_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  eun_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  eun_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  eun_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  itemUsage?: InputMaybe<ItemUsageWhere>;
  itemUsageAggregate?: InputMaybe<ItemItemUsageAggregateInput>;
  itemUsageConnection?: InputMaybe<ItemItemUsageConnectionWhere>;
  itemUsageConnection_NOT?: InputMaybe<ItemItemUsageConnectionWhere>;
  itemUsage_NOT?: InputMaybe<ItemUsageWhere>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  notes_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  notes_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  notes_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  notes_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<OrderWhere>;
  orderAggregate?: InputMaybe<ItemOrderAggregateInput>;
  orderConnection?: InputMaybe<ItemOrderConnectionWhere>;
  orderConnection_NOT?: InputMaybe<ItemOrderConnectionWhere>;
  order_NOT?: InputMaybe<OrderWhere>;
  serialNumber?: InputMaybe<Scalars['String']['input']>;
  serialNumber_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  serialNumber_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  serialNumber_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  serialNumber_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  systemAggregate?: InputMaybe<ItemSystemAggregateInput>;
  /** Return Items where all of the related ItemSystemConnections match this filter */
  systemConnection_ALL?: InputMaybe<ItemSystemConnectionWhere>;
  /** Return Items where none of the related ItemSystemConnections match this filter */
  systemConnection_NONE?: InputMaybe<ItemSystemConnectionWhere>;
  /** Return Items where one of the related ItemSystemConnections match this filter */
  systemConnection_SINGLE?: InputMaybe<ItemSystemConnectionWhere>;
  /** Return Items where some of the related ItemSystemConnections match this filter */
  systemConnection_SOME?: InputMaybe<ItemSystemConnectionWhere>;
  /** Return Items where all of the related Systems match this filter */
  system_ALL?: InputMaybe<SystemWhere>;
  /** Return Items where none of the related Systems match this filter */
  system_NONE?: InputMaybe<SystemWhere>;
  /** Return Items where one of the related Systems match this filter */
  system_SINGLE?: InputMaybe<SystemWhere>;
  /** Return Items where some of the related Systems match this filter */
  system_SOME?: InputMaybe<SystemWhere>;
  uid?: InputMaybe<Scalars['ID']['input']>;
  uid_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  uid_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  uid_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  uid_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
};

export type ItemsConnection = {
  __typename?: 'ItemsConnection';
  edges: Array<ItemEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Location = {
  __typename?: 'Location';
  code?: Maybe<Scalars['String']['output']>;
  facility: Facility;
  facilityAggregate?: Maybe<LocationFacilityFacilityAggregationSelection>;
  facilityConnection: LocationFacilityConnection;
  name: Scalars['String']['output'];
  parentLocation?: Maybe<Location>;
  parentLocationAggregate?: Maybe<LocationLocationParentLocationAggregationSelection>;
  parentLocationConnection: LocationParentLocationConnection;
  roomCards: Array<RoomCard>;
  roomCardsAggregate?: Maybe<LocationRoomCardRoomCardsAggregationSelection>;
  roomCardsConnection: LocationRoomCardsConnection;
  subLocations: Array<Location>;
  subLocationsAggregate?: Maybe<LocationLocationSubLocationsAggregationSelection>;
  subLocationsConnection: LocationSubLocationsConnection;
  uid: Scalars['ID']['output'];
};


export type LocationFacilityArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<FacilityOptions>;
  where?: InputMaybe<FacilityWhere>;
};


export type LocationFacilityAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<FacilityWhere>;
};


export type LocationFacilityConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<LocationFacilityConnectionSort>>;
  where?: InputMaybe<LocationFacilityConnectionWhere>;
};


export type LocationParentLocationArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<LocationOptions>;
  where?: InputMaybe<LocationWhere>;
};


export type LocationParentLocationAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<LocationWhere>;
};


export type LocationParentLocationConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<LocationParentLocationConnectionSort>>;
  where?: InputMaybe<LocationParentLocationConnectionWhere>;
};


export type LocationRoomCardsArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<RoomCardOptions>;
  where?: InputMaybe<RoomCardWhere>;
};


export type LocationRoomCardsAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<RoomCardWhere>;
};


export type LocationRoomCardsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<LocationRoomCardsConnectionSort>>;
  where?: InputMaybe<LocationRoomCardsConnectionWhere>;
};


export type LocationSubLocationsArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<LocationOptions>;
  where?: InputMaybe<LocationWhere>;
};


export type LocationSubLocationsAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<LocationWhere>;
};


export type LocationSubLocationsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<LocationSubLocationsConnectionSort>>;
  where?: InputMaybe<LocationSubLocationsConnectionWhere>;
};

export type LocationAggregateSelection = {
  __typename?: 'LocationAggregateSelection';
  code: StringAggregateSelectionNullable;
  count: Scalars['Int']['output'];
  name: StringAggregateSelectionNonNullable;
  uid: IdAggregateSelectionNonNullable;
};

export type LocationConnectInput = {
  facility?: InputMaybe<LocationFacilityConnectFieldInput>;
  parentLocation?: InputMaybe<LocationParentLocationConnectFieldInput>;
  roomCards?: InputMaybe<Array<LocationRoomCardsConnectFieldInput>>;
  subLocations?: InputMaybe<Array<LocationSubLocationsConnectFieldInput>>;
};

export type LocationConnectWhere = {
  node: LocationWhere;
};

export type LocationCreateInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  facility?: InputMaybe<LocationFacilityFieldInput>;
  name: Scalars['String']['input'];
  parentLocation?: InputMaybe<LocationParentLocationFieldInput>;
  roomCards?: InputMaybe<LocationRoomCardsFieldInput>;
  subLocations?: InputMaybe<LocationSubLocationsFieldInput>;
};

export type LocationDeleteInput = {
  facility?: InputMaybe<LocationFacilityDeleteFieldInput>;
  parentLocation?: InputMaybe<LocationParentLocationDeleteFieldInput>;
  roomCards?: InputMaybe<Array<LocationRoomCardsDeleteFieldInput>>;
  subLocations?: InputMaybe<Array<LocationSubLocationsDeleteFieldInput>>;
};

export type LocationDisconnectInput = {
  facility?: InputMaybe<LocationFacilityDisconnectFieldInput>;
  parentLocation?: InputMaybe<LocationParentLocationDisconnectFieldInput>;
  roomCards?: InputMaybe<Array<LocationRoomCardsDisconnectFieldInput>>;
  subLocations?: InputMaybe<Array<LocationSubLocationsDisconnectFieldInput>>;
};

export type LocationEdge = {
  __typename?: 'LocationEdge';
  cursor: Scalars['String']['output'];
  node: Location;
};

export type LocationFacilityAggregateInput = {
  AND?: InputMaybe<Array<LocationFacilityAggregateInput>>;
  NOT?: InputMaybe<LocationFacilityAggregateInput>;
  OR?: InputMaybe<Array<LocationFacilityAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<LocationFacilityNodeAggregationWhereInput>;
};

export type LocationFacilityConnectFieldInput = {
  connect?: InputMaybe<FacilityConnectInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<FacilityConnectWhere>;
};

export type LocationFacilityConnection = {
  __typename?: 'LocationFacilityConnection';
  edges: Array<LocationFacilityRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type LocationFacilityConnectionSort = {
  node?: InputMaybe<FacilitySort>;
};

export type LocationFacilityConnectionWhere = {
  AND?: InputMaybe<Array<LocationFacilityConnectionWhere>>;
  NOT?: InputMaybe<LocationFacilityConnectionWhere>;
  OR?: InputMaybe<Array<LocationFacilityConnectionWhere>>;
  node?: InputMaybe<FacilityWhere>;
};

export type LocationFacilityCreateFieldInput = {
  node: FacilityCreateInput;
};

export type LocationFacilityDeleteFieldInput = {
  delete?: InputMaybe<FacilityDeleteInput>;
  where?: InputMaybe<LocationFacilityConnectionWhere>;
};

export type LocationFacilityDisconnectFieldInput = {
  disconnect?: InputMaybe<FacilityDisconnectInput>;
  where?: InputMaybe<LocationFacilityConnectionWhere>;
};

export type LocationFacilityFacilityAggregationSelection = {
  __typename?: 'LocationFacilityFacilityAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<LocationFacilityFacilityNodeAggregateSelection>;
};

export type LocationFacilityFacilityNodeAggregateSelection = {
  __typename?: 'LocationFacilityFacilityNodeAggregateSelection';
  code: StringAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  uid: StringAggregateSelectionNonNullable;
};

export type LocationFacilityFieldInput = {
  connect?: InputMaybe<LocationFacilityConnectFieldInput>;
  create?: InputMaybe<LocationFacilityCreateFieldInput>;
};

export type LocationFacilityNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<LocationFacilityNodeAggregationWhereInput>>;
  NOT?: InputMaybe<LocationFacilityNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<LocationFacilityNodeAggregationWhereInput>>;
  code_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  code_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  uid_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  uid_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  uid_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  uid_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  uid_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  uid_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  uid_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  uid_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  uid_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  uid_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type LocationFacilityRelationship = {
  __typename?: 'LocationFacilityRelationship';
  cursor: Scalars['String']['output'];
  node: Facility;
};

export type LocationFacilityUpdateConnectionInput = {
  node?: InputMaybe<FacilityUpdateInput>;
};

export type LocationFacilityUpdateFieldInput = {
  connect?: InputMaybe<LocationFacilityConnectFieldInput>;
  create?: InputMaybe<LocationFacilityCreateFieldInput>;
  delete?: InputMaybe<LocationFacilityDeleteFieldInput>;
  disconnect?: InputMaybe<LocationFacilityDisconnectFieldInput>;
  update?: InputMaybe<LocationFacilityUpdateConnectionInput>;
  where?: InputMaybe<LocationFacilityConnectionWhere>;
};

export type LocationLocationParentLocationAggregationSelection = {
  __typename?: 'LocationLocationParentLocationAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<LocationLocationParentLocationNodeAggregateSelection>;
};

export type LocationLocationParentLocationNodeAggregateSelection = {
  __typename?: 'LocationLocationParentLocationNodeAggregateSelection';
  code: StringAggregateSelectionNullable;
  name: StringAggregateSelectionNonNullable;
  uid: IdAggregateSelectionNonNullable;
};

export type LocationLocationSubLocationsAggregationSelection = {
  __typename?: 'LocationLocationSubLocationsAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<LocationLocationSubLocationsNodeAggregateSelection>;
};

export type LocationLocationSubLocationsNodeAggregateSelection = {
  __typename?: 'LocationLocationSubLocationsNodeAggregateSelection';
  code: StringAggregateSelectionNullable;
  name: StringAggregateSelectionNonNullable;
  uid: IdAggregateSelectionNonNullable;
};

export type LocationOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /** Specify one or more LocationSort objects to sort Locations by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<LocationSort>>;
};

export type LocationParentLocationAggregateInput = {
  AND?: InputMaybe<Array<LocationParentLocationAggregateInput>>;
  NOT?: InputMaybe<LocationParentLocationAggregateInput>;
  OR?: InputMaybe<Array<LocationParentLocationAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<LocationParentLocationNodeAggregationWhereInput>;
};

export type LocationParentLocationConnectFieldInput = {
  connect?: InputMaybe<LocationConnectInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<LocationConnectWhere>;
};

export type LocationParentLocationConnection = {
  __typename?: 'LocationParentLocationConnection';
  edges: Array<LocationParentLocationRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type LocationParentLocationConnectionSort = {
  node?: InputMaybe<LocationSort>;
};

export type LocationParentLocationConnectionWhere = {
  AND?: InputMaybe<Array<LocationParentLocationConnectionWhere>>;
  NOT?: InputMaybe<LocationParentLocationConnectionWhere>;
  OR?: InputMaybe<Array<LocationParentLocationConnectionWhere>>;
  node?: InputMaybe<LocationWhere>;
};

export type LocationParentLocationCreateFieldInput = {
  node: LocationCreateInput;
};

export type LocationParentLocationDeleteFieldInput = {
  delete?: InputMaybe<LocationDeleteInput>;
  where?: InputMaybe<LocationParentLocationConnectionWhere>;
};

export type LocationParentLocationDisconnectFieldInput = {
  disconnect?: InputMaybe<LocationDisconnectInput>;
  where?: InputMaybe<LocationParentLocationConnectionWhere>;
};

export type LocationParentLocationFieldInput = {
  connect?: InputMaybe<LocationParentLocationConnectFieldInput>;
  create?: InputMaybe<LocationParentLocationCreateFieldInput>;
};

export type LocationParentLocationNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<LocationParentLocationNodeAggregationWhereInput>>;
  NOT?: InputMaybe<LocationParentLocationNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<LocationParentLocationNodeAggregationWhereInput>>;
  code_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  code_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type LocationParentLocationRelationship = {
  __typename?: 'LocationParentLocationRelationship';
  cursor: Scalars['String']['output'];
  node: Location;
};

export type LocationParentLocationUpdateConnectionInput = {
  node?: InputMaybe<LocationUpdateInput>;
};

export type LocationParentLocationUpdateFieldInput = {
  connect?: InputMaybe<LocationParentLocationConnectFieldInput>;
  create?: InputMaybe<LocationParentLocationCreateFieldInput>;
  delete?: InputMaybe<LocationParentLocationDeleteFieldInput>;
  disconnect?: InputMaybe<LocationParentLocationDisconnectFieldInput>;
  update?: InputMaybe<LocationParentLocationUpdateConnectionInput>;
  where?: InputMaybe<LocationParentLocationConnectionWhere>;
};

export type LocationRelationInput = {
  facility?: InputMaybe<LocationFacilityCreateFieldInput>;
  parentLocation?: InputMaybe<LocationParentLocationCreateFieldInput>;
  roomCards?: InputMaybe<Array<LocationRoomCardsCreateFieldInput>>;
  subLocations?: InputMaybe<Array<LocationSubLocationsCreateFieldInput>>;
};

export type LocationRoomCardRoomCardsAggregationSelection = {
  __typename?: 'LocationRoomCardRoomCardsAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<LocationRoomCardRoomCardsNodeAggregateSelection>;
};

export type LocationRoomCardRoomCardsNodeAggregateSelection = {
  __typename?: 'LocationRoomCardRoomCardsNodeAggregateSelection';
  additionalRequirements: StringAggregateSelectionNullable;
  compressedAirDistribution: StringAggregateSelectionNullable;
  compressedAirDistributionClient: StringAggregateSelectionNullable;
  coolingWater: StringAggregateSelectionNullable;
  coolingWaterClient: StringAggregateSelectionNullable;
  entryToHvacTent: StringAggregateSelectionNullable;
  indoorEnvironmentQuality: StringAggregateSelectionNullable;
  indoorEnvironmentQualityClient: StringAggregateSelectionNullable;
  maxPressureInColdDistribution: StringAggregateSelectionNullable;
  maxPressureInColdDistributionClient: StringAggregateSelectionNullable;
  name: StringAggregateSelectionNonNullable;
  nitrogenCentralDistribution: StringAggregateSelectionNullable;
  nitrogenCentralDistributionClient: StringAggregateSelectionNullable;
  uid: IdAggregateSelectionNonNullable;
};

export type LocationRoomCardsAggregateInput = {
  AND?: InputMaybe<Array<LocationRoomCardsAggregateInput>>;
  NOT?: InputMaybe<LocationRoomCardsAggregateInput>;
  OR?: InputMaybe<Array<LocationRoomCardsAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<LocationRoomCardsNodeAggregationWhereInput>;
};

export type LocationRoomCardsConnectFieldInput = {
  connect?: InputMaybe<Array<RoomCardConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<RoomCardConnectWhere>;
};

export type LocationRoomCardsConnection = {
  __typename?: 'LocationRoomCardsConnection';
  edges: Array<LocationRoomCardsRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type LocationRoomCardsConnectionSort = {
  node?: InputMaybe<RoomCardSort>;
};

export type LocationRoomCardsConnectionWhere = {
  AND?: InputMaybe<Array<LocationRoomCardsConnectionWhere>>;
  NOT?: InputMaybe<LocationRoomCardsConnectionWhere>;
  OR?: InputMaybe<Array<LocationRoomCardsConnectionWhere>>;
  node?: InputMaybe<RoomCardWhere>;
};

export type LocationRoomCardsCreateFieldInput = {
  node: RoomCardCreateInput;
};

export type LocationRoomCardsDeleteFieldInput = {
  delete?: InputMaybe<RoomCardDeleteInput>;
  where?: InputMaybe<LocationRoomCardsConnectionWhere>;
};

export type LocationRoomCardsDisconnectFieldInput = {
  disconnect?: InputMaybe<RoomCardDisconnectInput>;
  where?: InputMaybe<LocationRoomCardsConnectionWhere>;
};

export type LocationRoomCardsFieldInput = {
  connect?: InputMaybe<Array<LocationRoomCardsConnectFieldInput>>;
  create?: InputMaybe<Array<LocationRoomCardsCreateFieldInput>>;
};

export type LocationRoomCardsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<LocationRoomCardsNodeAggregationWhereInput>>;
  NOT?: InputMaybe<LocationRoomCardsNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<LocationRoomCardsNodeAggregationWhereInput>>;
  additionalRequirements_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  additionalRequirements_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  additionalRequirements_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  additionalRequirements_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  additionalRequirements_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  additionalRequirements_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  additionalRequirements_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  additionalRequirements_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  additionalRequirements_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  additionalRequirements_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  additionalRequirements_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  additionalRequirements_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  additionalRequirements_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  additionalRequirements_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  additionalRequirements_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  compressedAirDistributionClient_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  compressedAirDistributionClient_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  compressedAirDistributionClient_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  compressedAirDistributionClient_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  compressedAirDistributionClient_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  compressedAirDistributionClient_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  compressedAirDistributionClient_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  compressedAirDistributionClient_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  compressedAirDistributionClient_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  compressedAirDistributionClient_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  compressedAirDistributionClient_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  compressedAirDistributionClient_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  compressedAirDistributionClient_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  compressedAirDistributionClient_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  compressedAirDistributionClient_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  compressedAirDistribution_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  compressedAirDistribution_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  compressedAirDistribution_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  compressedAirDistribution_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  compressedAirDistribution_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  compressedAirDistribution_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  compressedAirDistribution_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  compressedAirDistribution_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  compressedAirDistribution_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  compressedAirDistribution_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  compressedAirDistribution_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  compressedAirDistribution_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  compressedAirDistribution_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  compressedAirDistribution_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  compressedAirDistribution_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  coolingWaterClient_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  coolingWaterClient_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  coolingWaterClient_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  coolingWaterClient_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  coolingWaterClient_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  coolingWaterClient_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  coolingWaterClient_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  coolingWaterClient_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  coolingWaterClient_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  coolingWaterClient_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  coolingWaterClient_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  coolingWaterClient_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  coolingWaterClient_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  coolingWaterClient_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  coolingWaterClient_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  coolingWater_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  coolingWater_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  coolingWater_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  coolingWater_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  coolingWater_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  coolingWater_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  coolingWater_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  coolingWater_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  coolingWater_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  coolingWater_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  coolingWater_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  coolingWater_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  coolingWater_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  coolingWater_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  coolingWater_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  entryToHvacTent_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  entryToHvacTent_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  entryToHvacTent_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  entryToHvacTent_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  entryToHvacTent_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  entryToHvacTent_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  entryToHvacTent_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  entryToHvacTent_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  entryToHvacTent_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  entryToHvacTent_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  entryToHvacTent_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  entryToHvacTent_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  entryToHvacTent_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  entryToHvacTent_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  entryToHvacTent_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  indoorEnvironmentQualityClient_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  indoorEnvironmentQualityClient_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  indoorEnvironmentQualityClient_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  indoorEnvironmentQualityClient_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  indoorEnvironmentQualityClient_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  indoorEnvironmentQualityClient_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  indoorEnvironmentQualityClient_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  indoorEnvironmentQualityClient_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  indoorEnvironmentQualityClient_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  indoorEnvironmentQualityClient_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  indoorEnvironmentQualityClient_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  indoorEnvironmentQualityClient_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  indoorEnvironmentQualityClient_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  indoorEnvironmentQualityClient_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  indoorEnvironmentQualityClient_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  indoorEnvironmentQuality_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  indoorEnvironmentQuality_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  indoorEnvironmentQuality_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  indoorEnvironmentQuality_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  indoorEnvironmentQuality_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  indoorEnvironmentQuality_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  indoorEnvironmentQuality_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  indoorEnvironmentQuality_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  indoorEnvironmentQuality_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  indoorEnvironmentQuality_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  indoorEnvironmentQuality_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  indoorEnvironmentQuality_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  indoorEnvironmentQuality_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  indoorEnvironmentQuality_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  indoorEnvironmentQuality_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  maxPressureInColdDistributionClient_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  maxPressureInColdDistributionClient_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  maxPressureInColdDistributionClient_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  maxPressureInColdDistributionClient_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  maxPressureInColdDistributionClient_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  maxPressureInColdDistributionClient_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  maxPressureInColdDistributionClient_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  maxPressureInColdDistributionClient_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  maxPressureInColdDistributionClient_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  maxPressureInColdDistributionClient_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  maxPressureInColdDistributionClient_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  maxPressureInColdDistributionClient_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  maxPressureInColdDistributionClient_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  maxPressureInColdDistributionClient_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  maxPressureInColdDistributionClient_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  maxPressureInColdDistribution_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  maxPressureInColdDistribution_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  maxPressureInColdDistribution_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  maxPressureInColdDistribution_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  maxPressureInColdDistribution_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  maxPressureInColdDistribution_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  maxPressureInColdDistribution_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  maxPressureInColdDistribution_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  maxPressureInColdDistribution_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  maxPressureInColdDistribution_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  maxPressureInColdDistribution_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  maxPressureInColdDistribution_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  maxPressureInColdDistribution_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  maxPressureInColdDistribution_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  maxPressureInColdDistribution_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  nitrogenCentralDistributionClient_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  nitrogenCentralDistributionClient_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  nitrogenCentralDistributionClient_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  nitrogenCentralDistributionClient_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  nitrogenCentralDistributionClient_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  nitrogenCentralDistributionClient_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  nitrogenCentralDistributionClient_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  nitrogenCentralDistributionClient_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  nitrogenCentralDistributionClient_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  nitrogenCentralDistributionClient_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  nitrogenCentralDistributionClient_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  nitrogenCentralDistributionClient_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  nitrogenCentralDistributionClient_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  nitrogenCentralDistributionClient_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  nitrogenCentralDistributionClient_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  nitrogenCentralDistribution_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  nitrogenCentralDistribution_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  nitrogenCentralDistribution_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  nitrogenCentralDistribution_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  nitrogenCentralDistribution_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  nitrogenCentralDistribution_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  nitrogenCentralDistribution_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  nitrogenCentralDistribution_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  nitrogenCentralDistribution_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  nitrogenCentralDistribution_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  nitrogenCentralDistribution_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  nitrogenCentralDistribution_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  nitrogenCentralDistribution_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  nitrogenCentralDistribution_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  nitrogenCentralDistribution_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type LocationRoomCardsRelationship = {
  __typename?: 'LocationRoomCardsRelationship';
  cursor: Scalars['String']['output'];
  node: RoomCard;
};

export type LocationRoomCardsUpdateConnectionInput = {
  node?: InputMaybe<RoomCardUpdateInput>;
};

export type LocationRoomCardsUpdateFieldInput = {
  connect?: InputMaybe<Array<LocationRoomCardsConnectFieldInput>>;
  create?: InputMaybe<Array<LocationRoomCardsCreateFieldInput>>;
  delete?: InputMaybe<Array<LocationRoomCardsDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<LocationRoomCardsDisconnectFieldInput>>;
  update?: InputMaybe<LocationRoomCardsUpdateConnectionInput>;
  where?: InputMaybe<LocationRoomCardsConnectionWhere>;
};

/** Fields to sort Locations by. The order in which sorts are applied is not guaranteed when specifying many fields in one LocationSort object. */
export type LocationSort = {
  code?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  uid?: InputMaybe<SortDirection>;
};

export type LocationSubLocationsAggregateInput = {
  AND?: InputMaybe<Array<LocationSubLocationsAggregateInput>>;
  NOT?: InputMaybe<LocationSubLocationsAggregateInput>;
  OR?: InputMaybe<Array<LocationSubLocationsAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<LocationSubLocationsNodeAggregationWhereInput>;
};

export type LocationSubLocationsConnectFieldInput = {
  connect?: InputMaybe<Array<LocationConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<LocationConnectWhere>;
};

export type LocationSubLocationsConnection = {
  __typename?: 'LocationSubLocationsConnection';
  edges: Array<LocationSubLocationsRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type LocationSubLocationsConnectionSort = {
  node?: InputMaybe<LocationSort>;
};

export type LocationSubLocationsConnectionWhere = {
  AND?: InputMaybe<Array<LocationSubLocationsConnectionWhere>>;
  NOT?: InputMaybe<LocationSubLocationsConnectionWhere>;
  OR?: InputMaybe<Array<LocationSubLocationsConnectionWhere>>;
  node?: InputMaybe<LocationWhere>;
};

export type LocationSubLocationsCreateFieldInput = {
  node: LocationCreateInput;
};

export type LocationSubLocationsDeleteFieldInput = {
  delete?: InputMaybe<LocationDeleteInput>;
  where?: InputMaybe<LocationSubLocationsConnectionWhere>;
};

export type LocationSubLocationsDisconnectFieldInput = {
  disconnect?: InputMaybe<LocationDisconnectInput>;
  where?: InputMaybe<LocationSubLocationsConnectionWhere>;
};

export type LocationSubLocationsFieldInput = {
  connect?: InputMaybe<Array<LocationSubLocationsConnectFieldInput>>;
  create?: InputMaybe<Array<LocationSubLocationsCreateFieldInput>>;
};

export type LocationSubLocationsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<LocationSubLocationsNodeAggregationWhereInput>>;
  NOT?: InputMaybe<LocationSubLocationsNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<LocationSubLocationsNodeAggregationWhereInput>>;
  code_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  code_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type LocationSubLocationsRelationship = {
  __typename?: 'LocationSubLocationsRelationship';
  cursor: Scalars['String']['output'];
  node: Location;
};

export type LocationSubLocationsUpdateConnectionInput = {
  node?: InputMaybe<LocationUpdateInput>;
};

export type LocationSubLocationsUpdateFieldInput = {
  connect?: InputMaybe<Array<LocationSubLocationsConnectFieldInput>>;
  create?: InputMaybe<Array<LocationSubLocationsCreateFieldInput>>;
  delete?: InputMaybe<Array<LocationSubLocationsDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<LocationSubLocationsDisconnectFieldInput>>;
  update?: InputMaybe<LocationSubLocationsUpdateConnectionInput>;
  where?: InputMaybe<LocationSubLocationsConnectionWhere>;
};

export type LocationUpdateInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  facility?: InputMaybe<LocationFacilityUpdateFieldInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  parentLocation?: InputMaybe<LocationParentLocationUpdateFieldInput>;
  roomCards?: InputMaybe<Array<LocationRoomCardsUpdateFieldInput>>;
  subLocations?: InputMaybe<Array<LocationSubLocationsUpdateFieldInput>>;
};

export type LocationWhere = {
  AND?: InputMaybe<Array<LocationWhere>>;
  NOT?: InputMaybe<LocationWhere>;
  OR?: InputMaybe<Array<LocationWhere>>;
  code?: InputMaybe<Scalars['String']['input']>;
  code_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  code_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  code_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  code_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  facility?: InputMaybe<FacilityWhere>;
  facilityAggregate?: InputMaybe<LocationFacilityAggregateInput>;
  facilityConnection?: InputMaybe<LocationFacilityConnectionWhere>;
  facilityConnection_NOT?: InputMaybe<LocationFacilityConnectionWhere>;
  facility_NOT?: InputMaybe<FacilityWhere>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  parentLocation?: InputMaybe<LocationWhere>;
  parentLocationAggregate?: InputMaybe<LocationParentLocationAggregateInput>;
  parentLocationConnection?: InputMaybe<LocationParentLocationConnectionWhere>;
  parentLocationConnection_NOT?: InputMaybe<LocationParentLocationConnectionWhere>;
  parentLocation_NOT?: InputMaybe<LocationWhere>;
  roomCardsAggregate?: InputMaybe<LocationRoomCardsAggregateInput>;
  /** Return Locations where all of the related LocationRoomCardsConnections match this filter */
  roomCardsConnection_ALL?: InputMaybe<LocationRoomCardsConnectionWhere>;
  /** Return Locations where none of the related LocationRoomCardsConnections match this filter */
  roomCardsConnection_NONE?: InputMaybe<LocationRoomCardsConnectionWhere>;
  /** Return Locations where one of the related LocationRoomCardsConnections match this filter */
  roomCardsConnection_SINGLE?: InputMaybe<LocationRoomCardsConnectionWhere>;
  /** Return Locations where some of the related LocationRoomCardsConnections match this filter */
  roomCardsConnection_SOME?: InputMaybe<LocationRoomCardsConnectionWhere>;
  /** Return Locations where all of the related RoomCards match this filter */
  roomCards_ALL?: InputMaybe<RoomCardWhere>;
  /** Return Locations where none of the related RoomCards match this filter */
  roomCards_NONE?: InputMaybe<RoomCardWhere>;
  /** Return Locations where one of the related RoomCards match this filter */
  roomCards_SINGLE?: InputMaybe<RoomCardWhere>;
  /** Return Locations where some of the related RoomCards match this filter */
  roomCards_SOME?: InputMaybe<RoomCardWhere>;
  subLocationsAggregate?: InputMaybe<LocationSubLocationsAggregateInput>;
  /** Return Locations where all of the related LocationSubLocationsConnections match this filter */
  subLocationsConnection_ALL?: InputMaybe<LocationSubLocationsConnectionWhere>;
  /** Return Locations where none of the related LocationSubLocationsConnections match this filter */
  subLocationsConnection_NONE?: InputMaybe<LocationSubLocationsConnectionWhere>;
  /** Return Locations where one of the related LocationSubLocationsConnections match this filter */
  subLocationsConnection_SINGLE?: InputMaybe<LocationSubLocationsConnectionWhere>;
  /** Return Locations where some of the related LocationSubLocationsConnections match this filter */
  subLocationsConnection_SOME?: InputMaybe<LocationSubLocationsConnectionWhere>;
  /** Return Locations where all of the related Locations match this filter */
  subLocations_ALL?: InputMaybe<LocationWhere>;
  /** Return Locations where none of the related Locations match this filter */
  subLocations_NONE?: InputMaybe<LocationWhere>;
  /** Return Locations where one of the related Locations match this filter */
  subLocations_SINGLE?: InputMaybe<LocationWhere>;
  /** Return Locations where some of the related Locations match this filter */
  subLocations_SOME?: InputMaybe<LocationWhere>;
  uid?: InputMaybe<Scalars['ID']['input']>;
  uid_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  uid_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  uid_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  uid_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
};

export type LocationsConnection = {
  __typename?: 'LocationsConnection';
  edges: Array<LocationEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCatalogueCategories: CreateCatalogueCategoriesMutationResponse;
  createCatalogueCategoryProperties: CreateCatalogueCategoryPropertiesMutationResponse;
  createCatalogueCategoryPropertyGroups: CreateCatalogueCategoryPropertyGroupsMutationResponse;
  createCatalogueCategoryPropertyTypes: CreateCatalogueCategoryPropertyTypesMutationResponse;
  createCatalogueItems: CreateCatalogueItemsMutationResponse;
  createContactPersonRoles: CreateContactPersonRolesMutationResponse;
  createEmployees: CreateEmployeesMutationResponse;
  createFacilities: CreateFacilitiesMutationResponse;
  createHallContactPeople: CreateHallContactPeopleMutationResponse;
  createItemConditions: CreateItemConditionsMutationResponse;
  createItemUsages: CreateItemUsagesMutationResponse;
  createItems: CreateItemsMutationResponse;
  createLocations: CreateLocationsMutationResponse;
  createOrders: CreateOrdersMutationResponse;
  createParentPathItems: CreateParentPathItemsMutationResponse;
  createRoles: CreateRolesMutationResponse;
  createRoomCards: CreateRoomCardsMutationResponse;
  createSchemaMigrations: CreateSchemaMigrationsMutationResponse;
  createSuppliers: CreateSuppliersMutationResponse;
  createSystemCriticalities: CreateSystemCriticalitiesMutationResponse;
  createSystemImportances: CreateSystemImportancesMutationResponse;
  createSystemTypeGroups: CreateSystemTypeGroupsMutationResponse;
  createSystemTypes: CreateSystemTypesMutationResponse;
  createSystems: CreateSystemsMutationResponse;
  createTeams: CreateTeamsMutationResponse;
  createUnits: CreateUnitsMutationResponse;
  createUsers: CreateUsersMutationResponse;
  createZones: CreateZonesMutationResponse;
  deleteCatalogueCategories: DeleteInfo;
  deleteCatalogueCategoryProperties: DeleteInfo;
  deleteCatalogueCategoryPropertyGroups: DeleteInfo;
  deleteCatalogueCategoryPropertyTypes: DeleteInfo;
  deleteCatalogueItems: DeleteInfo;
  deleteContactPersonRoles: DeleteInfo;
  deleteEmployees: DeleteInfo;
  deleteFacilities: DeleteInfo;
  deleteHallContactPeople: DeleteInfo;
  deleteItemConditions: DeleteInfo;
  deleteItemUsages: DeleteInfo;
  deleteItems: DeleteInfo;
  deleteLocations: DeleteInfo;
  deleteOrders: DeleteInfo;
  deleteParentPathItems: DeleteInfo;
  deleteRoles: DeleteInfo;
  deleteRoomCards: DeleteInfo;
  deleteSchemaMigrations: DeleteInfo;
  deleteSuppliers: DeleteInfo;
  deleteSystemCriticalities: DeleteInfo;
  deleteSystemImportances: DeleteInfo;
  deleteSystemTypeGroups: DeleteInfo;
  deleteSystemTypes: DeleteInfo;
  deleteSystems: DeleteInfo;
  deleteTeams: DeleteInfo;
  deleteUnits: DeleteInfo;
  deleteUsers: DeleteInfo;
  deleteZones: DeleteInfo;
  updateCatalogueCategories: UpdateCatalogueCategoriesMutationResponse;
  updateCatalogueCategoryProperties: UpdateCatalogueCategoryPropertiesMutationResponse;
  updateCatalogueCategoryPropertyGroups: UpdateCatalogueCategoryPropertyGroupsMutationResponse;
  updateCatalogueCategoryPropertyTypes: UpdateCatalogueCategoryPropertyTypesMutationResponse;
  updateCatalogueItems: UpdateCatalogueItemsMutationResponse;
  updateContactPersonRoles: UpdateContactPersonRolesMutationResponse;
  updateEmployees: UpdateEmployeesMutationResponse;
  updateFacilities: UpdateFacilitiesMutationResponse;
  updateHallContactPeople: UpdateHallContactPeopleMutationResponse;
  updateItemConditions: UpdateItemConditionsMutationResponse;
  updateItemUsages: UpdateItemUsagesMutationResponse;
  updateItems: UpdateItemsMutationResponse;
  updateLocations: UpdateLocationsMutationResponse;
  updateOrders: UpdateOrdersMutationResponse;
  updateParentPathItems: UpdateParentPathItemsMutationResponse;
  updateRoles: UpdateRolesMutationResponse;
  updateRoomCards: UpdateRoomCardsMutationResponse;
  updateSchemaMigrations: UpdateSchemaMigrationsMutationResponse;
  updateSuppliers: UpdateSuppliersMutationResponse;
  updateSystemCriticalities: UpdateSystemCriticalitiesMutationResponse;
  updateSystemImportances: UpdateSystemImportancesMutationResponse;
  updateSystemTypeGroups: UpdateSystemTypeGroupsMutationResponse;
  updateSystemTypes: UpdateSystemTypesMutationResponse;
  updateSystems: UpdateSystemsMutationResponse;
  updateTeams: UpdateTeamsMutationResponse;
  updateUnits: UpdateUnitsMutationResponse;
  updateUsers: UpdateUsersMutationResponse;
  updateZones: UpdateZonesMutationResponse;
};


export type MutationCreateCatalogueCategoriesArgs = {
  input: Array<CatalogueCategoryCreateInput>;
};


export type MutationCreateCatalogueCategoryPropertiesArgs = {
  input: Array<CatalogueCategoryPropertyCreateInput>;
};


export type MutationCreateCatalogueCategoryPropertyGroupsArgs = {
  input: Array<CatalogueCategoryPropertyGroupCreateInput>;
};


export type MutationCreateCatalogueCategoryPropertyTypesArgs = {
  input: Array<CatalogueCategoryPropertyTypeCreateInput>;
};


export type MutationCreateCatalogueItemsArgs = {
  input: Array<CatalogueItemCreateInput>;
};


export type MutationCreateContactPersonRolesArgs = {
  input: Array<ContactPersonRoleCreateInput>;
};


export type MutationCreateEmployeesArgs = {
  input: Array<EmployeeCreateInput>;
};


export type MutationCreateFacilitiesArgs = {
  input: Array<FacilityCreateInput>;
};


export type MutationCreateHallContactPeopleArgs = {
  input: Array<HallContactPersonCreateInput>;
};


export type MutationCreateItemConditionsArgs = {
  input: Array<ItemConditionCreateInput>;
};


export type MutationCreateItemUsagesArgs = {
  input: Array<ItemUsageCreateInput>;
};


export type MutationCreateItemsArgs = {
  input: Array<ItemCreateInput>;
};


export type MutationCreateLocationsArgs = {
  input: Array<LocationCreateInput>;
};


export type MutationCreateOrdersArgs = {
  input: Array<OrderCreateInput>;
};


export type MutationCreateParentPathItemsArgs = {
  input: Array<ParentPathItemCreateInput>;
};


export type MutationCreateRolesArgs = {
  input: Array<RoleCreateInput>;
};


export type MutationCreateRoomCardsArgs = {
  input: Array<RoomCardCreateInput>;
};


export type MutationCreateSchemaMigrationsArgs = {
  input: Array<SchemaMigrationCreateInput>;
};


export type MutationCreateSuppliersArgs = {
  input: Array<SupplierCreateInput>;
};


export type MutationCreateSystemCriticalitiesArgs = {
  input: Array<SystemCriticalityCreateInput>;
};


export type MutationCreateSystemImportancesArgs = {
  input: Array<SystemImportanceCreateInput>;
};


export type MutationCreateSystemTypeGroupsArgs = {
  input: Array<SystemTypeGroupCreateInput>;
};


export type MutationCreateSystemTypesArgs = {
  input: Array<SystemTypeCreateInput>;
};


export type MutationCreateSystemsArgs = {
  input: Array<SystemCreateInput>;
};


export type MutationCreateTeamsArgs = {
  input: Array<TeamCreateInput>;
};


export type MutationCreateUnitsArgs = {
  input: Array<UnitCreateInput>;
};


export type MutationCreateUsersArgs = {
  input: Array<UserCreateInput>;
};


export type MutationCreateZonesArgs = {
  input: Array<ZoneCreateInput>;
};


export type MutationDeleteCatalogueCategoriesArgs = {
  delete?: InputMaybe<CatalogueCategoryDeleteInput>;
  where?: InputMaybe<CatalogueCategoryWhere>;
};


export type MutationDeleteCatalogueCategoryPropertiesArgs = {
  delete?: InputMaybe<CatalogueCategoryPropertyDeleteInput>;
  where?: InputMaybe<CatalogueCategoryPropertyWhere>;
};


export type MutationDeleteCatalogueCategoryPropertyGroupsArgs = {
  delete?: InputMaybe<CatalogueCategoryPropertyGroupDeleteInput>;
  where?: InputMaybe<CatalogueCategoryPropertyGroupWhere>;
};


export type MutationDeleteCatalogueCategoryPropertyTypesArgs = {
  delete?: InputMaybe<CatalogueCategoryPropertyTypeDeleteInput>;
  where?: InputMaybe<CatalogueCategoryPropertyTypeWhere>;
};


export type MutationDeleteCatalogueItemsArgs = {
  delete?: InputMaybe<CatalogueItemDeleteInput>;
  where?: InputMaybe<CatalogueItemWhere>;
};


export type MutationDeleteContactPersonRolesArgs = {
  where?: InputMaybe<ContactPersonRoleWhere>;
};


export type MutationDeleteEmployeesArgs = {
  delete?: InputMaybe<EmployeeDeleteInput>;
  where?: InputMaybe<EmployeeWhere>;
};


export type MutationDeleteFacilitiesArgs = {
  delete?: InputMaybe<FacilityDeleteInput>;
  where?: InputMaybe<FacilityWhere>;
};


export type MutationDeleteHallContactPeopleArgs = {
  delete?: InputMaybe<HallContactPersonDeleteInput>;
  where?: InputMaybe<HallContactPersonWhere>;
};


export type MutationDeleteItemConditionsArgs = {
  where?: InputMaybe<ItemConditionWhere>;
};


export type MutationDeleteItemUsagesArgs = {
  where?: InputMaybe<ItemUsageWhere>;
};


export type MutationDeleteItemsArgs = {
  delete?: InputMaybe<ItemDeleteInput>;
  where?: InputMaybe<ItemWhere>;
};


export type MutationDeleteLocationsArgs = {
  delete?: InputMaybe<LocationDeleteInput>;
  where?: InputMaybe<LocationWhere>;
};


export type MutationDeleteOrdersArgs = {
  delete?: InputMaybe<OrderDeleteInput>;
  where?: InputMaybe<OrderWhere>;
};


export type MutationDeleteParentPathItemsArgs = {
  where?: InputMaybe<ParentPathItemWhere>;
};


export type MutationDeleteRolesArgs = {
  delete?: InputMaybe<RoleDeleteInput>;
  where?: InputMaybe<RoleWhere>;
};


export type MutationDeleteRoomCardsArgs = {
  delete?: InputMaybe<RoomCardDeleteInput>;
  where?: InputMaybe<RoomCardWhere>;
};


export type MutationDeleteSchemaMigrationsArgs = {
  where?: InputMaybe<SchemaMigrationWhere>;
};


export type MutationDeleteSuppliersArgs = {
  where?: InputMaybe<SupplierWhere>;
};


export type MutationDeleteSystemCriticalitiesArgs = {
  where?: InputMaybe<SystemCriticalityWhere>;
};


export type MutationDeleteSystemImportancesArgs = {
  where?: InputMaybe<SystemImportanceWhere>;
};


export type MutationDeleteSystemTypeGroupsArgs = {
  delete?: InputMaybe<SystemTypeGroupDeleteInput>;
  where?: InputMaybe<SystemTypeGroupWhere>;
};


export type MutationDeleteSystemTypesArgs = {
  delete?: InputMaybe<SystemTypeDeleteInput>;
  where?: InputMaybe<SystemTypeWhere>;
};


export type MutationDeleteSystemsArgs = {
  delete?: InputMaybe<SystemDeleteInput>;
  where?: InputMaybe<SystemWhere>;
};


export type MutationDeleteTeamsArgs = {
  where?: InputMaybe<TeamWhere>;
};


export type MutationDeleteUnitsArgs = {
  where?: InputMaybe<UnitWhere>;
};


export type MutationDeleteUsersArgs = {
  delete?: InputMaybe<UserDeleteInput>;
  where?: InputMaybe<UserWhere>;
};


export type MutationDeleteZonesArgs = {
  delete?: InputMaybe<ZoneDeleteInput>;
  where?: InputMaybe<ZoneWhere>;
};


export type MutationUpdateCatalogueCategoriesArgs = {
  connect?: InputMaybe<CatalogueCategoryConnectInput>;
  create?: InputMaybe<CatalogueCategoryRelationInput>;
  delete?: InputMaybe<CatalogueCategoryDeleteInput>;
  disconnect?: InputMaybe<CatalogueCategoryDisconnectInput>;
  update?: InputMaybe<CatalogueCategoryUpdateInput>;
  where?: InputMaybe<CatalogueCategoryWhere>;
};


export type MutationUpdateCatalogueCategoryPropertiesArgs = {
  connect?: InputMaybe<CatalogueCategoryPropertyConnectInput>;
  create?: InputMaybe<CatalogueCategoryPropertyRelationInput>;
  delete?: InputMaybe<CatalogueCategoryPropertyDeleteInput>;
  disconnect?: InputMaybe<CatalogueCategoryPropertyDisconnectInput>;
  update?: InputMaybe<CatalogueCategoryPropertyUpdateInput>;
  where?: InputMaybe<CatalogueCategoryPropertyWhere>;
};


export type MutationUpdateCatalogueCategoryPropertyGroupsArgs = {
  connect?: InputMaybe<CatalogueCategoryPropertyGroupConnectInput>;
  create?: InputMaybe<CatalogueCategoryPropertyGroupRelationInput>;
  delete?: InputMaybe<CatalogueCategoryPropertyGroupDeleteInput>;
  disconnect?: InputMaybe<CatalogueCategoryPropertyGroupDisconnectInput>;
  update?: InputMaybe<CatalogueCategoryPropertyGroupUpdateInput>;
  where?: InputMaybe<CatalogueCategoryPropertyGroupWhere>;
};


export type MutationUpdateCatalogueCategoryPropertyTypesArgs = {
  connect?: InputMaybe<CatalogueCategoryPropertyTypeConnectInput>;
  create?: InputMaybe<CatalogueCategoryPropertyTypeRelationInput>;
  delete?: InputMaybe<CatalogueCategoryPropertyTypeDeleteInput>;
  disconnect?: InputMaybe<CatalogueCategoryPropertyTypeDisconnectInput>;
  update?: InputMaybe<CatalogueCategoryPropertyTypeUpdateInput>;
  where?: InputMaybe<CatalogueCategoryPropertyTypeWhere>;
};


export type MutationUpdateCatalogueItemsArgs = {
  connect?: InputMaybe<CatalogueItemConnectInput>;
  create?: InputMaybe<CatalogueItemRelationInput>;
  delete?: InputMaybe<CatalogueItemDeleteInput>;
  disconnect?: InputMaybe<CatalogueItemDisconnectInput>;
  update?: InputMaybe<CatalogueItemUpdateInput>;
  where?: InputMaybe<CatalogueItemWhere>;
};


export type MutationUpdateContactPersonRolesArgs = {
  update?: InputMaybe<ContactPersonRoleUpdateInput>;
  where?: InputMaybe<ContactPersonRoleWhere>;
};


export type MutationUpdateEmployeesArgs = {
  connect?: InputMaybe<EmployeeConnectInput>;
  create?: InputMaybe<EmployeeRelationInput>;
  delete?: InputMaybe<EmployeeDeleteInput>;
  disconnect?: InputMaybe<EmployeeDisconnectInput>;
  update?: InputMaybe<EmployeeUpdateInput>;
  where?: InputMaybe<EmployeeWhere>;
};


export type MutationUpdateFacilitiesArgs = {
  connect?: InputMaybe<FacilityConnectInput>;
  create?: InputMaybe<FacilityRelationInput>;
  delete?: InputMaybe<FacilityDeleteInput>;
  disconnect?: InputMaybe<FacilityDisconnectInput>;
  update?: InputMaybe<FacilityUpdateInput>;
  where?: InputMaybe<FacilityWhere>;
};


export type MutationUpdateHallContactPeopleArgs = {
  connect?: InputMaybe<HallContactPersonConnectInput>;
  create?: InputMaybe<HallContactPersonRelationInput>;
  delete?: InputMaybe<HallContactPersonDeleteInput>;
  disconnect?: InputMaybe<HallContactPersonDisconnectInput>;
  update?: InputMaybe<HallContactPersonUpdateInput>;
  where?: InputMaybe<HallContactPersonWhere>;
};


export type MutationUpdateItemConditionsArgs = {
  update?: InputMaybe<ItemConditionUpdateInput>;
  where?: InputMaybe<ItemConditionWhere>;
};


export type MutationUpdateItemUsagesArgs = {
  update?: InputMaybe<ItemUsageUpdateInput>;
  where?: InputMaybe<ItemUsageWhere>;
};


export type MutationUpdateItemsArgs = {
  connect?: InputMaybe<ItemConnectInput>;
  create?: InputMaybe<ItemRelationInput>;
  delete?: InputMaybe<ItemDeleteInput>;
  disconnect?: InputMaybe<ItemDisconnectInput>;
  update?: InputMaybe<ItemUpdateInput>;
  where?: InputMaybe<ItemWhere>;
};


export type MutationUpdateLocationsArgs = {
  connect?: InputMaybe<LocationConnectInput>;
  create?: InputMaybe<LocationRelationInput>;
  delete?: InputMaybe<LocationDeleteInput>;
  disconnect?: InputMaybe<LocationDisconnectInput>;
  update?: InputMaybe<LocationUpdateInput>;
  where?: InputMaybe<LocationWhere>;
};


export type MutationUpdateOrdersArgs = {
  connect?: InputMaybe<OrderConnectInput>;
  create?: InputMaybe<OrderRelationInput>;
  delete?: InputMaybe<OrderDeleteInput>;
  disconnect?: InputMaybe<OrderDisconnectInput>;
  update?: InputMaybe<OrderUpdateInput>;
  where?: InputMaybe<OrderWhere>;
};


export type MutationUpdateParentPathItemsArgs = {
  update?: InputMaybe<ParentPathItemUpdateInput>;
  where?: InputMaybe<ParentPathItemWhere>;
};


export type MutationUpdateRolesArgs = {
  connect?: InputMaybe<RoleConnectInput>;
  create?: InputMaybe<RoleRelationInput>;
  delete?: InputMaybe<RoleDeleteInput>;
  disconnect?: InputMaybe<RoleDisconnectInput>;
  update?: InputMaybe<RoleUpdateInput>;
  where?: InputMaybe<RoleWhere>;
};


export type MutationUpdateRoomCardsArgs = {
  connect?: InputMaybe<RoomCardConnectInput>;
  create?: InputMaybe<RoomCardRelationInput>;
  delete?: InputMaybe<RoomCardDeleteInput>;
  disconnect?: InputMaybe<RoomCardDisconnectInput>;
  update?: InputMaybe<RoomCardUpdateInput>;
  where?: InputMaybe<RoomCardWhere>;
};


export type MutationUpdateSchemaMigrationsArgs = {
  update?: InputMaybe<SchemaMigrationUpdateInput>;
  where?: InputMaybe<SchemaMigrationWhere>;
};


export type MutationUpdateSuppliersArgs = {
  update?: InputMaybe<SupplierUpdateInput>;
  where?: InputMaybe<SupplierWhere>;
};


export type MutationUpdateSystemCriticalitiesArgs = {
  update?: InputMaybe<SystemCriticalityUpdateInput>;
  where?: InputMaybe<SystemCriticalityWhere>;
};


export type MutationUpdateSystemImportancesArgs = {
  update?: InputMaybe<SystemImportanceUpdateInput>;
  where?: InputMaybe<SystemImportanceWhere>;
};


export type MutationUpdateSystemTypeGroupsArgs = {
  connect?: InputMaybe<SystemTypeGroupConnectInput>;
  create?: InputMaybe<SystemTypeGroupRelationInput>;
  delete?: InputMaybe<SystemTypeGroupDeleteInput>;
  disconnect?: InputMaybe<SystemTypeGroupDisconnectInput>;
  update?: InputMaybe<SystemTypeGroupUpdateInput>;
  where?: InputMaybe<SystemTypeGroupWhere>;
};


export type MutationUpdateSystemTypesArgs = {
  connect?: InputMaybe<SystemTypeConnectInput>;
  create?: InputMaybe<SystemTypeRelationInput>;
  delete?: InputMaybe<SystemTypeDeleteInput>;
  disconnect?: InputMaybe<SystemTypeDisconnectInput>;
  update?: InputMaybe<SystemTypeUpdateInput>;
  where?: InputMaybe<SystemTypeWhere>;
};


export type MutationUpdateSystemsArgs = {
  connect?: InputMaybe<SystemConnectInput>;
  create?: InputMaybe<SystemRelationInput>;
  delete?: InputMaybe<SystemDeleteInput>;
  disconnect?: InputMaybe<SystemDisconnectInput>;
  update?: InputMaybe<SystemUpdateInput>;
  where?: InputMaybe<SystemWhere>;
};


export type MutationUpdateTeamsArgs = {
  update?: InputMaybe<TeamUpdateInput>;
  where?: InputMaybe<TeamWhere>;
};


export type MutationUpdateUnitsArgs = {
  update?: InputMaybe<UnitUpdateInput>;
  where?: InputMaybe<UnitWhere>;
};


export type MutationUpdateUsersArgs = {
  connect?: InputMaybe<UserConnectInput>;
  create?: InputMaybe<UserRelationInput>;
  delete?: InputMaybe<UserDeleteInput>;
  disconnect?: InputMaybe<UserDisconnectInput>;
  update?: InputMaybe<UserUpdateInput>;
  where?: InputMaybe<UserWhere>;
};


export type MutationUpdateZonesArgs = {
  connect?: InputMaybe<ZoneConnectInput>;
  create?: InputMaybe<ZoneRelationInput>;
  delete?: InputMaybe<ZoneDeleteInput>;
  disconnect?: InputMaybe<ZoneDisconnectInput>;
  update?: InputMaybe<ZoneUpdateInput>;
  where?: InputMaybe<ZoneWhere>;
};

export type Order = {
  __typename?: 'Order';
  name: Scalars['String']['output'];
  orderLines: Array<Item>;
  orderLinesAggregate?: Maybe<OrderItemOrderLinesAggregationSelection>;
  orderLinesConnection: OrderOrderLinesConnection;
  uid: Scalars['ID']['output'];
};


export type OrderOrderLinesArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<ItemOptions>;
  where?: InputMaybe<ItemWhere>;
};


export type OrderOrderLinesAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ItemWhere>;
};


export type OrderOrderLinesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<OrderOrderLinesConnectionSort>>;
  where?: InputMaybe<OrderOrderLinesConnectionWhere>;
};

export type OrderAggregateSelection = {
  __typename?: 'OrderAggregateSelection';
  count: Scalars['Int']['output'];
  name: StringAggregateSelectionNonNullable;
  uid: IdAggregateSelectionNonNullable;
};

export type OrderConnectInput = {
  orderLines?: InputMaybe<Array<OrderOrderLinesConnectFieldInput>>;
};

export type OrderConnectWhere = {
  node: OrderWhere;
};

export type OrderCreateInput = {
  name: Scalars['String']['input'];
  orderLines?: InputMaybe<OrderOrderLinesFieldInput>;
};

export type OrderDeleteInput = {
  orderLines?: InputMaybe<Array<OrderOrderLinesDeleteFieldInput>>;
};

export type OrderDisconnectInput = {
  orderLines?: InputMaybe<Array<OrderOrderLinesDisconnectFieldInput>>;
};

export type OrderEdge = {
  __typename?: 'OrderEdge';
  cursor: Scalars['String']['output'];
  node: Order;
};

export type OrderItemOrderLinesAggregationSelection = {
  __typename?: 'OrderItemOrderLinesAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<OrderItemOrderLinesNodeAggregateSelection>;
};

export type OrderItemOrderLinesNodeAggregateSelection = {
  __typename?: 'OrderItemOrderLinesNodeAggregateSelection';
  eun: StringAggregateSelectionNullable;
  name: StringAggregateSelectionNonNullable;
  notes: StringAggregateSelectionNullable;
  serialNumber: StringAggregateSelectionNullable;
  uid: IdAggregateSelectionNonNullable;
};

export type OrderOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /** Specify one or more OrderSort objects to sort Orders by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<OrderSort>>;
};

export type OrderOrderLinesAggregateInput = {
  AND?: InputMaybe<Array<OrderOrderLinesAggregateInput>>;
  NOT?: InputMaybe<OrderOrderLinesAggregateInput>;
  OR?: InputMaybe<Array<OrderOrderLinesAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<OrderOrderLinesNodeAggregationWhereInput>;
};

export type OrderOrderLinesConnectFieldInput = {
  connect?: InputMaybe<Array<ItemConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<ItemConnectWhere>;
};

export type OrderOrderLinesConnection = {
  __typename?: 'OrderOrderLinesConnection';
  edges: Array<OrderOrderLinesRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type OrderOrderLinesConnectionSort = {
  node?: InputMaybe<ItemSort>;
};

export type OrderOrderLinesConnectionWhere = {
  AND?: InputMaybe<Array<OrderOrderLinesConnectionWhere>>;
  NOT?: InputMaybe<OrderOrderLinesConnectionWhere>;
  OR?: InputMaybe<Array<OrderOrderLinesConnectionWhere>>;
  node?: InputMaybe<ItemWhere>;
};

export type OrderOrderLinesCreateFieldInput = {
  node: ItemCreateInput;
};

export type OrderOrderLinesDeleteFieldInput = {
  delete?: InputMaybe<ItemDeleteInput>;
  where?: InputMaybe<OrderOrderLinesConnectionWhere>;
};

export type OrderOrderLinesDisconnectFieldInput = {
  disconnect?: InputMaybe<ItemDisconnectInput>;
  where?: InputMaybe<OrderOrderLinesConnectionWhere>;
};

export type OrderOrderLinesFieldInput = {
  connect?: InputMaybe<Array<OrderOrderLinesConnectFieldInput>>;
  create?: InputMaybe<Array<OrderOrderLinesCreateFieldInput>>;
};

export type OrderOrderLinesNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<OrderOrderLinesNodeAggregationWhereInput>>;
  NOT?: InputMaybe<OrderOrderLinesNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<OrderOrderLinesNodeAggregationWhereInput>>;
  eun_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  eun_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  eun_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  eun_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  eun_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  eun_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  eun_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  eun_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  eun_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  eun_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  eun_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  eun_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  eun_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  eun_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  eun_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  notes_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  notes_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  notes_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  notes_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  notes_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  notes_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  notes_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  notes_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  notes_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  notes_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  notes_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  notes_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  notes_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  notes_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  notes_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  serialNumber_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  serialNumber_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  serialNumber_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  serialNumber_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  serialNumber_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  serialNumber_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  serialNumber_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  serialNumber_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  serialNumber_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  serialNumber_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  serialNumber_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  serialNumber_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  serialNumber_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  serialNumber_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  serialNumber_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type OrderOrderLinesRelationship = {
  __typename?: 'OrderOrderLinesRelationship';
  cursor: Scalars['String']['output'];
  node: Item;
};

export type OrderOrderLinesUpdateConnectionInput = {
  node?: InputMaybe<ItemUpdateInput>;
};

export type OrderOrderLinesUpdateFieldInput = {
  connect?: InputMaybe<Array<OrderOrderLinesConnectFieldInput>>;
  create?: InputMaybe<Array<OrderOrderLinesCreateFieldInput>>;
  delete?: InputMaybe<Array<OrderOrderLinesDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<OrderOrderLinesDisconnectFieldInput>>;
  update?: InputMaybe<OrderOrderLinesUpdateConnectionInput>;
  where?: InputMaybe<OrderOrderLinesConnectionWhere>;
};

export type OrderRelationInput = {
  orderLines?: InputMaybe<Array<OrderOrderLinesCreateFieldInput>>;
};

/** Fields to sort Orders by. The order in which sorts are applied is not guaranteed when specifying many fields in one OrderSort object. */
export type OrderSort = {
  name?: InputMaybe<SortDirection>;
  uid?: InputMaybe<SortDirection>;
};

export type OrderUpdateInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  orderLines?: InputMaybe<Array<OrderOrderLinesUpdateFieldInput>>;
};

export type OrderWhere = {
  AND?: InputMaybe<Array<OrderWhere>>;
  NOT?: InputMaybe<OrderWhere>;
  OR?: InputMaybe<Array<OrderWhere>>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  orderLinesAggregate?: InputMaybe<OrderOrderLinesAggregateInput>;
  /** Return Orders where all of the related OrderOrderLinesConnections match this filter */
  orderLinesConnection_ALL?: InputMaybe<OrderOrderLinesConnectionWhere>;
  /** Return Orders where none of the related OrderOrderLinesConnections match this filter */
  orderLinesConnection_NONE?: InputMaybe<OrderOrderLinesConnectionWhere>;
  /** Return Orders where one of the related OrderOrderLinesConnections match this filter */
  orderLinesConnection_SINGLE?: InputMaybe<OrderOrderLinesConnectionWhere>;
  /** Return Orders where some of the related OrderOrderLinesConnections match this filter */
  orderLinesConnection_SOME?: InputMaybe<OrderOrderLinesConnectionWhere>;
  /** Return Orders where all of the related Items match this filter */
  orderLines_ALL?: InputMaybe<ItemWhere>;
  /** Return Orders where none of the related Items match this filter */
  orderLines_NONE?: InputMaybe<ItemWhere>;
  /** Return Orders where one of the related Items match this filter */
  orderLines_SINGLE?: InputMaybe<ItemWhere>;
  /** Return Orders where some of the related Items match this filter */
  orderLines_SOME?: InputMaybe<ItemWhere>;
  uid?: InputMaybe<Scalars['ID']['input']>;
  uid_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  uid_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  uid_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  uid_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
};

export type OrdersConnection = {
  __typename?: 'OrdersConnection';
  edges: Array<OrderEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

/** Pagination information (Relay) */
export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type ParentPathItem = {
  __typename?: 'ParentPathItem';
  name?: Maybe<Scalars['String']['output']>;
  uid?: Maybe<Scalars['ID']['output']>;
};

export type ParentPathItemAggregateSelection = {
  __typename?: 'ParentPathItemAggregateSelection';
  count: Scalars['Int']['output'];
  name: StringAggregateSelectionNullable;
  uid: IdAggregateSelectionNullable;
};

export type ParentPathItemCreateInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  uid?: InputMaybe<Scalars['ID']['input']>;
};

export type ParentPathItemEdge = {
  __typename?: 'ParentPathItemEdge';
  cursor: Scalars['String']['output'];
  node: ParentPathItem;
};

export type ParentPathItemOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /** Specify one or more ParentPathItemSort objects to sort ParentPathItems by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<ParentPathItemSort>>;
};

/** Fields to sort ParentPathItems by. The order in which sorts are applied is not guaranteed when specifying many fields in one ParentPathItemSort object. */
export type ParentPathItemSort = {
  name?: InputMaybe<SortDirection>;
  uid?: InputMaybe<SortDirection>;
};

export type ParentPathItemUpdateInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  uid?: InputMaybe<Scalars['ID']['input']>;
};

export type ParentPathItemWhere = {
  AND?: InputMaybe<Array<ParentPathItemWhere>>;
  NOT?: InputMaybe<ParentPathItemWhere>;
  OR?: InputMaybe<Array<ParentPathItemWhere>>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  uid?: InputMaybe<Scalars['ID']['input']>;
  uid_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  uid_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  uid_IN?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  uid_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
};

export type ParentPathItemsConnection = {
  __typename?: 'ParentPathItemsConnection';
  edges: Array<ParentPathItemEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export enum PrescribedClothing {
  BeardCover = 'BEARD_COVER',
  BootsIso_5 = 'BOOTS_ISO_5',
  Cap = 'CAP',
  Coat = 'COAT',
  CrShoes = 'CR_SHOES',
  FaceMask = 'FACE_MASK',
  Gloves = 'GLOVES',
  Hood = 'HOOD',
  OveralIso_5 = 'OVERAL_ISO_5',
  OveralIso_7 = 'OVERAL_ISO_7',
  ShoeCovers = 'SHOE_COVERS',
  SocksIso_5 = 'SOCKS_ISO_5',
  TShirtAndTrousers = 'T_SHIRT_AND_TROUSERS'
}

export enum PurityClass {
  Iso_5 = 'ISO_5',
  Iso_6 = 'ISO_6',
  Iso_7 = 'ISO_7',
  Iso_8 = 'ISO_8'
}

export type Query = {
  __typename?: 'Query';
  catalogueCategories: Array<CatalogueCategory>;
  catalogueCategoriesAggregate: CatalogueCategoryAggregateSelection;
  catalogueCategoriesConnection: CatalogueCategoriesConnection;
  catalogueCategoryProperties: Array<CatalogueCategoryProperty>;
  catalogueCategoryPropertiesAggregate: CatalogueCategoryPropertyAggregateSelection;
  catalogueCategoryPropertiesConnection: CatalogueCategoryPropertiesConnection;
  catalogueCategoryPropertyGroups: Array<CatalogueCategoryPropertyGroup>;
  catalogueCategoryPropertyGroupsAggregate: CatalogueCategoryPropertyGroupAggregateSelection;
  catalogueCategoryPropertyGroupsConnection: CatalogueCategoryPropertyGroupsConnection;
  catalogueCategoryPropertyTypes: Array<CatalogueCategoryPropertyType>;
  catalogueCategoryPropertyTypesAggregate: CatalogueCategoryPropertyTypeAggregateSelection;
  catalogueCategoryPropertyTypesConnection: CatalogueCategoryPropertyTypesConnection;
  catalogueItems: Array<CatalogueItem>;
  catalogueItemsAggregate: CatalogueItemAggregateSelection;
  catalogueItemsConnection: CatalogueItemsConnection;
  contactPersonRoles: Array<ContactPersonRole>;
  contactPersonRolesAggregate: ContactPersonRoleAggregateSelection;
  contactPersonRolesConnection: ContactPersonRolesConnection;
  employees: Array<Employee>;
  employeesAggregate: EmployeeAggregateSelection;
  employeesConnection: EmployeesConnection;
  facilities: Array<Facility>;
  facilitiesAggregate: FacilityAggregateSelection;
  facilitiesConnection: FacilitiesConnection;
  hallContactPeople: Array<HallContactPerson>;
  hallContactPeopleAggregate: HallContactPersonAggregateSelection;
  hallContactPeopleConnection: HallContactPeopleConnection;
  itemConditions: Array<ItemCondition>;
  itemConditionsAggregate: ItemConditionAggregateSelection;
  itemConditionsConnection: ItemConditionsConnection;
  itemUsages: Array<ItemUsage>;
  itemUsagesAggregate: ItemUsageAggregateSelection;
  itemUsagesConnection: ItemUsagesConnection;
  items: Array<Item>;
  itemsAggregate: ItemAggregateSelection;
  itemsConnection: ItemsConnection;
  locations: Array<Location>;
  locationsAggregate: LocationAggregateSelection;
  locationsConnection: LocationsConnection;
  orders: Array<Order>;
  ordersAggregate: OrderAggregateSelection;
  ordersConnection: OrdersConnection;
  parentPathItems: Array<ParentPathItem>;
  parentPathItemsAggregate: ParentPathItemAggregateSelection;
  parentPathItemsConnection: ParentPathItemsConnection;
  roles: Array<Role>;
  rolesAggregate: RoleAggregateSelection;
  rolesConnection: RolesConnection;
  roomCards: Array<RoomCard>;
  roomCardsAggregate: RoomCardAggregateSelection;
  roomCardsConnection: RoomCardsConnection;
  schemaMigrations: Array<SchemaMigration>;
  schemaMigrationsAggregate: SchemaMigrationAggregateSelection;
  schemaMigrationsConnection: SchemaMigrationsConnection;
  suppliers: Array<Supplier>;
  suppliersAggregate: SupplierAggregateSelection;
  suppliersConnection: SuppliersConnection;
  systemCriticalities: Array<SystemCriticality>;
  systemCriticalitiesAggregate: SystemCriticalityAggregateSelection;
  systemCriticalitiesConnection: SystemCriticalitiesConnection;
  systemImportances: Array<SystemImportance>;
  systemImportancesAggregate: SystemImportanceAggregateSelection;
  systemImportancesConnection: SystemImportancesConnection;
  systemTypeGroups: Array<SystemTypeGroup>;
  systemTypeGroupsAggregate: SystemTypeGroupAggregateSelection;
  systemTypeGroupsConnection: SystemTypeGroupsConnection;
  systemTypes: Array<SystemType>;
  systemTypesAggregate: SystemTypeAggregateSelection;
  systemTypesConnection: SystemTypesConnection;
  systems: Array<System>;
  systemsAggregate: SystemAggregateSelection;
  systemsConnection: SystemsConnection;
  teams: Array<Team>;
  teamsAggregate: TeamAggregateSelection;
  teamsConnection: TeamsConnection;
  units: Array<Unit>;
  unitsAggregate: UnitAggregateSelection;
  unitsConnection: UnitsConnection;
  users: Array<User>;
  usersAggregate: UserAggregateSelection;
  usersConnection: UsersConnection;
  zones: Array<Zone>;
  zonesAggregate: ZoneAggregateSelection;
  zonesConnection: ZonesConnection;
};


export type QueryCatalogueCategoriesArgs = {
  options?: InputMaybe<CatalogueCategoryOptions>;
  where?: InputMaybe<CatalogueCategoryWhere>;
};


export type QueryCatalogueCategoriesAggregateArgs = {
  where?: InputMaybe<CatalogueCategoryWhere>;
};


export type QueryCatalogueCategoriesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<CatalogueCategorySort>>>;
  where?: InputMaybe<CatalogueCategoryWhere>;
};


export type QueryCatalogueCategoryPropertiesArgs = {
  options?: InputMaybe<CatalogueCategoryPropertyOptions>;
  where?: InputMaybe<CatalogueCategoryPropertyWhere>;
};


export type QueryCatalogueCategoryPropertiesAggregateArgs = {
  where?: InputMaybe<CatalogueCategoryPropertyWhere>;
};


export type QueryCatalogueCategoryPropertiesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<CatalogueCategoryPropertySort>>>;
  where?: InputMaybe<CatalogueCategoryPropertyWhere>;
};


export type QueryCatalogueCategoryPropertyGroupsArgs = {
  options?: InputMaybe<CatalogueCategoryPropertyGroupOptions>;
  where?: InputMaybe<CatalogueCategoryPropertyGroupWhere>;
};


export type QueryCatalogueCategoryPropertyGroupsAggregateArgs = {
  where?: InputMaybe<CatalogueCategoryPropertyGroupWhere>;
};


export type QueryCatalogueCategoryPropertyGroupsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<CatalogueCategoryPropertyGroupSort>>>;
  where?: InputMaybe<CatalogueCategoryPropertyGroupWhere>;
};


export type QueryCatalogueCategoryPropertyTypesArgs = {
  options?: InputMaybe<CatalogueCategoryPropertyTypeOptions>;
  where?: InputMaybe<CatalogueCategoryPropertyTypeWhere>;
};


export type QueryCatalogueCategoryPropertyTypesAggregateArgs = {
  where?: InputMaybe<CatalogueCategoryPropertyTypeWhere>;
};


export type QueryCatalogueCategoryPropertyTypesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<CatalogueCategoryPropertyTypeSort>>>;
  where?: InputMaybe<CatalogueCategoryPropertyTypeWhere>;
};


export type QueryCatalogueItemsArgs = {
  options?: InputMaybe<CatalogueItemOptions>;
  where?: InputMaybe<CatalogueItemWhere>;
};


export type QueryCatalogueItemsAggregateArgs = {
  where?: InputMaybe<CatalogueItemWhere>;
};


export type QueryCatalogueItemsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<CatalogueItemSort>>>;
  where?: InputMaybe<CatalogueItemWhere>;
};


export type QueryContactPersonRolesArgs = {
  options?: InputMaybe<ContactPersonRoleOptions>;
  where?: InputMaybe<ContactPersonRoleWhere>;
};


export type QueryContactPersonRolesAggregateArgs = {
  where?: InputMaybe<ContactPersonRoleWhere>;
};


export type QueryContactPersonRolesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<ContactPersonRoleSort>>>;
  where?: InputMaybe<ContactPersonRoleWhere>;
};


export type QueryEmployeesArgs = {
  options?: InputMaybe<EmployeeOptions>;
  where?: InputMaybe<EmployeeWhere>;
};


export type QueryEmployeesAggregateArgs = {
  where?: InputMaybe<EmployeeWhere>;
};


export type QueryEmployeesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<EmployeeSort>>>;
  where?: InputMaybe<EmployeeWhere>;
};


export type QueryFacilitiesArgs = {
  options?: InputMaybe<FacilityOptions>;
  where?: InputMaybe<FacilityWhere>;
};


export type QueryFacilitiesAggregateArgs = {
  where?: InputMaybe<FacilityWhere>;
};


export type QueryFacilitiesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<FacilitySort>>>;
  where?: InputMaybe<FacilityWhere>;
};


export type QueryHallContactPeopleArgs = {
  options?: InputMaybe<HallContactPersonOptions>;
  where?: InputMaybe<HallContactPersonWhere>;
};


export type QueryHallContactPeopleAggregateArgs = {
  where?: InputMaybe<HallContactPersonWhere>;
};


export type QueryHallContactPeopleConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<HallContactPersonSort>>>;
  where?: InputMaybe<HallContactPersonWhere>;
};


export type QueryItemConditionsArgs = {
  options?: InputMaybe<ItemConditionOptions>;
  where?: InputMaybe<ItemConditionWhere>;
};


export type QueryItemConditionsAggregateArgs = {
  where?: InputMaybe<ItemConditionWhere>;
};


export type QueryItemConditionsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<ItemConditionSort>>>;
  where?: InputMaybe<ItemConditionWhere>;
};


export type QueryItemUsagesArgs = {
  options?: InputMaybe<ItemUsageOptions>;
  where?: InputMaybe<ItemUsageWhere>;
};


export type QueryItemUsagesAggregateArgs = {
  where?: InputMaybe<ItemUsageWhere>;
};


export type QueryItemUsagesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<ItemUsageSort>>>;
  where?: InputMaybe<ItemUsageWhere>;
};


export type QueryItemsArgs = {
  options?: InputMaybe<ItemOptions>;
  where?: InputMaybe<ItemWhere>;
};


export type QueryItemsAggregateArgs = {
  where?: InputMaybe<ItemWhere>;
};


export type QueryItemsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<ItemSort>>>;
  where?: InputMaybe<ItemWhere>;
};


export type QueryLocationsArgs = {
  options?: InputMaybe<LocationOptions>;
  where?: InputMaybe<LocationWhere>;
};


export type QueryLocationsAggregateArgs = {
  where?: InputMaybe<LocationWhere>;
};


export type QueryLocationsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<LocationSort>>>;
  where?: InputMaybe<LocationWhere>;
};


export type QueryOrdersArgs = {
  options?: InputMaybe<OrderOptions>;
  where?: InputMaybe<OrderWhere>;
};


export type QueryOrdersAggregateArgs = {
  where?: InputMaybe<OrderWhere>;
};


export type QueryOrdersConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<OrderSort>>>;
  where?: InputMaybe<OrderWhere>;
};


export type QueryParentPathItemsArgs = {
  options?: InputMaybe<ParentPathItemOptions>;
  where?: InputMaybe<ParentPathItemWhere>;
};


export type QueryParentPathItemsAggregateArgs = {
  where?: InputMaybe<ParentPathItemWhere>;
};


export type QueryParentPathItemsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<ParentPathItemSort>>>;
  where?: InputMaybe<ParentPathItemWhere>;
};


export type QueryRolesArgs = {
  options?: InputMaybe<RoleOptions>;
  where?: InputMaybe<RoleWhere>;
};


export type QueryRolesAggregateArgs = {
  where?: InputMaybe<RoleWhere>;
};


export type QueryRolesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<RoleSort>>>;
  where?: InputMaybe<RoleWhere>;
};


export type QueryRoomCardsArgs = {
  options?: InputMaybe<RoomCardOptions>;
  where?: InputMaybe<RoomCardWhere>;
};


export type QueryRoomCardsAggregateArgs = {
  where?: InputMaybe<RoomCardWhere>;
};


export type QueryRoomCardsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<RoomCardSort>>>;
  where?: InputMaybe<RoomCardWhere>;
};


export type QuerySchemaMigrationsArgs = {
  options?: InputMaybe<SchemaMigrationOptions>;
  where?: InputMaybe<SchemaMigrationWhere>;
};


export type QuerySchemaMigrationsAggregateArgs = {
  where?: InputMaybe<SchemaMigrationWhere>;
};


export type QuerySchemaMigrationsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<SchemaMigrationSort>>>;
  where?: InputMaybe<SchemaMigrationWhere>;
};


export type QuerySuppliersArgs = {
  options?: InputMaybe<SupplierOptions>;
  where?: InputMaybe<SupplierWhere>;
};


export type QuerySuppliersAggregateArgs = {
  where?: InputMaybe<SupplierWhere>;
};


export type QuerySuppliersConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<SupplierSort>>>;
  where?: InputMaybe<SupplierWhere>;
};


export type QuerySystemCriticalitiesArgs = {
  options?: InputMaybe<SystemCriticalityOptions>;
  where?: InputMaybe<SystemCriticalityWhere>;
};


export type QuerySystemCriticalitiesAggregateArgs = {
  where?: InputMaybe<SystemCriticalityWhere>;
};


export type QuerySystemCriticalitiesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<SystemCriticalitySort>>>;
  where?: InputMaybe<SystemCriticalityWhere>;
};


export type QuerySystemImportancesArgs = {
  options?: InputMaybe<SystemImportanceOptions>;
  where?: InputMaybe<SystemImportanceWhere>;
};


export type QuerySystemImportancesAggregateArgs = {
  where?: InputMaybe<SystemImportanceWhere>;
};


export type QuerySystemImportancesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<SystemImportanceSort>>>;
  where?: InputMaybe<SystemImportanceWhere>;
};


export type QuerySystemTypeGroupsArgs = {
  options?: InputMaybe<SystemTypeGroupOptions>;
  where?: InputMaybe<SystemTypeGroupWhere>;
};


export type QuerySystemTypeGroupsAggregateArgs = {
  where?: InputMaybe<SystemTypeGroupWhere>;
};


export type QuerySystemTypeGroupsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<SystemTypeGroupSort>>>;
  where?: InputMaybe<SystemTypeGroupWhere>;
};


export type QuerySystemTypesArgs = {
  options?: InputMaybe<SystemTypeOptions>;
  where?: InputMaybe<SystemTypeWhere>;
};


export type QuerySystemTypesAggregateArgs = {
  where?: InputMaybe<SystemTypeWhere>;
};


export type QuerySystemTypesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<SystemTypeSort>>>;
  where?: InputMaybe<SystemTypeWhere>;
};


export type QuerySystemsArgs = {
  options?: InputMaybe<SystemOptions>;
  where?: InputMaybe<SystemWhere>;
};


export type QuerySystemsAggregateArgs = {
  where?: InputMaybe<SystemWhere>;
};


export type QuerySystemsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<SystemSort>>>;
  where?: InputMaybe<SystemWhere>;
};


export type QueryTeamsArgs = {
  options?: InputMaybe<TeamOptions>;
  where?: InputMaybe<TeamWhere>;
};


export type QueryTeamsAggregateArgs = {
  where?: InputMaybe<TeamWhere>;
};


export type QueryTeamsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<TeamSort>>>;
  where?: InputMaybe<TeamWhere>;
};


export type QueryUnitsArgs = {
  options?: InputMaybe<UnitOptions>;
  where?: InputMaybe<UnitWhere>;
};


export type QueryUnitsAggregateArgs = {
  where?: InputMaybe<UnitWhere>;
};


export type QueryUnitsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<UnitSort>>>;
  where?: InputMaybe<UnitWhere>;
};


export type QueryUsersArgs = {
  options?: InputMaybe<UserOptions>;
  where?: InputMaybe<UserWhere>;
};


export type QueryUsersAggregateArgs = {
  where?: InputMaybe<UserWhere>;
};


export type QueryUsersConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<UserSort>>>;
  where?: InputMaybe<UserWhere>;
};


export type QueryZonesArgs = {
  options?: InputMaybe<ZoneOptions>;
  where?: InputMaybe<ZoneWhere>;
};


export type QueryZonesAggregateArgs = {
  where?: InputMaybe<ZoneWhere>;
};


export type QueryZonesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<ZoneSort>>>;
  where?: InputMaybe<ZoneWhere>;
};

export type Role = {
  __typename?: 'Role';
  code: Scalars['String']['output'];
  name: Scalars['String']['output'];
  uid: Scalars['ID']['output'];
  usersHasRole: Array<User>;
  usersHasRoleAggregate?: Maybe<RoleUserUsersHasRoleAggregationSelection>;
  usersHasRoleConnection: RoleUsersHasRoleConnection;
};


export type RoleUsersHasRoleArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<UserOptions>;
  where?: InputMaybe<UserWhere>;
};


export type RoleUsersHasRoleAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<UserWhere>;
};


export type RoleUsersHasRoleConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<RoleUsersHasRoleConnectionSort>>;
  where?: InputMaybe<RoleUsersHasRoleConnectionWhere>;
};

export type RoleAggregateSelection = {
  __typename?: 'RoleAggregateSelection';
  code: StringAggregateSelectionNonNullable;
  count: Scalars['Int']['output'];
  name: StringAggregateSelectionNonNullable;
  uid: IdAggregateSelectionNonNullable;
};

export type RoleConnectInput = {
  usersHasRole?: InputMaybe<Array<RoleUsersHasRoleConnectFieldInput>>;
};

export type RoleConnectWhere = {
  node: RoleWhere;
};

export type RoleCreateInput = {
  code: Scalars['String']['input'];
  name: Scalars['String']['input'];
  usersHasRole?: InputMaybe<RoleUsersHasRoleFieldInput>;
};

export type RoleDeleteInput = {
  usersHasRole?: InputMaybe<Array<RoleUsersHasRoleDeleteFieldInput>>;
};

export type RoleDisconnectInput = {
  usersHasRole?: InputMaybe<Array<RoleUsersHasRoleDisconnectFieldInput>>;
};

export type RoleEdge = {
  __typename?: 'RoleEdge';
  cursor: Scalars['String']['output'];
  node: Role;
};

export type RoleOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /** Specify one or more RoleSort objects to sort Roles by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<RoleSort>>;
};

export type RoleRelationInput = {
  usersHasRole?: InputMaybe<Array<RoleUsersHasRoleCreateFieldInput>>;
};

/** Fields to sort Roles by. The order in which sorts are applied is not guaranteed when specifying many fields in one RoleSort object. */
export type RoleSort = {
  code?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  uid?: InputMaybe<SortDirection>;
};

export type RoleUpdateInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  usersHasRole?: InputMaybe<Array<RoleUsersHasRoleUpdateFieldInput>>;
};

export type RoleUserUsersHasRoleAggregationSelection = {
  __typename?: 'RoleUserUsersHasRoleAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<RoleUserUsersHasRoleNodeAggregateSelection>;
};

export type RoleUserUsersHasRoleNodeAggregateSelection = {
  __typename?: 'RoleUserUsersHasRoleNodeAggregateSelection';
  email: StringAggregateSelectionNonNullable;
  firstName: StringAggregateSelectionNonNullable;
  lastName: StringAggregateSelectionNonNullable;
  passwordHash: StringAggregateSelectionNonNullable;
  uid: IdAggregateSelectionNonNullable;
  username: StringAggregateSelectionNonNullable;
};

export type RoleUsersHasRoleAggregateInput = {
  AND?: InputMaybe<Array<RoleUsersHasRoleAggregateInput>>;
  NOT?: InputMaybe<RoleUsersHasRoleAggregateInput>;
  OR?: InputMaybe<Array<RoleUsersHasRoleAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<RoleUsersHasRoleNodeAggregationWhereInput>;
};

export type RoleUsersHasRoleConnectFieldInput = {
  connect?: InputMaybe<Array<UserConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<UserConnectWhere>;
};

export type RoleUsersHasRoleConnection = {
  __typename?: 'RoleUsersHasRoleConnection';
  edges: Array<RoleUsersHasRoleRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type RoleUsersHasRoleConnectionSort = {
  node?: InputMaybe<UserSort>;
};

export type RoleUsersHasRoleConnectionWhere = {
  AND?: InputMaybe<Array<RoleUsersHasRoleConnectionWhere>>;
  NOT?: InputMaybe<RoleUsersHasRoleConnectionWhere>;
  OR?: InputMaybe<Array<RoleUsersHasRoleConnectionWhere>>;
  node?: InputMaybe<UserWhere>;
};

export type RoleUsersHasRoleCreateFieldInput = {
  node: UserCreateInput;
};

export type RoleUsersHasRoleDeleteFieldInput = {
  delete?: InputMaybe<UserDeleteInput>;
  where?: InputMaybe<RoleUsersHasRoleConnectionWhere>;
};

export type RoleUsersHasRoleDisconnectFieldInput = {
  disconnect?: InputMaybe<UserDisconnectInput>;
  where?: InputMaybe<RoleUsersHasRoleConnectionWhere>;
};

export type RoleUsersHasRoleFieldInput = {
  connect?: InputMaybe<Array<RoleUsersHasRoleConnectFieldInput>>;
  create?: InputMaybe<Array<RoleUsersHasRoleCreateFieldInput>>;
};

export type RoleUsersHasRoleNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<RoleUsersHasRoleNodeAggregationWhereInput>>;
  NOT?: InputMaybe<RoleUsersHasRoleNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<RoleUsersHasRoleNodeAggregationWhereInput>>;
  email_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  email_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  email_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  email_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  email_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  email_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  email_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  email_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  email_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  firstName_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  firstName_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  firstName_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  firstName_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  firstName_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  firstName_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  firstName_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  firstName_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  firstName_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  firstName_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  firstName_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  firstName_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  firstName_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  firstName_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  firstName_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  lastName_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  lastName_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  lastName_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  lastName_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  lastName_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  lastName_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  lastName_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  lastName_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  lastName_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  lastName_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  lastName_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  lastName_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  lastName_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  lastName_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  lastName_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  passwordHash_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  passwordHash_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  passwordHash_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  passwordHash_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  passwordHash_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  passwordHash_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  passwordHash_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  passwordHash_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  passwordHash_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  passwordHash_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  passwordHash_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  passwordHash_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  passwordHash_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  passwordHash_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  passwordHash_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  username_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  username_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  username_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  username_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  username_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  username_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  username_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  username_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  username_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  username_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  username_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type RoleUsersHasRoleRelationship = {
  __typename?: 'RoleUsersHasRoleRelationship';
  cursor: Scalars['String']['output'];
  node: User;
};

export type RoleUsersHasRoleUpdateConnectionInput = {
  node?: InputMaybe<UserUpdateInput>;
};

export type RoleUsersHasRoleUpdateFieldInput = {
  connect?: InputMaybe<Array<RoleUsersHasRoleConnectFieldInput>>;
  create?: InputMaybe<Array<RoleUsersHasRoleCreateFieldInput>>;
  delete?: InputMaybe<Array<RoleUsersHasRoleDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<RoleUsersHasRoleDisconnectFieldInput>>;
  update?: InputMaybe<RoleUsersHasRoleUpdateConnectionInput>;
  where?: InputMaybe<RoleUsersHasRoleConnectionWhere>;
};

export type RoleWhere = {
  AND?: InputMaybe<Array<RoleWhere>>;
  NOT?: InputMaybe<RoleWhere>;
  OR?: InputMaybe<Array<RoleWhere>>;
  code?: InputMaybe<Scalars['String']['input']>;
  code_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  code_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  code_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  code_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  uid?: InputMaybe<Scalars['ID']['input']>;
  uid_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  uid_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  uid_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  uid_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  usersHasRoleAggregate?: InputMaybe<RoleUsersHasRoleAggregateInput>;
  /** Return Roles where all of the related RoleUsersHasRoleConnections match this filter */
  usersHasRoleConnection_ALL?: InputMaybe<RoleUsersHasRoleConnectionWhere>;
  /** Return Roles where none of the related RoleUsersHasRoleConnections match this filter */
  usersHasRoleConnection_NONE?: InputMaybe<RoleUsersHasRoleConnectionWhere>;
  /** Return Roles where one of the related RoleUsersHasRoleConnections match this filter */
  usersHasRoleConnection_SINGLE?: InputMaybe<RoleUsersHasRoleConnectionWhere>;
  /** Return Roles where some of the related RoleUsersHasRoleConnections match this filter */
  usersHasRoleConnection_SOME?: InputMaybe<RoleUsersHasRoleConnectionWhere>;
  /** Return Roles where all of the related Users match this filter */
  usersHasRole_ALL?: InputMaybe<UserWhere>;
  /** Return Roles where none of the related Users match this filter */
  usersHasRole_NONE?: InputMaybe<UserWhere>;
  /** Return Roles where one of the related Users match this filter */
  usersHasRole_SINGLE?: InputMaybe<UserWhere>;
  /** Return Roles where some of the related Users match this filter */
  usersHasRole_SOME?: InputMaybe<UserWhere>;
};

export type RolesConnection = {
  __typename?: 'RolesConnection';
  edges: Array<RoleEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type RoomCard = {
  __typename?: 'RoomCard';
  additionalRequirements?: Maybe<Scalars['String']['output']>;
  cleaningScheduleDate?: Maybe<Scalars['Date']['output']>;
  cleaningScheduleDays?: Maybe<Array<CleaningScheduleDay>>;
  compressedAirDistribution?: Maybe<Scalars['String']['output']>;
  compressedAirDistributionClient?: Maybe<Scalars['String']['output']>;
  contactPersonsDept: Array<Employee>;
  contactPersonsDeptAggregate?: Maybe<RoomCardEmployeeContactPersonsDeptAggregationSelection>;
  contactPersonsDeptConnection: RoomCardContactPersonsDeptConnection;
  contactPersonsHall: Array<HallContactPerson>;
  contactPersonsHallAggregate?: Maybe<RoomCardHallContactPersonContactPersonsHallAggregationSelection>;
  contactPersonsHallConnection: RoomCardContactPersonsHallConnection;
  coolingWater?: Maybe<Scalars['String']['output']>;
  coolingWaterClient?: Maybe<Scalars['String']['output']>;
  entryToHvacTent?: Maybe<Scalars['String']['output']>;
  indoorEnvironmentQuality?: Maybe<Scalars['String']['output']>;
  indoorEnvironmentQualityClient?: Maybe<Scalars['String']['output']>;
  locations: Array<Location>;
  locationsAggregate?: Maybe<RoomCardLocationLocationsAggregationSelection>;
  locationsConnection: RoomCardLocationsConnection;
  maxPressureInColdDistribution?: Maybe<Scalars['String']['output']>;
  maxPressureInColdDistributionClient?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  nitrogenCentralDistribution?: Maybe<Scalars['String']['output']>;
  nitrogenCentralDistributionClient?: Maybe<Scalars['String']['output']>;
  prescribedClothing?: Maybe<Array<PrescribedClothing>>;
  purityClass?: Maybe<PurityClass>;
  status: RoomCardStatus;
  teams: Array<Team>;
  teamsAggregate?: Maybe<RoomCardTeamTeamsAggregationSelection>;
  teamsConnection: RoomCardTeamsConnection;
  uid: Scalars['ID']['output'];
};


export type RoomCardContactPersonsDeptArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<EmployeeOptions>;
  where?: InputMaybe<EmployeeWhere>;
};


export type RoomCardContactPersonsDeptAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<EmployeeWhere>;
};


export type RoomCardContactPersonsDeptConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<RoomCardContactPersonsDeptConnectionSort>>;
  where?: InputMaybe<RoomCardContactPersonsDeptConnectionWhere>;
};


export type RoomCardContactPersonsHallArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<HallContactPersonOptions>;
  where?: InputMaybe<HallContactPersonWhere>;
};


export type RoomCardContactPersonsHallAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<HallContactPersonWhere>;
};


export type RoomCardContactPersonsHallConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<RoomCardContactPersonsHallConnectionSort>>;
  where?: InputMaybe<RoomCardContactPersonsHallConnectionWhere>;
};


export type RoomCardLocationsArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<LocationOptions>;
  where?: InputMaybe<LocationWhere>;
};


export type RoomCardLocationsAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<LocationWhere>;
};


export type RoomCardLocationsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<RoomCardLocationsConnectionSort>>;
  where?: InputMaybe<RoomCardLocationsConnectionWhere>;
};


export type RoomCardTeamsArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<TeamOptions>;
  where?: InputMaybe<TeamWhere>;
};


export type RoomCardTeamsAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<TeamWhere>;
};


export type RoomCardTeamsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<RoomCardTeamsConnectionSort>>;
  where?: InputMaybe<RoomCardTeamsConnectionWhere>;
};

export type RoomCardAggregateSelection = {
  __typename?: 'RoomCardAggregateSelection';
  additionalRequirements: StringAggregateSelectionNullable;
  compressedAirDistribution: StringAggregateSelectionNullable;
  compressedAirDistributionClient: StringAggregateSelectionNullable;
  coolingWater: StringAggregateSelectionNullable;
  coolingWaterClient: StringAggregateSelectionNullable;
  count: Scalars['Int']['output'];
  entryToHvacTent: StringAggregateSelectionNullable;
  indoorEnvironmentQuality: StringAggregateSelectionNullable;
  indoorEnvironmentQualityClient: StringAggregateSelectionNullable;
  maxPressureInColdDistribution: StringAggregateSelectionNullable;
  maxPressureInColdDistributionClient: StringAggregateSelectionNullable;
  name: StringAggregateSelectionNonNullable;
  nitrogenCentralDistribution: StringAggregateSelectionNullable;
  nitrogenCentralDistributionClient: StringAggregateSelectionNullable;
  uid: IdAggregateSelectionNonNullable;
};

export type RoomCardConnectInput = {
  contactPersonsDept?: InputMaybe<Array<RoomCardContactPersonsDeptConnectFieldInput>>;
  contactPersonsHall?: InputMaybe<Array<RoomCardContactPersonsHallConnectFieldInput>>;
  locations?: InputMaybe<Array<RoomCardLocationsConnectFieldInput>>;
  teams?: InputMaybe<Array<RoomCardTeamsConnectFieldInput>>;
};

export type RoomCardConnectWhere = {
  node: RoomCardWhere;
};

export type RoomCardContactPersonsDeptAggregateInput = {
  AND?: InputMaybe<Array<RoomCardContactPersonsDeptAggregateInput>>;
  NOT?: InputMaybe<RoomCardContactPersonsDeptAggregateInput>;
  OR?: InputMaybe<Array<RoomCardContactPersonsDeptAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<RoomCardContactPersonsDeptNodeAggregationWhereInput>;
};

export type RoomCardContactPersonsDeptConnectFieldInput = {
  connect?: InputMaybe<Array<EmployeeConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<EmployeeConnectWhere>;
};

export type RoomCardContactPersonsDeptConnection = {
  __typename?: 'RoomCardContactPersonsDeptConnection';
  edges: Array<RoomCardContactPersonsDeptRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type RoomCardContactPersonsDeptConnectionSort = {
  node?: InputMaybe<EmployeeSort>;
};

export type RoomCardContactPersonsDeptConnectionWhere = {
  AND?: InputMaybe<Array<RoomCardContactPersonsDeptConnectionWhere>>;
  NOT?: InputMaybe<RoomCardContactPersonsDeptConnectionWhere>;
  OR?: InputMaybe<Array<RoomCardContactPersonsDeptConnectionWhere>>;
  node?: InputMaybe<EmployeeWhere>;
};

export type RoomCardContactPersonsDeptCreateFieldInput = {
  node: EmployeeCreateInput;
};

export type RoomCardContactPersonsDeptDeleteFieldInput = {
  delete?: InputMaybe<EmployeeDeleteInput>;
  where?: InputMaybe<RoomCardContactPersonsDeptConnectionWhere>;
};

export type RoomCardContactPersonsDeptDisconnectFieldInput = {
  disconnect?: InputMaybe<EmployeeDisconnectInput>;
  where?: InputMaybe<RoomCardContactPersonsDeptConnectionWhere>;
};

export type RoomCardContactPersonsDeptFieldInput = {
  connect?: InputMaybe<Array<RoomCardContactPersonsDeptConnectFieldInput>>;
  create?: InputMaybe<Array<RoomCardContactPersonsDeptCreateFieldInput>>;
};

export type RoomCardContactPersonsDeptNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<RoomCardContactPersonsDeptNodeAggregationWhereInput>>;
  NOT?: InputMaybe<RoomCardContactPersonsDeptNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<RoomCardContactPersonsDeptNodeAggregationWhereInput>>;
  email_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  email_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  email_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  email_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  email_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  email_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  email_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  email_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  email_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  firstName_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  firstName_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  firstName_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  firstName_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  firstName_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  firstName_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  firstName_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  firstName_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  firstName_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  firstName_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  firstName_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  firstName_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  firstName_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  firstName_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  firstName_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  fullName_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  fullName_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  fullName_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  fullName_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  fullName_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  fullName_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  fullName_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  fullName_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  fullName_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  fullName_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  fullName_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  fullName_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  fullName_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  fullName_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  fullName_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  lastName_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  lastName_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  lastName_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  lastName_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  lastName_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  lastName_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  lastName_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  lastName_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  lastName_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  lastName_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  lastName_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  lastName_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  lastName_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  lastName_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  lastName_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  phoneNumber_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  phoneNumber_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  phoneNumber_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  phoneNumber_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  phoneNumber_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type RoomCardContactPersonsDeptRelationship = {
  __typename?: 'RoomCardContactPersonsDeptRelationship';
  cursor: Scalars['String']['output'];
  node: Employee;
};

export type RoomCardContactPersonsDeptUpdateConnectionInput = {
  node?: InputMaybe<EmployeeUpdateInput>;
};

export type RoomCardContactPersonsDeptUpdateFieldInput = {
  connect?: InputMaybe<Array<RoomCardContactPersonsDeptConnectFieldInput>>;
  create?: InputMaybe<Array<RoomCardContactPersonsDeptCreateFieldInput>>;
  delete?: InputMaybe<Array<RoomCardContactPersonsDeptDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<RoomCardContactPersonsDeptDisconnectFieldInput>>;
  update?: InputMaybe<RoomCardContactPersonsDeptUpdateConnectionInput>;
  where?: InputMaybe<RoomCardContactPersonsDeptConnectionWhere>;
};

export type RoomCardContactPersonsHallAggregateInput = {
  AND?: InputMaybe<Array<RoomCardContactPersonsHallAggregateInput>>;
  NOT?: InputMaybe<RoomCardContactPersonsHallAggregateInput>;
  OR?: InputMaybe<Array<RoomCardContactPersonsHallAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<RoomCardContactPersonsHallNodeAggregationWhereInput>;
};

export type RoomCardContactPersonsHallConnectFieldInput = {
  connect?: InputMaybe<Array<HallContactPersonConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<HallContactPersonConnectWhere>;
};

export type RoomCardContactPersonsHallConnection = {
  __typename?: 'RoomCardContactPersonsHallConnection';
  edges: Array<RoomCardContactPersonsHallRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type RoomCardContactPersonsHallConnectionSort = {
  node?: InputMaybe<HallContactPersonSort>;
};

export type RoomCardContactPersonsHallConnectionWhere = {
  AND?: InputMaybe<Array<RoomCardContactPersonsHallConnectionWhere>>;
  NOT?: InputMaybe<RoomCardContactPersonsHallConnectionWhere>;
  OR?: InputMaybe<Array<RoomCardContactPersonsHallConnectionWhere>>;
  node?: InputMaybe<HallContactPersonWhere>;
};

export type RoomCardContactPersonsHallCreateFieldInput = {
  node: HallContactPersonCreateInput;
};

export type RoomCardContactPersonsHallDeleteFieldInput = {
  delete?: InputMaybe<HallContactPersonDeleteInput>;
  where?: InputMaybe<RoomCardContactPersonsHallConnectionWhere>;
};

export type RoomCardContactPersonsHallDisconnectFieldInput = {
  disconnect?: InputMaybe<HallContactPersonDisconnectInput>;
  where?: InputMaybe<RoomCardContactPersonsHallConnectionWhere>;
};

export type RoomCardContactPersonsHallFieldInput = {
  connect?: InputMaybe<Array<RoomCardContactPersonsHallConnectFieldInput>>;
  create?: InputMaybe<Array<RoomCardContactPersonsHallCreateFieldInput>>;
};

export type RoomCardContactPersonsHallNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<RoomCardContactPersonsHallNodeAggregationWhereInput>>;
  NOT?: InputMaybe<RoomCardContactPersonsHallNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<RoomCardContactPersonsHallNodeAggregationWhereInput>>;
};

export type RoomCardContactPersonsHallRelationship = {
  __typename?: 'RoomCardContactPersonsHallRelationship';
  cursor: Scalars['String']['output'];
  node: HallContactPerson;
};

export type RoomCardContactPersonsHallUpdateConnectionInput = {
  node?: InputMaybe<HallContactPersonUpdateInput>;
};

export type RoomCardContactPersonsHallUpdateFieldInput = {
  connect?: InputMaybe<Array<RoomCardContactPersonsHallConnectFieldInput>>;
  create?: InputMaybe<Array<RoomCardContactPersonsHallCreateFieldInput>>;
  delete?: InputMaybe<Array<RoomCardContactPersonsHallDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<RoomCardContactPersonsHallDisconnectFieldInput>>;
  update?: InputMaybe<RoomCardContactPersonsHallUpdateConnectionInput>;
  where?: InputMaybe<RoomCardContactPersonsHallConnectionWhere>;
};

export type RoomCardCreateInput = {
  additionalRequirements?: InputMaybe<Scalars['String']['input']>;
  cleaningScheduleDate?: InputMaybe<Scalars['Date']['input']>;
  cleaningScheduleDays?: InputMaybe<Array<CleaningScheduleDay>>;
  compressedAirDistribution?: InputMaybe<Scalars['String']['input']>;
  compressedAirDistributionClient?: InputMaybe<Scalars['String']['input']>;
  contactPersonsDept?: InputMaybe<RoomCardContactPersonsDeptFieldInput>;
  contactPersonsHall?: InputMaybe<RoomCardContactPersonsHallFieldInput>;
  coolingWater?: InputMaybe<Scalars['String']['input']>;
  coolingWaterClient?: InputMaybe<Scalars['String']['input']>;
  entryToHvacTent?: InputMaybe<Scalars['String']['input']>;
  indoorEnvironmentQuality?: InputMaybe<Scalars['String']['input']>;
  indoorEnvironmentQualityClient?: InputMaybe<Scalars['String']['input']>;
  locations?: InputMaybe<RoomCardLocationsFieldInput>;
  maxPressureInColdDistribution?: InputMaybe<Scalars['String']['input']>;
  maxPressureInColdDistributionClient?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  nitrogenCentralDistribution?: InputMaybe<Scalars['String']['input']>;
  nitrogenCentralDistributionClient?: InputMaybe<Scalars['String']['input']>;
  prescribedClothing?: InputMaybe<Array<PrescribedClothing>>;
  purityClass?: InputMaybe<PurityClass>;
  status: RoomCardStatus;
  teams?: InputMaybe<RoomCardTeamsFieldInput>;
};

export type RoomCardDeleteInput = {
  contactPersonsDept?: InputMaybe<Array<RoomCardContactPersonsDeptDeleteFieldInput>>;
  contactPersonsHall?: InputMaybe<Array<RoomCardContactPersonsHallDeleteFieldInput>>;
  locations?: InputMaybe<Array<RoomCardLocationsDeleteFieldInput>>;
  teams?: InputMaybe<Array<RoomCardTeamsDeleteFieldInput>>;
};

export type RoomCardDisconnectInput = {
  contactPersonsDept?: InputMaybe<Array<RoomCardContactPersonsDeptDisconnectFieldInput>>;
  contactPersonsHall?: InputMaybe<Array<RoomCardContactPersonsHallDisconnectFieldInput>>;
  locations?: InputMaybe<Array<RoomCardLocationsDisconnectFieldInput>>;
  teams?: InputMaybe<Array<RoomCardTeamsDisconnectFieldInput>>;
};

export type RoomCardEdge = {
  __typename?: 'RoomCardEdge';
  cursor: Scalars['String']['output'];
  node: RoomCard;
};

export type RoomCardEmployeeContactPersonsDeptAggregationSelection = {
  __typename?: 'RoomCardEmployeeContactPersonsDeptAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<RoomCardEmployeeContactPersonsDeptNodeAggregateSelection>;
};

export type RoomCardEmployeeContactPersonsDeptNodeAggregateSelection = {
  __typename?: 'RoomCardEmployeeContactPersonsDeptNodeAggregateSelection';
  email: StringAggregateSelectionNullable;
  firstName: StringAggregateSelectionNonNullable;
  fullName: StringAggregateSelectionNullable;
  lastName: StringAggregateSelectionNonNullable;
  phoneNumber: StringAggregateSelectionNullable;
  uid: IdAggregateSelectionNonNullable;
};

export type RoomCardHallContactPersonContactPersonsHallAggregationSelection = {
  __typename?: 'RoomCardHallContactPersonContactPersonsHallAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<RoomCardHallContactPersonContactPersonsHallNodeAggregateSelection>;
};

export type RoomCardHallContactPersonContactPersonsHallNodeAggregateSelection = {
  __typename?: 'RoomCardHallContactPersonContactPersonsHallNodeAggregateSelection';
  uid: IdAggregateSelectionNonNullable;
};

export type RoomCardLocationLocationsAggregationSelection = {
  __typename?: 'RoomCardLocationLocationsAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<RoomCardLocationLocationsNodeAggregateSelection>;
};

export type RoomCardLocationLocationsNodeAggregateSelection = {
  __typename?: 'RoomCardLocationLocationsNodeAggregateSelection';
  code: StringAggregateSelectionNullable;
  name: StringAggregateSelectionNonNullable;
  uid: IdAggregateSelectionNonNullable;
};

export type RoomCardLocationsAggregateInput = {
  AND?: InputMaybe<Array<RoomCardLocationsAggregateInput>>;
  NOT?: InputMaybe<RoomCardLocationsAggregateInput>;
  OR?: InputMaybe<Array<RoomCardLocationsAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<RoomCardLocationsNodeAggregationWhereInput>;
};

export type RoomCardLocationsConnectFieldInput = {
  connect?: InputMaybe<Array<LocationConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<LocationConnectWhere>;
};

export type RoomCardLocationsConnection = {
  __typename?: 'RoomCardLocationsConnection';
  edges: Array<RoomCardLocationsRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type RoomCardLocationsConnectionSort = {
  node?: InputMaybe<LocationSort>;
};

export type RoomCardLocationsConnectionWhere = {
  AND?: InputMaybe<Array<RoomCardLocationsConnectionWhere>>;
  NOT?: InputMaybe<RoomCardLocationsConnectionWhere>;
  OR?: InputMaybe<Array<RoomCardLocationsConnectionWhere>>;
  node?: InputMaybe<LocationWhere>;
};

export type RoomCardLocationsCreateFieldInput = {
  node: LocationCreateInput;
};

export type RoomCardLocationsDeleteFieldInput = {
  delete?: InputMaybe<LocationDeleteInput>;
  where?: InputMaybe<RoomCardLocationsConnectionWhere>;
};

export type RoomCardLocationsDisconnectFieldInput = {
  disconnect?: InputMaybe<LocationDisconnectInput>;
  where?: InputMaybe<RoomCardLocationsConnectionWhere>;
};

export type RoomCardLocationsFieldInput = {
  connect?: InputMaybe<Array<RoomCardLocationsConnectFieldInput>>;
  create?: InputMaybe<Array<RoomCardLocationsCreateFieldInput>>;
};

export type RoomCardLocationsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<RoomCardLocationsNodeAggregationWhereInput>>;
  NOT?: InputMaybe<RoomCardLocationsNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<RoomCardLocationsNodeAggregationWhereInput>>;
  code_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  code_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type RoomCardLocationsRelationship = {
  __typename?: 'RoomCardLocationsRelationship';
  cursor: Scalars['String']['output'];
  node: Location;
};

export type RoomCardLocationsUpdateConnectionInput = {
  node?: InputMaybe<LocationUpdateInput>;
};

export type RoomCardLocationsUpdateFieldInput = {
  connect?: InputMaybe<Array<RoomCardLocationsConnectFieldInput>>;
  create?: InputMaybe<Array<RoomCardLocationsCreateFieldInput>>;
  delete?: InputMaybe<Array<RoomCardLocationsDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<RoomCardLocationsDisconnectFieldInput>>;
  update?: InputMaybe<RoomCardLocationsUpdateConnectionInput>;
  where?: InputMaybe<RoomCardLocationsConnectionWhere>;
};

export type RoomCardOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /** Specify one or more RoomCardSort objects to sort RoomCards by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<RoomCardSort>>;
};

export type RoomCardRelationInput = {
  contactPersonsDept?: InputMaybe<Array<RoomCardContactPersonsDeptCreateFieldInput>>;
  contactPersonsHall?: InputMaybe<Array<RoomCardContactPersonsHallCreateFieldInput>>;
  locations?: InputMaybe<Array<RoomCardLocationsCreateFieldInput>>;
  teams?: InputMaybe<Array<RoomCardTeamsCreateFieldInput>>;
};

/** Fields to sort RoomCards by. The order in which sorts are applied is not guaranteed when specifying many fields in one RoomCardSort object. */
export type RoomCardSort = {
  additionalRequirements?: InputMaybe<SortDirection>;
  cleaningScheduleDate?: InputMaybe<SortDirection>;
  compressedAirDistribution?: InputMaybe<SortDirection>;
  compressedAirDistributionClient?: InputMaybe<SortDirection>;
  coolingWater?: InputMaybe<SortDirection>;
  coolingWaterClient?: InputMaybe<SortDirection>;
  entryToHvacTent?: InputMaybe<SortDirection>;
  indoorEnvironmentQuality?: InputMaybe<SortDirection>;
  indoorEnvironmentQualityClient?: InputMaybe<SortDirection>;
  maxPressureInColdDistribution?: InputMaybe<SortDirection>;
  maxPressureInColdDistributionClient?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  nitrogenCentralDistribution?: InputMaybe<SortDirection>;
  nitrogenCentralDistributionClient?: InputMaybe<SortDirection>;
  purityClass?: InputMaybe<SortDirection>;
  status?: InputMaybe<SortDirection>;
  uid?: InputMaybe<SortDirection>;
};

export enum RoomCardStatus {
  CleanMode = 'CLEAN_MODE',
  DirtyMode = 'DIRTY_MODE',
  InPreparationMode = 'IN_PREPARATION_MODE'
}

export type RoomCardTeamTeamsAggregationSelection = {
  __typename?: 'RoomCardTeamTeamsAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<RoomCardTeamTeamsNodeAggregateSelection>;
};

export type RoomCardTeamTeamsNodeAggregateSelection = {
  __typename?: 'RoomCardTeamTeamsNodeAggregateSelection';
  name: StringAggregateSelectionNonNullable;
  uid: IdAggregateSelectionNonNullable;
};

export type RoomCardTeamsAggregateInput = {
  AND?: InputMaybe<Array<RoomCardTeamsAggregateInput>>;
  NOT?: InputMaybe<RoomCardTeamsAggregateInput>;
  OR?: InputMaybe<Array<RoomCardTeamsAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<RoomCardTeamsNodeAggregationWhereInput>;
};

export type RoomCardTeamsConnectFieldInput = {
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<TeamConnectWhere>;
};

export type RoomCardTeamsConnection = {
  __typename?: 'RoomCardTeamsConnection';
  edges: Array<RoomCardTeamsRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type RoomCardTeamsConnectionSort = {
  node?: InputMaybe<TeamSort>;
};

export type RoomCardTeamsConnectionWhere = {
  AND?: InputMaybe<Array<RoomCardTeamsConnectionWhere>>;
  NOT?: InputMaybe<RoomCardTeamsConnectionWhere>;
  OR?: InputMaybe<Array<RoomCardTeamsConnectionWhere>>;
  node?: InputMaybe<TeamWhere>;
};

export type RoomCardTeamsCreateFieldInput = {
  node: TeamCreateInput;
};

export type RoomCardTeamsDeleteFieldInput = {
  where?: InputMaybe<RoomCardTeamsConnectionWhere>;
};

export type RoomCardTeamsDisconnectFieldInput = {
  where?: InputMaybe<RoomCardTeamsConnectionWhere>;
};

export type RoomCardTeamsFieldInput = {
  connect?: InputMaybe<Array<RoomCardTeamsConnectFieldInput>>;
  create?: InputMaybe<Array<RoomCardTeamsCreateFieldInput>>;
};

export type RoomCardTeamsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<RoomCardTeamsNodeAggregationWhereInput>>;
  NOT?: InputMaybe<RoomCardTeamsNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<RoomCardTeamsNodeAggregationWhereInput>>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type RoomCardTeamsRelationship = {
  __typename?: 'RoomCardTeamsRelationship';
  cursor: Scalars['String']['output'];
  node: Team;
};

export type RoomCardTeamsUpdateConnectionInput = {
  node?: InputMaybe<TeamUpdateInput>;
};

export type RoomCardTeamsUpdateFieldInput = {
  connect?: InputMaybe<Array<RoomCardTeamsConnectFieldInput>>;
  create?: InputMaybe<Array<RoomCardTeamsCreateFieldInput>>;
  delete?: InputMaybe<Array<RoomCardTeamsDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<RoomCardTeamsDisconnectFieldInput>>;
  update?: InputMaybe<RoomCardTeamsUpdateConnectionInput>;
  where?: InputMaybe<RoomCardTeamsConnectionWhere>;
};

export type RoomCardUpdateInput = {
  additionalRequirements?: InputMaybe<Scalars['String']['input']>;
  cleaningScheduleDate?: InputMaybe<Scalars['Date']['input']>;
  cleaningScheduleDays?: InputMaybe<Array<CleaningScheduleDay>>;
  compressedAirDistribution?: InputMaybe<Scalars['String']['input']>;
  compressedAirDistributionClient?: InputMaybe<Scalars['String']['input']>;
  contactPersonsDept?: InputMaybe<Array<RoomCardContactPersonsDeptUpdateFieldInput>>;
  contactPersonsHall?: InputMaybe<Array<RoomCardContactPersonsHallUpdateFieldInput>>;
  coolingWater?: InputMaybe<Scalars['String']['input']>;
  coolingWaterClient?: InputMaybe<Scalars['String']['input']>;
  entryToHvacTent?: InputMaybe<Scalars['String']['input']>;
  indoorEnvironmentQuality?: InputMaybe<Scalars['String']['input']>;
  indoorEnvironmentQualityClient?: InputMaybe<Scalars['String']['input']>;
  locations?: InputMaybe<Array<RoomCardLocationsUpdateFieldInput>>;
  maxPressureInColdDistribution?: InputMaybe<Scalars['String']['input']>;
  maxPressureInColdDistributionClient?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  nitrogenCentralDistribution?: InputMaybe<Scalars['String']['input']>;
  nitrogenCentralDistributionClient?: InputMaybe<Scalars['String']['input']>;
  prescribedClothing?: InputMaybe<Array<PrescribedClothing>>;
  purityClass?: InputMaybe<PurityClass>;
  status?: InputMaybe<RoomCardStatus>;
  teams?: InputMaybe<Array<RoomCardTeamsUpdateFieldInput>>;
};

export type RoomCardWhere = {
  AND?: InputMaybe<Array<RoomCardWhere>>;
  NOT?: InputMaybe<RoomCardWhere>;
  OR?: InputMaybe<Array<RoomCardWhere>>;
  additionalRequirements?: InputMaybe<Scalars['String']['input']>;
  additionalRequirements_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  additionalRequirements_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  additionalRequirements_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  additionalRequirements_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  cleaningScheduleDate?: InputMaybe<Scalars['Date']['input']>;
  cleaningScheduleDate_GT?: InputMaybe<Scalars['Date']['input']>;
  cleaningScheduleDate_GTE?: InputMaybe<Scalars['Date']['input']>;
  cleaningScheduleDate_IN?: InputMaybe<Array<InputMaybe<Scalars['Date']['input']>>>;
  cleaningScheduleDate_LT?: InputMaybe<Scalars['Date']['input']>;
  cleaningScheduleDate_LTE?: InputMaybe<Scalars['Date']['input']>;
  cleaningScheduleDays?: InputMaybe<Array<CleaningScheduleDay>>;
  cleaningScheduleDays_INCLUDES?: InputMaybe<CleaningScheduleDay>;
  compressedAirDistribution?: InputMaybe<Scalars['String']['input']>;
  compressedAirDistributionClient?: InputMaybe<Scalars['String']['input']>;
  compressedAirDistributionClient_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  compressedAirDistributionClient_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  compressedAirDistributionClient_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  compressedAirDistributionClient_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  compressedAirDistribution_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  compressedAirDistribution_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  compressedAirDistribution_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  compressedAirDistribution_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  contactPersonsDeptAggregate?: InputMaybe<RoomCardContactPersonsDeptAggregateInput>;
  /** Return RoomCards where all of the related RoomCardContactPersonsDeptConnections match this filter */
  contactPersonsDeptConnection_ALL?: InputMaybe<RoomCardContactPersonsDeptConnectionWhere>;
  /** Return RoomCards where none of the related RoomCardContactPersonsDeptConnections match this filter */
  contactPersonsDeptConnection_NONE?: InputMaybe<RoomCardContactPersonsDeptConnectionWhere>;
  /** Return RoomCards where one of the related RoomCardContactPersonsDeptConnections match this filter */
  contactPersonsDeptConnection_SINGLE?: InputMaybe<RoomCardContactPersonsDeptConnectionWhere>;
  /** Return RoomCards where some of the related RoomCardContactPersonsDeptConnections match this filter */
  contactPersonsDeptConnection_SOME?: InputMaybe<RoomCardContactPersonsDeptConnectionWhere>;
  /** Return RoomCards where all of the related Employees match this filter */
  contactPersonsDept_ALL?: InputMaybe<EmployeeWhere>;
  /** Return RoomCards where none of the related Employees match this filter */
  contactPersonsDept_NONE?: InputMaybe<EmployeeWhere>;
  /** Return RoomCards where one of the related Employees match this filter */
  contactPersonsDept_SINGLE?: InputMaybe<EmployeeWhere>;
  /** Return RoomCards where some of the related Employees match this filter */
  contactPersonsDept_SOME?: InputMaybe<EmployeeWhere>;
  contactPersonsHallAggregate?: InputMaybe<RoomCardContactPersonsHallAggregateInput>;
  /** Return RoomCards where all of the related RoomCardContactPersonsHallConnections match this filter */
  contactPersonsHallConnection_ALL?: InputMaybe<RoomCardContactPersonsHallConnectionWhere>;
  /** Return RoomCards where none of the related RoomCardContactPersonsHallConnections match this filter */
  contactPersonsHallConnection_NONE?: InputMaybe<RoomCardContactPersonsHallConnectionWhere>;
  /** Return RoomCards where one of the related RoomCardContactPersonsHallConnections match this filter */
  contactPersonsHallConnection_SINGLE?: InputMaybe<RoomCardContactPersonsHallConnectionWhere>;
  /** Return RoomCards where some of the related RoomCardContactPersonsHallConnections match this filter */
  contactPersonsHallConnection_SOME?: InputMaybe<RoomCardContactPersonsHallConnectionWhere>;
  /** Return RoomCards where all of the related HallContactPeople match this filter */
  contactPersonsHall_ALL?: InputMaybe<HallContactPersonWhere>;
  /** Return RoomCards where none of the related HallContactPeople match this filter */
  contactPersonsHall_NONE?: InputMaybe<HallContactPersonWhere>;
  /** Return RoomCards where one of the related HallContactPeople match this filter */
  contactPersonsHall_SINGLE?: InputMaybe<HallContactPersonWhere>;
  /** Return RoomCards where some of the related HallContactPeople match this filter */
  contactPersonsHall_SOME?: InputMaybe<HallContactPersonWhere>;
  coolingWater?: InputMaybe<Scalars['String']['input']>;
  coolingWaterClient?: InputMaybe<Scalars['String']['input']>;
  coolingWaterClient_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  coolingWaterClient_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  coolingWaterClient_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  coolingWaterClient_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  coolingWater_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  coolingWater_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  coolingWater_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  coolingWater_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  entryToHvacTent?: InputMaybe<Scalars['String']['input']>;
  entryToHvacTent_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  entryToHvacTent_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  entryToHvacTent_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  entryToHvacTent_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  indoorEnvironmentQuality?: InputMaybe<Scalars['String']['input']>;
  indoorEnvironmentQualityClient?: InputMaybe<Scalars['String']['input']>;
  indoorEnvironmentQualityClient_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  indoorEnvironmentQualityClient_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  indoorEnvironmentQualityClient_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  indoorEnvironmentQualityClient_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  indoorEnvironmentQuality_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  indoorEnvironmentQuality_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  indoorEnvironmentQuality_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  indoorEnvironmentQuality_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  locationsAggregate?: InputMaybe<RoomCardLocationsAggregateInput>;
  /** Return RoomCards where all of the related RoomCardLocationsConnections match this filter */
  locationsConnection_ALL?: InputMaybe<RoomCardLocationsConnectionWhere>;
  /** Return RoomCards where none of the related RoomCardLocationsConnections match this filter */
  locationsConnection_NONE?: InputMaybe<RoomCardLocationsConnectionWhere>;
  /** Return RoomCards where one of the related RoomCardLocationsConnections match this filter */
  locationsConnection_SINGLE?: InputMaybe<RoomCardLocationsConnectionWhere>;
  /** Return RoomCards where some of the related RoomCardLocationsConnections match this filter */
  locationsConnection_SOME?: InputMaybe<RoomCardLocationsConnectionWhere>;
  /** Return RoomCards where all of the related Locations match this filter */
  locations_ALL?: InputMaybe<LocationWhere>;
  /** Return RoomCards where none of the related Locations match this filter */
  locations_NONE?: InputMaybe<LocationWhere>;
  /** Return RoomCards where one of the related Locations match this filter */
  locations_SINGLE?: InputMaybe<LocationWhere>;
  /** Return RoomCards where some of the related Locations match this filter */
  locations_SOME?: InputMaybe<LocationWhere>;
  maxPressureInColdDistribution?: InputMaybe<Scalars['String']['input']>;
  maxPressureInColdDistributionClient?: InputMaybe<Scalars['String']['input']>;
  maxPressureInColdDistributionClient_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  maxPressureInColdDistributionClient_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  maxPressureInColdDistributionClient_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  maxPressureInColdDistributionClient_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  maxPressureInColdDistribution_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  maxPressureInColdDistribution_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  maxPressureInColdDistribution_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  maxPressureInColdDistribution_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  nitrogenCentralDistribution?: InputMaybe<Scalars['String']['input']>;
  nitrogenCentralDistributionClient?: InputMaybe<Scalars['String']['input']>;
  nitrogenCentralDistributionClient_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  nitrogenCentralDistributionClient_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  nitrogenCentralDistributionClient_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  nitrogenCentralDistributionClient_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  nitrogenCentralDistribution_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  nitrogenCentralDistribution_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  nitrogenCentralDistribution_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  nitrogenCentralDistribution_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  prescribedClothing?: InputMaybe<Array<PrescribedClothing>>;
  prescribedClothing_INCLUDES?: InputMaybe<PrescribedClothing>;
  purityClass?: InputMaybe<PurityClass>;
  purityClass_IN?: InputMaybe<Array<InputMaybe<PurityClass>>>;
  status?: InputMaybe<RoomCardStatus>;
  status_IN?: InputMaybe<Array<RoomCardStatus>>;
  teamsAggregate?: InputMaybe<RoomCardTeamsAggregateInput>;
  /** Return RoomCards where all of the related RoomCardTeamsConnections match this filter */
  teamsConnection_ALL?: InputMaybe<RoomCardTeamsConnectionWhere>;
  /** Return RoomCards where none of the related RoomCardTeamsConnections match this filter */
  teamsConnection_NONE?: InputMaybe<RoomCardTeamsConnectionWhere>;
  /** Return RoomCards where one of the related RoomCardTeamsConnections match this filter */
  teamsConnection_SINGLE?: InputMaybe<RoomCardTeamsConnectionWhere>;
  /** Return RoomCards where some of the related RoomCardTeamsConnections match this filter */
  teamsConnection_SOME?: InputMaybe<RoomCardTeamsConnectionWhere>;
  /** Return RoomCards where all of the related Teams match this filter */
  teams_ALL?: InputMaybe<TeamWhere>;
  /** Return RoomCards where none of the related Teams match this filter */
  teams_NONE?: InputMaybe<TeamWhere>;
  /** Return RoomCards where one of the related Teams match this filter */
  teams_SINGLE?: InputMaybe<TeamWhere>;
  /** Return RoomCards where some of the related Teams match this filter */
  teams_SOME?: InputMaybe<TeamWhere>;
  uid?: InputMaybe<Scalars['ID']['input']>;
  uid_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  uid_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  uid_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  uid_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
};

export type RoomCardsConnection = {
  __typename?: 'RoomCardsConnection';
  edges: Array<RoomCardEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type SchemaMigration = {
  __typename?: 'SchemaMigration';
  dirty: Scalars['Boolean']['output'];
  ts: Scalars['Date']['output'];
  version: Scalars['BigInt']['output'];
};

export type SchemaMigrationAggregateSelection = {
  __typename?: 'SchemaMigrationAggregateSelection';
  count: Scalars['Int']['output'];
  version: BigIntAggregateSelectionNonNullable;
};

export type SchemaMigrationCreateInput = {
  dirty: Scalars['Boolean']['input'];
  ts: Scalars['Date']['input'];
  version: Scalars['BigInt']['input'];
};

export type SchemaMigrationEdge = {
  __typename?: 'SchemaMigrationEdge';
  cursor: Scalars['String']['output'];
  node: SchemaMigration;
};

export type SchemaMigrationOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /** Specify one or more SchemaMigrationSort objects to sort SchemaMigrations by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<SchemaMigrationSort>>;
};

/** Fields to sort SchemaMigrations by. The order in which sorts are applied is not guaranteed when specifying many fields in one SchemaMigrationSort object. */
export type SchemaMigrationSort = {
  dirty?: InputMaybe<SortDirection>;
  ts?: InputMaybe<SortDirection>;
  version?: InputMaybe<SortDirection>;
};

export type SchemaMigrationUpdateInput = {
  dirty?: InputMaybe<Scalars['Boolean']['input']>;
  ts?: InputMaybe<Scalars['Date']['input']>;
  version?: InputMaybe<Scalars['BigInt']['input']>;
  version_DECREMENT?: InputMaybe<Scalars['BigInt']['input']>;
  version_INCREMENT?: InputMaybe<Scalars['BigInt']['input']>;
};

export type SchemaMigrationWhere = {
  AND?: InputMaybe<Array<SchemaMigrationWhere>>;
  NOT?: InputMaybe<SchemaMigrationWhere>;
  OR?: InputMaybe<Array<SchemaMigrationWhere>>;
  dirty?: InputMaybe<Scalars['Boolean']['input']>;
  ts?: InputMaybe<Scalars['Date']['input']>;
  ts_GT?: InputMaybe<Scalars['Date']['input']>;
  ts_GTE?: InputMaybe<Scalars['Date']['input']>;
  ts_IN?: InputMaybe<Array<Scalars['Date']['input']>>;
  ts_LT?: InputMaybe<Scalars['Date']['input']>;
  ts_LTE?: InputMaybe<Scalars['Date']['input']>;
  version?: InputMaybe<Scalars['BigInt']['input']>;
  version_GT?: InputMaybe<Scalars['BigInt']['input']>;
  version_GTE?: InputMaybe<Scalars['BigInt']['input']>;
  version_IN?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  version_LT?: InputMaybe<Scalars['BigInt']['input']>;
  version_LTE?: InputMaybe<Scalars['BigInt']['input']>;
};

export type SchemaMigrationsConnection = {
  __typename?: 'SchemaMigrationsConnection';
  edges: Array<SchemaMigrationEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

/** An enum for sorting in either ascending or descending order. */
export enum SortDirection {
  /** Sort by field values in ascending order. */
  Asc = 'ASC',
  /** Sort by field values in descending order. */
  Desc = 'DESC'
}

export type StringAggregateSelectionNonNullable = {
  __typename?: 'StringAggregateSelectionNonNullable';
  longest: Scalars['String']['output'];
  shortest: Scalars['String']['output'];
};

export type StringAggregateSelectionNullable = {
  __typename?: 'StringAggregateSelectionNullable';
  longest?: Maybe<Scalars['String']['output']>;
  shortest?: Maybe<Scalars['String']['output']>;
};

export type Supplier = {
  __typename?: 'Supplier';
  name: Scalars['String']['output'];
  uid: Scalars['ID']['output'];
};

export type SupplierAggregateSelection = {
  __typename?: 'SupplierAggregateSelection';
  count: Scalars['Int']['output'];
  name: StringAggregateSelectionNonNullable;
  uid: IdAggregateSelectionNonNullable;
};

export type SupplierConnectWhere = {
  node: SupplierWhere;
};

export type SupplierCreateInput = {
  name: Scalars['String']['input'];
};

export type SupplierEdge = {
  __typename?: 'SupplierEdge';
  cursor: Scalars['String']['output'];
  node: Supplier;
};

export type SupplierOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /** Specify one or more SupplierSort objects to sort Suppliers by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<SupplierSort>>;
};

/** Fields to sort Suppliers by. The order in which sorts are applied is not guaranteed when specifying many fields in one SupplierSort object. */
export type SupplierSort = {
  name?: InputMaybe<SortDirection>;
  uid?: InputMaybe<SortDirection>;
};

export type SupplierUpdateInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type SupplierWhere = {
  AND?: InputMaybe<Array<SupplierWhere>>;
  NOT?: InputMaybe<SupplierWhere>;
  OR?: InputMaybe<Array<SupplierWhere>>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  uid?: InputMaybe<Scalars['ID']['input']>;
  uid_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  uid_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  uid_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  uid_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
};

export type SuppliersConnection = {
  __typename?: 'SuppliersConnection';
  edges: Array<SupplierEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type System = {
  __typename?: 'System';
  deleted: Scalars['Boolean']['output'];
  description?: Maybe<Scalars['String']['output']>;
  facility: Facility;
  facilityAggregate?: Maybe<SystemFacilityFacilityAggregationSelection>;
  facilityConnection: SystemFacilityConnection;
  isTechnologicalUnit?: Maybe<Scalars['Boolean']['output']>;
  keySystem?: Maybe<System>;
  location?: Maybe<Location>;
  locationAggregate?: Maybe<SystemLocationLocationAggregationSelection>;
  locationConnection: SystemLocationConnection;
  maintainedBy: Array<Employee>;
  maintainedByAggregate?: Maybe<SystemEmployeeMaintainedByAggregationSelection>;
  maintainedByConnection: SystemMaintainedByConnection;
  name: Scalars['String']['output'];
  operators: Array<Employee>;
  operatorsAggregate?: Maybe<SystemEmployeeOperatorsAggregationSelection>;
  operatorsConnection: SystemOperatorsConnection;
  owner?: Maybe<Employee>;
  ownerAggregate?: Maybe<SystemEmployeeOwnerAggregationSelection>;
  ownerConnection: SystemOwnerConnection;
  parentPath?: Maybe<Array<Maybe<ParentPathItem>>>;
  parentSystem?: Maybe<System>;
  parentSystemAggregate?: Maybe<SystemSystemParentSystemAggregationSelection>;
  parentSystemConnection: SystemParentSystemConnection;
  physicalItem?: Maybe<Item>;
  physicalItemAggregate?: Maybe<SystemItemPhysicalItemAggregationSelection>;
  physicalItemConnection: SystemPhysicalItemConnection;
  responsible?: Maybe<Employee>;
  responsibleAggregate?: Maybe<SystemEmployeeResponsibleAggregationSelection>;
  responsibleConnection: SystemResponsibleConnection;
  subSystems: Array<System>;
  subSystemsAggregate?: Maybe<SystemSystemSubSystemsAggregationSelection>;
  subSystemsConnection: SystemSubSystemsConnection;
  systemAlias?: Maybe<Scalars['String']['output']>;
  systemCode?: Maybe<Scalars['String']['output']>;
  systemLevel?: Maybe<SystemLevel>;
  systemType?: Maybe<SystemType>;
  systemTypeAggregate?: Maybe<SystemSystemTypeSystemTypeAggregationSelection>;
  systemTypeConnection: SystemSystemTypeConnection;
  uid: Scalars['ID']['output'];
  zone?: Maybe<Zone>;
  zoneAggregate?: Maybe<SystemZoneZoneAggregationSelection>;
  zoneConnection: SystemZoneConnection;
};


export type SystemFacilityArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<FacilityOptions>;
  where?: InputMaybe<FacilityWhere>;
};


export type SystemFacilityAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<FacilityWhere>;
};


export type SystemFacilityConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<SystemFacilityConnectionSort>>;
  where?: InputMaybe<SystemFacilityConnectionWhere>;
};


export type SystemLocationArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<LocationOptions>;
  where?: InputMaybe<LocationWhere>;
};


export type SystemLocationAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<LocationWhere>;
};


export type SystemLocationConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<SystemLocationConnectionSort>>;
  where?: InputMaybe<SystemLocationConnectionWhere>;
};


export type SystemMaintainedByArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<EmployeeOptions>;
  where?: InputMaybe<EmployeeWhere>;
};


export type SystemMaintainedByAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<EmployeeWhere>;
};


export type SystemMaintainedByConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<SystemMaintainedByConnectionSort>>;
  where?: InputMaybe<SystemMaintainedByConnectionWhere>;
};


export type SystemOperatorsArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<EmployeeOptions>;
  where?: InputMaybe<EmployeeWhere>;
};


export type SystemOperatorsAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<EmployeeWhere>;
};


export type SystemOperatorsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<SystemOperatorsConnectionSort>>;
  where?: InputMaybe<SystemOperatorsConnectionWhere>;
};


export type SystemOwnerArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<EmployeeOptions>;
  where?: InputMaybe<EmployeeWhere>;
};


export type SystemOwnerAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<EmployeeWhere>;
};


export type SystemOwnerConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<SystemOwnerConnectionSort>>;
  where?: InputMaybe<SystemOwnerConnectionWhere>;
};


export type SystemParentSystemArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<SystemOptions>;
  where?: InputMaybe<SystemWhere>;
};


export type SystemParentSystemAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<SystemWhere>;
};


export type SystemParentSystemConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<SystemParentSystemConnectionSort>>;
  where?: InputMaybe<SystemParentSystemConnectionWhere>;
};


export type SystemPhysicalItemArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<ItemOptions>;
  where?: InputMaybe<ItemWhere>;
};


export type SystemPhysicalItemAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ItemWhere>;
};


export type SystemPhysicalItemConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<SystemPhysicalItemConnectionSort>>;
  where?: InputMaybe<SystemPhysicalItemConnectionWhere>;
};


export type SystemResponsibleArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<EmployeeOptions>;
  where?: InputMaybe<EmployeeWhere>;
};


export type SystemResponsibleAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<EmployeeWhere>;
};


export type SystemResponsibleConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<SystemResponsibleConnectionSort>>;
  where?: InputMaybe<SystemResponsibleConnectionWhere>;
};


export type SystemSubSystemsArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<SystemOptions>;
  where?: InputMaybe<SystemWhere>;
};


export type SystemSubSystemsAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<SystemWhere>;
};


export type SystemSubSystemsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<SystemSubSystemsConnectionSort>>;
  where?: InputMaybe<SystemSubSystemsConnectionWhere>;
};


export type SystemSystemTypeArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<SystemTypeOptions>;
  where?: InputMaybe<SystemTypeWhere>;
};


export type SystemSystemTypeAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<SystemTypeWhere>;
};


export type SystemSystemTypeConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<SystemSystemTypeConnectionSort>>;
  where?: InputMaybe<SystemSystemTypeConnectionWhere>;
};


export type SystemZoneArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<ZoneOptions>;
  where?: InputMaybe<ZoneWhere>;
};


export type SystemZoneAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ZoneWhere>;
};


export type SystemZoneConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<SystemZoneConnectionSort>>;
  where?: InputMaybe<SystemZoneConnectionWhere>;
};

export type SystemAggregateSelection = {
  __typename?: 'SystemAggregateSelection';
  count: Scalars['Int']['output'];
  description: StringAggregateSelectionNullable;
  name: StringAggregateSelectionNonNullable;
  systemAlias: StringAggregateSelectionNullable;
  systemCode: StringAggregateSelectionNullable;
  uid: IdAggregateSelectionNonNullable;
};

export type SystemConnectInput = {
  facility?: InputMaybe<SystemFacilityConnectFieldInput>;
  location?: InputMaybe<SystemLocationConnectFieldInput>;
  maintainedBy?: InputMaybe<Array<SystemMaintainedByConnectFieldInput>>;
  operators?: InputMaybe<Array<SystemOperatorsConnectFieldInput>>;
  owner?: InputMaybe<SystemOwnerConnectFieldInput>;
  parentSystem?: InputMaybe<SystemParentSystemConnectFieldInput>;
  physicalItem?: InputMaybe<SystemPhysicalItemConnectFieldInput>;
  responsible?: InputMaybe<SystemResponsibleConnectFieldInput>;
  subSystems?: InputMaybe<Array<SystemSubSystemsConnectFieldInput>>;
  systemType?: InputMaybe<SystemSystemTypeConnectFieldInput>;
  zone?: InputMaybe<SystemZoneConnectFieldInput>;
};

export type SystemConnectWhere = {
  node: SystemWhere;
};

export type SystemCreateInput = {
  deleted: Scalars['Boolean']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  facility?: InputMaybe<SystemFacilityFieldInput>;
  isTechnologicalUnit?: InputMaybe<Scalars['Boolean']['input']>;
  location?: InputMaybe<SystemLocationFieldInput>;
  maintainedBy?: InputMaybe<SystemMaintainedByFieldInput>;
  name: Scalars['String']['input'];
  operators?: InputMaybe<SystemOperatorsFieldInput>;
  owner?: InputMaybe<SystemOwnerFieldInput>;
  parentSystem?: InputMaybe<SystemParentSystemFieldInput>;
  physicalItem?: InputMaybe<SystemPhysicalItemFieldInput>;
  responsible?: InputMaybe<SystemResponsibleFieldInput>;
  subSystems?: InputMaybe<SystemSubSystemsFieldInput>;
  systemAlias?: InputMaybe<Scalars['String']['input']>;
  systemCode?: InputMaybe<Scalars['String']['input']>;
  systemLevel?: InputMaybe<SystemLevel>;
  systemType?: InputMaybe<SystemSystemTypeFieldInput>;
  zone?: InputMaybe<SystemZoneFieldInput>;
};

export type SystemCriticalitiesConnection = {
  __typename?: 'SystemCriticalitiesConnection';
  edges: Array<SystemCriticalityEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type SystemCriticality = {
  __typename?: 'SystemCriticality';
  code: Scalars['String']['output'];
  name: Scalars['String']['output'];
  uid: Scalars['ID']['output'];
};

export type SystemCriticalityAggregateSelection = {
  __typename?: 'SystemCriticalityAggregateSelection';
  code: StringAggregateSelectionNonNullable;
  count: Scalars['Int']['output'];
  name: StringAggregateSelectionNonNullable;
  uid: IdAggregateSelectionNonNullable;
};

export type SystemCriticalityCreateInput = {
  code: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type SystemCriticalityEdge = {
  __typename?: 'SystemCriticalityEdge';
  cursor: Scalars['String']['output'];
  node: SystemCriticality;
};

export type SystemCriticalityOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /** Specify one or more SystemCriticalitySort objects to sort SystemCriticalities by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<SystemCriticalitySort>>;
};

/** Fields to sort SystemCriticalities by. The order in which sorts are applied is not guaranteed when specifying many fields in one SystemCriticalitySort object. */
export type SystemCriticalitySort = {
  code?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  uid?: InputMaybe<SortDirection>;
};

export type SystemCriticalityUpdateInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type SystemCriticalityWhere = {
  AND?: InputMaybe<Array<SystemCriticalityWhere>>;
  NOT?: InputMaybe<SystemCriticalityWhere>;
  OR?: InputMaybe<Array<SystemCriticalityWhere>>;
  code?: InputMaybe<Scalars['String']['input']>;
  code_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  code_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  code_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  code_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  uid?: InputMaybe<Scalars['ID']['input']>;
  uid_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  uid_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  uid_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  uid_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
};

export type SystemDeleteInput = {
  facility?: InputMaybe<SystemFacilityDeleteFieldInput>;
  location?: InputMaybe<SystemLocationDeleteFieldInput>;
  maintainedBy?: InputMaybe<Array<SystemMaintainedByDeleteFieldInput>>;
  operators?: InputMaybe<Array<SystemOperatorsDeleteFieldInput>>;
  owner?: InputMaybe<SystemOwnerDeleteFieldInput>;
  parentSystem?: InputMaybe<SystemParentSystemDeleteFieldInput>;
  physicalItem?: InputMaybe<SystemPhysicalItemDeleteFieldInput>;
  responsible?: InputMaybe<SystemResponsibleDeleteFieldInput>;
  subSystems?: InputMaybe<Array<SystemSubSystemsDeleteFieldInput>>;
  systemType?: InputMaybe<SystemSystemTypeDeleteFieldInput>;
  zone?: InputMaybe<SystemZoneDeleteFieldInput>;
};

export type SystemDisconnectInput = {
  facility?: InputMaybe<SystemFacilityDisconnectFieldInput>;
  location?: InputMaybe<SystemLocationDisconnectFieldInput>;
  maintainedBy?: InputMaybe<Array<SystemMaintainedByDisconnectFieldInput>>;
  operators?: InputMaybe<Array<SystemOperatorsDisconnectFieldInput>>;
  owner?: InputMaybe<SystemOwnerDisconnectFieldInput>;
  parentSystem?: InputMaybe<SystemParentSystemDisconnectFieldInput>;
  physicalItem?: InputMaybe<SystemPhysicalItemDisconnectFieldInput>;
  responsible?: InputMaybe<SystemResponsibleDisconnectFieldInput>;
  subSystems?: InputMaybe<Array<SystemSubSystemsDisconnectFieldInput>>;
  systemType?: InputMaybe<SystemSystemTypeDisconnectFieldInput>;
  zone?: InputMaybe<SystemZoneDisconnectFieldInput>;
};

export type SystemEdge = {
  __typename?: 'SystemEdge';
  cursor: Scalars['String']['output'];
  node: System;
};

export type SystemEmployeeMaintainedByAggregationSelection = {
  __typename?: 'SystemEmployeeMaintainedByAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<SystemEmployeeMaintainedByNodeAggregateSelection>;
};

export type SystemEmployeeMaintainedByNodeAggregateSelection = {
  __typename?: 'SystemEmployeeMaintainedByNodeAggregateSelection';
  email: StringAggregateSelectionNullable;
  firstName: StringAggregateSelectionNonNullable;
  fullName: StringAggregateSelectionNullable;
  lastName: StringAggregateSelectionNonNullable;
  phoneNumber: StringAggregateSelectionNullable;
  uid: IdAggregateSelectionNonNullable;
};

export type SystemEmployeeOperatorsAggregationSelection = {
  __typename?: 'SystemEmployeeOperatorsAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<SystemEmployeeOperatorsNodeAggregateSelection>;
};

export type SystemEmployeeOperatorsNodeAggregateSelection = {
  __typename?: 'SystemEmployeeOperatorsNodeAggregateSelection';
  email: StringAggregateSelectionNullable;
  firstName: StringAggregateSelectionNonNullable;
  fullName: StringAggregateSelectionNullable;
  lastName: StringAggregateSelectionNonNullable;
  phoneNumber: StringAggregateSelectionNullable;
  uid: IdAggregateSelectionNonNullable;
};

export type SystemEmployeeOwnerAggregationSelection = {
  __typename?: 'SystemEmployeeOwnerAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<SystemEmployeeOwnerNodeAggregateSelection>;
};

export type SystemEmployeeOwnerNodeAggregateSelection = {
  __typename?: 'SystemEmployeeOwnerNodeAggregateSelection';
  email: StringAggregateSelectionNullable;
  firstName: StringAggregateSelectionNonNullable;
  fullName: StringAggregateSelectionNullable;
  lastName: StringAggregateSelectionNonNullable;
  phoneNumber: StringAggregateSelectionNullable;
  uid: IdAggregateSelectionNonNullable;
};

export type SystemEmployeeResponsibleAggregationSelection = {
  __typename?: 'SystemEmployeeResponsibleAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<SystemEmployeeResponsibleNodeAggregateSelection>;
};

export type SystemEmployeeResponsibleNodeAggregateSelection = {
  __typename?: 'SystemEmployeeResponsibleNodeAggregateSelection';
  email: StringAggregateSelectionNullable;
  firstName: StringAggregateSelectionNonNullable;
  fullName: StringAggregateSelectionNullable;
  lastName: StringAggregateSelectionNonNullable;
  phoneNumber: StringAggregateSelectionNullable;
  uid: IdAggregateSelectionNonNullable;
};

export type SystemFacilityAggregateInput = {
  AND?: InputMaybe<Array<SystemFacilityAggregateInput>>;
  NOT?: InputMaybe<SystemFacilityAggregateInput>;
  OR?: InputMaybe<Array<SystemFacilityAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<SystemFacilityNodeAggregationWhereInput>;
};

export type SystemFacilityConnectFieldInput = {
  connect?: InputMaybe<FacilityConnectInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<FacilityConnectWhere>;
};

export type SystemFacilityConnection = {
  __typename?: 'SystemFacilityConnection';
  edges: Array<SystemFacilityRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type SystemFacilityConnectionSort = {
  node?: InputMaybe<FacilitySort>;
};

export type SystemFacilityConnectionWhere = {
  AND?: InputMaybe<Array<SystemFacilityConnectionWhere>>;
  NOT?: InputMaybe<SystemFacilityConnectionWhere>;
  OR?: InputMaybe<Array<SystemFacilityConnectionWhere>>;
  node?: InputMaybe<FacilityWhere>;
};

export type SystemFacilityCreateFieldInput = {
  node: FacilityCreateInput;
};

export type SystemFacilityDeleteFieldInput = {
  delete?: InputMaybe<FacilityDeleteInput>;
  where?: InputMaybe<SystemFacilityConnectionWhere>;
};

export type SystemFacilityDisconnectFieldInput = {
  disconnect?: InputMaybe<FacilityDisconnectInput>;
  where?: InputMaybe<SystemFacilityConnectionWhere>;
};

export type SystemFacilityFacilityAggregationSelection = {
  __typename?: 'SystemFacilityFacilityAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<SystemFacilityFacilityNodeAggregateSelection>;
};

export type SystemFacilityFacilityNodeAggregateSelection = {
  __typename?: 'SystemFacilityFacilityNodeAggregateSelection';
  code: StringAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  uid: StringAggregateSelectionNonNullable;
};

export type SystemFacilityFieldInput = {
  connect?: InputMaybe<SystemFacilityConnectFieldInput>;
  create?: InputMaybe<SystemFacilityCreateFieldInput>;
};

export type SystemFacilityNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<SystemFacilityNodeAggregationWhereInput>>;
  NOT?: InputMaybe<SystemFacilityNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<SystemFacilityNodeAggregationWhereInput>>;
  code_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  code_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  uid_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  uid_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  uid_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  uid_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  uid_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  uid_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  uid_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  uid_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  uid_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  uid_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type SystemFacilityRelationship = {
  __typename?: 'SystemFacilityRelationship';
  cursor: Scalars['String']['output'];
  node: Facility;
};

export type SystemFacilityUpdateConnectionInput = {
  node?: InputMaybe<FacilityUpdateInput>;
};

export type SystemFacilityUpdateFieldInput = {
  connect?: InputMaybe<SystemFacilityConnectFieldInput>;
  create?: InputMaybe<SystemFacilityCreateFieldInput>;
  delete?: InputMaybe<SystemFacilityDeleteFieldInput>;
  disconnect?: InputMaybe<SystemFacilityDisconnectFieldInput>;
  update?: InputMaybe<SystemFacilityUpdateConnectionInput>;
  where?: InputMaybe<SystemFacilityConnectionWhere>;
};

export type SystemImportance = {
  __typename?: 'SystemImportance';
  code: Scalars['String']['output'];
  name: Scalars['String']['output'];
  uid: Scalars['ID']['output'];
};

export type SystemImportanceAggregateSelection = {
  __typename?: 'SystemImportanceAggregateSelection';
  code: StringAggregateSelectionNonNullable;
  count: Scalars['Int']['output'];
  name: StringAggregateSelectionNonNullable;
  uid: IdAggregateSelectionNonNullable;
};

export type SystemImportanceCreateInput = {
  code: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type SystemImportanceEdge = {
  __typename?: 'SystemImportanceEdge';
  cursor: Scalars['String']['output'];
  node: SystemImportance;
};

export type SystemImportanceOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /** Specify one or more SystemImportanceSort objects to sort SystemImportances by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<SystemImportanceSort>>;
};

/** Fields to sort SystemImportances by. The order in which sorts are applied is not guaranteed when specifying many fields in one SystemImportanceSort object. */
export type SystemImportanceSort = {
  code?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  uid?: InputMaybe<SortDirection>;
};

export type SystemImportanceUpdateInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type SystemImportanceWhere = {
  AND?: InputMaybe<Array<SystemImportanceWhere>>;
  NOT?: InputMaybe<SystemImportanceWhere>;
  OR?: InputMaybe<Array<SystemImportanceWhere>>;
  code?: InputMaybe<Scalars['String']['input']>;
  code_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  code_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  code_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  code_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  uid?: InputMaybe<Scalars['ID']['input']>;
  uid_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  uid_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  uid_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  uid_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
};

export type SystemImportancesConnection = {
  __typename?: 'SystemImportancesConnection';
  edges: Array<SystemImportanceEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type SystemItemPhysicalItemAggregationSelection = {
  __typename?: 'SystemItemPhysicalItemAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<SystemItemPhysicalItemNodeAggregateSelection>;
};

export type SystemItemPhysicalItemNodeAggregateSelection = {
  __typename?: 'SystemItemPhysicalItemNodeAggregateSelection';
  eun: StringAggregateSelectionNullable;
  name: StringAggregateSelectionNonNullable;
  notes: StringAggregateSelectionNullable;
  serialNumber: StringAggregateSelectionNullable;
  uid: IdAggregateSelectionNonNullable;
};

export enum SystemLevel {
  KeySystems = 'KEY_SYSTEMS',
  SubsystemsAndParts = 'SUBSYSTEMS_AND_PARTS',
  TechnologyUnit = 'TECHNOLOGY_UNIT'
}

export type SystemLocationAggregateInput = {
  AND?: InputMaybe<Array<SystemLocationAggregateInput>>;
  NOT?: InputMaybe<SystemLocationAggregateInput>;
  OR?: InputMaybe<Array<SystemLocationAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<SystemLocationNodeAggregationWhereInput>;
};

export type SystemLocationConnectFieldInput = {
  connect?: InputMaybe<LocationConnectInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<LocationConnectWhere>;
};

export type SystemLocationConnection = {
  __typename?: 'SystemLocationConnection';
  edges: Array<SystemLocationRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type SystemLocationConnectionSort = {
  node?: InputMaybe<LocationSort>;
};

export type SystemLocationConnectionWhere = {
  AND?: InputMaybe<Array<SystemLocationConnectionWhere>>;
  NOT?: InputMaybe<SystemLocationConnectionWhere>;
  OR?: InputMaybe<Array<SystemLocationConnectionWhere>>;
  node?: InputMaybe<LocationWhere>;
};

export type SystemLocationCreateFieldInput = {
  node: LocationCreateInput;
};

export type SystemLocationDeleteFieldInput = {
  delete?: InputMaybe<LocationDeleteInput>;
  where?: InputMaybe<SystemLocationConnectionWhere>;
};

export type SystemLocationDisconnectFieldInput = {
  disconnect?: InputMaybe<LocationDisconnectInput>;
  where?: InputMaybe<SystemLocationConnectionWhere>;
};

export type SystemLocationFieldInput = {
  connect?: InputMaybe<SystemLocationConnectFieldInput>;
  create?: InputMaybe<SystemLocationCreateFieldInput>;
};

export type SystemLocationLocationAggregationSelection = {
  __typename?: 'SystemLocationLocationAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<SystemLocationLocationNodeAggregateSelection>;
};

export type SystemLocationLocationNodeAggregateSelection = {
  __typename?: 'SystemLocationLocationNodeAggregateSelection';
  code: StringAggregateSelectionNullable;
  name: StringAggregateSelectionNonNullable;
  uid: IdAggregateSelectionNonNullable;
};

export type SystemLocationNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<SystemLocationNodeAggregationWhereInput>>;
  NOT?: InputMaybe<SystemLocationNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<SystemLocationNodeAggregationWhereInput>>;
  code_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  code_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type SystemLocationRelationship = {
  __typename?: 'SystemLocationRelationship';
  cursor: Scalars['String']['output'];
  node: Location;
};

export type SystemLocationUpdateConnectionInput = {
  node?: InputMaybe<LocationUpdateInput>;
};

export type SystemLocationUpdateFieldInput = {
  connect?: InputMaybe<SystemLocationConnectFieldInput>;
  create?: InputMaybe<SystemLocationCreateFieldInput>;
  delete?: InputMaybe<SystemLocationDeleteFieldInput>;
  disconnect?: InputMaybe<SystemLocationDisconnectFieldInput>;
  update?: InputMaybe<SystemLocationUpdateConnectionInput>;
  where?: InputMaybe<SystemLocationConnectionWhere>;
};

export type SystemMaintainedByAggregateInput = {
  AND?: InputMaybe<Array<SystemMaintainedByAggregateInput>>;
  NOT?: InputMaybe<SystemMaintainedByAggregateInput>;
  OR?: InputMaybe<Array<SystemMaintainedByAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<SystemMaintainedByNodeAggregationWhereInput>;
};

export type SystemMaintainedByConnectFieldInput = {
  connect?: InputMaybe<Array<EmployeeConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<EmployeeConnectWhere>;
};

export type SystemMaintainedByConnection = {
  __typename?: 'SystemMaintainedByConnection';
  edges: Array<SystemMaintainedByRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type SystemMaintainedByConnectionSort = {
  node?: InputMaybe<EmployeeSort>;
};

export type SystemMaintainedByConnectionWhere = {
  AND?: InputMaybe<Array<SystemMaintainedByConnectionWhere>>;
  NOT?: InputMaybe<SystemMaintainedByConnectionWhere>;
  OR?: InputMaybe<Array<SystemMaintainedByConnectionWhere>>;
  node?: InputMaybe<EmployeeWhere>;
};

export type SystemMaintainedByCreateFieldInput = {
  node: EmployeeCreateInput;
};

export type SystemMaintainedByDeleteFieldInput = {
  delete?: InputMaybe<EmployeeDeleteInput>;
  where?: InputMaybe<SystemMaintainedByConnectionWhere>;
};

export type SystemMaintainedByDisconnectFieldInput = {
  disconnect?: InputMaybe<EmployeeDisconnectInput>;
  where?: InputMaybe<SystemMaintainedByConnectionWhere>;
};

export type SystemMaintainedByFieldInput = {
  connect?: InputMaybe<Array<SystemMaintainedByConnectFieldInput>>;
  create?: InputMaybe<Array<SystemMaintainedByCreateFieldInput>>;
};

export type SystemMaintainedByNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<SystemMaintainedByNodeAggregationWhereInput>>;
  NOT?: InputMaybe<SystemMaintainedByNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<SystemMaintainedByNodeAggregationWhereInput>>;
  email_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  email_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  email_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  email_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  email_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  email_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  email_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  email_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  email_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  firstName_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  firstName_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  firstName_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  firstName_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  firstName_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  firstName_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  firstName_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  firstName_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  firstName_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  firstName_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  firstName_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  firstName_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  firstName_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  firstName_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  firstName_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  fullName_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  fullName_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  fullName_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  fullName_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  fullName_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  fullName_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  fullName_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  fullName_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  fullName_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  fullName_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  fullName_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  fullName_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  fullName_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  fullName_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  fullName_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  lastName_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  lastName_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  lastName_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  lastName_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  lastName_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  lastName_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  lastName_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  lastName_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  lastName_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  lastName_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  lastName_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  lastName_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  lastName_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  lastName_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  lastName_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  phoneNumber_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  phoneNumber_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  phoneNumber_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  phoneNumber_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  phoneNumber_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type SystemMaintainedByRelationship = {
  __typename?: 'SystemMaintainedByRelationship';
  cursor: Scalars['String']['output'];
  node: Employee;
};

export type SystemMaintainedByUpdateConnectionInput = {
  node?: InputMaybe<EmployeeUpdateInput>;
};

export type SystemMaintainedByUpdateFieldInput = {
  connect?: InputMaybe<Array<SystemMaintainedByConnectFieldInput>>;
  create?: InputMaybe<Array<SystemMaintainedByCreateFieldInput>>;
  delete?: InputMaybe<Array<SystemMaintainedByDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<SystemMaintainedByDisconnectFieldInput>>;
  update?: InputMaybe<SystemMaintainedByUpdateConnectionInput>;
  where?: InputMaybe<SystemMaintainedByConnectionWhere>;
};

export type SystemOperatorsAggregateInput = {
  AND?: InputMaybe<Array<SystemOperatorsAggregateInput>>;
  NOT?: InputMaybe<SystemOperatorsAggregateInput>;
  OR?: InputMaybe<Array<SystemOperatorsAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<SystemOperatorsNodeAggregationWhereInput>;
};

export type SystemOperatorsConnectFieldInput = {
  connect?: InputMaybe<Array<EmployeeConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<EmployeeConnectWhere>;
};

export type SystemOperatorsConnection = {
  __typename?: 'SystemOperatorsConnection';
  edges: Array<SystemOperatorsRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type SystemOperatorsConnectionSort = {
  node?: InputMaybe<EmployeeSort>;
};

export type SystemOperatorsConnectionWhere = {
  AND?: InputMaybe<Array<SystemOperatorsConnectionWhere>>;
  NOT?: InputMaybe<SystemOperatorsConnectionWhere>;
  OR?: InputMaybe<Array<SystemOperatorsConnectionWhere>>;
  node?: InputMaybe<EmployeeWhere>;
};

export type SystemOperatorsCreateFieldInput = {
  node: EmployeeCreateInput;
};

export type SystemOperatorsDeleteFieldInput = {
  delete?: InputMaybe<EmployeeDeleteInput>;
  where?: InputMaybe<SystemOperatorsConnectionWhere>;
};

export type SystemOperatorsDisconnectFieldInput = {
  disconnect?: InputMaybe<EmployeeDisconnectInput>;
  where?: InputMaybe<SystemOperatorsConnectionWhere>;
};

export type SystemOperatorsFieldInput = {
  connect?: InputMaybe<Array<SystemOperatorsConnectFieldInput>>;
  create?: InputMaybe<Array<SystemOperatorsCreateFieldInput>>;
};

export type SystemOperatorsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<SystemOperatorsNodeAggregationWhereInput>>;
  NOT?: InputMaybe<SystemOperatorsNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<SystemOperatorsNodeAggregationWhereInput>>;
  email_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  email_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  email_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  email_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  email_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  email_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  email_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  email_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  email_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  firstName_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  firstName_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  firstName_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  firstName_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  firstName_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  firstName_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  firstName_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  firstName_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  firstName_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  firstName_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  firstName_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  firstName_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  firstName_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  firstName_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  firstName_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  fullName_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  fullName_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  fullName_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  fullName_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  fullName_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  fullName_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  fullName_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  fullName_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  fullName_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  fullName_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  fullName_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  fullName_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  fullName_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  fullName_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  fullName_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  lastName_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  lastName_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  lastName_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  lastName_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  lastName_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  lastName_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  lastName_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  lastName_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  lastName_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  lastName_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  lastName_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  lastName_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  lastName_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  lastName_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  lastName_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  phoneNumber_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  phoneNumber_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  phoneNumber_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  phoneNumber_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  phoneNumber_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type SystemOperatorsRelationship = {
  __typename?: 'SystemOperatorsRelationship';
  cursor: Scalars['String']['output'];
  node: Employee;
};

export type SystemOperatorsUpdateConnectionInput = {
  node?: InputMaybe<EmployeeUpdateInput>;
};

export type SystemOperatorsUpdateFieldInput = {
  connect?: InputMaybe<Array<SystemOperatorsConnectFieldInput>>;
  create?: InputMaybe<Array<SystemOperatorsCreateFieldInput>>;
  delete?: InputMaybe<Array<SystemOperatorsDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<SystemOperatorsDisconnectFieldInput>>;
  update?: InputMaybe<SystemOperatorsUpdateConnectionInput>;
  where?: InputMaybe<SystemOperatorsConnectionWhere>;
};

export type SystemOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /** Specify one or more SystemSort objects to sort Systems by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<SystemSort>>;
};

export type SystemOwnerAggregateInput = {
  AND?: InputMaybe<Array<SystemOwnerAggregateInput>>;
  NOT?: InputMaybe<SystemOwnerAggregateInput>;
  OR?: InputMaybe<Array<SystemOwnerAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<SystemOwnerNodeAggregationWhereInput>;
};

export type SystemOwnerConnectFieldInput = {
  connect?: InputMaybe<EmployeeConnectInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<EmployeeConnectWhere>;
};

export type SystemOwnerConnection = {
  __typename?: 'SystemOwnerConnection';
  edges: Array<SystemOwnerRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type SystemOwnerConnectionSort = {
  node?: InputMaybe<EmployeeSort>;
};

export type SystemOwnerConnectionWhere = {
  AND?: InputMaybe<Array<SystemOwnerConnectionWhere>>;
  NOT?: InputMaybe<SystemOwnerConnectionWhere>;
  OR?: InputMaybe<Array<SystemOwnerConnectionWhere>>;
  node?: InputMaybe<EmployeeWhere>;
};

export type SystemOwnerCreateFieldInput = {
  node: EmployeeCreateInput;
};

export type SystemOwnerDeleteFieldInput = {
  delete?: InputMaybe<EmployeeDeleteInput>;
  where?: InputMaybe<SystemOwnerConnectionWhere>;
};

export type SystemOwnerDisconnectFieldInput = {
  disconnect?: InputMaybe<EmployeeDisconnectInput>;
  where?: InputMaybe<SystemOwnerConnectionWhere>;
};

export type SystemOwnerFieldInput = {
  connect?: InputMaybe<SystemOwnerConnectFieldInput>;
  create?: InputMaybe<SystemOwnerCreateFieldInput>;
};

export type SystemOwnerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<SystemOwnerNodeAggregationWhereInput>>;
  NOT?: InputMaybe<SystemOwnerNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<SystemOwnerNodeAggregationWhereInput>>;
  email_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  email_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  email_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  email_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  email_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  email_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  email_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  email_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  email_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  firstName_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  firstName_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  firstName_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  firstName_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  firstName_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  firstName_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  firstName_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  firstName_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  firstName_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  firstName_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  firstName_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  firstName_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  firstName_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  firstName_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  firstName_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  fullName_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  fullName_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  fullName_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  fullName_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  fullName_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  fullName_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  fullName_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  fullName_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  fullName_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  fullName_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  fullName_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  fullName_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  fullName_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  fullName_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  fullName_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  lastName_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  lastName_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  lastName_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  lastName_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  lastName_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  lastName_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  lastName_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  lastName_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  lastName_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  lastName_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  lastName_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  lastName_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  lastName_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  lastName_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  lastName_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  phoneNumber_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  phoneNumber_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  phoneNumber_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  phoneNumber_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  phoneNumber_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type SystemOwnerRelationship = {
  __typename?: 'SystemOwnerRelationship';
  cursor: Scalars['String']['output'];
  node: Employee;
};

export type SystemOwnerUpdateConnectionInput = {
  node?: InputMaybe<EmployeeUpdateInput>;
};

export type SystemOwnerUpdateFieldInput = {
  connect?: InputMaybe<SystemOwnerConnectFieldInput>;
  create?: InputMaybe<SystemOwnerCreateFieldInput>;
  delete?: InputMaybe<SystemOwnerDeleteFieldInput>;
  disconnect?: InputMaybe<SystemOwnerDisconnectFieldInput>;
  update?: InputMaybe<SystemOwnerUpdateConnectionInput>;
  where?: InputMaybe<SystemOwnerConnectionWhere>;
};

export type SystemParentSystemAggregateInput = {
  AND?: InputMaybe<Array<SystemParentSystemAggregateInput>>;
  NOT?: InputMaybe<SystemParentSystemAggregateInput>;
  OR?: InputMaybe<Array<SystemParentSystemAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<SystemParentSystemNodeAggregationWhereInput>;
};

export type SystemParentSystemConnectFieldInput = {
  connect?: InputMaybe<SystemConnectInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<SystemConnectWhere>;
};

export type SystemParentSystemConnection = {
  __typename?: 'SystemParentSystemConnection';
  edges: Array<SystemParentSystemRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type SystemParentSystemConnectionSort = {
  node?: InputMaybe<SystemSort>;
};

export type SystemParentSystemConnectionWhere = {
  AND?: InputMaybe<Array<SystemParentSystemConnectionWhere>>;
  NOT?: InputMaybe<SystemParentSystemConnectionWhere>;
  OR?: InputMaybe<Array<SystemParentSystemConnectionWhere>>;
  node?: InputMaybe<SystemWhere>;
};

export type SystemParentSystemCreateFieldInput = {
  node: SystemCreateInput;
};

export type SystemParentSystemDeleteFieldInput = {
  delete?: InputMaybe<SystemDeleteInput>;
  where?: InputMaybe<SystemParentSystemConnectionWhere>;
};

export type SystemParentSystemDisconnectFieldInput = {
  disconnect?: InputMaybe<SystemDisconnectInput>;
  where?: InputMaybe<SystemParentSystemConnectionWhere>;
};

export type SystemParentSystemFieldInput = {
  connect?: InputMaybe<SystemParentSystemConnectFieldInput>;
  create?: InputMaybe<SystemParentSystemCreateFieldInput>;
};

export type SystemParentSystemNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<SystemParentSystemNodeAggregationWhereInput>>;
  NOT?: InputMaybe<SystemParentSystemNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<SystemParentSystemNodeAggregationWhereInput>>;
  description_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  description_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  description_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  description_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  description_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  description_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  description_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  description_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  description_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  description_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  systemAlias_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  systemAlias_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  systemAlias_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  systemAlias_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  systemAlias_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  systemAlias_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  systemAlias_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  systemAlias_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  systemAlias_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  systemAlias_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  systemAlias_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  systemAlias_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  systemAlias_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  systemAlias_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  systemAlias_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  systemCode_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  systemCode_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  systemCode_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  systemCode_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  systemCode_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  systemCode_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  systemCode_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  systemCode_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  systemCode_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  systemCode_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  systemCode_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  systemCode_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  systemCode_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  systemCode_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  systemCode_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type SystemParentSystemRelationship = {
  __typename?: 'SystemParentSystemRelationship';
  cursor: Scalars['String']['output'];
  node: System;
};

export type SystemParentSystemUpdateConnectionInput = {
  node?: InputMaybe<SystemUpdateInput>;
};

export type SystemParentSystemUpdateFieldInput = {
  connect?: InputMaybe<SystemParentSystemConnectFieldInput>;
  create?: InputMaybe<SystemParentSystemCreateFieldInput>;
  delete?: InputMaybe<SystemParentSystemDeleteFieldInput>;
  disconnect?: InputMaybe<SystemParentSystemDisconnectFieldInput>;
  update?: InputMaybe<SystemParentSystemUpdateConnectionInput>;
  where?: InputMaybe<SystemParentSystemConnectionWhere>;
};

export type SystemPhysicalItemAggregateInput = {
  AND?: InputMaybe<Array<SystemPhysicalItemAggregateInput>>;
  NOT?: InputMaybe<SystemPhysicalItemAggregateInput>;
  OR?: InputMaybe<Array<SystemPhysicalItemAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<SystemPhysicalItemNodeAggregationWhereInput>;
};

export type SystemPhysicalItemConnectFieldInput = {
  connect?: InputMaybe<ItemConnectInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<ItemConnectWhere>;
};

export type SystemPhysicalItemConnection = {
  __typename?: 'SystemPhysicalItemConnection';
  edges: Array<SystemPhysicalItemRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type SystemPhysicalItemConnectionSort = {
  node?: InputMaybe<ItemSort>;
};

export type SystemPhysicalItemConnectionWhere = {
  AND?: InputMaybe<Array<SystemPhysicalItemConnectionWhere>>;
  NOT?: InputMaybe<SystemPhysicalItemConnectionWhere>;
  OR?: InputMaybe<Array<SystemPhysicalItemConnectionWhere>>;
  node?: InputMaybe<ItemWhere>;
};

export type SystemPhysicalItemCreateFieldInput = {
  node: ItemCreateInput;
};

export type SystemPhysicalItemDeleteFieldInput = {
  delete?: InputMaybe<ItemDeleteInput>;
  where?: InputMaybe<SystemPhysicalItemConnectionWhere>;
};

export type SystemPhysicalItemDisconnectFieldInput = {
  disconnect?: InputMaybe<ItemDisconnectInput>;
  where?: InputMaybe<SystemPhysicalItemConnectionWhere>;
};

export type SystemPhysicalItemFieldInput = {
  connect?: InputMaybe<SystemPhysicalItemConnectFieldInput>;
  create?: InputMaybe<SystemPhysicalItemCreateFieldInput>;
};

export type SystemPhysicalItemNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<SystemPhysicalItemNodeAggregationWhereInput>>;
  NOT?: InputMaybe<SystemPhysicalItemNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<SystemPhysicalItemNodeAggregationWhereInput>>;
  eun_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  eun_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  eun_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  eun_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  eun_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  eun_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  eun_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  eun_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  eun_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  eun_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  eun_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  eun_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  eun_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  eun_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  eun_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  notes_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  notes_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  notes_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  notes_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  notes_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  notes_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  notes_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  notes_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  notes_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  notes_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  notes_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  notes_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  notes_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  notes_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  notes_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  serialNumber_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  serialNumber_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  serialNumber_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  serialNumber_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  serialNumber_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  serialNumber_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  serialNumber_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  serialNumber_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  serialNumber_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  serialNumber_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  serialNumber_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  serialNumber_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  serialNumber_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  serialNumber_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  serialNumber_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type SystemPhysicalItemRelationship = {
  __typename?: 'SystemPhysicalItemRelationship';
  cursor: Scalars['String']['output'];
  node: Item;
};

export type SystemPhysicalItemUpdateConnectionInput = {
  node?: InputMaybe<ItemUpdateInput>;
};

export type SystemPhysicalItemUpdateFieldInput = {
  connect?: InputMaybe<SystemPhysicalItemConnectFieldInput>;
  create?: InputMaybe<SystemPhysicalItemCreateFieldInput>;
  delete?: InputMaybe<SystemPhysicalItemDeleteFieldInput>;
  disconnect?: InputMaybe<SystemPhysicalItemDisconnectFieldInput>;
  update?: InputMaybe<SystemPhysicalItemUpdateConnectionInput>;
  where?: InputMaybe<SystemPhysicalItemConnectionWhere>;
};

export type SystemRelationInput = {
  facility?: InputMaybe<SystemFacilityCreateFieldInput>;
  location?: InputMaybe<SystemLocationCreateFieldInput>;
  maintainedBy?: InputMaybe<Array<SystemMaintainedByCreateFieldInput>>;
  operators?: InputMaybe<Array<SystemOperatorsCreateFieldInput>>;
  owner?: InputMaybe<SystemOwnerCreateFieldInput>;
  parentSystem?: InputMaybe<SystemParentSystemCreateFieldInput>;
  physicalItem?: InputMaybe<SystemPhysicalItemCreateFieldInput>;
  responsible?: InputMaybe<SystemResponsibleCreateFieldInput>;
  subSystems?: InputMaybe<Array<SystemSubSystemsCreateFieldInput>>;
  systemType?: InputMaybe<SystemSystemTypeCreateFieldInput>;
  zone?: InputMaybe<SystemZoneCreateFieldInput>;
};

export type SystemResponsibleAggregateInput = {
  AND?: InputMaybe<Array<SystemResponsibleAggregateInput>>;
  NOT?: InputMaybe<SystemResponsibleAggregateInput>;
  OR?: InputMaybe<Array<SystemResponsibleAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<SystemResponsibleNodeAggregationWhereInput>;
};

export type SystemResponsibleConnectFieldInput = {
  connect?: InputMaybe<EmployeeConnectInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<EmployeeConnectWhere>;
};

export type SystemResponsibleConnection = {
  __typename?: 'SystemResponsibleConnection';
  edges: Array<SystemResponsibleRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type SystemResponsibleConnectionSort = {
  node?: InputMaybe<EmployeeSort>;
};

export type SystemResponsibleConnectionWhere = {
  AND?: InputMaybe<Array<SystemResponsibleConnectionWhere>>;
  NOT?: InputMaybe<SystemResponsibleConnectionWhere>;
  OR?: InputMaybe<Array<SystemResponsibleConnectionWhere>>;
  node?: InputMaybe<EmployeeWhere>;
};

export type SystemResponsibleCreateFieldInput = {
  node: EmployeeCreateInput;
};

export type SystemResponsibleDeleteFieldInput = {
  delete?: InputMaybe<EmployeeDeleteInput>;
  where?: InputMaybe<SystemResponsibleConnectionWhere>;
};

export type SystemResponsibleDisconnectFieldInput = {
  disconnect?: InputMaybe<EmployeeDisconnectInput>;
  where?: InputMaybe<SystemResponsibleConnectionWhere>;
};

export type SystemResponsibleFieldInput = {
  connect?: InputMaybe<SystemResponsibleConnectFieldInput>;
  create?: InputMaybe<SystemResponsibleCreateFieldInput>;
};

export type SystemResponsibleNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<SystemResponsibleNodeAggregationWhereInput>>;
  NOT?: InputMaybe<SystemResponsibleNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<SystemResponsibleNodeAggregationWhereInput>>;
  email_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  email_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  email_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  email_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  email_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  email_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  email_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  email_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  email_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  firstName_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  firstName_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  firstName_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  firstName_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  firstName_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  firstName_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  firstName_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  firstName_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  firstName_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  firstName_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  firstName_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  firstName_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  firstName_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  firstName_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  firstName_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  fullName_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  fullName_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  fullName_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  fullName_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  fullName_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  fullName_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  fullName_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  fullName_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  fullName_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  fullName_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  fullName_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  fullName_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  fullName_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  fullName_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  fullName_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  lastName_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  lastName_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  lastName_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  lastName_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  lastName_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  lastName_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  lastName_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  lastName_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  lastName_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  lastName_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  lastName_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  lastName_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  lastName_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  lastName_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  lastName_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  phoneNumber_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  phoneNumber_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  phoneNumber_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  phoneNumber_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  phoneNumber_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type SystemResponsibleRelationship = {
  __typename?: 'SystemResponsibleRelationship';
  cursor: Scalars['String']['output'];
  node: Employee;
};

export type SystemResponsibleUpdateConnectionInput = {
  node?: InputMaybe<EmployeeUpdateInput>;
};

export type SystemResponsibleUpdateFieldInput = {
  connect?: InputMaybe<SystemResponsibleConnectFieldInput>;
  create?: InputMaybe<SystemResponsibleCreateFieldInput>;
  delete?: InputMaybe<SystemResponsibleDeleteFieldInput>;
  disconnect?: InputMaybe<SystemResponsibleDisconnectFieldInput>;
  update?: InputMaybe<SystemResponsibleUpdateConnectionInput>;
  where?: InputMaybe<SystemResponsibleConnectionWhere>;
};

/** Fields to sort Systems by. The order in which sorts are applied is not guaranteed when specifying many fields in one SystemSort object. */
export type SystemSort = {
  deleted?: InputMaybe<SortDirection>;
  description?: InputMaybe<SortDirection>;
  isTechnologicalUnit?: InputMaybe<SortDirection>;
  keySystem?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  systemAlias?: InputMaybe<SortDirection>;
  systemCode?: InputMaybe<SortDirection>;
  systemLevel?: InputMaybe<SortDirection>;
  uid?: InputMaybe<SortDirection>;
};

export type SystemSubSystemsAggregateInput = {
  AND?: InputMaybe<Array<SystemSubSystemsAggregateInput>>;
  NOT?: InputMaybe<SystemSubSystemsAggregateInput>;
  OR?: InputMaybe<Array<SystemSubSystemsAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<SystemSubSystemsNodeAggregationWhereInput>;
};

export type SystemSubSystemsConnectFieldInput = {
  connect?: InputMaybe<Array<SystemConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<SystemConnectWhere>;
};

export type SystemSubSystemsConnection = {
  __typename?: 'SystemSubSystemsConnection';
  edges: Array<SystemSubSystemsRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type SystemSubSystemsConnectionSort = {
  node?: InputMaybe<SystemSort>;
};

export type SystemSubSystemsConnectionWhere = {
  AND?: InputMaybe<Array<SystemSubSystemsConnectionWhere>>;
  NOT?: InputMaybe<SystemSubSystemsConnectionWhere>;
  OR?: InputMaybe<Array<SystemSubSystemsConnectionWhere>>;
  node?: InputMaybe<SystemWhere>;
};

export type SystemSubSystemsCreateFieldInput = {
  node: SystemCreateInput;
};

export type SystemSubSystemsDeleteFieldInput = {
  delete?: InputMaybe<SystemDeleteInput>;
  where?: InputMaybe<SystemSubSystemsConnectionWhere>;
};

export type SystemSubSystemsDisconnectFieldInput = {
  disconnect?: InputMaybe<SystemDisconnectInput>;
  where?: InputMaybe<SystemSubSystemsConnectionWhere>;
};

export type SystemSubSystemsFieldInput = {
  connect?: InputMaybe<Array<SystemSubSystemsConnectFieldInput>>;
  create?: InputMaybe<Array<SystemSubSystemsCreateFieldInput>>;
};

export type SystemSubSystemsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<SystemSubSystemsNodeAggregationWhereInput>>;
  NOT?: InputMaybe<SystemSubSystemsNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<SystemSubSystemsNodeAggregationWhereInput>>;
  description_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  description_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  description_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  description_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  description_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  description_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  description_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  description_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  description_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  description_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  description_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  systemAlias_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  systemAlias_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  systemAlias_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  systemAlias_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  systemAlias_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  systemAlias_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  systemAlias_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  systemAlias_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  systemAlias_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  systemAlias_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  systemAlias_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  systemAlias_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  systemAlias_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  systemAlias_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  systemAlias_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  systemCode_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  systemCode_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  systemCode_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  systemCode_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  systemCode_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  systemCode_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  systemCode_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  systemCode_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  systemCode_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  systemCode_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  systemCode_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  systemCode_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  systemCode_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  systemCode_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  systemCode_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type SystemSubSystemsRelationship = {
  __typename?: 'SystemSubSystemsRelationship';
  cursor: Scalars['String']['output'];
  node: System;
};

export type SystemSubSystemsUpdateConnectionInput = {
  node?: InputMaybe<SystemUpdateInput>;
};

export type SystemSubSystemsUpdateFieldInput = {
  connect?: InputMaybe<Array<SystemSubSystemsConnectFieldInput>>;
  create?: InputMaybe<Array<SystemSubSystemsCreateFieldInput>>;
  delete?: InputMaybe<Array<SystemSubSystemsDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<SystemSubSystemsDisconnectFieldInput>>;
  update?: InputMaybe<SystemSubSystemsUpdateConnectionInput>;
  where?: InputMaybe<SystemSubSystemsConnectionWhere>;
};

export type SystemSystemParentSystemAggregationSelection = {
  __typename?: 'SystemSystemParentSystemAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<SystemSystemParentSystemNodeAggregateSelection>;
};

export type SystemSystemParentSystemNodeAggregateSelection = {
  __typename?: 'SystemSystemParentSystemNodeAggregateSelection';
  description: StringAggregateSelectionNullable;
  name: StringAggregateSelectionNonNullable;
  systemAlias: StringAggregateSelectionNullable;
  systemCode: StringAggregateSelectionNullable;
  uid: IdAggregateSelectionNonNullable;
};

export type SystemSystemSubSystemsAggregationSelection = {
  __typename?: 'SystemSystemSubSystemsAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<SystemSystemSubSystemsNodeAggregateSelection>;
};

export type SystemSystemSubSystemsNodeAggregateSelection = {
  __typename?: 'SystemSystemSubSystemsNodeAggregateSelection';
  description: StringAggregateSelectionNullable;
  name: StringAggregateSelectionNonNullable;
  systemAlias: StringAggregateSelectionNullable;
  systemCode: StringAggregateSelectionNullable;
  uid: IdAggregateSelectionNonNullable;
};

export type SystemSystemTypeAggregateInput = {
  AND?: InputMaybe<Array<SystemSystemTypeAggregateInput>>;
  NOT?: InputMaybe<SystemSystemTypeAggregateInput>;
  OR?: InputMaybe<Array<SystemSystemTypeAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<SystemSystemTypeNodeAggregationWhereInput>;
};

export type SystemSystemTypeConnectFieldInput = {
  connect?: InputMaybe<SystemTypeConnectInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<SystemTypeConnectWhere>;
};

export type SystemSystemTypeConnection = {
  __typename?: 'SystemSystemTypeConnection';
  edges: Array<SystemSystemTypeRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type SystemSystemTypeConnectionSort = {
  node?: InputMaybe<SystemTypeSort>;
};

export type SystemSystemTypeConnectionWhere = {
  AND?: InputMaybe<Array<SystemSystemTypeConnectionWhere>>;
  NOT?: InputMaybe<SystemSystemTypeConnectionWhere>;
  OR?: InputMaybe<Array<SystemSystemTypeConnectionWhere>>;
  node?: InputMaybe<SystemTypeWhere>;
};

export type SystemSystemTypeCreateFieldInput = {
  node: SystemTypeCreateInput;
};

export type SystemSystemTypeDeleteFieldInput = {
  delete?: InputMaybe<SystemTypeDeleteInput>;
  where?: InputMaybe<SystemSystemTypeConnectionWhere>;
};

export type SystemSystemTypeDisconnectFieldInput = {
  disconnect?: InputMaybe<SystemTypeDisconnectInput>;
  where?: InputMaybe<SystemSystemTypeConnectionWhere>;
};

export type SystemSystemTypeFieldInput = {
  connect?: InputMaybe<SystemSystemTypeConnectFieldInput>;
  create?: InputMaybe<SystemSystemTypeCreateFieldInput>;
};

export type SystemSystemTypeNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<SystemSystemTypeNodeAggregationWhereInput>>;
  NOT?: InputMaybe<SystemSystemTypeNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<SystemSystemTypeNodeAggregationWhereInput>>;
  code_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  code_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  mask_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  mask_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  mask_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  mask_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  mask_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  mask_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  mask_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  mask_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  mask_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  mask_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  mask_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  mask_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  mask_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  mask_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  mask_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type SystemSystemTypeRelationship = {
  __typename?: 'SystemSystemTypeRelationship';
  cursor: Scalars['String']['output'];
  node: SystemType;
};

export type SystemSystemTypeSystemTypeAggregationSelection = {
  __typename?: 'SystemSystemTypeSystemTypeAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<SystemSystemTypeSystemTypeNodeAggregateSelection>;
};

export type SystemSystemTypeSystemTypeNodeAggregateSelection = {
  __typename?: 'SystemSystemTypeSystemTypeNodeAggregateSelection';
  code: StringAggregateSelectionNonNullable;
  mask: StringAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  uid: IdAggregateSelectionNonNullable;
};

export type SystemSystemTypeUpdateConnectionInput = {
  node?: InputMaybe<SystemTypeUpdateInput>;
};

export type SystemSystemTypeUpdateFieldInput = {
  connect?: InputMaybe<SystemSystemTypeConnectFieldInput>;
  create?: InputMaybe<SystemSystemTypeCreateFieldInput>;
  delete?: InputMaybe<SystemSystemTypeDeleteFieldInput>;
  disconnect?: InputMaybe<SystemSystemTypeDisconnectFieldInput>;
  update?: InputMaybe<SystemSystemTypeUpdateConnectionInput>;
  where?: InputMaybe<SystemSystemTypeConnectionWhere>;
};

export type SystemType = {
  __typename?: 'SystemType';
  code: Scalars['String']['output'];
  mask: Scalars['String']['output'];
  name: Scalars['String']['output'];
  systemTypeGroup: SystemTypeGroup;
  systemTypeGroupAggregate?: Maybe<SystemTypeSystemTypeGroupSystemTypeGroupAggregationSelection>;
  systemTypeGroupConnection: SystemTypeSystemTypeGroupConnection;
  uid: Scalars['ID']['output'];
};


export type SystemTypeSystemTypeGroupArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<SystemTypeGroupOptions>;
  where?: InputMaybe<SystemTypeGroupWhere>;
};


export type SystemTypeSystemTypeGroupAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<SystemTypeGroupWhere>;
};


export type SystemTypeSystemTypeGroupConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<SystemTypeSystemTypeGroupConnectionSort>>;
  where?: InputMaybe<SystemTypeSystemTypeGroupConnectionWhere>;
};

export type SystemTypeAggregateSelection = {
  __typename?: 'SystemTypeAggregateSelection';
  code: StringAggregateSelectionNonNullable;
  count: Scalars['Int']['output'];
  mask: StringAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  uid: IdAggregateSelectionNonNullable;
};

export type SystemTypeConnectInput = {
  systemTypeGroup?: InputMaybe<SystemTypeSystemTypeGroupConnectFieldInput>;
};

export type SystemTypeConnectWhere = {
  node: SystemTypeWhere;
};

export type SystemTypeCreateInput = {
  code: Scalars['String']['input'];
  mask: Scalars['String']['input'];
  name: Scalars['String']['input'];
  systemTypeGroup?: InputMaybe<SystemTypeSystemTypeGroupFieldInput>;
};

export type SystemTypeDeleteInput = {
  systemTypeGroup?: InputMaybe<SystemTypeSystemTypeGroupDeleteFieldInput>;
};

export type SystemTypeDisconnectInput = {
  systemTypeGroup?: InputMaybe<SystemTypeSystemTypeGroupDisconnectFieldInput>;
};

export type SystemTypeEdge = {
  __typename?: 'SystemTypeEdge';
  cursor: Scalars['String']['output'];
  node: SystemType;
};

export type SystemTypeGroup = {
  __typename?: 'SystemTypeGroup';
  facility: Facility;
  facilityAggregate?: Maybe<SystemTypeGroupFacilityFacilityAggregationSelection>;
  facilityConnection: SystemTypeGroupFacilityConnection;
  name: Scalars['String']['output'];
  systemTypes: Array<SystemType>;
  systemTypesAggregate?: Maybe<SystemTypeGroupSystemTypeSystemTypesAggregationSelection>;
  systemTypesConnection: SystemTypeGroupSystemTypesConnection;
  uid: Scalars['String']['output'];
};


export type SystemTypeGroupFacilityArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<FacilityOptions>;
  where?: InputMaybe<FacilityWhere>;
};


export type SystemTypeGroupFacilityAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<FacilityWhere>;
};


export type SystemTypeGroupFacilityConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<SystemTypeGroupFacilityConnectionSort>>;
  where?: InputMaybe<SystemTypeGroupFacilityConnectionWhere>;
};


export type SystemTypeGroupSystemTypesArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<SystemTypeOptions>;
  where?: InputMaybe<SystemTypeWhere>;
};


export type SystemTypeGroupSystemTypesAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<SystemTypeWhere>;
};


export type SystemTypeGroupSystemTypesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<SystemTypeGroupSystemTypesConnectionSort>>;
  where?: InputMaybe<SystemTypeGroupSystemTypesConnectionWhere>;
};

export type SystemTypeGroupAggregateSelection = {
  __typename?: 'SystemTypeGroupAggregateSelection';
  count: Scalars['Int']['output'];
  name: StringAggregateSelectionNonNullable;
  uid: StringAggregateSelectionNonNullable;
};

export type SystemTypeGroupConnectInput = {
  facility?: InputMaybe<SystemTypeGroupFacilityConnectFieldInput>;
  systemTypes?: InputMaybe<Array<SystemTypeGroupSystemTypesConnectFieldInput>>;
};

export type SystemTypeGroupConnectWhere = {
  node: SystemTypeGroupWhere;
};

export type SystemTypeGroupCreateInput = {
  facility?: InputMaybe<SystemTypeGroupFacilityFieldInput>;
  name: Scalars['String']['input'];
  systemTypes?: InputMaybe<SystemTypeGroupSystemTypesFieldInput>;
  uid: Scalars['String']['input'];
};

export type SystemTypeGroupDeleteInput = {
  facility?: InputMaybe<SystemTypeGroupFacilityDeleteFieldInput>;
  systemTypes?: InputMaybe<Array<SystemTypeGroupSystemTypesDeleteFieldInput>>;
};

export type SystemTypeGroupDisconnectInput = {
  facility?: InputMaybe<SystemTypeGroupFacilityDisconnectFieldInput>;
  systemTypes?: InputMaybe<Array<SystemTypeGroupSystemTypesDisconnectFieldInput>>;
};

export type SystemTypeGroupEdge = {
  __typename?: 'SystemTypeGroupEdge';
  cursor: Scalars['String']['output'];
  node: SystemTypeGroup;
};

export type SystemTypeGroupFacilityAggregateInput = {
  AND?: InputMaybe<Array<SystemTypeGroupFacilityAggregateInput>>;
  NOT?: InputMaybe<SystemTypeGroupFacilityAggregateInput>;
  OR?: InputMaybe<Array<SystemTypeGroupFacilityAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<SystemTypeGroupFacilityNodeAggregationWhereInput>;
};

export type SystemTypeGroupFacilityConnectFieldInput = {
  connect?: InputMaybe<FacilityConnectInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<FacilityConnectWhere>;
};

export type SystemTypeGroupFacilityConnection = {
  __typename?: 'SystemTypeGroupFacilityConnection';
  edges: Array<SystemTypeGroupFacilityRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type SystemTypeGroupFacilityConnectionSort = {
  node?: InputMaybe<FacilitySort>;
};

export type SystemTypeGroupFacilityConnectionWhere = {
  AND?: InputMaybe<Array<SystemTypeGroupFacilityConnectionWhere>>;
  NOT?: InputMaybe<SystemTypeGroupFacilityConnectionWhere>;
  OR?: InputMaybe<Array<SystemTypeGroupFacilityConnectionWhere>>;
  node?: InputMaybe<FacilityWhere>;
};

export type SystemTypeGroupFacilityCreateFieldInput = {
  node: FacilityCreateInput;
};

export type SystemTypeGroupFacilityDeleteFieldInput = {
  delete?: InputMaybe<FacilityDeleteInput>;
  where?: InputMaybe<SystemTypeGroupFacilityConnectionWhere>;
};

export type SystemTypeGroupFacilityDisconnectFieldInput = {
  disconnect?: InputMaybe<FacilityDisconnectInput>;
  where?: InputMaybe<SystemTypeGroupFacilityConnectionWhere>;
};

export type SystemTypeGroupFacilityFacilityAggregationSelection = {
  __typename?: 'SystemTypeGroupFacilityFacilityAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<SystemTypeGroupFacilityFacilityNodeAggregateSelection>;
};

export type SystemTypeGroupFacilityFacilityNodeAggregateSelection = {
  __typename?: 'SystemTypeGroupFacilityFacilityNodeAggregateSelection';
  code: StringAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  uid: StringAggregateSelectionNonNullable;
};

export type SystemTypeGroupFacilityFieldInput = {
  connect?: InputMaybe<SystemTypeGroupFacilityConnectFieldInput>;
  create?: InputMaybe<SystemTypeGroupFacilityCreateFieldInput>;
};

export type SystemTypeGroupFacilityNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<SystemTypeGroupFacilityNodeAggregationWhereInput>>;
  NOT?: InputMaybe<SystemTypeGroupFacilityNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<SystemTypeGroupFacilityNodeAggregationWhereInput>>;
  code_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  code_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  uid_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  uid_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  uid_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  uid_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  uid_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  uid_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  uid_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  uid_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  uid_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  uid_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type SystemTypeGroupFacilityRelationship = {
  __typename?: 'SystemTypeGroupFacilityRelationship';
  cursor: Scalars['String']['output'];
  node: Facility;
};

export type SystemTypeGroupFacilityUpdateConnectionInput = {
  node?: InputMaybe<FacilityUpdateInput>;
};

export type SystemTypeGroupFacilityUpdateFieldInput = {
  connect?: InputMaybe<SystemTypeGroupFacilityConnectFieldInput>;
  create?: InputMaybe<SystemTypeGroupFacilityCreateFieldInput>;
  delete?: InputMaybe<SystemTypeGroupFacilityDeleteFieldInput>;
  disconnect?: InputMaybe<SystemTypeGroupFacilityDisconnectFieldInput>;
  update?: InputMaybe<SystemTypeGroupFacilityUpdateConnectionInput>;
  where?: InputMaybe<SystemTypeGroupFacilityConnectionWhere>;
};

export type SystemTypeGroupOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /** Specify one or more SystemTypeGroupSort objects to sort SystemTypeGroups by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<SystemTypeGroupSort>>;
};

export type SystemTypeGroupRelationInput = {
  facility?: InputMaybe<SystemTypeGroupFacilityCreateFieldInput>;
  systemTypes?: InputMaybe<Array<SystemTypeGroupSystemTypesCreateFieldInput>>;
};

/** Fields to sort SystemTypeGroups by. The order in which sorts are applied is not guaranteed when specifying many fields in one SystemTypeGroupSort object. */
export type SystemTypeGroupSort = {
  name?: InputMaybe<SortDirection>;
  uid?: InputMaybe<SortDirection>;
};

export type SystemTypeGroupSystemTypeSystemTypesAggregationSelection = {
  __typename?: 'SystemTypeGroupSystemTypeSystemTypesAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<SystemTypeGroupSystemTypeSystemTypesNodeAggregateSelection>;
};

export type SystemTypeGroupSystemTypeSystemTypesNodeAggregateSelection = {
  __typename?: 'SystemTypeGroupSystemTypeSystemTypesNodeAggregateSelection';
  code: StringAggregateSelectionNonNullable;
  mask: StringAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  uid: IdAggregateSelectionNonNullable;
};

export type SystemTypeGroupSystemTypesAggregateInput = {
  AND?: InputMaybe<Array<SystemTypeGroupSystemTypesAggregateInput>>;
  NOT?: InputMaybe<SystemTypeGroupSystemTypesAggregateInput>;
  OR?: InputMaybe<Array<SystemTypeGroupSystemTypesAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<SystemTypeGroupSystemTypesNodeAggregationWhereInput>;
};

export type SystemTypeGroupSystemTypesConnectFieldInput = {
  connect?: InputMaybe<Array<SystemTypeConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<SystemTypeConnectWhere>;
};

export type SystemTypeGroupSystemTypesConnection = {
  __typename?: 'SystemTypeGroupSystemTypesConnection';
  edges: Array<SystemTypeGroupSystemTypesRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type SystemTypeGroupSystemTypesConnectionSort = {
  node?: InputMaybe<SystemTypeSort>;
};

export type SystemTypeGroupSystemTypesConnectionWhere = {
  AND?: InputMaybe<Array<SystemTypeGroupSystemTypesConnectionWhere>>;
  NOT?: InputMaybe<SystemTypeGroupSystemTypesConnectionWhere>;
  OR?: InputMaybe<Array<SystemTypeGroupSystemTypesConnectionWhere>>;
  node?: InputMaybe<SystemTypeWhere>;
};

export type SystemTypeGroupSystemTypesCreateFieldInput = {
  node: SystemTypeCreateInput;
};

export type SystemTypeGroupSystemTypesDeleteFieldInput = {
  delete?: InputMaybe<SystemTypeDeleteInput>;
  where?: InputMaybe<SystemTypeGroupSystemTypesConnectionWhere>;
};

export type SystemTypeGroupSystemTypesDisconnectFieldInput = {
  disconnect?: InputMaybe<SystemTypeDisconnectInput>;
  where?: InputMaybe<SystemTypeGroupSystemTypesConnectionWhere>;
};

export type SystemTypeGroupSystemTypesFieldInput = {
  connect?: InputMaybe<Array<SystemTypeGroupSystemTypesConnectFieldInput>>;
  create?: InputMaybe<Array<SystemTypeGroupSystemTypesCreateFieldInput>>;
};

export type SystemTypeGroupSystemTypesNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<SystemTypeGroupSystemTypesNodeAggregationWhereInput>>;
  NOT?: InputMaybe<SystemTypeGroupSystemTypesNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<SystemTypeGroupSystemTypesNodeAggregationWhereInput>>;
  code_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  code_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  mask_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  mask_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  mask_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  mask_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  mask_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  mask_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  mask_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  mask_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  mask_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  mask_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  mask_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  mask_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  mask_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  mask_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  mask_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type SystemTypeGroupSystemTypesRelationship = {
  __typename?: 'SystemTypeGroupSystemTypesRelationship';
  cursor: Scalars['String']['output'];
  node: SystemType;
};

export type SystemTypeGroupSystemTypesUpdateConnectionInput = {
  node?: InputMaybe<SystemTypeUpdateInput>;
};

export type SystemTypeGroupSystemTypesUpdateFieldInput = {
  connect?: InputMaybe<Array<SystemTypeGroupSystemTypesConnectFieldInput>>;
  create?: InputMaybe<Array<SystemTypeGroupSystemTypesCreateFieldInput>>;
  delete?: InputMaybe<Array<SystemTypeGroupSystemTypesDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<SystemTypeGroupSystemTypesDisconnectFieldInput>>;
  update?: InputMaybe<SystemTypeGroupSystemTypesUpdateConnectionInput>;
  where?: InputMaybe<SystemTypeGroupSystemTypesConnectionWhere>;
};

export type SystemTypeGroupUpdateInput = {
  facility?: InputMaybe<SystemTypeGroupFacilityUpdateFieldInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  systemTypes?: InputMaybe<Array<SystemTypeGroupSystemTypesUpdateFieldInput>>;
  uid?: InputMaybe<Scalars['String']['input']>;
};

export type SystemTypeGroupWhere = {
  AND?: InputMaybe<Array<SystemTypeGroupWhere>>;
  NOT?: InputMaybe<SystemTypeGroupWhere>;
  OR?: InputMaybe<Array<SystemTypeGroupWhere>>;
  facility?: InputMaybe<FacilityWhere>;
  facilityAggregate?: InputMaybe<SystemTypeGroupFacilityAggregateInput>;
  facilityConnection?: InputMaybe<SystemTypeGroupFacilityConnectionWhere>;
  facilityConnection_NOT?: InputMaybe<SystemTypeGroupFacilityConnectionWhere>;
  facility_NOT?: InputMaybe<FacilityWhere>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  systemTypesAggregate?: InputMaybe<SystemTypeGroupSystemTypesAggregateInput>;
  /** Return SystemTypeGroups where all of the related SystemTypeGroupSystemTypesConnections match this filter */
  systemTypesConnection_ALL?: InputMaybe<SystemTypeGroupSystemTypesConnectionWhere>;
  /** Return SystemTypeGroups where none of the related SystemTypeGroupSystemTypesConnections match this filter */
  systemTypesConnection_NONE?: InputMaybe<SystemTypeGroupSystemTypesConnectionWhere>;
  /** Return SystemTypeGroups where one of the related SystemTypeGroupSystemTypesConnections match this filter */
  systemTypesConnection_SINGLE?: InputMaybe<SystemTypeGroupSystemTypesConnectionWhere>;
  /** Return SystemTypeGroups where some of the related SystemTypeGroupSystemTypesConnections match this filter */
  systemTypesConnection_SOME?: InputMaybe<SystemTypeGroupSystemTypesConnectionWhere>;
  /** Return SystemTypeGroups where all of the related SystemTypes match this filter */
  systemTypes_ALL?: InputMaybe<SystemTypeWhere>;
  /** Return SystemTypeGroups where none of the related SystemTypes match this filter */
  systemTypes_NONE?: InputMaybe<SystemTypeWhere>;
  /** Return SystemTypeGroups where one of the related SystemTypes match this filter */
  systemTypes_SINGLE?: InputMaybe<SystemTypeWhere>;
  /** Return SystemTypeGroups where some of the related SystemTypes match this filter */
  systemTypes_SOME?: InputMaybe<SystemTypeWhere>;
  uid?: InputMaybe<Scalars['String']['input']>;
  uid_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  uid_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  uid_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  uid_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
};

export type SystemTypeGroupsConnection = {
  __typename?: 'SystemTypeGroupsConnection';
  edges: Array<SystemTypeGroupEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type SystemTypeOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /** Specify one or more SystemTypeSort objects to sort SystemTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<SystemTypeSort>>;
};

export type SystemTypeRelationInput = {
  systemTypeGroup?: InputMaybe<SystemTypeSystemTypeGroupCreateFieldInput>;
};

/** Fields to sort SystemTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one SystemTypeSort object. */
export type SystemTypeSort = {
  code?: InputMaybe<SortDirection>;
  mask?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  uid?: InputMaybe<SortDirection>;
};

export type SystemTypeSystemTypeGroupAggregateInput = {
  AND?: InputMaybe<Array<SystemTypeSystemTypeGroupAggregateInput>>;
  NOT?: InputMaybe<SystemTypeSystemTypeGroupAggregateInput>;
  OR?: InputMaybe<Array<SystemTypeSystemTypeGroupAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<SystemTypeSystemTypeGroupNodeAggregationWhereInput>;
};

export type SystemTypeSystemTypeGroupConnectFieldInput = {
  connect?: InputMaybe<SystemTypeGroupConnectInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<SystemTypeGroupConnectWhere>;
};

export type SystemTypeSystemTypeGroupConnection = {
  __typename?: 'SystemTypeSystemTypeGroupConnection';
  edges: Array<SystemTypeSystemTypeGroupRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type SystemTypeSystemTypeGroupConnectionSort = {
  node?: InputMaybe<SystemTypeGroupSort>;
};

export type SystemTypeSystemTypeGroupConnectionWhere = {
  AND?: InputMaybe<Array<SystemTypeSystemTypeGroupConnectionWhere>>;
  NOT?: InputMaybe<SystemTypeSystemTypeGroupConnectionWhere>;
  OR?: InputMaybe<Array<SystemTypeSystemTypeGroupConnectionWhere>>;
  node?: InputMaybe<SystemTypeGroupWhere>;
};

export type SystemTypeSystemTypeGroupCreateFieldInput = {
  node: SystemTypeGroupCreateInput;
};

export type SystemTypeSystemTypeGroupDeleteFieldInput = {
  delete?: InputMaybe<SystemTypeGroupDeleteInput>;
  where?: InputMaybe<SystemTypeSystemTypeGroupConnectionWhere>;
};

export type SystemTypeSystemTypeGroupDisconnectFieldInput = {
  disconnect?: InputMaybe<SystemTypeGroupDisconnectInput>;
  where?: InputMaybe<SystemTypeSystemTypeGroupConnectionWhere>;
};

export type SystemTypeSystemTypeGroupFieldInput = {
  connect?: InputMaybe<SystemTypeSystemTypeGroupConnectFieldInput>;
  create?: InputMaybe<SystemTypeSystemTypeGroupCreateFieldInput>;
};

export type SystemTypeSystemTypeGroupNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<SystemTypeSystemTypeGroupNodeAggregationWhereInput>>;
  NOT?: InputMaybe<SystemTypeSystemTypeGroupNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<SystemTypeSystemTypeGroupNodeAggregationWhereInput>>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  uid_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  uid_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  uid_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  uid_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  uid_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  uid_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  uid_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  uid_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  uid_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  uid_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type SystemTypeSystemTypeGroupRelationship = {
  __typename?: 'SystemTypeSystemTypeGroupRelationship';
  cursor: Scalars['String']['output'];
  node: SystemTypeGroup;
};

export type SystemTypeSystemTypeGroupSystemTypeGroupAggregationSelection = {
  __typename?: 'SystemTypeSystemTypeGroupSystemTypeGroupAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<SystemTypeSystemTypeGroupSystemTypeGroupNodeAggregateSelection>;
};

export type SystemTypeSystemTypeGroupSystemTypeGroupNodeAggregateSelection = {
  __typename?: 'SystemTypeSystemTypeGroupSystemTypeGroupNodeAggregateSelection';
  name: StringAggregateSelectionNonNullable;
  uid: StringAggregateSelectionNonNullable;
};

export type SystemTypeSystemTypeGroupUpdateConnectionInput = {
  node?: InputMaybe<SystemTypeGroupUpdateInput>;
};

export type SystemTypeSystemTypeGroupUpdateFieldInput = {
  connect?: InputMaybe<SystemTypeSystemTypeGroupConnectFieldInput>;
  create?: InputMaybe<SystemTypeSystemTypeGroupCreateFieldInput>;
  delete?: InputMaybe<SystemTypeSystemTypeGroupDeleteFieldInput>;
  disconnect?: InputMaybe<SystemTypeSystemTypeGroupDisconnectFieldInput>;
  update?: InputMaybe<SystemTypeSystemTypeGroupUpdateConnectionInput>;
  where?: InputMaybe<SystemTypeSystemTypeGroupConnectionWhere>;
};

export type SystemTypeUpdateInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  mask?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  systemTypeGroup?: InputMaybe<SystemTypeSystemTypeGroupUpdateFieldInput>;
};

export type SystemTypeWhere = {
  AND?: InputMaybe<Array<SystemTypeWhere>>;
  NOT?: InputMaybe<SystemTypeWhere>;
  OR?: InputMaybe<Array<SystemTypeWhere>>;
  code?: InputMaybe<Scalars['String']['input']>;
  code_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  code_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  code_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  code_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  mask?: InputMaybe<Scalars['String']['input']>;
  mask_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  mask_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  mask_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  mask_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  systemTypeGroup?: InputMaybe<SystemTypeGroupWhere>;
  systemTypeGroupAggregate?: InputMaybe<SystemTypeSystemTypeGroupAggregateInput>;
  systemTypeGroupConnection?: InputMaybe<SystemTypeSystemTypeGroupConnectionWhere>;
  systemTypeGroupConnection_NOT?: InputMaybe<SystemTypeSystemTypeGroupConnectionWhere>;
  systemTypeGroup_NOT?: InputMaybe<SystemTypeGroupWhere>;
  uid?: InputMaybe<Scalars['ID']['input']>;
  uid_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  uid_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  uid_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  uid_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
};

export type SystemTypesConnection = {
  __typename?: 'SystemTypesConnection';
  edges: Array<SystemTypeEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type SystemUpdateInput = {
  deleted?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  facility?: InputMaybe<SystemFacilityUpdateFieldInput>;
  isTechnologicalUnit?: InputMaybe<Scalars['Boolean']['input']>;
  location?: InputMaybe<SystemLocationUpdateFieldInput>;
  maintainedBy?: InputMaybe<Array<SystemMaintainedByUpdateFieldInput>>;
  name?: InputMaybe<Scalars['String']['input']>;
  operators?: InputMaybe<Array<SystemOperatorsUpdateFieldInput>>;
  owner?: InputMaybe<SystemOwnerUpdateFieldInput>;
  parentSystem?: InputMaybe<SystemParentSystemUpdateFieldInput>;
  physicalItem?: InputMaybe<SystemPhysicalItemUpdateFieldInput>;
  responsible?: InputMaybe<SystemResponsibleUpdateFieldInput>;
  subSystems?: InputMaybe<Array<SystemSubSystemsUpdateFieldInput>>;
  systemAlias?: InputMaybe<Scalars['String']['input']>;
  systemCode?: InputMaybe<Scalars['String']['input']>;
  systemLevel?: InputMaybe<SystemLevel>;
  systemType?: InputMaybe<SystemSystemTypeUpdateFieldInput>;
  zone?: InputMaybe<SystemZoneUpdateFieldInput>;
};

export type SystemWhere = {
  AND?: InputMaybe<Array<SystemWhere>>;
  NOT?: InputMaybe<SystemWhere>;
  OR?: InputMaybe<Array<SystemWhere>>;
  deleted?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  description_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  description_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  description_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  description_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  facility?: InputMaybe<FacilityWhere>;
  facilityAggregate?: InputMaybe<SystemFacilityAggregateInput>;
  facilityConnection?: InputMaybe<SystemFacilityConnectionWhere>;
  facilityConnection_NOT?: InputMaybe<SystemFacilityConnectionWhere>;
  facility_NOT?: InputMaybe<FacilityWhere>;
  isTechnologicalUnit?: InputMaybe<Scalars['Boolean']['input']>;
  location?: InputMaybe<LocationWhere>;
  locationAggregate?: InputMaybe<SystemLocationAggregateInput>;
  locationConnection?: InputMaybe<SystemLocationConnectionWhere>;
  locationConnection_NOT?: InputMaybe<SystemLocationConnectionWhere>;
  location_NOT?: InputMaybe<LocationWhere>;
  maintainedByAggregate?: InputMaybe<SystemMaintainedByAggregateInput>;
  /** Return Systems where all of the related SystemMaintainedByConnections match this filter */
  maintainedByConnection_ALL?: InputMaybe<SystemMaintainedByConnectionWhere>;
  /** Return Systems where none of the related SystemMaintainedByConnections match this filter */
  maintainedByConnection_NONE?: InputMaybe<SystemMaintainedByConnectionWhere>;
  /** Return Systems where one of the related SystemMaintainedByConnections match this filter */
  maintainedByConnection_SINGLE?: InputMaybe<SystemMaintainedByConnectionWhere>;
  /** Return Systems where some of the related SystemMaintainedByConnections match this filter */
  maintainedByConnection_SOME?: InputMaybe<SystemMaintainedByConnectionWhere>;
  /** Return Systems where all of the related Employees match this filter */
  maintainedBy_ALL?: InputMaybe<EmployeeWhere>;
  /** Return Systems where none of the related Employees match this filter */
  maintainedBy_NONE?: InputMaybe<EmployeeWhere>;
  /** Return Systems where one of the related Employees match this filter */
  maintainedBy_SINGLE?: InputMaybe<EmployeeWhere>;
  /** Return Systems where some of the related Employees match this filter */
  maintainedBy_SOME?: InputMaybe<EmployeeWhere>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  operatorsAggregate?: InputMaybe<SystemOperatorsAggregateInput>;
  /** Return Systems where all of the related SystemOperatorsConnections match this filter */
  operatorsConnection_ALL?: InputMaybe<SystemOperatorsConnectionWhere>;
  /** Return Systems where none of the related SystemOperatorsConnections match this filter */
  operatorsConnection_NONE?: InputMaybe<SystemOperatorsConnectionWhere>;
  /** Return Systems where one of the related SystemOperatorsConnections match this filter */
  operatorsConnection_SINGLE?: InputMaybe<SystemOperatorsConnectionWhere>;
  /** Return Systems where some of the related SystemOperatorsConnections match this filter */
  operatorsConnection_SOME?: InputMaybe<SystemOperatorsConnectionWhere>;
  /** Return Systems where all of the related Employees match this filter */
  operators_ALL?: InputMaybe<EmployeeWhere>;
  /** Return Systems where none of the related Employees match this filter */
  operators_NONE?: InputMaybe<EmployeeWhere>;
  /** Return Systems where one of the related Employees match this filter */
  operators_SINGLE?: InputMaybe<EmployeeWhere>;
  /** Return Systems where some of the related Employees match this filter */
  operators_SOME?: InputMaybe<EmployeeWhere>;
  owner?: InputMaybe<EmployeeWhere>;
  ownerAggregate?: InputMaybe<SystemOwnerAggregateInput>;
  ownerConnection?: InputMaybe<SystemOwnerConnectionWhere>;
  ownerConnection_NOT?: InputMaybe<SystemOwnerConnectionWhere>;
  owner_NOT?: InputMaybe<EmployeeWhere>;
  parentSystem?: InputMaybe<SystemWhere>;
  parentSystemAggregate?: InputMaybe<SystemParentSystemAggregateInput>;
  parentSystemConnection?: InputMaybe<SystemParentSystemConnectionWhere>;
  parentSystemConnection_NOT?: InputMaybe<SystemParentSystemConnectionWhere>;
  parentSystem_NOT?: InputMaybe<SystemWhere>;
  physicalItem?: InputMaybe<ItemWhere>;
  physicalItemAggregate?: InputMaybe<SystemPhysicalItemAggregateInput>;
  physicalItemConnection?: InputMaybe<SystemPhysicalItemConnectionWhere>;
  physicalItemConnection_NOT?: InputMaybe<SystemPhysicalItemConnectionWhere>;
  physicalItem_NOT?: InputMaybe<ItemWhere>;
  responsible?: InputMaybe<EmployeeWhere>;
  responsibleAggregate?: InputMaybe<SystemResponsibleAggregateInput>;
  responsibleConnection?: InputMaybe<SystemResponsibleConnectionWhere>;
  responsibleConnection_NOT?: InputMaybe<SystemResponsibleConnectionWhere>;
  responsible_NOT?: InputMaybe<EmployeeWhere>;
  subSystemsAggregate?: InputMaybe<SystemSubSystemsAggregateInput>;
  /** Return Systems where all of the related SystemSubSystemsConnections match this filter */
  subSystemsConnection_ALL?: InputMaybe<SystemSubSystemsConnectionWhere>;
  /** Return Systems where none of the related SystemSubSystemsConnections match this filter */
  subSystemsConnection_NONE?: InputMaybe<SystemSubSystemsConnectionWhere>;
  /** Return Systems where one of the related SystemSubSystemsConnections match this filter */
  subSystemsConnection_SINGLE?: InputMaybe<SystemSubSystemsConnectionWhere>;
  /** Return Systems where some of the related SystemSubSystemsConnections match this filter */
  subSystemsConnection_SOME?: InputMaybe<SystemSubSystemsConnectionWhere>;
  /** Return Systems where all of the related Systems match this filter */
  subSystems_ALL?: InputMaybe<SystemWhere>;
  /** Return Systems where none of the related Systems match this filter */
  subSystems_NONE?: InputMaybe<SystemWhere>;
  /** Return Systems where one of the related Systems match this filter */
  subSystems_SINGLE?: InputMaybe<SystemWhere>;
  /** Return Systems where some of the related Systems match this filter */
  subSystems_SOME?: InputMaybe<SystemWhere>;
  systemAlias?: InputMaybe<Scalars['String']['input']>;
  systemAlias_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  systemAlias_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  systemAlias_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  systemAlias_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  systemCode?: InputMaybe<Scalars['String']['input']>;
  systemCode_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  systemCode_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  systemCode_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  systemCode_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  systemLevel?: InputMaybe<SystemLevel>;
  systemLevel_IN?: InputMaybe<Array<InputMaybe<SystemLevel>>>;
  systemType?: InputMaybe<SystemTypeWhere>;
  systemTypeAggregate?: InputMaybe<SystemSystemTypeAggregateInput>;
  systemTypeConnection?: InputMaybe<SystemSystemTypeConnectionWhere>;
  systemTypeConnection_NOT?: InputMaybe<SystemSystemTypeConnectionWhere>;
  systemType_NOT?: InputMaybe<SystemTypeWhere>;
  uid?: InputMaybe<Scalars['ID']['input']>;
  uid_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  uid_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  uid_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  uid_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  zone?: InputMaybe<ZoneWhere>;
  zoneAggregate?: InputMaybe<SystemZoneAggregateInput>;
  zoneConnection?: InputMaybe<SystemZoneConnectionWhere>;
  zoneConnection_NOT?: InputMaybe<SystemZoneConnectionWhere>;
  zone_NOT?: InputMaybe<ZoneWhere>;
};

export type SystemZoneAggregateInput = {
  AND?: InputMaybe<Array<SystemZoneAggregateInput>>;
  NOT?: InputMaybe<SystemZoneAggregateInput>;
  OR?: InputMaybe<Array<SystemZoneAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<SystemZoneNodeAggregationWhereInput>;
};

export type SystemZoneConnectFieldInput = {
  connect?: InputMaybe<ZoneConnectInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<ZoneConnectWhere>;
};

export type SystemZoneConnection = {
  __typename?: 'SystemZoneConnection';
  edges: Array<SystemZoneRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type SystemZoneConnectionSort = {
  node?: InputMaybe<ZoneSort>;
};

export type SystemZoneConnectionWhere = {
  AND?: InputMaybe<Array<SystemZoneConnectionWhere>>;
  NOT?: InputMaybe<SystemZoneConnectionWhere>;
  OR?: InputMaybe<Array<SystemZoneConnectionWhere>>;
  node?: InputMaybe<ZoneWhere>;
};

export type SystemZoneCreateFieldInput = {
  node: ZoneCreateInput;
};

export type SystemZoneDeleteFieldInput = {
  delete?: InputMaybe<ZoneDeleteInput>;
  where?: InputMaybe<SystemZoneConnectionWhere>;
};

export type SystemZoneDisconnectFieldInput = {
  disconnect?: InputMaybe<ZoneDisconnectInput>;
  where?: InputMaybe<SystemZoneConnectionWhere>;
};

export type SystemZoneFieldInput = {
  connect?: InputMaybe<SystemZoneConnectFieldInput>;
  create?: InputMaybe<SystemZoneCreateFieldInput>;
};

export type SystemZoneNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<SystemZoneNodeAggregationWhereInput>>;
  NOT?: InputMaybe<SystemZoneNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<SystemZoneNodeAggregationWhereInput>>;
  code_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  code_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type SystemZoneRelationship = {
  __typename?: 'SystemZoneRelationship';
  cursor: Scalars['String']['output'];
  node: Zone;
};

export type SystemZoneUpdateConnectionInput = {
  node?: InputMaybe<ZoneUpdateInput>;
};

export type SystemZoneUpdateFieldInput = {
  connect?: InputMaybe<SystemZoneConnectFieldInput>;
  create?: InputMaybe<SystemZoneCreateFieldInput>;
  delete?: InputMaybe<SystemZoneDeleteFieldInput>;
  disconnect?: InputMaybe<SystemZoneDisconnectFieldInput>;
  update?: InputMaybe<SystemZoneUpdateConnectionInput>;
  where?: InputMaybe<SystemZoneConnectionWhere>;
};

export type SystemZoneZoneAggregationSelection = {
  __typename?: 'SystemZoneZoneAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<SystemZoneZoneNodeAggregateSelection>;
};

export type SystemZoneZoneNodeAggregateSelection = {
  __typename?: 'SystemZoneZoneNodeAggregateSelection';
  code: StringAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  uid: IdAggregateSelectionNonNullable;
};

export type SystemsConnection = {
  __typename?: 'SystemsConnection';
  edges: Array<SystemEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Team = {
  __typename?: 'Team';
  name: Scalars['String']['output'];
  uid: Scalars['ID']['output'];
};

export type TeamAggregateSelection = {
  __typename?: 'TeamAggregateSelection';
  count: Scalars['Int']['output'];
  name: StringAggregateSelectionNonNullable;
  uid: IdAggregateSelectionNonNullable;
};

export type TeamConnectWhere = {
  node: TeamWhere;
};

export type TeamCreateInput = {
  name: Scalars['String']['input'];
};

export type TeamEdge = {
  __typename?: 'TeamEdge';
  cursor: Scalars['String']['output'];
  node: Team;
};

export type TeamOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /** Specify one or more TeamSort objects to sort Teams by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<TeamSort>>;
};

/** Fields to sort Teams by. The order in which sorts are applied is not guaranteed when specifying many fields in one TeamSort object. */
export type TeamSort = {
  name?: InputMaybe<SortDirection>;
  uid?: InputMaybe<SortDirection>;
};

export type TeamUpdateInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type TeamWhere = {
  AND?: InputMaybe<Array<TeamWhere>>;
  NOT?: InputMaybe<TeamWhere>;
  OR?: InputMaybe<Array<TeamWhere>>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  uid?: InputMaybe<Scalars['ID']['input']>;
  uid_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  uid_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  uid_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  uid_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
};

export type TeamsConnection = {
  __typename?: 'TeamsConnection';
  edges: Array<TeamEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Unit = {
  __typename?: 'Unit';
  code: Scalars['String']['output'];
  name: Scalars['String']['output'];
  uid: Scalars['ID']['output'];
};

export type UnitAggregateSelection = {
  __typename?: 'UnitAggregateSelection';
  code: StringAggregateSelectionNonNullable;
  count: Scalars['Int']['output'];
  name: StringAggregateSelectionNonNullable;
  uid: IdAggregateSelectionNonNullable;
};

export type UnitConnectWhere = {
  node: UnitWhere;
};

export type UnitCreateInput = {
  code: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type UnitEdge = {
  __typename?: 'UnitEdge';
  cursor: Scalars['String']['output'];
  node: Unit;
};

export type UnitOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /** Specify one or more UnitSort objects to sort Units by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<UnitSort>>;
};

/** Fields to sort Units by. The order in which sorts are applied is not guaranteed when specifying many fields in one UnitSort object. */
export type UnitSort = {
  code?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  uid?: InputMaybe<SortDirection>;
};

export type UnitUpdateInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UnitWhere = {
  AND?: InputMaybe<Array<UnitWhere>>;
  NOT?: InputMaybe<UnitWhere>;
  OR?: InputMaybe<Array<UnitWhere>>;
  code?: InputMaybe<Scalars['String']['input']>;
  code_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  code_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  code_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  code_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  uid?: InputMaybe<Scalars['ID']['input']>;
  uid_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  uid_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  uid_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  uid_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
};

export type UnitsConnection = {
  __typename?: 'UnitsConnection';
  edges: Array<UnitEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type UpdateCatalogueCategoriesMutationResponse = {
  __typename?: 'UpdateCatalogueCategoriesMutationResponse';
  catalogueCategories: Array<CatalogueCategory>;
  info: UpdateInfo;
};

export type UpdateCatalogueCategoryPropertiesMutationResponse = {
  __typename?: 'UpdateCatalogueCategoryPropertiesMutationResponse';
  catalogueCategoryProperties: Array<CatalogueCategoryProperty>;
  info: UpdateInfo;
};

export type UpdateCatalogueCategoryPropertyGroupsMutationResponse = {
  __typename?: 'UpdateCatalogueCategoryPropertyGroupsMutationResponse';
  catalogueCategoryPropertyGroups: Array<CatalogueCategoryPropertyGroup>;
  info: UpdateInfo;
};

export type UpdateCatalogueCategoryPropertyTypesMutationResponse = {
  __typename?: 'UpdateCatalogueCategoryPropertyTypesMutationResponse';
  catalogueCategoryPropertyTypes: Array<CatalogueCategoryPropertyType>;
  info: UpdateInfo;
};

export type UpdateCatalogueItemsMutationResponse = {
  __typename?: 'UpdateCatalogueItemsMutationResponse';
  catalogueItems: Array<CatalogueItem>;
  info: UpdateInfo;
};

export type UpdateContactPersonRolesMutationResponse = {
  __typename?: 'UpdateContactPersonRolesMutationResponse';
  contactPersonRoles: Array<ContactPersonRole>;
  info: UpdateInfo;
};

export type UpdateEmployeesMutationResponse = {
  __typename?: 'UpdateEmployeesMutationResponse';
  employees: Array<Employee>;
  info: UpdateInfo;
};

export type UpdateFacilitiesMutationResponse = {
  __typename?: 'UpdateFacilitiesMutationResponse';
  facilities: Array<Facility>;
  info: UpdateInfo;
};

export type UpdateHallContactPeopleMutationResponse = {
  __typename?: 'UpdateHallContactPeopleMutationResponse';
  hallContactPeople: Array<HallContactPerson>;
  info: UpdateInfo;
};

/** Information about the number of nodes and relationships created and deleted during an update mutation */
export type UpdateInfo = {
  __typename?: 'UpdateInfo';
  /** @deprecated This field has been deprecated because bookmarks are now handled by the driver. */
  bookmark?: Maybe<Scalars['String']['output']>;
  nodesCreated: Scalars['Int']['output'];
  nodesDeleted: Scalars['Int']['output'];
  relationshipsCreated: Scalars['Int']['output'];
  relationshipsDeleted: Scalars['Int']['output'];
};

export type UpdateItemConditionsMutationResponse = {
  __typename?: 'UpdateItemConditionsMutationResponse';
  info: UpdateInfo;
  itemConditions: Array<ItemCondition>;
};

export type UpdateItemUsagesMutationResponse = {
  __typename?: 'UpdateItemUsagesMutationResponse';
  info: UpdateInfo;
  itemUsages: Array<ItemUsage>;
};

export type UpdateItemsMutationResponse = {
  __typename?: 'UpdateItemsMutationResponse';
  info: UpdateInfo;
  items: Array<Item>;
};

export type UpdateLocationsMutationResponse = {
  __typename?: 'UpdateLocationsMutationResponse';
  info: UpdateInfo;
  locations: Array<Location>;
};

export type UpdateOrdersMutationResponse = {
  __typename?: 'UpdateOrdersMutationResponse';
  info: UpdateInfo;
  orders: Array<Order>;
};

export type UpdateParentPathItemsMutationResponse = {
  __typename?: 'UpdateParentPathItemsMutationResponse';
  info: UpdateInfo;
  parentPathItems: Array<ParentPathItem>;
};

export type UpdateRolesMutationResponse = {
  __typename?: 'UpdateRolesMutationResponse';
  info: UpdateInfo;
  roles: Array<Role>;
};

export type UpdateRoomCardsMutationResponse = {
  __typename?: 'UpdateRoomCardsMutationResponse';
  info: UpdateInfo;
  roomCards: Array<RoomCard>;
};

export type UpdateSchemaMigrationsMutationResponse = {
  __typename?: 'UpdateSchemaMigrationsMutationResponse';
  info: UpdateInfo;
  schemaMigrations: Array<SchemaMigration>;
};

export type UpdateSuppliersMutationResponse = {
  __typename?: 'UpdateSuppliersMutationResponse';
  info: UpdateInfo;
  suppliers: Array<Supplier>;
};

export type UpdateSystemCriticalitiesMutationResponse = {
  __typename?: 'UpdateSystemCriticalitiesMutationResponse';
  info: UpdateInfo;
  systemCriticalities: Array<SystemCriticality>;
};

export type UpdateSystemImportancesMutationResponse = {
  __typename?: 'UpdateSystemImportancesMutationResponse';
  info: UpdateInfo;
  systemImportances: Array<SystemImportance>;
};

export type UpdateSystemTypeGroupsMutationResponse = {
  __typename?: 'UpdateSystemTypeGroupsMutationResponse';
  info: UpdateInfo;
  systemTypeGroups: Array<SystemTypeGroup>;
};

export type UpdateSystemTypesMutationResponse = {
  __typename?: 'UpdateSystemTypesMutationResponse';
  info: UpdateInfo;
  systemTypes: Array<SystemType>;
};

export type UpdateSystemsMutationResponse = {
  __typename?: 'UpdateSystemsMutationResponse';
  info: UpdateInfo;
  systems: Array<System>;
};

export type UpdateTeamsMutationResponse = {
  __typename?: 'UpdateTeamsMutationResponse';
  info: UpdateInfo;
  teams: Array<Team>;
};

export type UpdateUnitsMutationResponse = {
  __typename?: 'UpdateUnitsMutationResponse';
  info: UpdateInfo;
  units: Array<Unit>;
};

export type UpdateUsersMutationResponse = {
  __typename?: 'UpdateUsersMutationResponse';
  info: UpdateInfo;
  users: Array<User>;
};

export type UpdateZonesMutationResponse = {
  __typename?: 'UpdateZonesMutationResponse';
  info: UpdateInfo;
  zones: Array<Zone>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  employee?: Maybe<Employee>;
  employeeAggregate?: Maybe<UserEmployeeEmployeeAggregationSelection>;
  employeeConnection: UserEmployeeConnection;
  facility?: Maybe<Facility>;
  facilityAggregate?: Maybe<UserFacilityFacilityAggregationSelection>;
  facilityConnection: UserFacilityConnection;
  firstName: Scalars['String']['output'];
  isEnabled: Scalars['Boolean']['output'];
  lastName: Scalars['String']['output'];
  passwordHash: Scalars['String']['output'];
  passwordToChange?: Maybe<Scalars['Boolean']['output']>;
  roles: Array<Role>;
  rolesAggregate?: Maybe<UserRoleRolesAggregationSelection>;
  rolesConnection: UserRolesConnection;
  uid: Scalars['ID']['output'];
  username: Scalars['String']['output'];
};


export type UserEmployeeArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<EmployeeOptions>;
  where?: InputMaybe<EmployeeWhere>;
};


export type UserEmployeeAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<EmployeeWhere>;
};


export type UserEmployeeConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<UserEmployeeConnectionSort>>;
  where?: InputMaybe<UserEmployeeConnectionWhere>;
};


export type UserFacilityArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<FacilityOptions>;
  where?: InputMaybe<FacilityWhere>;
};


export type UserFacilityAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<FacilityWhere>;
};


export type UserFacilityConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<UserFacilityConnectionSort>>;
  where?: InputMaybe<UserFacilityConnectionWhere>;
};


export type UserRolesArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<RoleOptions>;
  where?: InputMaybe<RoleWhere>;
};


export type UserRolesAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<RoleWhere>;
};


export type UserRolesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<UserRolesConnectionSort>>;
  where?: InputMaybe<UserRolesConnectionWhere>;
};

export type UserAggregateSelection = {
  __typename?: 'UserAggregateSelection';
  count: Scalars['Int']['output'];
  email: StringAggregateSelectionNonNullable;
  firstName: StringAggregateSelectionNonNullable;
  lastName: StringAggregateSelectionNonNullable;
  passwordHash: StringAggregateSelectionNonNullable;
  uid: IdAggregateSelectionNonNullable;
  username: StringAggregateSelectionNonNullable;
};

export type UserConnectInput = {
  employee?: InputMaybe<UserEmployeeConnectFieldInput>;
  facility?: InputMaybe<UserFacilityConnectFieldInput>;
  roles?: InputMaybe<Array<UserRolesConnectFieldInput>>;
};

export type UserConnectWhere = {
  node: UserWhere;
};

export type UserCreateInput = {
  email: Scalars['String']['input'];
  employee?: InputMaybe<UserEmployeeFieldInput>;
  facility?: InputMaybe<UserFacilityFieldInput>;
  firstName: Scalars['String']['input'];
  isEnabled: Scalars['Boolean']['input'];
  lastName: Scalars['String']['input'];
  passwordHash: Scalars['String']['input'];
  passwordToChange?: InputMaybe<Scalars['Boolean']['input']>;
  roles?: InputMaybe<UserRolesFieldInput>;
  username: Scalars['String']['input'];
};

export type UserDeleteInput = {
  employee?: InputMaybe<UserEmployeeDeleteFieldInput>;
  facility?: InputMaybe<UserFacilityDeleteFieldInput>;
  roles?: InputMaybe<Array<UserRolesDeleteFieldInput>>;
};

export type UserDisconnectInput = {
  employee?: InputMaybe<UserEmployeeDisconnectFieldInput>;
  facility?: InputMaybe<UserFacilityDisconnectFieldInput>;
  roles?: InputMaybe<Array<UserRolesDisconnectFieldInput>>;
};

export type UserEdge = {
  __typename?: 'UserEdge';
  cursor: Scalars['String']['output'];
  node: User;
};

export type UserEmployeeAggregateInput = {
  AND?: InputMaybe<Array<UserEmployeeAggregateInput>>;
  NOT?: InputMaybe<UserEmployeeAggregateInput>;
  OR?: InputMaybe<Array<UserEmployeeAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<UserEmployeeNodeAggregationWhereInput>;
};

export type UserEmployeeConnectFieldInput = {
  connect?: InputMaybe<EmployeeConnectInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<EmployeeConnectWhere>;
};

export type UserEmployeeConnection = {
  __typename?: 'UserEmployeeConnection';
  edges: Array<UserEmployeeRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type UserEmployeeConnectionSort = {
  node?: InputMaybe<EmployeeSort>;
};

export type UserEmployeeConnectionWhere = {
  AND?: InputMaybe<Array<UserEmployeeConnectionWhere>>;
  NOT?: InputMaybe<UserEmployeeConnectionWhere>;
  OR?: InputMaybe<Array<UserEmployeeConnectionWhere>>;
  node?: InputMaybe<EmployeeWhere>;
};

export type UserEmployeeCreateFieldInput = {
  node: EmployeeCreateInput;
};

export type UserEmployeeDeleteFieldInput = {
  delete?: InputMaybe<EmployeeDeleteInput>;
  where?: InputMaybe<UserEmployeeConnectionWhere>;
};

export type UserEmployeeDisconnectFieldInput = {
  disconnect?: InputMaybe<EmployeeDisconnectInput>;
  where?: InputMaybe<UserEmployeeConnectionWhere>;
};

export type UserEmployeeEmployeeAggregationSelection = {
  __typename?: 'UserEmployeeEmployeeAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<UserEmployeeEmployeeNodeAggregateSelection>;
};

export type UserEmployeeEmployeeNodeAggregateSelection = {
  __typename?: 'UserEmployeeEmployeeNodeAggregateSelection';
  email: StringAggregateSelectionNullable;
  firstName: StringAggregateSelectionNonNullable;
  fullName: StringAggregateSelectionNullable;
  lastName: StringAggregateSelectionNonNullable;
  phoneNumber: StringAggregateSelectionNullable;
  uid: IdAggregateSelectionNonNullable;
};

export type UserEmployeeFieldInput = {
  connect?: InputMaybe<UserEmployeeConnectFieldInput>;
  create?: InputMaybe<UserEmployeeCreateFieldInput>;
};

export type UserEmployeeNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<UserEmployeeNodeAggregationWhereInput>>;
  NOT?: InputMaybe<UserEmployeeNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<UserEmployeeNodeAggregationWhereInput>>;
  email_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  email_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  email_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  email_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  email_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  email_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  email_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  email_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  email_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  email_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  email_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  firstName_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  firstName_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  firstName_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  firstName_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  firstName_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  firstName_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  firstName_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  firstName_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  firstName_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  firstName_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  firstName_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  firstName_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  firstName_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  firstName_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  firstName_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  fullName_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  fullName_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  fullName_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  fullName_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  fullName_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  fullName_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  fullName_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  fullName_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  fullName_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  fullName_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  fullName_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  fullName_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  fullName_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  fullName_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  fullName_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  lastName_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  lastName_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  lastName_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  lastName_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  lastName_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  lastName_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  lastName_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  lastName_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  lastName_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  lastName_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  lastName_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  lastName_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  lastName_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  lastName_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  lastName_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  phoneNumber_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  phoneNumber_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  phoneNumber_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  phoneNumber_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  phoneNumber_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type UserEmployeeRelationship = {
  __typename?: 'UserEmployeeRelationship';
  cursor: Scalars['String']['output'];
  node: Employee;
};

export type UserEmployeeUpdateConnectionInput = {
  node?: InputMaybe<EmployeeUpdateInput>;
};

export type UserEmployeeUpdateFieldInput = {
  connect?: InputMaybe<UserEmployeeConnectFieldInput>;
  create?: InputMaybe<UserEmployeeCreateFieldInput>;
  delete?: InputMaybe<UserEmployeeDeleteFieldInput>;
  disconnect?: InputMaybe<UserEmployeeDisconnectFieldInput>;
  update?: InputMaybe<UserEmployeeUpdateConnectionInput>;
  where?: InputMaybe<UserEmployeeConnectionWhere>;
};

export type UserFacilityAggregateInput = {
  AND?: InputMaybe<Array<UserFacilityAggregateInput>>;
  NOT?: InputMaybe<UserFacilityAggregateInput>;
  OR?: InputMaybe<Array<UserFacilityAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<UserFacilityNodeAggregationWhereInput>;
};

export type UserFacilityConnectFieldInput = {
  connect?: InputMaybe<FacilityConnectInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<FacilityConnectWhere>;
};

export type UserFacilityConnection = {
  __typename?: 'UserFacilityConnection';
  edges: Array<UserFacilityRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type UserFacilityConnectionSort = {
  node?: InputMaybe<FacilitySort>;
};

export type UserFacilityConnectionWhere = {
  AND?: InputMaybe<Array<UserFacilityConnectionWhere>>;
  NOT?: InputMaybe<UserFacilityConnectionWhere>;
  OR?: InputMaybe<Array<UserFacilityConnectionWhere>>;
  node?: InputMaybe<FacilityWhere>;
};

export type UserFacilityCreateFieldInput = {
  node: FacilityCreateInput;
};

export type UserFacilityDeleteFieldInput = {
  delete?: InputMaybe<FacilityDeleteInput>;
  where?: InputMaybe<UserFacilityConnectionWhere>;
};

export type UserFacilityDisconnectFieldInput = {
  disconnect?: InputMaybe<FacilityDisconnectInput>;
  where?: InputMaybe<UserFacilityConnectionWhere>;
};

export type UserFacilityFacilityAggregationSelection = {
  __typename?: 'UserFacilityFacilityAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<UserFacilityFacilityNodeAggregateSelection>;
};

export type UserFacilityFacilityNodeAggregateSelection = {
  __typename?: 'UserFacilityFacilityNodeAggregateSelection';
  code: StringAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  uid: StringAggregateSelectionNonNullable;
};

export type UserFacilityFieldInput = {
  connect?: InputMaybe<UserFacilityConnectFieldInput>;
  create?: InputMaybe<UserFacilityCreateFieldInput>;
};

export type UserFacilityNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<UserFacilityNodeAggregationWhereInput>>;
  NOT?: InputMaybe<UserFacilityNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<UserFacilityNodeAggregationWhereInput>>;
  code_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  code_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  uid_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  uid_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  uid_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  uid_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  uid_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  uid_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  uid_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  uid_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  uid_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  uid_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type UserFacilityRelationship = {
  __typename?: 'UserFacilityRelationship';
  cursor: Scalars['String']['output'];
  node: Facility;
};

export type UserFacilityUpdateConnectionInput = {
  node?: InputMaybe<FacilityUpdateInput>;
};

export type UserFacilityUpdateFieldInput = {
  connect?: InputMaybe<UserFacilityConnectFieldInput>;
  create?: InputMaybe<UserFacilityCreateFieldInput>;
  delete?: InputMaybe<UserFacilityDeleteFieldInput>;
  disconnect?: InputMaybe<UserFacilityDisconnectFieldInput>;
  update?: InputMaybe<UserFacilityUpdateConnectionInput>;
  where?: InputMaybe<UserFacilityConnectionWhere>;
};

export type UserOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /** Specify one or more UserSort objects to sort Users by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<UserSort>>;
};

export type UserRelationInput = {
  employee?: InputMaybe<UserEmployeeCreateFieldInput>;
  facility?: InputMaybe<UserFacilityCreateFieldInput>;
  roles?: InputMaybe<Array<UserRolesCreateFieldInput>>;
};

export type UserRoleRolesAggregationSelection = {
  __typename?: 'UserRoleRolesAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<UserRoleRolesNodeAggregateSelection>;
};

export type UserRoleRolesNodeAggregateSelection = {
  __typename?: 'UserRoleRolesNodeAggregateSelection';
  code: StringAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  uid: IdAggregateSelectionNonNullable;
};

export type UserRolesAggregateInput = {
  AND?: InputMaybe<Array<UserRolesAggregateInput>>;
  NOT?: InputMaybe<UserRolesAggregateInput>;
  OR?: InputMaybe<Array<UserRolesAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<UserRolesNodeAggregationWhereInput>;
};

export type UserRolesConnectFieldInput = {
  connect?: InputMaybe<Array<RoleConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<RoleConnectWhere>;
};

export type UserRolesConnection = {
  __typename?: 'UserRolesConnection';
  edges: Array<UserRolesRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type UserRolesConnectionSort = {
  node?: InputMaybe<RoleSort>;
};

export type UserRolesConnectionWhere = {
  AND?: InputMaybe<Array<UserRolesConnectionWhere>>;
  NOT?: InputMaybe<UserRolesConnectionWhere>;
  OR?: InputMaybe<Array<UserRolesConnectionWhere>>;
  node?: InputMaybe<RoleWhere>;
};

export type UserRolesCreateFieldInput = {
  node: RoleCreateInput;
};

export type UserRolesDeleteFieldInput = {
  delete?: InputMaybe<RoleDeleteInput>;
  where?: InputMaybe<UserRolesConnectionWhere>;
};

export type UserRolesDisconnectFieldInput = {
  disconnect?: InputMaybe<RoleDisconnectInput>;
  where?: InputMaybe<UserRolesConnectionWhere>;
};

export type UserRolesFieldInput = {
  connect?: InputMaybe<Array<UserRolesConnectFieldInput>>;
  create?: InputMaybe<Array<UserRolesCreateFieldInput>>;
};

export type UserRolesNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<UserRolesNodeAggregationWhereInput>>;
  NOT?: InputMaybe<UserRolesNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<UserRolesNodeAggregationWhereInput>>;
  code_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  code_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type UserRolesRelationship = {
  __typename?: 'UserRolesRelationship';
  cursor: Scalars['String']['output'];
  node: Role;
};

export type UserRolesUpdateConnectionInput = {
  node?: InputMaybe<RoleUpdateInput>;
};

export type UserRolesUpdateFieldInput = {
  connect?: InputMaybe<Array<UserRolesConnectFieldInput>>;
  create?: InputMaybe<Array<UserRolesCreateFieldInput>>;
  delete?: InputMaybe<Array<UserRolesDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<UserRolesDisconnectFieldInput>>;
  update?: InputMaybe<UserRolesUpdateConnectionInput>;
  where?: InputMaybe<UserRolesConnectionWhere>;
};

/** Fields to sort Users by. The order in which sorts are applied is not guaranteed when specifying many fields in one UserSort object. */
export type UserSort = {
  email?: InputMaybe<SortDirection>;
  firstName?: InputMaybe<SortDirection>;
  isEnabled?: InputMaybe<SortDirection>;
  lastName?: InputMaybe<SortDirection>;
  passwordHash?: InputMaybe<SortDirection>;
  passwordToChange?: InputMaybe<SortDirection>;
  uid?: InputMaybe<SortDirection>;
  username?: InputMaybe<SortDirection>;
};

export type UserUpdateInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  employee?: InputMaybe<UserEmployeeUpdateFieldInput>;
  facility?: InputMaybe<UserFacilityUpdateFieldInput>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  isEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  passwordHash?: InputMaybe<Scalars['String']['input']>;
  passwordToChange?: InputMaybe<Scalars['Boolean']['input']>;
  roles?: InputMaybe<Array<UserRolesUpdateFieldInput>>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UserWhere = {
  AND?: InputMaybe<Array<UserWhere>>;
  NOT?: InputMaybe<UserWhere>;
  OR?: InputMaybe<Array<UserWhere>>;
  email?: InputMaybe<Scalars['String']['input']>;
  email_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  email_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  email_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  email_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  employee?: InputMaybe<EmployeeWhere>;
  employeeAggregate?: InputMaybe<UserEmployeeAggregateInput>;
  employeeConnection?: InputMaybe<UserEmployeeConnectionWhere>;
  employeeConnection_NOT?: InputMaybe<UserEmployeeConnectionWhere>;
  employee_NOT?: InputMaybe<EmployeeWhere>;
  facility?: InputMaybe<FacilityWhere>;
  facilityAggregate?: InputMaybe<UserFacilityAggregateInput>;
  facilityConnection?: InputMaybe<UserFacilityConnectionWhere>;
  facilityConnection_NOT?: InputMaybe<UserFacilityConnectionWhere>;
  facility_NOT?: InputMaybe<FacilityWhere>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  firstName_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  firstName_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  firstName_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  firstName_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  isEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  lastName_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  lastName_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  lastName_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  lastName_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  passwordHash?: InputMaybe<Scalars['String']['input']>;
  passwordHash_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  passwordHash_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  passwordHash_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  passwordHash_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  passwordToChange?: InputMaybe<Scalars['Boolean']['input']>;
  rolesAggregate?: InputMaybe<UserRolesAggregateInput>;
  /** Return Users where all of the related UserRolesConnections match this filter */
  rolesConnection_ALL?: InputMaybe<UserRolesConnectionWhere>;
  /** Return Users where none of the related UserRolesConnections match this filter */
  rolesConnection_NONE?: InputMaybe<UserRolesConnectionWhere>;
  /** Return Users where one of the related UserRolesConnections match this filter */
  rolesConnection_SINGLE?: InputMaybe<UserRolesConnectionWhere>;
  /** Return Users where some of the related UserRolesConnections match this filter */
  rolesConnection_SOME?: InputMaybe<UserRolesConnectionWhere>;
  /** Return Users where all of the related Roles match this filter */
  roles_ALL?: InputMaybe<RoleWhere>;
  /** Return Users where none of the related Roles match this filter */
  roles_NONE?: InputMaybe<RoleWhere>;
  /** Return Users where one of the related Roles match this filter */
  roles_SINGLE?: InputMaybe<RoleWhere>;
  /** Return Users where some of the related Roles match this filter */
  roles_SOME?: InputMaybe<RoleWhere>;
  uid?: InputMaybe<Scalars['ID']['input']>;
  uid_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  uid_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  uid_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  uid_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  username_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  username_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  username_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  username_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
};

export type UsersConnection = {
  __typename?: 'UsersConnection';
  edges: Array<UserEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Zone = {
  __typename?: 'Zone';
  code: Scalars['String']['output'];
  facilitiesHasZone: Array<Facility>;
  facilitiesHasZoneAggregate?: Maybe<ZoneFacilityFacilitiesHasZoneAggregationSelection>;
  facilitiesHasZoneConnection: ZoneFacilitiesHasZoneConnection;
  hasSubzoneZones: Array<Zone>;
  hasSubzoneZonesAggregate?: Maybe<ZoneZoneHasSubzoneZonesAggregationSelection>;
  hasSubzoneZonesConnection: ZoneHasSubzoneZonesConnection;
  name: Scalars['String']['output'];
  uid: Scalars['ID']['output'];
  zonesHasSubzone: Array<Zone>;
  zonesHasSubzoneAggregate?: Maybe<ZoneZoneZonesHasSubzoneAggregationSelection>;
  zonesHasSubzoneConnection: ZoneZonesHasSubzoneConnection;
};


export type ZoneFacilitiesHasZoneArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<FacilityOptions>;
  where?: InputMaybe<FacilityWhere>;
};


export type ZoneFacilitiesHasZoneAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<FacilityWhere>;
};


export type ZoneFacilitiesHasZoneConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<ZoneFacilitiesHasZoneConnectionSort>>;
  where?: InputMaybe<ZoneFacilitiesHasZoneConnectionWhere>;
};


export type ZoneHasSubzoneZonesArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<ZoneOptions>;
  where?: InputMaybe<ZoneWhere>;
};


export type ZoneHasSubzoneZonesAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ZoneWhere>;
};


export type ZoneHasSubzoneZonesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<ZoneHasSubzoneZonesConnectionSort>>;
  where?: InputMaybe<ZoneHasSubzoneZonesConnectionWhere>;
};


export type ZoneZonesHasSubzoneArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<ZoneOptions>;
  where?: InputMaybe<ZoneWhere>;
};


export type ZoneZonesHasSubzoneAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ZoneWhere>;
};


export type ZoneZonesHasSubzoneConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<ZoneZonesHasSubzoneConnectionSort>>;
  where?: InputMaybe<ZoneZonesHasSubzoneConnectionWhere>;
};

export type ZoneAggregateSelection = {
  __typename?: 'ZoneAggregateSelection';
  code: StringAggregateSelectionNonNullable;
  count: Scalars['Int']['output'];
  name: StringAggregateSelectionNonNullable;
  uid: IdAggregateSelectionNonNullable;
};

export type ZoneConnectInput = {
  facilitiesHasZone?: InputMaybe<Array<ZoneFacilitiesHasZoneConnectFieldInput>>;
  hasSubzoneZones?: InputMaybe<Array<ZoneHasSubzoneZonesConnectFieldInput>>;
  zonesHasSubzone?: InputMaybe<Array<ZoneZonesHasSubzoneConnectFieldInput>>;
};

export type ZoneConnectWhere = {
  node: ZoneWhere;
};

export type ZoneCreateInput = {
  code: Scalars['String']['input'];
  facilitiesHasZone?: InputMaybe<ZoneFacilitiesHasZoneFieldInput>;
  hasSubzoneZones?: InputMaybe<ZoneHasSubzoneZonesFieldInput>;
  name: Scalars['String']['input'];
  zonesHasSubzone?: InputMaybe<ZoneZonesHasSubzoneFieldInput>;
};

export type ZoneDeleteInput = {
  facilitiesHasZone?: InputMaybe<Array<ZoneFacilitiesHasZoneDeleteFieldInput>>;
  hasSubzoneZones?: InputMaybe<Array<ZoneHasSubzoneZonesDeleteFieldInput>>;
  zonesHasSubzone?: InputMaybe<Array<ZoneZonesHasSubzoneDeleteFieldInput>>;
};

export type ZoneDisconnectInput = {
  facilitiesHasZone?: InputMaybe<Array<ZoneFacilitiesHasZoneDisconnectFieldInput>>;
  hasSubzoneZones?: InputMaybe<Array<ZoneHasSubzoneZonesDisconnectFieldInput>>;
  zonesHasSubzone?: InputMaybe<Array<ZoneZonesHasSubzoneDisconnectFieldInput>>;
};

export type ZoneEdge = {
  __typename?: 'ZoneEdge';
  cursor: Scalars['String']['output'];
  node: Zone;
};

export type ZoneFacilitiesHasZoneAggregateInput = {
  AND?: InputMaybe<Array<ZoneFacilitiesHasZoneAggregateInput>>;
  NOT?: InputMaybe<ZoneFacilitiesHasZoneAggregateInput>;
  OR?: InputMaybe<Array<ZoneFacilitiesHasZoneAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<ZoneFacilitiesHasZoneNodeAggregationWhereInput>;
};

export type ZoneFacilitiesHasZoneConnectFieldInput = {
  connect?: InputMaybe<Array<FacilityConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<FacilityConnectWhere>;
};

export type ZoneFacilitiesHasZoneConnection = {
  __typename?: 'ZoneFacilitiesHasZoneConnection';
  edges: Array<ZoneFacilitiesHasZoneRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type ZoneFacilitiesHasZoneConnectionSort = {
  node?: InputMaybe<FacilitySort>;
};

export type ZoneFacilitiesHasZoneConnectionWhere = {
  AND?: InputMaybe<Array<ZoneFacilitiesHasZoneConnectionWhere>>;
  NOT?: InputMaybe<ZoneFacilitiesHasZoneConnectionWhere>;
  OR?: InputMaybe<Array<ZoneFacilitiesHasZoneConnectionWhere>>;
  node?: InputMaybe<FacilityWhere>;
};

export type ZoneFacilitiesHasZoneCreateFieldInput = {
  node: FacilityCreateInput;
};

export type ZoneFacilitiesHasZoneDeleteFieldInput = {
  delete?: InputMaybe<FacilityDeleteInput>;
  where?: InputMaybe<ZoneFacilitiesHasZoneConnectionWhere>;
};

export type ZoneFacilitiesHasZoneDisconnectFieldInput = {
  disconnect?: InputMaybe<FacilityDisconnectInput>;
  where?: InputMaybe<ZoneFacilitiesHasZoneConnectionWhere>;
};

export type ZoneFacilitiesHasZoneFieldInput = {
  connect?: InputMaybe<Array<ZoneFacilitiesHasZoneConnectFieldInput>>;
  create?: InputMaybe<Array<ZoneFacilitiesHasZoneCreateFieldInput>>;
};

export type ZoneFacilitiesHasZoneNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ZoneFacilitiesHasZoneNodeAggregationWhereInput>>;
  NOT?: InputMaybe<ZoneFacilitiesHasZoneNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<ZoneFacilitiesHasZoneNodeAggregationWhereInput>>;
  code_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  code_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  uid_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  uid_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  uid_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  uid_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  uid_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  uid_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  uid_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  uid_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  uid_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  uid_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  uid_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type ZoneFacilitiesHasZoneRelationship = {
  __typename?: 'ZoneFacilitiesHasZoneRelationship';
  cursor: Scalars['String']['output'];
  node: Facility;
};

export type ZoneFacilitiesHasZoneUpdateConnectionInput = {
  node?: InputMaybe<FacilityUpdateInput>;
};

export type ZoneFacilitiesHasZoneUpdateFieldInput = {
  connect?: InputMaybe<Array<ZoneFacilitiesHasZoneConnectFieldInput>>;
  create?: InputMaybe<Array<ZoneFacilitiesHasZoneCreateFieldInput>>;
  delete?: InputMaybe<Array<ZoneFacilitiesHasZoneDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<ZoneFacilitiesHasZoneDisconnectFieldInput>>;
  update?: InputMaybe<ZoneFacilitiesHasZoneUpdateConnectionInput>;
  where?: InputMaybe<ZoneFacilitiesHasZoneConnectionWhere>;
};

export type ZoneFacilityFacilitiesHasZoneAggregationSelection = {
  __typename?: 'ZoneFacilityFacilitiesHasZoneAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<ZoneFacilityFacilitiesHasZoneNodeAggregateSelection>;
};

export type ZoneFacilityFacilitiesHasZoneNodeAggregateSelection = {
  __typename?: 'ZoneFacilityFacilitiesHasZoneNodeAggregateSelection';
  code: StringAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  uid: StringAggregateSelectionNonNullable;
};

export type ZoneHasSubzoneZonesAggregateInput = {
  AND?: InputMaybe<Array<ZoneHasSubzoneZonesAggregateInput>>;
  NOT?: InputMaybe<ZoneHasSubzoneZonesAggregateInput>;
  OR?: InputMaybe<Array<ZoneHasSubzoneZonesAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<ZoneHasSubzoneZonesNodeAggregationWhereInput>;
};

export type ZoneHasSubzoneZonesConnectFieldInput = {
  connect?: InputMaybe<Array<ZoneConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<ZoneConnectWhere>;
};

export type ZoneHasSubzoneZonesConnection = {
  __typename?: 'ZoneHasSubzoneZonesConnection';
  edges: Array<ZoneHasSubzoneZonesRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type ZoneHasSubzoneZonesConnectionSort = {
  node?: InputMaybe<ZoneSort>;
};

export type ZoneHasSubzoneZonesConnectionWhere = {
  AND?: InputMaybe<Array<ZoneHasSubzoneZonesConnectionWhere>>;
  NOT?: InputMaybe<ZoneHasSubzoneZonesConnectionWhere>;
  OR?: InputMaybe<Array<ZoneHasSubzoneZonesConnectionWhere>>;
  node?: InputMaybe<ZoneWhere>;
};

export type ZoneHasSubzoneZonesCreateFieldInput = {
  node: ZoneCreateInput;
};

export type ZoneHasSubzoneZonesDeleteFieldInput = {
  delete?: InputMaybe<ZoneDeleteInput>;
  where?: InputMaybe<ZoneHasSubzoneZonesConnectionWhere>;
};

export type ZoneHasSubzoneZonesDisconnectFieldInput = {
  disconnect?: InputMaybe<ZoneDisconnectInput>;
  where?: InputMaybe<ZoneHasSubzoneZonesConnectionWhere>;
};

export type ZoneHasSubzoneZonesFieldInput = {
  connect?: InputMaybe<Array<ZoneHasSubzoneZonesConnectFieldInput>>;
  create?: InputMaybe<Array<ZoneHasSubzoneZonesCreateFieldInput>>;
};

export type ZoneHasSubzoneZonesNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ZoneHasSubzoneZonesNodeAggregationWhereInput>>;
  NOT?: InputMaybe<ZoneHasSubzoneZonesNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<ZoneHasSubzoneZonesNodeAggregationWhereInput>>;
  code_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  code_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type ZoneHasSubzoneZonesRelationship = {
  __typename?: 'ZoneHasSubzoneZonesRelationship';
  cursor: Scalars['String']['output'];
  node: Zone;
};

export type ZoneHasSubzoneZonesUpdateConnectionInput = {
  node?: InputMaybe<ZoneUpdateInput>;
};

export type ZoneHasSubzoneZonesUpdateFieldInput = {
  connect?: InputMaybe<Array<ZoneHasSubzoneZonesConnectFieldInput>>;
  create?: InputMaybe<Array<ZoneHasSubzoneZonesCreateFieldInput>>;
  delete?: InputMaybe<Array<ZoneHasSubzoneZonesDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<ZoneHasSubzoneZonesDisconnectFieldInput>>;
  update?: InputMaybe<ZoneHasSubzoneZonesUpdateConnectionInput>;
  where?: InputMaybe<ZoneHasSubzoneZonesConnectionWhere>;
};

export type ZoneOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /** Specify one or more ZoneSort objects to sort Zones by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<ZoneSort>>;
};

export type ZoneRelationInput = {
  facilitiesHasZone?: InputMaybe<Array<ZoneFacilitiesHasZoneCreateFieldInput>>;
  hasSubzoneZones?: InputMaybe<Array<ZoneHasSubzoneZonesCreateFieldInput>>;
  zonesHasSubzone?: InputMaybe<Array<ZoneZonesHasSubzoneCreateFieldInput>>;
};

/** Fields to sort Zones by. The order in which sorts are applied is not guaranteed when specifying many fields in one ZoneSort object. */
export type ZoneSort = {
  code?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  uid?: InputMaybe<SortDirection>;
};

export type ZoneUpdateInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  facilitiesHasZone?: InputMaybe<Array<ZoneFacilitiesHasZoneUpdateFieldInput>>;
  hasSubzoneZones?: InputMaybe<Array<ZoneHasSubzoneZonesUpdateFieldInput>>;
  name?: InputMaybe<Scalars['String']['input']>;
  zonesHasSubzone?: InputMaybe<Array<ZoneZonesHasSubzoneUpdateFieldInput>>;
};

export type ZoneWhere = {
  AND?: InputMaybe<Array<ZoneWhere>>;
  NOT?: InputMaybe<ZoneWhere>;
  OR?: InputMaybe<Array<ZoneWhere>>;
  code?: InputMaybe<Scalars['String']['input']>;
  code_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  code_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  code_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  code_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  facilitiesHasZoneAggregate?: InputMaybe<ZoneFacilitiesHasZoneAggregateInput>;
  /** Return Zones where all of the related ZoneFacilitiesHasZoneConnections match this filter */
  facilitiesHasZoneConnection_ALL?: InputMaybe<ZoneFacilitiesHasZoneConnectionWhere>;
  /** Return Zones where none of the related ZoneFacilitiesHasZoneConnections match this filter */
  facilitiesHasZoneConnection_NONE?: InputMaybe<ZoneFacilitiesHasZoneConnectionWhere>;
  /** Return Zones where one of the related ZoneFacilitiesHasZoneConnections match this filter */
  facilitiesHasZoneConnection_SINGLE?: InputMaybe<ZoneFacilitiesHasZoneConnectionWhere>;
  /** Return Zones where some of the related ZoneFacilitiesHasZoneConnections match this filter */
  facilitiesHasZoneConnection_SOME?: InputMaybe<ZoneFacilitiesHasZoneConnectionWhere>;
  /** Return Zones where all of the related Facilities match this filter */
  facilitiesHasZone_ALL?: InputMaybe<FacilityWhere>;
  /** Return Zones where none of the related Facilities match this filter */
  facilitiesHasZone_NONE?: InputMaybe<FacilityWhere>;
  /** Return Zones where one of the related Facilities match this filter */
  facilitiesHasZone_SINGLE?: InputMaybe<FacilityWhere>;
  /** Return Zones where some of the related Facilities match this filter */
  facilitiesHasZone_SOME?: InputMaybe<FacilityWhere>;
  hasSubzoneZonesAggregate?: InputMaybe<ZoneHasSubzoneZonesAggregateInput>;
  /** Return Zones where all of the related ZoneHasSubzoneZonesConnections match this filter */
  hasSubzoneZonesConnection_ALL?: InputMaybe<ZoneHasSubzoneZonesConnectionWhere>;
  /** Return Zones where none of the related ZoneHasSubzoneZonesConnections match this filter */
  hasSubzoneZonesConnection_NONE?: InputMaybe<ZoneHasSubzoneZonesConnectionWhere>;
  /** Return Zones where one of the related ZoneHasSubzoneZonesConnections match this filter */
  hasSubzoneZonesConnection_SINGLE?: InputMaybe<ZoneHasSubzoneZonesConnectionWhere>;
  /** Return Zones where some of the related ZoneHasSubzoneZonesConnections match this filter */
  hasSubzoneZonesConnection_SOME?: InputMaybe<ZoneHasSubzoneZonesConnectionWhere>;
  /** Return Zones where all of the related Zones match this filter */
  hasSubzoneZones_ALL?: InputMaybe<ZoneWhere>;
  /** Return Zones where none of the related Zones match this filter */
  hasSubzoneZones_NONE?: InputMaybe<ZoneWhere>;
  /** Return Zones where one of the related Zones match this filter */
  hasSubzoneZones_SINGLE?: InputMaybe<ZoneWhere>;
  /** Return Zones where some of the related Zones match this filter */
  hasSubzoneZones_SOME?: InputMaybe<ZoneWhere>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  uid?: InputMaybe<Scalars['ID']['input']>;
  uid_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  uid_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  uid_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  uid_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  zonesHasSubzoneAggregate?: InputMaybe<ZoneZonesHasSubzoneAggregateInput>;
  /** Return Zones where all of the related ZoneZonesHasSubzoneConnections match this filter */
  zonesHasSubzoneConnection_ALL?: InputMaybe<ZoneZonesHasSubzoneConnectionWhere>;
  /** Return Zones where none of the related ZoneZonesHasSubzoneConnections match this filter */
  zonesHasSubzoneConnection_NONE?: InputMaybe<ZoneZonesHasSubzoneConnectionWhere>;
  /** Return Zones where one of the related ZoneZonesHasSubzoneConnections match this filter */
  zonesHasSubzoneConnection_SINGLE?: InputMaybe<ZoneZonesHasSubzoneConnectionWhere>;
  /** Return Zones where some of the related ZoneZonesHasSubzoneConnections match this filter */
  zonesHasSubzoneConnection_SOME?: InputMaybe<ZoneZonesHasSubzoneConnectionWhere>;
  /** Return Zones where all of the related Zones match this filter */
  zonesHasSubzone_ALL?: InputMaybe<ZoneWhere>;
  /** Return Zones where none of the related Zones match this filter */
  zonesHasSubzone_NONE?: InputMaybe<ZoneWhere>;
  /** Return Zones where one of the related Zones match this filter */
  zonesHasSubzone_SINGLE?: InputMaybe<ZoneWhere>;
  /** Return Zones where some of the related Zones match this filter */
  zonesHasSubzone_SOME?: InputMaybe<ZoneWhere>;
};

export type ZoneZoneHasSubzoneZonesAggregationSelection = {
  __typename?: 'ZoneZoneHasSubzoneZonesAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<ZoneZoneHasSubzoneZonesNodeAggregateSelection>;
};

export type ZoneZoneHasSubzoneZonesNodeAggregateSelection = {
  __typename?: 'ZoneZoneHasSubzoneZonesNodeAggregateSelection';
  code: StringAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  uid: IdAggregateSelectionNonNullable;
};

export type ZoneZoneZonesHasSubzoneAggregationSelection = {
  __typename?: 'ZoneZoneZonesHasSubzoneAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<ZoneZoneZonesHasSubzoneNodeAggregateSelection>;
};

export type ZoneZoneZonesHasSubzoneNodeAggregateSelection = {
  __typename?: 'ZoneZoneZonesHasSubzoneNodeAggregateSelection';
  code: StringAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  uid: IdAggregateSelectionNonNullable;
};

export type ZoneZonesHasSubzoneAggregateInput = {
  AND?: InputMaybe<Array<ZoneZonesHasSubzoneAggregateInput>>;
  NOT?: InputMaybe<ZoneZonesHasSubzoneAggregateInput>;
  OR?: InputMaybe<Array<ZoneZonesHasSubzoneAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<ZoneZonesHasSubzoneNodeAggregationWhereInput>;
};

export type ZoneZonesHasSubzoneConnectFieldInput = {
  connect?: InputMaybe<Array<ZoneConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<ZoneConnectWhere>;
};

export type ZoneZonesHasSubzoneConnection = {
  __typename?: 'ZoneZonesHasSubzoneConnection';
  edges: Array<ZoneZonesHasSubzoneRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type ZoneZonesHasSubzoneConnectionSort = {
  node?: InputMaybe<ZoneSort>;
};

export type ZoneZonesHasSubzoneConnectionWhere = {
  AND?: InputMaybe<Array<ZoneZonesHasSubzoneConnectionWhere>>;
  NOT?: InputMaybe<ZoneZonesHasSubzoneConnectionWhere>;
  OR?: InputMaybe<Array<ZoneZonesHasSubzoneConnectionWhere>>;
  node?: InputMaybe<ZoneWhere>;
};

export type ZoneZonesHasSubzoneCreateFieldInput = {
  node: ZoneCreateInput;
};

export type ZoneZonesHasSubzoneDeleteFieldInput = {
  delete?: InputMaybe<ZoneDeleteInput>;
  where?: InputMaybe<ZoneZonesHasSubzoneConnectionWhere>;
};

export type ZoneZonesHasSubzoneDisconnectFieldInput = {
  disconnect?: InputMaybe<ZoneDisconnectInput>;
  where?: InputMaybe<ZoneZonesHasSubzoneConnectionWhere>;
};

export type ZoneZonesHasSubzoneFieldInput = {
  connect?: InputMaybe<Array<ZoneZonesHasSubzoneConnectFieldInput>>;
  create?: InputMaybe<Array<ZoneZonesHasSubzoneCreateFieldInput>>;
};

export type ZoneZonesHasSubzoneNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ZoneZonesHasSubzoneNodeAggregationWhereInput>>;
  NOT?: InputMaybe<ZoneZonesHasSubzoneNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<ZoneZonesHasSubzoneNodeAggregationWhereInput>>;
  code_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  code_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  code_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  code_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  code_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type ZoneZonesHasSubzoneRelationship = {
  __typename?: 'ZoneZonesHasSubzoneRelationship';
  cursor: Scalars['String']['output'];
  node: Zone;
};

export type ZoneZonesHasSubzoneUpdateConnectionInput = {
  node?: InputMaybe<ZoneUpdateInput>;
};

export type ZoneZonesHasSubzoneUpdateFieldInput = {
  connect?: InputMaybe<Array<ZoneZonesHasSubzoneConnectFieldInput>>;
  create?: InputMaybe<Array<ZoneZonesHasSubzoneCreateFieldInput>>;
  delete?: InputMaybe<Array<ZoneZonesHasSubzoneDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<ZoneZonesHasSubzoneDisconnectFieldInput>>;
  update?: InputMaybe<ZoneZonesHasSubzoneUpdateConnectionInput>;
  where?: InputMaybe<ZoneZonesHasSubzoneConnectionWhere>;
};

export type ZonesConnection = {
  __typename?: 'ZonesConnection';
  edges: Array<ZoneEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type HasCatalogueProperty = {
  value?: Maybe<Scalars['String']['output']>;
};

export type HasCataloguePropertyCreateInput = {
  value?: InputMaybe<Scalars['String']['input']>;
};

export type HasCataloguePropertySort = {
  value?: InputMaybe<SortDirection>;
};

export type HasCataloguePropertyUpdateInput = {
  value?: InputMaybe<Scalars['String']['input']>;
};

export type HasCataloguePropertyWhere = {
  AND?: InputMaybe<Array<HasCataloguePropertyWhere>>;
  NOT?: InputMaybe<HasCataloguePropertyWhere>;
  OR?: InputMaybe<Array<HasCataloguePropertyWhere>>;
  value?: InputMaybe<Scalars['String']['input']>;
  value_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  value_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  value_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  value_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
};
