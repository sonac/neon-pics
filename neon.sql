DROP TABLE IF EXISTS pictures;
CREATE TABLE pictures (
  id      SERIAL PRIMARY KEY,
  pic_url VARCHAR(256)
);

DROP TABLE IF EXISTS tags;
CREATE TABLE tags (
  id  SERIAL PRIMARY KEY,
  tag VARCHAR(256)
);

DROP TABLE IF EXISTS picture_tags;
CREATE TABLE picture_tags (
  pic_id INT,
  tag_id INT
);

DROP TABLE IF EXISTS questionnaire;
CREATE TABLE questionnaire (
  id   SERIAL PRIMARY KEY,
  text VARCHAR(2000)
);


DROP TABLE IF EXISTS questionnaire_picture;
CREATE TABLE questionnaire_picture (
  quest_id INT,
  pic_id   INT,
  PRIMARY KEY (quest_id, pic_id)
);

DROP TABLE IF EXISTS questionnaire_score;
CREATE TABLE questionnaire_score (
  quest_id INT,
  user_id  INT,
  pic_id   INT,
  score    FLOAT,
  PRIMARY KEY (quest_id, user_id, pic_id)
);

DELETE FROM pictures
WHERE pic_url = 'http://www.lovethispic.com/uploaded_images/22349-Neon-Lights-Coca-cola.jpg';
DELETE FROM pictures
WHERE pic_url = 'https://image.freepik.com/free-vector/bright-neon-signs-collection_23-2147574590.jpg';
INSERT INTO pictures (id, pic_url)
VALUES (3, 'http://www.lovethispic.com/uploaded_images/22349-Neon-Lights-Coca-cola.jpg');
INSERT INTO pictures (id, pic_url)
VALUES (4, 'https://i.pinimg.com/564x/56/6e/51/566e514696c5a967625bf4c8e416d4fb.jpg');
