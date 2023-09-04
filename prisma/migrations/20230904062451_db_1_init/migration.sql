-- CreateTable
CREATE TABLE `m_catalog` (
    `catalog_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `web_pageview` INTEGER NOT NULL DEFAULT 0,
    `pdf_pageview` INTEGER NOT NULL DEFAULT 0,
    `ranking` VARCHAR(191) NULL,
    `open_date_from` DATETIME(3) NOT NULL,
    `open_date_to` DATETIME(3) NOT NULL,
    `ranking_date_from` DATETIME(3) NOT NULL,
    `ranking_date_to` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `m_catalog_name_key`(`name`),
    PRIMARY KEY (`catalog_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `booksOnCatalogs` (
    `catalog_id` INTEGER NOT NULL,
    `book_id` INTEGER NOT NULL,

    INDEX `booksOnCatalogs_catalog_id_idx`(`catalog_id`),
    INDEX `booksOnCatalogs_book_id_idx`(`book_id`),
    PRIMARY KEY (`book_id`, `catalog_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `m_book` (
    `first_time` DATETIME(0) NOT NULL,
    `last_time` DATETIME(0) NOT NULL,
    `valid_state` TINYINT NOT NULL DEFAULT 0,
    `book_id` INTEGER NOT NULL AUTO_INCREMENT,
    `open_date` DATETIME(0) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `original_title` TEXT NULL,
    `publisher` VARCHAR(255) NOT NULL,
    `category_id` INTEGER NOT NULL,
    `publication_month` VARCHAR(20) NULL,
    `author` VARCHAR(255) NULL,
    `translator` VARCHAR(255) NULL,
    `cover_img` VARCHAR(255) NULL,
    `hung_in_img` VARCHAR(255) NULL,
    `book_pdf` VARCHAR(255) NULL,
    `binding_img` VARCHAR(255) NULL,
    `isbn` VARCHAR(255) NULL,
    `open_flg` TINYINT NOT NULL,
    `rank_pv` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`book_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
