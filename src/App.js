import { Route, Routes } from 'react-router-dom';
import LoginForm from './components/views/login';
import RegisterForm from './components/views/register';
import Users from './components/views/users/users';
import UserForm from './components/views/users/usersForm';
import Policy from './components/views/policy/policy';
import PolicyForm from './components/views/policy/policyForm';
import District from './components/views/district/district';
import DistrictForm from './components/views/district/districtForm';
import Member from './components/views/member/member';
import MemberForm from './components/views/member/memberForm';
import Payments from './components/views/payments/payments';
import PaymentsForm from './components/views/payments/paymentsForm';
import FleetManagement from './components/views/fleetmanagement/manageFleet';
import BookingForm from './components/views/fleetmanagement/bookingForm';
import CarForm from './components/views/fleetmanagement/carForm';
import DriverForm from './components/views/fleetmanagement/driverForm';
import ManageDriver from './components/views/fleetmanagement/manageDriver';
import ManageCar from './components/views/fleetmanagement/manageCar';
import CashFuneral from './components/views/cashfunernal/cashfuneral';
import CashFuneralForm from './components/views/cashfunernal/cashfuneralForm';
import Sheet from './components/views/spreadsheet/sheet';
import SheetForm from './components/views/spreadsheet/sheetForm';
import Dashboard from './components/views/dashboard';
import NotFound from './components/views/notFound';
import NavBar from './components/views/navBar';
import './App.css';

function App() {
  return (
    <>
      <NavBar />
      <main className='container'>
            <Routes>
              <Route index element={<Dashboard/>}/>
              <Route path='district' element={<District/>}>
                <Route path=':newdistrict' element={<DistrictForm/>}/>
                <Route path=':id' element={<DistrictForm/>}/>
              </Route>
              <Route path='cashfuneral' element={<CashFuneral/>}>
                <Route path=':newcashfuneral' element={<CashFuneralForm/>} />
                <Route path=':id' element={<CashFuneralForm/>} />
              </Route>
              <Route path='member' element={<Member/>}>
                <Route path=':newmember' element={<MemberForm/>} />
                <Route path=':id' element={<MemberForm/>} />
              </Route>
              <Route path='policy' element={<Policy/>}>
                <Route path=':newpolicy' element={<PolicyForm/>} />
                <Route path=':id' element={<PolicyForm/>} />
              </Route>
              <Route path='manage' element={<FleetManagement/>}>
                {/* <Route path=':managebooking' element={<FleetManagement/>} /> */}
                <Route path=':newbooking' element={<BookingForm/>} />
                <Route path=':id' element={<BookingForm/>} />
              </Route>
              <Route path='managecar' element={<ManageCar/>}>
                <Route path=':newcar' element={<CarForm/>} />
                <Route path=':id' element={<DriverForm/>} />
              </Route>
              <Route path='managedriver' element={<ManageDriver/>}>
                <Route path=':newdriver' element={<DriverForm/>} />
                <Route path=':id' element={<DriverForm/>} />
              </Route>
              <Route path='payments' element={<Payments/>}>
                <Route path=':newpayment' element={<PaymentsForm/>} />
                <Route path=':id' element={<DriverForm/>} />
              </Route>
              <Route path='sheet' element={<Sheet/>}>
                <Route path=':newsheet' element={<SheetForm/>} />
                <Route path=':id' element={<SheetForm/>} />
              </Route>
              <Route path='*' element={<NotFound/>}/>
            </Routes>
      </main>
    </>
  );
}

export default App;
