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
};

export type CatalogueCategoriesConnection = {
  __typename?: 'CatalogueCategoriesConnection';
  edges: Array<CatalogueCategoryEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type CatalogueCategory = {
  __typename?: 'CatalogueCategory';
  code?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  parentCategory: CatalogueCategory;
  parentCategoryAggregate?: Maybe<CatalogueCategoryCatalogueCategoryParentCategoryAggregationSelection>;
  parentCategoryConnection: CatalogueCategoryParentCategoryConnection;
  parentPath: Array<ParentPathItem>;
  subCategories: Array<CatalogueCategory>;
  subCategoriesAggregate?: Maybe<CatalogueCategoryCatalogueCategorySubCategoriesAggregationSelection>;
  subCategoriesConnection: CatalogueCategorySubCategoriesConnection;
  uid?: Maybe<Scalars['String']['output']>;
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


export type CatalogueCategorySubCategoriesArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  options?: InputMaybe<CatalogueCategoryOptions>;
  where?: InputMaybe<CatalogueCategoryWhere>;
};


export type CatalogueCategorySubCategoriesAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<CatalogueCategoryWhere>;
};


export type CatalogueCategorySubCategoriesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  directed?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<CatalogueCategorySubCategoriesConnectionSort>>;
  where?: InputMaybe<CatalogueCategorySubCategoriesConnectionWhere>;
};

export type CatalogueCategoryAggregateSelection = {
  __typename?: 'CatalogueCategoryAggregateSelection';
  code: StringAggregateSelectionNullable;
  count: Scalars['Int']['output'];
  name: StringAggregateSelectionNullable;
  uid: StringAggregateSelectionNullable;
};

export type CatalogueCategoryCatalogueCategoryParentCategoryAggregationSelection = {
  __typename?: 'CatalogueCategoryCatalogueCategoryParentCategoryAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<CatalogueCategoryCatalogueCategoryParentCategoryNodeAggregateSelection>;
};

export type CatalogueCategoryCatalogueCategoryParentCategoryNodeAggregateSelection = {
  __typename?: 'CatalogueCategoryCatalogueCategoryParentCategoryNodeAggregateSelection';
  code: StringAggregateSelectionNullable;
  name: StringAggregateSelectionNullable;
  uid: StringAggregateSelectionNullable;
};

export type CatalogueCategoryCatalogueCategorySubCategoriesAggregationSelection = {
  __typename?: 'CatalogueCategoryCatalogueCategorySubCategoriesAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<CatalogueCategoryCatalogueCategorySubCategoriesNodeAggregateSelection>;
};

export type CatalogueCategoryCatalogueCategorySubCategoriesNodeAggregateSelection = {
  __typename?: 'CatalogueCategoryCatalogueCategorySubCategoriesNodeAggregateSelection';
  code: StringAggregateSelectionNullable;
  name: StringAggregateSelectionNullable;
  uid: StringAggregateSelectionNullable;
};

export type CatalogueCategoryConnectInput = {
  parentCategory?: InputMaybe<CatalogueCategoryParentCategoryConnectFieldInput>;
  subCategories?: InputMaybe<Array<CatalogueCategorySubCategoriesConnectFieldInput>>;
};

export type CatalogueCategoryConnectWhere = {
  node: CatalogueCategoryWhere;
};

export type CatalogueCategoryCreateInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parentCategory?: InputMaybe<CatalogueCategoryParentCategoryFieldInput>;
  subCategories?: InputMaybe<CatalogueCategorySubCategoriesFieldInput>;
  uid?: InputMaybe<Scalars['String']['input']>;
};

export type CatalogueCategoryDeleteInput = {
  parentCategory?: InputMaybe<CatalogueCategoryParentCategoryDeleteFieldInput>;
  subCategories?: InputMaybe<Array<CatalogueCategorySubCategoriesDeleteFieldInput>>;
};

export type CatalogueCategoryDisconnectInput = {
  parentCategory?: InputMaybe<CatalogueCategoryParentCategoryDisconnectFieldInput>;
  subCategories?: InputMaybe<Array<CatalogueCategorySubCategoriesDisconnectFieldInput>>;
};

