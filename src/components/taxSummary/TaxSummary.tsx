import React from 'react';
import { TaxReport } from '../../services/taxService/tax.service';
import { toMoney, toPercent } from '../../utils/utils';

const TaxSummary: React.FC<TaxReport> = (report) => {
  const effectiveTaxRate = toPercent(report.effectiveRate);
  const netPay = toPercent((1 - report.effectiveRate));
  return (
    <section>
      <div className='row'>
        <div className='col-12 col-sm-6 mt-3'>
          <div className='card h-100'>
            <div className='card-body'>
              <h5 className='card-title'>Tax At A Glance</h5>
            </div>
            <div className='card-body'>
              <div className='progress' style={{ 'height': '50px' }}>
                <div className='progress-bar progress-bar-striped bg-success progress-bar-animated' role='progressbar' style={{ 'width': `${netPay}` }}>Net Pay: {netPay}</div>
                <div className='progress-bar bg-danger' role='progressbar' style={{ 'width': `${effectiveTaxRate}` }}>Tax: {effectiveTaxRate}</div>
              </div>
            </div>
            <div className='card-body'>
              <ul className='list-group list-group-flush'>
                <li className='list-group-item'><div className='fw-bold'>Income:</div> ${toMoney(report.income)}</li>
                <li className='list-group-item'><div className='fw-bold'>Total Taxes Owed:</div> ${toMoney(report.totalTax)}</li>
                <li className='list-group-item'><div className='fw-bold'>Net Pay:</div> ${toMoney(report.income - report.totalTax)}</li>
                <li className='list-group-item'><div className='fw-bold'>Effective Tax Rate:</div> {effectiveTaxRate}</li>
              </ul>
            </div>
          </div>
        </div>
        <div className='col-12 col-sm-6 mt-3'>
          <div className='card h-100'>
            <div className='card-body'>
              <h5 className='card-title'>Tax Per Band</h5>
            </div>
            <div className='card-body'>
              <ul className='list-group list-group-flush'>
                {
                  report.taxBands.map(
                    taxBand =>
                      <li className='list-group-item d-flex justify-content-between align-items-start' key={taxBand.min}>
                        <div className='ms-2 me-auto'>
                          <div className='fw-bold'>{`$${toMoney(taxBand.min)} - $${taxBand?.max ? toMoney(taxBand.max) : '...'}`}</div>
                          ${toMoney(taxBand.taxPayable)}
                        </div>
                        <span className='badge bg-secondary rounded-pill'>{toPercent(taxBand.rate)}</span>
                      </li>
                  )
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TaxSummary