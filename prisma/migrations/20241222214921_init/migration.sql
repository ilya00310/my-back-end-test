-- CreateEnum
CREATE TYPE "Category" AS ENUM ('Functionality', 'Bug', 'Unique', 'Performance', 'Other');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Idea', 'Planned', 'AtWork', 'Performed');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatar" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feedback_posts" (
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "status" "Status" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "id" TEXT NOT NULL,
    "author_id" TEXT NOT NULL,

    CONSTRAINT "Feedback_posts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Feedback_posts_title_key" ON "Feedback_posts"("title");

-- AddForeignKey
ALTER TABLE "Feedback_posts" ADD CONSTRAINT "Feedback_posts_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
