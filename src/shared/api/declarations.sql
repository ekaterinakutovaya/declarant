CREATE TABLE declarations (
                              id                           UUID      PRIMARY KEY DEFAULT gen_random_uuid(),
                              note                         TEXT,

    -- Статусы и типы
                              workflow_status              VARCHAR   NOT NULL,
                              submission_type              VARCHAR   NOT NULL,        -- из values.submissionType

    -- Справочник таможенных режимов (id + дубли полей type/code)
                              customs_regime_id            BIGINT    REFERENCES customs_regimes(id)    ON DELETE SET NULL,
                              customs_regime_type          VARCHAR,                                   -- из values.customsRegimeType
                              customs_regime_code          VARCHAR,                                   -- из values.customsRegimeCode

    -- Справочник таможенных постов
                              customs_post_id              BIGINT    REFERENCES customs_posts(id)      ON DELETE SET NULL,

    -- Номер и дата/номер регистрации ГТД
                              form_number                  VARCHAR,                                   -- из values.formNumber
                              gtd_number                   VARCHAR,                                   -- из values.gTDNumber
                              gtd_reg_date                 TEXT,                                      -- из values.fillingDate
                              gtd_reg_number               VARCHAR,                                   -- из values.gTDRegistryNumber

    -- Место заполнения
                              filling_location             TEXT,                                      -- из values.fillingLocation

    -- Экспортер (грузоотправитель)
                              exporter_id                  UUID      REFERENCES legal_entities(id)     ON DELETE SET NULL,
                              exporter_name                TEXT,                                      -- из values.exporterName
                              exporter_address             TEXT,                                      -- из values.exporterAddress
                              exporter_phone               VARCHAR,                                   -- из values.exporterPhone
                              exporter_additional_info     TEXT,                                      -- из values.exporterAdditionalInfo
                              exporter_name2               TEXT,                                      -- из values.exporterName2
                              graph2_inn                   VARCHAR,                                   -- из values.exporterInn

    -- Импортер (грузополучатель)
                              importer_id                  UUID      REFERENCES legal_entities(id)         ON DELETE SET NULL,
                              importer_name                TEXT,                                      -- из values.importerName
                              importer_address             TEXT,                                      -- из values.importerAddress
                              importer_phone               VARCHAR,                                   -- из values.importerPhone
                              importer_additional_info     TEXT,                                      -- из values.importerAdditionalInfo
                              importer_name2               TEXT,                                      -- из values.importerName2
                              graph8_inn                   VARCHAR,                                   -- из values.importerInn

    -- Контракт
                              contract_number              VARCHAR,                                   -- можно использовать для номера
                              contract_number_and_date     VARCHAR,                                   -- из values.contractNumberAndDate

    -- Данные декларирующего лица
                              declarant_pinfl              VARCHAR,                                   -- из values.declarantPinfl

    -- Остальные справочники (если понадобятся)
                              country_origin_id            BIGINT    REFERENCES countries(id)           ON DELETE SET NULL,
                              country_destination_id       BIGINT    REFERENCES countries(id)           ON DELETE SET NULL,
                              service_condition_id         BIGINT    REFERENCES service_conditions(id)  ON DELETE SET NULL,

    -- Прочие поля (оставил как у вас)
                              places                       INT,
                              quantity                     NUMERIC,
                              product_code                 VARCHAR,
                              product_detail               TEXT,
                              payment_amount               NUMERIC,
                              customs_value                NUMERIC,
                              invoice_value                NUMERIC,
                              gross_weight                 NUMERIC,
                              net_weight                   NUMERIC,
                              ktd                          VARCHAR,
                              usd_rate                     NUMERIC,

    -- Доп. листы
                              additional_sheet_1           VARCHAR(2),
                              additional_sheet_2           VARCHAR(2),

                              created_at                   TIMESTAMP WITH TIME ZONE DEFAULT now(),
                              updated_at                   TIMESTAMP WITH TIME ZONE DEFAULT now()
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
