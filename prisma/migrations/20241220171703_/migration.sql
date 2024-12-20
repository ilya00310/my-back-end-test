/*
  Warnings:

  - The primary key for the `Feedback_posts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Feedback_posts" DROP CONSTRAINT "Feedback_posts_author_id_fkey";

-- AlterTable
ALTER TABLE "Feedback_posts" DROP CONSTRAINT "Feedback_posts_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "author_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Feedback_posts_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Feedback_posts_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AddForeignKey
ALTER TABLE "Feedback_posts" ADD CONSTRAINT "Feedback_posts_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
