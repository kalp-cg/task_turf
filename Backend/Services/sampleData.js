const sampleData = {
  services: [
    {
      category: 'Home Maintenance',
      title: 'Plumbing Services',
      description: 'Professional plumbing services including repairs and installations',
      price: 75.00,
      provider: 'provider_id_1',
      availability: true
    },
    {
      category: 'Cleaning',
      title: 'House Cleaning',
      description: 'Complete house cleaning service',
      price: 120.00,
      provider: 'provider_id_2',
      availability: true
    },
    {
      category: 'Technical',
      title: 'Computer Repair',
      description: 'Hardware and software troubleshooting',
      price: 90.00,
      provider: 'provider_id_3',
      availability: true
    }
  ],
  
  bookings: [
    {
      service: 'service_id_1',
      client: 'client_id_1',
      provider: 'provider_id_1',
      status: 'completed',
      scheduledDate: '2023-09-15T10:00:00Z',
      totalAmount: 75.00,
      notes: 'Leaking faucet repair'
    },
    {
      service: 'service_id_2',
      client: 'client_id_2',
      provider: 'provider_id_2',
      status: 'pending',
      scheduledDate: '2023-09-20T14:00:00Z',
      totalAmount: 120.00,
      notes: 'Deep cleaning required'
    }
  ],
  
  reviews: [
    {
      service: 'service_id_1',
      booking: 'booking_id_1',
      client: 'client_id_1',
      rating: 5,
      comment: 'Excellent service, very professional'
    },
    {
      service: 'service_id_2',
      booking: 'booking_id_2',
      client: 'client_id_2',
      rating: 4,
      comment: 'Good service, but arrived a bit late'
    }
  ]
};

module.exports = sampleData;