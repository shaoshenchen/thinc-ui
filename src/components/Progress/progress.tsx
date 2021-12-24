import React from "react";
import { ThemeProps } from '../Icon/icon'

export interface ProgressProps {
  percent: number;
  strokeHeight?: number;
  showText?: boolean;
  styles?: React.CSSProperties;
  theme?: ThemeProps;
}

const Progress: React.FC<ProgressProps> = (props) => {
  const {
    percent,
    showText,
    styles,
    theme,
  } = props

  return (
    <div className='progress-bar' style={styles}>
      <div className="progress-bar-outer">
        <div
          className={`progress-bar-inner color-${theme}`}
          style={{ width: `${percent}%` }}
        >
          {showText && <span className="inner-text">{`${percent}%`}</span>}
        </div>
      </div>
    </div>
  )
}

Progress.defaultProps = {
  showText: true,
  theme: 'blue'
}

export default Progress