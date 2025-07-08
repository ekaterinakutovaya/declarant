export interface Regime {
  id: number;
  code: string;
  name: string;
  type: string;
  regulatory_legal_acts: string;
}

export interface CustomsPost {
  id: number;
  code: string;
  name: string;
  location?: string;
  phone?: string;
}

export interface Country {
  id: number;
  country?: string;
  letter_code?: string;
  digital_code: string;
  offshore: boolean;
}

export interface Region {
  id: number;
  code: string;
  name: string;
}

export interface Declaration {
  workflow_status?: never;
  usd_rate?: never;
  net_weight?: never;
  gross_weight?: never;
  invoice_value?: never;
  customs_value?: never;
  payment_amount?: never;
  product_detail?: never;
  product_code?: never;
  contract_number?: string | null ;
  service_condition_id?: number | string | null;
  country_destination?: {
    code: string | undefined;
    id: number, country: string};
  country_origin?: {
    code: string | undefined;
    id: number, country: string};
  importer_name?: string | null;
  exporter_name?: string | null;
  created_at?: string;
  gtd_reg_number?: string | null;
  gtd_reg_date?: string | null;
  customs_post?: {
    code: string | undefined;
    id: number, name: string};
  customs_regime_code?: string | null;
  customs_regime_type?: string | null;
  /** for antd’s rowKey */
  id?: string | null | undefined;
  key?: string | null | undefined;

  declarationType?: string | null;
  customsRegime?: string | null;
  formNumber?: string | null;
  form_number?: string | null;
  gtdNumber?: string | null;
  gtd_number?: string | null;
  customsPost?: string | null;
  gtdRegDate?: string | null;
  gtdRegNumber?: string | null;
  date?: string | null;

  exporter?: string | null;
  importer?: string | null;
  countryOrigin?: string | null;
  countryDestination?: string | null;

  serviceConditions?: number | null;
  places?: number | null;
  quantity?: number | null;

  contractNumber?: string | null;
  productCode?: string | null;
  productDetail?: string | null;

  paymentAmount?: number | null;
  customsValue?: number | null;
  invoiceValue?: number | null;

  grossWeight?: number | null;
  netWeight?: number | null;
  ktd?: string | null;
  usdRate?: number | null;

  note?: string | null;
  workflowStatus?: string | null;
  updated_at?: string | null; // Optional if not always selected
}

export interface DeclarationRow {
  key:               string;
  declarationType:   string;
  customsRegime:     string;
  formNumber:        string;
  gtdNumber:         string;
  customsPost:       string;
  gtdRegDate:        string;
  gtdRegNumber:      string;
  date:              string;
  exporter:          string;
  importer:          string;
  countryOrigin:     string;
  countryDestination:string;
  serviceConditions: number;
  places:            number;
  quantity:          number;
  contractNumber:    string;
  productCode:       string;
  productDetail:     string;
  paymentAmount:     number;
  customsValue:      number;
  invoiceValue:      number;
  grossWeight:       number;
  netWeight:         number;
  ktd:               string;
  usdRate:           number;
  note:              string;
  workflowStatus:    string;
}

/**
 * Represents a legal entity (юридическое лицо) in the system.
 */
export interface LegalEntity {
  /** Primary key */
  id: string;
  /** Taxpayer ID */
  inn: string;
  /** OKPO code */
  okpo?: string;
  /** Foreign-key column in your table */
  region_id?: number;
  /** Human-readable region (mapped from the array you get back) */
  region?: Region | Region[] | null;
  /** Full name */
  name: string;
  /** Address */
  address: string;
  /** Director’s name */
  director?: string;
  /** OKED code */
  oked?: string;
  /** VAT code */
  vat_code?: string;
  /** Contact phone */
  phone: string;
  /** Extra notes */
  additional_info?: string;
  /** Registry number */
  registry_number?: string;
  /** ISO date string */
  registry_date?: string;
  /** Settlement account */
  payment_account?: string;
  /** Bank MFO for payment_account */
  payment_bank_mfo?: string;
  /** Foreign-currency account */
  currency_account?: string;
  /** Bank MFO for currency_account */
  currency_bank_mfo?: string;
  /** Timestamps */
  created_at?: string;
  updated_at?: string;
}

/**
 * Represents an individual (физическое лицо) in the system.
 */
export interface Individual {
  /** UUID primary key */
  id?: string;
  key?: string;
  /** 14-digit personal ID (PINFL) */
  pinfl: string;
  /** Reference to regions table */
  region_id?: number | null;
  /** Patent number (if applicable) */
  patent_number?: string;
  /** Full name */
  full_name: string;
  name?: string;
  /** Registered address */
  address: string;
  /** Any additional information */
  additional_information?: string;
  /** Contact phone */
  phone: string;
  /** Passport number */
  passport_number: string;
  /** Passport issue date (ISO string or formatted) */
  passport_issue_date: string;
  /** Authority that issued the passport */
  passport_issue_authority: string;
  /** Foreign currency account */
  currency_account?: string;
  /** Reference to banks table */
  currency_bank_id?: number | null;
  /** Payment (settlement) account */
  payment_account?: string;
  /** Reference to banks table */
  payment_bank_id?: number | null;
  /** Record creation timestamp */
  created_at?: string;
  /** Record update timestamp */
  updated_at?: string;
}
