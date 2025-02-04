export type TagName = string;

export interface ArticleProps {
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
  props: ArticleProps;
  constructor(props: ArticleProps) {
    this.props = props;
  }

  isFavoritedBy(otherAuthorId: AuthorId): boolean {
    for (const authorId of this.props.favoritedBy) {
      if (authorId === otherAuthorId) {
        return true;
      }
    }
    return false;
  }
}

export type AuthorId = number;

export interface AuthorProps {
  id: AuthorId;
  username: string;
  bio: string;
  image: string;
  followedBy: AuthorId[];
}
export class Author {
  props: AuthorProps;
  constructor(props: AuthorProps) {
    this.props = props;
  }

  isFollowedBy(otherAuthorId: AuthorId): boolean {
    for (const authorId of this.props.followedBy) {
      if (authorId === otherAuthorId) {
        return true;
      }
    }
    return false;
  }
}
