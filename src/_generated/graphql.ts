import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import gql from 'graphql-tag';
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
  DateTime: { input: any; output: any; }
  Dimension: { input: any; output: any; }
  HexColor: { input: any; output: any; }
  JSON: { input: any; output: any; }
  Quality: { input: any; output: any; }
};

/** Represents a binary file in a space. An asset can be any file type. */
export type Asset = {
  __typename?: 'Asset';
  contentType?: Maybe<Scalars['String']['output']>;
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']['output']>;
  fileName?: Maybe<Scalars['String']['output']>;
  height?: Maybe<Scalars['Int']['output']>;
  linkedFrom?: Maybe<AssetLinkingCollections>;
  size?: Maybe<Scalars['Int']['output']>;
  sys: Sys;
  title?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  width?: Maybe<Scalars['Int']['output']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetContentTypeArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetFileNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetHeightArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetSizeArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetTitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetUrlArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  transform?: InputMaybe<ImageTransformOptions>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetWidthArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type AssetCollection = {
  __typename?: 'AssetCollection';
  items: Array<Maybe<Asset>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type AssetFilter = {
  AND?: InputMaybe<Array<InputMaybe<AssetFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<AssetFilter>>>;
  contentType?: InputMaybe<Scalars['String']['input']>;
  contentType_contains?: InputMaybe<Scalars['String']['input']>;
  contentType_exists?: InputMaybe<Scalars['Boolean']['input']>;
  contentType_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentType_not?: InputMaybe<Scalars['String']['input']>;
  contentType_not_contains?: InputMaybe<Scalars['String']['input']>;
  contentType_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']['input']>;
  description_contains?: InputMaybe<Scalars['String']['input']>;
  description_exists?: InputMaybe<Scalars['Boolean']['input']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  description_not?: InputMaybe<Scalars['String']['input']>;
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  fileName?: InputMaybe<Scalars['String']['input']>;
  fileName_contains?: InputMaybe<Scalars['String']['input']>;
  fileName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  fileName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  fileName_not?: InputMaybe<Scalars['String']['input']>;
  fileName_not_contains?: InputMaybe<Scalars['String']['input']>;
  fileName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  height?: InputMaybe<Scalars['Int']['input']>;
  height_exists?: InputMaybe<Scalars['Boolean']['input']>;
  height_gt?: InputMaybe<Scalars['Int']['input']>;
  height_gte?: InputMaybe<Scalars['Int']['input']>;
  height_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  height_lt?: InputMaybe<Scalars['Int']['input']>;
  height_lte?: InputMaybe<Scalars['Int']['input']>;
  height_not?: InputMaybe<Scalars['Int']['input']>;
  height_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  size?: InputMaybe<Scalars['Int']['input']>;
  size_exists?: InputMaybe<Scalars['Boolean']['input']>;
  size_gt?: InputMaybe<Scalars['Int']['input']>;
  size_gte?: InputMaybe<Scalars['Int']['input']>;
  size_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  size_lt?: InputMaybe<Scalars['Int']['input']>;
  size_lte?: InputMaybe<Scalars['Int']['input']>;
  size_not?: InputMaybe<Scalars['Int']['input']>;
  size_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  url?: InputMaybe<Scalars['String']['input']>;
  url_contains?: InputMaybe<Scalars['String']['input']>;
  url_exists?: InputMaybe<Scalars['Boolean']['input']>;
  url_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  url_not?: InputMaybe<Scalars['String']['input']>;
  url_not_contains?: InputMaybe<Scalars['String']['input']>;
  url_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  width?: InputMaybe<Scalars['Int']['input']>;
  width_exists?: InputMaybe<Scalars['Boolean']['input']>;
  width_gt?: InputMaybe<Scalars['Int']['input']>;
  width_gte?: InputMaybe<Scalars['Int']['input']>;
  width_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  width_lt?: InputMaybe<Scalars['Int']['input']>;
  width_lte?: InputMaybe<Scalars['Int']['input']>;
  width_not?: InputMaybe<Scalars['Int']['input']>;
  width_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
};

export type AssetLinkingCollections = {
  __typename?: 'AssetLinkingCollections';
  authorsCollection?: Maybe<AuthorsCollection>;
  blogPostsCollection?: Maybe<BlogPostsCollection>;
  blogsCollection?: Maybe<BlogsCollection>;
  entryCollection?: Maybe<EntryCollection>;
};


export type AssetLinkingCollectionsAuthorsCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<AssetLinkingCollectionsAuthorsCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type AssetLinkingCollectionsBlogPostsCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<AssetLinkingCollectionsBlogPostsCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type AssetLinkingCollectionsBlogsCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<AssetLinkingCollectionsBlogsCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type AssetLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export enum AssetLinkingCollectionsAuthorsCollectionOrder {
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export enum AssetLinkingCollectionsBlogPostsCollectionOrder {
  HandleAsc = 'handle_ASC',
  HandleDesc = 'handle_DESC',
  SeoTitleAsc = 'seoTitle_ASC',
  SeoTitleDesc = 'seoTitle_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export enum AssetLinkingCollectionsBlogsCollectionOrder {
  HandleAsc = 'handle_ASC',
  HandleDesc = 'handle_DESC',
  OrderAsc = 'order_ASC',
  OrderDesc = 'order_DESC',
  SeoTitleAsc = 'seoTitle_ASC',
  SeoTitleDesc = 'seoTitle_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export enum AssetOrder {
  ContentTypeAsc = 'contentType_ASC',
  ContentTypeDesc = 'contentType_DESC',
  FileNameAsc = 'fileName_ASC',
  FileNameDesc = 'fileName_DESC',
  HeightAsc = 'height_ASC',
  HeightDesc = 'height_DESC',
  SizeAsc = 'size_ASC',
  SizeDesc = 'size_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC',
  WidthAsc = 'width_ASC',
  WidthDesc = 'width_DESC'
}

/** Blog authors [See type definition](https://app.contentful.com/spaces/psv30rr5xkc2/content_types/authors) */
export type Authors = Entry & {
  __typename?: 'Authors';
  bio?: Maybe<Scalars['String']['output']>;
  contentfulMetadata: ContentfulMetadata;
  linkedFrom?: Maybe<AuthorsLinkingCollections>;
  name?: Maybe<Scalars['String']['output']>;
  profileImage?: Maybe<Asset>;
  sys: Sys;
};


/** Blog authors [See type definition](https://app.contentful.com/spaces/psv30rr5xkc2/content_types/authors) */
export type AuthorsBioArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Blog authors [See type definition](https://app.contentful.com/spaces/psv30rr5xkc2/content_types/authors) */
export type AuthorsLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** Blog authors [See type definition](https://app.contentful.com/spaces/psv30rr5xkc2/content_types/authors) */
export type AuthorsNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Blog authors [See type definition](https://app.contentful.com/spaces/psv30rr5xkc2/content_types/authors) */
export type AuthorsProfileImageArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};

export type AuthorsCollection = {
  __typename?: 'AuthorsCollection';
  items: Array<Maybe<Authors>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type AuthorsFilter = {
  AND?: InputMaybe<Array<InputMaybe<AuthorsFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<AuthorsFilter>>>;
  bio?: InputMaybe<Scalars['String']['input']>;
  bio_contains?: InputMaybe<Scalars['String']['input']>;
  bio_exists?: InputMaybe<Scalars['Boolean']['input']>;
  bio_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  bio_not?: InputMaybe<Scalars['String']['input']>;
  bio_not_contains?: InputMaybe<Scalars['String']['input']>;
  bio_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_exists?: InputMaybe<Scalars['Boolean']['input']>;
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name_not?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  profileImage_exists?: InputMaybe<Scalars['Boolean']['input']>;
  sys?: InputMaybe<SysFilter>;
};

export type AuthorsLinkingCollections = {
  __typename?: 'AuthorsLinkingCollections';
  blogPostsCollection?: Maybe<BlogPostsCollection>;
  entryCollection?: Maybe<EntryCollection>;
};


export type AuthorsLinkingCollectionsBlogPostsCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<AuthorsLinkingCollectionsBlogPostsCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type AuthorsLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export enum AuthorsLinkingCollectionsBlogPostsCollectionOrder {
  HandleAsc = 'handle_ASC',
  HandleDesc = 'handle_DESC',
  SeoTitleAsc = 'seoTitle_ASC',
  SeoTitleDesc = 'seoTitle_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export enum AuthorsOrder {
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

/** Blog Posts [See type definition](https://app.contentful.com/spaces/psv30rr5xkc2/content_types/blogPosts) */
export type BlogPosts = Entry & {
  __typename?: 'BlogPosts';
  authorsCollection?: Maybe<BlogPostsAuthorsCollection>;
  blog?: Maybe<Blogs>;
  content?: Maybe<BlogPostsContent>;
  contentfulMetadata: ContentfulMetadata;
  excerpt?: Maybe<Scalars['String']['output']>;
  featuredImage?: Maybe<Asset>;
  handle?: Maybe<Scalars['String']['output']>;
  linkedFrom?: Maybe<BlogPostsLinkingCollections>;
  seoDescription?: Maybe<Scalars['String']['output']>;
  seoTitle?: Maybe<Scalars['String']['output']>;
  sys: Sys;
  tags?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  title?: Maybe<Scalars['String']['output']>;
};


/** Blog Posts [See type definition](https://app.contentful.com/spaces/psv30rr5xkc2/content_types/blogPosts) */
export type BlogPostsAuthorsCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<BlogPostsAuthorsCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AuthorsFilter>;
};


/** Blog Posts [See type definition](https://app.contentful.com/spaces/psv30rr5xkc2/content_types/blogPosts) */
export type BlogPostsBlogArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<BlogsFilter>;
};


/** Blog Posts [See type definition](https://app.contentful.com/spaces/psv30rr5xkc2/content_types/blogPosts) */
export type BlogPostsContentArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Blog Posts [See type definition](https://app.contentful.com/spaces/psv30rr5xkc2/content_types/blogPosts) */
export type BlogPostsExcerptArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Blog Posts [See type definition](https://app.contentful.com/spaces/psv30rr5xkc2/content_types/blogPosts) */
export type BlogPostsFeaturedImageArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Blog Posts [See type definition](https://app.contentful.com/spaces/psv30rr5xkc2/content_types/blogPosts) */
export type BlogPostsHandleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Blog Posts [See type definition](https://app.contentful.com/spaces/psv30rr5xkc2/content_types/blogPosts) */
export type BlogPostsLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** Blog Posts [See type definition](https://app.contentful.com/spaces/psv30rr5xkc2/content_types/blogPosts) */
export type BlogPostsSeoDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Blog Posts [See type definition](https://app.contentful.com/spaces/psv30rr5xkc2/content_types/blogPosts) */
export type BlogPostsSeoTitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Blog Posts [See type definition](https://app.contentful.com/spaces/psv30rr5xkc2/content_types/blogPosts) */
export type BlogPostsTagsArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Blog Posts [See type definition](https://app.contentful.com/spaces/psv30rr5xkc2/content_types/blogPosts) */
export type BlogPostsTitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type BlogPostsAuthorsCollection = {
  __typename?: 'BlogPostsAuthorsCollection';
  items: Array<Maybe<Authors>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export enum BlogPostsAuthorsCollectionOrder {
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type BlogPostsCollection = {
  __typename?: 'BlogPostsCollection';
  items: Array<Maybe<BlogPosts>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type BlogPostsContent = {
  __typename?: 'BlogPostsContent';
  json: Scalars['JSON']['output'];
  links: BlogPostsContentLinks;
};

export type BlogPostsContentAssets = {
  __typename?: 'BlogPostsContentAssets';
  block: Array<Maybe<Asset>>;
  hyperlink: Array<Maybe<Asset>>;
};

export type BlogPostsContentEntries = {
  __typename?: 'BlogPostsContentEntries';
  block: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  inline: Array<Maybe<Entry>>;
};

export type BlogPostsContentLinks = {
  __typename?: 'BlogPostsContentLinks';
  assets: BlogPostsContentAssets;
  entries: BlogPostsContentEntries;
  resources: BlogPostsContentResources;
};

export type BlogPostsContentResources = {
  __typename?: 'BlogPostsContentResources';
  block: Array<ResourceLink>;
};

export type BlogPostsFilter = {
  AND?: InputMaybe<Array<InputMaybe<BlogPostsFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<BlogPostsFilter>>>;
  authors?: InputMaybe<CfAuthorsNestedFilter>;
  authorsCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
  blog?: InputMaybe<CfBlogsNestedFilter>;
  blog_exists?: InputMaybe<Scalars['Boolean']['input']>;
  content_contains?: InputMaybe<Scalars['String']['input']>;
  content_exists?: InputMaybe<Scalars['Boolean']['input']>;
  content_not_contains?: InputMaybe<Scalars['String']['input']>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  excerpt?: InputMaybe<Scalars['String']['input']>;
  excerpt_contains?: InputMaybe<Scalars['String']['input']>;
  excerpt_exists?: InputMaybe<Scalars['Boolean']['input']>;
  excerpt_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  excerpt_not?: InputMaybe<Scalars['String']['input']>;
  excerpt_not_contains?: InputMaybe<Scalars['String']['input']>;
  excerpt_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  featuredImage_exists?: InputMaybe<Scalars['Boolean']['input']>;
  handle?: InputMaybe<Scalars['String']['input']>;
  handle_contains?: InputMaybe<Scalars['String']['input']>;
  handle_exists?: InputMaybe<Scalars['Boolean']['input']>;
  handle_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  handle_not?: InputMaybe<Scalars['String']['input']>;
  handle_not_contains?: InputMaybe<Scalars['String']['input']>;
  handle_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  seoDescription?: InputMaybe<Scalars['String']['input']>;
  seoDescription_contains?: InputMaybe<Scalars['String']['input']>;
  seoDescription_exists?: InputMaybe<Scalars['Boolean']['input']>;
  seoDescription_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  seoDescription_not?: InputMaybe<Scalars['String']['input']>;
  seoDescription_not_contains?: InputMaybe<Scalars['String']['input']>;
  seoDescription_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  seoTitle?: InputMaybe<Scalars['String']['input']>;
  seoTitle_contains?: InputMaybe<Scalars['String']['input']>;
  seoTitle_exists?: InputMaybe<Scalars['Boolean']['input']>;
  seoTitle_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  seoTitle_not?: InputMaybe<Scalars['String']['input']>;
  seoTitle_not_contains?: InputMaybe<Scalars['String']['input']>;
  seoTitle_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  tags_contains_all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tags_contains_none?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tags_contains_some?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tags_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type BlogPostsLinkingCollections = {
  __typename?: 'BlogPostsLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type BlogPostsLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export enum BlogPostsOrder {
  HandleAsc = 'handle_ASC',
  HandleDesc = 'handle_DESC',
  SeoTitleAsc = 'seoTitle_ASC',
  SeoTitleDesc = 'seoTitle_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

/** Blog that will hold all blog posts [See type definition](https://app.contentful.com/spaces/psv30rr5xkc2/content_types/blogs) */
export type Blogs = Entry & {
  __typename?: 'Blogs';
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']['output']>;
  featuredMedia?: Maybe<Asset>;
  handle?: Maybe<Scalars['String']['output']>;
  linkedFrom?: Maybe<BlogsLinkingCollections>;
  order?: Maybe<Scalars['Int']['output']>;
  seoDescription?: Maybe<Scalars['String']['output']>;
  seoTitle?: Maybe<Scalars['String']['output']>;
  sys: Sys;
  title?: Maybe<Scalars['String']['output']>;
};


/** Blog that will hold all blog posts [See type definition](https://app.contentful.com/spaces/psv30rr5xkc2/content_types/blogs) */
export type BlogsDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Blog that will hold all blog posts [See type definition](https://app.contentful.com/spaces/psv30rr5xkc2/content_types/blogs) */
export type BlogsFeaturedMediaArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Blog that will hold all blog posts [See type definition](https://app.contentful.com/spaces/psv30rr5xkc2/content_types/blogs) */
export type BlogsHandleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Blog that will hold all blog posts [See type definition](https://app.contentful.com/spaces/psv30rr5xkc2/content_types/blogs) */
export type BlogsLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** Blog that will hold all blog posts [See type definition](https://app.contentful.com/spaces/psv30rr5xkc2/content_types/blogs) */
export type BlogsOrderArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Blog that will hold all blog posts [See type definition](https://app.contentful.com/spaces/psv30rr5xkc2/content_types/blogs) */
export type BlogsSeoDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Blog that will hold all blog posts [See type definition](https://app.contentful.com/spaces/psv30rr5xkc2/content_types/blogs) */
export type BlogsSeoTitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** Blog that will hold all blog posts [See type definition](https://app.contentful.com/spaces/psv30rr5xkc2/content_types/blogs) */
export type BlogsTitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type BlogsCollection = {
  __typename?: 'BlogsCollection';
  items: Array<Maybe<Blogs>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type BlogsFilter = {
  AND?: InputMaybe<Array<InputMaybe<BlogsFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<BlogsFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']['input']>;
  description_contains?: InputMaybe<Scalars['String']['input']>;
  description_exists?: InputMaybe<Scalars['Boolean']['input']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  description_not?: InputMaybe<Scalars['String']['input']>;
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  featuredMedia_exists?: InputMaybe<Scalars['Boolean']['input']>;
  handle?: InputMaybe<Scalars['String']['input']>;
  handle_contains?: InputMaybe<Scalars['String']['input']>;
  handle_exists?: InputMaybe<Scalars['Boolean']['input']>;
  handle_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  handle_not?: InputMaybe<Scalars['String']['input']>;
  handle_not_contains?: InputMaybe<Scalars['String']['input']>;
  handle_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  order?: InputMaybe<Scalars['Int']['input']>;
  order_exists?: InputMaybe<Scalars['Boolean']['input']>;
  order_gt?: InputMaybe<Scalars['Int']['input']>;
  order_gte?: InputMaybe<Scalars['Int']['input']>;
  order_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  order_lt?: InputMaybe<Scalars['Int']['input']>;
  order_lte?: InputMaybe<Scalars['Int']['input']>;
  order_not?: InputMaybe<Scalars['Int']['input']>;
  order_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  seoDescription?: InputMaybe<Scalars['String']['input']>;
  seoDescription_contains?: InputMaybe<Scalars['String']['input']>;
  seoDescription_exists?: InputMaybe<Scalars['Boolean']['input']>;
  seoDescription_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  seoDescription_not?: InputMaybe<Scalars['String']['input']>;
  seoDescription_not_contains?: InputMaybe<Scalars['String']['input']>;
  seoDescription_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  seoTitle?: InputMaybe<Scalars['String']['input']>;
  seoTitle_contains?: InputMaybe<Scalars['String']['input']>;
  seoTitle_exists?: InputMaybe<Scalars['Boolean']['input']>;
  seoTitle_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  seoTitle_not?: InputMaybe<Scalars['String']['input']>;
  seoTitle_not_contains?: InputMaybe<Scalars['String']['input']>;
  seoTitle_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type BlogsLinkingCollections = {
  __typename?: 'BlogsLinkingCollections';
  blogPostsCollection?: Maybe<BlogPostsCollection>;
  entryCollection?: Maybe<EntryCollection>;
};


export type BlogsLinkingCollectionsBlogPostsCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<BlogsLinkingCollectionsBlogPostsCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type BlogsLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export enum BlogsLinkingCollectionsBlogPostsCollectionOrder {
  HandleAsc = 'handle_ASC',
  HandleDesc = 'handle_DESC',
  SeoTitleAsc = 'seoTitle_ASC',
  SeoTitleDesc = 'seoTitle_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export enum BlogsOrder {
  HandleAsc = 'handle_ASC',
  HandleDesc = 'handle_DESC',
  OrderAsc = 'order_ASC',
  OrderDesc = 'order_DESC',
  SeoTitleAsc = 'seoTitle_ASC',
  SeoTitleDesc = 'seoTitle_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export type ContentfulMetadata = {
  __typename?: 'ContentfulMetadata';
  tags: Array<Maybe<ContentfulTag>>;
};

export type ContentfulMetadataFilter = {
  tags?: InputMaybe<ContentfulMetadataTagsFilter>;
  tags_exists?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ContentfulMetadataTagsFilter = {
  id_contains_all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_contains_none?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_contains_some?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/**
 * Represents a tag entity for finding and organizing content easily.
 *     Find out more here: https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/content-tags
 */
export type ContentfulTag = {
  __typename?: 'ContentfulTag';
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type Entry = {
  contentfulMetadata: ContentfulMetadata;
  sys: Sys;
};

export type EntryCollection = {
  __typename?: 'EntryCollection';
  items: Array<Maybe<Entry>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type EntryFilter = {
  AND?: InputMaybe<Array<InputMaybe<EntryFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<EntryFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  sys?: InputMaybe<SysFilter>;
};

export enum EntryOrder {
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export enum ImageFormat {
  Avif = 'AVIF',
  /** JPG image format. */
  Jpg = 'JPG',
  /**
   * Progressive JPG format stores multiple passes of an image in progressively higher detail.
   *         When a progressive image is loading, the viewer will first see a lower quality pixelated version which
   *         will gradually improve in detail, until the image is fully downloaded. This is to display an image as
   *         early as possible to make the layout look as designed.
   */
  JpgProgressive = 'JPG_PROGRESSIVE',
  /** PNG image format */
  Png = 'PNG',
  /**
   * 8-bit PNG images support up to 256 colors and weigh less than the standard 24-bit PNG equivalent.
   *         The 8-bit PNG format is mostly used for simple images, such as icons or logos.
   */
  Png8 = 'PNG8',
  /** WebP image format. */
  Webp = 'WEBP'
}

export enum ImageResizeFocus {
  /** Focus the resizing on the bottom. */
  Bottom = 'BOTTOM',
  /** Focus the resizing on the bottom left. */
  BottomLeft = 'BOTTOM_LEFT',
  /** Focus the resizing on the bottom right. */
  BottomRight = 'BOTTOM_RIGHT',
  /** Focus the resizing on the center. */
  Center = 'CENTER',
  /** Focus the resizing on the largest face. */
  Face = 'FACE',
  /** Focus the resizing on the area containing all the faces. */
  Faces = 'FACES',
  /** Focus the resizing on the left. */
  Left = 'LEFT',
  /** Focus the resizing on the right. */
  Right = 'RIGHT',
  /** Focus the resizing on the top. */
  Top = 'TOP',
  /** Focus the resizing on the top left. */
  TopLeft = 'TOP_LEFT',
  /** Focus the resizing on the top right. */
  TopRight = 'TOP_RIGHT'
}

export enum ImageResizeStrategy {
  /** Crops a part of the original image to fit into the specified dimensions. */
  Crop = 'CROP',
  /** Resizes the image to the specified dimensions, cropping the image if needed. */
  Fill = 'FILL',
  /** Resizes the image to fit into the specified dimensions. */
  Fit = 'FIT',
  /**
   * Resizes the image to the specified dimensions, padding the image if needed.
   *         Uses desired background color as padding color.
   */
  Pad = 'PAD',
  /** Resizes the image to the specified dimensions, changing the original aspect ratio if needed. */
  Scale = 'SCALE',
  /** Creates a thumbnail from the image. */
  Thumb = 'THUMB'
}

export type ImageTransformOptions = {
  /**
   * Desired background color, used with corner radius or `PAD` resize strategy.
   *         Defaults to transparent (for `PNG`, `PNG8` and `WEBP`) or white (for `JPG` and `JPG_PROGRESSIVE`).
   */
  backgroundColor?: InputMaybe<Scalars['HexColor']['input']>;
  /**
   * Desired corner radius in pixels.
   *         Results in an image with rounded corners (pass `-1` for a full circle/ellipse).
   *         Defaults to `0`. Uses desired background color as padding color,
   *         unless the format is `JPG` or `JPG_PROGRESSIVE` and resize strategy is `PAD`, then defaults to white.
   */
  cornerRadius?: InputMaybe<Scalars['Int']['input']>;
  /** Desired image format. Defaults to the original image format. */
  format?: InputMaybe<ImageFormat>;
  /** Desired height in pixels. Defaults to the original image height. */
  height?: InputMaybe<Scalars['Dimension']['input']>;
  /**
   * Desired quality of the image in percents.
   *         Used for `PNG8`, `JPG`, `JPG_PROGRESSIVE` and `WEBP` formats.
   */
  quality?: InputMaybe<Scalars['Quality']['input']>;
  /** Desired resize focus area. Defaults to `CENTER`. */
  resizeFocus?: InputMaybe<ImageResizeFocus>;
  /** Desired resize strategy. Defaults to `FIT`. */
  resizeStrategy?: InputMaybe<ImageResizeStrategy>;
  /** Desired width in pixels. Defaults to the original image width. */
  width?: InputMaybe<Scalars['Dimension']['input']>;
};

/** [See type definition](https://app.contentful.com/spaces/psv30rr5xkc2/content_types/pages) */
export type Pages = Entry & {
  __typename?: 'Pages';
  contentfulMetadata: ContentfulMetadata;
  handle?: Maybe<Scalars['String']['output']>;
  linkedFrom?: Maybe<PagesLinkingCollections>;
  seoDescription?: Maybe<Scalars['String']['output']>;
  seoTitle?: Maybe<Scalars['String']['output']>;
  sys: Sys;
  title?: Maybe<Scalars['String']['output']>;
};


/** [See type definition](https://app.contentful.com/spaces/psv30rr5xkc2/content_types/pages) */
export type PagesHandleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/psv30rr5xkc2/content_types/pages) */
export type PagesLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/psv30rr5xkc2/content_types/pages) */
export type PagesSeoDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/psv30rr5xkc2/content_types/pages) */
export type PagesSeoTitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/psv30rr5xkc2/content_types/pages) */
export type PagesTitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};

export type PagesCollection = {
  __typename?: 'PagesCollection';
  items: Array<Maybe<Pages>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type PagesFilter = {
  AND?: InputMaybe<Array<InputMaybe<PagesFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<PagesFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  handle?: InputMaybe<Scalars['String']['input']>;
  handle_contains?: InputMaybe<Scalars['String']['input']>;
  handle_exists?: InputMaybe<Scalars['Boolean']['input']>;
  handle_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  handle_not?: InputMaybe<Scalars['String']['input']>;
  handle_not_contains?: InputMaybe<Scalars['String']['input']>;
  handle_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  seoDescription?: InputMaybe<Scalars['String']['input']>;
  seoDescription_contains?: InputMaybe<Scalars['String']['input']>;
  seoDescription_exists?: InputMaybe<Scalars['Boolean']['input']>;
  seoDescription_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  seoDescription_not?: InputMaybe<Scalars['String']['input']>;
  seoDescription_not_contains?: InputMaybe<Scalars['String']['input']>;
  seoDescription_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  seoTitle?: InputMaybe<Scalars['String']['input']>;
  seoTitle_contains?: InputMaybe<Scalars['String']['input']>;
  seoTitle_exists?: InputMaybe<Scalars['Boolean']['input']>;
  seoTitle_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  seoTitle_not?: InputMaybe<Scalars['String']['input']>;
  seoTitle_not_contains?: InputMaybe<Scalars['String']['input']>;
  seoTitle_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type PagesLinkingCollections = {
  __typename?: 'PagesLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type PagesLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export enum PagesOrder {
  HandleAsc = 'handle_ASC',
  HandleDesc = 'handle_DESC',
  SeoTitleAsc = 'seoTitle_ASC',
  SeoTitleDesc = 'seoTitle_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export type Query = {
  __typename?: 'Query';
  asset?: Maybe<Asset>;
  assetCollection?: Maybe<AssetCollection>;
  authors?: Maybe<Authors>;
  authorsCollection?: Maybe<AuthorsCollection>;
  blogPosts?: Maybe<BlogPosts>;
  blogPostsCollection?: Maybe<BlogPostsCollection>;
  blogs?: Maybe<Blogs>;
  blogsCollection?: Maybe<BlogsCollection>;
  entryCollection?: Maybe<EntryCollection>;
  pages?: Maybe<Pages>;
  pagesCollection?: Maybe<PagesCollection>;
};


export type QueryAssetArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryAssetCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<AssetOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AssetFilter>;
};


export type QueryAuthorsArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryAuthorsCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<AuthorsOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AuthorsFilter>;
};


export type QueryBlogPostsArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryBlogPostsCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<BlogPostsOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<BlogPostsFilter>;
};


export type QueryBlogsArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryBlogsCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<BlogsOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<BlogsFilter>;
};


export type QueryEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<EntryOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<EntryFilter>;
};


export type QueryPagesArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryPagesCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<PagesOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PagesFilter>;
};

export type ResourceLink = {
  __typename?: 'ResourceLink';
  sys: ResourceSys;
};

export type ResourceSys = {
  __typename?: 'ResourceSys';
  linkType: Scalars['String']['output'];
  type: Scalars['String']['output'];
  urn: Scalars['String']['output'];
};

export type Sys = {
  __typename?: 'Sys';
  environmentId: Scalars['String']['output'];
  firstPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  publishedVersion?: Maybe<Scalars['Int']['output']>;
  spaceId: Scalars['String']['output'];
};

export type SysFilter = {
  firstPublishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_exists?: InputMaybe<Scalars['Boolean']['input']>;
  firstPublishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  firstPublishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_exists?: InputMaybe<Scalars['Boolean']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_exists?: InputMaybe<Scalars['Boolean']['input']>;
  publishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedVersion?: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_exists?: InputMaybe<Scalars['Boolean']['input']>;
  publishedVersion_gt?: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_gte?: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  publishedVersion_lt?: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_lte?: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_not?: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
};

export type CfAuthorsNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CfAuthorsNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfAuthorsNestedFilter>>>;
  bio?: InputMaybe<Scalars['String']['input']>;
  bio_contains?: InputMaybe<Scalars['String']['input']>;
  bio_exists?: InputMaybe<Scalars['Boolean']['input']>;
  bio_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  bio_not?: InputMaybe<Scalars['String']['input']>;
  bio_not_contains?: InputMaybe<Scalars['String']['input']>;
  bio_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_exists?: InputMaybe<Scalars['Boolean']['input']>;
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name_not?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  profileImage_exists?: InputMaybe<Scalars['Boolean']['input']>;
  sys?: InputMaybe<SysFilter>;
};

export type CfBlogsNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CfBlogsNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfBlogsNestedFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']['input']>;
  description_contains?: InputMaybe<Scalars['String']['input']>;
  description_exists?: InputMaybe<Scalars['Boolean']['input']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  description_not?: InputMaybe<Scalars['String']['input']>;
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  featuredMedia_exists?: InputMaybe<Scalars['Boolean']['input']>;
  handle?: InputMaybe<Scalars['String']['input']>;
  handle_contains?: InputMaybe<Scalars['String']['input']>;
  handle_exists?: InputMaybe<Scalars['Boolean']['input']>;
  handle_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  handle_not?: InputMaybe<Scalars['String']['input']>;
  handle_not_contains?: InputMaybe<Scalars['String']['input']>;
  handle_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  order?: InputMaybe<Scalars['Int']['input']>;
  order_exists?: InputMaybe<Scalars['Boolean']['input']>;
  order_gt?: InputMaybe<Scalars['Int']['input']>;
  order_gte?: InputMaybe<Scalars['Int']['input']>;
  order_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  order_lt?: InputMaybe<Scalars['Int']['input']>;
  order_lte?: InputMaybe<Scalars['Int']['input']>;
  order_not?: InputMaybe<Scalars['Int']['input']>;
  order_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  seoDescription?: InputMaybe<Scalars['String']['input']>;
  seoDescription_contains?: InputMaybe<Scalars['String']['input']>;
  seoDescription_exists?: InputMaybe<Scalars['Boolean']['input']>;
  seoDescription_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  seoDescription_not?: InputMaybe<Scalars['String']['input']>;
  seoDescription_not_contains?: InputMaybe<Scalars['String']['input']>;
  seoDescription_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  seoTitle?: InputMaybe<Scalars['String']['input']>;
  seoTitle_contains?: InputMaybe<Scalars['String']['input']>;
  seoTitle_exists?: InputMaybe<Scalars['Boolean']['input']>;
  seoTitle_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  seoTitle_not?: InputMaybe<Scalars['String']['input']>;
  seoTitle_not_contains?: InputMaybe<Scalars['String']['input']>;
  seoTitle_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type GetAllBlogsCollectionLinkedFromFieldsFragment = { __typename?: 'BlogPosts', handle?: string | null, title?: string | null, tags?: Array<string | null> | null, excerpt?: string | null, sys: { __typename?: 'Sys', id: string }, featuredImage?: { __typename?: 'Asset', title?: string | null, url?: string | null } | null };

export type GetAllBlogsCollectionQueryFieldsFragment = { __typename?: 'Blogs', handle?: string | null, title?: string | null, description?: string | null, order?: number | null, seoTitle?: string | null, seoDescription?: string | null, sys: { __typename?: 'Sys', id: string }, featuredMedia?: { __typename?: 'Asset', url?: string | null, title?: string | null, contentType?: string | null } | null };

export type GetAllBlogsQueryVariables = Exact<{
  locale?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetAllBlogsQuery = { __typename?: 'Query', blogsCollection?: { __typename?: 'BlogsCollection', items: Array<{ __typename?: 'Blogs', handle?: string | null, title?: string | null, description?: string | null, order?: number | null, seoTitle?: string | null, seoDescription?: string | null, linkedFrom?: { __typename?: 'BlogsLinkingCollections', blogPostsCollection?: { __typename?: 'BlogPostsCollection', total: number, items: Array<{ __typename?: 'BlogPosts', handle?: string | null, title?: string | null, tags?: Array<string | null> | null, excerpt?: string | null, sys: { __typename?: 'Sys', id: string }, featuredImage?: { __typename?: 'Asset', title?: string | null, url?: string | null } | null } | null> } | null } | null, sys: { __typename?: 'Sys', id: string }, featuredMedia?: { __typename?: 'Asset', url?: string | null, title?: string | null, contentType?: string | null } | null } | null> } | null };

export type BlogPostFieldsFragment = { __typename?: 'BlogPosts', title?: string | null, tags?: Array<string | null> | null, sys: { __typename?: 'Sys', id: string }, featuredImage?: { __typename?: 'Asset', title?: string | null, url?: string | null } | null, content?: { __typename?: 'BlogPostsContent', json: any, links: { __typename?: 'BlogPostsContentLinks', assets: { __typename?: 'BlogPostsContentAssets', block: Array<{ __typename?: 'Asset', title?: string | null, url?: string | null, sys: { __typename?: 'Sys', id: string } } | null> } } } | null, authorsCollection?: { __typename?: 'BlogPostsAuthorsCollection', items: Array<{ __typename?: 'Authors', name?: string | null, bio?: string | null, sys: { __typename?: 'Sys', id: string }, profileImage?: { __typename?: 'Asset', title?: string | null, url?: string | null } | null } | null> } | null, blog?: { __typename?: 'Blogs', title?: string | null, handle?: string | null, sys: { __typename?: 'Sys', id: string } } | null };

export type GetBlogPostByHandleQueryVariables = Exact<{
  locale?: InputMaybe<Scalars['String']['input']>;
  blogHandle: Scalars['String']['input'];
  postHandle: Scalars['String']['input'];
}>;


export type GetBlogPostByHandleQuery = { __typename?: 'Query', blogPostsCollection?: { __typename?: 'BlogPostsCollection', items: Array<{ __typename?: 'BlogPosts', title?: string | null, tags?: Array<string | null> | null, sys: { __typename?: 'Sys', id: string }, featuredImage?: { __typename?: 'Asset', title?: string | null, url?: string | null } | null, content?: { __typename?: 'BlogPostsContent', json: any, links: { __typename?: 'BlogPostsContentLinks', assets: { __typename?: 'BlogPostsContentAssets', block: Array<{ __typename?: 'Asset', title?: string | null, url?: string | null, sys: { __typename?: 'Sys', id: string } } | null> } } } | null, authorsCollection?: { __typename?: 'BlogPostsAuthorsCollection', items: Array<{ __typename?: 'Authors', name?: string | null, bio?: string | null, sys: { __typename?: 'Sys', id: string }, profileImage?: { __typename?: 'Asset', title?: string | null, url?: string | null } | null } | null> } | null, blog?: { __typename?: 'Blogs', title?: string | null, handle?: string | null, sys: { __typename?: 'Sys', id: string } } | null } | null> } | null };

export type GetPaginatedBlogPostsQueryVariables = Exact<{
  locale?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['String']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetPaginatedBlogPostsQuery = { __typename?: 'Query', blogPostsCollection?: { __typename?: 'BlogPostsCollection', total: number, items: Array<{ __typename?: 'BlogPosts', handle?: string | null, title?: string | null, tags?: Array<string | null> | null, excerpt?: string | null, sys: { __typename?: 'Sys', id: string }, blog?: { __typename?: 'Blogs', sys: { __typename?: 'Sys', id: string } } | null, content?: { __typename?: 'BlogPostsContent', json: any } | null, featuredImage?: { __typename?: 'Asset', title?: string | null, url?: string | null } | null } | null> } | null };

export const GetAllBlogsCollectionLinkedFromFieldsFragmentDoc = gql`
    fragment getAllBlogsCollectionLinkedFromFields on BlogPosts {
  sys {
    id
  }
  handle
  title
  tags
  excerpt
  featuredImage {
    title
    url
  }
}
    `;
export const GetAllBlogsCollectionQueryFieldsFragmentDoc = gql`
    fragment getAllBlogsCollectionQueryFields on Blogs {
  sys {
    id
  }
  handle
  title
  description
  order
  seoTitle
  seoDescription
  featuredMedia {
    url
    title
    contentType
  }
}
    `;
export const BlogPostFieldsFragmentDoc = gql`
    fragment BlogPostFields on BlogPosts {
  sys {
    id
  }
  featuredImage {
    title
    url
  }
  title
  content {
    json
    links {
      assets {
        ... on BlogPostsContentAssets {
          block {
            sys {
              id
            }
            title
            url
          }
        }
      }
    }
  }
  tags
  authorsCollection {
    items {
      sys {
        id
      }
      name
      profileImage {
        title
        url
      }
      bio
    }
  }
  blog {
    sys {
      id
    }
    title
    handle
  }
}
    `;
export const GetAllBlogsDocument = gql`
    query getAllBlogs($locale: String = "en") {
  blogsCollection(locale: $locale, order: order_ASC) {
    items {
      ...getAllBlogsCollectionQueryFields
      linkedFrom {
        blogPostsCollection(limit: 3, locale: $locale, order: sys_firstPublishedAt_DESC) {
          total
          items {
            ...getAllBlogsCollectionLinkedFromFields
          }
        }
      }
    }
  }
}
    ${GetAllBlogsCollectionQueryFieldsFragmentDoc}
${GetAllBlogsCollectionLinkedFromFieldsFragmentDoc}`;
export const GetBlogPostByHandleDocument = gql`
    query getBlogPostByHandle($locale: String = "en", $blogHandle: String!, $postHandle: String!) {
  blogPostsCollection(
    locale: $locale
    limit: 1
    where: {blog: {handle: $blogHandle}, AND: {handle: $postHandle}}
  ) {
    items {
      ...BlogPostFields
    }
  }
}
    ${BlogPostFieldsFragmentDoc}`;
export const GetPaginatedBlogPostsDocument = gql`
    query getPaginatedBlogPosts($locale: String = "en", $limit: Int = 6, $id: String!, $skip: Int = 0) {
  blogPostsCollection(
    locale: $locale
    limit: $limit
    skip: $skip
    order: sys_firstPublishedAt_DESC
    where: {blog: {sys: {id: $id}}}
  ) {
    total
    items {
      sys {
        id
      }
      blog {
        sys {
          id
        }
      }
      handle
      title
      tags
      content {
        json
      }
      excerpt
      featuredImage {
        title
        url
      }
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getAllBlogs(variables?: GetAllBlogsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetAllBlogsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAllBlogsQuery>(GetAllBlogsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getAllBlogs', 'query');
    },
    getBlogPostByHandle(variables: GetBlogPostByHandleQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetBlogPostByHandleQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetBlogPostByHandleQuery>(GetBlogPostByHandleDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getBlogPostByHandle', 'query');
    },
    getPaginatedBlogPosts(variables: GetPaginatedBlogPostsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetPaginatedBlogPostsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetPaginatedBlogPostsQuery>(GetPaginatedBlogPostsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getPaginatedBlogPosts', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;