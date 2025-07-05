export interface Regime {
    id: number;
    code: string;
    name: string;
    type: string;
    regulatory_legal_acts: string;
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
}