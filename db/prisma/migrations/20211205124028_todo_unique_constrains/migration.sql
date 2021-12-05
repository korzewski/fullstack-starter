/*
  Warnings:

  - A unique constraint covering the columns `[id,userId]` on the table `Todo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,name]` on the table `Todo` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Todo_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "Todo_id_userId_key" ON "Todo"("id", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Todo_userId_name_key" ON "Todo"("userId", "name");
