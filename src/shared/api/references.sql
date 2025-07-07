CREATE TABLE regions (
                                 id              BIGSERIAL PRIMARY KEY,
                                 code            TEXT        NOT NULL,
                                 name            TEXT        NOT NULL
);

CREATE TABLE banks (
                                 id              BIGSERIAL PRIMARY KEY,
                                 okpo            TEXT        NOT NULL,
                                 inn            TEXT        NOT NULL,
                                 mfo            TEXT        NOT NULL,
                                 name            TEXT        NOT NULL,
                                 address            TEXT        NOT NULL
);

CREATE TABLE customs_regimes (
                                 id              BIGSERIAL PRIMARY KEY,
                                 code            CHAR(2)        NOT NULL,
                                 type            CHAR(2)        NOT NULL,
                                 name            TEXT        NOT NULL,
                                 regulatory_legal_acts TEXT  -- any text or JSON listing the acts
);

CREATE TABLE customs_posts (
                               id       BIGSERIAL PRIMARY KEY,
                               code     TEXT    NOT NULL,
                               name     TEXT    NOT NULL,
                               location TEXT,         -- e.g. "41.3111,69.2797" or any text format
                               phone    TEXT
);

CREATE TABLE countries (
                           id           BIGSERIAL PRIMARY KEY,
                           country      TEXT    NOT NULL,
                           letter_code  VARCHAR(2) NOT NULL,
                           digital_code VARCHAR(3) NOT NULL,
                           offshore     BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE service_conditions (
                                    id          BIGSERIAL PRIMARY KEY,
                                    code        INT      NOT NULL,
                                    letter_code VARCHAR(5),
                                    name        TEXT     NOT NULL
);

CREATE TABLE currency_codes (
                                id          BIGSERIAL PRIMARY KEY,
                                code        INT      NOT NULL,
                                letter_code VARCHAR(3) NOT NULL,
                                name        TEXT     NOT NULL
);