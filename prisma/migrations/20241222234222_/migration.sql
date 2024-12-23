-- CreateTable
CREATE TABLE "User_vote" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "feedback_post_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_vote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_vote_user_id_feedback_post_id_key" ON "User_vote"("user_id", "feedback_post_id");

-- AddForeignKey
ALTER TABLE "User_vote" ADD CONSTRAINT "User_vote_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_vote" ADD CONSTRAINT "User_vote_feedback_post_id_fkey" FOREIGN KEY ("feedback_post_id") REFERENCES "Feedback_posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
