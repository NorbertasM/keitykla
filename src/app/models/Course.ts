export default interface Course {
  amount: number
  base: string
  date: string
  rates: { [x: string]: number }
}

export type Currency = Record<string, string>