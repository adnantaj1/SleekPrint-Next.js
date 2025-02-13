CREATE TABLE `product_images` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`product_id` integer NOT NULL,
	`image_url` text NOT NULL,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
ALTER TABLE `products` ADD `created_at` text DEFAULT 'CURRENT_TIMESTAMP';--> statement-breakpoint
ALTER TABLE `products` DROP COLUMN `image_url`;