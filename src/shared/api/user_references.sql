-- 1) Enable pgcrypto extension (for UUID generation)
--    Skip if already enabled in your project
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2) Create the legal_entities table
CREATE TABLE IF NOT EXISTS public.legal_entities (
    id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    inn        VARCHAR(20) NOT NULL,       -- налоговый номер
    okpo       VARCHAR(20),                -- код ОКПО
    region     TEXT,                       -- район
    name       TEXT        NOT NULL,       -- наименование
    address    TEXT        NOT NULL,       -- адрес
    director   TEXT,                       -- руководитель
    oked       VARCHAR(20),                -- код ОКЭД
    vat_code   VARCHAR(20),                -- код НДС
    phone      VARCHAR(30) NOT NULL,       -- телефон

    registry_number     TEXT,                      -- регистрационный номер
    registry_date       TEXT,                      -- дата регистрации

    currency_account    TEXT,                      -- валютный счёт
    currency_bank_id    BIGINT   REFERENCES public.banks(id) ON DELETE SET NULL,
    payment_account     TEXT,                      -- расчетный счёт
    payment_bank_id     BIGINT   REFERENCES public.banks(id) ON DELETE SET NULL,
    region_id     BIGINT   REFERENCES public.regions(id) ON DELETE SET NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );

-- 3) Trigger function to auto-update updated_at
CREATE OR REPLACE FUNCTION public.set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 4) Attach the trigger to legal_entities
DROP TRIGGER IF EXISTS trg_legal_entities_timestamp
  ON public.legal_entities;

CREATE TRIGGER trg_legal_entities_timestamp
    BEFORE UPDATE ON public.legal_entities
    FOR EACH ROW EXECUTE FUNCTION public.set_timestamp();


-- 1) Ensure pgcrypto for UUIDs
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE public.individuals (
                                    id                        UUID      PRIMARY KEY DEFAULT gen_random_uuid(),
                                    pinfl                     VARCHAR(14) NOT NULL,           -- 14-digit personal ID
                                    region_id                 BIGINT     REFERENCES public.regions(id) ON DELETE SET NULL,
                                    patent_number             TEXT,
                                    full_name                 TEXT       NOT NULL,
                                    address                   TEXT       NOT NULL,
                                    additional_information    TEXT,
                                    phone                     VARCHAR(30) NOT NULL,
                                    passport_number           TEXT       NOT NULL,
                                    passport_issue_date       TEXT       NOT NULL,
                                    passport_issue_authority  TEXT       NOT NULL,

                                    currency_account    TEXT,                      -- валютный счёт
                                    currency_bank_id    BIGINT   REFERENCES public.banks(id) ON DELETE SET NULL,
                                    payment_account     TEXT,                      -- расчетный счёт
                                    payment_bank_id     BIGINT   REFERENCES public.banks(id) ON DELETE SET NULL,

                                    created_at                TIMESTAMPTZ NOT NULL DEFAULT now(),
                                    updated_at                TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3) Trigger to auto-update updated_at
CREATE OR REPLACE FUNCTION public.set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_individuals_updated
  ON public.individuals;

CREATE TRIGGER trg_individuals_updated
    BEFORE UPDATE ON public.individuals
    FOR EACH ROW
    EXECUTE FUNCTION public.set_timestamp();

