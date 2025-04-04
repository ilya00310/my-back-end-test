/*
  Warnings:

  - The values [functionality,bug,unique,performance,other] on the enum `Category` will be removed. If these variants are still used in the database, this will fail.
  - The values [idea,planned,atWork,performed] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Category_new" AS ENUM ('Functionality', 'Bug', 'Unique', 'Performance', 'Other');
ALTER TABLE "Feedback_posts" ALTER COLUMN "category" TYPE "Category_new" USING ("category"::text::"Category_new");
ALTER TYPE "Category" RENAME TO "Category_old";
ALTER TYPE "Category_new" RENAME TO "Category";
DROP TYPE "Category_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('Idea', 'Planned', 'AtWork', 'Performed');
ALTER TABLE "Feedback_posts" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
COMMIT;
