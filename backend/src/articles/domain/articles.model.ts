export type TagName = string;

export class Article {
  constructor(
    public slug: string,
    public title: string,
    public description: string,
    public tags: TagName[],
    public createdAt: Date,
    public updatedAt: Date,
    public favoritedBy: AuthorId[],
    public author: Author,
  ) {}

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
  constructor(
    public id: number,
    public username: string,
    public bio: string,
    public image: string,
    public followedBy: AuthorId[],
  ) {}

  isFollowedBy(otherAuthorId: AuthorId): boolean {
    for (const authorId of this.followedBy) {
      if (authorId === otherAuthorId) {
        return true;
      }
    }
    return false;
  }
}
