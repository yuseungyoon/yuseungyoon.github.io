"use client";

import { nextTheme, ThemeContext } from "features/theme";
import Link from "next/link";
import { useContext } from "react";
import { MenuBtn } from "./MenuButton";
import * as css from "./Navigation.css";
import { NavProvider } from "./NavigationProvider";

export function Navigation() {
  return (
    <NavProvider>
      <NavigationContent />
    </NavProvider>
  );
}

function NavigationContent() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={css.container}>
      <div className={css.frame}>
        <div className={css.buttonGroup}>
          <MenuBtn
            as={Link}
            href="/"
            aria-label={`글 리스트 페이지로 이동합니다`}
          >
            *
          </MenuBtn>
        </div>
        <div className={css.buttonGroup}>
          <MenuBtn
            type="button"
            onClick={toggleTheme}
            aria-label={`현재 색상 테마는 ${theme}입니다. 버튼을 누르면 ${nextTheme(theme)} 테마로 바뀝니다.`}
          >
            {(() => {
              switch (theme) {
                case "system":
                  return "👽";
                case "light":
                  return "🌞";
                case "dark":
                  return "🌚";
              }
            })()}
          </MenuBtn>
        </div>
      </div>
    </div>
  );
}
