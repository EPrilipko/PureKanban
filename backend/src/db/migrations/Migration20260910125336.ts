import { Migration } from '@mikro-orm/migrations';

export class Migration20260910125336 extends Migration {

  override up(): void | Promise<void> {
    this.addSql(`create schema if not exists "kanban";`);
    this.addSql(`create table "kanban"."board" ("id" varchar(255) not null, "name" varchar(255) not null, "color" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, primary key ("id"));`);

    this.addSql(`create table "kanban"."column" ("id" uuid not null, "rank" varchar(255) not null, "name" varchar(255) not null, "color" varchar(255) not null, "board_id" varchar(255) not null, "max_cards_count" int null, "created_at" timestamptz not null, "updated_at" timestamptz not null, primary key ("id"));`);
    this.addSql(`create index "column_rank_index" on "kanban"."column" ("rank");`);
    this.addSql(`alter table "kanban"."column" add constraint "unique_rank_per_board" unique ("board_id", "rank");`);

    this.addSql(`create table "kanban"."tag" ("id" uuid not null, "name" varchar(255) not null, "color" varchar(255) not null, "board_id" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, primary key ("id"));`);

    this.addSql(`create table "kanban"."user" ("id" serial primary key, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "email" varchar(255) not null, "password_hash" varchar(255) not null, "created_at" timestamptz not null);`);

    this.addSql(`create table "kanban"."card" ("id" varchar(255) not null, "rank" varchar(255) not null, "name" varchar(255) not null, "description" varchar(255) not null, "owner_id" int null, "board_id" varchar(255) not null, "column_id" uuid not null, "search_vector" tsvector null, "created_at" timestamptz not null, "updated_at" timestamptz not null, primary key ("id"));`);
    this.addSql(`create index "card_rank_index" on "kanban"."card" ("rank");`);
    this.addSql(`CREATE INDEX idx_search_vector ON kanban.card USING gin(search_vector);`);
    this.addSql(`alter table "kanban"."card" add constraint "unique_rank_per_column" unique ("column_id", "rank");`);

    this.addSql(`create table "kanban"."notification" ("id" uuid not null, "type" text not null, "is_read" boolean not null default false, "actor_id" int not null, "recipient_id" int not null, "board_id" varchar(255) not null, "created_at" timestamptz not null, "card_id" varchar(255) null, primary key ("id"));`);
    this.addSql(`create index "notification_type_index" on "kanban"."notification" ("type");`);

    this.addSql(`create table "kanban"."card_tag" ("card_id" varchar(255) not null, "tag_id" uuid not null, primary key ("card_id", "tag_id"));`);

    this.addSql(`create table "kanban"."card_history" ("id" uuid not null, "author_id" int not null, "card_id" varchar(255) not null, "payload" jsonb not null, "created_at" timestamptz not null, primary key ("id"));`);

    this.addSql(`create table "kanban"."card_comment" ("id" uuid not null, "card_id" varchar(255) not null, "user_id" int not null, "text" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, primary key ("id"));`);

    this.addSql(`create table "kanban"."card_assignees" ("card_id" varchar(255) not null, "user_id" int not null, primary key ("card_id", "user_id"));`);

    this.addSql(`create table "kanban"."board_member" ("id" serial not null, "user_id" int not null, "board_id" varchar(255) not null, "role" text not null, "created_at" timestamptz not null, primary key ("id", "user_id", "board_id"));`);

    this.addSql(`create table "kanban"."user_session" ("id" uuid not null, "refresh_token_hash" varchar(255) not null, "device_id" varchar(255) not null, "user_id" int not null, primary key ("id"));`);
    this.addSql(`alter table "kanban"."user_session" add constraint "unique_user_per_device" unique ("user_id", "device_id");`);

    this.addSql(`alter table "kanban"."column" add constraint "column_board_id_foreign" foreign key ("board_id") references "kanban"."board" ("id") on delete cascade;`);
    this.addSql(`alter table "kanban"."column" add constraint "max_card_counts_limit" check (max_cards_count >= 1);`);

    this.addSql(`alter table "kanban"."tag" add constraint "tag_board_id_foreign" foreign key ("board_id") references "kanban"."board" ("id") on delete cascade;`);
    this.addSql(`create or replace function "kanban"."tag_trigger_tag_name_changed_fn"() returns trigger as $$ begin 
        IF OLD.name IS DISTINCT FROM NEW.name THEN
          DECLARE
            r RECORD;
        BEGIN
            FOR r IN SELECT card_id FROM kanban.card_tag WHERE tag_id = NEW.id LOOP
              PERFORM kanban.fn_refresh_card_search_vector(r.card_id);
        END LOOP; END; END IF; RETURN NULL; end; $$ language plpgsql;`);
    this.addSql(`create trigger "trigger_tag_name_changed" AFTER UPDATE on "kanban"."tag" for each ROW execute function "kanban"."tag_trigger_tag_name_changed_fn"();`);

    this.addSql(`alter table "kanban"."card" add constraint "card_owner_id_foreign" foreign key ("owner_id") references "kanban"."user" ("id") on delete set null;`);
    this.addSql(`alter table "kanban"."card" add constraint "card_board_id_foreign" foreign key ("board_id") references "kanban"."board" ("id") on delete cascade;`);
    this.addSql(`alter table "kanban"."card" add constraint "card_column_id_foreign" foreign key ("column_id") references "kanban"."column" ("id") on delete cascade;`);
    this.addSql(`create or replace function "kanban"."card_trigger_card_search_update_fn"() returns trigger as $$ begin 
        IF TG_OP = 'INSERT' OR (TG_OP = 'UPDATE' AND OLD.name IS DISTINCT FROM NEW.name) THEN
          PERFORM kanban.fn_refresh_card_search_vector(NEW.id);
        END IF; RETURN NULL; end; $$ language plpgsql;`);
    this.addSql(`create trigger "trigger_card_search_update" AFTER INSERT OR UPDATE on "kanban"."card" for each ROW execute function "kanban"."card_trigger_card_search_update_fn"();`);

    this.addSql(`alter table "kanban"."notification" add constraint "notification_actor_id_foreign" foreign key ("actor_id") references "kanban"."user" ("id");`);
    this.addSql(`alter table "kanban"."notification" add constraint "notification_recipient_id_foreign" foreign key ("recipient_id") references "kanban"."user" ("id");`);
    this.addSql(`alter table "kanban"."notification" add constraint "notification_board_id_foreign" foreign key ("board_id") references "kanban"."board" ("id") on delete cascade;`);
    this.addSql(`alter table "kanban"."notification" add constraint "notification_card_id_foreign" foreign key ("card_id") references "kanban"."card" ("id") on delete cascade;`);
    this.addSql(`alter table "kanban"."notification" add constraint "notification_type_check" check ("type" in ('CardOwnerAdded', 'CardOwnerRemoved', 'CardAssigneesAdded', 'CardAssigneesRemoved'));`);

    this.addSql(`alter table "kanban"."card_tag" add constraint "card_tag_card_id_foreign" foreign key ("card_id") references "kanban"."card" ("id") on update cascade on delete cascade;`);
    this.addSql(`alter table "kanban"."card_tag" add constraint "card_tag_tag_id_foreign" foreign key ("tag_id") references "kanban"."tag" ("id") on update cascade on delete cascade;`);
    this.addSql(`create or replace function "kanban"."card_tag_trigger_card_tags_changed_fn"() returns trigger as $$ begin 
        IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
          PERFORM kanban.fn_refresh_card_search_vector(NEW.card_id);
        ELSIF TG_OP = 'DELETE' THEN
          PERFORM kanban.fn_refresh_card_search_vector(OLD.card_id);
        END IF; RETURN NULL; end; $$ language plpgsql;`);
    this.addSql(`create trigger "trigger_card_tags_changed" AFTER INSERT OR UPDATE OR DELETE on "kanban"."card_tag" for each ROW execute function "kanban"."card_tag_trigger_card_tags_changed_fn"();`);

    this.addSql(`alter table "kanban"."card_history" add constraint "card_history_author_id_foreign" foreign key ("author_id") references "kanban"."user" ("id");`);
    this.addSql(`alter table "kanban"."card_history" add constraint "card_history_card_id_foreign" foreign key ("card_id") references "kanban"."card" ("id") on delete cascade;`);

    this.addSql(`alter table "kanban"."card_comment" add constraint "card_comment_card_id_foreign" foreign key ("card_id") references "kanban"."card" ("id") on delete cascade;`);
    this.addSql(`alter table "kanban"."card_comment" add constraint "card_comment_user_id_foreign" foreign key ("user_id") references "kanban"."user" ("id");`);

    this.addSql(`alter table "kanban"."card_assignees" add constraint "card_assignees_card_id_foreign" foreign key ("card_id") references "kanban"."card" ("id") on update cascade on delete cascade;`);
    this.addSql(`alter table "kanban"."card_assignees" add constraint "card_assignees_user_id_foreign" foreign key ("user_id") references "kanban"."user" ("id") on update cascade on delete cascade;`);

    this.addSql(`alter table "kanban"."board_member" add constraint "board_member_user_id_foreign" foreign key ("user_id") references "kanban"."user" ("id");`);
    this.addSql(`alter table "kanban"."board_member" add constraint "board_member_board_id_foreign" foreign key ("board_id") references "kanban"."board" ("id") on delete cascade;`);
    this.addSql(`alter table "kanban"."board_member" add constraint "board_member_role_check" check ("role" in ('Author', 'Admin', 'User'));`);

    this.addSql(`alter table "kanban"."user_session" add constraint "user_session_user_id_foreign" foreign key ("user_id") references "kanban"."user" ("id");`);
  }

