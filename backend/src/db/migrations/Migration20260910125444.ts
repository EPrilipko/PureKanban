import { Migration } from '@mikro-orm/migrations';

export class Migration20260910125444 extends Migration {
  override up(): void | Promise<void> {
    this.addSql(`
CREATE OR REPLACE FUNCTION kanban.fn_refresh_card_search_vector(card_id_param TEXT)
RETURNS VOID AS $$
BEGIN
    UPDATE kanban.card
    SET search_vector = 
        setweight(to_tsvector('russian', coalesce(name, '')), 'A') ||
        setweight(to_tsvector('russian', coalesce((
            SELECT string_agg(t.name, ' ')
            FROM kanban.tag t
            JOIN kanban.card_tag ct ON ct.tag_id = t.id
            WHERE ct.card_id = card_id_param
        ), '')), 'B')
    WHERE id = card_id_param;
END;
$$ LANGUAGE plpgsql;
      `);
  }

  override down(): void | Promise<void> {
    this.addSql(
      `DROP FUNCTION IF EXISTS kanban.fn_refresh_card_search_vector(TEXT);`,
    );
  }
}
