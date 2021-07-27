import logo from './logo.svg';
import './App.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'

function App() {
  return (
    <div className="App">
      <section className="auth">
        <AmplifySignOut />
      </section>
    </div>
  );
}


export default withAuthenticator(App);
