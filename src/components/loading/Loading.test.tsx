import {render, screen} from '@testing-library/react'
import Loading from './Loading';

describe('Loading' , () => {
  it('should render based on isOpen', () => {
    const {rerender} = render(<Loading isOpen={false}/>);
    expect(screen.queryByTestId('spinner')).toBeFalsy();

    rerender(<Loading isOpen={true}/>);
    expect(screen.getByTestId('spinner')).toBeTruthy();
  })
})