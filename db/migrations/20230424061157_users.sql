-- migrate:up
CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  kakao_id BIGINT NULL UNIQUE,
  nickname VARCHAR(50) NULL,
  email VARCHAR(50) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP
);

-- migrate:down
DROP TABLE users;
