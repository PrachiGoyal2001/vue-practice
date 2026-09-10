import axiosInstance from '../axios'

export const loginService = () => {
  const registerUser = async (userDetails) => {
    const { data } = await axiosInstance.post('auth/signup', userDetails)
    return data
  }
  const loginUser = async (userDetails) => {
    const { data } = await axiosInstance.post('auth/login', userDetails)
    return data
  }
  const logoutUser = () => {
    return axiosInstance.post('auth/logout')
  }

  return {
    registerUser,
    loginUser,
    logoutUser,
  }
}
