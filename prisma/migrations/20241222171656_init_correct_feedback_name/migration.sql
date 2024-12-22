/*
  Warnings:

  - You are about to drop the `FeedbackPosts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FeedbackPosts" DROP CONSTRAINT "FeedbackPosts_author_id_fkey";

-- DropTable
DROP TABLE "FeedbackPosts";

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
CREATE UNIQUE INDEX "Feedback_posts_title_key" ON "Feedback_posts"("title");

-- AddForeignKey
ALTER TABLE "Feedback_posts" ADD CONSTRAINT "Feedback_posts_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
