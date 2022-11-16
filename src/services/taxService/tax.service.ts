import axios, { AxiosResponse } from 'axios';

const BASE_API_URL = process.env.REACT_APP_API_BASE_URL || '';
const BRACKETS_ENDPOINT = 'brackets';

interface TaxBracket {
  min: number,
  max?: number,
  rate: number
}

interface TaxBand extends TaxBracket {
  amountTaxable: number;
  taxPayable: number;
}

interface TaxBracketResponse {
  tax_brackets: Array<TaxBracket>
}

export interface TaxReport {
  taxBands: Array<TaxBand>;
  totalTax: number;
  effectiveRate: number;
  income: number;
  year: number;
}

export const TAX_YEARS = {
  2019: 2019,
  2020: 2020, 
  2021: 2021
}

async function getTaxBracket(year: number): Promise<TaxBracketResponse> {
  const url = `${BASE_API_URL}${BRACKETS_ENDPOINT}/${year}`;
  try {
    const response: AxiosResponse<TaxBracketResponse> = await axios.get(url);
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
}

function calculateTaxReport(taxBrackets: Array<TaxBracket>, income: number, year: number): TaxReport {
  let taxBands = [];
  let totalTax = 0;

  for (const bracket of taxBrackets) {
    let amountTaxable = 0;
    let taxPayable = 0; 

    if (income >= bracket.min) {
      if (!bracket.max || income <= bracket.max) {
        amountTaxable = (income - bracket.min);
      } else if (income >= bracket.max) {
        amountTaxable = (bracket.max - bracket.min);
      }
    }
    taxPayable = amountTaxable * bracket.rate; 
    totalTax += taxPayable;
    const rate = Number(bracket.rate); //API is inconsitent with rate response type
    taxBands.push({...bracket, rate,  amountTaxable, taxPayable});
  }
  
  const taxReport: TaxReport = {
    taxBands,
    totalTax,
    effectiveRate: totalTax / income,
    income, 
    year
  };

  return taxReport;
}

export const taxService = {
  getTaxBracket,
  calculateTaxReport
}