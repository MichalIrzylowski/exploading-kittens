import React from 'react';
import { Helmet, HelmetProps } from 'react-helmet';
import { typography } from '@front/utils/typography';

export const Head: React.FC<HelmetProps> = (props) => {
  const { children, ...rest } = props;
  // Create family + styles string
  let fontsStr = '';
  if (typography.options.googleFonts) {
    const fonts = typography.options.googleFonts.map((font) => {
      let str = '';
      str += font.name.split(' ').join('+');
      str += ':';
      str += font.styles.join(',');

      return str;
    });

    fontsStr = fonts.join('|');
  }

  return (
    <Helmet {...rest}>
      {fontsStr !== '' && (
        <link
          href={`//fonts.googleapis.com/css?family=${fontsStr}`}
          rel="stylesheet"
          type="text/css"
        />
      )}
      <style>{`${typography.createStyles()}`}</style>
      {children}
    </Helmet>
  );
};
