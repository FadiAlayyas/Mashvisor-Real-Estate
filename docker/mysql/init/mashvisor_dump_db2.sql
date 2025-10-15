-- ------------------------------------------------------
-- Table structure for table `agents`
-- ------------------------------------------------------
DROP TABLE IF EXISTS `agents`;
CREATE TABLE agents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    phone VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample agents
INSERT INTO agents (name, email, phone) VALUES
('Alice Johnson','alice@example.com','123-456-7890'),
('Bob Smith','bob@example.com','234-567-8901'),
('Charlie Brown','charlie@example.com','345-678-9012');

-- ------------------------------------------------------
-- Table structure for table `properties`
-- (unchanged from your original)
-- ------------------------------------------------------
DROP TABLE IF EXISTS `properties`;
CREATE TABLE properties (
  `id` int NOT NULL AUTO_INCREMENT,
  `state` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `zip_code` varchar(20) NOT NULL,
  `address` varchar(255) NOT NULL,
  `beds` int NOT NULL,
  `baths` decimal(3,1) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `properties` VALUES 
(1,'California','Los Angeles','90001','123 Sunset Blvd',3,2.0,'2025-09-23 09:52:16'),
(2,'New York','New York','10001','456 Madison Ave',2,1.5,'2025-09-23 09:52:16'),
(3,'Florida','Miami','33101','789 Ocean Dr',4,3.0,'2025-09-23 09:52:16');

-- ------------------------------------------------------
-- Table structure for table `listings`
-- ------------------------------------------------------
DROP TABLE IF EXISTS `listings`;
CREATE TABLE listings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    property_id INT NOT NULL,
    agent_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    price DECIMAL(12,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_agent_id (agent_id),
    INDEX idx_property_id (property_id),
    INDEX idx_price (price),
    CONSTRAINT fk_listings_property FOREIGN KEY (property_id) REFERENCES properties(id),
    CONSTRAINT fk_listings_agent FOREIGN KEY (agent_id) REFERENCES agents(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Sample listings (linked to properties and agents)
INSERT INTO listings (property_id, agent_id, title, price) VALUES
(1,1,'Luxury Sunset Blvd Home',500000.00),
(2,2,'Madison Ave Apartment',350000.00),
(3,3,'Ocean Drive Villa',750000.00);

-- ------------------------------------------------------
-- Table structure for table `users` (unchanged)
-- ------------------------------------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `users` VALUES 
(1,'Alice Johnson','alice@example.com','hashed_password','2025-09-23 09:52:14'),
(2,'Bob Smith','bob@example.com','hashed_password','2025-09-23 09:52:14'),
(3,'Charlie Brown','charlie@example.com','hashed_password','2025-09-23 09:52:14');

-- ------------------------------------------------------
-- Table structure for table `reservations` (unchanged)
-- ------------------------------------------------------
DROP TABLE IF EXISTS `reservations`;
CREATE TABLE `reservations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `property_id` int NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `status` enum('pending','confirmed','cancelled') DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `property_id` (`property_id`),
  CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `reservations_ibfk_2` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `reservations` VALUES 
(1,1,1,'2025-10-01','2025-10-07','confirmed','2025-09-23 09:52:18'),
(2,2,2,'2025-10-05','2025-10-10','pending','2025-09-23 09:52:18'),
(3,3,3,'2025-10-02','2025-10-04','cancelled','2025-09-23 09:52:18');