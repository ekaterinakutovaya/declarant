import {Button, Divider, Table, Typography} from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";

interface LegalEntity {
  key: string; // could be the ИНН or a UUID
  inn: string;
  okpo: string;
  region: string;
  name: string;
  address: string;
  director: string;
  oked: string;
  vatCode: string;
  phone: string;
}

const {Title} = Typography

const LegalEntitiesPage = () => {
  const [data, setData] = useState<LegalEntity[]>([
      {
          key: "1",
          inn: "987654321",
          okpo: "87654321",
          region: "Зангиотинский район",
          name: '"GREENTECH INNOVATIONS" MChJ',
          address:
              "Jizzax viloyati, Jizzax shahri, Zargarlik ko'chasi, 4-uy, 3-xonadon",
          director: "Testov Test Testovich",
          oked: "70220",
          vatCode: "303150099344",
          phone: "123456789",
      },
      {
          key: "2",
          inn: "123456789",
          okpo: "12345678",
          region: "Ташкентский район",
          name: '"SYNERGY SOLUTIONS" MChJ',
          address:
              "Andijon viloyat, Andijon tuman, Qumko'cha MFY, Qumko'cha 91 uy",
          director: "John Doe",
          oked: "70221",
          vatCode: "303150099345",
          phone: "99999999999",
      },
  ]);

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
      dataIndex: "vatCode",
      key: "vatCode",
      align: "center",
    },
    {
      title: "Телефон",
      dataIndex: "phone",
      key: "phone",
      align: "center",
    },
  ];

  const onAdd = () => {};

  return (
    <div>
        <Title level={3}>Юридические лица</Title>
        <Divider
            style={{
                borderColor: "#4DB6AC",
                marginTop: "0",
            }}
        />

      <div className="w-full text-end my-4">
        <Button type="primary" onClick={onAdd}>
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
      />
    </div>
  );
};

export default LegalEntitiesPage;
