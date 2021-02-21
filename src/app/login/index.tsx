import { AxiosResponse } from 'axios'
import { ChangeEvent, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthService, setBearer } from '../../service'
import { useContextState } from '../store'
import { actions } from '../store/actions'

const Login = () => {
  const [state, dispatch] = useContextState()
  const [emailVal, setEmailVal] = useState<string>('')
  const [passVal, setPassVal] = useState<string>('')
  const [loginErr, setLoginErr] = useState<string | null>(null)

  const history = useHistory()

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmailVal(e.target.value)
  const handlePassChange = (e: ChangeEvent<HTMLInputElement>) => setPassVal(e.target.value)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (emailVal && passVal) {
      try {
        const result: AxiosResponse<string> = await AuthService.login({
          email: emailVal,
          password: passVal
        })
        localStorage.setItem('token', result.data)
        setBearer(result.data)
        dispatch(actions.setAuthorized(true))
        history.push('/')
      } catch {
        setLoginErr('Wrong credentials or user does not exist')
      }
    }
  }

  return (
    <div className="d-flex align-items-center justify-content-center fill">
      <div className="jumbotron text-center align-self-center">
        <h1 className="display-4">Login as admin</h1>
        <form onSubmit={handleSubmit}>
          <div className="container">
            <div className="row form-group">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                id="inputEmail"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                value={emailVal}
                autoComplete="email"
                onChange={handleEmailChange}
              />
            </div>
            <div className="row form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                id="passwordInput"
                aria-describedby="passwordHelp"
                placeholder="Enter password"
                value={passVal}
                autoComplete="pass"
                onChange={handlePassChange}
              />
            </div>
            <div className="row">
              <button type="submit" className="w-100 btn btn-primary">
                Login
              </button>
            </div>
            {loginErr && (
              <p className="row text-danger d-inline-flex align-items-center justify-content-center mp-0">
                {loginErr}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
