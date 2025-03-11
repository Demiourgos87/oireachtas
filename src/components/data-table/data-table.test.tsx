import { beforeEach, describe, expect, it, vi } from 'vitest';

import { mockBills } from '@mocks/test-mocks';
import { fireEvent, render, screen, within } from '@testing-library/react';

import DataTable from './data-table';

vi.mock('@hooks/use-get-data', () => ({
  default: () => ({
    data: {
      results: mockBills,
      head: { counts: { resultCount: 100 } },
    },
    loading: false,
    error: false,
  }),
}));

describe('DataTable component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders 10 rows when data arrives', async () => {
    render(<DataTable />);

    const rows = await screen.findAllByRole('row');

    expect(rows).toHaveLength(11); // expect 11 rows since table head is also a row
  });

  it('opens a modal when clicking on a row', async () => {
    render(<DataTable />);

    const firstBill = await screen.findByText('Bill No 1');

    fireEvent.click(firstBill);

    // check English title
    const modalContentEn = await screen.findByText(
      'This is a long description in english of bill number 1',
    );
    expect(modalContentEn).toBeInTheDocument();

    // check Gaeilge title
    const modalGaTabTrigger = await screen.findByText('Gaeilge');
    fireEvent.click(modalGaTabTrigger);
    const modalcontentGa = await screen.findByText(
      'Is cur síos fada é seo i mBéarla ar bhille uimhir 1',
    );

    expect(modalcontentGa).toBeInTheDocument();
  });

  it('add to favourite toggle icon color when clicked', async () => {
    render(<DataTable />);

    const firstRowFavouriteButton = await screen.findAllByTestId('favourite-button');

    // click on icon firs time, expect to have gold color
    fireEvent.click(firstRowFavouriteButton[0]);

    const icon = within(firstRowFavouriteButton[0]).getByTestId('star-icon');
    let computedStyle = window.getComputedStyle(icon);

    expect(computedStyle.color).toBe('rgb(255, 215, 0)');

    // click second time, expect to have gray color
    fireEvent.click(firstRowFavouriteButton[0]);
    computedStyle = window.getComputedStyle(icon);

    expect(computedStyle.color).toBe('rgb(128, 128, 128)');
  });
});
