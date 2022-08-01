const LoginForm = ({
    handleLogin,
    username,
    handleChangeUsername,
    password,
    handlePassword
  }) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
        <input
          type='text'
          value={username}
          name='Username'
          placeholder='Username'
          onChange={handleChangeUsername}
        />
      </div>
      <div>
        <input
          type='password'
          value={password}
          name='Password'
          placeholder='Password'
          onChange={handlePassword}
        />
      </div>
      <button>
        Login
      </button>
    </form>
  )
}

export default LoginForm;
