-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191),
    `password` VARCHAR(191),
    `name` VARCHAR(191),
    `ip` VARCHAR(191),
    `userAgent` VARCHAR(191),
    `userAgreement` BOOLEAN DEFAULT false,
    `verified` BOOLEAN DEFAULT false,
    `lastSignedIn` DATETIME(3),
    `createdAt` DATETIME(3) DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3),
UNIQUE INDEX `User.email_unique`(`email`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
