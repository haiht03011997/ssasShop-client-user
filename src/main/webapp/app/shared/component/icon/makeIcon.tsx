import React from "react";

export const makeIcon = (Icon, colorName) => (
  <Icon className={`colored-icon c-${colorName}`} />
);