  override down(): void | Promise<void> {
    this.addSql(`alter table "kanban"."column" drop constraint "column_board_id_foreign";`);
    this.addSql(`alter table "kanban"."tag" drop constraint "tag_board_id_foreign";`);
    this.addSql(`alter table "kanban"."card" drop constraint "card_board_id_foreign";`);
    this.addSql(`alter table "kanban"."notification" drop constraint "notification_board_id_foreign";`);
    this.addSql(`alter table "kanban"."board_member" drop constraint "board_member_board_id_foreign";`);
    this.addSql(`alter table "kanban"."card" drop constraint "card_column_id_foreign";`);
    this.addSql(`alter table "kanban"."card_tag" drop constraint "card_tag_tag_id_foreign";`);
    this.addSql(`alter table "kanban"."card" drop constraint "card_owner_id_foreign";`);
    this.addSql(`alter table "kanban"."notification" drop constraint "notification_actor_id_foreign";`);
    this.addSql(`alter table "kanban"."notification" drop constraint "notification_recipient_id_foreign";`);
    this.addSql(`alter table "kanban"."card_history" drop constraint "card_history_author_id_foreign";`);
    this.addSql(`alter table "kanban"."card_comment" drop constraint "card_comment_user_id_foreign";`);
    this.addSql(`alter table "kanban"."card_assignees" drop constraint "card_assignees_user_id_foreign";`);
    this.addSql(`alter table "kanban"."board_member" drop constraint "board_member_user_id_foreign";`);
    this.addSql(`alter table "kanban"."user_session" drop constraint "user_session_user_id_foreign";`);
    this.addSql(`alter table "kanban"."notification" drop constraint "notification_card_id_foreign";`);
    this.addSql(`alter table "kanban"."card_tag" drop constraint "card_tag_card_id_foreign";`);
    this.addSql(`alter table "kanban"."card_history" drop constraint "card_history_card_id_foreign";`);
    this.addSql(`alter table "kanban"."card_comment" drop constraint "card_comment_card_id_foreign";`);
    this.addSql(`alter table "kanban"."card_assignees" drop constraint "card_assignees_card_id_foreign";`);

    this.addSql(`drop table if exists "kanban"."board" cascade;`);
    this.addSql(`drop table if exists "kanban"."column" cascade;`);
    this.addSql(`drop trigger if exists "trigger_tag_name_changed" on "kanban"."tag";`);
    this.addSql(`drop function if exists "kanban"."tag_trigger_tag_name_changed_fn"();`);
    this.addSql(`drop table if exists "kanban"."tag" cascade;`);
    this.addSql(`drop table if exists "kanban"."user" cascade;`);
    this.addSql(`drop trigger if exists "trigger_card_search_update" on "kanban"."card";`);
    this.addSql(`drop function if exists "kanban"."card_trigger_card_search_update_fn"();`);
    this.addSql(`drop table if exists "kanban"."card" cascade;`);
    this.addSql(`drop table if exists "kanban"."notification" cascade;`);
    this.addSql(`drop trigger if exists "trigger_card_tags_changed" on "kanban"."card_tag";`);
    this.addSql(`drop function if exists "kanban"."card_tag_trigger_card_tags_changed_fn"();`);
    this.addSql(`drop table if exists "kanban"."card_tag" cascade;`);
    this.addSql(`drop table if exists "kanban"."card_history" cascade;`);
    this.addSql(`drop table if exists "kanban"."card_comment" cascade;`);
    this.addSql(`drop table if exists "kanban"."card_assignees" cascade;`);
    this.addSql(`drop table if exists "kanban"."board_member" cascade;`);
    this.addSql(`drop table if exists "kanban"."user_session" cascade;`);

    this.addSql(`drop schema if exists "kanban";`);
  }

}
