import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { supabase } from "../../api/supabaseClient.ts";
import type { Country } from "../../types/types.ts";
import type { TableColumnsType } from "antd";
import type { TableRowSelection } from "antd/es/table/interface";

interface CountriesClassifierProps {
  selectedKey: number | null;
  onSelect: (id: number, row: Country) => void;
  onDoubleSelect: (id: number, row: Country) => void;
}

export const CountriesClassifier: React.FC<CountriesClassifierProps> = ({
  selectedKey,
  onSelect,
  onDoubleSelect,
}) => {
  const [data, setData] = useState<Country[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  const rowSelection: TableRowSelection<Country> = {
    type: "radio",
    selectedRowKeys: selectedKey != null ? [selectedKey] : [],
    onChange: (selectedRowKeys, selectedRows) => {
      onSelect(selectedRowKeys[0] as number, selectedRows[0]);
    },
  };

  // REQUESTS *********************************************
  async function loadCountries() {
    setLoading(true);
    const { data, error } = await supabase
      .from("countries")
      .select("*")
      .order("id", { ascending: true });
    setLoading(false);
    if (error) {
      console.error("Error loading countries:", error);
    } else if (data) {
      console.log("data", data);
      setData(data);
    }
  }
  // ******************************************************

  useEffect(() => {
    loadCountries();
  }, []);

  const columns: TableColumnsType<Country> = [
    {
      key: "country",
      dataIndex: "country",
      title: "Страна",
      className: "cursor-pointer",
        width: "30%"
    },
    {
      key: "letter_code",
      dataIndex: "letter_code",
      title: "Буквенный код",
      className: "cursor-pointer",
    },
    {
      key: "digital_code",
      dataIndex: "digital_code",
      title: "Цифровой код",
      className: "cursor-pointer",
    },
    {
      key: "offshore",
      dataIndex: "offshore",
      title: "Оффшор",
      className: "cursor-pointer",
        render: (_, record: Country) => {
            console.log("record", record)

            if (record.offshore) {
                return (<div>Да</div>)
            }
            return null
        }
    },
  ];

  return (
    <div className="">
      <Table
        bordered
        size={"small"}
        className="custom-table"
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={false}
        loading={loading}
        rowSelection={rowSelection}
        onRow={(record) => ({
          onClick: () => onSelect(record.id, record),
          onDoubleClick: () => onDoubleSelect(record.id, record),
        })}
      />
    </div>
  );
};
