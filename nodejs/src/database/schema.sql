CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE OR REPLACE FUNCTION generate_searchable(_nome VARCHAR, _apelido VARCHAR, _stack JSON)
RETURNS TEXT AS $$
BEGIN
    RETURN _nome || ' ' || _apelido || ' ' || _stack::TEXT;
END;
$$ LANGUAGE plpgsql IMMUTABLE;


CREATE TABLE IF NOT EXISTS pessoas(
  id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
  nome VARCHAR NOT NULL,
  apelido VARCHAR NOT NULL UNIQUE,
  nascimento DATE NOT NULL,
  stack JSON,
  searchable TEXT GENERATED ALWAYS AS (generate_searchable(nome, apelido, stack)) STORED
);

CREATE INDEX IF NOT EXISTS pessoas_searchable_idx ON public.pessoas USING GIN (searchable public.gin_trgm_ops);

CREATE UNIQUE INDEX IF NOT EXISTS pessoas_apelido_idx ON public.pessoas USING btree (apelido);
