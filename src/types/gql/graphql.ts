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
  /** A date and time, represented as an ISO-8601 string */
  DateTime: { input: any; output: any; }
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
  uid: Scalars['String']['output'];
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

export type CatalogueCategoryAggregateSelection = {
  __typename?: 'CatalogueCategoryAggregateSelection';
  code: StringAggregateSelectionNonNullable;
  count: Scalars['Int']['output'];
  name: StringAggregateSelectionNonNullable;
  uid: StringAggregateSelectionNonNullable;
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
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
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
  uid: StringAggregateSelectionNonNullable;
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
  uid: StringAggregateSelectionNonNullable;
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
  uid: StringAggregateSelectionNonNullable;
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
  description: StringAggregateSelectionNonNullable;
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
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
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
  uid: Scalars['String']['input'];
};

export type CatalogueCategoryDeleteInput = {
  catalogueCategoriesHasSubcategory?: InputMaybe<Array<CatalogueCategoryCatalogueCategoriesHasSubcategoryDeleteFieldInput>>;
  catalogueItemsBelongsToCategory?: InputMaybe<Array<CatalogueCategoryCatalogueItemsBelongsToCategoryDeleteFieldInput>>;
  hasGroupCatalogueCategoryPropertyGroups?: InputMaybe<Array<CatalogueCategoryHasGroupCatalogueCategoryPropertyGroupsDeleteFieldInput>>;
  hasSubcategoryCatalogueCategories?: InputMaybe<Array<CatalogueCategoryHasSubcategoryCatalogueCategoriesDeleteFieldInput>>;
  parentCategory?: InputMaybe<CatalogueCategoryParentCategoryDeleteFieldInput>;
};

export type CatalogueCategoryDisconnectInput = {
  catalogueCategoriesHasSubcategory?: InputMaybe<Array<CatalogueCategoryCatalogueCategoriesHasSubcategoryDisconnectFieldInput>>;
  catalogueItemsBelongsToCategory?: InputMaybe<Array<CatalogueCategoryCatalogueItemsBelongsToCategoryDisconnectFieldInput>>;
  hasGroupCatalogueCategoryPropertyGroups?: InputMaybe<Array<CatalogueCategoryHasGroupCatalogueCategoryPropertyGroupsDisconnectFieldInput>>;
  hasSubcategoryCatalogueCategories?: InputMaybe<Array<CatalogueCategoryHasSubcategoryCatalogueCategoriesDisconnectFieldInput>>;
  parentCategory?: InputMaybe<CatalogueCategoryParentCategoryDisconnectFieldInput>;
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
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
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
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
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
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
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
  catalogueItemsHasCatalogueProperty: Array<CatalogueItem>;
  catalogueItemsHasCataloguePropertyAggregate?: Maybe<CatalogueCategoryPropertyCatalogueItemCatalogueItemsHasCataloguePropertyAggregationSelection>;
  catalogueItemsHasCataloguePropertyConnection: CatalogueCategoryPropertyCatalogueItemsHasCataloguePropertyConnection;
  defaultValue: Scalars['String']['output'];
  hasUnitUnits: Array<Unit>;
  hasUnitUnitsAggregate?: Maybe<CatalogueCategoryPropertyUnitHasUnitUnitsAggregationSelection>;
  hasUnitUnitsConnection: CatalogueCategoryPropertyHasUnitUnitsConnection;
  isPropertyTypeCatalogueCategoryPropertyTypes: Array<CatalogueCategoryPropertyType>;
  isPropertyTypeCatalogueCategoryPropertyTypesAggregate?: Maybe<CatalogueCategoryPropertyCatalogueCategoryPropertyTypeIsPropertyTypeCatalogueCategoryPropertyTypesAggregationSelection>;
  isPropertyTypeCatalogueCategoryPropertyTypesConnection: CatalogueCategoryPropertyIsPropertyTypeCatalogueCategoryPropertyTypesConnection;
  listOfValues: Scalars['String']['output'];
  name: Scalars['String']['output'];
  uid: Scalars['String']['output'];
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


export type CatalogueCategoryPropertyCatalogueItemsHasCataloguePropertyArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<CatalogueItemOptions>;
  where?: InputMaybe<CatalogueItemWhere>;
};


export type CatalogueCategoryPropertyCatalogueItemsHasCataloguePropertyAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<CatalogueItemWhere>;
};


export type CatalogueCategoryPropertyCatalogueItemsHasCataloguePropertyConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<CatalogueCategoryPropertyCatalogueItemsHasCataloguePropertyConnectionSort>>;
  where?: InputMaybe<CatalogueCategoryPropertyCatalogueItemsHasCataloguePropertyConnectionWhere>;
};


export type CatalogueCategoryPropertyHasUnitUnitsArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<UnitOptions>;
  where?: InputMaybe<UnitWhere>;
};


export type CatalogueCategoryPropertyHasUnitUnitsAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<UnitWhere>;
};


export type CatalogueCategoryPropertyHasUnitUnitsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<CatalogueCategoryPropertyHasUnitUnitsConnectionSort>>;
  where?: InputMaybe<CatalogueCategoryPropertyHasUnitUnitsConnectionWhere>;
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

export type CatalogueCategoryPropertyAggregateSelection = {
  __typename?: 'CatalogueCategoryPropertyAggregateSelection';
  count: Scalars['Int']['output'];
  defaultValue: StringAggregateSelectionNonNullable;
  listOfValues: StringAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  uid: StringAggregateSelectionNonNullable;
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
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
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

export type CatalogueCategoryPropertyCatalogueItemCatalogueItemsHasCataloguePropertyAggregationSelection = {
  __typename?: 'CatalogueCategoryPropertyCatalogueItemCatalogueItemsHasCataloguePropertyAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<CatalogueCategoryPropertyCatalogueItemCatalogueItemsHasCataloguePropertyNodeAggregateSelection>;
};

export type CatalogueCategoryPropertyCatalogueItemCatalogueItemsHasCataloguePropertyNodeAggregateSelection = {
  __typename?: 'CatalogueCategoryPropertyCatalogueItemCatalogueItemsHasCataloguePropertyNodeAggregateSelection';
  catalogueNumber: StringAggregateSelectionNonNullable;
  description: StringAggregateSelectionNonNullable;
  manufacturerUrl: StringAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  uid: StringAggregateSelectionNonNullable;
};

export type CatalogueCategoryPropertyCatalogueItemsHasCataloguePropertyAggregateInput = {
  AND?: InputMaybe<Array<CatalogueCategoryPropertyCatalogueItemsHasCataloguePropertyAggregateInput>>;
  NOT?: InputMaybe<CatalogueCategoryPropertyCatalogueItemsHasCataloguePropertyAggregateInput>;
  OR?: InputMaybe<Array<CatalogueCategoryPropertyCatalogueItemsHasCataloguePropertyAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<CatalogueCategoryPropertyCatalogueItemsHasCataloguePropertyNodeAggregationWhereInput>;
};

export type CatalogueCategoryPropertyCatalogueItemsHasCataloguePropertyConnectFieldInput = {
  connect?: InputMaybe<Array<CatalogueItemConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<CatalogueItemConnectWhere>;
};

export type CatalogueCategoryPropertyCatalogueItemsHasCataloguePropertyConnection = {
  __typename?: 'CatalogueCategoryPropertyCatalogueItemsHasCataloguePropertyConnection';
  edges: Array<CatalogueCategoryPropertyCatalogueItemsHasCataloguePropertyRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type CatalogueCategoryPropertyCatalogueItemsHasCataloguePropertyConnectionSort = {
  node?: InputMaybe<CatalogueItemSort>;
};

export type CatalogueCategoryPropertyCatalogueItemsHasCataloguePropertyConnectionWhere = {
  AND?: InputMaybe<Array<CatalogueCategoryPropertyCatalogueItemsHasCataloguePropertyConnectionWhere>>;
  NOT?: InputMaybe<CatalogueCategoryPropertyCatalogueItemsHasCataloguePropertyConnectionWhere>;
  OR?: InputMaybe<Array<CatalogueCategoryPropertyCatalogueItemsHasCataloguePropertyConnectionWhere>>;
  node?: InputMaybe<CatalogueItemWhere>;
};

export type CatalogueCategoryPropertyCatalogueItemsHasCataloguePropertyCreateFieldInput = {
  node: CatalogueItemCreateInput;
};

export type CatalogueCategoryPropertyCatalogueItemsHasCataloguePropertyDeleteFieldInput = {
  delete?: InputMaybe<CatalogueItemDeleteInput>;
  where?: InputMaybe<CatalogueCategoryPropertyCatalogueItemsHasCataloguePropertyConnectionWhere>;
};

export type CatalogueCategoryPropertyCatalogueItemsHasCataloguePropertyDisconnectFieldInput = {
  disconnect?: InputMaybe<CatalogueItemDisconnectInput>;
  where?: InputMaybe<CatalogueCategoryPropertyCatalogueItemsHasCataloguePropertyConnectionWhere>;
};

export type CatalogueCategoryPropertyCatalogueItemsHasCataloguePropertyFieldInput = {
  connect?: InputMaybe<Array<CatalogueCategoryPropertyCatalogueItemsHasCataloguePropertyConnectFieldInput>>;
  create?: InputMaybe<Array<CatalogueCategoryPropertyCatalogueItemsHasCataloguePropertyCreateFieldInput>>;
};

export type CatalogueCategoryPropertyCatalogueItemsHasCataloguePropertyNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<CatalogueCategoryPropertyCatalogueItemsHasCataloguePropertyNodeAggregationWhereInput>>;
  NOT?: InputMaybe<CatalogueCategoryPropertyCatalogueItemsHasCataloguePropertyNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<CatalogueCategoryPropertyCatalogueItemsHasCataloguePropertyNodeAggregationWhereInput>>;
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

export type CatalogueCategoryPropertyCatalogueItemsHasCataloguePropertyRelationship = {
  __typename?: 'CatalogueCategoryPropertyCatalogueItemsHasCataloguePropertyRelationship';
  cursor: Scalars['String']['output'];
  node: CatalogueItem;
};

export type CatalogueCategoryPropertyCatalogueItemsHasCataloguePropertyUpdateConnectionInput = {
  node?: InputMaybe<CatalogueItemUpdateInput>;
};

export type CatalogueCategoryPropertyCatalogueItemsHasCataloguePropertyUpdateFieldInput = {
  connect?: InputMaybe<Array<CatalogueCategoryPropertyCatalogueItemsHasCataloguePropertyConnectFieldInput>>;
  create?: InputMaybe<Array<CatalogueCategoryPropertyCatalogueItemsHasCataloguePropertyCreateFieldInput>>;
  delete?: InputMaybe<Array<CatalogueCategoryPropertyCatalogueItemsHasCataloguePropertyDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<CatalogueCategoryPropertyCatalogueItemsHasCataloguePropertyDisconnectFieldInput>>;
  update?: InputMaybe<CatalogueCategoryPropertyCatalogueItemsHasCataloguePropertyUpdateConnectionInput>;
  where?: InputMaybe<CatalogueCategoryPropertyCatalogueItemsHasCataloguePropertyConnectionWhere>;
};

export type CatalogueCategoryPropertyConnectInput = {
  catalogueCategoryPropertyGroupsContainsProperty?: InputMaybe<Array<CatalogueCategoryPropertyCatalogueCategoryPropertyGroupsContainsPropertyConnectFieldInput>>;
  catalogueItemsHasCatalogueProperty?: InputMaybe<Array<CatalogueCategoryPropertyCatalogueItemsHasCataloguePropertyConnectFieldInput>>;
  hasUnitUnits?: InputMaybe<Array<CatalogueCategoryPropertyHasUnitUnitsConnectFieldInput>>;
  isPropertyTypeCatalogueCategoryPropertyTypes?: InputMaybe<Array<CatalogueCategoryPropertyIsPropertyTypeCatalogueCategoryPropertyTypesConnectFieldInput>>;
};

export type CatalogueCategoryPropertyConnectWhere = {
  node: CatalogueCategoryPropertyWhere;
};

export type CatalogueCategoryPropertyCreateInput = {
  catalogueCategoryPropertyGroupsContainsProperty?: InputMaybe<CatalogueCategoryPropertyCatalogueCategoryPropertyGroupsContainsPropertyFieldInput>;
  catalogueItemsHasCatalogueProperty?: InputMaybe<CatalogueCategoryPropertyCatalogueItemsHasCataloguePropertyFieldInput>;
  defaultValue: Scalars['String']['input'];
  hasUnitUnits?: InputMaybe<CatalogueCategoryPropertyHasUnitUnitsFieldInput>;
  isPropertyTypeCatalogueCategoryPropertyTypes?: InputMaybe<CatalogueCategoryPropertyIsPropertyTypeCatalogueCategoryPropertyTypesFieldInput>;
  listOfValues: Scalars['String']['input'];
  name: Scalars['String']['input'];
  uid: Scalars['String']['input'];
};

export type CatalogueCategoryPropertyDeleteInput = {
  catalogueCategoryPropertyGroupsContainsProperty?: InputMaybe<Array<CatalogueCategoryPropertyCatalogueCategoryPropertyGroupsContainsPropertyDeleteFieldInput>>;
  catalogueItemsHasCatalogueProperty?: InputMaybe<Array<CatalogueCategoryPropertyCatalogueItemsHasCataloguePropertyDeleteFieldInput>>;
  hasUnitUnits?: InputMaybe<Array<CatalogueCategoryPropertyHasUnitUnitsDeleteFieldInput>>;
  isPropertyTypeCatalogueCategoryPropertyTypes?: InputMaybe<Array<CatalogueCategoryPropertyIsPropertyTypeCatalogueCategoryPropertyTypesDeleteFieldInput>>;
};

export type CatalogueCategoryPropertyDisconnectInput = {
  catalogueCategoryPropertyGroupsContainsProperty?: InputMaybe<Array<CatalogueCategoryPropertyCatalogueCategoryPropertyGroupsContainsPropertyDisconnectFieldInput>>;
  catalogueItemsHasCatalogueProperty?: InputMaybe<Array<CatalogueCategoryPropertyCatalogueItemsHasCataloguePropertyDisconnectFieldInput>>;
  hasUnitUnits?: InputMaybe<Array<CatalogueCategoryPropertyHasUnitUnitsDisconnectFieldInput>>;
  isPropertyTypeCatalogueCategoryPropertyTypes?: InputMaybe<Array<CatalogueCategoryPropertyIsPropertyTypeCatalogueCategoryPropertyTypesDisconnectFieldInput>>;
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
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
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
  uid: StringAggregateSelectionNonNullable;
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
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
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

export type CatalogueCategoryPropertyHasUnitUnitsAggregateInput = {
  AND?: InputMaybe<Array<CatalogueCategoryPropertyHasUnitUnitsAggregateInput>>;
  NOT?: InputMaybe<CatalogueCategoryPropertyHasUnitUnitsAggregateInput>;
  OR?: InputMaybe<Array<CatalogueCategoryPropertyHasUnitUnitsAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<CatalogueCategoryPropertyHasUnitUnitsNodeAggregationWhereInput>;
};

export type CatalogueCategoryPropertyHasUnitUnitsConnectFieldInput = {
  connect?: InputMaybe<Array<UnitConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<UnitConnectWhere>;
};

export type CatalogueCategoryPropertyHasUnitUnitsConnection = {
  __typename?: 'CatalogueCategoryPropertyHasUnitUnitsConnection';
  edges: Array<CatalogueCategoryPropertyHasUnitUnitsRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type CatalogueCategoryPropertyHasUnitUnitsConnectionSort = {
  node?: InputMaybe<UnitSort>;
};

export type CatalogueCategoryPropertyHasUnitUnitsConnectionWhere = {
  AND?: InputMaybe<Array<CatalogueCategoryPropertyHasUnitUnitsConnectionWhere>>;
  NOT?: InputMaybe<CatalogueCategoryPropertyHasUnitUnitsConnectionWhere>;
  OR?: InputMaybe<Array<CatalogueCategoryPropertyHasUnitUnitsConnectionWhere>>;
  node?: InputMaybe<UnitWhere>;
};

export type CatalogueCategoryPropertyHasUnitUnitsCreateFieldInput = {
  node: UnitCreateInput;
};

export type CatalogueCategoryPropertyHasUnitUnitsDeleteFieldInput = {
  delete?: InputMaybe<UnitDeleteInput>;
  where?: InputMaybe<CatalogueCategoryPropertyHasUnitUnitsConnectionWhere>;
};

export type CatalogueCategoryPropertyHasUnitUnitsDisconnectFieldInput = {
  disconnect?: InputMaybe<UnitDisconnectInput>;
  where?: InputMaybe<CatalogueCategoryPropertyHasUnitUnitsConnectionWhere>;
};

export type CatalogueCategoryPropertyHasUnitUnitsFieldInput = {
  connect?: InputMaybe<Array<CatalogueCategoryPropertyHasUnitUnitsConnectFieldInput>>;
  create?: InputMaybe<Array<CatalogueCategoryPropertyHasUnitUnitsCreateFieldInput>>;
};

export type CatalogueCategoryPropertyHasUnitUnitsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<CatalogueCategoryPropertyHasUnitUnitsNodeAggregationWhereInput>>;
  NOT?: InputMaybe<CatalogueCategoryPropertyHasUnitUnitsNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<CatalogueCategoryPropertyHasUnitUnitsNodeAggregationWhereInput>>;
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

export type CatalogueCategoryPropertyHasUnitUnitsRelationship = {
  __typename?: 'CatalogueCategoryPropertyHasUnitUnitsRelationship';
  cursor: Scalars['String']['output'];
  node: Unit;
};

export type CatalogueCategoryPropertyHasUnitUnitsUpdateConnectionInput = {
  node?: InputMaybe<UnitUpdateInput>;
};

export type CatalogueCategoryPropertyHasUnitUnitsUpdateFieldInput = {
  connect?: InputMaybe<Array<CatalogueCategoryPropertyHasUnitUnitsConnectFieldInput>>;
  create?: InputMaybe<Array<CatalogueCategoryPropertyHasUnitUnitsCreateFieldInput>>;
  delete?: InputMaybe<Array<CatalogueCategoryPropertyHasUnitUnitsDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<CatalogueCategoryPropertyHasUnitUnitsDisconnectFieldInput>>;
  update?: InputMaybe<CatalogueCategoryPropertyHasUnitUnitsUpdateConnectionInput>;
  where?: InputMaybe<CatalogueCategoryPropertyHasUnitUnitsConnectionWhere>;
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
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
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
  catalogueItemsHasCatalogueProperty?: InputMaybe<Array<CatalogueCategoryPropertyCatalogueItemsHasCataloguePropertyCreateFieldInput>>;
  hasUnitUnits?: InputMaybe<Array<CatalogueCategoryPropertyHasUnitUnitsCreateFieldInput>>;
  isPropertyTypeCatalogueCategoryPropertyTypes?: InputMaybe<Array<CatalogueCategoryPropertyIsPropertyTypeCatalogueCategoryPropertyTypesCreateFieldInput>>;
};

/** Fields to sort CatalogueCategoryProperties by. The order in which sorts are applied is not guaranteed when specifying many fields in one CatalogueCategoryPropertySort object. */
export type CatalogueCategoryPropertySort = {
  defaultValue?: InputMaybe<SortDirection>;
  listOfValues?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  uid?: InputMaybe<SortDirection>;
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
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
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

export type CatalogueCategoryPropertyUnitHasUnitUnitsAggregationSelection = {
  __typename?: 'CatalogueCategoryPropertyUnitHasUnitUnitsAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<CatalogueCategoryPropertyUnitHasUnitUnitsNodeAggregateSelection>;
};

export type CatalogueCategoryPropertyUnitHasUnitUnitsNodeAggregateSelection = {
  __typename?: 'CatalogueCategoryPropertyUnitHasUnitUnitsNodeAggregateSelection';
  code: StringAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  uid: StringAggregateSelectionNonNullable;
};

export type CatalogueCategoryPropertyUpdateInput = {
  catalogueCategoryPropertyGroupsContainsProperty?: InputMaybe<Array<CatalogueCategoryPropertyCatalogueCategoryPropertyGroupsContainsPropertyUpdateFieldInput>>;
  catalogueItemsHasCatalogueProperty?: InputMaybe<Array<CatalogueCategoryPropertyCatalogueItemsHasCataloguePropertyUpdateFieldInput>>;
  defaultValue?: InputMaybe<Scalars['String']['input']>;
  hasUnitUnits?: InputMaybe<Array<CatalogueCategoryPropertyHasUnitUnitsUpdateFieldInput>>;
  isPropertyTypeCatalogueCategoryPropertyTypes?: InputMaybe<Array<CatalogueCategoryPropertyIsPropertyTypeCatalogueCategoryPropertyTypesUpdateFieldInput>>;
  listOfValues?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  uid?: InputMaybe<Scalars['String']['input']>;
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
  catalogueItemsHasCataloguePropertyAggregate?: InputMaybe<CatalogueCategoryPropertyCatalogueItemsHasCataloguePropertyAggregateInput>;
  /** Return CatalogueCategoryProperties where all of the related CatalogueCategoryPropertyCatalogueItemsHasCataloguePropertyConnections match this filter */
  catalogueItemsHasCataloguePropertyConnection_ALL?: InputMaybe<CatalogueCategoryPropertyCatalogueItemsHasCataloguePropertyConnectionWhere>;
  /** Return CatalogueCategoryProperties where none of the related CatalogueCategoryPropertyCatalogueItemsHasCataloguePropertyConnections match this filter */
  catalogueItemsHasCataloguePropertyConnection_NONE?: InputMaybe<CatalogueCategoryPropertyCatalogueItemsHasCataloguePropertyConnectionWhere>;
  /** Return CatalogueCategoryProperties where one of the related CatalogueCategoryPropertyCatalogueItemsHasCataloguePropertyConnections match this filter */
  catalogueItemsHasCataloguePropertyConnection_SINGLE?: InputMaybe<CatalogueCategoryPropertyCatalogueItemsHasCataloguePropertyConnectionWhere>;
  /** Return CatalogueCategoryProperties where some of the related CatalogueCategoryPropertyCatalogueItemsHasCataloguePropertyConnections match this filter */
  catalogueItemsHasCataloguePropertyConnection_SOME?: InputMaybe<CatalogueCategoryPropertyCatalogueItemsHasCataloguePropertyConnectionWhere>;
  /** Return CatalogueCategoryProperties where all of the related CatalogueItems match this filter */
  catalogueItemsHasCatalogueProperty_ALL?: InputMaybe<CatalogueItemWhere>;
  /** Return CatalogueCategoryProperties where none of the related CatalogueItems match this filter */
  catalogueItemsHasCatalogueProperty_NONE?: InputMaybe<CatalogueItemWhere>;
  /** Return CatalogueCategoryProperties where one of the related CatalogueItems match this filter */
  catalogueItemsHasCatalogueProperty_SINGLE?: InputMaybe<CatalogueItemWhere>;
  /** Return CatalogueCategoryProperties where some of the related CatalogueItems match this filter */
  catalogueItemsHasCatalogueProperty_SOME?: InputMaybe<CatalogueItemWhere>;
  defaultValue?: InputMaybe<Scalars['String']['input']>;
  defaultValue_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  defaultValue_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  defaultValue_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  defaultValue_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  hasUnitUnitsAggregate?: InputMaybe<CatalogueCategoryPropertyHasUnitUnitsAggregateInput>;
  /** Return CatalogueCategoryProperties where all of the related CatalogueCategoryPropertyHasUnitUnitsConnections match this filter */
  hasUnitUnitsConnection_ALL?: InputMaybe<CatalogueCategoryPropertyHasUnitUnitsConnectionWhere>;
  /** Return CatalogueCategoryProperties where none of the related CatalogueCategoryPropertyHasUnitUnitsConnections match this filter */
  hasUnitUnitsConnection_NONE?: InputMaybe<CatalogueCategoryPropertyHasUnitUnitsConnectionWhere>;
  /** Return CatalogueCategoryProperties where one of the related CatalogueCategoryPropertyHasUnitUnitsConnections match this filter */
  hasUnitUnitsConnection_SINGLE?: InputMaybe<CatalogueCategoryPropertyHasUnitUnitsConnectionWhere>;
  /** Return CatalogueCategoryProperties where some of the related CatalogueCategoryPropertyHasUnitUnitsConnections match this filter */
  hasUnitUnitsConnection_SOME?: InputMaybe<CatalogueCategoryPropertyHasUnitUnitsConnectionWhere>;
  /** Return CatalogueCategoryProperties where all of the related Units match this filter */
  hasUnitUnits_ALL?: InputMaybe<UnitWhere>;
  /** Return CatalogueCategoryProperties where none of the related Units match this filter */
  hasUnitUnits_NONE?: InputMaybe<UnitWhere>;
  /** Return CatalogueCategoryProperties where one of the related Units match this filter */
  hasUnitUnits_SINGLE?: InputMaybe<UnitWhere>;
  /** Return CatalogueCategoryProperties where some of the related Units match this filter */
  hasUnitUnits_SOME?: InputMaybe<UnitWhere>;
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
};

export type CatalogueCategoryRelationInput = {
  catalogueCategoriesHasSubcategory?: InputMaybe<Array<CatalogueCategoryCatalogueCategoriesHasSubcategoryCreateFieldInput>>;
  catalogueItemsBelongsToCategory?: InputMaybe<Array<CatalogueCategoryCatalogueItemsBelongsToCategoryCreateFieldInput>>;
  hasGroupCatalogueCategoryPropertyGroups?: InputMaybe<Array<CatalogueCategoryHasGroupCatalogueCategoryPropertyGroupsCreateFieldInput>>;
  hasSubcategoryCatalogueCategories?: InputMaybe<Array<CatalogueCategoryHasSubcategoryCatalogueCategoriesCreateFieldInput>>;
  parentCategory?: InputMaybe<CatalogueCategoryParentCategoryCreateFieldInput>;
};

/** Fields to sort CatalogueCategories by. The order in which sorts are applied is not guaranteed when specifying many fields in one CatalogueCategorySort object. */
export type CatalogueCategorySort = {
  code?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  uid?: InputMaybe<SortDirection>;
};

export type CatalogueCategoryUpdateInput = {
  catalogueCategoriesHasSubcategory?: InputMaybe<Array<CatalogueCategoryCatalogueCategoriesHasSubcategoryUpdateFieldInput>>;
  catalogueItemsBelongsToCategory?: InputMaybe<Array<CatalogueCategoryCatalogueItemsBelongsToCategoryUpdateFieldInput>>;
  code?: InputMaybe<Scalars['String']['input']>;
  hasGroupCatalogueCategoryPropertyGroups?: InputMaybe<Array<CatalogueCategoryHasGroupCatalogueCategoryPropertyGroupsUpdateFieldInput>>;
  hasSubcategoryCatalogueCategories?: InputMaybe<Array<CatalogueCategoryHasSubcategoryCatalogueCategoriesUpdateFieldInput>>;
  name?: InputMaybe<Scalars['String']['input']>;
  parentCategory?: InputMaybe<CatalogueCategoryParentCategoryUpdateFieldInput>;
  uid?: InputMaybe<Scalars['String']['input']>;
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
  uid?: InputMaybe<Scalars['String']['input']>;
  uid_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  uid_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  uid_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  uid_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
};

export type CatalogueItem = {
  __typename?: 'CatalogueItem';
  belongsToCategoryCatalogueCategories: Array<CatalogueCategory>;
  belongsToCategoryCatalogueCategoriesAggregate?: Maybe<CatalogueItemCatalogueCategoryBelongsToCategoryCatalogueCategoriesAggregationSelection>;
  belongsToCategoryCatalogueCategoriesConnection: CatalogueItemBelongsToCategoryCatalogueCategoriesConnection;
  catalogueNumber: Scalars['String']['output'];
  description: Scalars['String']['output'];
  hasCataloguePropertyCatalogueCategoryProperties: Array<CatalogueCategoryProperty>;
  hasCataloguePropertyCatalogueCategoryPropertiesAggregate?: Maybe<CatalogueItemCatalogueCategoryPropertyHasCataloguePropertyCatalogueCategoryPropertiesAggregationSelection>;
  hasCataloguePropertyCatalogueCategoryPropertiesConnection: CatalogueItemHasCataloguePropertyCatalogueCategoryPropertiesConnection;
  hasManufacturerManufacturers: Array<Manufacturer>;
  hasManufacturerManufacturersAggregate?: Maybe<CatalogueItemManufacturerHasManufacturerManufacturersAggregationSelection>;
  hasManufacturerManufacturersConnection: CatalogueItemHasManufacturerManufacturersConnection;
  manufacturerUrl: Scalars['String']['output'];
  name: Scalars['String']['output'];
  uid: Scalars['String']['output'];
};


export type CatalogueItemBelongsToCategoryCatalogueCategoriesArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<CatalogueCategoryOptions>;
  where?: InputMaybe<CatalogueCategoryWhere>;
};


export type CatalogueItemBelongsToCategoryCatalogueCategoriesAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<CatalogueCategoryWhere>;
};


export type CatalogueItemBelongsToCategoryCatalogueCategoriesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<CatalogueItemBelongsToCategoryCatalogueCategoriesConnectionSort>>;
  where?: InputMaybe<CatalogueItemBelongsToCategoryCatalogueCategoriesConnectionWhere>;
};


export type CatalogueItemHasCataloguePropertyCatalogueCategoryPropertiesArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<CatalogueCategoryPropertyOptions>;
  where?: InputMaybe<CatalogueCategoryPropertyWhere>;
};


export type CatalogueItemHasCataloguePropertyCatalogueCategoryPropertiesAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<CatalogueCategoryPropertyWhere>;
};


