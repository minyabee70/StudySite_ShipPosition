import Intro from './components/Intro'
import RegulatoryFramework from './components/RegulatoryFramework'
import TechNetworkClassification from './components/TechNetworkClassification'
import PolicyClassification from './components/PolicyClassification'
import EquipmentCards from './components/EquipmentCards'
import CompareToggle from './components/CompareToggle'
import DataJourney from './components/DataJourney'
import DarkVessel from './components/DarkVessel'
import Footer from './components/Footer'

export default function App() {
  return (
    <main>
      <Intro />
      <RegulatoryFramework />
      <TechNetworkClassification />
      <PolicyClassification />
      <EquipmentCards />
      <CompareToggle />
      <DataJourney />
      <DarkVessel />
      <Footer />
    </main>
  )
}
