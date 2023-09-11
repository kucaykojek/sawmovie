import Campaign from '@/components/Campaign/Campaign'
import Hero from '@/components/Hero/Hero'
import PopularList, {
  PopularListProvider
} from '@/components/Popular/PopularList'
import UpcomingList, {
  UpcomingListProvider
} from '@/components/Upcoming/UpcomingList'

export default function Home() {
  return (
    <>
      <Hero />

      <PopularListProvider>
        <PopularList />
      </PopularListProvider>

      <UpcomingListProvider>
        <UpcomingList />
      </UpcomingListProvider>

      <Campaign />
    </>
  )
}
