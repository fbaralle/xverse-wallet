import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "selector",
  theme: {
    extend: {
      fontSize: {
        xxs: ["0.6rem", "0.8rem"], // 10px
        "2.5xl": ["1.75rem", "2.15rem"], // 28px
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        header: "0px 4px 8px 0px rgba(0, 0, 0, 0.03)",
      },
      colors: {
        transparent: "var(--transparent)",
        background: {
          primary: "var(--backgroundPrimary)",
          highlight: "var(--backgroundHighlightColor)",
          cellHighlight: "var(--backgroundCellHighlightColor)",
          main: "var(--backgroundMainColor)",
          popout: "var(--backgroundPopoutColor)",
          warning: "var(--backgroundAlertColor)",
          focusTransparent: "var(--backgroundSearchBarUnfocusedRgba)",
          daoGoldGradient: "var(--daoGoldGradient)",
          shadingGreen: "var(--backgroundShadingGreen)",
          teal: "var(--solidTeal)",
          shadingRed: "var(--backgroundShadingRed)",
          shadingGray: "var(--backgroundShadingGray)",
          shadingPink: "var(--backgroundShadingPink)",
          shadingYellow: "var(--backgroundShadingYellow)",
          shadingLink: "var(--labelLinkBackgroundColor)",
          transparent: "var(--countdownBackgroundColor)",
          barGraph: "var(--graphBarColor)",
          alternate: "var(--backgroundAlternateColor)",
          subdued: "var(--borderPrimaryColor)",
          downlight: "var(--backgroundDownlight)",
          card: "var(--backgroundCard)",
          "tippy-highlight": "var(--backgroundTippyHighlight)",
          "card-list-item": "var(--backgroundCardListItem)",
          "card-list-item-hover": "var(--backgroundCardListItemHover)",
          "card-list-item-active": "var(--backgroundCardListItemActive)",
          "text-input": "var(--backgroundTextInput)",
          header: "var(--backgroundHeader)",
          overlay: "var(--backgroundOverlay)",
          table: "var(--backgroundTable)",
          "table-row": "var(--backgroundTableRow)",
          "table-row-hover": "var(--backgroundTableRowHover)",
          tag: "var(--backgroundTag)",
        },
        text: {
          default: "var(--textDefaultColor)",
          primary: "var(--textPrimaryColor)",
          secondary: "var(--textSecondaryColor)",
          subdued: "var(--textSubduedColor)",
          destructive: "var(--textDestructiveColor)",
          disabled: "var(--textDisabledColor)",
          green: "var(--textGreenColor)",
          inverted: "var(--textInvertedColor)",
          link: "var(--textLinkColor)",
          "link-hover": "var(--textLinkHoverColor)",
          warning: "var(--textWarningColor)",
          "button-primary": "var(--buttonPrimaryTextColor)",
        },
        button: {
          primary: "var(--buttonPrimaryBackgroundColor)",
          "primary-hover": "var(--buttonPrimaryHoverColor)",
          "primary-pressed": "var(--buttonPrimaryPressedColor)",
          "primary-disabled": "var(--buttonPrimaryDisabledBackgroundColor)",
          secondary: "var(--buttonSecondaryBackgroundColor)",
        },
        border: {
          "empty-checkbox": "var(--borderEmptyCheckbox)",
        },
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
      aria: {
        scrolled: 'label="scrolled"',
        "not-scrolled": 'label="not-scrolled"',
      },
    },
  },
  plugins: [
    exportTailwindColorsAsCustomProperties,
    require("tailwindcss-animate"),
    ({ addUtilities }: { addUtilities: (args: any) => void }) => {
      addUtilities({
        ".table-cell-shadow-right:before": {
          "box-shadow": "inset 30px 0 24px -24px var(--cellShadowRight)", // Increase shadow size
          position: "absolute",
          top: "0",
          right: "0",
          bottom: "-1px",
          width: "90px", // Increase width to match larger shadow
          transform: "translate(100%)",
          transition: "box-shadow 0.3s",
          content: '""',
          "pointer-events": "none",
        },
      });
    },
  ],
};

function exportTailwindColorsAsCustomProperties({
  addBase,
  theme,
}: {
  addBase: (args: any) => unknown;
  theme: (args: any) => any;
}) {
  function extractColorVars(
    colorObj: Record<string, any>,
    colorGroup = ""
  ): Record<string, any> {
    return Object.keys(colorObj).reduce((vars, colorKey) => {
      const value = colorObj[colorKey];

      const newVars =
        typeof value === "string"
          ? { [`--color${colorGroup}-${colorKey}`]: value }
          : extractColorVars(value, `-${colorKey}`);

      return { ...vars, ...newVars };
    }, {});
  }

  addBase({
    ":root": extractColorVars(theme("colors")),
  });
}

export default config;
