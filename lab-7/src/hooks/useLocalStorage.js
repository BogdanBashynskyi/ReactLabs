/**
 *У `FavoriteButton` та `GrindPicker` дублюється логіка збереження в `localStorage`. Виносимо її у власний хук `useLocalStorage(key, initialValue)`[cite: 94]:
* Під час першого рендеру ініціалізатор читає `localStorage.getItem(key)` і парсить через `JSON.parse` у блоці `try...catch` (якщо під ключем лежить невалідний JSON, наприклад старий рядок `filter`, або значення відсутнє, повертається `initialValue`)[cite: 94].
* Ефект `useEffect` синхронізує зміни, записуючи `JSON.stringify(value)` у `localStorage`[cite: 94].
* Сеттер `setValue` із `useState` автоматично підтримує як пряме значення, так і функцію-оновлювач[cite: 94].
 */
import { useEffect, useState } from 'react'

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key)
      return saved !== null ? JSON.parse(saved) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}