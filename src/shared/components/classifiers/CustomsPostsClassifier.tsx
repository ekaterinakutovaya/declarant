// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { Table, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { supabase } from "../../api/supabaseClient.ts";
import { Link } from "react-router-dom";
import type {CustomsPost, Regime} from "../../types/types.ts";
import type { TableColumnsType } from 'antd';
import type { TableRowSelection } from 'antd/es/table/interface';

interface CustomsPostsClassifierProps {
  selectedKey: number | null;
  onSelect: (id: number, row: CustomsPost) => void;
  onDoubleSelect: (id: number, row: CustomsPost) => void;
}

export const CustomsPostsClassifier: React.FC<CustomsPostsClassifierProps> = ({
  selectedKey,
  onSelect,
  onDoubleSelect,
}) => {
  const [data, setData] = useState<
    {
      id: number;
      code: string;
      name: string;
      location: string;
      phone: string;
    }[]
  >([]);

    const [loading, setLoading] = useState<boolean>(false);


    const rowSelection: TableRowSelection<Regime> = {
        type: 'radio',
        selectedRowKeys: selectedKey != null ? [selectedKey] : [],
        onChange: (selectedRowKeys, selectedRows) => {
            onSelect(selectedRowKeys[0] as number, selectedRows[0]);
        },
    };

  // REQUESTS *********************************************
  async function loadCustomsPosts() {
      setLoading(true);
    const { data, error } = await supabase.from("customs_posts").select("*").order("id", { ascending: true });
      setLoading(false);
    if (error) {
      console.error("Error loading customs posts:", error);
    } else if (data) {
      console.log("data", data);
      setData(data);
    }
  }
  // ******************************************************

  useEffect(() => {
      loadCustomsPosts();
  }, []);

  const columns: TableColumnsType<CustomsPost> = [
    {
      key: "code",
      dataIndex: "code",
      title: "Код",
      className: "cursor-pointer",
    },
    {
      key: "name",
      dataIndex: "name",
      title: "Наименование",
      className: "cursor-pointer",
    },
    {
      key: "phone",
      dataIndex: "phone",
      title: "Телефон",
      className: "cursor-pointer",
    },
    {
      key: "location",
      dataIndex: "location",
      title: "Локация",
      className: "font-semibold",
      render: (text: string, record: CustomsPost) => {
        return (
          <Tooltip title="Смотреть" placement="bottom">
            <Link
              key={record.location}
              to={"#"}
              onClick={(e) => {
                // prevent row click when NPA link is clicked
                e.stopPropagation();
              }}
            >
              {text}
            </Link>
          </Tooltip>
        );
      },
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
