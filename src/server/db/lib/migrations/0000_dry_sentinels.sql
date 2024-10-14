CREATE TABLE `yonx_credential` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`email` text,
	`email_verified` integer DEFAULT false NOT NULL,
	`hashed_password` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `yonx_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `yonx_credential_email_unique` ON `yonx_credential` (`email`);--> statement-breakpoint
CREATE TABLE `yonx_oauth_account` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`email` text NOT NULL,
	`email_verified` integer DEFAULT false NOT NULL,
	`provider` text NOT NULL,
	`provider_account_id` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `yonx_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `yonx_session` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`timestamp` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `yonx_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `yonx_user` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`hashedPassword` text,
	`email_verified` integer DEFAULT false,
	`email_valid` integer DEFAULT 0,
	`created_at` text DEFAULT (current_timestamp),
	`name` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `yonx_user_id_unique` ON `yonx_user` (`id`);