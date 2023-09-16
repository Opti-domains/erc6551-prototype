import React, { ReactNode } from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./polyfills";
import "./index.css";
import "@rainbow-me/rainbowkit/styles.css";

import { ListsPageRoute } from "./pages/lists/ListsPage";
import { CreateListTypePageRoute } from "./pages/lists/create/CreateListTypePage";
import { CreateListReducerRouteWrapper } from "./stores/CreateListReducer";
import { RainbowKitConfigProvider } from "./providers/RainbowKitConfigProvider";
import { AntdAlertProvider } from "./providers/AntdAlertProvider";
import { CreateListInfoPageRoute } from "./pages/lists/create/CreateListInfoPage";
import { CreateListChooseProjectsPageRoute } from "./pages/lists/create/CreateListChooseProjectsPage";
import { CreateListRubricPageRoute } from "./pages/lists/create/CreateListRubricPage";
import { CreateListRubricScoringPageRoute } from "./pages/lists/create/CreateListRubricScoringPage";
import { CreateListFinalizePageRoute } from "./pages/lists/create/CreateListFinalizePage";
import { CreateListClassicScoringPageRoute } from "./pages/lists/create/CreateListClassicScoringPage";

const router = createBrowserRouter([
  ListsPageRoute,
  // {
  //   ...ListsPageRoute,
  //   path: "/lists",
  // },

  // Create List
  {
    path: "/lists/create",
    element: <CreateListReducerRouteWrapper />,
    children: [
      CreateListTypePageRoute,
      CreateListInfoPageRoute,
      CreateListChooseProjectsPageRoute,
      CreateListRubricPageRoute,
      CreateListRubricScoringPageRoute,
      CreateListClassicScoringPageRoute,
      CreateListFinalizePageRoute,
    ],
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RainbowKitConfigProvider>
    <AntdAlertProvider>
      <RouterProvider router={router} />
    </AntdAlertProvider>
  </RainbowKitConfigProvider>
);
