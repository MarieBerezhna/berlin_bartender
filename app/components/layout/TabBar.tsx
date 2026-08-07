"use client";

import {
  AUTOR_CAT,
  AUTOR_FAMILIES,
  CATS,
  CLASICA_CAT,
  CLASICA_FAMILIES,
  COCTELERIA_SUBTABS,
  COCTELERIA_TAB,
  DESTILADOS_SUBGROUPS,
  DESTILADOS_TAB,
} from "../../data/constants";

type TabBarProps = {
  activeTab: string;
  activeSubtab: string | null;
  activeFamily: string | null;
  onTabChange: (tab: string) => void;
  onSubtabChange: (subtab: string | null) => void;
  onFamilyChange: (family: string | null) => void;
};

const hiddenCats = new Set([
  "Todo",
  CLASICA_CAT,
  AUTOR_CAT,
  COCTELERIA_TAB,
  "Spritz",
  "Jarras",
  "Micheladas",
  DESTILADOS_TAB,
  "Ron",
  "Whisky",
  "Gin",
  "Tequila",
  "Vodka",
]);

const orderedTabs = [
  "Todo",
  COCTELERIA_TAB,
  DESTILADOS_TAB,
  ...CATS.filter((cat) => !hiddenCats.has(cat)),
].filter((tab, index, list) => list.indexOf(tab) === index);

export default function TabBar({
  activeTab,
  activeSubtab,
  activeFamily,
  onTabChange,
  onSubtabChange,
  onFamilyChange,
}: TabBarProps) {
  const hasSubtabs =
    activeTab === COCTELERIA_TAB ||
    activeTab === AUTOR_CAT ||
    activeTab === CLASICA_CAT ||
    activeTab === DESTILADOS_TAB;
  const cocteleriaSubtabs = ["Todo", ...COCTELERIA_SUBTABS] as string[];
  const subtabFamilies =
    activeTab === DESTILADOS_TAB
      ? DESTILADOS_SUBGROUPS
      : activeTab === COCTELERIA_TAB
        ? cocteleriaSubtabs
        : activeTab === AUTOR_CAT
          ? AUTOR_FAMILIES
          : activeTab === CLASICA_CAT
            ? CLASICA_FAMILIES
            : [];
  const familySubtabs =
    activeTab === COCTELERIA_TAB && activeSubtab === CLASICA_CAT
      ? (["Todo", ...CLASICA_FAMILIES] as string[])
      : activeTab === COCTELERIA_TAB && activeSubtab === AUTOR_CAT
        ? (["Todo", ...AUTOR_FAMILIES] as string[])
        : [];

  return (
    <>
      <div className="tabs-scroll">
        <div className="tabs" id="tabs">
          {orderedTabs.map((tab) => (
            <button
              key={tab}
              className={`tab${tab === activeTab ? " active" : ""}`}
              onClick={() => onTabChange(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="tabs-scroll" id="subtabsWrap" style={{ display: hasSubtabs ? "" : "none" }}>
        <div className="tabs" id="subtabs">
          <button
            className={`tab${activeFamily === null ? " active" : ""}`}
            onClick={() => {
              if (activeTab === COCTELERIA_TAB) {
                onSubtabChange(null);
                onFamilyChange(null);
              } else {
                onFamilyChange(null);
              }
            }}
          >
            Todo
          </button>
          {subtabFamilies
            .filter((family) => family !== "Todo")
            .map((family) => (
              <button
                key={family}
                className={`tab${activeSubtab === family ? " active" : ""}`}
                onClick={() => {
                  if (activeTab === COCTELERIA_TAB) {
                    onSubtabChange(family === "Todo" ? null : family);
                    onFamilyChange(null);
                  } else {
                    onFamilyChange(family);
                  }
                }}
              >
                {family}
              </button>
            ))}
        </div>
      </div>
      <div
        className="tabs-scroll"
        id="familySubtabsWrap"
        style={{ display: familySubtabs.length > 0 ? "" : "none" }}
      >
        <div className="tabs" id="familySubtabs">
          {familySubtabs.map((family) => (
            <button
              key={family}
              className={`tab${activeFamily === family ? " active" : ""}`}
              onClick={() => onFamilyChange(family === "Todo" ? null : family)}
            >
              {family}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
