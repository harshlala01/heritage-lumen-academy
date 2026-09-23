-- -------------------------------------------------------------
-- The Rabindra Bharati Heritage Day School Database Dump
-- Compatible with any database name (e.g. 'school' or 'heritage_db')
-- Generated for 1-Click Import into phpMyAdmin / MySQL CLI
-- -------------------------------------------------------------

SET SQL_MODE = 'NO_AUTO_VALUE_ON_ZERO';
START TRANSACTION;
SET time_zone = '+00:00';
SET FOREIGN_KEY_CHECKS = 0;

-- -------------------------------------------------------------
-- Table structure for table `content`
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `content`;
CREATE TABLE `content` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `section` varchar(50) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `subtitle` text DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `extra_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`extra_data`)),
  `display_order` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `content`
INSERT INTO `content` (`id`, `section`, `title`, `subtitle`, `image_path`, `extra_data`, `display_order`, `created_at`) VALUES (1, 'gallery', 'xcvbnm', 'fdghjkl', '/uploads/gallery/004be27e7c2946c08ba7fa32a4009643.webp', NULL, 0, '2026-09-20 05:29:08');
INSERT INTO `content` (`id`, `section`, `title`, `subtitle`, `image_path`, `extra_data`, `display_order`, `created_at`) VALUES (2, 'banners', 'Nurturing Minds, Cultivating Character', 'Affiliated to CBSE, New Delhi • Established on Unwavering Academic Rigor & Ethical Foundation', 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1600&auto=format&fit=crop', NULL, 1, '2026-09-24 04:23:36');
INSERT INTO `content` (`id`, `section`, `title`, `subtitle`, `image_path`, `extra_data`, `display_order`, `created_at`) VALUES (3, 'banners', 'State-of-the-Art Scientific & STEM Laboratories', 'Inspiring young innovators through experiential robotics, physics, chemistry, and smart digital classrooms', 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1600&auto=format&fit=crop', NULL, 2, '2026-09-24 04:23:36');
INSERT INTO `content` (`id`, `section`, `title`, `subtitle`, `image_path`, `extra_data`, `display_order`, `created_at`) VALUES (4, 'banners', 'Admissions Open for Academic Session 2026–2027', 'Welcoming scholars from Pre-Primary (Nursery) through Secondary Grade X under CBSE Curriculum', 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1600&auto=format&fit=crop', NULL, 3, '2026-09-24 04:23:36');
INSERT INTO `content` (`id`, `section`, `title`, `subtitle`, `image_path`, `extra_data`, `display_order`, `created_at`) VALUES (5, 'facilities', 'Smart Interactive Classrooms', 'Airy, ergonomically furnished spaces equipped with interactive 4K interactive boards and acoustic tuning.', 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop', NULL, 1, '2026-09-24 04:23:36');
INSERT INTO `content` (`id`, `section`, `title`, `subtitle`, `image_path`, `extra_data`, `display_order`, `created_at`) VALUES (6, 'facilities', 'Composite Science & STEM Wing', 'NABL-compliant Physics, Chemistry, and Biology laboratories equipped with computerized sensor probes.', 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop', NULL, 2, '2026-09-24 04:23:36');
INSERT INTO `content` (`id`, `section`, `title`, `subtitle`, `image_path`, `extra_data`, `display_order`, `created_at`) VALUES (7, 'facilities', 'Central Resource Library', 'Curated collection of 15,000+ volumes, international educational journals, and quiet reading quadrangles.', 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=800&auto=format&fit=crop', NULL, 3, '2026-09-24 04:23:36');
INSERT INTO `content` (`id`, `section`, `title`, `subtitle`, `image_path`, `extra_data`, `display_order`, `created_at`) VALUES (8, 'facilities', 'Computing & Artificial Intelligence Lab', 'High-speed gigabit fiber connected workstations featuring Python, Robotics, and foundational coding platforms.', 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop', NULL, 4, '2026-09-24 04:23:36');
INSERT INTO `content` (`id`, `section`, `title`, `subtitle`, `image_path`, `extra_data`, `display_order`, `created_at`) VALUES (9, 'facilities', 'Athletic Complex & Sports Arena', 'Full-size regulation basketball courts, cricket practice nets with automated bowling machines, and badminton courts.', 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800&auto=format&fit=crop', NULL, 5, '2026-09-24 04:23:36');
INSERT INTO `content` (`id`, `section`, `title`, `subtitle`, `image_path`, `extra_data`, `display_order`, `created_at`) VALUES (10, 'facilities', 'Performing Arts & Auditorium', 'Acoustically engineered auditorium supporting theatrical productions, choir performances, and annual functions.', 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop', NULL, 6, '2026-09-24 04:23:36');
INSERT INTO `content` (`id`, `section`, `title`, `subtitle`, `image_path`, `extra_data`, `display_order`, `created_at`) VALUES (11, 'faculty', 'Mithu Sinha Bhattacharya', 'Principal & Academic Leader (M.Sc, B.Ed • 18+ Years Pedagogy)', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop', NULL, 1, '2026-09-24 04:23:36');
INSERT INTO `content` (`id`, `section`, `title`, `subtitle`, `image_path`, `extra_data`, `display_order`, `created_at`) VALUES (12, 'faculty', 'Dr. Subhash Chandra Ghosh', 'Dean of Academic Development & Senior Science Advisor (Ph.D Physics)', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop', NULL, 2, '2026-09-24 04:23:36');
INSERT INTO `content` (`id`, `section`, `title`, `subtitle`, `image_path`, `extra_data`, `display_order`, `created_at`) VALUES (13, 'faculty', 'Anamika Roy Chowdhury', 'Head of Mathematics & STEM Instruction (M.Sc Mathematics, B.Ed)', 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?q=80&w=600&auto=format&fit=crop', NULL, 3, '2026-09-24 04:23:36');
INSERT INTO `content` (`id`, `section`, `title`, `subtitle`, `image_path`, `extra_data`, `display_order`, `created_at`) VALUES (14, 'faculty', 'Debabrata Mukherjee', 'Head of Humanities & Social Sciences (M.A History, B.Ed)', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop', NULL, 4, '2026-09-24 04:23:36');
INSERT INTO `content` (`id`, `section`, `title`, `subtitle`, `image_path`, `extra_data`, `display_order`, `created_at`) VALUES (15, 'faculty', 'Sreemoyee Dutta', 'Senior Educator — English Literature & Language (M.A English, B.Ed)', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop', NULL, 5, '2026-09-24 04:23:36');
INSERT INTO `content` (`id`, `section`, `title`, `subtitle`, `image_path`, `extra_data`, `display_order`, `created_at`) VALUES (16, 'faculty', 'Arindam Banerjee', 'Director of Physical Education & Athletics (M.P.Ed, NIS Certified)', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop', NULL, 6, '2026-09-24 04:23:36');
INSERT INTO `content` (`id`, `section`, `title`, `subtitle`, `image_path`, `extra_data`, `display_order`, `created_at`) VALUES (17, 'activities', 'Robotics & STEM Innovation Society', 'Hands-on micro-controller programming, sensor mechanics, and state robotics olympiads.', 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=600&auto=format&fit=crop', NULL, 1, '2026-09-24 04:23:36');
INSERT INTO `content` (`id`, `section`, `title`, `subtitle`, `image_path`, `extra_data`, `display_order`, `created_at`) VALUES (18, 'activities', 'Athletics, Football & Cricket Academy', 'Structured coaching under certified instructors fostering team sportsmanship and stamina.', 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=600&auto=format&fit=crop', NULL, 2, '2026-09-24 04:23:36');
INSERT INTO `content` (`id`, `section`, `title`, `subtitle`, `image_path`, `extra_data`, `display_order`, `created_at`) VALUES (19, 'activities', 'Classical & Contemporary Performing Arts', 'Vocal Indian classical music, Rabindra Sangeet, and expressive theater workshops.', 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=600&auto=format&fit=crop', NULL, 3, '2026-09-24 04:23:36');
INSERT INTO `content` (`id`, `section`, `title`, `subtitle`, `image_path`, `extra_data`, `display_order`, `created_at`) VALUES (20, 'activities', 'Literary, Debating & Model UN Society', 'Bilingual rhetoric, competitive parliamentary debate leagues, and elocution forums.', 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=600&auto=format&fit=crop', NULL, 4, '2026-09-24 04:23:36');
INSERT INTO `content` (`id`, `section`, `title`, `subtitle`, `image_path`, `extra_data`, `display_order`, `created_at`) VALUES (21, 'activities', 'Visual Arts, Clay & Creative Craft', 'Watercolour painting, canvas sketching, sculpture, and thematic art exhibitions.', 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=600&auto=format&fit=crop', NULL, 5, '2026-09-24 04:23:36');
INSERT INTO `content` (`id`, `section`, `title`, `subtitle`, `image_path`, `extra_data`, `display_order`, `created_at`) VALUES (22, 'activities', 'Yoga, Karate & Physical Fitness Club', 'Discipline-based martial arts training, mindfulness meditation, and core physical agility.', 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop', NULL, 6, '2026-09-24 04:23:36');

-- -------------------------------------------------------------
-- Table structure for table `enquiries`
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `enquiries`;
CREATE TABLE `enquiries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_name` varchar(100) NOT NULL,
  `student_name` varchar(100) NOT NULL,
  `parent_email` varchar(100) NOT NULL,
  `parent_phone` varchar(20) NOT NULL,
  `grade` varchar(100) NOT NULL,
  `academic_year` varchar(20) NOT NULL,
  `message` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `enquiries`
INSERT INTO `enquiries` (`id`, `parent_name`, `student_name`, `parent_email`, `parent_phone`, `grade`, `academic_year`, `message`, `created_at`) VALUES (1, 'dfghjkl', 'asdfghjk', 'nitishpaul7529@gmail.com', '7974646464646464', 'Middle School (Grades VI-VIII)', '2025-2026', '', '2026-09-20 05:26:50');

-- -------------------------------------------------------------
-- Table structure for table `events`
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `events`;
CREATE TABLE `events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `event_date` varchar(50) NOT NULL,
  `event_time` varchar(50) DEFAULT NULL,
  `venue` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `is_archived` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `events`
