-- CreateTable
CREATE TABLE "author" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "image" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "follow" (
    "followed_by" INTEGER NOT NULL,
    "following_id" INTEGER NOT NULL,

    PRIMARY KEY ("followed_by", "following_id"),
    CONSTRAINT "follow_followed_by_fkey" FOREIGN KEY ("followed_by") REFERENCES "author" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "follow_following_id_fkey" FOREIGN KEY ("following_id") REFERENCES "author" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "tag" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "article" (
    "slug" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "author_id" INTEGER NOT NULL,
    CONSTRAINT "article_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "author" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "tag_on_article" (
    "article_id" TEXT NOT NULL,
    "tag_id" INTEGER NOT NULL,

    PRIMARY KEY ("article_id", "tag_id"),
    CONSTRAINT "tag_on_article_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "article" ("slug") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "tag_on_article_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "favorite" (
    "article_id" TEXT NOT NULL,
    "favorited_by_id" INTEGER NOT NULL,

    PRIMARY KEY ("article_id", "favorited_by_id"),
    CONSTRAINT "favorite_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "article" ("slug") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "favorite_favorited_by_id_fkey" FOREIGN KEY ("favorited_by_id") REFERENCES "author" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "author_username_key" ON "author"("username");

-- CreateIndex
CREATE INDEX "author_username_idx" ON "author"("username");

-- CreateIndex
CREATE UNIQUE INDEX "tag_name_key" ON "tag"("name");

-- CreateIndex
CREATE INDEX "tag_name_idx" ON "tag"("name");
