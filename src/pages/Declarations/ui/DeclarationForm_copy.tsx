import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Divider,
  Typography,
  Select,
  Tooltip,
  Modal, Dropdown, Card,
} from "antd";
import type { Mode } from "../DeclarationPage.tsx";
import {
  SUBMISSION_TYPE_LABELS,
  SUBMISSION_TYPES,
} from "../../../shared/enums/enums.ts";
import {BookOpenText, CircleQuestionMark} from "lucide-react";
import { RegimesClassifier } from "../../../shared/components/classifiers/RegimesClassifier.tsx";
import type {CustomsPost, Declaration, Individual, LegalEntity, Regime} from "../../../shared/types/types.ts";
import {DashedDivider} from "../../../shared/components/ui/DashedDivider.tsx";
import {ParticipantsRef} from "../../../shared/components/references/ParticipantsRef.tsx";
import {CustomsPostsClassifier} from "../../../shared/components/classifiers/CustomsPostsClassifier.tsx";

export interface DeclarationFormProps {
  mode: Mode;
}

const { Title } = Typography;

const DeclarationForm: React.FC<DeclarationFormProps> = ({ mode }) => {
  const readOnly = mode === "view";
  const [form] = Form.useForm<Declaration>();

  const [selectedRegimeId, setSelectedRegimeId] = useState<number | null>(null);
  const [selectedCustomsPostId, setSelectedCustomsPostId] = useState<number | null>(null);
  const [selectedCustomsPostRow, setSelectedCustomsPostRow] = useState<CustomsPost | null>(null);
    const [selectedExporterId, setSelectedExporterId] = useState<number | null>(null);
    const [selectedExporterRow, setSelectedExporterRow] = useState<LegalEntity | Individual | null>(null);

    const [selectedImporterId, setSelectedImporterId] = useState<number | null>(null);
    const [selectedImporterRow, setSelectedImporterRow] = useState<LegalEntity | Individual | null>(null);

  const [regimesClassifierOpen, setRegimesClassifierOpen] = useState(false);
  const [customsPostsClassifierOpen, setCustomsPostsClassifierOpen] = useState(false);
  const [exporterRefOpen, setExporterRefOpen] = useState(false);
  const [importerRefOpen, setImporterRefOpen] = useState(false);

  // REQUESTS *********************************************

  // ******************************************************

  const submissionOptions = SUBMISSION_TYPES.map((value) => ({
    label: SUBMISSION_TYPE_LABELS[value],
    value,
  }));

  const onFinish = () => {
    /* ...save logic... */
  };

  const handleSelectAndClose = () => {
    if (selectedRegimeId != null) {
      form.setFieldsValue({ declarationType: selectedRegimeId });
      setRegimesClassifierOpen(false);
    }
  };

  const handleCustomsPostSelectAndClose = () => {
    if (selectedCustomsPostRow) {
      form.setFieldsValue({ gTDRegistryNumber: selectedCustomsPostRow.code });
      setCustomsPostsClassifierOpen(false);
    }
  };

    const handleExporterOk = () => {
          if (selectedExporterRow) {
                form.setFieldsValue({
                       exporterName:    selectedExporterRow.name,
                      exporterAddress: selectedExporterRow.address,
                      exporterPhone:   selectedExporterRow.phone,
                     });
               }
          setExporterRefOpen(false);
        };

    const handleImporterOk = () => {
          if (selectedExporterRow) {
                form.setFieldsValue({
                       importerName:    selectedImporterRow?.name,
                      importerAddress: selectedImporterRow?.address,
                      importerPhone:   selectedImporterRow?.phone,
                     });
               }
          setImporterRefOpen(false);
        };

  return (
    <div className="w-full flex justify-center">
      <Card className="max-w-[1100px] my-0 mx-auto">
        <Form<Declaration>
          form={form}
          layout="vertical"
          initialValues={{
            formNumber: "ED",
            submissionType: "new",
            additionalSheet1: 1,
            additionalSheet2: 1,
          }}
          onFinish={onFinish}
          disabled={readOnly}
          requiredMark={false}
          className=""
        >
          <div className="flex items-center justify-between">
            <div className="flex item-center gap-2">
              <Title level={4} className="!mb-0">
                Грузовая таможенная декларация №
              </Title>
              <Form.Item name="formNumber" className="!mb-0">
                <Input maxLength={10} />
              </Form.Item>
            </div>
            <div className="flex item-center gap-2">
              <div className="flex item-center gap-2">
                <div className="mt-1 font-semibold">Тип подачи</div>
                <Form.Item name="submissionType" style={{ marginBottom: 0 }}>
                  <Select
                    className="min-w-[230px]"
                    options={submissionOptions}
                    placeholder="Выберите..."
                  />
                </Form.Item>
              </div>
            </div>
          </div>
          <Divider
            style={{
              borderColor: "#4DB6AC",
              marginTop: "20px",
            }}
          />

          <div className="w-full">
            <div className="flex items-center gap-8">
              {/* 1 */}
              <div className="max-w-[300px] min-h-[74px] flex flex-col justify-between">
                <div className="flex items-center gap-1 mb-2">
                  <div className="font-semibold mb-1">1. Тип декларации</div>
                  <div className="">
                    <Tooltip title="Справочник" placement="bottom">
                      <Button
                        onClick={() => setRegimesClassifierOpen(true)}
                        type="text"
                        className="!text-primary flex items-center justify-center"
                        icon={
                          <BookOpenText className="w-4 h-4 align-middle mt-1" />
                        }
                      ></Button>
                    </Tooltip>
                  </div>
                  <div className="">
                    <Dropdown
                      trigger={["click"]}
                      dropdownRender={() => (
                        <div className="p-4 max-w-sm bg-white text-black rounded shadow-lg">
                          <p className="mb-2 font-semibold">
                            Графа 1. «Тип декларации».
                          </p>
                          <p className="text-[13px] indent-10 text-justify !mb-1">
                            В первом подразделе графы указывается направление
                            перемещения товаров — «ЭК».
                          </p>
                          <p className="text-[13px] indent-10 text-justify !mb-1">
                            Во втором подразделе графы указывается двузначный
                            код таможенного режима согласно Классификатору
                            таможенных режимов, приведённому в приложении № 3 к
                            настоящей Инструкции.
                          </p>
                          <p className="text-[13px] indent-10 text-justify !mb-1">
                            Третий подраздел графы не заполняется.
                          </p>
                        </div>
                      )}
                    >
                      <Button
                        type="text"
                        className="!text-primary"
                        icon={
                          <CircleQuestionMark className="w-4 h-4 align-middle mt-1" />
                        }
                      />
                    </Dropdown>
                  </div>
                </div>
                <div className="">
                  <div className="w-full flex !mb-0">
                    <Form.Item style={{ marginBottom: 0 }} className="">
                      <Form.Item
                        name="customsRegimeType"
                        rules={[{ required: true }]}
                        style={{
                          display: "inline-block",
                          width: 70,
                          marginBottom: 0,
                        }}
                      >
                        <Input placeholder="Тип" readOnly />
                      </Form.Item>
                      <Form.Item
                        name="customsRegimeCode"
                        rules={[{ required: true }]}
                        style={{
                          display: "inline-block",
                          width: 70,
                          margin: "0 8px",
                          marginBottom: 0,
                        }}
                      >
                        <Input placeholder="Код" readOnly />
                      </Form.Item>
                      <Form.Item
                        rules={[{ required: true }]}
                        style={{
                          display: "inline-block",
                          width: 70,
                          marginBottom: 0,
                        }}
                      >
                        <Input placeholder="" readOnly />
                      </Form.Item>
                    </Form.Item>
                  </div>
                </div>
              </div>
              {/* 3 */}
              <div className="max-w-[300px] min-h-[74px] flex flex-col justify-between">
                <div className="flex items-center gap-1 mb-2">
                  <div className="font-semibold mb-1">3. Добавочные листы</div>
                  <div className="">
                    <Dropdown
                      trigger={["click"]}
                      dropdownRender={() => (
                        <div className="p-4 max-w-sm bg-white text-black rounded shadow-lg">
                          <p className="mb-2 font-semibold">
                            Графа 3. «Добавочные листы»
                          </p>
                          <p className="text-[13px] indent-10 text-justify !mb-1">
                            В первом подразделе графы указывается порядковый
                            номер листа, во втором — общее количество
                            представляемых листов ГТД, включая основной и все
                            добавочные.
                          </p>
                          <p className="text-[13px] indent-10 text-justify !mb-1">
                            Например, если имеется одна ГТД с двумя добавочными
                            листами, в самой декларации следует указать — «1/3»,
                            в первом добавочном листе — «2/3», во втором —
                            «3/3». Если ГТД не имеет добавочных листов,
                            указывается «1/1».
                          </p>
                          <p className="text-[13px] indent-10 text-justify !mb-1">
                            При декларировании товаров в электронной форме в
                            графе, в порядке установленной в настоящем
                            подпункте, указывается порядковый номер листа и
                            общее количество листов ГТД, как если бы электронная
                            ГТД распечатывалась на бумажный носитель;
                          </p>
                        </div>
                      )}
                    >
                      <Button
                        type="text"
                        className="!text-primary"
                        icon={
                          <CircleQuestionMark className="w-4 h-4 align-middle mt-1" />
                        }
                      />
                    </Dropdown>
                  </div>
                </div>
                <div className="">
                  <div className="w-full flex !mb-0">
                    <Form.Item style={{ marginBottom: 0 }} className="">
                      <Form.Item
                        name="additionalSheet1"
                        rules={[{ required: true }]}
                        style={{
                          display: "inline-block",
                          width: 80,
                          marginBottom: 0,
                        }}
                      >
                        <Input placeholder="" className="text-center" />
                      </Form.Item>
                      <Form.Item
                        name="additionalSheet2"
                        rules={[{ required: true }]}
                        style={{
                          display: "inline-block",
                          width: 80,
                          margin: "0 8px",
                          marginBottom: 0,
                        }}
                      >
                        <Input placeholder="" className="text-center" />
                      </Form.Item>
                    </Form.Item>
                  </div>
                </div>
              </div>
              {/* 4 */}
              <div className="max-w-[300px] min-h-[74px] flex flex-col justify-between">
                <div className="flex items-center gap-1 mb-2">
                  <div className="font-semibold mb-1">4. Отгр. спец</div>
                  <div className="">
                    <Dropdown
                      trigger={["click"]}
                      dropdownRender={() => (
                        <div className="p-4 max-w-sm bg-white text-black rounded shadow-lg">
                          <p className="mb-2 font-semibold text-red-400">
                            В этом режиме данная графа не заполняется!
                          </p>
                        </div>
                      )}
                    >
                      <Button
                        type="text"
                        className="!text-primary"
                        icon={
                          <CircleQuestionMark className="w-4 h-4 align-middle mt-1" />
                        }
                      />
                    </Dropdown>
                  </div>
                </div>
                <div className="">
                  <div className="w-full flex !mb-0">
                    <Form.Item style={{ marginBottom: 0 }} className="">
                      <Form.Item
                        name=""
                        rules={[{ required: true }]}
                        style={{
                          display: "inline-block",
                          width: 168,
                          marginBottom: 0,
                        }}
                      >
                        <Input
                          placeholder=""
                          className="text-center"
                          disabled
                        />
                      </Form.Item>
                    </Form.Item>
                  </div>
                </div>
              </div>
              {/* 5 */}
              <div className="max-w-[300px] min-h-[74px] flex flex-col justify-between">
                <div className="flex items-center gap-1 mb-2">
                  <div className="font-semibold mb-1">
                    5. Всего наименований товаров
                  </div>
                  <div className="">
                    <Dropdown
                      trigger={["click"]}
                      dropdownRender={() => (
                        <div className="p-4 max-w-sm bg-white text-black rounded shadow-lg">
                          <p className="mb-2 font-semibold">
                            Графа 5. «Всего наименований товаров».
                          </p>
                          <p className="text-[13px] indent-10 text-justify !mb-1">
                            В графе проставляется общее число наименований
                            товаров, указанных в графах 31 ГТД. Это число должно
                            соответствовать количеству заполненных граф 31 ГТД;
                          </p>
                        </div>
                      )}
                    >
                      <Button
                        type="text"
                        className="!text-primary"
                        icon={
                          <CircleQuestionMark className="w-4 h-4 align-middle mt-1" />
                        }
                      />
                    </Dropdown>
                  </div>
                </div>
                <div className="">
                  <div className="w-full flex !mb-0">
                    <Form.Item style={{ marginBottom: 0 }} className="">
                      <Form.Item
                        name=""
                        rules={[{ required: true }]}
                        style={{
                          display: "inline-block",
                          width: 168,
                          marginBottom: 0,
                        }}
                      >
                        <Input placeholder="" className="" readOnly />
                      </Form.Item>
                    </Form.Item>
                  </div>
                </div>
              </div>
            </div>
            <DashedDivider />
            <div className="flex items-center gap-8">
              {/* 6 */}
              <div className="max-w-[300px] min-h-[74px] flex flex-col justify-between ">
                <div className="flex items-center gap-1 mb-2">
                  <div className="font-semibold mb-1">6. Кол-во мест</div>
                  <div className="">
                    <Dropdown
                      trigger={["click"]}
                      dropdownRender={() => (
                        <div className="p-4 max-w-sm bg-white text-black rounded shadow-lg">
                          <p className="mb-2 font-semibold text-red-400">
                            В этом режиме данная графа не заполняется!
                          </p>
                        </div>
                      )}
                    >
                      <Button
                        type="text"
                        className="!text-primary"
                        icon={
                          <CircleQuestionMark className="w-4 h-4 align-middle mt-1" />
                        }
                      />
                    </Dropdown>
                  </div>
                </div>
                <div className="">
                  <div className="w-full flex !mb-0">
                    <Form.Item style={{ marginBottom: 0 }} className="">
                      <Form.Item
                        name=""
                        rules={[{ required: true }]}
                        style={{
                          display: "inline-block",
                          width: 168,
                          marginBottom: 0,
                        }}
                      >
                        <Input
                          placeholder=""
                          className="text-center"
                          disabled
                        />
                      </Form.Item>
                    </Form.Item>
                  </div>
                </div>
              </div>
              {/* 7 */}
              <div className="max-w-[300px] min-h-[74px] flex flex-col justify-between">
                <div className="flex items-center gap-1 mb-2">
                  <div className="font-semibold mb-1">
                    7. Регистрационный номер ГТД
                  </div>
                  <div className="">
                    <Tooltip title="Справочник" placement="bottom">
                      <Button
                        onClick={() => setCustomsPostsClassifierOpen(true)}
                        type="text"
                        className="!text-primary flex items-center justify-center"
                        icon={
                          <BookOpenText className="w-4 h-4 align-middle mt-1" />
                        }
                      ></Button>
                    </Tooltip>
                  </div>
                  <div className="">
                    <Dropdown
                      trigger={["click"]}
                      dropdownRender={() => (
                        <div className="p-4 max-w-sm bg-white text-black rounded shadow-lg">
                          <p className="mb-2 font-semibold">
                            Графа 7. «Регистрационный номер ГТД».
                          </p>
                          <p className="text-[13px] indent-10 text-justify !mb-1">
                            В графе указывается пятизначный цифровой код
                            таможенного поста, на который будет подана ГТД,
                            согласно Классификатору таможенных постов,
                            приведенному в приложении № 4 к настоящей
                            Инструкции;
                          </p>
                        </div>
                      )}
                    >
                      <Button
                        type="text"
                        className="!text-primary"
                        icon={
                          <CircleQuestionMark className="w-4 h-4 align-middle mt-1" />
                        }
                      />
                    </Dropdown>
                  </div>
                </div>
                <div className="">
                  <div className="w-full flex !mb-0">
                    <Form.Item
                      name="gTDRegistryNumber"
                      rules={[{ required: true }]}
                      style={{
                        display: "inline-block",
                        width: 168,
                        marginBottom: 0,
                      }}
                    >
                      <Input placeholder="Код" className="" readOnly />
                    </Form.Item>
                  </div>
                </div>
              </div>
            </div>
            <DashedDivider />
            <div className="flex items-center gap-10 justify-between">
              <div className="w-1/2 max-w-[600px]">
                <div className="flex items-center gap-1 mb-2">
                  <div className="font-semibold mb-1">
                    2. Экспортер/грузоотправитель
                  </div>
                  <div className="">
                    <Tooltip title="Справочник" placement="bottom">
                      <Button
                        onClick={() => setExporterRefOpen(true)}
                        type="text"
                        className="!text-primary flex items-center justify-center"
                        icon={
                          <BookOpenText className="w-4 h-4 align-middle mt-1" />
                        }
                      ></Button>
                    </Tooltip>
                  </div>
                  <div className="">
                    <Dropdown
                      trigger={["click"]}
                      dropdownRender={() => (
                        <div className="p-4 max-w-sm bg-white text-black rounded shadow-lg">
                          <p className="mb-2 font-semibold">
                            Графа 2. «Экспортер/грузоотправитель».
                          </p>
                          <p className="text-[13px] indent-10 text-justify !mb-1">
                            В графе указываются сведения об отправителе и
                            экспортере товаров.
                          </p>
                          <p className="text-[13px] indent-10 text-justify !mb-1">
                            Если экспортер и отправитель товаров одно и то же
                            лицо:
                          </p>
                          <p className="text-[13px] indent-10 text-justify !mb-1">
                            для физического лица — указываются его фамилия, имя,
                            отчество и адрес его постоянного места жительства, а
                            также номер телефона.
                          </p>
                          <p className="text-[13px] indent-10 text-justify !mb-1">
                            для юридического лица — указываются его краткое
                            наименование и местонахождение (юридический адрес),
                            номер телефона, а также адрес электронной почты (при
                            наличии).
                          </p>
                          <p className="text-[13px] indent-10 text-justify !mb-1">
                            Если от имени экспортера и грузоотправителя
                            выступает структурное подразделение юридического
                            лица, указываются краткое наименование,
                            местонахождение (юридический адрес), номер телефона
                            и адрес электронной почты (при наличии) структурного
                            подразделения, а также вышеназванные сведения о
                            юридическом лице.
                          </p>
                        </div>
                      )}
                    >
                      <Button
                        type="text"
                        className="!text-primary"
                        icon={
                          <CircleQuestionMark className="w-4 h-4 align-middle mt-1" />
                        }
                      />
                    </Dropdown>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="">
                    <div className="w-full">
                      <Form.Item
                        name="exporterName"
                        rules={[{ required: true }]}
                        className="!mb-0 w-full"
                        label="Наименование грузоотправителя"
                      >
                        <Input className="w-full" />
                      </Form.Item>
                    </div>
                  </div>

                  <div className="w-full">
                    <Form.Item
                      name="exporterAddress"
                      rules={[{ required: true }]}
                      className="!mb-0 w-full"
                      label="Адрес грузоотправителя"
                    >
                      <Input className="w-full" />
                    </Form.Item>
                  </div>

                  <div className="w-full">
                    <Form.Item
                      name="exporterPhone"
                      rules={[{ required: true }]}
                      className="!mb-0 w-[200px]"
                      label="Телефон"
                    >
                      <Input className="w-[200px]" />
                    </Form.Item>
                  </div>

                  <div className="w-full">
                    <Form.Item
                      name="additionalInfo"
                      rules={[{ required: true }]}
                      className="!mb-0 w-full"
                      label="Дополнительная информация"
                    >
                      <Input className="w-full" />
                    </Form.Item>
                  </div>

                  <div className="w-full">
                    <Form.Item
                      name="exporterName2"
                      rules={[{ required: true }]}
                      className="!mb-0 w-full"
                      label="Наименование экспортера"
                      help="Заполняется если экспортер и грузоотправитель различные лица"
                    >
                      <Input className="w-full" />
                    </Form.Item>
                  </div>
                  <div className="w-full">
                    <Form.Item
                      name="exporterInn"
                      rules={[{ required: true }]}
                      className="!mb-0 w-full"
                      label="ИНН/ПИНФЛ"
                    >
                      <Input className="max-w-[150px]" />
                    </Form.Item>
                  </div>
                </div>
              </div>
              <div className="w-1/2 max-w-[600px]">
                <div className="flex items-center gap-1 mb-2">
                  <div className="font-semibold mb-1">
                    8. Импортер/грузополучатель
                  </div>
                  <div className="">
                    <Tooltip title="Справочник" placement="bottom">
                      <Button
                        onClick={() => setImporterRefOpen(true)}
                        type="text"
                        className="!text-primary flex items-center justify-center"
                        icon={
                          <BookOpenText className="w-4 h-4 align-middle mt-1" />
                        }
                      ></Button>
                    </Tooltip>
                  </div>
                  <div className="">
                    <Dropdown
                      trigger={["click"]}
                      dropdownRender={() => (
                        <div className="p-4 max-w-sm bg-white text-black rounded shadow-lg">
                          <p className="mb-2 font-semibold">
                            Графа 8. «Импортер/грузополучатель».
                          </p>
                          <p className="text-[13px] indent-10 text-justify !mb-1">
                            В графе указываются сведения о лице, указанном в
                            транспортных документах в качестве получателя
                            товаров.
                          </p>
                          <p className="text-[13px] indent-10 text-justify !mb-1">
                            В графе указываются: если грузополучатель физическое
                            лицо — фамилия, имя, отчество физического лица, его
                            место жительства (краткое наименование страны
                            согласно Классификатору стран мира, приведённому в
                            приложении № 5 к настоящей Инструкции и адрес);
                          </p>
                          <p className="text-[13px] indent-10 text-justify !mb-1">
                            если грузополучатель юридическое лицо — его краткое
                            наименование и местонахождение (краткое наименование
                            страны согласно Классификатору стран мира и адрес).
                          </p>
                          <p className="text-[13px] indent-10 text-justify !mb-1">
                            Если грузополучатель принимает товар по поручению
                            другого лица или в других аналогичных случаях, в
                            графе сначала указывается краткое наименование и
                            местонахождение (юридический адрес) грузополучателя,
                            затем краткое наименование и местонахождение
                            (юридический адрес) лица, по поручению которого
                            получатель принимает товар.
                          </p>
                        </div>
                      )}
                    >
                      <Button
                        type="text"
                        className="!text-primary"
                        icon={
                          <CircleQuestionMark className="w-4 h-4 align-middle mt-1" />
                        }
                      />
                    </Dropdown>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="">
                    <div className="w-full">
                      <Form.Item
                        name="importerName"
                        rules={[{ required: true }]}
                        className="!mb-0 w-full"
                        label="Наименование грузополучателя"
                      >
                        <Input className="w-full" />
                      </Form.Item>
                    </div>
                  </div>

                  <div className="w-full">
                    <Form.Item
                      name="importerAddress"
                      rules={[{ required: true }]}
                      className="!mb-0 w-full"
                      label="Адрес грузополучателя"
                    >
                      <Input className="w-full" />
                    </Form.Item>
                  </div>

                  <div className="w-full">
                    <Form.Item
                      name="importerPhone"
                      rules={[{ required: true }]}
                      className="!mb-0 w-[200px]"
                      label="Телефон"
                    >
                      <Input className="w-[200px]" />
                    </Form.Item>
                  </div>

                  <div className="w-full">
                    <Form.Item
                      name="importerAdditionalInfo"
                      rules={[{ required: true }]}
                      className="!mb-0 w-full"
                      label="Дополнительная информация"
                    >
                      <Input className="w-full" />
                    </Form.Item>
                  </div>

                  <div className="w-full">
                    <Form.Item
                      name="importerName2"
                      rules={[{ required: true }]}
                      className="!mb-0 w-full"
                      label="Наименование импортера"
                      help="Заполняется если импортер и грузополучатель различные лица"
                    >
                      <Input className="w-full" />
                    </Form.Item>
                  </div>
                  <div className="w-full">
                    <Form.Item
                      name="importerInn"
                      rules={[{ required: true }]}
                      className="!mb-0 w-full"
                      label="ИНН/ПИНФЛ"
                    >
                      <Input className="max-w-[150px]" />
                    </Form.Item>
                  </div>
                </div>
              </div>
            </div>

            <DashedDivider />
          </div>
        </Form>
      </Card>

      <Modal
        open={regimesClassifierOpen}
        title="Справочник таможенных режимов"
        width={750}
        onCancel={() => setRegimesClassifierOpen(false)}
        onOk={handleSelectAndClose}
        okText="Выбрать"
        cancelText="Отмена"
        style={{ top: 20 }}
        bodyStyle={{ maxHeight: "80vh", overflowY: "auto" }}
      >
        <RegimesClassifier
          selectedKey={selectedRegimeId}
          onSelect={(id: number, row: Regime) => {
            setSelectedRegimeId(id);
            form.setFieldsValue({
              customsRegimeType: row.type,
              customsRegimeCode: row.code,
            });
          }}
          onDoubleSelect={(id: number, row: Regime) => {
            setSelectedRegimeId(id);
            form.setFieldsValue({
              customsRegimeType: row.type,
              customsRegimeCode: row.code,
            });
            handleSelectAndClose();
          }}
        />
      </Modal>

      <Modal
        open={customsPostsClassifierOpen}
        title="Справочник таможенных постов"
        width={750}
        onCancel={() => setCustomsPostsClassifierOpen(false)}
        onOk={handleCustomsPostSelectAndClose}
        okText="Выбрать"
        cancelText="Отмена"
        style={{ top: 20 }}
        bodyStyle={{ maxHeight: "80vh", overflowY: "auto" }}
      >
        <CustomsPostsClassifier
          selectedKey={selectedCustomsPostId}
          onSelect={(id, row: CustomsPost) => {
            // only store selection, don't write into form yet
            setSelectedCustomsPostId(id);
            setSelectedCustomsPostRow(row);
          }}
          onDoubleSelect={(id, row: CustomsPost) => {
            // set fields AND close immediately on double click
            setSelectedCustomsPostId(id);
            setSelectedCustomsPostRow(row);
            form.setFieldsValue({
              gTDRegistryNumber: row.code,
            });
            setCustomsPostsClassifierOpen(false);
          }}
        />
      </Modal>
      <Modal
        open={exporterRefOpen}
        title="Справочник участников ВЭД"
        width={1000}
        onCancel={() => setExporterRefOpen(false)}
        onOk={handleExporterOk}
        okText="Выбрать"
        cancelText="Отмена"
        style={{ top: 20 }}
        bodyStyle={{ maxHeight: "80vh", overflowY: "auto" }}
      >
        <ParticipantsRef
          selectedKey={selectedExporterId}
          onSelect={(id, row: LegalEntity) => {
            // only store selection, don't write into form yet
            setSelectedExporterId(id);
            setSelectedExporterRow(row);
          }}
          onDoubleSelect={(id, row: LegalEntity) => {
            // set fields AND close immediately on double click
            setSelectedExporterId(id);
            setSelectedExporterRow(row);
            form.setFieldsValue({
              exporterName: row.name,
              exporterAddress: row.address,
              exporterPhone: row.phone,
              exporterInn: row.inn,
            });
            setExporterRefOpen(false);
          }}
        />
      </Modal>
      <Modal
        open={importerRefOpen}
        title="Справочник участников ВЭД"
        width={1000}
        onCancel={() => setImporterRefOpen(false)}
        onOk={handleImporterOk}
        okText="Выбрать"
        cancelText="Отмена"
        style={{ top: 20 }}
        bodyStyle={{ maxHeight: "80vh", overflowY: "auto" }}
      >
        <ParticipantsRef
          selectedKey={selectedImporterId}
          onSelect={(id, row: LegalEntity) => {
            // only store selection, don't write into form yet
            setSelectedImporterId(id);
            setSelectedImporterRow(row);
          }}
          onDoubleSelect={(id, row: LegalEntity) => {
            // set fields AND close immediately on double click
            setSelectedImporterId(id);
            setSelectedImporterRow(row);
            form.setFieldsValue({
              importerName: row.name,
              importerAddress: row.address,
              importerPhone: row.phone,
              importerInn: row.inn,
            });
            setImporterRefOpen(false);
          }}
        />
      </Modal>
    </div>
  );
};

export default DeclarationForm;
