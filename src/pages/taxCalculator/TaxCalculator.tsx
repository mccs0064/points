import React, { useState } from 'react';
import Loading from '../../components/loading/Loading';
import TaxSummary from '../../components/taxSummary/TaxSummary';
import { TaxReport, taxService, TAX_YEARS } from '../../services/taxService/tax.service';

const TaxCalculator: React.FC = () => {
  const [salary, setSalary] = useState<number>(0);
  const [year, setYear] = useState<number>(TAX_YEARS[2021]);
  const [taxReport, setTaxReport] = useState<TaxReport | null>(null);
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const clearResults = () => {
    setTaxReport(null);
    setError('');
  }

  const getTaxReport = async (year: number) => {
    try {
      clearResults();
      setLoading(true);
      const taxBrackets = await taxService.getTaxBracket(year);
      setTaxReport(taxService.calculateTaxReport(taxBrackets.tax_brackets, salary, year));
    } catch (error) {
      setError('Looks like something went wrong, please try again');
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await getTaxReport(year);
  }


  return (
    <>
      <Loading isOpen={loading} />
      
      <div className='card mb-3'>
        <div className='card-body'>
          <h1 className='card-title'>Points Tax Calculator</h1>
          <blockquote className='blockquote mb-4'>
            <p>There are two things in life that are unavoidable – death and taxes.</p>
            <footer className='blockquote-footer'>Benjamin Franklin</footer>
          </blockquote>
          <p className='card-text'>Please enter a salary and tax year to generate a tax report:</p>
          <form onSubmit={handleSubmit} data-testid='form'>
            <div className='row'>
              <div className='col-6 col-sm-4'>
                <div className='form-floating'>
                  <input type='number' className='form-control' id='salaryInput' placeholder='100000.00' required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSalary(parseInt(e.target.value))}
                  />
                  <label htmlFor='salaryInput'>Enter Salary</label>
                </div>
              </div>
              <div className='col-6 col-sm-4'>
                <div className='form-floating'>
                  <select className='form-select' id='yearSelect'
                    value={year}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setYear(parseInt(e.target.value))}>
                    {
                      Object.keys(TAX_YEARS).map(year => <option key={year} value={year}>{year}</option>)
                    }
                  </select>
                  <label htmlFor='yearSelect'>Select Tax Year</label>
                </div>
              </div>
              <div className='col-12 col-sm-4'>
                <button type='submit' className='btn btn-primary w-100 h-100' disabled={loading}>Generate Report</button>
              </div>
            </div>
            {
              !loading && error &&
              <div className='row mt-4'>
                <div className='col'>
                  <div className='alert alert-danger d-flex align-items-center' role='alert'>
                    <i className='bi bi-exclamation-triangle-fill flex-shrink-0 me-2' role='img'></i>
                    <div>
                      {error}
                    </div>
                  </div>
                </div>
              </div>
            }

          </form>
        </div>
      </div>

      {
        taxReport && <TaxSummary {...taxReport} />
      }
    </>
  )
}

export default TaxCalculator