export type CatalogueItemHasCataloguePropertyCatalogueCategoryPropertiesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<CatalogueItemHasCataloguePropertyCatalogueCategoryPropertiesConnectionSort>>;
  where?: InputMaybe<CatalogueItemHasCataloguePropertyCatalogueCategoryPropertiesConnectionWhere>;
};


export type CatalogueItemHasManufacturerManufacturersArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<ManufacturerOptions>;
  where?: InputMaybe<ManufacturerWhere>;
};


export type CatalogueItemHasManufacturerManufacturersAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ManufacturerWhere>;
};


export type CatalogueItemHasManufacturerManufacturersConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<CatalogueItemHasManufacturerManufacturersConnectionSort>>;
  where?: InputMaybe<CatalogueItemHasManufacturerManufacturersConnectionWhere>;
};

export type CatalogueItemAggregateSelection = {
  __typename?: 'CatalogueItemAggregateSelection';
  catalogueNumber: StringAggregateSelectionNonNullable;
  count: Scalars['Int']['output'];
  description: StringAggregateSelectionNonNullable;
  manufacturerUrl: StringAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  uid: StringAggregateSelectionNonNullable;
};

export type CatalogueItemBelongsToCategoryCatalogueCategoriesAggregateInput = {
  AND?: InputMaybe<Array<CatalogueItemBelongsToCategoryCatalogueCategoriesAggregateInput>>;
  NOT?: InputMaybe<CatalogueItemBelongsToCategoryCatalogueCategoriesAggregateInput>;
  OR?: InputMaybe<Array<CatalogueItemBelongsToCategoryCatalogueCategoriesAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<CatalogueItemBelongsToCategoryCatalogueCategoriesNodeAggregationWhereInput>;
};

export type CatalogueItemBelongsToCategoryCatalogueCategoriesConnectFieldInput = {
  connect?: InputMaybe<Array<CatalogueCategoryConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<CatalogueCategoryConnectWhere>;
};

export type CatalogueItemBelongsToCategoryCatalogueCategoriesConnection = {
  __typename?: 'CatalogueItemBelongsToCategoryCatalogueCategoriesConnection';
  edges: Array<CatalogueItemBelongsToCategoryCatalogueCategoriesRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type CatalogueItemBelongsToCategoryCatalogueCategoriesConnectionSort = {
  node?: InputMaybe<CatalogueCategorySort>;
};

export type CatalogueItemBelongsToCategoryCatalogueCategoriesConnectionWhere = {
  AND?: InputMaybe<Array<CatalogueItemBelongsToCategoryCatalogueCategoriesConnectionWhere>>;
  NOT?: InputMaybe<CatalogueItemBelongsToCategoryCatalogueCategoriesConnectionWhere>;
  OR?: InputMaybe<Array<CatalogueItemBelongsToCategoryCatalogueCategoriesConnectionWhere>>;
  node?: InputMaybe<CatalogueCategoryWhere>;
};

export type CatalogueItemBelongsToCategoryCatalogueCategoriesCreateFieldInput = {
  node: CatalogueCategoryCreateInput;
};

export type CatalogueItemBelongsToCategoryCatalogueCategoriesDeleteFieldInput = {
  delete?: InputMaybe<CatalogueCategoryDeleteInput>;
  where?: InputMaybe<CatalogueItemBelongsToCategoryCatalogueCategoriesConnectionWhere>;
};

export type CatalogueItemBelongsToCategoryCatalogueCategoriesDisconnectFieldInput = {
  disconnect?: InputMaybe<CatalogueCategoryDisconnectInput>;
  where?: InputMaybe<CatalogueItemBelongsToCategoryCatalogueCategoriesConnectionWhere>;
};

export type CatalogueItemBelongsToCategoryCatalogueCategoriesFieldInput = {
  connect?: InputMaybe<Array<CatalogueItemBelongsToCategoryCatalogueCategoriesConnectFieldInput>>;
  create?: InputMaybe<Array<CatalogueItemBelongsToCategoryCatalogueCategoriesCreateFieldInput>>;
};

export type CatalogueItemBelongsToCategoryCatalogueCategoriesNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<CatalogueItemBelongsToCategoryCatalogueCategoriesNodeAggregationWhereInput>>;
  NOT?: InputMaybe<CatalogueItemBelongsToCategoryCatalogueCategoriesNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<CatalogueItemBelongsToCategoryCatalogueCategoriesNodeAggregationWhereInput>>;
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

export type CatalogueItemBelongsToCategoryCatalogueCategoriesRelationship = {
  __typename?: 'CatalogueItemBelongsToCategoryCatalogueCategoriesRelationship';
  cursor: Scalars['String']['output'];
  node: CatalogueCategory;
};

export type CatalogueItemBelongsToCategoryCatalogueCategoriesUpdateConnectionInput = {
  node?: InputMaybe<CatalogueCategoryUpdateInput>;
};

export type CatalogueItemBelongsToCategoryCatalogueCategoriesUpdateFieldInput = {
  connect?: InputMaybe<Array<CatalogueItemBelongsToCategoryCatalogueCategoriesConnectFieldInput>>;
  create?: InputMaybe<Array<CatalogueItemBelongsToCategoryCatalogueCategoriesCreateFieldInput>>;
  delete?: InputMaybe<Array<CatalogueItemBelongsToCategoryCatalogueCategoriesDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<CatalogueItemBelongsToCategoryCatalogueCategoriesDisconnectFieldInput>>;
  update?: InputMaybe<CatalogueItemBelongsToCategoryCatalogueCategoriesUpdateConnectionInput>;
  where?: InputMaybe<CatalogueItemBelongsToCategoryCatalogueCategoriesConnectionWhere>;
};

export type CatalogueItemCatalogueCategoryBelongsToCategoryCatalogueCategoriesAggregationSelection = {
  __typename?: 'CatalogueItemCatalogueCategoryBelongsToCategoryCatalogueCategoriesAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<CatalogueItemCatalogueCategoryBelongsToCategoryCatalogueCategoriesNodeAggregateSelection>;
};

export type CatalogueItemCatalogueCategoryBelongsToCategoryCatalogueCategoriesNodeAggregateSelection = {
  __typename?: 'CatalogueItemCatalogueCategoryBelongsToCategoryCatalogueCategoriesNodeAggregateSelection';
  code: StringAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  uid: StringAggregateSelectionNonNullable;
};

export type CatalogueItemCatalogueCategoryPropertyHasCataloguePropertyCatalogueCategoryPropertiesAggregationSelection = {
  __typename?: 'CatalogueItemCatalogueCategoryPropertyHasCataloguePropertyCatalogueCategoryPropertiesAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<CatalogueItemCatalogueCategoryPropertyHasCataloguePropertyCatalogueCategoryPropertiesNodeAggregateSelection>;
};

export type CatalogueItemCatalogueCategoryPropertyHasCataloguePropertyCatalogueCategoryPropertiesNodeAggregateSelection = {
  __typename?: 'CatalogueItemCatalogueCategoryPropertyHasCataloguePropertyCatalogueCategoryPropertiesNodeAggregateSelection';
  defaultValue: StringAggregateSelectionNonNullable;
  listOfValues: StringAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  uid: StringAggregateSelectionNonNullable;
};

export type CatalogueItemConnectInput = {
  belongsToCategoryCatalogueCategories?: InputMaybe<Array<CatalogueItemBelongsToCategoryCatalogueCategoriesConnectFieldInput>>;
  hasCataloguePropertyCatalogueCategoryProperties?: InputMaybe<Array<CatalogueItemHasCataloguePropertyCatalogueCategoryPropertiesConnectFieldInput>>;
  hasManufacturerManufacturers?: InputMaybe<Array<CatalogueItemHasManufacturerManufacturersConnectFieldInput>>;
};

export type CatalogueItemConnectWhere = {
  node: CatalogueItemWhere;
};

export type CatalogueItemCreateInput = {
  belongsToCategoryCatalogueCategories?: InputMaybe<CatalogueItemBelongsToCategoryCatalogueCategoriesFieldInput>;
  catalogueNumber: Scalars['String']['input'];
  description: Scalars['String']['input'];
  hasCataloguePropertyCatalogueCategoryProperties?: InputMaybe<CatalogueItemHasCataloguePropertyCatalogueCategoryPropertiesFieldInput>;
  hasManufacturerManufacturers?: InputMaybe<CatalogueItemHasManufacturerManufacturersFieldInput>;
  manufacturerUrl: Scalars['String']['input'];
  name: Scalars['String']['input'];
  uid: Scalars['String']['input'];
};

export type CatalogueItemDeleteInput = {
  belongsToCategoryCatalogueCategories?: InputMaybe<Array<CatalogueItemBelongsToCategoryCatalogueCategoriesDeleteFieldInput>>;
  hasCataloguePropertyCatalogueCategoryProperties?: InputMaybe<Array<CatalogueItemHasCataloguePropertyCatalogueCategoryPropertiesDeleteFieldInput>>;
  hasManufacturerManufacturers?: InputMaybe<Array<CatalogueItemHasManufacturerManufacturersDeleteFieldInput>>;
};

export type CatalogueItemDisconnectInput = {
  belongsToCategoryCatalogueCategories?: InputMaybe<Array<CatalogueItemBelongsToCategoryCatalogueCategoriesDisconnectFieldInput>>;
  hasCataloguePropertyCatalogueCategoryProperties?: InputMaybe<Array<CatalogueItemHasCataloguePropertyCatalogueCategoryPropertiesDisconnectFieldInput>>;
  hasManufacturerManufacturers?: InputMaybe<Array<CatalogueItemHasManufacturerManufacturersDisconnectFieldInput>>;
};

export type CatalogueItemEdge = {
  __typename?: 'CatalogueItemEdge';
  cursor: Scalars['String']['output'];
  node: CatalogueItem;
};

export type CatalogueItemHasCataloguePropertyCatalogueCategoryPropertiesAggregateInput = {
  AND?: InputMaybe<Array<CatalogueItemHasCataloguePropertyCatalogueCategoryPropertiesAggregateInput>>;
  NOT?: InputMaybe<CatalogueItemHasCataloguePropertyCatalogueCategoryPropertiesAggregateInput>;
  OR?: InputMaybe<Array<CatalogueItemHasCataloguePropertyCatalogueCategoryPropertiesAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<CatalogueItemHasCataloguePropertyCatalogueCategoryPropertiesNodeAggregationWhereInput>;
};

export type CatalogueItemHasCataloguePropertyCatalogueCategoryPropertiesConnectFieldInput = {
  connect?: InputMaybe<Array<CatalogueCategoryPropertyConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<CatalogueCategoryPropertyConnectWhere>;
};

export type CatalogueItemHasCataloguePropertyCatalogueCategoryPropertiesConnection = {
  __typename?: 'CatalogueItemHasCataloguePropertyCatalogueCategoryPropertiesConnection';
  edges: Array<CatalogueItemHasCataloguePropertyCatalogueCategoryPropertiesRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type CatalogueItemHasCataloguePropertyCatalogueCategoryPropertiesConnectionSort = {
  node?: InputMaybe<CatalogueCategoryPropertySort>;
};

export type CatalogueItemHasCataloguePropertyCatalogueCategoryPropertiesConnectionWhere = {
  AND?: InputMaybe<Array<CatalogueItemHasCataloguePropertyCatalogueCategoryPropertiesConnectionWhere>>;
  NOT?: InputMaybe<CatalogueItemHasCataloguePropertyCatalogueCategoryPropertiesConnectionWhere>;
  OR?: InputMaybe<Array<CatalogueItemHasCataloguePropertyCatalogueCategoryPropertiesConnectionWhere>>;
  node?: InputMaybe<CatalogueCategoryPropertyWhere>;
};

export type CatalogueItemHasCataloguePropertyCatalogueCategoryPropertiesCreateFieldInput = {
  node: CatalogueCategoryPropertyCreateInput;
};

export type CatalogueItemHasCataloguePropertyCatalogueCategoryPropertiesDeleteFieldInput = {
  delete?: InputMaybe<CatalogueCategoryPropertyDeleteInput>;
  where?: InputMaybe<CatalogueItemHasCataloguePropertyCatalogueCategoryPropertiesConnectionWhere>;
};

export type CatalogueItemHasCataloguePropertyCatalogueCategoryPropertiesDisconnectFieldInput = {
  disconnect?: InputMaybe<CatalogueCategoryPropertyDisconnectInput>;
  where?: InputMaybe<CatalogueItemHasCataloguePropertyCatalogueCategoryPropertiesConnectionWhere>;
};

export type CatalogueItemHasCataloguePropertyCatalogueCategoryPropertiesFieldInput = {
  connect?: InputMaybe<Array<CatalogueItemHasCataloguePropertyCatalogueCategoryPropertiesConnectFieldInput>>;
  create?: InputMaybe<Array<CatalogueItemHasCataloguePropertyCatalogueCategoryPropertiesCreateFieldInput>>;
};

export type CatalogueItemHasCataloguePropertyCatalogueCategoryPropertiesNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<CatalogueItemHasCataloguePropertyCatalogueCategoryPropertiesNodeAggregationWhereInput>>;
  NOT?: InputMaybe<CatalogueItemHasCataloguePropertyCatalogueCategoryPropertiesNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<CatalogueItemHasCataloguePropertyCatalogueCategoryPropertiesNodeAggregationWhereInput>>;
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
};

export type CatalogueItemHasCataloguePropertyCatalogueCategoryPropertiesRelationship = {
  __typename?: 'CatalogueItemHasCataloguePropertyCatalogueCategoryPropertiesRelationship';
  cursor: Scalars['String']['output'];
  node: CatalogueCategoryProperty;
};

export type CatalogueItemHasCataloguePropertyCatalogueCategoryPropertiesUpdateConnectionInput = {
  node?: InputMaybe<CatalogueCategoryPropertyUpdateInput>;
};

export type CatalogueItemHasCataloguePropertyCatalogueCategoryPropertiesUpdateFieldInput = {
  connect?: InputMaybe<Array<CatalogueItemHasCataloguePropertyCatalogueCategoryPropertiesConnectFieldInput>>;
  create?: InputMaybe<Array<CatalogueItemHasCataloguePropertyCatalogueCategoryPropertiesCreateFieldInput>>;
  delete?: InputMaybe<Array<CatalogueItemHasCataloguePropertyCatalogueCategoryPropertiesDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<CatalogueItemHasCataloguePropertyCatalogueCategoryPropertiesDisconnectFieldInput>>;
  update?: InputMaybe<CatalogueItemHasCataloguePropertyCatalogueCategoryPropertiesUpdateConnectionInput>;
  where?: InputMaybe<CatalogueItemHasCataloguePropertyCatalogueCategoryPropertiesConnectionWhere>;
};

export type CatalogueItemHasManufacturerManufacturersAggregateInput = {
  AND?: InputMaybe<Array<CatalogueItemHasManufacturerManufacturersAggregateInput>>;
  NOT?: InputMaybe<CatalogueItemHasManufacturerManufacturersAggregateInput>;
  OR?: InputMaybe<Array<CatalogueItemHasManufacturerManufacturersAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<CatalogueItemHasManufacturerManufacturersNodeAggregationWhereInput>;
};

export type CatalogueItemHasManufacturerManufacturersConnectFieldInput = {
  connect?: InputMaybe<Array<ManufacturerConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<ManufacturerConnectWhere>;
};

export type CatalogueItemHasManufacturerManufacturersConnection = {
  __typename?: 'CatalogueItemHasManufacturerManufacturersConnection';
  edges: Array<CatalogueItemHasManufacturerManufacturersRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type CatalogueItemHasManufacturerManufacturersConnectionSort = {
  node?: InputMaybe<ManufacturerSort>;
};

export type CatalogueItemHasManufacturerManufacturersConnectionWhere = {
  AND?: InputMaybe<Array<CatalogueItemHasManufacturerManufacturersConnectionWhere>>;
  NOT?: InputMaybe<CatalogueItemHasManufacturerManufacturersConnectionWhere>;
  OR?: InputMaybe<Array<CatalogueItemHasManufacturerManufacturersConnectionWhere>>;
  node?: InputMaybe<ManufacturerWhere>;
};

export type CatalogueItemHasManufacturerManufacturersCreateFieldInput = {
  node: ManufacturerCreateInput;
};

export type CatalogueItemHasManufacturerManufacturersDeleteFieldInput = {
  delete?: InputMaybe<ManufacturerDeleteInput>;
  where?: InputMaybe<CatalogueItemHasManufacturerManufacturersConnectionWhere>;
};

export type CatalogueItemHasManufacturerManufacturersDisconnectFieldInput = {
  disconnect?: InputMaybe<ManufacturerDisconnectInput>;
  where?: InputMaybe<CatalogueItemHasManufacturerManufacturersConnectionWhere>;
};

export type CatalogueItemHasManufacturerManufacturersFieldInput = {
  connect?: InputMaybe<Array<CatalogueItemHasManufacturerManufacturersConnectFieldInput>>;
  create?: InputMaybe<Array<CatalogueItemHasManufacturerManufacturersCreateFieldInput>>;
};

export type CatalogueItemHasManufacturerManufacturersNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<CatalogueItemHasManufacturerManufacturersNodeAggregationWhereInput>>;
  NOT?: InputMaybe<CatalogueItemHasManufacturerManufacturersNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<CatalogueItemHasManufacturerManufacturersNodeAggregationWhereInput>>;
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

export type CatalogueItemHasManufacturerManufacturersRelationship = {
  __typename?: 'CatalogueItemHasManufacturerManufacturersRelationship';
  cursor: Scalars['String']['output'];
  node: Manufacturer;
};

export type CatalogueItemHasManufacturerManufacturersUpdateConnectionInput = {
  node?: InputMaybe<ManufacturerUpdateInput>;
};

export type CatalogueItemHasManufacturerManufacturersUpdateFieldInput = {
  connect?: InputMaybe<Array<CatalogueItemHasManufacturerManufacturersConnectFieldInput>>;
  create?: InputMaybe<Array<CatalogueItemHasManufacturerManufacturersCreateFieldInput>>;
  delete?: InputMaybe<Array<CatalogueItemHasManufacturerManufacturersDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<CatalogueItemHasManufacturerManufacturersDisconnectFieldInput>>;
  update?: InputMaybe<CatalogueItemHasManufacturerManufacturersUpdateConnectionInput>;
  where?: InputMaybe<CatalogueItemHasManufacturerManufacturersConnectionWhere>;
};

export type CatalogueItemManufacturerHasManufacturerManufacturersAggregationSelection = {
  __typename?: 'CatalogueItemManufacturerHasManufacturerManufacturersAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<CatalogueItemManufacturerHasManufacturerManufacturersNodeAggregateSelection>;
};

export type CatalogueItemManufacturerHasManufacturerManufacturersNodeAggregateSelection = {
  __typename?: 'CatalogueItemManufacturerHasManufacturerManufacturersNodeAggregateSelection';
  name: StringAggregateSelectionNonNullable;
};

export type CatalogueItemOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /** Specify one or more CatalogueItemSort objects to sort CatalogueItems by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<CatalogueItemSort>>;
};

export type CatalogueItemRelationInput = {
  belongsToCategoryCatalogueCategories?: InputMaybe<Array<CatalogueItemBelongsToCategoryCatalogueCategoriesCreateFieldInput>>;
  hasCataloguePropertyCatalogueCategoryProperties?: InputMaybe<Array<CatalogueItemHasCataloguePropertyCatalogueCategoryPropertiesCreateFieldInput>>;
  hasManufacturerManufacturers?: InputMaybe<Array<CatalogueItemHasManufacturerManufacturersCreateFieldInput>>;
};

/** Fields to sort CatalogueItems by. The order in which sorts are applied is not guaranteed when specifying many fields in one CatalogueItemSort object. */
export type CatalogueItemSort = {
  catalogueNumber?: InputMaybe<SortDirection>;
  description?: InputMaybe<SortDirection>;
  manufacturerUrl?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  uid?: InputMaybe<SortDirection>;
};

export type CatalogueItemUpdateInput = {
  belongsToCategoryCatalogueCategories?: InputMaybe<Array<CatalogueItemBelongsToCategoryCatalogueCategoriesUpdateFieldInput>>;
  catalogueNumber?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  hasCataloguePropertyCatalogueCategoryProperties?: InputMaybe<Array<CatalogueItemHasCataloguePropertyCatalogueCategoryPropertiesUpdateFieldInput>>;
  hasManufacturerManufacturers?: InputMaybe<Array<CatalogueItemHasManufacturerManufacturersUpdateFieldInput>>;
  manufacturerUrl?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  uid?: InputMaybe<Scalars['String']['input']>;
};

export type CatalogueItemWhere = {
  AND?: InputMaybe<Array<CatalogueItemWhere>>;
  NOT?: InputMaybe<CatalogueItemWhere>;
  OR?: InputMaybe<Array<CatalogueItemWhere>>;
  belongsToCategoryCatalogueCategoriesAggregate?: InputMaybe<CatalogueItemBelongsToCategoryCatalogueCategoriesAggregateInput>;
  /** Return CatalogueItems where all of the related CatalogueItemBelongsToCategoryCatalogueCategoriesConnections match this filter */
  belongsToCategoryCatalogueCategoriesConnection_ALL?: InputMaybe<CatalogueItemBelongsToCategoryCatalogueCategoriesConnectionWhere>;
  /** Return CatalogueItems where none of the related CatalogueItemBelongsToCategoryCatalogueCategoriesConnections match this filter */
  belongsToCategoryCatalogueCategoriesConnection_NONE?: InputMaybe<CatalogueItemBelongsToCategoryCatalogueCategoriesConnectionWhere>;
  /** Return CatalogueItems where one of the related CatalogueItemBelongsToCategoryCatalogueCategoriesConnections match this filter */
  belongsToCategoryCatalogueCategoriesConnection_SINGLE?: InputMaybe<CatalogueItemBelongsToCategoryCatalogueCategoriesConnectionWhere>;
  /** Return CatalogueItems where some of the related CatalogueItemBelongsToCategoryCatalogueCategoriesConnections match this filter */
  belongsToCategoryCatalogueCategoriesConnection_SOME?: InputMaybe<CatalogueItemBelongsToCategoryCatalogueCategoriesConnectionWhere>;
  /** Return CatalogueItems where all of the related CatalogueCategories match this filter */
  belongsToCategoryCatalogueCategories_ALL?: InputMaybe<CatalogueCategoryWhere>;
  /** Return CatalogueItems where none of the related CatalogueCategories match this filter */
  belongsToCategoryCatalogueCategories_NONE?: InputMaybe<CatalogueCategoryWhere>;
  /** Return CatalogueItems where one of the related CatalogueCategories match this filter */
  belongsToCategoryCatalogueCategories_SINGLE?: InputMaybe<CatalogueCategoryWhere>;
  /** Return CatalogueItems where some of the related CatalogueCategories match this filter */
  belongsToCategoryCatalogueCategories_SOME?: InputMaybe<CatalogueCategoryWhere>;
  catalogueNumber?: InputMaybe<Scalars['String']['input']>;
  catalogueNumber_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  catalogueNumber_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  catalogueNumber_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  catalogueNumber_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  description_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  description_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  description_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  description_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  hasCataloguePropertyCatalogueCategoryPropertiesAggregate?: InputMaybe<CatalogueItemHasCataloguePropertyCatalogueCategoryPropertiesAggregateInput>;
  /** Return CatalogueItems where all of the related CatalogueItemHasCataloguePropertyCatalogueCategoryPropertiesConnections match this filter */
  hasCataloguePropertyCatalogueCategoryPropertiesConnection_ALL?: InputMaybe<CatalogueItemHasCataloguePropertyCatalogueCategoryPropertiesConnectionWhere>;
  /** Return CatalogueItems where none of the related CatalogueItemHasCataloguePropertyCatalogueCategoryPropertiesConnections match this filter */
  hasCataloguePropertyCatalogueCategoryPropertiesConnection_NONE?: InputMaybe<CatalogueItemHasCataloguePropertyCatalogueCategoryPropertiesConnectionWhere>;
  /** Return CatalogueItems where one of the related CatalogueItemHasCataloguePropertyCatalogueCategoryPropertiesConnections match this filter */
  hasCataloguePropertyCatalogueCategoryPropertiesConnection_SINGLE?: InputMaybe<CatalogueItemHasCataloguePropertyCatalogueCategoryPropertiesConnectionWhere>;
  /** Return CatalogueItems where some of the related CatalogueItemHasCataloguePropertyCatalogueCategoryPropertiesConnections match this filter */
  hasCataloguePropertyCatalogueCategoryPropertiesConnection_SOME?: InputMaybe<CatalogueItemHasCataloguePropertyCatalogueCategoryPropertiesConnectionWhere>;
  /** Return CatalogueItems where all of the related CatalogueCategoryProperties match this filter */
  hasCataloguePropertyCatalogueCategoryProperties_ALL?: InputMaybe<CatalogueCategoryPropertyWhere>;
  /** Return CatalogueItems where none of the related CatalogueCategoryProperties match this filter */
  hasCataloguePropertyCatalogueCategoryProperties_NONE?: InputMaybe<CatalogueCategoryPropertyWhere>;
  /** Return CatalogueItems where one of the related CatalogueCategoryProperties match this filter */
  hasCataloguePropertyCatalogueCategoryProperties_SINGLE?: InputMaybe<CatalogueCategoryPropertyWhere>;
  /** Return CatalogueItems where some of the related CatalogueCategoryProperties match this filter */
  hasCataloguePropertyCatalogueCategoryProperties_SOME?: InputMaybe<CatalogueCategoryPropertyWhere>;
  hasManufacturerManufacturersAggregate?: InputMaybe<CatalogueItemHasManufacturerManufacturersAggregateInput>;
  /** Return CatalogueItems where all of the related CatalogueItemHasManufacturerManufacturersConnections match this filter */
  hasManufacturerManufacturersConnection_ALL?: InputMaybe<CatalogueItemHasManufacturerManufacturersConnectionWhere>;
  /** Return CatalogueItems where none of the related CatalogueItemHasManufacturerManufacturersConnections match this filter */
  hasManufacturerManufacturersConnection_NONE?: InputMaybe<CatalogueItemHasManufacturerManufacturersConnectionWhere>;
  /** Return CatalogueItems where one of the related CatalogueItemHasManufacturerManufacturersConnections match this filter */
  hasManufacturerManufacturersConnection_SINGLE?: InputMaybe<CatalogueItemHasManufacturerManufacturersConnectionWhere>;
  /** Return CatalogueItems where some of the related CatalogueItemHasManufacturerManufacturersConnections match this filter */
  hasManufacturerManufacturersConnection_SOME?: InputMaybe<CatalogueItemHasManufacturerManufacturersConnectionWhere>;
  /** Return CatalogueItems where all of the related Manufacturers match this filter */
  hasManufacturerManufacturers_ALL?: InputMaybe<ManufacturerWhere>;
  /** Return CatalogueItems where none of the related Manufacturers match this filter */
  hasManufacturerManufacturers_NONE?: InputMaybe<ManufacturerWhere>;
  /** Return CatalogueItems where one of the related Manufacturers match this filter */
  hasManufacturerManufacturers_SINGLE?: InputMaybe<ManufacturerWhere>;
  /** Return CatalogueItems where some of the related Manufacturers match this filter */
  hasManufacturerManufacturers_SOME?: InputMaybe<ManufacturerWhere>;
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

export type ContactPersonRoleConnectOrCreateWhere = {
  node: ContactPersonRoleUniqueWhere;
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

export type ContactPersonRoleOnCreateInput = {
  name: Scalars['String']['input'];
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

export type ContactPersonRoleUniqueWhere = {
  uid?: InputMaybe<Scalars['ID']['input']>;
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

export type CreateInfo = {
  __typename?: 'CreateInfo';
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

export type CreateLocationsMutationResponse = {
  __typename?: 'CreateLocationsMutationResponse';
  info: CreateInfo;
  locations: Array<Location>;
};

export type CreateManufacturersMutationResponse = {
  __typename?: 'CreateManufacturersMutationResponse';
  info: CreateInfo;
  manufacturers: Array<Manufacturer>;
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

export type DateTimeAggregateSelectionNonNullable = {
  __typename?: 'DateTimeAggregateSelectionNonNullable';
  max: Scalars['DateTime']['output'];
  min: Scalars['DateTime']['output'];
};

export type DeleteInfo = {
  __typename?: 'DeleteInfo';
  bookmark?: Maybe<Scalars['String']['output']>;
  nodesDeleted: Scalars['Int']['output'];
  relationshipsDeleted: Scalars['Int']['output'];
};

export type Employee = {
  __typename?: 'Employee';
  email?: Maybe<Scalars['String']['output']>;
  firstName: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  phoneNumber?: Maybe<Scalars['String']['output']>;
  teams: Array<Team>;
  teamsAggregate?: Maybe<EmployeeTeamTeamsAggregationSelection>;
  teamsConnection: EmployeeTeamsConnection;
  uid: Scalars['String']['output'];
};


export type EmployeeTeamsArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<TeamOptions>;
  where?: InputMaybe<TeamWhere>;
};


export type EmployeeTeamsAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<TeamWhere>;
};


export type EmployeeTeamsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<EmployeeTeamsConnectionSort>>;
  where?: InputMaybe<EmployeeTeamsConnectionWhere>;
};

export type EmployeeAggregateSelection = {
  __typename?: 'EmployeeAggregateSelection';
  count: Scalars['Int']['output'];
  email: StringAggregateSelectionNullable;
  firstName: StringAggregateSelectionNonNullable;
  lastName: StringAggregateSelectionNonNullable;
  phoneNumber: StringAggregateSelectionNullable;
  uid: StringAggregateSelectionNonNullable;
};

export type EmployeeConnectInput = {
  teams?: InputMaybe<Array<EmployeeTeamsConnectFieldInput>>;
};

export type EmployeeConnectWhere = {
  node: EmployeeWhere;
};

export type EmployeeCreateInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  teams?: InputMaybe<EmployeeTeamsFieldInput>;
  uid: Scalars['String']['input'];
};

export type EmployeeDeleteInput = {
  teams?: InputMaybe<Array<EmployeeTeamsDeleteFieldInput>>;
};

export type EmployeeDisconnectInput = {
  teams?: InputMaybe<Array<EmployeeTeamsDisconnectFieldInput>>;
};

export type EmployeeEdge = {
  __typename?: 'EmployeeEdge';
  cursor: Scalars['String']['output'];
  node: Employee;
};

export type EmployeeOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /** Specify one or more EmployeeSort objects to sort Employees by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<EmployeeSort>>;
};

export type EmployeeRelationInput = {
  teams?: InputMaybe<Array<EmployeeTeamsCreateFieldInput>>;
};

/** Fields to sort Employees by. The order in which sorts are applied is not guaranteed when specifying many fields in one EmployeeSort object. */
export type EmployeeSort = {
  email?: InputMaybe<SortDirection>;
  firstName?: InputMaybe<SortDirection>;
  lastName?: InputMaybe<SortDirection>;
  phoneNumber?: InputMaybe<SortDirection>;
  uid?: InputMaybe<SortDirection>;
};

export type EmployeeTeamTeamsAggregationSelection = {
  __typename?: 'EmployeeTeamTeamsAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<EmployeeTeamTeamsNodeAggregateSelection>;
};

export type EmployeeTeamTeamsNodeAggregateSelection = {
  __typename?: 'EmployeeTeamTeamsNodeAggregateSelection';
  name: StringAggregateSelectionNonNullable;
  uid: StringAggregateSelectionNonNullable;
};

export type EmployeeTeamsAggregateInput = {
  AND?: InputMaybe<Array<EmployeeTeamsAggregateInput>>;
  NOT?: InputMaybe<EmployeeTeamsAggregateInput>;
  OR?: InputMaybe<Array<EmployeeTeamsAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<EmployeeTeamsNodeAggregationWhereInput>;
};

export type EmployeeTeamsConnectFieldInput = {
  connect?: InputMaybe<Array<TeamConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<TeamConnectWhere>;
};

export type EmployeeTeamsConnection = {
  __typename?: 'EmployeeTeamsConnection';
  edges: Array<EmployeeTeamsRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type EmployeeTeamsConnectionSort = {
  node?: InputMaybe<TeamSort>;
};

export type EmployeeTeamsConnectionWhere = {
  AND?: InputMaybe<Array<EmployeeTeamsConnectionWhere>>;
  NOT?: InputMaybe<EmployeeTeamsConnectionWhere>;
  OR?: InputMaybe<Array<EmployeeTeamsConnectionWhere>>;
  node?: InputMaybe<TeamWhere>;
};

export type EmployeeTeamsCreateFieldInput = {
  node: TeamCreateInput;
};

export type EmployeeTeamsDeleteFieldInput = {
  delete?: InputMaybe<TeamDeleteInput>;
  where?: InputMaybe<EmployeeTeamsConnectionWhere>;
};

export type EmployeeTeamsDisconnectFieldInput = {
  disconnect?: InputMaybe<TeamDisconnectInput>;
  where?: InputMaybe<EmployeeTeamsConnectionWhere>;
};

export type EmployeeTeamsFieldInput = {
  connect?: InputMaybe<Array<EmployeeTeamsConnectFieldInput>>;
  create?: InputMaybe<Array<EmployeeTeamsCreateFieldInput>>;
};

export type EmployeeTeamsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<EmployeeTeamsNodeAggregationWhereInput>>;
  NOT?: InputMaybe<EmployeeTeamsNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<EmployeeTeamsNodeAggregationWhereInput>>;
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

export type EmployeeTeamsRelationship = {
  __typename?: 'EmployeeTeamsRelationship';
  cursor: Scalars['String']['output'];
  node: Team;
};

export type EmployeeTeamsUpdateConnectionInput = {
  node?: InputMaybe<TeamUpdateInput>;
};

export type EmployeeTeamsUpdateFieldInput = {
  connect?: InputMaybe<Array<EmployeeTeamsConnectFieldInput>>;
  create?: InputMaybe<Array<EmployeeTeamsCreateFieldInput>>;
  delete?: InputMaybe<Array<EmployeeTeamsDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<EmployeeTeamsDisconnectFieldInput>>;
  update?: InputMaybe<EmployeeTeamsUpdateConnectionInput>;
  where?: InputMaybe<EmployeeTeamsConnectionWhere>;
};

export type EmployeeUpdateInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  teams?: InputMaybe<Array<EmployeeTeamsUpdateFieldInput>>;
  uid?: InputMaybe<Scalars['String']['input']>;
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
  firstName?: InputMaybe<Scalars['String']['input']>;
  firstName_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  firstName_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  firstName_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  firstName_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
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
  teamsAggregate?: InputMaybe<EmployeeTeamsAggregateInput>;
  /** Return Employees where all of the related EmployeeTeamsConnections match this filter */
  teamsConnection_ALL?: InputMaybe<EmployeeTeamsConnectionWhere>;
  /** Return Employees where none of the related EmployeeTeamsConnections match this filter */
  teamsConnection_NONE?: InputMaybe<EmployeeTeamsConnectionWhere>;
  /** Return Employees where one of the related EmployeeTeamsConnections match this filter */
  teamsConnection_SINGLE?: InputMaybe<EmployeeTeamsConnectionWhere>;
  /** Return Employees where some of the related EmployeeTeamsConnections match this filter */
  teamsConnection_SOME?: InputMaybe<EmployeeTeamsConnectionWhere>;
  /** Return Employees where all of the related Teams match this filter */
  teams_ALL?: InputMaybe<TeamWhere>;
  /** Return Employees where none of the related Teams match this filter */
  teams_NONE?: InputMaybe<TeamWhere>;
  /** Return Employees where one of the related Teams match this filter */
  teams_SINGLE?: InputMaybe<TeamWhere>;
  /** Return Employees where some of the related Teams match this filter */
  teams_SOME?: InputMaybe<TeamWhere>;
  uid?: InputMaybe<Scalars['String']['input']>;
  uid_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  uid_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  uid_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  uid_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
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

export type FacilityConnectOrCreateInput = {
  hasLocationLocations?: InputMaybe<Array<FacilityHasLocationLocationsConnectOrCreateFieldInput>>;
  locationsBelongsToFacility?: InputMaybe<Array<FacilityLocationsBelongsToFacilityConnectOrCreateFieldInput>>;
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
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<LocationConnectWhere>;
};

export type FacilityHasLocationLocationsConnectOrCreateFieldInput = {
  onCreate: FacilityHasLocationLocationsConnectOrCreateFieldInputOnCreate;
  where: LocationConnectOrCreateWhere;
};

export type FacilityHasLocationLocationsConnectOrCreateFieldInputOnCreate = {
  node: LocationOnCreateInput;
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
  connectOrCreate?: InputMaybe<Array<FacilityHasLocationLocationsConnectOrCreateFieldInput>>;
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
  facility_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  facility_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  facility_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  facility_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  facility_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  facility_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  facility_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  facility_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  facility_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  facility_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  facility_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  facility_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  facility_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  facility_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  facility_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
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
  connectOrCreate?: InputMaybe<Array<FacilityHasLocationLocationsConnectOrCreateFieldInput>>;
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
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
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
  facility: StringAggregateSelectionNonNullable;
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
  facility: StringAggregateSelectionNonNullable;
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
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<LocationConnectWhere>;
};

export type FacilityLocationsBelongsToFacilityConnectOrCreateFieldInput = {
  onCreate: FacilityLocationsBelongsToFacilityConnectOrCreateFieldInputOnCreate;
  where: LocationConnectOrCreateWhere;
};

export type FacilityLocationsBelongsToFacilityConnectOrCreateFieldInputOnCreate = {
  node: LocationOnCreateInput;
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
  connectOrCreate?: InputMaybe<Array<FacilityLocationsBelongsToFacilityConnectOrCreateFieldInput>>;
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
  facility_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  facility_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  facility_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  facility_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  facility_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  facility_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  facility_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  facility_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  facility_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  facility_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  facility_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  facility_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  facility_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  facility_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  facility_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
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
  connectOrCreate?: InputMaybe<Array<FacilityLocationsBelongsToFacilityConnectOrCreateFieldInput>>;
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
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
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
  uid: StringAggregateSelectionNonNullable;
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

export type HallContactPersonAggregateSelection = {
  __typename?: 'HallContactPersonAggregateSelection';
  count: Scalars['Int']['output'];
};

export type HallContactPersonConnectInput = {
  employee?: InputMaybe<HallContactPersonEmployeeConnectFieldInput>;
  role?: InputMaybe<HallContactPersonRoleConnectFieldInput>;
};

export type HallContactPersonConnectOrCreateInput = {
  role?: InputMaybe<HallContactPersonRoleConnectOrCreateFieldInput>;
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
};

export type HallContactPersonDeleteInput = {
  employee?: InputMaybe<HallContactPersonEmployeeDeleteFieldInput>;
  role?: InputMaybe<HallContactPersonRoleDeleteFieldInput>;
};

export type HallContactPersonDisconnectInput = {
  employee?: InputMaybe<HallContactPersonEmployeeDisconnectFieldInput>;
  role?: InputMaybe<HallContactPersonRoleDisconnectFieldInput>;
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
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
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
  lastName: StringAggregateSelectionNonNullable;
  phoneNumber: StringAggregateSelectionNullable;
  uid: StringAggregateSelectionNonNullable;
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
};

export type HallContactPersonRelationInput = {
  employee?: InputMaybe<HallContactPersonEmployeeCreateFieldInput>;
  role?: InputMaybe<HallContactPersonRoleCreateFieldInput>;
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
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<ContactPersonRoleConnectWhere>;
};

export type HallContactPersonRoleConnectOrCreateFieldInput = {
  onCreate: HallContactPersonRoleConnectOrCreateFieldInputOnCreate;
  where: ContactPersonRoleConnectOrCreateWhere;
};

export type HallContactPersonRoleConnectOrCreateFieldInputOnCreate = {
  node: ContactPersonRoleOnCreateInput;
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
  connectOrCreate?: InputMaybe<HallContactPersonRoleConnectOrCreateFieldInput>;
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
  connectOrCreate?: InputMaybe<HallContactPersonRoleConnectOrCreateFieldInput>;
  create?: InputMaybe<HallContactPersonRoleCreateFieldInput>;
  delete?: InputMaybe<HallContactPersonRoleDeleteFieldInput>;
  disconnect?: InputMaybe<HallContactPersonRoleDisconnectFieldInput>;
  update?: InputMaybe<HallContactPersonRoleUpdateConnectionInput>;
  where?: InputMaybe<HallContactPersonRoleConnectionWhere>;
};

export type HallContactPersonUpdateInput = {
  employee?: InputMaybe<HallContactPersonEmployeeUpdateFieldInput>;
  role?: InputMaybe<HallContactPersonRoleUpdateFieldInput>;
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
};

export type IdAggregateSelectionNonNullable = {
  __typename?: 'IDAggregateSelectionNonNullable';
  longest: Scalars['ID']['output'];
  shortest: Scalars['ID']['output'];
};

export type ItemCondition = {
  __typename?: 'ItemCondition';
  code: Scalars['String']['output'];
  name: Scalars['String']['output'];
  uid: Scalars['String']['output'];
};

export type ItemConditionAggregateSelection = {
  __typename?: 'ItemConditionAggregateSelection';
  code: StringAggregateSelectionNonNullable;
  count: Scalars['Int']['output'];
  name: StringAggregateSelectionNonNullable;
  uid: StringAggregateSelectionNonNullable;
};

export type ItemConditionCreateInput = {
  code: Scalars['String']['input'];
  name: Scalars['String']['input'];
  uid: Scalars['String']['input'];
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

export type ItemConditionUpdateInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  uid?: InputMaybe<Scalars['String']['input']>;
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
  uid?: InputMaybe<Scalars['String']['input']>;
  uid_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  uid_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  uid_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  uid_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
};

export type ItemConditionsConnection = {
  __typename?: 'ItemConditionsConnection';
  edges: Array<ItemConditionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type ItemUsage = {
  __typename?: 'ItemUsage';
  code: Scalars['String']['output'];
  name: Scalars['String']['output'];
  uid: Scalars['String']['output'];
};

export type ItemUsageAggregateSelection = {
  __typename?: 'ItemUsageAggregateSelection';
  code: StringAggregateSelectionNonNullable;
  count: Scalars['Int']['output'];
  name: StringAggregateSelectionNonNullable;
  uid: StringAggregateSelectionNonNullable;
};

export type ItemUsageCreateInput = {
  code: Scalars['String']['input'];
  name: Scalars['String']['input'];
  uid: Scalars['String']['input'];
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
  uid?: InputMaybe<Scalars['String']['input']>;
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
  uid?: InputMaybe<Scalars['String']['input']>;
  uid_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  uid_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  uid_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  uid_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
};

export type ItemUsagesConnection = {
  __typename?: 'ItemUsagesConnection';
  edges: Array<ItemUsageEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Location = {
  __typename?: 'Location';
  belongsToFacilityFacilities: Array<Facility>;
  belongsToFacilityFacilitiesAggregate?: Maybe<LocationFacilityBelongsToFacilityFacilitiesAggregationSelection>;
  belongsToFacilityFacilitiesConnection: LocationBelongsToFacilityFacilitiesConnection;
  code?: Maybe<Scalars['String']['output']>;
  facilitiesHasLocation: Array<Facility>;
  facilitiesHasLocationAggregate?: Maybe<LocationFacilityFacilitiesHasLocationAggregationSelection>;
  facilitiesHasLocationConnection: LocationFacilitiesHasLocationConnection;
  facility: Scalars['String']['output'];
  name: Scalars['String']['output'];
  parentLocation?: Maybe<Location>;
  parentLocationAggregate?: Maybe<LocationLocationParentLocationAggregationSelection>;
  parentLocationConnection: LocationParentLocationConnection;
  roomCard?: Maybe<RoomCard>;
  roomCardAggregate?: Maybe<LocationRoomCardRoomCardAggregationSelection>;
  roomCardConnection: LocationRoomCardConnection;
  subLocations: Array<Location>;
  subLocationsAggregate?: Maybe<LocationLocationSubLocationsAggregationSelection>;
  subLocationsConnection: LocationSubLocationsConnection;
  uid: Scalars['ID']['output'];
};


export type LocationBelongsToFacilityFacilitiesArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<FacilityOptions>;
  where?: InputMaybe<FacilityWhere>;
};


export type LocationBelongsToFacilityFacilitiesAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<FacilityWhere>;
};


export type LocationBelongsToFacilityFacilitiesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<LocationBelongsToFacilityFacilitiesConnectionSort>>;
  where?: InputMaybe<LocationBelongsToFacilityFacilitiesConnectionWhere>;
};


export type LocationFacilitiesHasLocationArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<FacilityOptions>;
  where?: InputMaybe<FacilityWhere>;
};


export type LocationFacilitiesHasLocationAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<FacilityWhere>;
};


export type LocationFacilitiesHasLocationConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<LocationFacilitiesHasLocationConnectionSort>>;
  where?: InputMaybe<LocationFacilitiesHasLocationConnectionWhere>;
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


export type LocationRoomCardArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<RoomCardOptions>;
  where?: InputMaybe<RoomCardWhere>;
};


export type LocationRoomCardAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<RoomCardWhere>;
};


export type LocationRoomCardConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<LocationRoomCardConnectionSort>>;
  where?: InputMaybe<LocationRoomCardConnectionWhere>;
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
  facility: StringAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  uid: IdAggregateSelectionNonNullable;
};

