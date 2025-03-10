export interface Bills {
  head: {
    counts: {
      billCount: number;
      resultCount: number;
    };
    dateRange: {
      end: string;
      start: string;
    };
  };
  results: BillData[];
}

export interface BillData {
  bill: Bill;
  billSort: BillSort;
  contextDate: string;
}

export interface Bill {
  act?: string;
  billNo: string;
  billType: string;
  billYear: string;
  shortTitleEn: string;
  shortTitleGa: string;
  status: string;
  sponsors: BillSponsor[];
  uri: string;
  statusURI: string;
}

export interface BillSponsor {
  sponsor: {
    as: {
      showAs: string;
      uri?: string;
    };
    by: {
      showAs?: string;
      uri?: string;
    };
    isPrimary: boolean;
  };
}

interface BillSort {
  actNoSort?: string;
  actShortTitleEnSort?: string;
  actShortTitleGaSort?: string;
  actYearSort?: string;
  billNoSort: number;
  billShortTitleEnSort: string;
  billShortTitleGaSort: string;
  billYearSort: number;
}