export type CatalogueCategoryEdge = {
  __typename?: 'CatalogueCategoryEdge';
  cursor: Scalars['String']['output'];
  node: CatalogueCategory;
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

export type CatalogueCategoryRelationInput = {
  parentCategory?: InputMaybe<CatalogueCategoryParentCategoryCreateFieldInput>;
  subCategories?: InputMaybe<Array<CatalogueCategorySubCategoriesCreateFieldInput>>;
};

/** Fields to sort CatalogueCategories by. The order in which sorts are applied is not guaranteed when specifying many fields in one CatalogueCategorySort object. */
export type CatalogueCategorySort = {
  code?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  uid?: InputMaybe<SortDirection>;
};

export type CatalogueCategorySubCategoriesAggregateInput = {
  AND?: InputMaybe<Array<CatalogueCategorySubCategoriesAggregateInput>>;
  NOT?: InputMaybe<CatalogueCategorySubCategoriesAggregateInput>;
  OR?: InputMaybe<Array<CatalogueCategorySubCategoriesAggregateInput>>;
  count?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<CatalogueCategorySubCategoriesNodeAggregationWhereInput>;
};

export type CatalogueCategorySubCategoriesConnectFieldInput = {
  connect?: InputMaybe<Array<CatalogueCategoryConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean']['input'];
  where?: InputMaybe<CatalogueCategoryConnectWhere>;
};

export type CatalogueCategorySubCategoriesConnection = {
  __typename?: 'CatalogueCategorySubCategoriesConnection';
  edges: Array<CatalogueCategorySubCategoriesRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type CatalogueCategorySubCategoriesConnectionSort = {
  node?: InputMaybe<CatalogueCategorySort>;
};

export type CatalogueCategorySubCategoriesConnectionWhere = {
  AND?: InputMaybe<Array<CatalogueCategorySubCategoriesConnectionWhere>>;
  NOT?: InputMaybe<CatalogueCategorySubCategoriesConnectionWhere>;
  OR?: InputMaybe<Array<CatalogueCategorySubCategoriesConnectionWhere>>;
  node?: InputMaybe<CatalogueCategoryWhere>;
};

export type CatalogueCategorySubCategoriesCreateFieldInput = {
  node: CatalogueCategoryCreateInput;
};

export type CatalogueCategorySubCategoriesDeleteFieldInput = {
  delete?: InputMaybe<CatalogueCategoryDeleteInput>;
  where?: InputMaybe<CatalogueCategorySubCategoriesConnectionWhere>;
};

export type CatalogueCategorySubCategoriesDisconnectFieldInput = {
  disconnect?: InputMaybe<CatalogueCategoryDisconnectInput>;
  where?: InputMaybe<CatalogueCategorySubCategoriesConnectionWhere>;
};

export type CatalogueCategorySubCategoriesFieldInput = {
  connect?: InputMaybe<Array<CatalogueCategorySubCategoriesConnectFieldInput>>;
  create?: InputMaybe<Array<CatalogueCategorySubCategoriesCreateFieldInput>>;
};

export type CatalogueCategorySubCategoriesNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<CatalogueCategorySubCategoriesNodeAggregationWhereInput>>;
  NOT?: InputMaybe<CatalogueCategorySubCategoriesNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<CatalogueCategorySubCategoriesNodeAggregationWhereInput>>;
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

export type CatalogueCategorySubCategoriesRelationship = {
  __typename?: 'CatalogueCategorySubCategoriesRelationship';
  cursor: Scalars['String']['output'];
  node: CatalogueCategory;
};

export type CatalogueCategorySubCategoriesUpdateConnectionInput = {
  node?: InputMaybe<CatalogueCategoryUpdateInput>;
};

export type CatalogueCategorySubCategoriesUpdateFieldInput = {
  connect?: InputMaybe<Array<CatalogueCategorySubCategoriesConnectFieldInput>>;
  create?: InputMaybe<Array<CatalogueCategorySubCategoriesCreateFieldInput>>;
  delete?: InputMaybe<Array<CatalogueCategorySubCategoriesDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<CatalogueCategorySubCategoriesDisconnectFieldInput>>;
  update?: InputMaybe<CatalogueCategorySubCategoriesUpdateConnectionInput>;
  where?: InputMaybe<CatalogueCategorySubCategoriesConnectionWhere>;
};

export type CatalogueCategoryUpdateInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parentCategory?: InputMaybe<CatalogueCategoryParentCategoryUpdateFieldInput>;
  subCategories?: InputMaybe<Array<CatalogueCategorySubCategoriesUpdateFieldInput>>;
  uid?: InputMaybe<Scalars['String']['input']>;
};

export type CatalogueCategoryWhere = {
  AND?: InputMaybe<Array<CatalogueCategoryWhere>>;
  NOT?: InputMaybe<CatalogueCategoryWhere>;
  OR?: InputMaybe<Array<CatalogueCategoryWhere>>;
  code?: InputMaybe<Scalars['String']['input']>;
  code_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  code_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  code_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  code_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  parentCategory?: InputMaybe<CatalogueCategoryWhere>;
  parentCategoryAggregate?: InputMaybe<CatalogueCategoryParentCategoryAggregateInput>;
  parentCategoryConnection?: InputMaybe<CatalogueCategoryParentCategoryConnectionWhere>;
  parentCategoryConnection_NOT?: InputMaybe<CatalogueCategoryParentCategoryConnectionWhere>;
  parentCategory_NOT?: InputMaybe<CatalogueCategoryWhere>;
  subCategoriesAggregate?: InputMaybe<CatalogueCategorySubCategoriesAggregateInput>;
  /** Return CatalogueCategories where all of the related CatalogueCategorySubCategoriesConnections match this filter */
  subCategoriesConnection_ALL?: InputMaybe<CatalogueCategorySubCategoriesConnectionWhere>;
  /** Return CatalogueCategories where none of the related CatalogueCategorySubCategoriesConnections match this filter */
  subCategoriesConnection_NONE?: InputMaybe<CatalogueCategorySubCategoriesConnectionWhere>;
  /** Return CatalogueCategories where one of the related CatalogueCategorySubCategoriesConnections match this filter */
  subCategoriesConnection_SINGLE?: InputMaybe<CatalogueCategorySubCategoriesConnectionWhere>;
  /** Return CatalogueCategories where some of the related CatalogueCategorySubCategoriesConnections match this filter */
  subCategoriesConnection_SOME?: InputMaybe<CatalogueCategorySubCategoriesConnectionWhere>;
  /** Return CatalogueCategories where all of the related CatalogueCategories match this filter */
  subCategories_ALL?: InputMaybe<CatalogueCategoryWhere>;
  /** Return CatalogueCategories where none of the related CatalogueCategories match this filter */
  subCategories_NONE?: InputMaybe<CatalogueCategoryWhere>;
  /** Return CatalogueCategories where one of the related CatalogueCategories match this filter */
  subCategories_SINGLE?: InputMaybe<CatalogueCategoryWhere>;
  /** Return CatalogueCategories where some of the related CatalogueCategories match this filter */
  subCategories_SOME?: InputMaybe<CatalogueCategoryWhere>;
  uid?: InputMaybe<Scalars['String']['input']>;
  uid_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  uid_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  uid_IN?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  uid_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
};

export type CreateCatalogueCategoriesMutationResponse = {
  __typename?: 'CreateCatalogueCategoriesMutationResponse';
  catalogueCategories: Array<CatalogueCategory>;
  info: CreateInfo;
};

export type CreateInfo = {
  __typename?: 'CreateInfo';
  bookmark?: Maybe<Scalars['String']['output']>;
  nodesCreated: Scalars['Int']['output'];
  relationshipsCreated: Scalars['Int']['output'];
};

export type CreateParentPathItemsMutationResponse = {
  __typename?: 'CreateParentPathItemsMutationResponse';
  info: CreateInfo;
  parentPathItems: Array<ParentPathItem>;
};

export type DeleteInfo = {
  __typename?: 'DeleteInfo';
  bookmark?: Maybe<Scalars['String']['output']>;
  nodesDeleted: Scalars['Int']['output'];
  relationshipsDeleted: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCatalogueCategories: CreateCatalogueCategoriesMutationResponse;
  createParentPathItems: CreateParentPathItemsMutationResponse;
  deleteCatalogueCategories: DeleteInfo;
  deleteParentPathItems: DeleteInfo;
  updateCatalogueCategories: UpdateCatalogueCategoriesMutationResponse;
  updateParentPathItems: UpdateParentPathItemsMutationResponse;
};


export type MutationCreateCatalogueCategoriesArgs = {
  input: Array<CatalogueCategoryCreateInput>;
};


export type MutationCreateParentPathItemsArgs = {
  input: Array<ParentPathItemCreateInput>;
};


export type MutationDeleteCatalogueCategoriesArgs = {
  delete?: InputMaybe<CatalogueCategoryDeleteInput>;
  where?: InputMaybe<CatalogueCategoryWhere>;
};


export type MutationDeleteParentPathItemsArgs = {
  where?: InputMaybe<ParentPathItemWhere>;
};


export type MutationUpdateCatalogueCategoriesArgs = {
  connect?: InputMaybe<CatalogueCategoryConnectInput>;
  create?: InputMaybe<CatalogueCategoryRelationInput>;
  delete?: InputMaybe<CatalogueCategoryDeleteInput>;
  disconnect?: InputMaybe<CatalogueCategoryDisconnectInput>;
  update?: InputMaybe<CatalogueCategoryUpdateInput>;
  where?: InputMaybe<CatalogueCategoryWhere>;
};


export type MutationUpdateParentPathItemsArgs = {
  update?: InputMaybe<ParentPathItemUpdateInput>;
  where?: InputMaybe<ParentPathItemWhere>;
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
  parentPathItems: Array<ParentPathItem>;
  parentPathItemsAggregate: ParentPathItemAggregateSelection;
  parentPathItemsConnection: ParentPathItemsConnection;
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

export enum SortDirection {
  /** Sort by field values in ascending order. */
  Asc = 'ASC',
  /** Sort by field values in descending order. */
  Desc = 'DESC'
}

export type StringAggregateSelectionNullable = {
  __typename?: 'StringAggregateSelectionNullable';
  longest?: Maybe<Scalars['String']['output']>;
  shortest?: Maybe<Scalars['String']['output']>;
};

export type UpdateCatalogueCategoriesMutationResponse = {
  __typename?: 'UpdateCatalogueCategoriesMutationResponse';
  catalogueCategories: Array<CatalogueCategory>;
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

export type UpdateParentPathItemsMutationResponse = {
  __typename?: 'UpdateParentPathItemsMutationResponse';
  info: UpdateInfo;
  parentPathItems: Array<ParentPathItem>;
};
