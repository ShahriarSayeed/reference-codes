export const standard = () => ({
  tableRows: [
    {
      id: 1,
      name: 'John Smith',
      address: 'Newyork',
      city: 'New York City',
      state: 'New York',
      price: 501,
    },
    {
      id: 2,
      name: 'Mrs Clara',
      address: 'Boston',
      city: 'New York City2',
      state: 'New York',
      price: 280,
    },
  ],
})

export const tableHeader = () => ({
  tableColumns: [
    {
      headerTitle: 'Id',
      fieldName: 'id',
      isSortable: true,
      isStackupTop: true,
    },
    {
      headerTitle: 'Name',
      fieldName: 'name',
      isSortable: true,
      isStackup: true,
    },
    {
      headerTitle: 'Address',
      fieldName: 'address',
      isSortable: false,
      isStackup: true,
    },
    {
      headerTitle: 'City',
      fieldName: 'city',
      isSortable: true,
      afterStackup: true,
    },
    { headerTitle: 'State', fieldName: 'state', isSortable: true },
    {
      headerTitle: 'Price',
      fieldName: 'price',
      isSortable: false,
      isSummarizable: true,
    },
  ],
})
