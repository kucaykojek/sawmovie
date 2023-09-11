import Campaign from '@/components/Campaign/Campaign'
import Hero from '@/components/Hero/Hero'
import PopularList, {
  PopularListProvider
} from '@/components/Movie/PopularList'
import UpcomingList, {
  UpcomingListProvider
} from '@/components/Movie/UpcomingList'

export default function Home() {
  return (
    <>
      <div data-testid="landing-hero">
        <Hero />
      </div>

      <PopularListProvider>
        <div data-testid="landing-popular-list">
          <PopularList />
        </div>
      </PopularListProvider>

      <UpcomingListProvider>
        <div data-testid="landing-upcoming-list">
          <UpcomingList />
        </div>
      </UpcomingListProvider>

      <div data-testid="landing-campaign">
        <Campaign />
      </div>
    </>
  )
}
