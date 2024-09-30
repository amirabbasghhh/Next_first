"use client";

import React from "react";
import { I18nextProvider } from "react-i18next";
import i18next from "@/i18next";

export const Provider = ({ children }) => {
  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
};
