import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

enzyme.configure({ adapter: new Adapter() });

require('dotenv').config({ path: '.env.test' });