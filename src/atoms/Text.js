// @flow

/* eslint-disable */

import styled, { css } from 'styled-components'

import media from 'styles/media'
import spacing from 'styles/spacing'

// { screen breakpoint, [font-size, line-height]}
// Absolute pixels so nesting is unaffected;
const sizeMap = {
  small: {
    normal: ['16px', '20px'],
    tiny: ['11px', '13px'],
    small: ['14px', '16.25px'],
    large: ['19px', '23.75px']
  },
  large: {
    normal: ['18px', '22px'],
    tiny: ['12px', '16.5px'],
    small: ['16px', '22px'],
    large: ['20px', '27.5px']
  }
}

export const textBase = css`
  position: relative;

  /* Size */
  font-size: ${sizeMap['small']['normal'][0]};
  line-height: ${sizeMap['small']['normal'][1]};
  ${props =>
    props.size &&
    css`
      font-size: ${sizeMap['small'][props.size][0]};
      line-height: ${sizeMap['small'][props.size][1]};
    `}
  ${media.large`
      font-size: ${sizeMap['large']['normal'][0]};
      line-height: ${sizeMap['large']['normal'][1]};
      ${props =>
        props.size &&
        css`
          font-size: ${sizeMap['large'][props.size][0]};
          line-height: ${sizeMap['large'][props.size][1]};
        `}
  `};

  /* Weight */
  font-weight: ${props => (props.bold ? 700 : 400)};

  /* Margin */

  margin: 0;

  ${props =>
    props.margin &&
    css`
      margin: ${props.margin};
    `}

  /* Colors  */
  color: inherit;
`

const Text = styled.p`
  ${textBase};
`

export default Text