INSERT INTO `events` (`id`, `title`, `event_date`, `event_time`, `venue`, `description`, `is_archived`, `created_at`) VALUES (1, 'Annual Sports Meet & Inter-House Championship', '15/12/2026', '9:00 AM – 3:30 PM', 'Main Academy Sports Grounds', 'Track and field athletics, house drills, obstacle races, and awards ceremony.', 0, '2026-09-24 04:23:36');
INSERT INTO `events` (`id`, `title`, `event_date`, `event_time`, `venue`, `description`, `is_archived`, `created_at`) VALUES (2, 'Rabindra Jayanti & Cultural Evening', '09/05/2026', '10:00 AM – 1:30 PM', 'School Main Auditorium', 'Tribute to Gurudev Rabindranath Tagore featuring student dance, poetry recitation, and choir.', 0, '2026-09-24 04:23:36');
INSERT INTO `events` (`id`, `title`, `event_date`, `event_time`, `venue`, `description`, `is_archived`, `created_at`) VALUES (3, 'Annual Science, Technology & Innovation Exhibition', '28/11/2026', '10:30 AM – 4:00 PM', 'School Innovation Laboratories', 'Display of dynamic STEM prototypes, robotics demonstrations, and eco-green projects.', 0, '2026-09-24 04:23:36');
INSERT INTO `events` (`id`, `title`, `event_date`, `event_time`, `venue`, `description`, `is_archived`, `created_at`) VALUES (4, 'Investiture Ceremony & Prefectorial Board Induction', '18/07/2026', '10:00 AM – 1:00 PM', 'Heritage Quadrangle', 'Solemn swearing-in ceremony of Head Boy, Head Girl, Sports Captains, and House Prefects.', 0, '2026-09-24 04:23:36');

