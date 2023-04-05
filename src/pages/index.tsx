import HelloWorld from '../components/hello'

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <HelloWorld />
    </div>
  )
}

export default Home