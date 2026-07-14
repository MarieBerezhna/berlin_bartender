import { COUNTRY_FLAGS } from "@/app/data/constants";

export default function OriginFlag({ country }: { country: string }) {
const origin = COUNTRY_FLAGS[country];
  return (
    <div
       title={country}
       style={{ position: "absolute", bottom: 12, right: 12, lineHeight: 1, userSelect: "none" }}
    >
        {COUNTRY_FLAGS[country] 
            ? <img src={`https://flagcdn.com/24x18/${origin}.png`} alt={country} width={24} height={18} style={{ display: "block", borderRadius: 2 }} />
            : <span style={{ fontSize: 11, color: "#9a9793" }}>{country}</span>
        }
    </div>
  );
}
