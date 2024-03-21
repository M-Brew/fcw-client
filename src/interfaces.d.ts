interface IClient {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  area: string;
  street: string;
  houseNumber: string;
  type: string;
  code: number;
  numberOfBins: number;
  suspended?: boolean;
  createdBy?: {
    _id: string;
    firstName: string;
    lastName: string;
  };
}

interface IPayment {
  _id?: string;
  invoice: string;
  amount: number;
  receiptNumber: string;
  revenueCollector: string;
  client: string;
  paymentDate: string;
  remarks: string;
}

interface IPaymentData {
  _id?: string;
  amount: number;
  receiptNumber: string;
  revenueCollector: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  client: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  paymentDate: string;
  remarks: string;
}

interface IInvoiceData {
  _id?: string;
  amount: number;
  client: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  status: string;
  dueDate: string;
  paymentDate: string;
}

interface IRevenueCollector {
  _id?: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  payments: string[];
  suspended?: boolean;
  createdBy?: {
    _id: string;
    firstName: string;
    lastName: string;
  };
}

interface IAuthContext {
  loggedIn?: boolean;
  setLoggedIn?: React.Dispatch<React.SetStateAction<boolean>>;
  user?: IUser;
  setUser?: React.Dispatch<React.SetStateAction<IUser | undefined>>;
}

interface IUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface IJWTPayload {
  id: string;
  name: string;
  email: string;
  role: string;
  iat: number;
  exp?: number;
}
