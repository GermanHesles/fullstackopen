const LoginForm = ({
    handleLoginSubmit,
    username,
    setUsername,
    password,
    setPassword
  }) => {
  return (
    <form onSubmit={handleLoginSubmit}>
      <div>
        username:
        <input
            type='text'
            value={username}
            name='Username'
            placeholder='Username'
            onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div>
        password:
        <input
            type='password'
            value={password}
            name='Password'
            placeholder='Password'
            onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  )
}

export default LoginForm;