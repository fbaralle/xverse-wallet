import React, {
  createElement,
  forwardRef,
  HTMLAttributes,
  ReactHTML,
} from 'react';
import { classMerge } from '@helpers/classMerge';

const baseStyle = 'm-0 font-lexend text-text-default text-inherit';

const elementDefaults = {
  h1: 'text-3xl md:text-5xl font-medium font-title',
  h2: 'text-xl sm:text-2.5xl md:text-2.5xl font-medium font-title',
  h3: 'text-lg sm:text-2xl md:text-2xl font-medium font-title',
  h4: 'text-[17px] sm:text-xl md:text-xl font-normal font-title',
  h5: 'text-base sm:text-lg md:text-lg font-normal font-title',
  p: 'text-xs sm:text-sm font-light',
};

export const textDefaultStyles = {
  ...elementDefaults,
  bodySm: 'text-[11px] sm:text-xs font-light',
  bodySmMedium: 'text-[11px] sm:text-xs font-normal',
  bodySmSemibold: 'text-[11px] sm:text-xs font-medium',
  bodyMd: 'text-xs sm:text-sm font-light',
  bodyMdMedium: 'text-xs sm:text-sm font-normal',
  bodyMdSemibold: 'text-xs sm:text-sm font-medium',
  bodyLg: 'text-sm sm:text-base font-light',
  bodyLgMedium: 'text-sm sm:text-base font-normal',
  bodyLgSemibold: 'text-sm sm:text-base font-medium',
  bodyLgLight: 'text-sm sm:text-base font-light',
  'bodyMd-med': 'text-xs sm:text-sm font-medium',
  'bodyMd-light': 'text-xs sm:text-sm font-light',
  'bodyMd-reg': 'text-xs sm:text-sm font-normal',
  'bodyLg-reg': 'text-sm sm:text-base font-normal',
  'bodyLg-med': 'text-sm sm:text-base font-normal',
  'bodySm-reg': 'text-[11px] sm:text-xs font-normal',
};
export type TextStyles = keyof typeof textDefaultStyles;
type FontSizes =
  | 'xxs'
  | 'xs'
  | 'sm'
  | 'base'
  | 'lg'
  | 'xl'
  | '2xl'
  | '2.5xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl';

type TextReactHTMLElements = Omit<ReactHTML, 'button' | 'a'>;
export type ElementKeys = keyof TextReactHTMLElements;

export interface TextProps<T>
  extends HTMLAttributes<
    | HTMLElement
    | HTMLHeadingElement
    | HTMLParagraphElement
    | HTMLSpanElement
    | HTMLTableCellElement
    | HTMLLabelElement
  > {
  /** HTML element that will be rendered in the DOM.
   * For e. g. "h1" renders an `<h1></h1>`.
   * Default is "span" element.
   * *Note: Specific interface elements like anchor and button are not allowed*
   * */
  as?: T;
  /** Text style of the element.
   * Overrides `as` element default style
   * Applies the default theme if not specified. */
  variant?: TextStyles;
  fontSize?: FontSizes;
  /** This prop overrides every other style */
  className?: string;
  htmlFor?: string;
  /** Number of lines to show before truncating */
  truncateLines?: number;
}

export type TextPropType = React.FunctionComponent<TextProps<ElementKeys>>;

/** Typography component for general purpose */
const Text: TextPropType = forwardRef(
  (
    { as, children, variant, fontSize, className, truncateLines, ...props },
    ref,
  ) => {
    const elementProps = {
      className: classMerge(
        baseStyle,
        // @ts-ignore
        elementDefaults[as],
        {
          [textDefaultStyles[variant as TextStyles]]: !!variant,
          [`text-${fontSize}`]: !!fontSize,
          [`line-clamp-2`]: !!truncateLines,
        },
        className,
      ),
      ref,
      ...props,
    };
    const asElement =
      variant && elementDefaults[variant as keyof typeof elementDefaults]
        ? variant
        : 'span';
    return createElement(as || asElement, elementProps, children);
  },
);

export default Text;
