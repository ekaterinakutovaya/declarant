import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ConfigProvider } from "antd";
import ruRU from "antd/locale/ru_RU";
import LegalEntitiesPage from "../../pages/ReferenceBook/LegalEntitiesPage.tsx";
import { DashboardLayout } from "../../widgets/Layout/DashboardLayout.tsx";
import Declarations from "../../pages/Declarations/Declarations.tsx";
import DeclarationPage from "../../pages/Declarations/DeclarationPage.tsx";

export const AppRouter = () => {
  const antDesignTheme = {
    token: {
      colorPrimary: "#4DB6AC",
      colorIcon: "#4DB6AC",
      colorLink: "#4DB6AC",
      colorBorder: "#4DB6AC",
      controlInteractiveSize: 24,
    },
  };

  return (
    <ConfigProvider locale={ruRU} theme={antDesignTheme}>
      <BrowserRouter>
        <Routes>
          <Route element={<DashboardLayout />}>
            <Route index element={<Declarations />} />
            <Route path="declarations" element={<Declarations />} />
            <Route
              path="declarations/new"
              element={<DeclarationPage mode="new" />}
            />
            <Route
              path="declarations/:id/edit"
              element={<DeclarationPage mode="edit" />}
            />
            <Route
              path="reference_book/legal_entities"
              element={<LegalEntitiesPage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
};
