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
    location: string;
    phone: string;
}

export interface Country {
    id: number;
    country?: string;
    letter_code?: string;
    digital_code: string;
    offshore: boolean;
}

export interface Declaration {
    id: string;
    note: string;               // Примечание
    declarationType: number;               // Тип декларации
    customsRegimeType?: string;               // Тип декларации
    customsRegimeCode?: string;               // Тип декларации
    submissionType: string;               // Тип подачи
    mode: string;               // Режим
    formNumber: string;         // № бланка
    gtdNumber: string;          // № ГТД
    post: string;               // Пост
    gtdRegDate: string;         // Дата рег.ГТД
    gtdRegNumber: string;       // Рег. № ГТД
    date: string;               // Дата
    exporter: string;           // Экспортер
    importer: string;           // Импортер
    countryOrigin: string;      // Страна отпр.
    countryDestination: string; // Страна назн.
    servicePost: string;        // Усл. пост.
    places: number;             // Мест
    quantity: number;           // Количество
    contractNumber: string;     // № Договора
    productCode: string;        // Код товара
    productDetail: string;      // Детал. товара
    paymentAmount: number;      // Сумма плетеж.
    customsValue: number;       // Там. стоим.
    invoiceValue: number;       // Фактур. стоимость
    grossWeight: number;        // Брутто
    netWeight: number;          // Нетто
    ktd: string;                // КТД
    usdRate: number;            // Курс Долл.США
    graph2Inn: string;          // Грф. 2 ИНН
    graph8Inn: string;          // Грф. 8 ИНН
    exporterName?: string;
    exporterName2?: string;
    exporterAddress?: string;
    exporterPhone?: string;
    exporterInn?: string;
    importerName?: string;
    importerName2?: string;
    importerAddress?: string;
    importerPhone?: string;
    importerInn?: string;
    gTDRegistryNumber?: string;
    fillingLocation?: string;
    fillingDate?: string;
    gTDNumber?: string;
    contractNumberAndDate?: string;
    declarantPinfl?: string;
    exporterAdditionalInfo?: string;
    importerAdditionalInfo?: string;
    additionalSheet1?: string;
    additionalSheet2?: string;
    destinationCountryName?: string;
    destinationCountryCode?: string;
}

// src/shared/types/types.ts

/**
 * Represents a legal entity (юридическое лицо) in the system.
 */
export interface LegalEntity {
    /** UUID primary key */
    id: string;
    /** Taxpayer Identification Number */
    inn: string;
    /** OKPO code */
    okpo?: string;
    /** Region or district */
    region?: string;
    /** Name of the entity */
    name: string;
    /** Registered address */
    address: string;
    /** Director or head */
    director?: string;
    /** OKED code */
    oked?: string;
    /** VAT code */
    vat_code?: string;
    /** Contact phone */
    phone: string;
    /** Registry or registration number */
    registry_number?: string;
    /** Date of registration (ISO string or formatted) */
    registry_date?: string;
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

/**
 * Represents an individual (физическое лицо) in the system.
 */
export interface Individual {
    /** UUID primary key */
    id: string;
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
