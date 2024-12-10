export interface ArticleOptions {
  slug: string;
  title: string;
  description: string;
  tags: TagName[];
  createdAt: Date;
  updatedAt: Date;
  favoritedBy: AuthorId[];
  author: Author;
}

export class Article {
  slug: string;
  title: string;
  description: string;
  tags: TagName[];
  createdAt: Date;
  updatedAt: Date;
  favoritedBy: AuthorId[];
  author: Author;

  constructor(opt: ArticleOptions) {
    this.slug = opt.slug;
    this.title = opt.title;
    this.description = opt.description;
    this.tags = opt.tags;
    this.createdAt = opt.createdAt;
    this.updatedAt = opt.updatedAt;
    this.favoritedBy = opt.favoritedBy;
    this.author = opt.author;
  }

  isFavoritedBy(otherAuthorId: AuthorId): boolean {
    for (const authorId of this.favoritedBy) {
      if (authorId === otherAuthorId) {
        return true;
      }
    }
    return false;
  }
}

export type TagName = string;

export interface AuthorOptions {
  id: number;
  username: string;
  bio: string;
  image: string;

  followedBy: AuthorId[];
}

export class Author {
  id: number;
  username: string;
  bio: string;
  image: string;

  followedBy: AuthorId[];

  constructor(opt: AuthorOptions) {
    this.id = opt.id;
    this.username = opt.username;
    this.bio = opt.bio;
    this.image = opt.image;
    this.followedBy = opt.followedBy;
  }

  isFollowedBy(otherAuthorId: AuthorId): boolean {
    for (const authorId of this.followedBy) {
      if (authorId === otherAuthorId) {
        return true;
      }
    }
    return false;
  }
}

export type AuthorId = number;
