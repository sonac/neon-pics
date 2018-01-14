import * as React from 'react';
import * as enzyme from 'enzyme';
import { expect } from 'chai';
import PicsPair from '../components/PicsPair';
import * as Adapter from 'enzyme-adapter-react-16';

enzyme.configure({ adapter: new Adapter() });


it('renders the correct text when no enthusiasm level is given', () => {
    const btns = enzyme.shallow(<PicsPair />);
    expect(btns.length).equal(1);
});

