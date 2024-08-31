CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    average_score FLOAT DEFAULT -1,
    borrower_id INTEGER,   
    borrowed_by_id INTEGER 
);

ALTER TABLE books
ADD CONSTRAINT fk_borrower
FOREIGN KEY (borrower_id) REFERENCES users(id) ON DELETE SET NULL;

ALTER TABLE books
ADD CONSTRAINT fk_borrowed_by
FOREIGN KEY (borrowed_by_id) REFERENCES users(id) ON DELETE SET NULL;

CREATE INDEX idx_borrower_id ON books(borrower_id);
CREATE INDEX idx_borrowed_by_id ON books(borrowed_by_id);