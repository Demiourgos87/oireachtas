export const mockBills = Array.from({ length: 10 }, (_, i) => ({
  bill: {
    shortTitleEn: `Bill No ${i + 1}`,
    billNo: `${i + 1}`,
    billType: 'Public',
    status: 'Current',
    sponsors: [
      {
        sponsor: {
          isPrimary: true,
          as: { showAs: null },
          by: { showAs: 'Ministry of Finance' },
        },
      },
    ],
    longTitleEn: `This is a long description in english of bill number ${i + 1}`,
    longTitleGa: `Is cur síos fada é seo i mBéarla ar bhille uimhir ${i + 1}`,
  },
}));
