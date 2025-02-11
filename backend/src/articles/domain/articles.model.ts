export type TagName = string;

export class Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tags: TagName[];
  createdAt: Date;
  updatedAt: Date;
  favoritedBy: AuthorId[];
  author: Author;

  constructor(props: {
    slug: string;
    title: string;
    description: string;
    body: string;
    tags: TagName[];
    createdAt: Date;
    updatedAt: Date;
    favoritedBy: AuthorId[];
    author: Author;
  }) {
    this.slug = props.slug;
    this.title = props.title;
    this.description = props.description;
    this.body = props.body;
    this.tags = props.tags;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.favoritedBy = props.favoritedBy;
    this.author = props.author;
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

export type AuthorId = number;

export class Author {
  id: AuthorId;
  username: string;
  bio: string;
  image: string;
  followedBy: AuthorId[];

  constructor(props: {
    id: AuthorId;
    username: string;
    bio: string;
    image: string;
    followedBy: AuthorId[];
  }) {
    this.id = props.id;
    this.username = props.username;
    this.bio = props.bio;
    this.image = props.image;
    this.followedBy = props.followedBy;
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
