// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { DatePicker, Form, Input, Modal, Select } from "antd";
import type { LegalEntity, Region } from "../../../shared/types/types.ts";
import dayjs, { type Dayjs } from "dayjs";
import { DigitsInputField } from "../../../shared/components/ui/DigitsInputField.tsx";
import React, { useEffect, useState } from "react";
import { supabase } from "../../../shared/api/supabaseClient.ts";

export interface LegalEntityFormValues
  extends Omit<LegalEntity, "id" | "region" | "registry_date"> {
  region_id: number;
  registry_date: string | Dayjs | null;
  registry_number: string;
  additional_info?: string;
  payment_bank_id?: number;
  currency_bank_id?: number;
}

interface RegionOption {
  label: React.ReactNode;
  value: number;
}

export const LegalEntityForm = ({
  open,
  initialEntity,
  onCancel,
  onSaved,
  title,
}: {
  open: boolean;
  initialEntity: LegalEntity | null;
  onCancel: () => void;
  onSaved: () => void;
  title: string;
}) => {
  const [form] = Form.useForm<LegalEntityFormValues>();
  const [regionsOptions, setRegionsOptions] = useState<RegionOption[]>([]);
  const [loadingRegions, setLoadingRegions] = useState(true);
  // ********************
  const fetchRegions = async () => {
    setLoadingRegions(true);
    supabase
      .from("regions")
      .select("id, code, name")
      .then(({ data, error }) => {
        if (error) {
          console.error("Failed to load regions:", error);
          setLoadingRegions(false);
          return;
        }
        if (data) {
          setRegionsOptions(
            data.map((r) => ({
              label: (
                <div>
                  {r.code} - {r.name}
                </div>
              ),
              value: r.id,
            })),
          );
          setLoadingRegions(false);
        }
      });
  };
  // ********************

  useEffect(() => {
    fetchRegions();
  }, []);


  useEffect(() => {
    if (initialEntity && !loadingRegions) {
      const regionId = (initialEntity.region as Region)?.id;

      form.setFieldsValue({
        inn: initialEntity.inn,
        okpo: initialEntity.okpo,
        region_id: regionId,
        name: initialEntity.name,
        address: initialEntity.address,
        director: initialEntity.director,
        oked: initialEntity.oked,
        vat_code: initialEntity.vat_code,
        phone: initialEntity.phone,
        registry_number: initialEntity.registry_number,
        registry_date: initialEntity.registry_date
          ? dayjs(initialEntity.registry_date, "YYYY-MM-DD")
          : null,
        additional_info: initialEntity.additional_info,
        currency_account: initialEntity.currency_account,
        currency_bank_mfo: initialEntity.currency_bank_mfo,
        payment_account: initialEntity.payment_account,
        payment_bank_mfo: initialEntity.payment_bank_mfo,
      });
    } else {
      form.resetFields();
    }
  }, [initialEntity, loadingRegions, form]);

  const onSave = () => {
    form
      .validateFields()
      .then(() => {
        form.submit();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onFinish = async (values: LegalEntityFormValues) => {
    try {

      const formattedDate =
        dayjs(values.registry_date as Dayjs).format("YYYY-MM-DD");

      const payload = {
        ...values,
        registry_date: formattedDate,
      };

      if (initialEntity) {
        // EDIT mode
        const { error } = await supabase
          .from("legal_entities")
          .update(payload)
          .eq("id", initialEntity.id);

        if (error) throw error;
      } else {
        // NEW mode
        const { error } = await supabase
          .from("legal_entities")
          .insert([payload]);

        if (error) throw error;
      }

      onSaved();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Modal
        open={open}
        title={title}
        width={750}
        onCancel={onCancel}
        onOk={onSave}
        okText="Сохранить"
        cancelText="Отмена"
        style={{ top: 20 }}
      >
        <Form
          layout="horizontal"
          form={form}
          onFinish={onFinish}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <DigitsInputField
            name="inn"
            label="ИНН"
            minLength={9}
            maxLength={9}
            inputClassName="!w-[200px]"
            required
          />

          <DigitsInputField
            name="okpo"
            label="ОКПО"
            minLength={8}
            maxLength={8}
            inputClassName="!w-[200px]"
          />

          <Form.Item name="region_id" label="Район">
            <Select
              options={regionsOptions}
              className="max-w-[300px]"
              loading={loadingRegions}
            />
          </Form.Item>

          <Form.Item
            name="name"
            label="Наименование"
            rules={[{ required: true, message: "Обязательное поле" }]}
          >
            <Input.TextArea autoSize={{ minRows: 2 }} />
          </Form.Item>

          <Form.Item
            name="address"
            label="Адрес"
            rules={[{ required: true, message: "Обязательное поле" }]}
          >
            <Input.TextArea autoSize={{ minRows: 2 }} />
          </Form.Item>

          <Form.Item name="additional_info" label="Дополнительная информация">
            <Input.TextArea autoSize={{ minRows: 2 }} />
          </Form.Item>

          <Form.Item name="director" label="Руководитель">
            <Input />
          </Form.Item>

          <DigitsInputField
            name="oked"
            label="ОКЭД"
            minLength={5}
            maxLength={5}
            inputClassName="!w-[200px]"
          />

          <DigitsInputField
            name="vat_code"
            label="Код НДС"
            minLength={12}
            maxLength={12}
            inputClassName="!w-[200px]"
          />

          <DigitsInputField
            name="phone"
            label="Телефон"
            maxLength={30}
            inputClassName="!w-[200px]"
            required
          />

          <Form.Item name="registry_number" label="№ регистрации">
            <Input className="max-w-[170px]" />
          </Form.Item>
          <Form.Item name="registry_date" label="Дата регистрации">
            <DatePicker
              className="w-[170px]"
              format={{
                format: "DD.MM.YYYY",
                type: "mask",
              }}
            />
          </Form.Item>

          <Form.Item label="Р/с" style={{ marginBottom: 0 }}>
            <DigitsInputField
              name="payment_account"
              maxLength={25}
              style={{ display: "inline-block", width: "calc(50% - 8px)" }}
            />
            <DigitsInputField
              name="payment_bank_mfo"
              label="МФО банка"
              maxLength={5}
              inputClassName="!w-[80px]"
              style={{
                display: "inline-block",
                width: "calc(50% - 8px)",
                margin: "0 8px",
              }}
            />
          </Form.Item>
          <Form.Item label="В/с" style={{ marginBottom: 0 }}>
            <DigitsInputField
              name="currency_account"
              maxLength={25}
              style={{ display: "inline-block", width: "calc(50% - 8px)" }}
            />
            <DigitsInputField
              name="currency_bank_mfo"
              label="МФО банка"
              maxLength={5}
              inputClassName="!w-[80px]"
              style={{
                display: "inline-block",
                width: "calc(50% - 8px)",
                margin: "0 8px",
              }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
