import React from "react"

export interface TabsProps {
  defaultIndex?: string;
  onSelect?: (selectedLabel: string) => void;
}

const Tabs: React.FC<TabsProps> = (props) => {
  return (
    <div className="tabs">
      
    </div>
  )
}

export default Tabs