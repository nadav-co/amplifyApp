import './main.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import { Todo } from './cmps/Todo';

function App() {
  return (
    <div className="App">
      <section className="main-container">
        <Todo/>
        <AmplifySignOut />
      </section>
    </div>
  );
}


export default withAuthenticator(App);