export type LocationBelongsToFacilityFacilitiesAggregateInput = {
  AND?: InputMaybe<Array<LocationBelongsToFacilityFacilitiesAggregateInput>>;
  NOT?: InputMaybe<LocationBelongsToFacilityFacilitiesAggregateInput>;
  OR?: InputMaybe<Array<LocationBelongsToFacilityFacilitiesAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<LocationBelongsToFacilityFacilitiesNodeAggregationWhereInput>;
};

export type LocationBelongsToFacilityFacilitiesConnectFieldInput = {
  connect?: InputMaybe<Array<FacilityConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<FacilityConnectWhere>;
};

export type LocationBelongsToFacilityFacilitiesConnection = {
  __typename?: 'LocationBelongsToFacilityFacilitiesConnection';
  edges: Array<LocationBelongsToFacilityFacilitiesRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type LocationBelongsToFacilityFacilitiesConnectionSort = {
  node?: InputMaybe<FacilitySort>;
};

export type LocationBelongsToFacilityFacilitiesConnectionWhere = {
  AND?: InputMaybe<Array<LocationBelongsToFacilityFacilitiesConnectionWhere>>;
  NOT?: InputMaybe<LocationBelongsToFacilityFacilitiesConnectionWhere>;
  OR?: InputMaybe<Array<LocationBelongsToFacilityFacilitiesConnectionWhere>>;
  node?: InputMaybe<FacilityWhere>;
};

export type LocationBelongsToFacilityFacilitiesCreateFieldInput = {
  node: FacilityCreateInput;
};

export type LocationBelongsToFacilityFacilitiesDeleteFieldInput = {
  delete?: InputMaybe<FacilityDeleteInput>;
  where?: InputMaybe<LocationBelongsToFacilityFacilitiesConnectionWhere>;
};

export type LocationBelongsToFacilityFacilitiesDisconnectFieldInput = {
  disconnect?: InputMaybe<FacilityDisconnectInput>;
  where?: InputMaybe<LocationBelongsToFacilityFacilitiesConnectionWhere>;
};

export type LocationBelongsToFacilityFacilitiesFieldInput = {
  connect?: InputMaybe<Array<LocationBelongsToFacilityFacilitiesConnectFieldInput>>;
  create?: InputMaybe<Array<LocationBelongsToFacilityFacilitiesCreateFieldInput>>;
};

export type LocationBelongsToFacilityFacilitiesNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<LocationBelongsToFacilityFacilitiesNodeAggregationWhereInput>>;
  NOT?: InputMaybe<LocationBelongsToFacilityFacilitiesNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<LocationBelongsToFacilityFacilitiesNodeAggregationWhereInput>>;
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

export type LocationBelongsToFacilityFacilitiesRelationship = {
  __typename?: 'LocationBelongsToFacilityFacilitiesRelationship';
  cursor: Scalars['String']['output'];
  node: Facility;
};

export type LocationBelongsToFacilityFacilitiesUpdateConnectionInput = {
  node?: InputMaybe<FacilityUpdateInput>;
};

export type LocationBelongsToFacilityFacilitiesUpdateFieldInput = {
  connect?: InputMaybe<Array<LocationBelongsToFacilityFacilitiesConnectFieldInput>>;
  create?: InputMaybe<Array<LocationBelongsToFacilityFacilitiesCreateFieldInput>>;
  delete?: InputMaybe<Array<LocationBelongsToFacilityFacilitiesDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<LocationBelongsToFacilityFacilitiesDisconnectFieldInput>>;
  update?: InputMaybe<LocationBelongsToFacilityFacilitiesUpdateConnectionInput>;
  where?: InputMaybe<LocationBelongsToFacilityFacilitiesConnectionWhere>;
};

export type LocationConnectInput = {
  belongsToFacilityFacilities?: InputMaybe<Array<LocationBelongsToFacilityFacilitiesConnectFieldInput>>;
  facilitiesHasLocation?: InputMaybe<Array<LocationFacilitiesHasLocationConnectFieldInput>>;
  parentLocation?: InputMaybe<LocationParentLocationConnectFieldInput>;
  roomCard?: InputMaybe<LocationRoomCardConnectFieldInput>;
  subLocations?: InputMaybe<Array<LocationSubLocationsConnectFieldInput>>;
};

export type LocationConnectOrCreateInput = {
  parentLocation?: InputMaybe<LocationParentLocationConnectOrCreateFieldInput>;
  roomCard?: InputMaybe<LocationRoomCardConnectOrCreateFieldInput>;
  subLocations?: InputMaybe<Array<LocationSubLocationsConnectOrCreateFieldInput>>;
};

export type LocationConnectOrCreateWhere = {
  node: LocationUniqueWhere;
};

export type LocationConnectWhere = {
  node: LocationWhere;
};

export type LocationCreateInput = {
  belongsToFacilityFacilities?: InputMaybe<LocationBelongsToFacilityFacilitiesFieldInput>;
  code?: InputMaybe<Scalars['String']['input']>;
  facilitiesHasLocation?: InputMaybe<LocationFacilitiesHasLocationFieldInput>;
  facility: Scalars['String']['input'];
  name: Scalars['String']['input'];
  parentLocation?: InputMaybe<LocationParentLocationFieldInput>;
  roomCard?: InputMaybe<LocationRoomCardFieldInput>;
  subLocations?: InputMaybe<LocationSubLocationsFieldInput>;
};

export type LocationDeleteInput = {
  belongsToFacilityFacilities?: InputMaybe<Array<LocationBelongsToFacilityFacilitiesDeleteFieldInput>>;
  facilitiesHasLocation?: InputMaybe<Array<LocationFacilitiesHasLocationDeleteFieldInput>>;
  parentLocation?: InputMaybe<LocationParentLocationDeleteFieldInput>;
  roomCard?: InputMaybe<LocationRoomCardDeleteFieldInput>;
  subLocations?: InputMaybe<Array<LocationSubLocationsDeleteFieldInput>>;
};

export type LocationDisconnectInput = {
  belongsToFacilityFacilities?: InputMaybe<Array<LocationBelongsToFacilityFacilitiesDisconnectFieldInput>>;
  facilitiesHasLocation?: InputMaybe<Array<LocationFacilitiesHasLocationDisconnectFieldInput>>;
  parentLocation?: InputMaybe<LocationParentLocationDisconnectFieldInput>;
  roomCard?: InputMaybe<LocationRoomCardDisconnectFieldInput>;
  subLocations?: InputMaybe<Array<LocationSubLocationsDisconnectFieldInput>>;
};

export type LocationEdge = {
  __typename?: 'LocationEdge';
  cursor: Scalars['String']['output'];
  node: Location;
};

export type LocationFacilitiesHasLocationAggregateInput = {
  AND?: InputMaybe<Array<LocationFacilitiesHasLocationAggregateInput>>;
  NOT?: InputMaybe<LocationFacilitiesHasLocationAggregateInput>;
  OR?: InputMaybe<Array<LocationFacilitiesHasLocationAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<LocationFacilitiesHasLocationNodeAggregationWhereInput>;
};

export type LocationFacilitiesHasLocationConnectFieldInput = {
  connect?: InputMaybe<Array<FacilityConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<FacilityConnectWhere>;
};

export type LocationFacilitiesHasLocationConnection = {
  __typename?: 'LocationFacilitiesHasLocationConnection';
  edges: Array<LocationFacilitiesHasLocationRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type LocationFacilitiesHasLocationConnectionSort = {
  node?: InputMaybe<FacilitySort>;
};

export type LocationFacilitiesHasLocationConnectionWhere = {
  AND?: InputMaybe<Array<LocationFacilitiesHasLocationConnectionWhere>>;
  NOT?: InputMaybe<LocationFacilitiesHasLocationConnectionWhere>;
  OR?: InputMaybe<Array<LocationFacilitiesHasLocationConnectionWhere>>;
  node?: InputMaybe<FacilityWhere>;
};

export type LocationFacilitiesHasLocationCreateFieldInput = {
  node: FacilityCreateInput;
};

export type LocationFacilitiesHasLocationDeleteFieldInput = {
  delete?: InputMaybe<FacilityDeleteInput>;
  where?: InputMaybe<LocationFacilitiesHasLocationConnectionWhere>;
};

export type LocationFacilitiesHasLocationDisconnectFieldInput = {
  disconnect?: InputMaybe<FacilityDisconnectInput>;
  where?: InputMaybe<LocationFacilitiesHasLocationConnectionWhere>;
};

export type LocationFacilitiesHasLocationFieldInput = {
  connect?: InputMaybe<Array<LocationFacilitiesHasLocationConnectFieldInput>>;
  create?: InputMaybe<Array<LocationFacilitiesHasLocationCreateFieldInput>>;
};

export type LocationFacilitiesHasLocationNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<LocationFacilitiesHasLocationNodeAggregationWhereInput>>;
  NOT?: InputMaybe<LocationFacilitiesHasLocationNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<LocationFacilitiesHasLocationNodeAggregationWhereInput>>;
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

export type LocationFacilitiesHasLocationRelationship = {
  __typename?: 'LocationFacilitiesHasLocationRelationship';
  cursor: Scalars['String']['output'];
  node: Facility;
};

export type LocationFacilitiesHasLocationUpdateConnectionInput = {
  node?: InputMaybe<FacilityUpdateInput>;
};

export type LocationFacilitiesHasLocationUpdateFieldInput = {
  connect?: InputMaybe<Array<LocationFacilitiesHasLocationConnectFieldInput>>;
  create?: InputMaybe<Array<LocationFacilitiesHasLocationCreateFieldInput>>;
  delete?: InputMaybe<Array<LocationFacilitiesHasLocationDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<LocationFacilitiesHasLocationDisconnectFieldInput>>;
  update?: InputMaybe<LocationFacilitiesHasLocationUpdateConnectionInput>;
  where?: InputMaybe<LocationFacilitiesHasLocationConnectionWhere>;
};

export type LocationFacilityBelongsToFacilityFacilitiesAggregationSelection = {
  __typename?: 'LocationFacilityBelongsToFacilityFacilitiesAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<LocationFacilityBelongsToFacilityFacilitiesNodeAggregateSelection>;
};

export type LocationFacilityBelongsToFacilityFacilitiesNodeAggregateSelection = {
  __typename?: 'LocationFacilityBelongsToFacilityFacilitiesNodeAggregateSelection';
  code: StringAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  uid: StringAggregateSelectionNonNullable;
};

export type LocationFacilityFacilitiesHasLocationAggregationSelection = {
  __typename?: 'LocationFacilityFacilitiesHasLocationAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<LocationFacilityFacilitiesHasLocationNodeAggregateSelection>;
};

export type LocationFacilityFacilitiesHasLocationNodeAggregateSelection = {
  __typename?: 'LocationFacilityFacilitiesHasLocationNodeAggregateSelection';
  code: StringAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  uid: StringAggregateSelectionNonNullable;
};

export type LocationLocationParentLocationAggregationSelection = {
  __typename?: 'LocationLocationParentLocationAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<LocationLocationParentLocationNodeAggregateSelection>;
};

export type LocationLocationParentLocationNodeAggregateSelection = {
  __typename?: 'LocationLocationParentLocationNodeAggregateSelection';
  code: StringAggregateSelectionNullable;
  facility: StringAggregateSelectionNonNullable;
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
  facility: StringAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  uid: IdAggregateSelectionNonNullable;
};

export type LocationOnCreateInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  facility: Scalars['String']['input'];
  name: Scalars['String']['input'];
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
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<LocationConnectWhere>;
};

export type LocationParentLocationConnectOrCreateFieldInput = {
  onCreate: LocationParentLocationConnectOrCreateFieldInputOnCreate;
  where: LocationConnectOrCreateWhere;
};

export type LocationParentLocationConnectOrCreateFieldInputOnCreate = {
  node: LocationOnCreateInput;
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
  connectOrCreate?: InputMaybe<LocationParentLocationConnectOrCreateFieldInput>;
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
  facility_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  facility_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  facility_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  facility_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  facility_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  facility_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  facility_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  facility_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  facility_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  facility_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  facility_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  facility_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  facility_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  facility_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  facility_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
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
  connectOrCreate?: InputMaybe<LocationParentLocationConnectOrCreateFieldInput>;
  create?: InputMaybe<LocationParentLocationCreateFieldInput>;
  delete?: InputMaybe<LocationParentLocationDeleteFieldInput>;
  disconnect?: InputMaybe<LocationParentLocationDisconnectFieldInput>;
  update?: InputMaybe<LocationParentLocationUpdateConnectionInput>;
  where?: InputMaybe<LocationParentLocationConnectionWhere>;
};

export type LocationRelationInput = {
  belongsToFacilityFacilities?: InputMaybe<Array<LocationBelongsToFacilityFacilitiesCreateFieldInput>>;
  facilitiesHasLocation?: InputMaybe<Array<LocationFacilitiesHasLocationCreateFieldInput>>;
  parentLocation?: InputMaybe<LocationParentLocationCreateFieldInput>;
  roomCard?: InputMaybe<LocationRoomCardCreateFieldInput>;
  subLocations?: InputMaybe<Array<LocationSubLocationsCreateFieldInput>>;
};

export type LocationRoomCardAggregateInput = {
  AND?: InputMaybe<Array<LocationRoomCardAggregateInput>>;
  NOT?: InputMaybe<LocationRoomCardAggregateInput>;
  OR?: InputMaybe<Array<LocationRoomCardAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<LocationRoomCardNodeAggregationWhereInput>;
};

export type LocationRoomCardConnectFieldInput = {
  connect?: InputMaybe<RoomCardConnectInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<RoomCardConnectWhere>;
};

export type LocationRoomCardConnectOrCreateFieldInput = {
  onCreate: LocationRoomCardConnectOrCreateFieldInputOnCreate;
  where: RoomCardConnectOrCreateWhere;
};

export type LocationRoomCardConnectOrCreateFieldInputOnCreate = {
  node: RoomCardOnCreateInput;
};

export type LocationRoomCardConnection = {
  __typename?: 'LocationRoomCardConnection';
  edges: Array<LocationRoomCardRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type LocationRoomCardConnectionSort = {
  node?: InputMaybe<RoomCardSort>;
};

export type LocationRoomCardConnectionWhere = {
  AND?: InputMaybe<Array<LocationRoomCardConnectionWhere>>;
  NOT?: InputMaybe<LocationRoomCardConnectionWhere>;
  OR?: InputMaybe<Array<LocationRoomCardConnectionWhere>>;
  node?: InputMaybe<RoomCardWhere>;
};

export type LocationRoomCardCreateFieldInput = {
  node: RoomCardCreateInput;
};

export type LocationRoomCardDeleteFieldInput = {
  delete?: InputMaybe<RoomCardDeleteInput>;
  where?: InputMaybe<LocationRoomCardConnectionWhere>;
};

export type LocationRoomCardDisconnectFieldInput = {
  disconnect?: InputMaybe<RoomCardDisconnectInput>;
  where?: InputMaybe<LocationRoomCardConnectionWhere>;
};

export type LocationRoomCardFieldInput = {
  connect?: InputMaybe<LocationRoomCardConnectFieldInput>;
  connectOrCreate?: InputMaybe<LocationRoomCardConnectOrCreateFieldInput>;
  create?: InputMaybe<LocationRoomCardCreateFieldInput>;
};

export type LocationRoomCardNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<LocationRoomCardNodeAggregationWhereInput>>;
  NOT?: InputMaybe<LocationRoomCardNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<LocationRoomCardNodeAggregationWhereInput>>;
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
  cleaningShedule_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  cleaningShedule_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  cleaningShedule_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  cleaningShedule_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  cleaningShedule_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  cleaningShedule_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  cleaningShedule_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  cleaningShedule_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  cleaningShedule_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  cleaningShedule_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  cleaningShedule_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  cleaningShedule_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  cleaningShedule_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  cleaningShedule_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  cleaningShedule_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
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
  copressedAirDistribution_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  copressedAirDistribution_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  copressedAirDistribution_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  copressedAirDistribution_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  copressedAirDistribution_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  copressedAirDistribution_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  copressedAirDistribution_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  copressedAirDistribution_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  copressedAirDistribution_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  copressedAirDistribution_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  copressedAirDistribution_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  copressedAirDistribution_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  copressedAirDistribution_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  copressedAirDistribution_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  copressedAirDistribution_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
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
  humidity_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  humidity_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  humidity_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  humidity_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  humidity_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  humidity_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  humidity_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  humidity_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  humidity_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  humidity_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  humidity_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  humidity_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  humidity_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  humidity_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  humidity_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  indoorEnvironmentQueality_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  indoorEnvironmentQueality_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  indoorEnvironmentQueality_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  indoorEnvironmentQueality_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  indoorEnvironmentQueality_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  indoorEnvironmentQueality_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  indoorEnvironmentQueality_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  indoorEnvironmentQueality_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  indoorEnvironmentQueality_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  indoorEnvironmentQueality_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  indoorEnvironmentQueality_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  indoorEnvironmentQueality_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  indoorEnvironmentQueality_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  indoorEnvironmentQueality_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  indoorEnvironmentQueality_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
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
  prescribedClothing_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  prescribedClothing_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  prescribedClothing_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  prescribedClothing_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  prescribedClothing_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  prescribedClothing_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  prescribedClothing_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  prescribedClothing_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  prescribedClothing_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  prescribedClothing_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  prescribedClothing_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  prescribedClothing_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  prescribedClothing_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  prescribedClothing_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  prescribedClothing_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  pressureInCoolingSystem_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  pressureInCoolingSystem_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  pressureInCoolingSystem_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  pressureInCoolingSystem_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  pressureInCoolingSystem_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  pressureInCoolingSystem_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  pressureInCoolingSystem_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  pressureInCoolingSystem_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  pressureInCoolingSystem_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  pressureInCoolingSystem_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  pressureInCoolingSystem_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  pressureInCoolingSystem_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  pressureInCoolingSystem_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  pressureInCoolingSystem_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  pressureInCoolingSystem_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  purityClass_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  purityClass_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  purityClass_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  purityClass_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  purityClass_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  purityClass_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  purityClass_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  purityClass_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  purityClass_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  purityClass_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  purityClass_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  purityClass_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  purityClass_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  purityClass_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  purityClass_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  roomTemperature_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  roomTemperature_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  roomTemperature_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  roomTemperature_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  roomTemperature_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  roomTemperature_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  roomTemperature_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  roomTemperature_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  roomTemperature_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  roomTemperature_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  roomTemperature_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  roomTemperature_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  roomTemperature_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  roomTemperature_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  roomTemperature_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type LocationRoomCardRelationship = {
  __typename?: 'LocationRoomCardRelationship';
  cursor: Scalars['String']['output'];
  node: RoomCard;
};

export type LocationRoomCardRoomCardAggregationSelection = {
  __typename?: 'LocationRoomCardRoomCardAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<LocationRoomCardRoomCardNodeAggregateSelection>;
};

export type LocationRoomCardRoomCardNodeAggregateSelection = {
  __typename?: 'LocationRoomCardRoomCardNodeAggregateSelection';
  additionalRequirements: StringAggregateSelectionNullable;
  cleaningShedule: StringAggregateSelectionNullable;
  coolingWater: StringAggregateSelectionNullable;
  copressedAirDistribution: StringAggregateSelectionNullable;
  entryToHvacTent: StringAggregateSelectionNullable;
  humidity: StringAggregateSelectionNullable;
  indoorEnvironmentQueality: StringAggregateSelectionNullable;
  maxPressureInColdDistribution: StringAggregateSelectionNullable;
  nitrogenCentralDistribution: StringAggregateSelectionNullable;
  prescribedClothing: StringAggregateSelectionNullable;
  pressureInCoolingSystem: StringAggregateSelectionNullable;
  purityClass: StringAggregateSelectionNullable;
  roomTemperature: StringAggregateSelectionNullable;
  uid: IdAggregateSelectionNonNullable;
};

export type LocationRoomCardUpdateConnectionInput = {
  node?: InputMaybe<RoomCardUpdateInput>;
};

export type LocationRoomCardUpdateFieldInput = {
  connect?: InputMaybe<LocationRoomCardConnectFieldInput>;
  connectOrCreate?: InputMaybe<LocationRoomCardConnectOrCreateFieldInput>;
  create?: InputMaybe<LocationRoomCardCreateFieldInput>;
  delete?: InputMaybe<LocationRoomCardDeleteFieldInput>;
  disconnect?: InputMaybe<LocationRoomCardDisconnectFieldInput>;
  update?: InputMaybe<LocationRoomCardUpdateConnectionInput>;
  where?: InputMaybe<LocationRoomCardConnectionWhere>;
};

/** Fields to sort Locations by. The order in which sorts are applied is not guaranteed when specifying many fields in one LocationSort object. */
export type LocationSort = {
  code?: InputMaybe<SortDirection>;
  facility?: InputMaybe<SortDirection>;
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
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<LocationConnectWhere>;
};

export type LocationSubLocationsConnectOrCreateFieldInput = {
  onCreate: LocationSubLocationsConnectOrCreateFieldInputOnCreate;
  where: LocationConnectOrCreateWhere;
};

export type LocationSubLocationsConnectOrCreateFieldInputOnCreate = {
  node: LocationOnCreateInput;
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
  connectOrCreate?: InputMaybe<Array<LocationSubLocationsConnectOrCreateFieldInput>>;
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
  facility_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  facility_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  facility_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  facility_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  facility_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  facility_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  facility_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  facility_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  facility_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  facility_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  facility_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  facility_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  facility_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  facility_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  facility_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
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
  connectOrCreate?: InputMaybe<Array<LocationSubLocationsConnectOrCreateFieldInput>>;
  create?: InputMaybe<Array<LocationSubLocationsCreateFieldInput>>;
  delete?: InputMaybe<Array<LocationSubLocationsDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<LocationSubLocationsDisconnectFieldInput>>;
  update?: InputMaybe<LocationSubLocationsUpdateConnectionInput>;
  where?: InputMaybe<LocationSubLocationsConnectionWhere>;
};

export type LocationUniqueWhere = {
  uid?: InputMaybe<Scalars['ID']['input']>;
};

export type LocationUpdateInput = {
  belongsToFacilityFacilities?: InputMaybe<Array<LocationBelongsToFacilityFacilitiesUpdateFieldInput>>;
  code?: InputMaybe<Scalars['String']['input']>;
  facilitiesHasLocation?: InputMaybe<Array<LocationFacilitiesHasLocationUpdateFieldInput>>;
  facility?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parentLocation?: InputMaybe<LocationParentLocationUpdateFieldInput>;
  roomCard?: InputMaybe<LocationRoomCardUpdateFieldInput>;
  subLocations?: InputMaybe<Array<LocationSubLocationsUpdateFieldInput>>;
};

export type LocationWhere = {
  AND?: InputMaybe<Array<LocationWhere>>;
  NOT?: InputMaybe<LocationWhere>;
  OR?: InputMaybe<Array<LocationWhere>>;
  belongsToFacilityFacilitiesAggregate?: InputMaybe<LocationBelongsToFacilityFacilitiesAggregateInput>;
  /** Return Locations where all of the related LocationBelongsToFacilityFacilitiesConnections match this filter */
  belongsToFacilityFacilitiesConnection_ALL?: InputMaybe<LocationBelongsToFacilityFacilitiesConnectionWhere>;
  /** Return Locations where none of the related LocationBelongsToFacilityFacilitiesConnections match this filter */
  belongsToFacilityFacilitiesConnection_NONE?: InputMaybe<LocationBelongsToFacilityFacilitiesConnectionWhere>;
  /** Return Locations where one of the related LocationBelongsToFacilityFacilitiesConnections match this filter */
  belongsToFacilityFacilitiesConnection_SINGLE?: InputMaybe<LocationBelongsToFacilityFacilitiesConnectionWhere>;
  /** Return Locations where some of the related LocationBelongsToFacilityFacilitiesConnections match this filter */
  belongsToFacilityFacilitiesConnection_SOME?: InputMaybe<LocationBelongsToFacilityFacilitiesConnectionWhere>;
  /** Return Locations where all of the related Facilities match this filter */
  belongsToFacilityFacilities_ALL?: InputMaybe<FacilityWhere>;
  /** Return Locations where none of the related Facilities match this filter */
  belongsToFacilityFacilities_NONE?: InputMaybe<FacilityWhere>;
  /** Return Locations where one of the related Facilities match this filter */
  belongsToFacilityFacilities_SINGLE?: InputMaybe<FacilityWhere>;
  /** Return Locations where some of the related Facilities match this filter */
  belongsToFacilityFacilities_SOME?: InputMaybe<FacilityWhere>;
  code?: InputMaybe<Scalars['String']['input']>;
  code_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  code_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  code_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  code_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  facilitiesHasLocationAggregate?: InputMaybe<LocationFacilitiesHasLocationAggregateInput>;
  /** Return Locations where all of the related LocationFacilitiesHasLocationConnections match this filter */
  facilitiesHasLocationConnection_ALL?: InputMaybe<LocationFacilitiesHasLocationConnectionWhere>;
  /** Return Locations where none of the related LocationFacilitiesHasLocationConnections match this filter */
  facilitiesHasLocationConnection_NONE?: InputMaybe<LocationFacilitiesHasLocationConnectionWhere>;
  /** Return Locations where one of the related LocationFacilitiesHasLocationConnections match this filter */
  facilitiesHasLocationConnection_SINGLE?: InputMaybe<LocationFacilitiesHasLocationConnectionWhere>;
  /** Return Locations where some of the related LocationFacilitiesHasLocationConnections match this filter */
  facilitiesHasLocationConnection_SOME?: InputMaybe<LocationFacilitiesHasLocationConnectionWhere>;
  /** Return Locations where all of the related Facilities match this filter */
  facilitiesHasLocation_ALL?: InputMaybe<FacilityWhere>;
  /** Return Locations where none of the related Facilities match this filter */
  facilitiesHasLocation_NONE?: InputMaybe<FacilityWhere>;
  /** Return Locations where one of the related Facilities match this filter */
  facilitiesHasLocation_SINGLE?: InputMaybe<FacilityWhere>;
  /** Return Locations where some of the related Facilities match this filter */
  facilitiesHasLocation_SOME?: InputMaybe<FacilityWhere>;
  facility?: InputMaybe<Scalars['String']['input']>;
  facility_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  facility_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  facility_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  facility_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
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
  roomCard?: InputMaybe<RoomCardWhere>;
  roomCardAggregate?: InputMaybe<LocationRoomCardAggregateInput>;
  roomCardConnection?: InputMaybe<LocationRoomCardConnectionWhere>;
  roomCardConnection_NOT?: InputMaybe<LocationRoomCardConnectionWhere>;
  roomCard_NOT?: InputMaybe<RoomCardWhere>;
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

export type Manufacturer = {
  __typename?: 'Manufacturer';
  catalogueItemsHasManufacturer: Array<CatalogueItem>;
  catalogueItemsHasManufacturerAggregate?: Maybe<ManufacturerCatalogueItemCatalogueItemsHasManufacturerAggregationSelection>;
  catalogueItemsHasManufacturerConnection: ManufacturerCatalogueItemsHasManufacturerConnection;
  name: Scalars['String']['output'];
};


export type ManufacturerCatalogueItemsHasManufacturerArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<CatalogueItemOptions>;
  where?: InputMaybe<CatalogueItemWhere>;
};


export type ManufacturerCatalogueItemsHasManufacturerAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<CatalogueItemWhere>;
};


export type ManufacturerCatalogueItemsHasManufacturerConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<ManufacturerCatalogueItemsHasManufacturerConnectionSort>>;
  where?: InputMaybe<ManufacturerCatalogueItemsHasManufacturerConnectionWhere>;
};

