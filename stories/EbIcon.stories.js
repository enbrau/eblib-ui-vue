import { EbIcon } from '../components/index.js'

import * as arrows from '../components/eb-icon/src/icons/arrows'
import * as buildings from '../components/eb-icon/src/icons/buildings'
import * as business from '../components/eb-icon/src/icons/business'
import * as communication from '../components/eb-icon/src/icons/communication'
import * as design from '../components/eb-icon/src/icons/design'
import * as development from '../components/eb-icon/src/icons/development'
import * as device from '../components/eb-icon/src/icons/device'
import * as document from '../components/eb-icon/src/icons/document'
import * as editor from '../components/eb-icon/src/icons/editor'
import * as finance from '../components/eb-icon/src/icons/finance'
import * as food from '../components/eb-icon/src/icons/food'
import * as health from '../components/eb-icon/src/icons/health'
import * as logos from '../components/eb-icon/src/icons/logos'
import * as map from '../components/eb-icon/src/icons/map'
import * as media from '../components/eb-icon/src/icons/media'
import * as others from '../components/eb-icon/src/icons/others'
import * as system from '../components/eb-icon/src/icons/system'
import * as user from '../components/eb-icon/src/icons/user'
import * as weather from '../components/eb-icon/src/icons/weather'

import './assets/style.icon.scss'

export default {
  title: 'EBLib-UI/General/EbIcon',
  component: EbIcon,
  tags: ['autodocs'],
  argTypes: {},
  args: { icons: arrows },
  render: (args) => ({
    components: { EbIcon, ...args.icons },
    setup() {
      return { args }
    },
    template: `
      <ul class="demo-icon-list">
        <li class="icon-item" v-for="(icon, $key) in args.icons" :key="$key">
          <span class="demo-svg-icon">
            <eb-icon style="font-size: 20px;">
              <component :is="$key" />
            </eb-icon>
            <span class="icon-name">{{ $key }}</span>
          </span>
        </li>
      </ul>
    `
  })
}

export const Arrows = {
  args: { icons: arrows }
}

export const Buildings = {
  args: { icons: buildings }
}

export const Business = {
  args: { icons: business }
}

export const Communication = {
  args: { icons: communication }
}

export const Design = {
  args: { icons: design }
}

export const Development = {
  args: { icons: development }
}

export const Device = {
  args: { icons: device }
}

export const Document = {
  args: { icons: document }
}

export const Editor = {
  args: { icons: editor }
}

export const Finance = {
  args: { icons: finance }
}

export const Food = {
  args: { icons: food }
}

export const Health = {
  args: { icons: health }
}

export const Logos = {
  args: { icons: logos }
}

export const Map = {
  args: { icons: map }
}

export const Media = {
  args: { icons: media }
}

export const Others = {
  args: { icons: others }
}

export const System = {
  args: { icons: system }
}

export const User = {
  args: { icons: arrows }
}

export const Weather = {
  args: { icons: weather }
}
