import {
  GalleryVerticalEndIcon,
  PercentIcon,
  SparklesIcon,
  Users2Icon
} from 'lucide-react'

import './Campaign.css'

export default function Campaign() {
  return (
    <div className="container py-10">
      <h2 className="text-center text-3xl font-bold pb-10 tracking-wider">
        Why <span className="text-primary">SawMovie</span>?
      </h2>
      <ul className="campaign">
        <li>
          <div className="campaign__icon">
            <GalleryVerticalEndIcon />
          </div>
          <div className="campaign__content">
            <h3>Complete Collections</h3>
            <p>
              Lorem ipsum dolor sit amet, nostrud in commodo incididunt sit
              tempor enim et amet reprehenderit et elit et sit velit occaecat et
              quis. Dolor enim est officia aute elit minim incididunt ea
              voluptate.
            </p>
          </div>
        </li>
        <li>
          <div className="campaign__icon">
            <PercentIcon />
          </div>
          <div className="campaign__content">
            <h3>Competitive Prices</h3>
            <p>
              Ex adipisicing in id. Adipisicing qui quis deserunt ea commodo. Ut
              veniam mollit Lorem elit quis do duis cupidatat. Ut elit elit
              occaecat nostrud labore officia Lorem eiusmod.
            </p>
          </div>
        </li>
        <li>
          <div className="campaign__icon">
            <SparklesIcon />
          </div>
          <div className="campaign__content">
            <h3>Most Favorite Apps</h3>
            <p>
              Qui ullamco excepteur anim cupidatat elit anim nostrud cillum
              laborum nisi incididunt dolore sunt. Amet deserunt fugiat
              consectetur eu sit eu dolore adipisicing sunt exercitation enim et
              excepteur consectetur.
            </p>
          </div>
        </li>
        <li>
          <div className="campaign__icon">
            <Users2Icon />
          </div>
          <div className="campaign__content">
            <h3>Member Advantages</h3>
            <p>
              Aliqua ea elit amet velit tempor proident veniam elit non ex
              eiusmod fugiat reprehenderit dolore aliquip cillum. Nisi consequat
              dolore esse laboris elit commodo eu occaecat culpa dolor sint
              cupidatat ad enim cillum anim labore.
            </p>
          </div>
        </li>
      </ul>
    </div>
  )
}
