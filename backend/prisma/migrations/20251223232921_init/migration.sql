-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `Post_authorId_fkey`;

-- DropIndex
DROP INDEX `Post_authorId_fkey` ON `post`;

-- AlterTable
ALTER TABLE `transaction` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
