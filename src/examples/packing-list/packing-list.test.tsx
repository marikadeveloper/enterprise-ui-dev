import { Provider } from 'react-redux';
import { render as _render, screen } from 'test/utilities';
import { PackingList } from '.';
import { createStore } from './store';

const render: typeof _render = (Component, options) => {
  const store = createStore();

  const Wrapper = ({ children }: any) => {
    return <Provider store={store}>{children}</Provider>;
  };

  return _render(Component, { wrapper: Wrapper, ...options });
};

it('renders the Packing List application', () => {
  render(<PackingList />);
});

it('has the correct title', async () => {
  render(<PackingList />);
  screen.getByText('Packing List');
});

it('has an input field for a new item', () => {
  render(<PackingList />);
  screen.getByPlaceholderText('New Item');
});

it('has a "Add New Item" button that is disabled when the input is empty', () => {
  render(<PackingList />);
  const newItemInput = screen.getByPlaceholderText('New Item');
  const addNewItemButton = screen.getByRole('button', { name: 'Add New Item' });

  expect(newItemInput).toHaveValue('');
  expect(addNewItemButton).toBeDisabled();
});

it('enables the "Add New Item" button when there is text in the input field', async () => {
  const { user } = render(<PackingList />);
  const newItemInput = screen.getByPlaceholderText('New Item');
  const addNewItemButton = screen.getByRole('button', { name: 'Add New Item' });

  await user.type(newItemInput, 'Item 1');
  expect(addNewItemButton).toBeEnabled();
});

it('adds a new item to the unpacked item list when the clicking "Add New Item"', async () => {
  const { user } = render(<PackingList />);
  const newItemInput = screen.getByPlaceholderText('New Item');
  const addNewItemButton = screen.getByRole('button', { name: 'Add New Item' });

  await user.type(newItemInput, 'iPad');
  await user.click(addNewItemButton);

  expect(screen.getByLabelText('iPad')).not.toBeChecked();
});

it('removes an item from the unpacked item list when the clicking the "Remove" button', async () => {
  const { user } = render(<PackingList />);
  const newItemInput = screen.getByPlaceholderText('New Item');
  const addNewItemButton = screen.getByRole('button', { name: 'Add New Item' });

  await user.type(newItemInput, 'iPhone');
  await user.click(addNewItemButton);

  const removeButton = screen.getByLabelText(/remove/i);
  await user.click(removeButton);

  expect(screen.queryByLabelText('iPhone')).not.toBeInTheDocument();
});