-- -------------------------------------------------------------
-- Table structure for table `gallery_albums`
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `gallery_albums`;
CREATE TABLE `gallery_albums` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `slug` varchar(100) NOT NULL,
  `title` varchar(150) NOT NULL,
  `description` text DEFAULT NULL,
  `cover_image` varchar(500) DEFAULT NULL,
  `display_order` int(11) DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `gallery_albums`
INSERT INTO `gallery_albums` (`id`, `slug`, `title`, `description`, `cover_image`, `display_order`) VALUES (1, 'annual-function', 'Annual Function', 'Grand celebrations, student theatrical performances, awards, and yearly fest.', 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000&auto=format&fit=crop', 1);
INSERT INTO `gallery_albums` (`id`, `slug`, `title`, `description`, `cover_image`, `display_order`) VALUES (2, 'sports-day', 'Sports Day', 'Track and field athletics, house championships, drills, and medal ceremonies.', 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1000&auto=format&fit=crop', 2);
INSERT INTO `gallery_albums` (`id`, `slug`, `title`, `description`, `cover_image`, `display_order`) VALUES (3, 'cultural-events', 'Cultural Events', 'Music, traditional dance, Rabindra Jayanti, independence day, and art exhibitions.', 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000&auto=format&fit=crop', 3);
INSERT INTO `gallery_albums` (`id`, `slug`, `title`, `description`, `cover_image`, `display_order`) VALUES (4, 'trips', 'Trips & Excursions', 'Educational field excursions, science park explorations, nature camps, and heritage walks.', 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1000&auto=format&fit=crop', 4);
INSERT INTO `gallery_albums` (`id`, `slug`, `title`, `description`, `cover_image`, `display_order`) VALUES (5, 'celebrations', 'Celebrations', 'Teachers Day, Childrens Day, Saraswati Puja, and festive occasions at campus.', 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1000&auto=format&fit=crop', 5);
INSERT INTO `gallery_albums` (`id`, `slug`, `title`, `description`, `cover_image`, `display_order`) VALUES (6, 'campus', 'Campus & Infrastructure', 'Classrooms, high-tech science laboratories, smart halls, library, and sports arena.', 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1000&auto=format&fit=crop', 6);

-- -------------------------------------------------------------
-- Table structure for table `gallery_items`
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `gallery_items`;
CREATE TABLE `gallery_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `album_slug` varchar(100) NOT NULL,
  `item_type` varchar(20) DEFAULT 'image',
  `media_url` text NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `display_order` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `gallery_items`
INSERT INTO `gallery_items` (`id`, `album_slug`, `item_type`, `media_url`, `title`, `display_order`, `created_at`) VALUES (1, 'annual-function', 'image', 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000&auto=format&fit=crop', 'Auditorium & Performing Arts Grand Finale', 2, '2026-09-24 04:23:36');
INSERT INTO `gallery_items` (`id`, `album_slug`, `item_type`, `media_url`, `title`, `display_order`, `created_at`) VALUES (2, 'annual-function', 'image', 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000&auto=format&fit=crop', 'Classical Dance & Vocal Harmony Ensemble', 1, '2026-09-24 04:23:36');
INSERT INTO `gallery_items` (`id`, `album_slug`, `item_type`, `media_url`, `title`, `display_order`, `created_at`) VALUES (3, 'sports-day', 'image', 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1000&auto=format&fit=crop', 'Inter-House Sprint & Relay Finals', 1, '2026-09-24 04:23:36');
INSERT INTO `gallery_items` (`id`, `album_slug`, `item_type`, `media_url`, `title`, `display_order`, `created_at`) VALUES (4, 'sports-day', 'image', 'https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?q=80&w=1000&auto=format&fit=crop', 'Medal Felicitation by Principal', 2, '2026-09-24 04:23:36');
INSERT INTO `gallery_items` (`id`, `album_slug`, `item_type`, `media_url`, `title`, `display_order`, `created_at`) VALUES (5, 'cultural-events', 'image', 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1000&auto=format&fit=crop', 'Rabindra Jayanti Heritage Celebrations', 1, '2026-09-24 04:23:36');
INSERT INTO `gallery_items` (`id`, `album_slug`, `item_type`, `media_url`, `title`, `display_order`, `created_at`) VALUES (6, 'trips', 'image', 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1000&auto=format&fit=crop', 'Botanical Gardens Educational Excursion', 1, '2026-09-24 04:23:36');
INSERT INTO `gallery_items` (`id`, `album_slug`, `item_type`, `media_url`, `title`, `display_order`, `created_at`) VALUES (7, 'celebrations', 'image', 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1000&auto=format&fit=crop', 'Kindergarten Festive Carnival', 1, '2026-09-24 04:23:36');
INSERT INTO `gallery_items` (`id`, `album_slug`, `item_type`, `media_url`, `title`, `display_order`, `created_at`) VALUES (8, 'campus', 'image', 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1000&auto=format&fit=crop', 'Main Academic Building & Quadrangle', 1, '2026-09-24 04:23:36');

-- -------------------------------------------------------------
-- Table structure for table `notices`
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `notices`;
CREATE TABLE `notices` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `notice_date` varchar(50) NOT NULL,
  `category` varchar(50) DEFAULT 'general',
  `description` text DEFAULT NULL,
  `attachment_path` varchar(255) DEFAULT NULL,
  `attachment_name` varchar(255) DEFAULT NULL,
  `is_archived` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `notices`
INSERT INTO `notices` (`id`, `title`, `notice_date`, `category`, `description`, `attachment_path`, `attachment_name`, `is_archived`, `created_at`) VALUES (1, 'dfghjkl;', '24/09/2026', 'games', 'gvhbnm,.', '', '', 0, '2026-09-24 05:40:45');

-- -------------------------------------------------------------
-- Table structure for table `site_settings`
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `site_settings`;
CREATE TABLE `site_settings` (
  `setting_key` varchar(100) NOT NULL,
  `setting_value` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`setting_value`)),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`setting_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `site_settings`
INSERT INTO `site_settings` (`setting_key`, `setting_value`, `updated_at`) VALUES ('admission_config', '{"status": "Open for 2026\\u20132027", "startDate": "01/10/2025", "lastDate": "31/03/2026", "prospectusFee": "500", "headline": "Admissions Open for Session 2026\\u20132027 (Nursery to Class X)", "guidelines": "Collect physical application packets from the Admissions Desk (Mon\\u2013Fri 10:30 AM to 3:00 PM). Complete verification and submit along with attested municipal birth certificate.", "feeNotice": "Admission and monthly tuition fees are non-refundable as established under institutional guidelines.", "booklistUniformInfo": "Uniform fabric and textbooks as per CBSE guidelines can be collected from the school store starting March 15th."}', '2026-09-24 04:23:36');
INSERT INTO `site_settings` (`setting_key`, `setting_value`, `updated_at`) VALUES ('fee_structure', '{"session": "2026-2027", "schoolName": "HERITAGE DAY SCHOOL", "admissionFees": {"nursery": "5,000", "primary": "8,000", "middle": "10,000", "secondary": "10,000"}, "monthlyFees": {"nursery": "1,500", "primary": "1,700", "middle": "1,900", "secondary": "2,100"}, "refundable": "Not Refundable"}', '2026-09-24 04:23:36');
INSERT INTO `site_settings` (`setting_key`, `setting_value`, `updated_at`) VALUES ('notice_categories', '[{"id": "sports", "label": "Sports"}, {"id": "games", "label": "games"}]', '2026-09-24 05:40:16');

-- -------------------------------------------------------------
-- Table structure for table `users`
-- -------------------------------------------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(20) DEFAULT 'student',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `users`
INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `created_at`) VALUES (1, 'Super Admin', 'admin@heritage.com', '$2b$12$RjK4JGDnfrZxFdJrSeE7BugsVDiTQZaa7UcX9u548W3XNyiEKafqC', 'admin', '2026-09-20 04:32:17');

SET FOREIGN_KEY_CHECKS = 1;
COMMIT;