export type ManufacturerAggregateSelection = {
  __typename?: 'ManufacturerAggregateSelection';
  count: Scalars['Int']['output'];
  name: StringAggregateSelectionNonNullable;
};

export type ManufacturerCatalogueItemCatalogueItemsHasManufacturerAggregationSelection = {
  __typename?: 'ManufacturerCatalogueItemCatalogueItemsHasManufacturerAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<ManufacturerCatalogueItemCatalogueItemsHasManufacturerNodeAggregateSelection>;
};

export type ManufacturerCatalogueItemCatalogueItemsHasManufacturerNodeAggregateSelection = {
  __typename?: 'ManufacturerCatalogueItemCatalogueItemsHasManufacturerNodeAggregateSelection';
  catalogueNumber: StringAggregateSelectionNonNullable;
  description: StringAggregateSelectionNonNullable;
  manufacturerUrl: StringAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  uid: StringAggregateSelectionNonNullable;
};

export type ManufacturerCatalogueItemsHasManufacturerAggregateInput = {
  AND?: InputMaybe<Array<ManufacturerCatalogueItemsHasManufacturerAggregateInput>>;
  NOT?: InputMaybe<ManufacturerCatalogueItemsHasManufacturerAggregateInput>;
  OR?: InputMaybe<Array<ManufacturerCatalogueItemsHasManufacturerAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<ManufacturerCatalogueItemsHasManufacturerNodeAggregationWhereInput>;
};

export type ManufacturerCatalogueItemsHasManufacturerConnectFieldInput = {
  connect?: InputMaybe<Array<CatalogueItemConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<CatalogueItemConnectWhere>;
};

