import { TaxReport, taxService, TAX_YEARS } from './tax.service';
import axios from 'axios';

jest.mock('axios');
const mockedAxios: jest.Mocked<typeof axios> = axios as jest.Mocked<typeof axios>;

describe('Tax Service', () => {
  describe('getTaxBracket', () => {
    beforeEach(() => {
      jest.mock('axios');
    });
    afterEach(() => jest.clearAllMocks());

    it('should call the correct url', async () => {
      mockedAxios.get.mockResolvedValue({
        data: {
          tax_brackets: [
            {
              'max': 20000,
              'min': 0,
              'rate': 0
            },
          ]
        }
      })
      await taxService.getTaxBracket(TAX_YEARS[2019]);
      const expectedUrl = 'brackets/2019';
      expect(mockedAxios.get).toHaveBeenCalledWith(expectedUrl);
    });
    it('should handle errors correctly', async () => {
      const expectedError = 'database not found';
      mockedAxios.get.mockRejectedValueOnce('database not found');
      await expect(taxService.getTaxBracket(TAX_YEARS[2019])).rejects.toThrow(expectedError);
    });
    it('should return a TaxBracketResponse', async () => {
      mockedAxios.get.mockResolvedValue({
        data: {
          tax_brackets: [
            {
              'max': 10,
              'min': 0,
              'rate': 0.1
            },
            {
              'max': 20,
              'min': 10,
              'rate': 0.2
            },
          ]
        }
      })
      const actual = await taxService.getTaxBracket(TAX_YEARS[2019]);
      const expectedResponse = {
        tax_brackets: [
          {
            'max': 10,
            'min': 0,
            'rate': 0.1
          },
          {
            'max': 20,
            'min': 10,
            'rate': 0.2
          }
        ]
      }
      expect(actual).toEqual(expectedResponse);
    });
  })

  describe('calculateTaxReport', () => {
    it('should calculate the correct marginal tax rate', () => {

      const givenBrackets = [
        {
          'max': 20000,
          'min': 0,
          'rate': 0
        },
        {
          'max': 40000,
          'min': 20000,
          'rate': 0.10
        },
        {
          'max': 60000,
          'min': 40000,
          'rate': 0.20
        },
        {
          'max': 80000,
          'min': 60000,
          'rate': 0.30
        },
        {
          'max': 100000,
          'min': 80000,
          'rate': 0.40
        },
        {
          'min': 100000,
          'rate': 0.5
        }
      ];

      const givenYear = TAX_YEARS[2021];
      const givenIncome = 100000;
      const actual = taxService.calculateTaxReport(givenBrackets, givenIncome, givenYear);

      const expectedTaxReport: TaxReport = {
        taxBands: [
          {
            max: 20000,
            min: 0,
            rate: 0,
            amountTaxable: 20000,
            taxPayable: 0,
          },
          {
            max: 40000,
            min: 20000,
            rate: 0.10,
            amountTaxable: 20000,
            taxPayable: 2000,
          },
          {
            max: 60000,
            min: 40000,
            rate: 0.20,
            amountTaxable: 20000,
            taxPayable: 4000,
          },
          {
            max: 80000,
            min: 60000,
            rate: 0.30,
            amountTaxable: 20000,
            taxPayable: 6000,
          },
          {
            max: 100000,
            min: 80000,
            rate: 0.40,
            amountTaxable: 20000,
            taxPayable: 8000,
          },
          {
            min: 100000,
            rate: 0.5,
            amountTaxable: 0,
            taxPayable: 0,
          }
        ],
        totalTax: 20000,
        effectiveRate: 0.2,
        year: TAX_YEARS[2021],
        income: givenIncome
      }

      expect(actual).toEqual(expectedTaxReport);
    })
  })

})