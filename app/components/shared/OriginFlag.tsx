"use client";

import { useState } from "react";
import { COUNTRY_FLAGS } from "@/app/data/constants";

export default function OriginFlag({ country }: { country: string }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const origin = COUNTRY_FLAGS[country];

  return (
    <div
      style={{ position: "absolute", bottom: 12, right: 12, lineHeight: 1, userSelect: "none" }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onFocus={() => setShowTooltip(true)}
      onBlur={() => setShowTooltip(false)}
      onClick={() => setShowTooltip((current) => !current)}
      tabIndex={0}
      role="button"
      aria-label={country}
    >
      {showTooltip ? (
        <div
          style={{
            position: "absolute",
            bottom: 26,
            right: 0,
            transform: "translateX(0)",
            background: "rgba(17, 17, 15, 0.96)",
            color: "#e8e6e1",
            padding: "6px 8px",
            borderRadius: 8,
            fontSize: 11,
            fontWeight: 600,
            whiteSpace: "nowrap",
            border: "0.5px solid rgba(232, 230, 225, 0.16)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.25)",
            zIndex: 2,
          }}
        >
          {country}
        </div>
      ) : null}
      {COUNTRY_FLAGS[country] ? (
        <img
          src={`https://flagcdn.com/24x18/${origin}.png`}
          alt={country}
          width={24}
          height={18}
          style={{ display: "block", borderRadius: 2 }}
        />
      ) : (
        <span style={{ fontSize: 11, color: "#9a9793" }}>{country}</span>
      )}
    </div>
  );
}
