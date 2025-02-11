export interface CreateArticleDto {
  article: {
    body: string;
    description: string;
    title: string;
    tagList: string[];
  };
}

export interface CreateArticleResp {
  article: {
    slug: string;
    title: string;
    description: string;
    body: string;
    tagList: string[];
    createdAt: string;
    updatedAt: string;
    favorited: boolean;
    favoritesCount: number;
    author: {
      bio: string;
      following: boolean;
      image: string;
      username: string;
    };
  };
}