export type ManufacturerCatalogueItemsHasManufacturerConnection = {
  __typename?: 'ManufacturerCatalogueItemsHasManufacturerConnection';
  edges: Array<ManufacturerCatalogueItemsHasManufacturerRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type ManufacturerCatalogueItemsHasManufacturerConnectionSort = {
  node?: InputMaybe<CatalogueItemSort>;
};

export type ManufacturerCatalogueItemsHasManufacturerConnectionWhere = {
  AND?: InputMaybe<Array<ManufacturerCatalogueItemsHasManufacturerConnectionWhere>>;
  NOT?: InputMaybe<ManufacturerCatalogueItemsHasManufacturerConnectionWhere>;
  OR?: InputMaybe<Array<ManufacturerCatalogueItemsHasManufacturerConnectionWhere>>;
  node?: InputMaybe<CatalogueItemWhere>;
};

export type ManufacturerCatalogueItemsHasManufacturerCreateFieldInput = {
  node: CatalogueItemCreateInput;
};

export type ManufacturerCatalogueItemsHasManufacturerDeleteFieldInput = {
  delete?: InputMaybe<CatalogueItemDeleteInput>;
  where?: InputMaybe<ManufacturerCatalogueItemsHasManufacturerConnectionWhere>;
};

export type ManufacturerCatalogueItemsHasManufacturerDisconnectFieldInput = {
  disconnect?: InputMaybe<CatalogueItemDisconnectInput>;
  where?: InputMaybe<ManufacturerCatalogueItemsHasManufacturerConnectionWhere>;
};

export type ManufacturerCatalogueItemsHasManufacturerFieldInput = {
  connect?: InputMaybe<Array<ManufacturerCatalogueItemsHasManufacturerConnectFieldInput>>;
  create?: InputMaybe<Array<ManufacturerCatalogueItemsHasManufacturerCreateFieldInput>>;
};

export type ManufacturerCatalogueItemsHasManufacturerNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<ManufacturerCatalogueItemsHasManufacturerNodeAggregationWhereInput>>;
  NOT?: InputMaybe<ManufacturerCatalogueItemsHasManufacturerNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<ManufacturerCatalogueItemsHasManufacturerNodeAggregationWhereInput>>;
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

export type ManufacturerCatalogueItemsHasManufacturerRelationship = {
  __typename?: 'ManufacturerCatalogueItemsHasManufacturerRelationship';
  cursor: Scalars['String']['output'];
  node: CatalogueItem;
};

export type ManufacturerCatalogueItemsHasManufacturerUpdateConnectionInput = {
  node?: InputMaybe<CatalogueItemUpdateInput>;
};

export type ManufacturerCatalogueItemsHasManufacturerUpdateFieldInput = {
  connect?: InputMaybe<Array<ManufacturerCatalogueItemsHasManufacturerConnectFieldInput>>;
  create?: InputMaybe<Array<ManufacturerCatalogueItemsHasManufacturerCreateFieldInput>>;
  delete?: InputMaybe<Array<ManufacturerCatalogueItemsHasManufacturerDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<ManufacturerCatalogueItemsHasManufacturerDisconnectFieldInput>>;
  update?: InputMaybe<ManufacturerCatalogueItemsHasManufacturerUpdateConnectionInput>;
  where?: InputMaybe<ManufacturerCatalogueItemsHasManufacturerConnectionWhere>;
};

export type ManufacturerConnectInput = {
  catalogueItemsHasManufacturer?: InputMaybe<Array<ManufacturerCatalogueItemsHasManufacturerConnectFieldInput>>;
};

export type ManufacturerConnectWhere = {
  node: ManufacturerWhere;
};

export type ManufacturerCreateInput = {
  catalogueItemsHasManufacturer?: InputMaybe<ManufacturerCatalogueItemsHasManufacturerFieldInput>;
  name: Scalars['String']['input'];
};

export type ManufacturerDeleteInput = {
  catalogueItemsHasManufacturer?: InputMaybe<Array<ManufacturerCatalogueItemsHasManufacturerDeleteFieldInput>>;
};

export type ManufacturerDisconnectInput = {
  catalogueItemsHasManufacturer?: InputMaybe<Array<ManufacturerCatalogueItemsHasManufacturerDisconnectFieldInput>>;
};

export type ManufacturerEdge = {
  __typename?: 'ManufacturerEdge';
  cursor: Scalars['String']['output'];
  node: Manufacturer;
};

export type ManufacturerOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /** Specify one or more ManufacturerSort objects to sort Manufacturers by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<ManufacturerSort>>;
};

export type ManufacturerRelationInput = {
  catalogueItemsHasManufacturer?: InputMaybe<Array<ManufacturerCatalogueItemsHasManufacturerCreateFieldInput>>;
};

/** Fields to sort Manufacturers by. The order in which sorts are applied is not guaranteed when specifying many fields in one ManufacturerSort object. */
export type ManufacturerSort = {
  name?: InputMaybe<SortDirection>;
};

export type ManufacturerUpdateInput = {
  catalogueItemsHasManufacturer?: InputMaybe<Array<ManufacturerCatalogueItemsHasManufacturerUpdateFieldInput>>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type ManufacturerWhere = {
  AND?: InputMaybe<Array<ManufacturerWhere>>;
  NOT?: InputMaybe<ManufacturerWhere>;
  OR?: InputMaybe<Array<ManufacturerWhere>>;
  catalogueItemsHasManufacturerAggregate?: InputMaybe<ManufacturerCatalogueItemsHasManufacturerAggregateInput>;
  /** Return Manufacturers where all of the related ManufacturerCatalogueItemsHasManufacturerConnections match this filter */
  catalogueItemsHasManufacturerConnection_ALL?: InputMaybe<ManufacturerCatalogueItemsHasManufacturerConnectionWhere>;
  /** Return Manufacturers where none of the related ManufacturerCatalogueItemsHasManufacturerConnections match this filter */
  catalogueItemsHasManufacturerConnection_NONE?: InputMaybe<ManufacturerCatalogueItemsHasManufacturerConnectionWhere>;
  /** Return Manufacturers where one of the related ManufacturerCatalogueItemsHasManufacturerConnections match this filter */
  catalogueItemsHasManufacturerConnection_SINGLE?: InputMaybe<ManufacturerCatalogueItemsHasManufacturerConnectionWhere>;
  /** Return Manufacturers where some of the related ManufacturerCatalogueItemsHasManufacturerConnections match this filter */
  catalogueItemsHasManufacturerConnection_SOME?: InputMaybe<ManufacturerCatalogueItemsHasManufacturerConnectionWhere>;
  /** Return Manufacturers where all of the related CatalogueItems match this filter */
  catalogueItemsHasManufacturer_ALL?: InputMaybe<CatalogueItemWhere>;
  /** Return Manufacturers where none of the related CatalogueItems match this filter */
  catalogueItemsHasManufacturer_NONE?: InputMaybe<CatalogueItemWhere>;
  /** Return Manufacturers where one of the related CatalogueItems match this filter */
  catalogueItemsHasManufacturer_SINGLE?: InputMaybe<CatalogueItemWhere>;
  /** Return Manufacturers where some of the related CatalogueItems match this filter */
  catalogueItemsHasManufacturer_SOME?: InputMaybe<CatalogueItemWhere>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
};

export type ManufacturersConnection = {
  __typename?: 'ManufacturersConnection';
  edges: Array<ManufacturerEdge>;
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
  createLocations: CreateLocationsMutationResponse;
  createManufacturers: CreateManufacturersMutationResponse;
  createParentPathItems: CreateParentPathItemsMutationResponse;
  createRoles: CreateRolesMutationResponse;
  createRoomCards: CreateRoomCardsMutationResponse;
  createSchemaMigrations: CreateSchemaMigrationsMutationResponse;
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
  deleteLocations: DeleteInfo;
  deleteManufacturers: DeleteInfo;
  deleteParentPathItems: DeleteInfo;
  deleteRoles: DeleteInfo;
  deleteRoomCards: DeleteInfo;
  deleteSchemaMigrations: DeleteInfo;
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
  updateLocations: UpdateLocationsMutationResponse;
  updateManufacturers: UpdateManufacturersMutationResponse;
  updateParentPathItems: UpdateParentPathItemsMutationResponse;
  updateRoles: UpdateRolesMutationResponse;
  updateRoomCards: UpdateRoomCardsMutationResponse;
  updateSchemaMigrations: UpdateSchemaMigrationsMutationResponse;
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


export type MutationCreateLocationsArgs = {
  input: Array<LocationCreateInput>;
};


export type MutationCreateManufacturersArgs = {
  input: Array<ManufacturerCreateInput>;
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


export type MutationDeleteLocationsArgs = {
  delete?: InputMaybe<LocationDeleteInput>;
  where?: InputMaybe<LocationWhere>;
};


export type MutationDeleteManufacturersArgs = {
  delete?: InputMaybe<ManufacturerDeleteInput>;
  where?: InputMaybe<ManufacturerWhere>;
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
  delete?: InputMaybe<TeamDeleteInput>;
  where?: InputMaybe<TeamWhere>;
};


export type MutationDeleteUnitsArgs = {
  delete?: InputMaybe<UnitDeleteInput>;
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
  connectOrCreate?: InputMaybe<FacilityConnectOrCreateInput>;
  create?: InputMaybe<FacilityRelationInput>;
  delete?: InputMaybe<FacilityDeleteInput>;
  disconnect?: InputMaybe<FacilityDisconnectInput>;
  update?: InputMaybe<FacilityUpdateInput>;
  where?: InputMaybe<FacilityWhere>;
};


export type MutationUpdateHallContactPeopleArgs = {
  connect?: InputMaybe<HallContactPersonConnectInput>;
  connectOrCreate?: InputMaybe<HallContactPersonConnectOrCreateInput>;
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


export type MutationUpdateLocationsArgs = {
  connect?: InputMaybe<LocationConnectInput>;
  connectOrCreate?: InputMaybe<LocationConnectOrCreateInput>;
  create?: InputMaybe<LocationRelationInput>;
  delete?: InputMaybe<LocationDeleteInput>;
  disconnect?: InputMaybe<LocationDisconnectInput>;
  update?: InputMaybe<LocationUpdateInput>;
  where?: InputMaybe<LocationWhere>;
};


export type MutationUpdateManufacturersArgs = {
  connect?: InputMaybe<ManufacturerConnectInput>;
  create?: InputMaybe<ManufacturerRelationInput>;
  delete?: InputMaybe<ManufacturerDeleteInput>;
  disconnect?: InputMaybe<ManufacturerDisconnectInput>;
  update?: InputMaybe<ManufacturerUpdateInput>;
  where?: InputMaybe<ManufacturerWhere>;
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
  connectOrCreate?: InputMaybe<RoomCardConnectOrCreateInput>;
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
  connect?: InputMaybe<TeamConnectInput>;
  create?: InputMaybe<TeamRelationInput>;
  delete?: InputMaybe<TeamDeleteInput>;
  disconnect?: InputMaybe<TeamDisconnectInput>;
  update?: InputMaybe<TeamUpdateInput>;
  where?: InputMaybe<TeamWhere>;
};


export type MutationUpdateUnitsArgs = {
  connect?: InputMaybe<UnitConnectInput>;
  create?: InputMaybe<UnitRelationInput>;
  delete?: InputMaybe<UnitDeleteInput>;
  disconnect?: InputMaybe<UnitDisconnectInput>;
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
  uid?: Maybe<Scalars['String']['output']>;
};

export type ParentPathItemAggregateSelection = {
  __typename?: 'ParentPathItemAggregateSelection';
  count: Scalars['Int']['output'];
  name: StringAggregateSelectionNullable;
  uid: StringAggregateSelectionNullable;
};

export type ParentPathItemCreateInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  uid?: InputMaybe<Scalars['String']['input']>;
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
  uid?: InputMaybe<Scalars['String']['input']>;
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
  uid?: InputMaybe<Scalars['String']['input']>;
  uid_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  uid_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  uid_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  uid_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
};

export type ParentPathItemsConnection = {
  __typename?: 'ParentPathItemsConnection';
  edges: Array<ParentPathItemEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

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
  locations: Array<Location>;
  locationsAggregate: LocationAggregateSelection;
  locationsConnection: LocationsConnection;
  manufacturers: Array<Manufacturer>;
  manufacturersAggregate: ManufacturerAggregateSelection;
  manufacturersConnection: ManufacturersConnection;
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


export type QueryManufacturersArgs = {
  options?: InputMaybe<ManufacturerOptions>;
  where?: InputMaybe<ManufacturerWhere>;
};


export type QueryManufacturersAggregateArgs = {
  where?: InputMaybe<ManufacturerWhere>;
};


export type QueryManufacturersConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<InputMaybe<ManufacturerSort>>>;
  where?: InputMaybe<ManufacturerWhere>;
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
  uid: Scalars['String']['output'];
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
  uid: StringAggregateSelectionNonNullable;
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
  uid: Scalars['String']['input'];
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
  uid?: InputMaybe<Scalars['String']['input']>;
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
  uid: StringAggregateSelectionNonNullable;
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
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
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
  uid?: InputMaybe<Scalars['String']['input']>;
  uid_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  uid_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  uid_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  uid_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
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
  cleaningShedule?: Maybe<Scalars['String']['output']>;
  contactPersonsDept: Array<Employee>;
  contactPersonsDeptAggregate?: Maybe<RoomCardEmployeeContactPersonsDeptAggregationSelection>;
  contactPersonsDeptConnection: RoomCardContactPersonsDeptConnection;
  contactPersonsHall: Array<HallContactPerson>;
  contactPersonsHallAggregate?: Maybe<RoomCardHallContactPersonContactPersonsHallAggregationSelection>;
  contactPersonsHallConnection: RoomCardContactPersonsHallConnection;
  coolingWater?: Maybe<Scalars['String']['output']>;
  copressedAirDistribution?: Maybe<Scalars['String']['output']>;
  entryToHvacTent?: Maybe<Scalars['String']['output']>;
  humidity?: Maybe<Scalars['String']['output']>;
  indoorEnvironmentQueality?: Maybe<Scalars['String']['output']>;
  location: Location;
  locationAggregate?: Maybe<RoomCardLocationLocationAggregationSelection>;
  locationConnection: RoomCardLocationConnection;
  maxPressureInColdDistribution?: Maybe<Scalars['String']['output']>;
  nitrogenCentralDistribution?: Maybe<Scalars['String']['output']>;
  prescribedClothing?: Maybe<Scalars['String']['output']>;
  pressureInCoolingSystem?: Maybe<Scalars['String']['output']>;
  purityClass?: Maybe<Scalars['String']['output']>;
  roomTemperature?: Maybe<Scalars['String']['output']>;
  status: RoomCardStatus;
  team: Array<Team>;
  teamAggregate?: Maybe<RoomCardTeamTeamAggregationSelection>;
  teamConnection: RoomCardTeamConnection;
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
  where?: InputMaybe<RoomCardContactPersonsHallConnectionWhere>;
};


export type RoomCardLocationArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<LocationOptions>;
  where?: InputMaybe<LocationWhere>;
};


export type RoomCardLocationAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<LocationWhere>;
};


export type RoomCardLocationConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<RoomCardLocationConnectionSort>>;
  where?: InputMaybe<RoomCardLocationConnectionWhere>;
};


export type RoomCardTeamArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<TeamOptions>;
  where?: InputMaybe<TeamWhere>;
};


export type RoomCardTeamAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<TeamWhere>;
};


export type RoomCardTeamConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<RoomCardTeamConnectionSort>>;
  where?: InputMaybe<RoomCardTeamConnectionWhere>;
};

export type RoomCardAggregateSelection = {
  __typename?: 'RoomCardAggregateSelection';
  additionalRequirements: StringAggregateSelectionNullable;
  cleaningShedule: StringAggregateSelectionNullable;
  coolingWater: StringAggregateSelectionNullable;
  copressedAirDistribution: StringAggregateSelectionNullable;
  count: Scalars['Int']['output'];
  entryToHvacTent: StringAggregateSelectionNullable;
  humidity: StringAggregateSelectionNullable;
  indoorEnvironmentQueality: StringAggregateSelectionNullable;
  maxPressureInColdDistribution: StringAggregateSelectionNullable;
  nitrogenCentralDistribution: StringAggregateSelectionNullable;
  prescribedClothing: StringAggregateSelectionNullable;
  pressureInCoolingSystem: StringAggregateSelectionNullable;
  purityClass: StringAggregateSelectionNullable;
  roomTemperature: StringAggregateSelectionNullable;
  uid: IdAggregateSelectionNonNullable;
};

export type RoomCardConnectInput = {
  contactPersonsDept?: InputMaybe<Array<RoomCardContactPersonsDeptConnectFieldInput>>;
  contactPersonsHall?: InputMaybe<Array<RoomCardContactPersonsHallConnectFieldInput>>;
  location?: InputMaybe<RoomCardLocationConnectFieldInput>;
  team?: InputMaybe<Array<RoomCardTeamConnectFieldInput>>;
};

export type RoomCardConnectOrCreateInput = {
  location?: InputMaybe<RoomCardLocationConnectOrCreateFieldInput>;
};

export type RoomCardConnectOrCreateWhere = {
  node: RoomCardUniqueWhere;
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
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
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
};

export type RoomCardContactPersonsHallConnectFieldInput = {
  connect?: InputMaybe<Array<HallContactPersonConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<HallContactPersonConnectWhere>;
};

export type RoomCardContactPersonsHallConnection = {
  __typename?: 'RoomCardContactPersonsHallConnection';
  edges: Array<RoomCardContactPersonsHallRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
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
  cleaningShedule?: InputMaybe<Scalars['String']['input']>;
  contactPersonsDept?: InputMaybe<RoomCardContactPersonsDeptFieldInput>;
  contactPersonsHall?: InputMaybe<RoomCardContactPersonsHallFieldInput>;
  coolingWater?: InputMaybe<Scalars['String']['input']>;
  copressedAirDistribution?: InputMaybe<Scalars['String']['input']>;
  entryToHvacTent?: InputMaybe<Scalars['String']['input']>;
  humidity?: InputMaybe<Scalars['String']['input']>;
  indoorEnvironmentQueality?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<RoomCardLocationFieldInput>;
  maxPressureInColdDistribution?: InputMaybe<Scalars['String']['input']>;
  nitrogenCentralDistribution?: InputMaybe<Scalars['String']['input']>;
  prescribedClothing?: InputMaybe<Scalars['String']['input']>;
  pressureInCoolingSystem?: InputMaybe<Scalars['String']['input']>;
  purityClass?: InputMaybe<Scalars['String']['input']>;
  roomTemperature?: InputMaybe<Scalars['String']['input']>;
  status: RoomCardStatus;
  team?: InputMaybe<RoomCardTeamFieldInput>;
};

export type RoomCardDeleteInput = {
  contactPersonsDept?: InputMaybe<Array<RoomCardContactPersonsDeptDeleteFieldInput>>;
  contactPersonsHall?: InputMaybe<Array<RoomCardContactPersonsHallDeleteFieldInput>>;
  location?: InputMaybe<RoomCardLocationDeleteFieldInput>;
  team?: InputMaybe<Array<RoomCardTeamDeleteFieldInput>>;
};

export type RoomCardDisconnectInput = {
  contactPersonsDept?: InputMaybe<Array<RoomCardContactPersonsDeptDisconnectFieldInput>>;
  contactPersonsHall?: InputMaybe<Array<RoomCardContactPersonsHallDisconnectFieldInput>>;
  location?: InputMaybe<RoomCardLocationDisconnectFieldInput>;
  team?: InputMaybe<Array<RoomCardTeamDisconnectFieldInput>>;
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
  lastName: StringAggregateSelectionNonNullable;
  phoneNumber: StringAggregateSelectionNullable;
  uid: StringAggregateSelectionNonNullable;
};

export type RoomCardHallContactPersonContactPersonsHallAggregationSelection = {
  __typename?: 'RoomCardHallContactPersonContactPersonsHallAggregationSelection';
  count: Scalars['Int']['output'];
};

export type RoomCardLocationAggregateInput = {
  AND?: InputMaybe<Array<RoomCardLocationAggregateInput>>;
  NOT?: InputMaybe<RoomCardLocationAggregateInput>;
  OR?: InputMaybe<Array<RoomCardLocationAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<RoomCardLocationNodeAggregationWhereInput>;
};

export type RoomCardLocationConnectFieldInput = {
  connect?: InputMaybe<LocationConnectInput>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<LocationConnectWhere>;
};

export type RoomCardLocationConnectOrCreateFieldInput = {
  onCreate: RoomCardLocationConnectOrCreateFieldInputOnCreate;
  where: LocationConnectOrCreateWhere;
};

export type RoomCardLocationConnectOrCreateFieldInputOnCreate = {
  node: LocationOnCreateInput;
};

export type RoomCardLocationConnection = {
  __typename?: 'RoomCardLocationConnection';
  edges: Array<RoomCardLocationRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type RoomCardLocationConnectionSort = {
  node?: InputMaybe<LocationSort>;
};

export type RoomCardLocationConnectionWhere = {
  AND?: InputMaybe<Array<RoomCardLocationConnectionWhere>>;
  NOT?: InputMaybe<RoomCardLocationConnectionWhere>;
  OR?: InputMaybe<Array<RoomCardLocationConnectionWhere>>;
  node?: InputMaybe<LocationWhere>;
};

export type RoomCardLocationCreateFieldInput = {
  node: LocationCreateInput;
};

export type RoomCardLocationDeleteFieldInput = {
  delete?: InputMaybe<LocationDeleteInput>;
  where?: InputMaybe<RoomCardLocationConnectionWhere>;
};

export type RoomCardLocationDisconnectFieldInput = {
  disconnect?: InputMaybe<LocationDisconnectInput>;
  where?: InputMaybe<RoomCardLocationConnectionWhere>;
};

export type RoomCardLocationFieldInput = {
  connect?: InputMaybe<RoomCardLocationConnectFieldInput>;
  connectOrCreate?: InputMaybe<RoomCardLocationConnectOrCreateFieldInput>;
  create?: InputMaybe<RoomCardLocationCreateFieldInput>;
};

export type RoomCardLocationLocationAggregationSelection = {
  __typename?: 'RoomCardLocationLocationAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<RoomCardLocationLocationNodeAggregateSelection>;
};

export type RoomCardLocationLocationNodeAggregateSelection = {
  __typename?: 'RoomCardLocationLocationNodeAggregateSelection';
  code: StringAggregateSelectionNullable;
  facility: StringAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  uid: IdAggregateSelectionNonNullable;
};

export type RoomCardLocationNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<RoomCardLocationNodeAggregationWhereInput>>;
  NOT?: InputMaybe<RoomCardLocationNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<RoomCardLocationNodeAggregationWhereInput>>;
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
  facility_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  facility_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  facility_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  facility_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  facility_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  facility_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  facility_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  facility_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  facility_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  facility_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  facility_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  facility_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  facility_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  facility_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  facility_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
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

export type RoomCardLocationRelationship = {
  __typename?: 'RoomCardLocationRelationship';
  cursor: Scalars['String']['output'];
  node: Location;
};

export type RoomCardLocationUpdateConnectionInput = {
  node?: InputMaybe<LocationUpdateInput>;
};

export type RoomCardLocationUpdateFieldInput = {
  connect?: InputMaybe<RoomCardLocationConnectFieldInput>;
  connectOrCreate?: InputMaybe<RoomCardLocationConnectOrCreateFieldInput>;
  create?: InputMaybe<RoomCardLocationCreateFieldInput>;
  delete?: InputMaybe<RoomCardLocationDeleteFieldInput>;
  disconnect?: InputMaybe<RoomCardLocationDisconnectFieldInput>;
  update?: InputMaybe<RoomCardLocationUpdateConnectionInput>;
  where?: InputMaybe<RoomCardLocationConnectionWhere>;
};

export type RoomCardOnCreateInput = {
  additionalRequirements?: InputMaybe<Scalars['String']['input']>;
  cleaningShedule?: InputMaybe<Scalars['String']['input']>;
  coolingWater?: InputMaybe<Scalars['String']['input']>;
  copressedAirDistribution?: InputMaybe<Scalars['String']['input']>;
  entryToHvacTent?: InputMaybe<Scalars['String']['input']>;
  humidity?: InputMaybe<Scalars['String']['input']>;
  indoorEnvironmentQueality?: InputMaybe<Scalars['String']['input']>;
  maxPressureInColdDistribution?: InputMaybe<Scalars['String']['input']>;
  nitrogenCentralDistribution?: InputMaybe<Scalars['String']['input']>;
  prescribedClothing?: InputMaybe<Scalars['String']['input']>;
  pressureInCoolingSystem?: InputMaybe<Scalars['String']['input']>;
  purityClass?: InputMaybe<Scalars['String']['input']>;
  roomTemperature?: InputMaybe<Scalars['String']['input']>;
  status: RoomCardStatus;
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
  location?: InputMaybe<RoomCardLocationCreateFieldInput>;
  team?: InputMaybe<Array<RoomCardTeamCreateFieldInput>>;
};

/** Fields to sort RoomCards by. The order in which sorts are applied is not guaranteed when specifying many fields in one RoomCardSort object. */
export type RoomCardSort = {
  additionalRequirements?: InputMaybe<SortDirection>;
  cleaningShedule?: InputMaybe<SortDirection>;
  coolingWater?: InputMaybe<SortDirection>;
  copressedAirDistribution?: InputMaybe<SortDirection>;
  entryToHvacTent?: InputMaybe<SortDirection>;
  humidity?: InputMaybe<SortDirection>;
  indoorEnvironmentQueality?: InputMaybe<SortDirection>;
  maxPressureInColdDistribution?: InputMaybe<SortDirection>;
  nitrogenCentralDistribution?: InputMaybe<SortDirection>;
  prescribedClothing?: InputMaybe<SortDirection>;
  pressureInCoolingSystem?: InputMaybe<SortDirection>;
  purityClass?: InputMaybe<SortDirection>;
  roomTemperature?: InputMaybe<SortDirection>;
  status?: InputMaybe<SortDirection>;
  uid?: InputMaybe<SortDirection>;
};

export enum RoomCardStatus {
  CleanMode = 'CLEAN_MODE',
  DirtyMode = 'DIRTY_MODE',
  InPreparationMode = 'IN_PREPARATION_MODE'
}

export type RoomCardTeamAggregateInput = {
  AND?: InputMaybe<Array<RoomCardTeamAggregateInput>>;
  NOT?: InputMaybe<RoomCardTeamAggregateInput>;
  OR?: InputMaybe<Array<RoomCardTeamAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<RoomCardTeamNodeAggregationWhereInput>;
};

export type RoomCardTeamConnectFieldInput = {
  connect?: InputMaybe<Array<TeamConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<TeamConnectWhere>;
};

export type RoomCardTeamConnection = {
  __typename?: 'RoomCardTeamConnection';
  edges: Array<RoomCardTeamRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type RoomCardTeamConnectionSort = {
  node?: InputMaybe<TeamSort>;
};

export type RoomCardTeamConnectionWhere = {
  AND?: InputMaybe<Array<RoomCardTeamConnectionWhere>>;
  NOT?: InputMaybe<RoomCardTeamConnectionWhere>;
  OR?: InputMaybe<Array<RoomCardTeamConnectionWhere>>;
  node?: InputMaybe<TeamWhere>;
};

export type RoomCardTeamCreateFieldInput = {
  node: TeamCreateInput;
};

export type RoomCardTeamDeleteFieldInput = {
  delete?: InputMaybe<TeamDeleteInput>;
  where?: InputMaybe<RoomCardTeamConnectionWhere>;
};

export type RoomCardTeamDisconnectFieldInput = {
  disconnect?: InputMaybe<TeamDisconnectInput>;
  where?: InputMaybe<RoomCardTeamConnectionWhere>;
};

export type RoomCardTeamFieldInput = {
  connect?: InputMaybe<Array<RoomCardTeamConnectFieldInput>>;
  create?: InputMaybe<Array<RoomCardTeamCreateFieldInput>>;
};

export type RoomCardTeamNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<RoomCardTeamNodeAggregationWhereInput>>;
  NOT?: InputMaybe<RoomCardTeamNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<RoomCardTeamNodeAggregationWhereInput>>;
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

export type RoomCardTeamRelationship = {
  __typename?: 'RoomCardTeamRelationship';
  cursor: Scalars['String']['output'];
  node: Team;
};

export type RoomCardTeamTeamAggregationSelection = {
  __typename?: 'RoomCardTeamTeamAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<RoomCardTeamTeamNodeAggregateSelection>;
};

export type RoomCardTeamTeamNodeAggregateSelection = {
  __typename?: 'RoomCardTeamTeamNodeAggregateSelection';
  name: StringAggregateSelectionNonNullable;
  uid: StringAggregateSelectionNonNullable;
};

export type RoomCardTeamUpdateConnectionInput = {
  node?: InputMaybe<TeamUpdateInput>;
};

export type RoomCardTeamUpdateFieldInput = {
  connect?: InputMaybe<Array<RoomCardTeamConnectFieldInput>>;
  create?: InputMaybe<Array<RoomCardTeamCreateFieldInput>>;
  delete?: InputMaybe<Array<RoomCardTeamDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<RoomCardTeamDisconnectFieldInput>>;
  update?: InputMaybe<RoomCardTeamUpdateConnectionInput>;
  where?: InputMaybe<RoomCardTeamConnectionWhere>;
};

export type RoomCardUniqueWhere = {
  uid?: InputMaybe<Scalars['ID']['input']>;
};

export type RoomCardUpdateInput = {
  additionalRequirements?: InputMaybe<Scalars['String']['input']>;
  cleaningShedule?: InputMaybe<Scalars['String']['input']>;
  contactPersonsDept?: InputMaybe<Array<RoomCardContactPersonsDeptUpdateFieldInput>>;
  contactPersonsHall?: InputMaybe<Array<RoomCardContactPersonsHallUpdateFieldInput>>;
  coolingWater?: InputMaybe<Scalars['String']['input']>;
  copressedAirDistribution?: InputMaybe<Scalars['String']['input']>;
  entryToHvacTent?: InputMaybe<Scalars['String']['input']>;
  humidity?: InputMaybe<Scalars['String']['input']>;
  indoorEnvironmentQueality?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<RoomCardLocationUpdateFieldInput>;
  maxPressureInColdDistribution?: InputMaybe<Scalars['String']['input']>;
  nitrogenCentralDistribution?: InputMaybe<Scalars['String']['input']>;
  prescribedClothing?: InputMaybe<Scalars['String']['input']>;
  pressureInCoolingSystem?: InputMaybe<Scalars['String']['input']>;
  purityClass?: InputMaybe<Scalars['String']['input']>;
  roomTemperature?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<RoomCardStatus>;
  team?: InputMaybe<Array<RoomCardTeamUpdateFieldInput>>;
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
  cleaningShedule?: InputMaybe<Scalars['String']['input']>;
  cleaningShedule_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  cleaningShedule_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  cleaningShedule_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  cleaningShedule_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
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
  coolingWater_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  coolingWater_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  coolingWater_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  coolingWater_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  copressedAirDistribution?: InputMaybe<Scalars['String']['input']>;
  copressedAirDistribution_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  copressedAirDistribution_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  copressedAirDistribution_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  copressedAirDistribution_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  entryToHvacTent?: InputMaybe<Scalars['String']['input']>;
  entryToHvacTent_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  entryToHvacTent_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  entryToHvacTent_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  entryToHvacTent_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  humidity?: InputMaybe<Scalars['String']['input']>;
  humidity_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  humidity_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  humidity_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  humidity_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  indoorEnvironmentQueality?: InputMaybe<Scalars['String']['input']>;
  indoorEnvironmentQueality_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  indoorEnvironmentQueality_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  indoorEnvironmentQueality_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  indoorEnvironmentQueality_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<LocationWhere>;
  locationAggregate?: InputMaybe<RoomCardLocationAggregateInput>;
  locationConnection?: InputMaybe<RoomCardLocationConnectionWhere>;
  locationConnection_NOT?: InputMaybe<RoomCardLocationConnectionWhere>;
  location_NOT?: InputMaybe<LocationWhere>;
  maxPressureInColdDistribution?: InputMaybe<Scalars['String']['input']>;
  maxPressureInColdDistribution_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  maxPressureInColdDistribution_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  maxPressureInColdDistribution_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  maxPressureInColdDistribution_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  nitrogenCentralDistribution?: InputMaybe<Scalars['String']['input']>;
  nitrogenCentralDistribution_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  nitrogenCentralDistribution_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  nitrogenCentralDistribution_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  nitrogenCentralDistribution_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  prescribedClothing?: InputMaybe<Scalars['String']['input']>;
  prescribedClothing_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  prescribedClothing_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  prescribedClothing_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  prescribedClothing_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  pressureInCoolingSystem?: InputMaybe<Scalars['String']['input']>;
  pressureInCoolingSystem_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  pressureInCoolingSystem_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  pressureInCoolingSystem_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  pressureInCoolingSystem_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  purityClass?: InputMaybe<Scalars['String']['input']>;
  purityClass_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  purityClass_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  purityClass_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  purityClass_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  roomTemperature?: InputMaybe<Scalars['String']['input']>;
  roomTemperature_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  roomTemperature_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  roomTemperature_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  roomTemperature_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<RoomCardStatus>;
  status_IN?: InputMaybe<Array<RoomCardStatus>>;
  teamAggregate?: InputMaybe<RoomCardTeamAggregateInput>;
  /** Return RoomCards where all of the related RoomCardTeamConnections match this filter */
  teamConnection_ALL?: InputMaybe<RoomCardTeamConnectionWhere>;
  /** Return RoomCards where none of the related RoomCardTeamConnections match this filter */
  teamConnection_NONE?: InputMaybe<RoomCardTeamConnectionWhere>;
  /** Return RoomCards where one of the related RoomCardTeamConnections match this filter */
  teamConnection_SINGLE?: InputMaybe<RoomCardTeamConnectionWhere>;
  /** Return RoomCards where some of the related RoomCardTeamConnections match this filter */
  teamConnection_SOME?: InputMaybe<RoomCardTeamConnectionWhere>;
  /** Return RoomCards where all of the related Teams match this filter */
  team_ALL?: InputMaybe<TeamWhere>;
  /** Return RoomCards where none of the related Teams match this filter */
  team_NONE?: InputMaybe<TeamWhere>;
  /** Return RoomCards where one of the related Teams match this filter */
  team_SINGLE?: InputMaybe<TeamWhere>;
  /** Return RoomCards where some of the related Teams match this filter */
  team_SOME?: InputMaybe<TeamWhere>;
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
  ts: Scalars['DateTime']['output'];
  version: Scalars['BigInt']['output'];
};

export type SchemaMigrationAggregateSelection = {
  __typename?: 'SchemaMigrationAggregateSelection';
  count: Scalars['Int']['output'];
  ts: DateTimeAggregateSelectionNonNullable;
  version: BigIntAggregateSelectionNonNullable;
};

export type SchemaMigrationCreateInput = {
  dirty: Scalars['Boolean']['input'];
  ts: Scalars['DateTime']['input'];
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
  ts?: InputMaybe<Scalars['DateTime']['input']>;
  version?: InputMaybe<Scalars['BigInt']['input']>;
  version_DECREMENT?: InputMaybe<Scalars['BigInt']['input']>;
  version_INCREMENT?: InputMaybe<Scalars['BigInt']['input']>;
};

export type SchemaMigrationWhere = {
  AND?: InputMaybe<Array<SchemaMigrationWhere>>;
  NOT?: InputMaybe<SchemaMigrationWhere>;
  OR?: InputMaybe<Array<SchemaMigrationWhere>>;
  dirty?: InputMaybe<Scalars['Boolean']['input']>;
  ts?: InputMaybe<Scalars['DateTime']['input']>;
  ts_GT?: InputMaybe<Scalars['DateTime']['input']>;
  ts_GTE?: InputMaybe<Scalars['DateTime']['input']>;
  ts_IN?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  ts_LT?: InputMaybe<Scalars['DateTime']['input']>;
  ts_LTE?: InputMaybe<Scalars['DateTime']['input']>;
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

export type System = {
  __typename?: 'System';
  description: Scalars['String']['output'];
  hasSubsystemSystems: Array<System>;
  hasSubsystemSystemsAggregate?: Maybe<SystemSystemHasSubsystemSystemsAggregationSelection>;
  hasSubsystemSystemsConnection: SystemHasSubsystemSystemsConnection;
  image?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  systemAlias: Scalars['String']['output'];
  systemCode: Scalars['String']['output'];
  systemsHasSubsystem: Array<System>;
  systemsHasSubsystemAggregate?: Maybe<SystemSystemSystemsHasSubsystemAggregationSelection>;
  systemsHasSubsystemConnection: SystemSystemsHasSubsystemConnection;
  uid: Scalars['String']['output'];
};


export type SystemHasSubsystemSystemsArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<SystemOptions>;
  where?: InputMaybe<SystemWhere>;
};


export type SystemHasSubsystemSystemsAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<SystemWhere>;
};


export type SystemHasSubsystemSystemsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<SystemHasSubsystemSystemsConnectionSort>>;
  where?: InputMaybe<SystemHasSubsystemSystemsConnectionWhere>;
};


export type SystemSystemsHasSubsystemArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<SystemOptions>;
  where?: InputMaybe<SystemWhere>;
};


export type SystemSystemsHasSubsystemAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<SystemWhere>;
};


export type SystemSystemsHasSubsystemConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<SystemSystemsHasSubsystemConnectionSort>>;
  where?: InputMaybe<SystemSystemsHasSubsystemConnectionWhere>;
};

export type SystemAggregateSelection = {
  __typename?: 'SystemAggregateSelection';
  count: Scalars['Int']['output'];
  description: StringAggregateSelectionNonNullable;
  image: StringAggregateSelectionNullable;
  name: StringAggregateSelectionNonNullable;
  systemAlias: StringAggregateSelectionNonNullable;
  systemCode: StringAggregateSelectionNonNullable;
  uid: StringAggregateSelectionNonNullable;
};

export type SystemConnectInput = {
  hasSubsystemSystems?: InputMaybe<Array<SystemHasSubsystemSystemsConnectFieldInput>>;
  systemsHasSubsystem?: InputMaybe<Array<SystemSystemsHasSubsystemConnectFieldInput>>;
};

export type SystemConnectWhere = {
  node: SystemWhere;
};

export type SystemCreateInput = {
  description: Scalars['String']['input'];
  hasSubsystemSystems?: InputMaybe<SystemHasSubsystemSystemsFieldInput>;
  image?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  systemAlias: Scalars['String']['input'];
  systemCode: Scalars['String']['input'];
  systemsHasSubsystem?: InputMaybe<SystemSystemsHasSubsystemFieldInput>;
  uid: Scalars['String']['input'];
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
  uid: Scalars['String']['output'];
};

export type SystemCriticalityAggregateSelection = {
  __typename?: 'SystemCriticalityAggregateSelection';
  code: StringAggregateSelectionNonNullable;
  count: Scalars['Int']['output'];
  name: StringAggregateSelectionNonNullable;
  uid: StringAggregateSelectionNonNullable;
};

export type SystemCriticalityCreateInput = {
  code: Scalars['String']['input'];
  name: Scalars['String']['input'];
  uid: Scalars['String']['input'];
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
  uid?: InputMaybe<Scalars['String']['input']>;
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
  uid?: InputMaybe<Scalars['String']['input']>;
  uid_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  uid_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  uid_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  uid_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
};

export type SystemDeleteInput = {
  hasSubsystemSystems?: InputMaybe<Array<SystemHasSubsystemSystemsDeleteFieldInput>>;
  systemsHasSubsystem?: InputMaybe<Array<SystemSystemsHasSubsystemDeleteFieldInput>>;
};

export type SystemDisconnectInput = {
  hasSubsystemSystems?: InputMaybe<Array<SystemHasSubsystemSystemsDisconnectFieldInput>>;
  systemsHasSubsystem?: InputMaybe<Array<SystemSystemsHasSubsystemDisconnectFieldInput>>;
};

export type SystemEdge = {
  __typename?: 'SystemEdge';
  cursor: Scalars['String']['output'];
  node: System;
};

export type SystemHasSubsystemSystemsAggregateInput = {
  AND?: InputMaybe<Array<SystemHasSubsystemSystemsAggregateInput>>;
  NOT?: InputMaybe<SystemHasSubsystemSystemsAggregateInput>;
  OR?: InputMaybe<Array<SystemHasSubsystemSystemsAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<SystemHasSubsystemSystemsNodeAggregationWhereInput>;
};

export type SystemHasSubsystemSystemsConnectFieldInput = {
  connect?: InputMaybe<Array<SystemConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<SystemConnectWhere>;
};

export type SystemHasSubsystemSystemsConnection = {
  __typename?: 'SystemHasSubsystemSystemsConnection';
  edges: Array<SystemHasSubsystemSystemsRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type SystemHasSubsystemSystemsConnectionSort = {
  node?: InputMaybe<SystemSort>;
};

export type SystemHasSubsystemSystemsConnectionWhere = {
  AND?: InputMaybe<Array<SystemHasSubsystemSystemsConnectionWhere>>;
  NOT?: InputMaybe<SystemHasSubsystemSystemsConnectionWhere>;
  OR?: InputMaybe<Array<SystemHasSubsystemSystemsConnectionWhere>>;
  node?: InputMaybe<SystemWhere>;
};

export type SystemHasSubsystemSystemsCreateFieldInput = {
  node: SystemCreateInput;
};

export type SystemHasSubsystemSystemsDeleteFieldInput = {
  delete?: InputMaybe<SystemDeleteInput>;
  where?: InputMaybe<SystemHasSubsystemSystemsConnectionWhere>;
};

export type SystemHasSubsystemSystemsDisconnectFieldInput = {
  disconnect?: InputMaybe<SystemDisconnectInput>;
  where?: InputMaybe<SystemHasSubsystemSystemsConnectionWhere>;
};

export type SystemHasSubsystemSystemsFieldInput = {
  connect?: InputMaybe<Array<SystemHasSubsystemSystemsConnectFieldInput>>;
  create?: InputMaybe<Array<SystemHasSubsystemSystemsCreateFieldInput>>;
};

export type SystemHasSubsystemSystemsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<SystemHasSubsystemSystemsNodeAggregationWhereInput>>;
  NOT?: InputMaybe<SystemHasSubsystemSystemsNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<SystemHasSubsystemSystemsNodeAggregationWhereInput>>;
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
  image_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  image_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  image_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  image_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  image_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  image_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  image_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  image_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  image_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  image_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  image_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  image_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  image_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  image_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  image_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
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

export type SystemHasSubsystemSystemsRelationship = {
  __typename?: 'SystemHasSubsystemSystemsRelationship';
  cursor: Scalars['String']['output'];
  node: System;
};

export type SystemHasSubsystemSystemsUpdateConnectionInput = {
  node?: InputMaybe<SystemUpdateInput>;
};

export type SystemHasSubsystemSystemsUpdateFieldInput = {
  connect?: InputMaybe<Array<SystemHasSubsystemSystemsConnectFieldInput>>;
  create?: InputMaybe<Array<SystemHasSubsystemSystemsCreateFieldInput>>;
  delete?: InputMaybe<Array<SystemHasSubsystemSystemsDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<SystemHasSubsystemSystemsDisconnectFieldInput>>;
  update?: InputMaybe<SystemHasSubsystemSystemsUpdateConnectionInput>;
  where?: InputMaybe<SystemHasSubsystemSystemsConnectionWhere>;
};

export type SystemImportance = {
  __typename?: 'SystemImportance';
  code: Scalars['String']['output'];
  name: Scalars['String']['output'];
  uid: Scalars['String']['output'];
};

export type SystemImportanceAggregateSelection = {
  __typename?: 'SystemImportanceAggregateSelection';
  code: StringAggregateSelectionNonNullable;
  count: Scalars['Int']['output'];
  name: StringAggregateSelectionNonNullable;
  uid: StringAggregateSelectionNonNullable;
};

export type SystemImportanceCreateInput = {
  code: Scalars['String']['input'];
  name: Scalars['String']['input'];
  uid: Scalars['String']['input'];
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
  uid?: InputMaybe<Scalars['String']['input']>;
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
  uid?: InputMaybe<Scalars['String']['input']>;
  uid_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  uid_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  uid_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  uid_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
};

export type SystemImportancesConnection = {
  __typename?: 'SystemImportancesConnection';
  edges: Array<SystemImportanceEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type SystemOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /** Specify one or more SystemSort objects to sort Systems by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<SystemSort>>;
};

export type SystemRelationInput = {
  hasSubsystemSystems?: InputMaybe<Array<SystemHasSubsystemSystemsCreateFieldInput>>;
  systemsHasSubsystem?: InputMaybe<Array<SystemSystemsHasSubsystemCreateFieldInput>>;
};

/** Fields to sort Systems by. The order in which sorts are applied is not guaranteed when specifying many fields in one SystemSort object. */
export type SystemSort = {
  description?: InputMaybe<SortDirection>;
  image?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  systemAlias?: InputMaybe<SortDirection>;
  systemCode?: InputMaybe<SortDirection>;
  uid?: InputMaybe<SortDirection>;
};

export type SystemSystemHasSubsystemSystemsAggregationSelection = {
  __typename?: 'SystemSystemHasSubsystemSystemsAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<SystemSystemHasSubsystemSystemsNodeAggregateSelection>;
};

export type SystemSystemHasSubsystemSystemsNodeAggregateSelection = {
  __typename?: 'SystemSystemHasSubsystemSystemsNodeAggregateSelection';
  description: StringAggregateSelectionNonNullable;
  image: StringAggregateSelectionNullable;
  name: StringAggregateSelectionNonNullable;
  systemAlias: StringAggregateSelectionNonNullable;
  systemCode: StringAggregateSelectionNonNullable;
  uid: StringAggregateSelectionNonNullable;
};

export type SystemSystemSystemsHasSubsystemAggregationSelection = {
  __typename?: 'SystemSystemSystemsHasSubsystemAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<SystemSystemSystemsHasSubsystemNodeAggregateSelection>;
};

export type SystemSystemSystemsHasSubsystemNodeAggregateSelection = {
  __typename?: 'SystemSystemSystemsHasSubsystemNodeAggregateSelection';
  description: StringAggregateSelectionNonNullable;
  image: StringAggregateSelectionNullable;
  name: StringAggregateSelectionNonNullable;
  systemAlias: StringAggregateSelectionNonNullable;
  systemCode: StringAggregateSelectionNonNullable;
  uid: StringAggregateSelectionNonNullable;
};

export type SystemSystemsHasSubsystemAggregateInput = {
  AND?: InputMaybe<Array<SystemSystemsHasSubsystemAggregateInput>>;
  NOT?: InputMaybe<SystemSystemsHasSubsystemAggregateInput>;
  OR?: InputMaybe<Array<SystemSystemsHasSubsystemAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<SystemSystemsHasSubsystemNodeAggregationWhereInput>;
};

export type SystemSystemsHasSubsystemConnectFieldInput = {
  connect?: InputMaybe<Array<SystemConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<SystemConnectWhere>;
};

export type SystemSystemsHasSubsystemConnection = {
  __typename?: 'SystemSystemsHasSubsystemConnection';
  edges: Array<SystemSystemsHasSubsystemRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type SystemSystemsHasSubsystemConnectionSort = {
  node?: InputMaybe<SystemSort>;
};

export type SystemSystemsHasSubsystemConnectionWhere = {
  AND?: InputMaybe<Array<SystemSystemsHasSubsystemConnectionWhere>>;
  NOT?: InputMaybe<SystemSystemsHasSubsystemConnectionWhere>;
  OR?: InputMaybe<Array<SystemSystemsHasSubsystemConnectionWhere>>;
  node?: InputMaybe<SystemWhere>;
};

export type SystemSystemsHasSubsystemCreateFieldInput = {
  node: SystemCreateInput;
};

export type SystemSystemsHasSubsystemDeleteFieldInput = {
  delete?: InputMaybe<SystemDeleteInput>;
  where?: InputMaybe<SystemSystemsHasSubsystemConnectionWhere>;
};

export type SystemSystemsHasSubsystemDisconnectFieldInput = {
  disconnect?: InputMaybe<SystemDisconnectInput>;
  where?: InputMaybe<SystemSystemsHasSubsystemConnectionWhere>;
};

export type SystemSystemsHasSubsystemFieldInput = {
  connect?: InputMaybe<Array<SystemSystemsHasSubsystemConnectFieldInput>>;
  create?: InputMaybe<Array<SystemSystemsHasSubsystemCreateFieldInput>>;
};

export type SystemSystemsHasSubsystemNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<SystemSystemsHasSubsystemNodeAggregationWhereInput>>;
  NOT?: InputMaybe<SystemSystemsHasSubsystemNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<SystemSystemsHasSubsystemNodeAggregationWhereInput>>;
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
  image_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  image_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  image_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  image_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  image_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  image_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  image_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  image_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  image_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  image_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  image_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  image_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  image_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  image_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  image_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
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

export type SystemSystemsHasSubsystemRelationship = {
  __typename?: 'SystemSystemsHasSubsystemRelationship';
  cursor: Scalars['String']['output'];
  node: System;
};

export type SystemSystemsHasSubsystemUpdateConnectionInput = {
  node?: InputMaybe<SystemUpdateInput>;
};

export type SystemSystemsHasSubsystemUpdateFieldInput = {
  connect?: InputMaybe<Array<SystemSystemsHasSubsystemConnectFieldInput>>;
  create?: InputMaybe<Array<SystemSystemsHasSubsystemCreateFieldInput>>;
  delete?: InputMaybe<Array<SystemSystemsHasSubsystemDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<SystemSystemsHasSubsystemDisconnectFieldInput>>;
  update?: InputMaybe<SystemSystemsHasSubsystemUpdateConnectionInput>;
  where?: InputMaybe<SystemSystemsHasSubsystemConnectionWhere>;
};

export type SystemType = {
  __typename?: 'SystemType';
  code: Scalars['String']['output'];
  mask: Scalars['String']['output'];
  name: Scalars['String']['output'];
  systemTypeGroupsContainsSystemType: Array<SystemTypeGroup>;
  systemTypeGroupsContainsSystemTypeAggregate?: Maybe<SystemTypeSystemTypeGroupSystemTypeGroupsContainsSystemTypeAggregationSelection>;
  systemTypeGroupsContainsSystemTypeConnection: SystemTypeSystemTypeGroupsContainsSystemTypeConnection;
  uid: Scalars['String']['output'];
};


export type SystemTypeSystemTypeGroupsContainsSystemTypeArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<SystemTypeGroupOptions>;
  where?: InputMaybe<SystemTypeGroupWhere>;
};


export type SystemTypeSystemTypeGroupsContainsSystemTypeAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<SystemTypeGroupWhere>;
};


export type SystemTypeSystemTypeGroupsContainsSystemTypeConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<SystemTypeSystemTypeGroupsContainsSystemTypeConnectionSort>>;
  where?: InputMaybe<SystemTypeSystemTypeGroupsContainsSystemTypeConnectionWhere>;
};

export type SystemTypeAggregateSelection = {
  __typename?: 'SystemTypeAggregateSelection';
  code: StringAggregateSelectionNonNullable;
  count: Scalars['Int']['output'];
  mask: StringAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  uid: StringAggregateSelectionNonNullable;
};

export type SystemTypeConnectInput = {
  systemTypeGroupsContainsSystemType?: InputMaybe<Array<SystemTypeSystemTypeGroupsContainsSystemTypeConnectFieldInput>>;
};

export type SystemTypeConnectWhere = {
  node: SystemTypeWhere;
};

export type SystemTypeCreateInput = {
  code: Scalars['String']['input'];
  mask: Scalars['String']['input'];
  name: Scalars['String']['input'];
  systemTypeGroupsContainsSystemType?: InputMaybe<SystemTypeSystemTypeGroupsContainsSystemTypeFieldInput>;
  uid: Scalars['String']['input'];
};

export type SystemTypeDeleteInput = {
  systemTypeGroupsContainsSystemType?: InputMaybe<Array<SystemTypeSystemTypeGroupsContainsSystemTypeDeleteFieldInput>>;
};

export type SystemTypeDisconnectInput = {
  systemTypeGroupsContainsSystemType?: InputMaybe<Array<SystemTypeSystemTypeGroupsContainsSystemTypeDisconnectFieldInput>>;
};

export type SystemTypeEdge = {
  __typename?: 'SystemTypeEdge';
  cursor: Scalars['String']['output'];
  node: SystemType;
};

export type SystemTypeGroup = {
  __typename?: 'SystemTypeGroup';
  belongsToFacilityFacilities: Array<Facility>;
  belongsToFacilityFacilitiesAggregate?: Maybe<SystemTypeGroupFacilityBelongsToFacilityFacilitiesAggregationSelection>;
  belongsToFacilityFacilitiesConnection: SystemTypeGroupBelongsToFacilityFacilitiesConnection;
  containsSystemTypeSystemTypes: Array<SystemType>;
  containsSystemTypeSystemTypesAggregate?: Maybe<SystemTypeGroupSystemTypeContainsSystemTypeSystemTypesAggregationSelection>;
  containsSystemTypeSystemTypesConnection: SystemTypeGroupContainsSystemTypeSystemTypesConnection;
  name: Scalars['String']['output'];
  uid: Scalars['String']['output'];
};


export type SystemTypeGroupBelongsToFacilityFacilitiesArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<FacilityOptions>;
  where?: InputMaybe<FacilityWhere>;
};


export type SystemTypeGroupBelongsToFacilityFacilitiesAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<FacilityWhere>;
};


export type SystemTypeGroupBelongsToFacilityFacilitiesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<SystemTypeGroupBelongsToFacilityFacilitiesConnectionSort>>;
  where?: InputMaybe<SystemTypeGroupBelongsToFacilityFacilitiesConnectionWhere>;
};


export type SystemTypeGroupContainsSystemTypeSystemTypesArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<SystemTypeOptions>;
  where?: InputMaybe<SystemTypeWhere>;
};


export type SystemTypeGroupContainsSystemTypeSystemTypesAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<SystemTypeWhere>;
};


export type SystemTypeGroupContainsSystemTypeSystemTypesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<SystemTypeGroupContainsSystemTypeSystemTypesConnectionSort>>;
  where?: InputMaybe<SystemTypeGroupContainsSystemTypeSystemTypesConnectionWhere>;
};

export type SystemTypeGroupAggregateSelection = {
  __typename?: 'SystemTypeGroupAggregateSelection';
  count: Scalars['Int']['output'];
  name: StringAggregateSelectionNonNullable;
  uid: StringAggregateSelectionNonNullable;
};

export type SystemTypeGroupBelongsToFacilityFacilitiesAggregateInput = {
  AND?: InputMaybe<Array<SystemTypeGroupBelongsToFacilityFacilitiesAggregateInput>>;
  NOT?: InputMaybe<SystemTypeGroupBelongsToFacilityFacilitiesAggregateInput>;
  OR?: InputMaybe<Array<SystemTypeGroupBelongsToFacilityFacilitiesAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<SystemTypeGroupBelongsToFacilityFacilitiesNodeAggregationWhereInput>;
};

export type SystemTypeGroupBelongsToFacilityFacilitiesConnectFieldInput = {
  connect?: InputMaybe<Array<FacilityConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<FacilityConnectWhere>;
};

