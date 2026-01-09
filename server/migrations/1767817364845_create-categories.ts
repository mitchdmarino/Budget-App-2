import type { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createExtension("pgcrypto", { ifNotExists: true });

    pgm.createTable("categories", {
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

        name: {
            type: "varchar(100)",
            notNull: true,
        },

        color: {
            type: "varchar(7)",
            notNull: true,
            default: "#000000",
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

    // Prevent duplicate category names per user:
    // user A can have "Groceries", user B can also have "Groceries"
    pgm.addConstraint("categories", "categories_user_id_name_unique", {
        unique: ["user_id", "name"],
    });

    // make sure color is always valid hex code
    pgm.addConstraint("categories", "categories_color_hex_check", {
        check: "color ~ '^#[0-9A-Fa-f]{6}$'",
    });

    // Indexing for categories for a specific user 
    // SELECT * FROM categories WHERE user_id = ? ORDER BY name
    pgm.createIndex("categories", ["user_id", "name"]);
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable("categories");
}
