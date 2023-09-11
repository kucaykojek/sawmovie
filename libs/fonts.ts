import {
  Source_Code_Pro as FontMono,
  Rubik as FontSans
} from 'next/font/google'

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700', '800', '900']
})

export const fontMono = FontMono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: '400'
})
