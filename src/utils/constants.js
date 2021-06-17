import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { green, red } from '@material-ui/core/colors';

export const headerOptions = [
  {
    line1: 'Hello Guest',
    line2: 'Sign In',
    link: '/login',
  },
  { line1: 'Returns', line2: '& Orders', link: '/orders' },
  { line1: 'Manage', line2: 'Settings', link: '' },
];

export const authInputs = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
};

export const authErrors = {
  email: '',
  password: '',
};

export const cardOptions = {
  Card: false,
  'MM/YY': false,
  CVC: false,
  ZIP: false,
};

export const cardInfo = [
  {
    text: 'Card',
    num: '4242424242424242',
  },
  {
    text: 'MM/YY',
    num: '424',
  },
  {
    text: 'CVC',
    num: '242',
  },
  {
    text: 'ZIP',
    num: '42424',
  },
];

export const homeImages = [
  {
    link: 'https://images-na.ssl-images-amazon.com/images/G/01/kindle/journeys/Y2UwYWM0MDQt/Y2UwYWM0MDQt-YzBhZjUwNjQt-w3000._CB670123750_.jpg',
  },
  {
    link: 'https://images-na.ssl-images-amazon.com/images/G/01/em/pd21/xcm_em_prime_day_2021_775-usen_d_hp_tallhero_lifestyle_1500x600._CB668927510_.jpg',
  },
  {
    link: 'https://images-na.ssl-images-amazon.com/images/G/01/AMAZON_FASHION/2021/journeys/MzBiNjIyYjgt/MzBiNjIyYjgt-NWM5ZWJlYTct-w3000._CB669030425_.jpg',
  },
  {
    link: 'https://images-na.ssl-images-amazon.com/images/G/01/digital/video/merch/TomorrowWar/GW-Trailer-1/TWAR_2021_GWBleedingHero_3000x1200_TeaserChrisSoloNoGun_TH_Pre_en-US_ARSDE._CB668924267_.jpg',
  },
  {
    link: 'https://images-na.ssl-images-amazon.com/images/G/01/Audible/Revelation-GatewayHeroDesktop-English-2x-3000x1200-V03._CB655334651_.jpg',
  },
];

export const toastType = {
  addToast: {
    icon: () => (
      <CheckCircleOutlineIcon style={{ color: green[500], fontSize: 30 }} />
    ),
    text: 'added',
  },
  removeToast: {
    icon: () => (
      <RemoveCircleOutlineIcon style={{ color: red[500], fontSize: 30 }} />
    ),
    text: 'removed',
  },
};
