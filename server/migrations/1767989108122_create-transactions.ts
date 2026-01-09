import type { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    // Safe to include; no-op if already created
    pgm.createExtension("pgcrypto", { ifNotExists: true });

    pgm.createTable("transactions", {
        id: {
            type: "uuid",
            primaryKey: true,
            default: pgm.func("gen_random_uuid()"),
        },

        user_id: {
            type: "uuid",
            notNull: true,
            references: "users(id)",
            onDelete: "CASCADE",
        },

        account_id: {
            type: "uuid",
            notNull: true,
            references: "accounts(id)",
            onDelete: "CASCADE",
        },

        category_id: {
            type: "uuid",
            references: "categories(id)",
            onDelete: "SET NULL",
        },

        description: {
            type: "varchar(255)",
            notNull: true,
        },

        // Signed integer in cents 
        // negative: expenses
        // positive: income 
        amount_cents: {
            type: "integer",
            notNull: true,
        },

        // date transaction occurred 
        posted_at: {
            type: "timestamptz",
            notNull: true,
        },

        created_at: {
            type: "timestamptz",
            notNull: true,
            default: pgm.func("now()"),
        },

        updated_at: {
            type: "timestamptz",
            notNull: true,
            default: pgm.func("now()"),
        },
    });

    /**
     * Indexes for common queries
     */

    // Most common filters: user + date range
    pgm.createIndex("transactions", ["user_id", "posted_at"]);

    // Listing transactions per account
    pgm.createIndex("transactions", ["account_id", "posted_at"]);

    // Category breakdowns
    pgm.createIndex("transactions", ["category_id"]);
}

export async function down(pgm: MigrationBuilder): Promise<void> { 
    pgm.dropTable("transactions"); 
}
