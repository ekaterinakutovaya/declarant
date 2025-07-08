// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { Button, Divider, message, Table, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { supabase } from "../../shared/api/supabaseClient";
import { LegalEntityForm } from "./ui/LegalEntityForm.tsx";
import {EditIconButton} from "../../shared/components/ui/EditIconButton.tsx";
import type {LegalEntity} from "../../shared/types/types.ts";


const { Title } = Typography;

const LegalEntitiesPage = () => {
  const [data, setData] = useState<LegalEntity[]>([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [current, setCurrent] = useState<LegalEntity | null>(null);

  // ****************************
  const fetchEntities = async () => {
    setLoading(true);
    const { data: rows, error } = await supabase.from(
      "legal_entities",
    )
        .select(`
    id,
    inn,
    okpo,
    region:regions(id, code, name),
    name,
    address,
    director,
    oked,
    vat_code,
    phone,
    additional_info,
    registry_number,
    registry_date,
    payment_account,
    payment_bank_mfo,
    currency_account,
    currency_bank_mfo
  `)
    .order("inn", { ascending: true });

    setLoading(false);
    if (error) {
      message.error("Не удалось загрузить справочник");
      console.error(error);
    } else if (rows) {

      setData(
          rows.map(r => {
            console.log("r", r);
            return {
              id:               r.id,
              inn:              r.inn,
              okpo:             r.okpo,
              region:           r.region,
              name:             r.name,
              address:          r.address,
              director:         r.director,
              oked:             r.oked,
              vat_code:         r.vat_code,
              phone:            r.phone,
              additional_info:  r.additional_info,
              registry_number:  r.registry_number,
              registry_date:    r.registry_date,
              payment_account:  r.payment_account,
              payment_bank_mfo: r.payment_bank_mfo,
              currency_account: r.currency_account,
              currency_bank_mfo:r.currency_bank_mfo,
            };
          })
      );
    }
  };
  // ****************************

  useEffect(() => {
    fetchEntities();
  }, []);

  const columns: ColumnsType<LegalEntity> = [
    {
      title: "ИНН",
      dataIndex: "inn",
      key: "inn",
      align: "center",
    },
    {
      title: "ОКПО",
      dataIndex: "okpo",
      key: "okpo",
      align: "center",
    },
    {
      title: "Район",
      dataIndex: "region",
      key: "region",
      align: "center",
      render: (record: LegalEntity) => (
          <div>{record.name}</div>
      )
    },
    {
      title: "Наименование",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
      align: "center",
      width: "20%",
    },
    {
      title: "Адрес",
      dataIndex: "address",
      key: "address",
      ellipsis: true,
      align: "center",
      width: "20%",
    },
    {
      title: "Руководитель",
      dataIndex: "director",
      key: "director",
      align: "center",
    },
    {
      title: "ОКЭД",
      dataIndex: "oked",
      key: "oked",
      align: "center",
    },
    {
      title: "Код НДС",
      dataIndex: "vat_code",
      key: "vatCode",
      align: "center",
    },
    {
      title: "Телефон",
      dataIndex: "phone",
      key: "phone",
      align: "center",
    },
    {
      title: "Действие",
      dataIndex: "operation",
      key: "operation",
      width: "3%",
      align: "center",
      fixed: "right",
      render: (_, record: LegalEntity) => {
        console.log(record);
        return (
            <div className="flex justify-center gap-x-2">
              <EditIconButton onClick={() => onEdit(record)} />
            </div>
        );
      },
    },
  ];

  const onCreate = () => {
    setCurrent(null);
    setModalOpen(true);
  };

  const onEdit = (row: LegalEntity) => {
    setCurrent(row);
    setModalOpen(true);
  }

  return (
    <>
      <div>
        <Title level={3}>Юридические лица</Title>
        <Divider
          style={{
            borderColor: "#4DB6AC",
            marginTop: "0",
          }}
        />

        <div className="w-full text-end my-4">
          <Button type="primary" onClick={onCreate}>
            + Создать
          </Button>
        </div>
        <Table<LegalEntity>
          size="small"
          columns={columns}
          dataSource={data}
          rowKey="key"
          pagination={{ pageSize: 10 }}
          scroll={{ x: "max-content" }}
          bordered
          className="custom-table w-full"
          loading={loading}
        />
      </div>

      {modalOpen && (
        <LegalEntityForm
          open={modalOpen}
          title="Юридическое лицо"
          initialEntity={current}
          onCancel={() => setModalOpen(false)}
          onSaved={() => {
            setModalOpen(false);
            fetchEntities();
          }}
        />
      )}
    </>
  );
};

export default LegalEntitiesPage;
