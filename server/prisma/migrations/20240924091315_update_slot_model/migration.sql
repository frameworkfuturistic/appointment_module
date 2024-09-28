/*
  Warnings:

  - You are about to drop the column `endTime` on the `Slot` table. All the data in the column will be lost.
  - You are about to drop the column `priority` on the `Slot` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `Slot` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `Slot` table. All the data in the column will be lost.
  - Added the required column `appointmentToken` to the `Slot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Slot" DROP COLUMN "endTime",
DROP COLUMN "priority",
DROP COLUMN "startTime",
DROP COLUMN "weight",
ADD COLUMN     "appointmentToken" INTEGER NOT NULL;
