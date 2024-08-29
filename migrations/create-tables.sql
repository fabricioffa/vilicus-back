-- Create the 'category' table
CREATE TABLE IF NOT EXISTS category (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Create trigger to update 'updated_at' column on update
CREATE TRIGGER IF NOT EXISTS category_update_trigger
AFTER UPDATE ON category
FOR EACH ROW
BEGIN
    UPDATE category SET updated_at = CURRENT_TIMESTAMP WHERE id = OLD.id;
END;

-- Create the 'product' table
CREATE TABLE IF NOT EXISTS product (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL,
    unit TEXT NOT NULL CHECK (unit IN ('UNIT', 'ML', 'L', 'KG', 'G')),
    avaiable BOOLEAN NOT NULL,
    category_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (category_id) REFERENCES category (id) ON DELETE CASCADE ON UPDATE CASCADE
    UNIQUE (name, category_id)
);

-- Create trigger to update 'updated_at' column on update
CREATE TRIGGER IF NOT EXISTS product_update_trigger
AFTER UPDATE ON product
FOR EACH ROW
BEGIN
    UPDATE product SET updated_at = CURRENT_TIMESTAMP WHERE id = OLD.id;
END;

-- Create the 'purchase' table
CREATE TABLE IF NOT EXISTS purchase (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    value DECIMAL(7, 2) NOT NULL CHECK (value >= 0),
    discount DECIMAL(7, 2) NOT NULL DEFAULT 0 CHECK (discount >= 0),
    quantity DECIMAL(7, 2) NOT NULL CHECK (quantity >= 0),
    store VARCHAR(100) NOT NULL,
    brand VARCHAR(100) NOT NULL,
    payment_form TEXT NOT NULL CHECK (payment_form IN ('CREDIT_CARD', 'MONEY', 'PIX')),
    invoice_id VARCHAR(200),
    priority INTEGER NOT NULL,
    expiration_date DATE NOT NULL,
    product_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (product_id) REFERENCES product (id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create trigger to update 'updated_at' column on update
CREATE TRIGGER IF NOT EXISTS purchase_update_trigger
AFTER UPDATE ON purchase
FOR EACH ROW
BEGIN
    UPDATE purchase SET updated_at = CURRENT_TIMESTAMP WHERE id = OLD.id;
END;

-- Create indexes
CREATE INDEX IF NOT EXISTS category_id_index ON category (id);
CREATE INDEX IF NOT EXISTS product_category_id_index ON product (category_id);
CREATE INDEX IF NOT EXISTS purchase_product_id_index ON purchase (product_id);
