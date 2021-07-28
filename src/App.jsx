import './main.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import { Todo } from './cmps/Todo';
import { Auth } from 'aws-amplify';
import { useEffect } from 'react';
import { userService } from './services/userService';

function App() {

  useEffect(async () => {
    const { username } = await Auth.user
    userService.setUsername(username)
  }, [Auth.user.username])

  return (
    <div className="App">
      <section className="main-container">
        <Todo />
        <AmplifySignOut />
      </section>
    </div>
  );
}


export default withAuthenticator(App);
