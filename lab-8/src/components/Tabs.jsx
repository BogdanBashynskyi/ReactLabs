import { createContext, use, useId, useRef, useState } from 'react'

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
  const baseId = useId()

  return (
    <TabsContext value={{ activeTab, setActiveTab, baseId }}>
      <div className="tabs">{children}</div>
    </TabsContext>
  )
}

function List({ children, ...props }) {
  const listRef = useRef(null)

  function handleKeyDown(e) {
    const keys = ['ArrowRight', 'ArrowLeft', 'Home', 'End']
    if (!keys.includes(e.key)) return

    const tabs = Array.from(listRef.current.querySelectorAll('[role="tab"]'))
    const currentIndex = tabs.indexOf(document.activeElement)
    if (currentIndex === -1) return

    e.preventDefault()

    let nextIndex = currentIndex
    if (e.key === 'ArrowRight') {
      nextIndex = (currentIndex + 1) % tabs.length
    } else if (e.key === 'ArrowLeft') {
      nextIndex = (currentIndex - 1 + tabs.length) % tabs.length
    } else if (e.key === 'Home') {
      nextIndex = 0
    } else if (e.key === 'End') {
      nextIndex = tabs.length - 1
    }

    tabs[nextIndex].focus()
    tabs[nextIndex].click()
  }

  return (
    <div
      ref={listRef}
      role="tablist"
      className="tab-list"
      onKeyDown={handleKeyDown}
      {...props}
    >
      {children}
    </div>
  )
}

function Tab({ value, children }) {
  const { activeTab, setActiveTab, baseId } = useTabsContext()
  const isSelected = activeTab === value

  return (
    <button
      type="button"
      role="tab"
      id={`${baseId}-tab-${value}`}
      aria-selected={isSelected}
      aria-controls={`${baseId}-panel-${value}`}
      tabIndex={isSelected ? 0 : -1}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  )
}

function Panel({ value, children }) {
  const { activeTab, baseId } = useTabsContext()
  const isSelected = activeTab === value

  return (
    <div
      role="tabpanel"
      id={`${baseId}-panel-${value}`}
      aria-labelledby={`${baseId}-tab-${value}`}
      tabIndex={0}
      hidden={!isSelected}
    >
      {children}
    </div>
  )
}

Tabs.List = List
Tabs.Tab = Tab
Tabs.Panel = Panel
