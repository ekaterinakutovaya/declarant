import {Button, Divider, Typography, Table, message, type TabsProps, Tabs} from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Declaration } from "../../shared/types/types.ts";
import { supabase } from "../../shared/api/supabaseClient.ts";
import dayjs from "dayjs";
import { EditIconButton } from "../../shared/components/ui/EditIconButton.tsx";
import { DeleteIconButton } from "../../shared/components/ui/DeleteIconButton.tsx";

const { Title } = Typography;

const tabItems: TabsProps['items'] = [
  { key: 'all',          label: 'Все' },
  { key: 'unexecuted',   label: 'Неоформленные' },
  { key: 'executed',     label: 'Оформленные' },
  { key: 'draft',        label: 'Черновики' },
  { key: 'template',     label: 'Шаблоны' },
  { key: 'nd40_regime',  label: 'НД40' },
];

const statusMap: Record<string, string | null> = {
  all:         null,
  unexecuted:  'unexecuted',
  executed:    'executed',
  draft:       'draft',
  template:    'template',
  nd40_regime: 'nd40_regime',
};

const Declarations = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<Declaration[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>('all');

  // *********************************************
  async function fetchDeclarations() {
    setLoading(true);
    const { data, error } = await supabase
      .from("declarations")
      .select(
        `
    *,
    customs_post:customs_posts(
      id, code, name, location, phone
    ),
    customs_regime:customs_regimes(
      id, type, code
    ),
    exporter:legal_entities!declarations_exporter_id_fkey(
      id, name, address, phone
    ),
    importer:legal_entities!declarations_importer_id_fkey(
      id, name, address, phone
    ),
    country_origin:countries!declarations_country_origin_id_fkey(
      id, country, letter_code, digital_code
    ),
    country_destination:countries!declarations_country_destination_id_fkey(
      id, country, letter_code, digital_code
    )
  `,
      )
      .order("created_at", { ascending: true });

    setLoading(false);
    if (error) {
      console.error(error);
    } else {
      setData(data!);
    }
  }

  // *********************************************

  useEffect(() => {
    fetchDeclarations();
  }, []);

  const dataSource = useMemo(() => {
    const filterStatus = statusMap[activeTab];
    const filtered = filterStatus
        ? data.filter((r) => r.workflow_status === filterStatus)
        : data;

    return filtered.map((r) => ({
      key:            r.id,
      declarationType:r.customs_regime_type,
      customsRegime:  r.customs_regime_code,
      formNumber:     r.form_number,
      gtdNumber:      r.gtd_number,
      customsPost:    r.customs_post?.code,
      gtdRegDate:     r.gtd_reg_date ? dayjs(r.gtd_reg_date).format("DD.MM.YYYY") : '',
      gtdRegNumber:   r.gtd_reg_number,
      date:           dayjs(r.created_at).format("DD.MM.YYYY"),
      exporter:       r.exporter_name,
      importer:       r.importer_name,
      countryOrigin:  r.country_origin?.country,
      countryDestination: r.country_destination?.country,
      serviceConditions: r.service_condition_id,
      places:         r.places,
      quantity:       r.quantity,
      contractNumber: r.contract_number,
      productCode:    r.product_code,
      productDetail:  r.product_detail,
      paymentAmount:  r.payment_amount,
      customsValue:   r.customs_value,
      invoiceValue:   r.invoice_value,
      grossWeight:    r.gross_weight,
      netWeight:      r.net_weight,
      ktd:            r.ktd,
      usdRate:        r.usd_rate,
      note:           r.note,
      workflowStatus: r.workflow_status,
    }));
  }, [data, activeTab]);

  // const dataSource = useMemo(
  //   () =>
  //     data.map((r: Declaration) => ({
  //       key: r.id,
  //       declarationType: r.customs_regime_type,
  //       customsRegime: r.customs_regime_code,
  //       formNumber: r.form_number,
  //       gtdNumber: r.gtd_number,
  //       customsPost: r.customs_post?.code, // or look up the name if you have it
  //       gtdRegDate: r.gtd_reg_date
  //         ? dayjs(r.gtd_reg_date).format("DD.MM.YYYY")
  //         : "",
  //       gtdRegNumber: r.gtd_reg_number,
  //       date: dayjs(r.created_at).format("DD.MM.YYYY"),
  //       exporter: r.exporter_name,
  //       importer: r.importer_name,
  //       countryOrigin: r?.country_origin?.country, // replace with name lookup if needed
  //       countryDestination: r?.country_destination?.country,
  //       serviceConditions: r.service_condition_id,
  //       places: r.places,
  //       quantity: r.quantity,
  //       contractNumber: r.contract_number,
  //       productCode: r.product_code,
  //       productDetail: r.product_detail,
  //       paymentAmount: r.payment_amount,
  //       customsValue: r.customs_value,
  //       invoiceValue: r.invoice_value,
  //       grossWeight: r.gross_weight,
  //       netWeight: r.net_weight,
  //       ktd: r.ktd,
  //       usdRate: r.usd_rate,
  //       note: r.note,
  //       workFlowStatus: r.workflow_status
  //     })),
  //   [data],
  // );

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("declarations").delete().eq("id", id);

    if (error) {
      console.error(error);
    } else {
      fetchDeclarations();
    }
  };

  const columns: ColumnsType<Declaration> = [
    {
      title: "Тип",
      dataIndex: "declarationType",
      key: "declarationType",
      width: 100,
      align: "center",
    },
    {
      title: "Режим",
      dataIndex: "customsRegime",
      key: "customsRegime",
      width: 100,
      align: "center",
    },
    {
      title: "№ бланка",
      dataIndex: "formNumber",
      key: "formNumber",
      width: 120,
      align: "center",
    },
    {
      title: "№ ГТД",
      dataIndex: "gtdNumber",
      key: "gtdNumber",
      width: 120,
      align: "center",
    },
    {
      title: "Пост",
      dataIndex: "customsPost",
      key: "customsPost",
      width: 80,
      align: "center",
    },
    {
      title: "Дата рег.ГТД",
      dataIndex: "gtdRegDate",
      key: "gtdRegDate",
      width: 130,
      align: "center",
    },
    {
      title: "Рег. № ГТД",
      dataIndex: "gtdRegNumber",
      key: "gtdRegNumber",
      width: 130,
      align: "center",
    },
    {
      title: "Дата",
      dataIndex: "date",
      key: "date",
      width: 110,
      align: "center",
    },
    {
      title: "Экспортер",
      dataIndex: "exporter",
      key: "exporter",
      width: 250,
      align: "center",
    },
    {
      title: "Импортер",
      dataIndex: "importer",
      key: "importer",
      width: 250,
      align: "center",
    },
    {
      title: "Страна отпр.",
      dataIndex: "countryOrigin",
      key: "countryOrigin",
      width: 130,
      align: "center",
    },
    {
      title: "Страна назн.",
      dataIndex: "countryDestination",
      key: "countryDestination",
      width: 130,
      align: "center",
    },
    {
      title: "Усл. пост.",
      dataIndex: "serviceConditions",
      key: "serviceConditions",
      width: 100,
      align: "center",
    },
    {
      title: "Мест",
      dataIndex: "places",
      key: "places",
      width: 80,
      align: "center",
    },
    {
      title: "Количество",
      dataIndex: "quantity",
      key: "quantity",
      width: 100,
      align: "center",
    },
    {
      title: "№ Договора",
      dataIndex: "contractNumber",
      key: "contractNumber",
      width: 150,
      align: "center",
    },
    {
      title: "Код товара",
      dataIndex: "productCode",
      key: "productCode",
      width: 120,
      align: "center",
    },
    {
      title: "Детал. товара",
      dataIndex: "productDetail",
      key: "productDetail",
      ellipsis: true,
    },
    {
      title: "Сумма плетеж.",
      dataIndex: "paymentAmount",
      key: "paymentAmount",
      width: 120,
      align: "center",
    },
    {
      title: "Там. стоим.",
      dataIndex: "customsValue",
      key: "customsValue",
      width: 120,
      align: "center",
    },
    {
      title: "Фактур. стоимость",
      dataIndex: "invoiceValue",
      key: "invoiceValue",
      width: 140,
      align: "center",
    },
    {
      title: "Брутто",
      dataIndex: "grossWeight",
      key: "grossWeight",
      width: 100,
      align: "center",
    },
    {
      title: "Нетто",
      dataIndex: "netWeight",
      key: "netWeight",
      width: 100,
      align: "center",
    },
    { title: "КТД", dataIndex: "ktd", key: "ktd", width: 100, align: "center" },
    {
      title: "Курс Долл. США",
      dataIndex: "usdRate",
      key: "usdRate",
      width: 120,
      align: "center",
    },
    {
      title: "Примечание",
      dataIndex: "note",
      key: "note",
      width: 150,
      align: "center",
    },
    {
      title: "Действие",
      dataIndex: "operation",
      key: "operation",
      width: "3%",
      align: "center",
      fixed: "right",
      render: (_, record) => {
        return (
          <div className="flex justify-center gap-x-2">
            <EditIconButton onClick={() => navigate(`/declarations/${record.key}/edit`)} />
            <DeleteIconButton
              onConfirm={() => handleDelete(record.key)}
              popconfirmProps={{
                getPopupContainer: (triggerNode) => triggerNode.parentElement!,
              }}
            />
          </div>
        );
      },
    },
  ];

  const onCreate = () => {
    navigate("/declarations/new");
  };

  return (
    <div>
      <Title level={3}>Список деклараций</Title>
      <Divider
        style={{
          borderColor: "#4DB6AC",
          marginTop: "0",
        }}
      />

      <div className="custom-tabs"><Tabs
          type="card"
          activeKey={activeTab}
          onChange={setActiveTab}
          items={tabItems}
      /></div>

      <div className="w-full text-end mb-4 mt-2">
        <Button type="primary" onClick={onCreate}>
          + Создать
        </Button>
      </div>

      {/*  Declarations Table  */}
      <Table<Declaration>
        size="small"
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: "max-content" }}
        bordered
        className="custom-table w-full"
      />
    </div>
  );
};

export default Declarations;
