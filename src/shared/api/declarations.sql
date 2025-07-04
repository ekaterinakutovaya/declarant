CREATE TABLE declarations (
                              id                UUID      PRIMARY KEY DEFAULT gen_random_uuid(),
                              note              TEXT,

    -- "type" is free-form text on client ("Рабочая"|"Черновик"|"Шаблон")
                              declaration_type              VARCHAR   NOT NULL,
                              workflow_status              VARCHAR   NOT NULL,
                              submission_type              VARCHAR   NOT NULL,

                              customs_regime_id BIGINT   REFERENCES customs_regimes(id)       ON DELETE SET NULL,
                              form_number       VARCHAR,
                              gtd_number        VARCHAR,

                              customs_post_id   BIGINT   REFERENCES customs_posts(id)         ON DELETE SET NULL,

                              gtd_reg_date      DATE,
                              gtd_reg_number    VARCHAR,

                              date              TEXT,

                              exporter_id       UUID     REFERENCES legal_entities(id)       ON DELETE SET NULL,
                              importer_id       UUID     REFERENCES individuals(id)          ON DELETE SET NULL,

                              country_origin_id      BIGINT REFERENCES countries(id)          ON DELETE SET NULL,
                              country_destination_id BIGINT REFERENCES countries(id)          ON DELETE SET NULL,

                              service_condition_id   BIGINT REFERENCES service_conditions(id) ON DELETE SET NULL,

                              places            INT,
                              quantity          NUMERIC,  -- you can adjust scale/precision if needed

                              contract_number   VARCHAR,
                              product_code      VARCHAR,
                              product_detail    TEXT,

                              payment_amount    NUMERIC,
                              customs_value     NUMERIC,
                              invoice_value     NUMERIC,

                              gross_weight      NUMERIC,
                              net_weight        NUMERIC,

                              ktd               VARCHAR,
                              usd_rate          NUMERIC,

                              graph2_inn        VARCHAR,
                              graph8_inn        VARCHAR,

                              created_at        TIMESTAMP WITH TIME ZONE DEFAULT now(),
                              updated_at        TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Optional trigger to auto-update "updated_at"
CREATE OR REPLACE FUNCTION set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_declarations_timestamp
    BEFORE UPDATE ON declarations
    FOR EACH ROW EXECUTE FUNCTION set_timestamp();
