import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SearchInput } from '../SearchInput';

describe('SearchInput', () => {
  it('renders with default placeholder', () => {
    render(
      <SearchInput
        value=""
        onChange={() => {}}
      />,
    );
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  it('renders with custom placeholder', () => {
    render(
      <SearchInput
        value=""
        onChange={() => {}}
        placeholder="Search videos..."
      />,
    );
    expect(screen.getByPlaceholderText('Search videos...')).toBeInTheDocument();
  });

  it('displays passed value', () => {
    render(
      <SearchInput
        value="hello"
        onChange={() => {}}
      />,
    );
    expect(screen.getByRole('textbox')).toHaveValue('hello');
  });

  it('calls onChange with typed value', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(
      <SearchInput
        value=""
        onChange={handleChange}
      />,
    );
    const input = screen.getByRole('textbox');

    await user.type(input, 'hi');
    expect(handleChange).toHaveBeenCalledTimes(2);
    expect(handleChange).toHaveBeenNthCalledWith(1, 'h');
    expect(handleChange).toHaveBeenNthCalledWith(2, 'i');
  });

  it('focuses on click', async () => {
    const user = userEvent.setup();
    render(
      <SearchInput
        value=""
        onChange={() => {}}
      />,
    );
    const input = screen.getByRole('textbox');
    await user.click(input);
    expect(input).toHaveFocus();
  });
});
