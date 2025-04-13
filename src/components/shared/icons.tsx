import { type IconProps } from 'blackwork/icons'
import React from 'react'

export const TattooIcon: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 512 512"
    {...props}
  >
    {/* Icon from File Icons by John Gardner - https://github.com/file-icons/icons/blob/master/LICENSE.md */}
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M160.77 306.603L0 149.1V95.978l191.392 189.743c27.038 22.087-1.142 57.884-30.621 20.882m234.586-38.076C438.956 194.28 478.761 95.61 502.18 0h-59.604c-11.902 111.59-39.652 177.445-61.43 273.966a72.5 72.5 0 0 1-20.6 0C338.766 177.446 311.017 111.59 299.116 0H239.51c23.419 95.61 63.224 194.28 106.824 268.526C290.02 221.528 206.59 64.629 191.528 0h-21.965c17.268 70.244 104.219 199.06 154.574 263.628C247.385 185.212 177.915 83.09 152.22 0H0v54.511l235.196 232.494l80.298 151.915C347 503.315 270 457.982 136.175 383.042L0 248.724V512h512V148.274c-30.72 45.693-57.828 75.387-94.446 115.355c26.51-33.992 63.158-85.79 94.446-137.474V95.773c-34.436 68.658-81.763 145.18-116.644 172.754m27.015 39.018l-99.642.06l13.73 60.115l72.557.244z"
      clipRule="evenodd"
    ></path>
  </svg>
)
