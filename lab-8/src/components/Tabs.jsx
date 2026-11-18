import { createContext, use, useState } from 'react'

const TabsContext = createContext(null)

function useTabsContext() {
  const context = use(TabsContext)
  if (!context) {
    throw new Error('Tabs components must be used within <Tabs>')
  }
  return context
}

export default function Tabs({ defaultValue, children }) {
  const [activeTab, setActiveTab] = useState(defaultValue)

  return (
    <TabsContext value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext>
  )
}

function List({ children, ...props }) {
  return (
    <div className="tab-list" {...props}>
      {children}
    </div>
  )
}

function Tab({ value, children }) {
  const { activeTab, setActiveTab } = useTabsContext()
  const isSelected = activeTab === value

  return (
    <button
      type="button"
      className={isSelected ? 'active' : undefined}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  )
}

function Panel({ value, children }) {
  const { activeTab } = useTabsContext()

  return <div hidden={activeTab !== value}>{children}</div>
}

Tabs.List = List
Tabs.Tab = Tab
Tabs.Panel = Panel
