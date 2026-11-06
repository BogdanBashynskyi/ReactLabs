import ProfileCard from './components/ProfileCard.jsx'

function App() {
  return (
    <main>
      <ProfileCard
        name="Bogdan"
        group="311"
        technologies={['React', 'TypeScript', 'Node.js']}
      />
    </main>
  )
}

export default App
