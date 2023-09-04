-- CreateTable
CREATE TABLE `jct_shop` (
    `book_id` INTEGER NOT NULL,
    `shop_id` INTEGER NOT NULL,
    `url` VARCHAR(300) NOT NULL,

    PRIMARY KEY (`book_id`, `shop_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `m_book` (
    `first_time` DATETIME(0) NOT NULL,
    `last_time` DATETIME(0) NOT NULL,
    `valid_state` TINYINT NOT NULL DEFAULT 0,
    `book_id` INTEGER NOT NULL AUTO_INCREMENT,
    `mng_id` VARCHAR(255) NULL,
    `open_date` DATETIME(0) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `original_title` TEXT NULL,
    `subtitle` VARCHAR(255) NULL,
    `feature` VARCHAR(255) NULL,
    `mag_number` VARCHAR(255) NULL,
    `publisher` VARCHAR(255) NOT NULL,
    `genre_id1` INTEGER NOT NULL,
    `genre_id2` INTEGER NULL,
    `genre_id3` INTEGER NULL,
    `category_id` INTEGER NOT NULL,
    `publication_month` VARCHAR(20) NULL,
    `author` VARCHAR(255) NULL,
    `translator` VARCHAR(255) NULL,
    `page` VARCHAR(255) NULL,
    `cover_img` VARCHAR(255) NULL,
    `hung_in_img` VARCHAR(255) NULL,
    `book_pdf` VARCHAR(255) NULL,
    `binding_img` VARCHAR(255) NULL,
    `isbn` VARCHAR(255) NULL,
    `open_flg` TINYINT NOT NULL,
    `recruit_flg` TINYINT NOT NULL,
    `permit_flg` TINYINT NOT NULL,
    `price` VARCHAR(20) NULL,
    `index` TEXT NULL,
    `point` TEXT NULL,
    `headline1` VARCHAR(255) NULL,
    `headline2` VARCHAR(255) NULL,
    `headline3` VARCHAR(255) NULL,
    `headline4` VARCHAR(255) NULL,
    `headline5` VARCHAR(255) NULL,
    `content1` TEXT NULL,
    `content2` TEXT NULL,
    `content3` TEXT NULL,
    `content4` TEXT NULL,
    `content5` TEXT NULL,
    `comment` TEXT NULL,
    `rank_pv` INTEGER NOT NULL DEFAULT 0,
    `audio_flg` TINYINT NULL,
    `link_url_1` TEXT NULL,
    `link_title_1` TEXT NULL,
    `link_description_1` TEXT NULL,
    `link_image_url_1` TEXT NULL,
    `link_url_2` TEXT NULL,
    `link_title_2` TEXT NULL,
    `link_description_2` TEXT NULL,
    `link_image_url_2` TEXT NULL,
    `link_url_3` TEXT NULL,
    `link_title_3` TEXT NULL,
    `link_description_3` TEXT NULL,
    `link_image_url_3` TEXT NULL,
    `catchphrase` VARCHAR(60) NULL,

    PRIMARY KEY (`book_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `m_category` (
    `first_time` DATETIME(0) NOT NULL,
    `last_time` DATETIME(0) NOT NULL,
    `valid_state` TINYINT NOT NULL DEFAULT 0,
    `category_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `priority` INTEGER NOT NULL,

    PRIMARY KEY (`category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `m_genre` (
    `first_time` DATETIME(0) NOT NULL,
    `last_time` DATETIME(0) NOT NULL,
    `valid_state` TINYINT NOT NULL DEFAULT 0,
    `genre_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `priority` INTEGER NOT NULL,

    PRIMARY KEY (`genre_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `m_shop` (
    `first_time` DATETIME(0) NOT NULL,
    `last_time` DATETIME(0) NOT NULL,
    `valid_state` TINYINT NOT NULL DEFAULT 0,
    `shop_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `url_template` VARCHAR(300) NOT NULL,
    `priority` INTEGER NOT NULL,

    PRIMARY KEY (`shop_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `t_ac_log` (
    `first_time` DATETIME(0) NOT NULL,
    `log_id` INTEGER NOT NULL AUTO_INCREMENT,
    `client_id` INTEGER NOT NULL,
    `account_id` INTEGER NOT NULL,
    `ip_addr` VARCHAR(255) NOT NULL,
    `page` VARCHAR(255) NULL,
    `book_id` INTEGER NULL,
    `category_id` INTEGER NULL,
    `genre_id` INTEGER NULL,

    PRIMARY KEY (`log_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `t_account` (
    `first_time` DATETIME(0) NOT NULL,
    `last_time` DATETIME(0) NOT NULL,
    `valid_state` TINYINT NOT NULL DEFAULT 0,
    `account_id` INTEGER NOT NULL AUTO_INCREMENT,
    `client_id` INTEGER NULL,
    `auth_type` TINYINT NOT NULL,
    `user_id` VARCHAR(255) NOT NULL,
    `password` VARCHAR(50) NULL,
    `ip_addr_start` VARCHAR(50) NULL,
    `ip_addr_end` VARCHAR(50) NULL,
    `token_key` VARCHAR(32) NULL,
    `email` VARCHAR(255) NULL,
    `admin_flg` TINYINT NOT NULL DEFAULT 0,
    `pv_total` INTEGER NOT NULL DEFAULT 0,
    `department` VARCHAR(50) NULL,
    `department_class` TINYINT NULL,
    `position` VARCHAR(50) NULL,
    `position_class` TINYINT NULL,
    `last_name` VARCHAR(50) NULL,
    `first_name` VARCHAR(50) NULL,
    `last_name_kana` VARCHAR(50) NULL,
    `first_name_kana` VARCHAR(50) NULL,
    `share_flg` TINYINT NOT NULL DEFAULT 0,
    `digest_start` DATETIME(0) NULL,
    `service_end` DATETIME(0) NULL,
    `change_email_email` VARCHAR(255) NULL,
    `change_email_token` VARCHAR(50) NULL,
    `change_email_token_expire` DATETIME(0) NULL,
    `change_password_token` VARCHAR(50) NULL,
    `change_password_token_expire` DATETIME(0) NULL,
    `shared_notice_flg` TINYINT NOT NULL DEFAULT 0,
    `shared_notice_time` DATETIME(0) NULL,

    INDEX `first_time_index`(`first_time`),
    INDEX `user_id_index`(`user_id`),
    PRIMARY KEY (`account_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `t_account_log_daily` (
    `first_time` DATETIME(0) NOT NULL,
    `last_time` DATETIME(0) NOT NULL,
    `account_id` INTEGER NOT NULL,
    `access_date` DATE NOT NULL,
    `mail_num` INTEGER NOT NULL DEFAULT 0,
    `mail_open_num` INTEGER NOT NULL DEFAULT 0,
    `pv_total` INTEGER NOT NULL DEFAULT 0,
    `pv_book` INTEGER NOT NULL DEFAULT 0,
    `genre_mypage_total` TEXT NULL,

    PRIMARY KEY (`account_id`, `access_date`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `t_admin` (
    `first_time` DATETIME(0) NOT NULL,
    `last_time` DATETIME(0) NOT NULL,
    `valid_state` TINYINT NOT NULL DEFAULT 0,
    `admin_id` INTEGER NOT NULL AUTO_INCREMENT,
    `login_id` VARCHAR(100) NOT NULL,
    `password` VARCHAR(32) NOT NULL,
    `memo` TEXT NULL,
    `role` TINYINT NOT NULL DEFAULT 0,

    PRIMARY KEY (`admin_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `t_book_action_account_num` (
    `first_time` DATETIME(0) NOT NULL,
    `last_time` DATETIME(0) NOT NULL,
    `account_id` INTEGER NOT NULL,
    `book_id` INTEGER NOT NULL,
    `access_date` DATE NOT NULL,
    `pv_total` INTEGER NOT NULL DEFAULT 0,
    `later_total` INTEGER NOT NULL DEFAULT 0,
    `memo_total` INTEGER NOT NULL DEFAULT 0,
    `share_total` INTEGER NOT NULL DEFAULT 0,
    `share_execution_total` INTEGER NOT NULL DEFAULT 0,

    INDEX `idx_1_t_book_action_account_num`(`access_date`, `account_id`),
    INDEX `idx_2_t_book_action_account_num`(`book_id`),
    PRIMARY KEY (`account_id`, `book_id`, `access_date`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `t_book_later` (
    `first_time` DATETIME(0) NOT NULL,
    `last_time` DATETIME(0) NOT NULL,
    `valid_state` TINYINT NOT NULL DEFAULT 0,
    `book_later_id` INTEGER NOT NULL AUTO_INCREMENT,
    `book_id` INTEGER NOT NULL,
    `account_id` INTEGER NOT NULL,

    INDEX `index_book_id`(`book_id`, `account_id`),
    PRIMARY KEY (`book_later_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `t_book_memo` (
    `first_time` DATETIME(0) NOT NULL,
    `last_time` DATETIME(0) NOT NULL,
    `valid_state` TINYINT NOT NULL DEFAULT 0,
    `book_memo_id` INTEGER NOT NULL AUTO_INCREMENT,
    `book_id` INTEGER NOT NULL,
    `account_id` INTEGER NOT NULL,
    `label` VARCHAR(50) NULL,
    `memo` TEXT NULL,

    INDEX `index_book_id`(`book_id`, `account_id`),
    PRIMARY KEY (`book_memo_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `t_book_share` (
    `first_time` DATETIME(0) NOT NULL,
    `last_time` DATETIME(0) NOT NULL,
    `valid_state` TINYINT NOT NULL DEFAULT 0,
    `share_id` INTEGER NOT NULL AUTO_INCREMENT,
    `book_id` INTEGER NOT NULL,
    `account_id_from` INTEGER NOT NULL,
    `memo` TEXT NULL,

    PRIMARY KEY (`share_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `t_book_share_accounts` (
    `first_time` DATETIME(0) NOT NULL,
    `last_time` DATETIME(0) NOT NULL,
    `valid_state` TINYINT NOT NULL DEFAULT 0,
    `share_id` INTEGER NOT NULL,
    `account_id_to` INTEGER NOT NULL,
    `check_state` TINYINT NOT NULL DEFAULT 0,
    `check_time` DATETIME(0) NULL,
    `good_state` TINYINT NOT NULL DEFAULT 0,

    INDEX `account_id_to`(`account_id_to`),
    PRIMARY KEY (`share_id`, `account_id_to`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `t_book_view_client_daily` (
    `first_time` DATETIME(0) NOT NULL,
    `last_time` DATETIME(0) NOT NULL,
    `client_id` INTEGER NOT NULL,
    `access_date` DATE NOT NULL,
    `book_id` INTEGER NOT NULL,
    `pv_total` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`client_id`, `access_date`, `book_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `t_client` (
    `first_time` DATETIME(0) NOT NULL,
    `last_time` DATETIME(0) NOT NULL,
    `valid_state` TINYINT NOT NULL DEFAULT 0,
    `client_id` INTEGER NOT NULL AUTO_INCREMENT,
    `contract_id` VARCHAR(70) NULL,
    `type` TINYINT NOT NULL DEFAULT 0,
    `name` VARCHAR(100) NULL,
    `post` VARCHAR(100) NULL,
    `use_start` DATETIME(0) NOT NULL,
    `use_end` DATETIME(0) NULL,
    `use_state` TINYINT NOT NULL DEFAULT 0,
    `account_num` INTEGER NOT NULL DEFAULT 0,
    `share_flg` TINYINT NOT NULL DEFAULT 0,
    `mail_type` TINYINT NOT NULL,
    `user_mail_edit_flg` TINYINT NOT NULL DEFAULT 0,
    `enquete_flg` TINYINT NOT NULL DEFAULT 0,
    `h_banner1_img` VARCHAR(100) NULL,
    `h_banner1_url` VARCHAR(300) NULL,
    `h_banner2_img` VARCHAR(100) NULL,
    `h_banner2_url` VARCHAR(300) NULL,
    `logo_img` VARCHAR(100) NULL,
    `logo_url` VARCHAR(300) NULL,
    `pdf_dl_flg` TINYINT NOT NULL DEFAULT 0,
    `business_class` TINYINT NULL,
    `update_txt` TEXT NULL,
    `custom_mail_flg` TINYINT NOT NULL DEFAULT 0,
    `custom_header` TEXT NULL,
    `custom_footer` TEXT NULL,
    `ip_auth_flg` TINYINT NOT NULL DEFAULT 0,
    `ip_auth_addr_json` JSON NULL,
    `user_admin_maint_flg` TINYINT NOT NULL DEFAULT 0,
    `user_admin_maint_msg` TEXT NULL,

    INDEX `index_contract_id`(`contract_id`),
    INDEX `index_name`(`name`),
    PRIMARY KEY (`client_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `t_config` (
    `first_time` DATETIME(0) NOT NULL,
    `last_time` DATETIME(0) NOT NULL,
    `key` CHAR(50) NOT NULL,
    `value` TEXT NOT NULL,

    PRIMARY KEY (`key`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `t_enq_answer` (
    `first_time` DATETIME(0) NOT NULL,
    `last_time` DATETIME(0) NOT NULL,
    `account_id` INTEGER NOT NULL,
    `book_id` INTEGER NOT NULL,
    `choice_id` INTEGER NULL,

    INDEX `idx_1_t_enq_answer`(`book_id`),
    PRIMARY KEY (`account_id`, `book_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `t_job` (
    `first_time` DATETIME(0) NOT NULL,
    `last_time` DATETIME(0) NOT NULL,
    `valid_state` TINYINT NOT NULL DEFAULT 0,
    `job_id` VARCHAR(50) NOT NULL,
    `progress` TINYINT NOT NULL DEFAULT 0,
    `function` VARCHAR(200) NOT NULL,
    `input` TEXT NULL,
    `output` TEXT NULL,
    `remark` TEXT NULL,

    PRIMARY KEY (`job_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `t_mail_contents` (
    `first_time` DATETIME(0) NOT NULL,
    `last_time` DATETIME(0) NOT NULL,
    `valid_state` TINYINT NOT NULL DEFAULT 0,
    `mail_id` INTEGER NOT NULL AUTO_INCREMENT,
    `mail_type` TINYINT NOT NULL,
    `mail_category` TINYINT NOT NULL,
    `mail_to` TINYINT NOT NULL,
    `client_id` INTEGER NULL,
    `book_id` INTEGER NOT NULL DEFAULT 0,
    `status` TINYINT NOT NULL DEFAULT 0,
    `reservation_at` DATETIME(0) NULL,
    `queued_count` INTEGER NOT NULL DEFAULT 0,
    `sent_count` INTEGER NOT NULL DEFAULT 0,
    `opened_count` INTEGER NOT NULL DEFAULT 0,
    `error_count` INTEGER NOT NULL DEFAULT 0,
    `title` VARCHAR(255) NOT NULL DEFAULT '',
    `body_html` TEXT NULL,
    `body_text_like_html` TEXT NULL,
    `body_text` TEXT NULL,

    INDEX `idx_1_t_mail_contents`(`status`, `reservation_at`),
    PRIMARY KEY (`mail_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `t_mail_distribution` (
    `first_time` DATETIME(0) NOT NULL,
    `last_time` DATETIME(0) NOT NULL,
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mail_id` INTEGER NOT NULL,
    `account_id` INTEGER NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `status` TINYINT NOT NULL DEFAULT 0,
    `open_flg` TINYINT NOT NULL DEFAULT 0,

    INDEX `idx_1_t_mail_distribution`(`mail_id`, `status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `t_mail_status` (
    `first_time` DATETIME(0) NOT NULL,
    `last_time` DATETIME(0) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `status` TINYINT NOT NULL DEFAULT 0,
    `last_event` VARCHAR(50) NOT NULL DEFAULT '',

    PRIMARY KEY (`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
