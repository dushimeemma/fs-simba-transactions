import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Router from 'next/router';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';

import Dashboard from '../../components/markup/DashboardView';
import TextField from '../../components/reusable/TextField';
import SelectField from '../../components/reusable/SelectField';
import { clearErrors } from '../../store/actions/errors/errors';
import { getAllTransactions } from '../../store/actions/transactions/transactions';
import { AppState } from '../../store/types';
import SkeletonLoader from '../../components/markup/Skeleton';

const CreateTransaction = () => {
  const [isShownPassword, setIsShownPassword] = useState(false);
  const dispatch = useDispatch();
  const { transactions, isLoading } = useSelector(
    (state: AppState) => state.transactions,
    shallowEqual,
  );
  const { error } = useSelector(
    (state: AppState) => state.errors,
    shallowEqual,
  );
  useEffect(() => {
    dispatch(clearErrors());
    dispatch(getAllTransactions());
  }, []);
  return (
    <Dashboard title='Transactions' count={transactions.length}>
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <div className='w-11/12 mx-auto flex flex-col justify-center items-center px-5 pt-5'>
          <div className='flex flex-col justify-center items-center rounded-lg p-10 bg-white shadow-lg md:w-6/12'>
            <span className='font-bold capitalize my-3'>New Transaction</span>
            <SelectField
              title='Receiver'
              icon={<BadgeOutlinedIcon />}
              name='receiver'
              isShownPassword={isShownPassword}
              placeholder='Receiver'
            >
              <option value='John Doe'>John Doe</option>
              <option value='Brad Traversy'>Brad Traversy</option>
              <option value='Net Ninja'>Net Ninja</option>
            </SelectField>
            <SelectField
              title='Source currency'
              icon={<AccountBalanceOutlinedIcon />}
              name='source'
              isShownPassword={isShownPassword}
              placeholder='Source Currency'
            >
              <option value='USD'>USD</option>
              <option value='EUR'>EUR</option>
              <option value='NGN'>NGN</option>
            </SelectField>
            <SelectField
              title='Target Currency'
              icon={<AccountBalanceOutlinedIcon />}
              name='target'
              isShownPassword={isShownPassword}
              placeholder='Target Currency'
            >
              <option value='USD'>USD</option>
              <option value='EUR'>EUR</option>
              <option value='NGN'>NGN</option>
            </SelectField>

            <TextField
              icon={<AccountBalanceOutlinedIcon />}
              name='amount'
              isShownPassword={isShownPassword}
              type='text'
              placeholder='Amount'
            />

            <button
              className='bg-blue-500 px-3 py-2 rounded-md text-white my-3'
              onClick={() => Router.push('/dashboard/transactions')}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </Dashboard>
  );
};

export default CreateTransaction;
