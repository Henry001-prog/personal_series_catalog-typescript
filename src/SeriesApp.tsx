import React, { Suspense } from "react";
import Router from "./Router";
import { RecoilRoot } from "recoil";

const SeriesApp = () => (
  <RecoilRoot>
    <Suspense fallback='Loading...'>
    <Router />
    </Suspense>
  </RecoilRoot>
);

export default SeriesApp;