export type SystemTypeGroupBelongsToFacilityFacilitiesConnection = {
  __typename?: 'SystemTypeGroupBelongsToFacilityFacilitiesConnection';
  edges: Array<SystemTypeGroupBelongsToFacilityFacilitiesRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type SystemTypeGroupBelongsToFacilityFacilitiesConnectionSort = {
  node?: InputMaybe<FacilitySort>;
};

export type SystemTypeGroupBelongsToFacilityFacilitiesConnectionWhere = {
  AND?: InputMaybe<Array<SystemTypeGroupBelongsToFacilityFacilitiesConnectionWhere>>;
  NOT?: InputMaybe<SystemTypeGroupBelongsToFacilityFacilitiesConnectionWhere>;
  OR?: InputMaybe<Array<SystemTypeGroupBelongsToFacilityFacilitiesConnectionWhere>>;
  node?: InputMaybe<FacilityWhere>;
};

export type SystemTypeGroupBelongsToFacilityFacilitiesCreateFieldInput = {
  node: FacilityCreateInput;
};

export type SystemTypeGroupBelongsToFacilityFacilitiesDeleteFieldInput = {
  delete?: InputMaybe<FacilityDeleteInput>;
  where?: InputMaybe<SystemTypeGroupBelongsToFacilityFacilitiesConnectionWhere>;
};

export type SystemTypeGroupBelongsToFacilityFacilitiesDisconnectFieldInput = {
  disconnect?: InputMaybe<FacilityDisconnectInput>;
  where?: InputMaybe<SystemTypeGroupBelongsToFacilityFacilitiesConnectionWhere>;
};

export type SystemTypeGroupBelongsToFacilityFacilitiesFieldInput = {
  connect?: InputMaybe<Array<SystemTypeGroupBelongsToFacilityFacilitiesConnectFieldInput>>;
  create?: InputMaybe<Array<SystemTypeGroupBelongsToFacilityFacilitiesCreateFieldInput>>;
};

export type SystemTypeGroupBelongsToFacilityFacilitiesNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<SystemTypeGroupBelongsToFacilityFacilitiesNodeAggregationWhereInput>>;
  NOT?: InputMaybe<SystemTypeGroupBelongsToFacilityFacilitiesNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<SystemTypeGroupBelongsToFacilityFacilitiesNodeAggregationWhereInput>>;
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

export type SystemTypeGroupBelongsToFacilityFacilitiesRelationship = {
  __typename?: 'SystemTypeGroupBelongsToFacilityFacilitiesRelationship';
  cursor: Scalars['String']['output'];
  node: Facility;
};

export type SystemTypeGroupBelongsToFacilityFacilitiesUpdateConnectionInput = {
  node?: InputMaybe<FacilityUpdateInput>;
};

export type SystemTypeGroupBelongsToFacilityFacilitiesUpdateFieldInput = {
  connect?: InputMaybe<Array<SystemTypeGroupBelongsToFacilityFacilitiesConnectFieldInput>>;
  create?: InputMaybe<Array<SystemTypeGroupBelongsToFacilityFacilitiesCreateFieldInput>>;
  delete?: InputMaybe<Array<SystemTypeGroupBelongsToFacilityFacilitiesDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<SystemTypeGroupBelongsToFacilityFacilitiesDisconnectFieldInput>>;
  update?: InputMaybe<SystemTypeGroupBelongsToFacilityFacilitiesUpdateConnectionInput>;
  where?: InputMaybe<SystemTypeGroupBelongsToFacilityFacilitiesConnectionWhere>;
};

export type SystemTypeGroupConnectInput = {
  belongsToFacilityFacilities?: InputMaybe<Array<SystemTypeGroupBelongsToFacilityFacilitiesConnectFieldInput>>;
  containsSystemTypeSystemTypes?: InputMaybe<Array<SystemTypeGroupContainsSystemTypeSystemTypesConnectFieldInput>>;
};

export type SystemTypeGroupConnectWhere = {
  node: SystemTypeGroupWhere;
};

export type SystemTypeGroupContainsSystemTypeSystemTypesAggregateInput = {
  AND?: InputMaybe<Array<SystemTypeGroupContainsSystemTypeSystemTypesAggregateInput>>;
  NOT?: InputMaybe<SystemTypeGroupContainsSystemTypeSystemTypesAggregateInput>;
  OR?: InputMaybe<Array<SystemTypeGroupContainsSystemTypeSystemTypesAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<SystemTypeGroupContainsSystemTypeSystemTypesNodeAggregationWhereInput>;
};

export type SystemTypeGroupContainsSystemTypeSystemTypesConnectFieldInput = {
  connect?: InputMaybe<Array<SystemTypeConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<SystemTypeConnectWhere>;
};

export type SystemTypeGroupContainsSystemTypeSystemTypesConnection = {
  __typename?: 'SystemTypeGroupContainsSystemTypeSystemTypesConnection';
  edges: Array<SystemTypeGroupContainsSystemTypeSystemTypesRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type SystemTypeGroupContainsSystemTypeSystemTypesConnectionSort = {
  node?: InputMaybe<SystemTypeSort>;
};

export type SystemTypeGroupContainsSystemTypeSystemTypesConnectionWhere = {
  AND?: InputMaybe<Array<SystemTypeGroupContainsSystemTypeSystemTypesConnectionWhere>>;
  NOT?: InputMaybe<SystemTypeGroupContainsSystemTypeSystemTypesConnectionWhere>;
  OR?: InputMaybe<Array<SystemTypeGroupContainsSystemTypeSystemTypesConnectionWhere>>;
  node?: InputMaybe<SystemTypeWhere>;
};

export type SystemTypeGroupContainsSystemTypeSystemTypesCreateFieldInput = {
  node: SystemTypeCreateInput;
};

export type SystemTypeGroupContainsSystemTypeSystemTypesDeleteFieldInput = {
  delete?: InputMaybe<SystemTypeDeleteInput>;
  where?: InputMaybe<SystemTypeGroupContainsSystemTypeSystemTypesConnectionWhere>;
};

export type SystemTypeGroupContainsSystemTypeSystemTypesDisconnectFieldInput = {
  disconnect?: InputMaybe<SystemTypeDisconnectInput>;
  where?: InputMaybe<SystemTypeGroupContainsSystemTypeSystemTypesConnectionWhere>;
};

export type SystemTypeGroupContainsSystemTypeSystemTypesFieldInput = {
  connect?: InputMaybe<Array<SystemTypeGroupContainsSystemTypeSystemTypesConnectFieldInput>>;
  create?: InputMaybe<Array<SystemTypeGroupContainsSystemTypeSystemTypesCreateFieldInput>>;
};

export type SystemTypeGroupContainsSystemTypeSystemTypesNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<SystemTypeGroupContainsSystemTypeSystemTypesNodeAggregationWhereInput>>;
  NOT?: InputMaybe<SystemTypeGroupContainsSystemTypeSystemTypesNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<SystemTypeGroupContainsSystemTypeSystemTypesNodeAggregationWhereInput>>;
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

export type SystemTypeGroupContainsSystemTypeSystemTypesRelationship = {
  __typename?: 'SystemTypeGroupContainsSystemTypeSystemTypesRelationship';
  cursor: Scalars['String']['output'];
  node: SystemType;
};

export type SystemTypeGroupContainsSystemTypeSystemTypesUpdateConnectionInput = {
  node?: InputMaybe<SystemTypeUpdateInput>;
};

export type SystemTypeGroupContainsSystemTypeSystemTypesUpdateFieldInput = {
  connect?: InputMaybe<Array<SystemTypeGroupContainsSystemTypeSystemTypesConnectFieldInput>>;
  create?: InputMaybe<Array<SystemTypeGroupContainsSystemTypeSystemTypesCreateFieldInput>>;
  delete?: InputMaybe<Array<SystemTypeGroupContainsSystemTypeSystemTypesDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<SystemTypeGroupContainsSystemTypeSystemTypesDisconnectFieldInput>>;
  update?: InputMaybe<SystemTypeGroupContainsSystemTypeSystemTypesUpdateConnectionInput>;
  where?: InputMaybe<SystemTypeGroupContainsSystemTypeSystemTypesConnectionWhere>;
};

export type SystemTypeGroupCreateInput = {
  belongsToFacilityFacilities?: InputMaybe<SystemTypeGroupBelongsToFacilityFacilitiesFieldInput>;
  containsSystemTypeSystemTypes?: InputMaybe<SystemTypeGroupContainsSystemTypeSystemTypesFieldInput>;
  name: Scalars['String']['input'];
  uid: Scalars['String']['input'];
};

export type SystemTypeGroupDeleteInput = {
  belongsToFacilityFacilities?: InputMaybe<Array<SystemTypeGroupBelongsToFacilityFacilitiesDeleteFieldInput>>;
  containsSystemTypeSystemTypes?: InputMaybe<Array<SystemTypeGroupContainsSystemTypeSystemTypesDeleteFieldInput>>;
};

export type SystemTypeGroupDisconnectInput = {
  belongsToFacilityFacilities?: InputMaybe<Array<SystemTypeGroupBelongsToFacilityFacilitiesDisconnectFieldInput>>;
  containsSystemTypeSystemTypes?: InputMaybe<Array<SystemTypeGroupContainsSystemTypeSystemTypesDisconnectFieldInput>>;
};

export type SystemTypeGroupEdge = {
  __typename?: 'SystemTypeGroupEdge';
  cursor: Scalars['String']['output'];
  node: SystemTypeGroup;
};

export type SystemTypeGroupFacilityBelongsToFacilityFacilitiesAggregationSelection = {
  __typename?: 'SystemTypeGroupFacilityBelongsToFacilityFacilitiesAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<SystemTypeGroupFacilityBelongsToFacilityFacilitiesNodeAggregateSelection>;
};

export type SystemTypeGroupFacilityBelongsToFacilityFacilitiesNodeAggregateSelection = {
  __typename?: 'SystemTypeGroupFacilityBelongsToFacilityFacilitiesNodeAggregateSelection';
  code: StringAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  uid: StringAggregateSelectionNonNullable;
};

export type SystemTypeGroupOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /** Specify one or more SystemTypeGroupSort objects to sort SystemTypeGroups by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<SystemTypeGroupSort>>;
};

export type SystemTypeGroupRelationInput = {
  belongsToFacilityFacilities?: InputMaybe<Array<SystemTypeGroupBelongsToFacilityFacilitiesCreateFieldInput>>;
  containsSystemTypeSystemTypes?: InputMaybe<Array<SystemTypeGroupContainsSystemTypeSystemTypesCreateFieldInput>>;
};

/** Fields to sort SystemTypeGroups by. The order in which sorts are applied is not guaranteed when specifying many fields in one SystemTypeGroupSort object. */
export type SystemTypeGroupSort = {
  name?: InputMaybe<SortDirection>;
  uid?: InputMaybe<SortDirection>;
};

export type SystemTypeGroupSystemTypeContainsSystemTypeSystemTypesAggregationSelection = {
  __typename?: 'SystemTypeGroupSystemTypeContainsSystemTypeSystemTypesAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<SystemTypeGroupSystemTypeContainsSystemTypeSystemTypesNodeAggregateSelection>;
};

export type SystemTypeGroupSystemTypeContainsSystemTypeSystemTypesNodeAggregateSelection = {
  __typename?: 'SystemTypeGroupSystemTypeContainsSystemTypeSystemTypesNodeAggregateSelection';
  code: StringAggregateSelectionNonNullable;
  mask: StringAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  uid: StringAggregateSelectionNonNullable;
};

export type SystemTypeGroupUpdateInput = {
  belongsToFacilityFacilities?: InputMaybe<Array<SystemTypeGroupBelongsToFacilityFacilitiesUpdateFieldInput>>;
  containsSystemTypeSystemTypes?: InputMaybe<Array<SystemTypeGroupContainsSystemTypeSystemTypesUpdateFieldInput>>;
  name?: InputMaybe<Scalars['String']['input']>;
  uid?: InputMaybe<Scalars['String']['input']>;
};

export type SystemTypeGroupWhere = {
  AND?: InputMaybe<Array<SystemTypeGroupWhere>>;
  NOT?: InputMaybe<SystemTypeGroupWhere>;
  OR?: InputMaybe<Array<SystemTypeGroupWhere>>;
  belongsToFacilityFacilitiesAggregate?: InputMaybe<SystemTypeGroupBelongsToFacilityFacilitiesAggregateInput>;
  /** Return SystemTypeGroups where all of the related SystemTypeGroupBelongsToFacilityFacilitiesConnections match this filter */
  belongsToFacilityFacilitiesConnection_ALL?: InputMaybe<SystemTypeGroupBelongsToFacilityFacilitiesConnectionWhere>;
  /** Return SystemTypeGroups where none of the related SystemTypeGroupBelongsToFacilityFacilitiesConnections match this filter */
  belongsToFacilityFacilitiesConnection_NONE?: InputMaybe<SystemTypeGroupBelongsToFacilityFacilitiesConnectionWhere>;
  /** Return SystemTypeGroups where one of the related SystemTypeGroupBelongsToFacilityFacilitiesConnections match this filter */
  belongsToFacilityFacilitiesConnection_SINGLE?: InputMaybe<SystemTypeGroupBelongsToFacilityFacilitiesConnectionWhere>;
  /** Return SystemTypeGroups where some of the related SystemTypeGroupBelongsToFacilityFacilitiesConnections match this filter */
  belongsToFacilityFacilitiesConnection_SOME?: InputMaybe<SystemTypeGroupBelongsToFacilityFacilitiesConnectionWhere>;
  /** Return SystemTypeGroups where all of the related Facilities match this filter */
  belongsToFacilityFacilities_ALL?: InputMaybe<FacilityWhere>;
  /** Return SystemTypeGroups where none of the related Facilities match this filter */
  belongsToFacilityFacilities_NONE?: InputMaybe<FacilityWhere>;
  /** Return SystemTypeGroups where one of the related Facilities match this filter */
  belongsToFacilityFacilities_SINGLE?: InputMaybe<FacilityWhere>;
  /** Return SystemTypeGroups where some of the related Facilities match this filter */
  belongsToFacilityFacilities_SOME?: InputMaybe<FacilityWhere>;
  containsSystemTypeSystemTypesAggregate?: InputMaybe<SystemTypeGroupContainsSystemTypeSystemTypesAggregateInput>;
  /** Return SystemTypeGroups where all of the related SystemTypeGroupContainsSystemTypeSystemTypesConnections match this filter */
  containsSystemTypeSystemTypesConnection_ALL?: InputMaybe<SystemTypeGroupContainsSystemTypeSystemTypesConnectionWhere>;
  /** Return SystemTypeGroups where none of the related SystemTypeGroupContainsSystemTypeSystemTypesConnections match this filter */
  containsSystemTypeSystemTypesConnection_NONE?: InputMaybe<SystemTypeGroupContainsSystemTypeSystemTypesConnectionWhere>;
  /** Return SystemTypeGroups where one of the related SystemTypeGroupContainsSystemTypeSystemTypesConnections match this filter */
  containsSystemTypeSystemTypesConnection_SINGLE?: InputMaybe<SystemTypeGroupContainsSystemTypeSystemTypesConnectionWhere>;
  /** Return SystemTypeGroups where some of the related SystemTypeGroupContainsSystemTypeSystemTypesConnections match this filter */
  containsSystemTypeSystemTypesConnection_SOME?: InputMaybe<SystemTypeGroupContainsSystemTypeSystemTypesConnectionWhere>;
  /** Return SystemTypeGroups where all of the related SystemTypes match this filter */
  containsSystemTypeSystemTypes_ALL?: InputMaybe<SystemTypeWhere>;
  /** Return SystemTypeGroups where none of the related SystemTypes match this filter */
  containsSystemTypeSystemTypes_NONE?: InputMaybe<SystemTypeWhere>;
  /** Return SystemTypeGroups where one of the related SystemTypes match this filter */
  containsSystemTypeSystemTypes_SINGLE?: InputMaybe<SystemTypeWhere>;
  /** Return SystemTypeGroups where some of the related SystemTypes match this filter */
  containsSystemTypeSystemTypes_SOME?: InputMaybe<SystemTypeWhere>;
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
  systemTypeGroupsContainsSystemType?: InputMaybe<Array<SystemTypeSystemTypeGroupsContainsSystemTypeCreateFieldInput>>;
};

/** Fields to sort SystemTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one SystemTypeSort object. */
export type SystemTypeSort = {
  code?: InputMaybe<SortDirection>;
  mask?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  uid?: InputMaybe<SortDirection>;
};

export type SystemTypeSystemTypeGroupSystemTypeGroupsContainsSystemTypeAggregationSelection = {
  __typename?: 'SystemTypeSystemTypeGroupSystemTypeGroupsContainsSystemTypeAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<SystemTypeSystemTypeGroupSystemTypeGroupsContainsSystemTypeNodeAggregateSelection>;
};

export type SystemTypeSystemTypeGroupSystemTypeGroupsContainsSystemTypeNodeAggregateSelection = {
  __typename?: 'SystemTypeSystemTypeGroupSystemTypeGroupsContainsSystemTypeNodeAggregateSelection';
  name: StringAggregateSelectionNonNullable;
  uid: StringAggregateSelectionNonNullable;
};

export type SystemTypeSystemTypeGroupsContainsSystemTypeAggregateInput = {
  AND?: InputMaybe<Array<SystemTypeSystemTypeGroupsContainsSystemTypeAggregateInput>>;
  NOT?: InputMaybe<SystemTypeSystemTypeGroupsContainsSystemTypeAggregateInput>;
  OR?: InputMaybe<Array<SystemTypeSystemTypeGroupsContainsSystemTypeAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<SystemTypeSystemTypeGroupsContainsSystemTypeNodeAggregationWhereInput>;
};

export type SystemTypeSystemTypeGroupsContainsSystemTypeConnectFieldInput = {
  connect?: InputMaybe<Array<SystemTypeGroupConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<SystemTypeGroupConnectWhere>;
};

export type SystemTypeSystemTypeGroupsContainsSystemTypeConnection = {
  __typename?: 'SystemTypeSystemTypeGroupsContainsSystemTypeConnection';
  edges: Array<SystemTypeSystemTypeGroupsContainsSystemTypeRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type SystemTypeSystemTypeGroupsContainsSystemTypeConnectionSort = {
  node?: InputMaybe<SystemTypeGroupSort>;
};

export type SystemTypeSystemTypeGroupsContainsSystemTypeConnectionWhere = {
  AND?: InputMaybe<Array<SystemTypeSystemTypeGroupsContainsSystemTypeConnectionWhere>>;
  NOT?: InputMaybe<SystemTypeSystemTypeGroupsContainsSystemTypeConnectionWhere>;
  OR?: InputMaybe<Array<SystemTypeSystemTypeGroupsContainsSystemTypeConnectionWhere>>;
  node?: InputMaybe<SystemTypeGroupWhere>;
};

export type SystemTypeSystemTypeGroupsContainsSystemTypeCreateFieldInput = {
  node: SystemTypeGroupCreateInput;
};

export type SystemTypeSystemTypeGroupsContainsSystemTypeDeleteFieldInput = {
  delete?: InputMaybe<SystemTypeGroupDeleteInput>;
  where?: InputMaybe<SystemTypeSystemTypeGroupsContainsSystemTypeConnectionWhere>;
};

export type SystemTypeSystemTypeGroupsContainsSystemTypeDisconnectFieldInput = {
  disconnect?: InputMaybe<SystemTypeGroupDisconnectInput>;
  where?: InputMaybe<SystemTypeSystemTypeGroupsContainsSystemTypeConnectionWhere>;
};

export type SystemTypeSystemTypeGroupsContainsSystemTypeFieldInput = {
  connect?: InputMaybe<Array<SystemTypeSystemTypeGroupsContainsSystemTypeConnectFieldInput>>;
  create?: InputMaybe<Array<SystemTypeSystemTypeGroupsContainsSystemTypeCreateFieldInput>>;
};

export type SystemTypeSystemTypeGroupsContainsSystemTypeNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<SystemTypeSystemTypeGroupsContainsSystemTypeNodeAggregationWhereInput>>;
  NOT?: InputMaybe<SystemTypeSystemTypeGroupsContainsSystemTypeNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<SystemTypeSystemTypeGroupsContainsSystemTypeNodeAggregationWhereInput>>;
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

export type SystemTypeSystemTypeGroupsContainsSystemTypeRelationship = {
  __typename?: 'SystemTypeSystemTypeGroupsContainsSystemTypeRelationship';
  cursor: Scalars['String']['output'];
  node: SystemTypeGroup;
};

export type SystemTypeSystemTypeGroupsContainsSystemTypeUpdateConnectionInput = {
  node?: InputMaybe<SystemTypeGroupUpdateInput>;
};

export type SystemTypeSystemTypeGroupsContainsSystemTypeUpdateFieldInput = {
  connect?: InputMaybe<Array<SystemTypeSystemTypeGroupsContainsSystemTypeConnectFieldInput>>;
  create?: InputMaybe<Array<SystemTypeSystemTypeGroupsContainsSystemTypeCreateFieldInput>>;
  delete?: InputMaybe<Array<SystemTypeSystemTypeGroupsContainsSystemTypeDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<SystemTypeSystemTypeGroupsContainsSystemTypeDisconnectFieldInput>>;
  update?: InputMaybe<SystemTypeSystemTypeGroupsContainsSystemTypeUpdateConnectionInput>;
  where?: InputMaybe<SystemTypeSystemTypeGroupsContainsSystemTypeConnectionWhere>;
};

export type SystemTypeUpdateInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  mask?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  systemTypeGroupsContainsSystemType?: InputMaybe<Array<SystemTypeSystemTypeGroupsContainsSystemTypeUpdateFieldInput>>;
  uid?: InputMaybe<Scalars['String']['input']>;
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
  systemTypeGroupsContainsSystemTypeAggregate?: InputMaybe<SystemTypeSystemTypeGroupsContainsSystemTypeAggregateInput>;
  /** Return SystemTypes where all of the related SystemTypeSystemTypeGroupsContainsSystemTypeConnections match this filter */
  systemTypeGroupsContainsSystemTypeConnection_ALL?: InputMaybe<SystemTypeSystemTypeGroupsContainsSystemTypeConnectionWhere>;
  /** Return SystemTypes where none of the related SystemTypeSystemTypeGroupsContainsSystemTypeConnections match this filter */
  systemTypeGroupsContainsSystemTypeConnection_NONE?: InputMaybe<SystemTypeSystemTypeGroupsContainsSystemTypeConnectionWhere>;
  /** Return SystemTypes where one of the related SystemTypeSystemTypeGroupsContainsSystemTypeConnections match this filter */
  systemTypeGroupsContainsSystemTypeConnection_SINGLE?: InputMaybe<SystemTypeSystemTypeGroupsContainsSystemTypeConnectionWhere>;
  /** Return SystemTypes where some of the related SystemTypeSystemTypeGroupsContainsSystemTypeConnections match this filter */
  systemTypeGroupsContainsSystemTypeConnection_SOME?: InputMaybe<SystemTypeSystemTypeGroupsContainsSystemTypeConnectionWhere>;
  /** Return SystemTypes where all of the related SystemTypeGroups match this filter */
  systemTypeGroupsContainsSystemType_ALL?: InputMaybe<SystemTypeGroupWhere>;
  /** Return SystemTypes where none of the related SystemTypeGroups match this filter */
  systemTypeGroupsContainsSystemType_NONE?: InputMaybe<SystemTypeGroupWhere>;
  /** Return SystemTypes where one of the related SystemTypeGroups match this filter */
  systemTypeGroupsContainsSystemType_SINGLE?: InputMaybe<SystemTypeGroupWhere>;
  /** Return SystemTypes where some of the related SystemTypeGroups match this filter */
  systemTypeGroupsContainsSystemType_SOME?: InputMaybe<SystemTypeGroupWhere>;
  uid?: InputMaybe<Scalars['String']['input']>;
  uid_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  uid_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  uid_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  uid_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
};

export type SystemTypesConnection = {
  __typename?: 'SystemTypesConnection';
  edges: Array<SystemTypeEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type SystemUpdateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  hasSubsystemSystems?: InputMaybe<Array<SystemHasSubsystemSystemsUpdateFieldInput>>;
  image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  systemAlias?: InputMaybe<Scalars['String']['input']>;
  systemCode?: InputMaybe<Scalars['String']['input']>;
  systemsHasSubsystem?: InputMaybe<Array<SystemSystemsHasSubsystemUpdateFieldInput>>;
  uid?: InputMaybe<Scalars['String']['input']>;
};

export type SystemWhere = {
  AND?: InputMaybe<Array<SystemWhere>>;
  NOT?: InputMaybe<SystemWhere>;
  OR?: InputMaybe<Array<SystemWhere>>;
  description?: InputMaybe<Scalars['String']['input']>;
  description_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  description_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  description_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  description_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  hasSubsystemSystemsAggregate?: InputMaybe<SystemHasSubsystemSystemsAggregateInput>;
  /** Return Systems where all of the related SystemHasSubsystemSystemsConnections match this filter */
  hasSubsystemSystemsConnection_ALL?: InputMaybe<SystemHasSubsystemSystemsConnectionWhere>;
  /** Return Systems where none of the related SystemHasSubsystemSystemsConnections match this filter */
  hasSubsystemSystemsConnection_NONE?: InputMaybe<SystemHasSubsystemSystemsConnectionWhere>;
  /** Return Systems where one of the related SystemHasSubsystemSystemsConnections match this filter */
  hasSubsystemSystemsConnection_SINGLE?: InputMaybe<SystemHasSubsystemSystemsConnectionWhere>;
  /** Return Systems where some of the related SystemHasSubsystemSystemsConnections match this filter */
  hasSubsystemSystemsConnection_SOME?: InputMaybe<SystemHasSubsystemSystemsConnectionWhere>;
  /** Return Systems where all of the related Systems match this filter */
  hasSubsystemSystems_ALL?: InputMaybe<SystemWhere>;
  /** Return Systems where none of the related Systems match this filter */
  hasSubsystemSystems_NONE?: InputMaybe<SystemWhere>;
  /** Return Systems where one of the related Systems match this filter */
  hasSubsystemSystems_SINGLE?: InputMaybe<SystemWhere>;
  /** Return Systems where some of the related Systems match this filter */
  hasSubsystemSystems_SOME?: InputMaybe<SystemWhere>;
  image?: InputMaybe<Scalars['String']['input']>;
  image_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  image_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  image_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  image_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  systemAlias?: InputMaybe<Scalars['String']['input']>;
  systemAlias_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  systemAlias_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  systemAlias_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  systemAlias_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  systemCode?: InputMaybe<Scalars['String']['input']>;
  systemCode_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  systemCode_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  systemCode_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  systemCode_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  systemsHasSubsystemAggregate?: InputMaybe<SystemSystemsHasSubsystemAggregateInput>;
  /** Return Systems where all of the related SystemSystemsHasSubsystemConnections match this filter */
  systemsHasSubsystemConnection_ALL?: InputMaybe<SystemSystemsHasSubsystemConnectionWhere>;
  /** Return Systems where none of the related SystemSystemsHasSubsystemConnections match this filter */
  systemsHasSubsystemConnection_NONE?: InputMaybe<SystemSystemsHasSubsystemConnectionWhere>;
  /** Return Systems where one of the related SystemSystemsHasSubsystemConnections match this filter */
  systemsHasSubsystemConnection_SINGLE?: InputMaybe<SystemSystemsHasSubsystemConnectionWhere>;
  /** Return Systems where some of the related SystemSystemsHasSubsystemConnections match this filter */
  systemsHasSubsystemConnection_SOME?: InputMaybe<SystemSystemsHasSubsystemConnectionWhere>;
  /** Return Systems where all of the related Systems match this filter */
  systemsHasSubsystem_ALL?: InputMaybe<SystemWhere>;
  /** Return Systems where none of the related Systems match this filter */
  systemsHasSubsystem_NONE?: InputMaybe<SystemWhere>;
  /** Return Systems where one of the related Systems match this filter */
  systemsHasSubsystem_SINGLE?: InputMaybe<SystemWhere>;
  /** Return Systems where some of the related Systems match this filter */
  systemsHasSubsystem_SOME?: InputMaybe<SystemWhere>;
  uid?: InputMaybe<Scalars['String']['input']>;
  uid_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  uid_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  uid_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  uid_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
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
  teamMembers: Array<Employee>;
  teamMembersAggregate?: Maybe<TeamEmployeeTeamMembersAggregationSelection>;
  teamMembersConnection: TeamTeamMembersConnection;
  uid: Scalars['String']['output'];
};


export type TeamTeamMembersArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<EmployeeOptions>;
  where?: InputMaybe<EmployeeWhere>;
};


export type TeamTeamMembersAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<EmployeeWhere>;
};


export type TeamTeamMembersConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<TeamTeamMembersConnectionSort>>;
  where?: InputMaybe<TeamTeamMembersConnectionWhere>;
};

export type TeamAggregateSelection = {
  __typename?: 'TeamAggregateSelection';
  count: Scalars['Int']['output'];
  name: StringAggregateSelectionNonNullable;
  uid: StringAggregateSelectionNonNullable;
};

export type TeamConnectInput = {
  teamMembers?: InputMaybe<Array<TeamTeamMembersConnectFieldInput>>;
};

export type TeamConnectWhere = {
  node: TeamWhere;
};

export type TeamCreateInput = {
  name: Scalars['String']['input'];
  teamMembers?: InputMaybe<TeamTeamMembersFieldInput>;
  uid: Scalars['String']['input'];
};

export type TeamDeleteInput = {
  teamMembers?: InputMaybe<Array<TeamTeamMembersDeleteFieldInput>>;
};

export type TeamDisconnectInput = {
  teamMembers?: InputMaybe<Array<TeamTeamMembersDisconnectFieldInput>>;
};

export type TeamEdge = {
  __typename?: 'TeamEdge';
  cursor: Scalars['String']['output'];
  node: Team;
};

export type TeamEmployeeTeamMembersAggregationSelection = {
  __typename?: 'TeamEmployeeTeamMembersAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<TeamEmployeeTeamMembersNodeAggregateSelection>;
};

export type TeamEmployeeTeamMembersNodeAggregateSelection = {
  __typename?: 'TeamEmployeeTeamMembersNodeAggregateSelection';
  email: StringAggregateSelectionNullable;
  firstName: StringAggregateSelectionNonNullable;
  lastName: StringAggregateSelectionNonNullable;
  phoneNumber: StringAggregateSelectionNullable;
  uid: StringAggregateSelectionNonNullable;
};

export type TeamOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /** Specify one or more TeamSort objects to sort Teams by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<TeamSort>>;
};

export type TeamRelationInput = {
  teamMembers?: InputMaybe<Array<TeamTeamMembersCreateFieldInput>>;
};

/** Fields to sort Teams by. The order in which sorts are applied is not guaranteed when specifying many fields in one TeamSort object. */
export type TeamSort = {
  name?: InputMaybe<SortDirection>;
  uid?: InputMaybe<SortDirection>;
};

export type TeamTeamMembersAggregateInput = {
  AND?: InputMaybe<Array<TeamTeamMembersAggregateInput>>;
  NOT?: InputMaybe<TeamTeamMembersAggregateInput>;
  OR?: InputMaybe<Array<TeamTeamMembersAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<TeamTeamMembersNodeAggregationWhereInput>;
};

export type TeamTeamMembersConnectFieldInput = {
  connect?: InputMaybe<Array<EmployeeConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<EmployeeConnectWhere>;
};

export type TeamTeamMembersConnection = {
  __typename?: 'TeamTeamMembersConnection';
  edges: Array<TeamTeamMembersRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type TeamTeamMembersConnectionSort = {
  node?: InputMaybe<EmployeeSort>;
};

export type TeamTeamMembersConnectionWhere = {
  AND?: InputMaybe<Array<TeamTeamMembersConnectionWhere>>;
  NOT?: InputMaybe<TeamTeamMembersConnectionWhere>;
  OR?: InputMaybe<Array<TeamTeamMembersConnectionWhere>>;
  node?: InputMaybe<EmployeeWhere>;
};

export type TeamTeamMembersCreateFieldInput = {
  node: EmployeeCreateInput;
};

export type TeamTeamMembersDeleteFieldInput = {
  delete?: InputMaybe<EmployeeDeleteInput>;
  where?: InputMaybe<TeamTeamMembersConnectionWhere>;
};

export type TeamTeamMembersDisconnectFieldInput = {
  disconnect?: InputMaybe<EmployeeDisconnectInput>;
  where?: InputMaybe<TeamTeamMembersConnectionWhere>;
};

export type TeamTeamMembersFieldInput = {
  connect?: InputMaybe<Array<TeamTeamMembersConnectFieldInput>>;
  create?: InputMaybe<Array<TeamTeamMembersCreateFieldInput>>;
};

export type TeamTeamMembersNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<TeamTeamMembersNodeAggregationWhereInput>>;
  NOT?: InputMaybe<TeamTeamMembersNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<TeamTeamMembersNodeAggregationWhereInput>>;
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

export type TeamTeamMembersRelationship = {
  __typename?: 'TeamTeamMembersRelationship';
  cursor: Scalars['String']['output'];
  node: Employee;
};

export type TeamTeamMembersUpdateConnectionInput = {
  node?: InputMaybe<EmployeeUpdateInput>;
};

export type TeamTeamMembersUpdateFieldInput = {
  connect?: InputMaybe<Array<TeamTeamMembersConnectFieldInput>>;
  create?: InputMaybe<Array<TeamTeamMembersCreateFieldInput>>;
  delete?: InputMaybe<Array<TeamTeamMembersDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<TeamTeamMembersDisconnectFieldInput>>;
  update?: InputMaybe<TeamTeamMembersUpdateConnectionInput>;
  where?: InputMaybe<TeamTeamMembersConnectionWhere>;
};

export type TeamUpdateInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  teamMembers?: InputMaybe<Array<TeamTeamMembersUpdateFieldInput>>;
  uid?: InputMaybe<Scalars['String']['input']>;
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
  teamMembersAggregate?: InputMaybe<TeamTeamMembersAggregateInput>;
  /** Return Teams where all of the related TeamTeamMembersConnections match this filter */
  teamMembersConnection_ALL?: InputMaybe<TeamTeamMembersConnectionWhere>;
  /** Return Teams where none of the related TeamTeamMembersConnections match this filter */
  teamMembersConnection_NONE?: InputMaybe<TeamTeamMembersConnectionWhere>;
  /** Return Teams where one of the related TeamTeamMembersConnections match this filter */
  teamMembersConnection_SINGLE?: InputMaybe<TeamTeamMembersConnectionWhere>;
  /** Return Teams where some of the related TeamTeamMembersConnections match this filter */
  teamMembersConnection_SOME?: InputMaybe<TeamTeamMembersConnectionWhere>;
  /** Return Teams where all of the related Employees match this filter */
  teamMembers_ALL?: InputMaybe<EmployeeWhere>;
  /** Return Teams where none of the related Employees match this filter */
  teamMembers_NONE?: InputMaybe<EmployeeWhere>;
  /** Return Teams where one of the related Employees match this filter */
  teamMembers_SINGLE?: InputMaybe<EmployeeWhere>;
  /** Return Teams where some of the related Employees match this filter */
  teamMembers_SOME?: InputMaybe<EmployeeWhere>;
  uid?: InputMaybe<Scalars['String']['input']>;
  uid_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  uid_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  uid_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  uid_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
};

export type TeamsConnection = {
  __typename?: 'TeamsConnection';
  edges: Array<TeamEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Unit = {
  __typename?: 'Unit';
  catalogueCategoryPropertiesHasUnit: Array<CatalogueCategoryProperty>;
  catalogueCategoryPropertiesHasUnitAggregate?: Maybe<UnitCatalogueCategoryPropertyCatalogueCategoryPropertiesHasUnitAggregationSelection>;
  catalogueCategoryPropertiesHasUnitConnection: UnitCatalogueCategoryPropertiesHasUnitConnection;
  code: Scalars['String']['output'];
  name: Scalars['String']['output'];
  uid: Scalars['String']['output'];
};


export type UnitCatalogueCategoryPropertiesHasUnitArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<CatalogueCategoryPropertyOptions>;
  where?: InputMaybe<CatalogueCategoryPropertyWhere>;
};


export type UnitCatalogueCategoryPropertiesHasUnitAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<CatalogueCategoryPropertyWhere>;
};


export type UnitCatalogueCategoryPropertiesHasUnitConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<UnitCatalogueCategoryPropertiesHasUnitConnectionSort>>;
  where?: InputMaybe<UnitCatalogueCategoryPropertiesHasUnitConnectionWhere>;
};

export type UnitAggregateSelection = {
  __typename?: 'UnitAggregateSelection';
  code: StringAggregateSelectionNonNullable;
  count: Scalars['Int']['output'];
  name: StringAggregateSelectionNonNullable;
  uid: StringAggregateSelectionNonNullable;
};

export type UnitCatalogueCategoryPropertiesHasUnitAggregateInput = {
  AND?: InputMaybe<Array<UnitCatalogueCategoryPropertiesHasUnitAggregateInput>>;
  NOT?: InputMaybe<UnitCatalogueCategoryPropertiesHasUnitAggregateInput>;
  OR?: InputMaybe<Array<UnitCatalogueCategoryPropertiesHasUnitAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<UnitCatalogueCategoryPropertiesHasUnitNodeAggregationWhereInput>;
};

export type UnitCatalogueCategoryPropertiesHasUnitConnectFieldInput = {
  connect?: InputMaybe<Array<CatalogueCategoryPropertyConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<CatalogueCategoryPropertyConnectWhere>;
};

export type UnitCatalogueCategoryPropertiesHasUnitConnection = {
  __typename?: 'UnitCatalogueCategoryPropertiesHasUnitConnection';
  edges: Array<UnitCatalogueCategoryPropertiesHasUnitRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type UnitCatalogueCategoryPropertiesHasUnitConnectionSort = {
  node?: InputMaybe<CatalogueCategoryPropertySort>;
};

export type UnitCatalogueCategoryPropertiesHasUnitConnectionWhere = {
  AND?: InputMaybe<Array<UnitCatalogueCategoryPropertiesHasUnitConnectionWhere>>;
  NOT?: InputMaybe<UnitCatalogueCategoryPropertiesHasUnitConnectionWhere>;
  OR?: InputMaybe<Array<UnitCatalogueCategoryPropertiesHasUnitConnectionWhere>>;
  node?: InputMaybe<CatalogueCategoryPropertyWhere>;
};

export type UnitCatalogueCategoryPropertiesHasUnitCreateFieldInput = {
  node: CatalogueCategoryPropertyCreateInput;
};

export type UnitCatalogueCategoryPropertiesHasUnitDeleteFieldInput = {
  delete?: InputMaybe<CatalogueCategoryPropertyDeleteInput>;
  where?: InputMaybe<UnitCatalogueCategoryPropertiesHasUnitConnectionWhere>;
};

export type UnitCatalogueCategoryPropertiesHasUnitDisconnectFieldInput = {
  disconnect?: InputMaybe<CatalogueCategoryPropertyDisconnectInput>;
  where?: InputMaybe<UnitCatalogueCategoryPropertiesHasUnitConnectionWhere>;
};

export type UnitCatalogueCategoryPropertiesHasUnitFieldInput = {
  connect?: InputMaybe<Array<UnitCatalogueCategoryPropertiesHasUnitConnectFieldInput>>;
  create?: InputMaybe<Array<UnitCatalogueCategoryPropertiesHasUnitCreateFieldInput>>;
};

export type UnitCatalogueCategoryPropertiesHasUnitNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<UnitCatalogueCategoryPropertiesHasUnitNodeAggregationWhereInput>>;
  NOT?: InputMaybe<UnitCatalogueCategoryPropertiesHasUnitNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<UnitCatalogueCategoryPropertiesHasUnitNodeAggregationWhereInput>>;
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
};

export type UnitCatalogueCategoryPropertiesHasUnitRelationship = {
  __typename?: 'UnitCatalogueCategoryPropertiesHasUnitRelationship';
  cursor: Scalars['String']['output'];
  node: CatalogueCategoryProperty;
};

export type UnitCatalogueCategoryPropertiesHasUnitUpdateConnectionInput = {
  node?: InputMaybe<CatalogueCategoryPropertyUpdateInput>;
};

export type UnitCatalogueCategoryPropertiesHasUnitUpdateFieldInput = {
  connect?: InputMaybe<Array<UnitCatalogueCategoryPropertiesHasUnitConnectFieldInput>>;
  create?: InputMaybe<Array<UnitCatalogueCategoryPropertiesHasUnitCreateFieldInput>>;
  delete?: InputMaybe<Array<UnitCatalogueCategoryPropertiesHasUnitDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<UnitCatalogueCategoryPropertiesHasUnitDisconnectFieldInput>>;
  update?: InputMaybe<UnitCatalogueCategoryPropertiesHasUnitUpdateConnectionInput>;
  where?: InputMaybe<UnitCatalogueCategoryPropertiesHasUnitConnectionWhere>;
};

export type UnitCatalogueCategoryPropertyCatalogueCategoryPropertiesHasUnitAggregationSelection = {
  __typename?: 'UnitCatalogueCategoryPropertyCatalogueCategoryPropertiesHasUnitAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<UnitCatalogueCategoryPropertyCatalogueCategoryPropertiesHasUnitNodeAggregateSelection>;
};

export type UnitCatalogueCategoryPropertyCatalogueCategoryPropertiesHasUnitNodeAggregateSelection = {
  __typename?: 'UnitCatalogueCategoryPropertyCatalogueCategoryPropertiesHasUnitNodeAggregateSelection';
  defaultValue: StringAggregateSelectionNonNullable;
  listOfValues: StringAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  uid: StringAggregateSelectionNonNullable;
};

export type UnitConnectInput = {
  catalogueCategoryPropertiesHasUnit?: InputMaybe<Array<UnitCatalogueCategoryPropertiesHasUnitConnectFieldInput>>;
};

export type UnitConnectWhere = {
  node: UnitWhere;
};

export type UnitCreateInput = {
  catalogueCategoryPropertiesHasUnit?: InputMaybe<UnitCatalogueCategoryPropertiesHasUnitFieldInput>;
  code: Scalars['String']['input'];
  name: Scalars['String']['input'];
  uid: Scalars['String']['input'];
};

export type UnitDeleteInput = {
  catalogueCategoryPropertiesHasUnit?: InputMaybe<Array<UnitCatalogueCategoryPropertiesHasUnitDeleteFieldInput>>;
};

export type UnitDisconnectInput = {
  catalogueCategoryPropertiesHasUnit?: InputMaybe<Array<UnitCatalogueCategoryPropertiesHasUnitDisconnectFieldInput>>;
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

export type UnitRelationInput = {
  catalogueCategoryPropertiesHasUnit?: InputMaybe<Array<UnitCatalogueCategoryPropertiesHasUnitCreateFieldInput>>;
};

/** Fields to sort Units by. The order in which sorts are applied is not guaranteed when specifying many fields in one UnitSort object. */
export type UnitSort = {
  code?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  uid?: InputMaybe<SortDirection>;
};

export type UnitUpdateInput = {
  catalogueCategoryPropertiesHasUnit?: InputMaybe<Array<UnitCatalogueCategoryPropertiesHasUnitUpdateFieldInput>>;
  code?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  uid?: InputMaybe<Scalars['String']['input']>;
};

export type UnitWhere = {
  AND?: InputMaybe<Array<UnitWhere>>;
  NOT?: InputMaybe<UnitWhere>;
  OR?: InputMaybe<Array<UnitWhere>>;
  catalogueCategoryPropertiesHasUnitAggregate?: InputMaybe<UnitCatalogueCategoryPropertiesHasUnitAggregateInput>;
  /** Return Units where all of the related UnitCatalogueCategoryPropertiesHasUnitConnections match this filter */
  catalogueCategoryPropertiesHasUnitConnection_ALL?: InputMaybe<UnitCatalogueCategoryPropertiesHasUnitConnectionWhere>;
  /** Return Units where none of the related UnitCatalogueCategoryPropertiesHasUnitConnections match this filter */
  catalogueCategoryPropertiesHasUnitConnection_NONE?: InputMaybe<UnitCatalogueCategoryPropertiesHasUnitConnectionWhere>;
  /** Return Units where one of the related UnitCatalogueCategoryPropertiesHasUnitConnections match this filter */
  catalogueCategoryPropertiesHasUnitConnection_SINGLE?: InputMaybe<UnitCatalogueCategoryPropertiesHasUnitConnectionWhere>;
  /** Return Units where some of the related UnitCatalogueCategoryPropertiesHasUnitConnections match this filter */
  catalogueCategoryPropertiesHasUnitConnection_SOME?: InputMaybe<UnitCatalogueCategoryPropertiesHasUnitConnectionWhere>;
  /** Return Units where all of the related CatalogueCategoryProperties match this filter */
  catalogueCategoryPropertiesHasUnit_ALL?: InputMaybe<CatalogueCategoryPropertyWhere>;
  /** Return Units where none of the related CatalogueCategoryProperties match this filter */
  catalogueCategoryPropertiesHasUnit_NONE?: InputMaybe<CatalogueCategoryPropertyWhere>;
  /** Return Units where one of the related CatalogueCategoryProperties match this filter */
  catalogueCategoryPropertiesHasUnit_SINGLE?: InputMaybe<CatalogueCategoryPropertyWhere>;
  /** Return Units where some of the related CatalogueCategoryProperties match this filter */
  catalogueCategoryPropertiesHasUnit_SOME?: InputMaybe<CatalogueCategoryPropertyWhere>;
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

export type UpdateInfo = {
  __typename?: 'UpdateInfo';
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

export type UpdateLocationsMutationResponse = {
  __typename?: 'UpdateLocationsMutationResponse';
  info: UpdateInfo;
  locations: Array<Location>;
};

export type UpdateManufacturersMutationResponse = {
  __typename?: 'UpdateManufacturersMutationResponse';
  info: UpdateInfo;
  manufacturers: Array<Manufacturer>;
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
  firstName: Scalars['String']['output'];
  hasRoleRoles: Array<Role>;
  hasRoleRolesAggregate?: Maybe<UserRoleHasRoleRolesAggregationSelection>;
  hasRoleRolesConnection: UserHasRoleRolesConnection;
  isEnabled: Scalars['Boolean']['output'];
  lastName: Scalars['String']['output'];
  passwordHash: Scalars['String']['output'];
  uid: Scalars['String']['output'];
  username: Scalars['String']['output'];
};


export type UserHasRoleRolesArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<RoleOptions>;
  where?: InputMaybe<RoleWhere>;
};


export type UserHasRoleRolesAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<RoleWhere>;
};


export type UserHasRoleRolesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<UserHasRoleRolesConnectionSort>>;
  where?: InputMaybe<UserHasRoleRolesConnectionWhere>;
};

export type UserAggregateSelection = {
  __typename?: 'UserAggregateSelection';
  count: Scalars['Int']['output'];
  email: StringAggregateSelectionNonNullable;
  firstName: StringAggregateSelectionNonNullable;
  lastName: StringAggregateSelectionNonNullable;
  passwordHash: StringAggregateSelectionNonNullable;
  uid: StringAggregateSelectionNonNullable;
  username: StringAggregateSelectionNonNullable;
};

export type UserConnectInput = {
  hasRoleRoles?: InputMaybe<Array<UserHasRoleRolesConnectFieldInput>>;
};

export type UserConnectWhere = {
  node: UserWhere;
};

export type UserCreateInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  hasRoleRoles?: InputMaybe<UserHasRoleRolesFieldInput>;
  isEnabled: Scalars['Boolean']['input'];
  lastName: Scalars['String']['input'];
  passwordHash: Scalars['String']['input'];
  uid: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type UserDeleteInput = {
  hasRoleRoles?: InputMaybe<Array<UserHasRoleRolesDeleteFieldInput>>;
};

export type UserDisconnectInput = {
  hasRoleRoles?: InputMaybe<Array<UserHasRoleRolesDisconnectFieldInput>>;
};

export type UserEdge = {
  __typename?: 'UserEdge';
  cursor: Scalars['String']['output'];
  node: User;
};

export type UserHasRoleRolesAggregateInput = {
  AND?: InputMaybe<Array<UserHasRoleRolesAggregateInput>>;
  NOT?: InputMaybe<UserHasRoleRolesAggregateInput>;
  OR?: InputMaybe<Array<UserHasRoleRolesAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<UserHasRoleRolesNodeAggregationWhereInput>;
};

export type UserHasRoleRolesConnectFieldInput = {
  connect?: InputMaybe<Array<RoleConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<RoleConnectWhere>;
};

export type UserHasRoleRolesConnection = {
  __typename?: 'UserHasRoleRolesConnection';
  edges: Array<UserHasRoleRolesRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type UserHasRoleRolesConnectionSort = {
  node?: InputMaybe<RoleSort>;
};

export type UserHasRoleRolesConnectionWhere = {
  AND?: InputMaybe<Array<UserHasRoleRolesConnectionWhere>>;
  NOT?: InputMaybe<UserHasRoleRolesConnectionWhere>;
  OR?: InputMaybe<Array<UserHasRoleRolesConnectionWhere>>;
  node?: InputMaybe<RoleWhere>;
};

export type UserHasRoleRolesCreateFieldInput = {
  node: RoleCreateInput;
};

export type UserHasRoleRolesDeleteFieldInput = {
  delete?: InputMaybe<RoleDeleteInput>;
  where?: InputMaybe<UserHasRoleRolesConnectionWhere>;
};

export type UserHasRoleRolesDisconnectFieldInput = {
  disconnect?: InputMaybe<RoleDisconnectInput>;
  where?: InputMaybe<UserHasRoleRolesConnectionWhere>;
};

export type UserHasRoleRolesFieldInput = {
  connect?: InputMaybe<Array<UserHasRoleRolesConnectFieldInput>>;
  create?: InputMaybe<Array<UserHasRoleRolesCreateFieldInput>>;
};

export type UserHasRoleRolesNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<UserHasRoleRolesNodeAggregationWhereInput>>;
  NOT?: InputMaybe<UserHasRoleRolesNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<UserHasRoleRolesNodeAggregationWhereInput>>;
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

export type UserHasRoleRolesRelationship = {
  __typename?: 'UserHasRoleRolesRelationship';
  cursor: Scalars['String']['output'];
  node: Role;
};

export type UserHasRoleRolesUpdateConnectionInput = {
  node?: InputMaybe<RoleUpdateInput>;
};

export type UserHasRoleRolesUpdateFieldInput = {
  connect?: InputMaybe<Array<UserHasRoleRolesConnectFieldInput>>;
  create?: InputMaybe<Array<UserHasRoleRolesCreateFieldInput>>;
  delete?: InputMaybe<Array<UserHasRoleRolesDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<UserHasRoleRolesDisconnectFieldInput>>;
  update?: InputMaybe<UserHasRoleRolesUpdateConnectionInput>;
  where?: InputMaybe<UserHasRoleRolesConnectionWhere>;
};

export type UserOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /** Specify one or more UserSort objects to sort Users by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<UserSort>>;
};

export type UserRelationInput = {
  hasRoleRoles?: InputMaybe<Array<UserHasRoleRolesCreateFieldInput>>;
};

export type UserRoleHasRoleRolesAggregationSelection = {
  __typename?: 'UserRoleHasRoleRolesAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<UserRoleHasRoleRolesNodeAggregateSelection>;
};

export type UserRoleHasRoleRolesNodeAggregateSelection = {
  __typename?: 'UserRoleHasRoleRolesNodeAggregateSelection';
  code: StringAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
  uid: StringAggregateSelectionNonNullable;
};

/** Fields to sort Users by. The order in which sorts are applied is not guaranteed when specifying many fields in one UserSort object. */
export type UserSort = {
  email?: InputMaybe<SortDirection>;
  firstName?: InputMaybe<SortDirection>;
  isEnabled?: InputMaybe<SortDirection>;
  lastName?: InputMaybe<SortDirection>;
  passwordHash?: InputMaybe<SortDirection>;
  uid?: InputMaybe<SortDirection>;
  username?: InputMaybe<SortDirection>;
};

export type UserUpdateInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  hasRoleRoles?: InputMaybe<Array<UserHasRoleRolesUpdateFieldInput>>;
  isEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  passwordHash?: InputMaybe<Scalars['String']['input']>;
  uid?: InputMaybe<Scalars['String']['input']>;
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
  firstName?: InputMaybe<Scalars['String']['input']>;
  firstName_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  firstName_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  firstName_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  firstName_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  hasRoleRolesAggregate?: InputMaybe<UserHasRoleRolesAggregateInput>;
  /** Return Users where all of the related UserHasRoleRolesConnections match this filter */
  hasRoleRolesConnection_ALL?: InputMaybe<UserHasRoleRolesConnectionWhere>;
  /** Return Users where none of the related UserHasRoleRolesConnections match this filter */
  hasRoleRolesConnection_NONE?: InputMaybe<UserHasRoleRolesConnectionWhere>;
  /** Return Users where one of the related UserHasRoleRolesConnections match this filter */
  hasRoleRolesConnection_SINGLE?: InputMaybe<UserHasRoleRolesConnectionWhere>;
  /** Return Users where some of the related UserHasRoleRolesConnections match this filter */
  hasRoleRolesConnection_SOME?: InputMaybe<UserHasRoleRolesConnectionWhere>;
  /** Return Users where all of the related Roles match this filter */
  hasRoleRoles_ALL?: InputMaybe<RoleWhere>;
  /** Return Users where none of the related Roles match this filter */
  hasRoleRoles_NONE?: InputMaybe<RoleWhere>;
  /** Return Users where one of the related Roles match this filter */
  hasRoleRoles_SINGLE?: InputMaybe<RoleWhere>;
  /** Return Users where some of the related Roles match this filter */
  hasRoleRoles_SOME?: InputMaybe<RoleWhere>;
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
  uid?: InputMaybe<Scalars['String']['input']>;
  uid_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  uid_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  uid_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  uid_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
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
  uid: Scalars['String']['output'];
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
  uid: StringAggregateSelectionNonNullable;
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
  uid: Scalars['String']['input'];
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
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
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
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
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
  uid?: InputMaybe<Scalars['String']['input']>;
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
  uid?: InputMaybe<Scalars['String']['input']>;
  uid_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  uid_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  uid_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  uid_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
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
  uid: StringAggregateSelectionNonNullable;
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
  uid: StringAggregateSelectionNonNullable;
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
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
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
